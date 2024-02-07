import React, { useState, useEffect } from 'react';
import { TOAST_OPTIONS } from '../../constants';

//UTILS
import { isMobile } from 'react-device-detect';
import TokenService from "../../services/token_services";
import UserService from '../../services/user_services';

//VISUALS
import LOGO_BLACK from '../../assets/images/logo_black.png';
import BANKINGWEB3 from '../../assets/images/banking_web3.png';

//COMPONENTS
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';
import Button from '../../components/button';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

//TRANSLATION
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
    const { t } = useTranslation();
    const [profile, setProfile] = useState({});
    const [balance, setBalance] = useState("-");
    const [tokenClaims, setTokenClaims] = useState([]);
    const [claiming, onChangeClaiming] = useState(false);

    const loadInfo = async () => {
        const data = TokenService.getUser()
        setProfile(data.account)
        const acc = await UserService.getAccountDetails()
        console.log(acc)
        setBalance(acc.wallet.token_balance)
        setTokenClaims(acc.token_claims.to_claim)
    }

    const comingSoon = () => {
        toast.info(t('dashboard.purchase_soon'), TOAST_OPTIONS);
    }

    useEffect(() => {
        loadInfo();
        // eslint-disable-next-line
    }, []);

    const claimFunds = async (claim_uuid) => {
        if (claiming)
            toast.warn(t('dashboard.wait_claim'), TOAST_OPTIONS);
        else {
            onChangeClaiming(true);
            try {
                const resp = await UserService.claim([claim_uuid]);
                if (resp.status && resp.transactions[claim_uuid]) {
                    toast.success(`${t('dashboard.funds_claimed')} ${resp.transactions[claim_uuid].tx_hash.substring(0, 10)}...${resp.transactions[claim_uuid].tx_hash.substring(resp.transactions[claim_uuid].tx_hash.length - 10, resp.transactions[claim_uuid].tx_hash.length - 1)}`, TOAST_OPTIONS);
                    setTimeout(async () => {
                        await loadInfo()
                        onChangeClaiming(false);
                    }, 2500);
                } else {
                    toast.error(resp.message, TOAST_OPTIONS);
                    onChangeClaiming(false);
                }
            } catch (e) {
                console.log(e.response.data)
                toast.error(e.response && e.response.data ? e.response.data.message || e.response.data.msg : e.message, TOAST_OPTIONS);
                onChangeClaiming(false);
            }
        }
    }

    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={t('dashboard.my_account')} />
                <div className="content">
                    <p><small>{t('dashboard.account_number')} {profile.public_address}</small></p>
                    <h2>{t('dashboard.caaeuro_balance')}</h2>
                    <span className="balance">{balance}</span>
                    <img src={LOGO_BLACK} className="currency" alt="CaaEuro logo" />
                    {isMobile && <br />}
                    <Button title={t('dashboard.purchase_funds')} click={comingSoon} />
                    {/* <Button title={"Redeem code"} framed={true} /> */}
                    {tokenClaims.length > 0 &&
                        <React.Fragment>
                            <h2 className="mt-50">
                                {t('dashboard.pending_claims')}
                                <br />
                                <small>{t('dashboard.press_to_claim')}</small>
                            </h2>
                            <ThreeDots visible={claiming} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                            {!claiming && <div className="beneficiaries">
                                {tokenClaims.map(claim =>
                                    <div className="profile" key={claim.token_claim_uuid}>
                                        <div className="profile_info ml-20">
                                            <span className="small_desc left">{t('dashboard.received_on')} {new Date(claim.created_date).toLocaleDateString()}</span>
                                            <span className="balance">{claim.nb_token} <img src={LOGO_BLACK} className="balance_logo" alt="Logo CâaEuro" /></span>
                                        </div>
                                        <div className="rm_beneficiary float-right" onClick={() => claimFunds(claim.token_claim_uuid)}>
                                            💸
                                        </div>
                                    </div>
                                )}
                            </div>}
                        </React.Fragment>
                    }
                </div>
                <img src={BANKINGWEB3} className="visual" alt="Digital banking" />
                {isMobile &&
                    <div className="share">
                        <p className="center">
                            {t('dashboard.send_link')}
                            <br />
                            {t('dashboard.join_you')}
                        </p>
                        <button className="action" onClick={() => navigator.share({
                            text: t('dashboard.join_me'),
                            url: `https://metabank.codinsight.com`,
                            title: t('dashboard.join_me'),
                        })}>{t('dashboard.share')}</button>
                    </div>
                }
            </div>
            <ToastContainer />
        </div>
    )
};

export default Dashboard;