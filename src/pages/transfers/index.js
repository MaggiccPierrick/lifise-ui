import React, { useState, useEffect } from 'react';
import { TOAST_OPTIONS } from '../../constants';

//UTILS
import Select from 'react-select'
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
import USER3 from '../../assets/images/user3.jpg';
import USER4 from '../../assets/images/user4.jpg';
import { ThreeDots } from 'react-loader-spinner';

const Transfers = ({ magic }) => {
    const [amount, setAmount] = useState("");
    const [receiver, setReceiver] = useState("");
    const [balance, setBalance] = useState("-");
    const [loading, onChangeLoading] = useState(null);

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
        // eslint-disable-next-line
    }, []);

    const beneficiaries = [
        { fullname: 'Kamala Khan', email: 'kamala.khan@avengers.com', avatar: USER4 },
        { fullname: 'Nick Fury', email: 'nick.fury@avengers.com', avatar: USER3 },
    ];

    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={"Transfer funds"} />
                <div className="content">
                    <label>Select beneficiary</label>
                    <div className="select">
                        <Select
                            value={beneficiaries.email}
                            options={beneficiaries}
                            formatOptionLabel={beneficiary => (
                                <div className="select_profile">
                                    <div className="select_avatar" style={{ backgroundImage: `url('${beneficiary.avatar}')` }}></div>
                                    <div className="select_info">
                                        <span className="select_name">{beneficiary.fullname}</span>
                                        <span className="select_email">{beneficiary.email}</span>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                    <FollowUp intro={"Can't find your beneficiary ?"} description={"Add a new beneficiary"} link={"/beneficiaries"} />
                    <label className="mt-50">Set receiver (*demo/test purpose)</label>
                    <input type="text" placeholder={"Account address"} onChange={(e) => setReceiver(e.target.value)} value={receiver} />
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
                    <div className="relative display-inline-block mobile_block">
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