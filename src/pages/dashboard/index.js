import React, { useState, useEffect } from 'react';

//UTILS
import { isMobile } from 'react-device-detect';
import TokenService from "../../services/token_services";
import { ToastContainer, toast } from 'react-toastify';

//VISUALS
import LOGO_BLACK from '../../assets/images/logo_black.png';
import BANKINGWEB3 from '../../assets/images/banking_web3.png';

//COMPONENTS
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';
import Button from '../../components/button';
import { TOAST_OPTIONS } from '../../constants';
import { getBalance } from '../../services/magic';

const Dashboard = ({ magic }) => {
    const [profile, setProfile] = useState({});
    const [balance, setBalance] = useState("-");

    const loadInfo = async () => {
        const data = TokenService.getUser()
        setProfile(data.account)
        setBalance(await getBalance(magic, data.account.public_address))
    }

    const comingSoon = () => {
        toast.info(`Purchase available soon`, TOAST_OPTIONS);
    }

    useEffect(() => {
        loadInfo();
        // eslint-disable-next-line
    }, []);

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
                    <Button title={"Purchase funds"} click={comingSoon}/>
                    <Button title={"Redeem code"} framed={true} />
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