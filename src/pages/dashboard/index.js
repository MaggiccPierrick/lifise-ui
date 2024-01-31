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

const Dashboard = () => {
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
        toast.info(`Purchase available soon`, TOAST_OPTIONS);
    }

    useEffect(() => {
        loadInfo();
        // eslint-disable-next-line
    }, []);

    const claimFunds = async (claim_uuid) => {
        if (claiming)
            toast.warn("Please wait for previous claim to be processed", TOAST_OPTIONS);
        else {
            onChangeClaiming(true);
            try {
                const resp = await UserService.claim([claim_uuid]);
                if (resp.status && resp.tx_hash[claim_uuid]) {
                    toast.success(`Funds successfuly claimed with operation ID ${resp.transactions[claim_uuid].tx_hash.substring(0, 10)}...${resp.transactions[claim_uuid].tx_hash.substring(resp.transactions[claim_uuid].tx_hash.length - 10, resp.transactions[claim_uuid].tx_hash.length - 1)}`, TOAST_OPTIONS);
                    setTimeout(async() => {
                        await loadInfo()
                        onChangeClaiming(false);
                    }, 2500);
                } else{
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
                <BoardHeader title={"My account"} />
                <div className="content">
                    <p><small>Account number {profile.public_address}</small></p>
                    <h2>CaâEuro Balance</h2>
                    <span className="balance">{balance}</span>
                    <img src={LOGO_BLACK} className="currency" alt="CaaEuro logo" />
                    {isMobile && <br />}
                    <Button title={"Purchase funds"} click={comingSoon} />
                    {/* <Button title={"Redeem code"} framed={true} /> */}
                    {tokenClaims.length > 0 &&
                        <React.Fragment>
                            <h2 className="mt-50">
                                Pending claims
                                <br />
                                <small>Press 💸 to claim</small>
                            </h2>
                            <ThreeDots visible={claiming} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                            {!claiming && <div className="beneficiaries">
                                {tokenClaims.map(claim =>
                                    <div className="profile" key={claim.token_claim_uuid}>
                                        <div className="profile_info ml-20">
                                            <span className="small_desc left">Received on {new Date(claim.created_date).toLocaleDateString()}</span>
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
                            Send a link to invite your friends
                            <br />
                            to join you
                        </p>
                        <button className="action" onClick={() => navigator.share({
                            text: "Join me and open your account now on MetaBank",
                            url: `https://metabank.codinsight.com`,
                            title: `Join me and open your account now on MetaBank`,
                        })}>Share with friends</button>
                    </div>
                }
            </div>
            <ToastContainer />
        </div>
    )
};

export default Dashboard;