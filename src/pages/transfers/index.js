import React, { useState, useEffect } from 'react';
import { TOAST_OPTIONS } from '../../constants';

//UTILS
import Select from 'react-select';
import UserService from "../../services/user_services";
import { ToastContainer, toast } from 'react-toastify';

//COMPONENTS 
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';
import Button from '../../components/button';
import FollowUp from '../../components/followup';
import { transferERC20 } from '../../services/magic';
import { ThreeDots } from 'react-loader-spinner';

//VISUALS
import LOGO_BLACK from '../../assets/images/logo_black.png';
import BANKINGWEB3 from '../../assets/images/digital_banking.png';

//TRANSLATION
import { useTranslation } from 'react-i18next';

const Transfers = ({ magic }) => {
    const { t } = useTranslation();
    const [amount, setAmount] = useState("");
    const [beneficiary, setBeneficiary] = useState(null);
    const [balance, setBalance] = useState("-");
    const [loading, onChangeLoading] = useState(null);
    const [beneficiaries, setBeneficiaries] = useState([]);

    const loadBeneficiaries = async () => {
        const data = await UserService.getBeneficiaries()
        setBeneficiaries(data)
    }

    const loadInfo = async () => {
        const acc = await UserService.getAccountDetails()
        setBalance(acc.wallet.token_balance)
    }

    const transfer = async () => {
        if (!beneficiary)
            toast.error(t('transfer.invalid_address'), TOAST_OPTIONS);
        else if (!amount || amount < 1 || amount === "-" || amount > balance)
            toast.error(t('transfer.invalid_amount'), TOAST_OPTIONS);
        else {
            onChangeLoading(true);
            try {
                const receipt = await transferERC20(magic, amount * (10 ** 6), beneficiary.public_address);
                toast.success(`${t('transfer.funds_sent')} ${receipt.transactionHash.substring(0, 10)}...${receipt.transactionHash.substring(receipt.transactionHash.length - 10, receipt.transactionHash.length - 1)}`, TOAST_OPTIONS);
                setAmount("")
                setBeneficiary(null)
                onChangeLoading(false);
                setTimeout(() => {
                    loadInfo()
                }, 2500);
            } catch (e) {
                console.log(e);
                toast.error(e.response && e.response.data ? e.response.data.message : e.message, TOAST_OPTIONS);
                onChangeLoading(false);
            }
        }
    }

    useEffect(() => {
        loadInfo();
        loadBeneficiaries();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={t('transfer.transfer_funds')} />
                <div className="content">
                    <label>{t('transfer.select_beneficiary')}</label>
                    {beneficiaries && <div className="select">
                        <Select
                            placeholder={t('transfer.select_beneficiary')}
                            options={beneficiaries}
                            value={beneficiary}
                            onChange={(value) => setBeneficiary(value)}
                            formatOptionLabel={beneficiary => (beneficiary.user_uuid ?
                                <div className="select_profile">
                                    <div className="select_avatar" style={{ backgroundImage: beneficiary.selfie ? `url('data:image/${beneficiary.selfie_ext};base64,${beneficiary.selfie}')` : `url('https://api.multiavatar.com/${beneficiary.user_uuid}.png')` }}></div>
                                    <div className="select_info">
                                        <span className="select_name">{beneficiary.firstname} {beneficiary.lastname}</span>
                                        <span className="select_email">{beneficiary.email_address}</span>
                                    </div>
                                </div>
                                :
                                <div className="select_profile">
                                    <div className="select_avatar" style={{ backgroundImage: `url('https://api.multiavatar.com/${beneficiary.public_address}.png')` }}></div>
                                    <div className="select_info">
                                        <span className="select_name">{beneficiary.email || t('transfer.external_account')}</span>
                                        <span className="select_email">{beneficiary.public_address.substring(0, 10)}...{beneficiary.public_address.substring(0, 15)}</span>
                                    </div>
                                </div>
                            )}
                        />
                    </div>}
                    <FollowUp intro={t('transfer.cant_find')} description={t('transfer.add_beneficiary')} link={"/beneficiaries"} />
                    <label>{t('transfer.set_amount')}</label>
                    <div className="relative display-inline-block">
                        <input type="number" className="semi" placeholder={t('transfer.caaeuro_amount')} onChange={(e) => setAmount(e.target.value)} value={amount} />
                        <img src={LOGO_BLACK} className="caaeuro" alt="Logo CâaEuro" />
                        <label className="mt-0 mb-40"><small>Max {balance} <img src={LOGO_BLACK} width={"8px"} alt="Logo CâaEuro" /></small></label>
                    </div>
                    {!loading &&
                        <div className="relative display-inline-block mobile_block">
                            <Button title={t('transfer.send_funds')} click={transfer} />
                            <FollowUp intro={t('transfer.no_fees')} />
                        </div>}
                    <div className="relative display-inline-block mobile_block ml-20">
                        <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                    </div>
                </div>
                <img src={BANKINGWEB3} className="visual v_mobile" alt="Digital banking" />
            </div>
            <ToastContainer />
        </div>
    )
};

export default Transfers;