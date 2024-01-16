import React, { useState, useEffect } from 'react';
import { TOAST_OPTIONS } from '../../constants';

//UTILS
import Select from 'react-select';
import UserService from "../../services/user_services";
import TokenService from "../../services/token_services";
import { ToastContainer, toast } from 'react-toastify';

//COMPONENTS 
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';
import Button from '../../components/button';
import FollowUp from '../../components/followup';
import { getBalance, transferERC20 } from '../../services/magic';

//VISUALS
import LOGO_BLACK from '../../assets/images/logo_black.png';
import BANKINGWEB3 from '../../assets/images/digital_banking.png';
import { ThreeDots } from 'react-loader-spinner';

const Transfers = ({ magic }) => {
    const [amount, setAmount] = useState("");
    const [receiver, setReceiver] = useState("");
    const [balance, setBalance] = useState("-");
    const [loading, onChangeLoading] = useState(null);
    const [beneficiaries, setBeneficiaries] = useState([]);

    const loadBeneficiaries = async () => {
        const data = await UserService.getBeneficiaries()
        setBeneficiaries(data)
    }

    const loadInfo = async () => {
        const data = TokenService.getUser()
        setBalance(await getBalance(magic, data.account.public_address))
    }

    const transfer = async () => {
        if (!receiver || receiver.length !== 42)
            toast.error('Receiving address invalid!', TOAST_OPTIONS);
        else if (!amount || amount < 1 || amount === "-")
            toast.error('Amount invalid!', TOAST_OPTIONS);
        else {
            onChangeLoading(true);
            try {
                const receipt = await transferERC20(magic, amount * (10 ** 6), receiver);
                toast.success(`Funds successfuly sent with operation ID ${receipt.transactionHash.substring(0, 10)}...${receipt.transactionHash.substring(receipt.transactionHash.length - 10, receipt.transactionHash.length - 1)}`, TOAST_OPTIONS);
                onChangeLoading(false);
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
                <BoardHeader title={"Transfer funds"} />
                <div className="content">
                    <label>Select beneficiary</label>
                    {beneficiaries && <div className="select">
                        <Select
                            options={beneficiaries}
                            onChange={(value) => setReceiver(value.public_address)}
                            formatOptionLabel={beneficiary => ( beneficiary.user_uuid ?
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
                                        <span className="select_name">{beneficiary.email || 'External account'}</span>
                                        <span className="select_email">{beneficiary.public_address.substring(0, 10)}...{beneficiary.public_address.substring(0, 15)}</span>
                                    </div>
                                </div>
                            )}
                        />
                    </div>}
                    <FollowUp intro={"Can't find your beneficiary ?"} description={"Add a new beneficiary"} link={"/beneficiaries"} />
                    <label>Set amount to send</label>
                    <div className="relative display-inline-block">
                        <input type="number" className="semi" placeholder={"CâaEuro amount"} onChange={(e) => setAmount(e.target.value)} value={amount} />
                        <img src={LOGO_BLACK} className="caaeuro" alt="Logo CâaEuro" />
                        <label className="mt-0 mb-40"><small>Max {balance} <img src={LOGO_BLACK} width={"8px"} alt="Logo CâaEuro" /></small></label>
                    </div>
                    {!loading &&
                        <div className="relative display-inline-block mobile_block">
                            <Button title={"Send funds"} click={transfer} />
                            <FollowUp intro={"No fees required"} />
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