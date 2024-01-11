import React, { useState, useEffect } from 'react';
import { TOAST_OPTIONS } from '../../constants';

//UTILS
import { useSearchParams } from 'react-router-dom';
import AdminService from '../../services/admin_services';
import { getAdminBalance } from '../../services/magic';

//VISUALS
import LOGO_BLACK from '../../assets/images/logo_black.png';

//COMPONENTS
import Menu from '../../components/menu/admin';
import BoardHeader from '../../components/boardheader/admin';
import Button from '../../components/button';
import { ToastContainer, toast } from 'react-toastify';

const AdminUsers = () => {
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    const [accounts, setAccounts] = useState([]);
    // eslint-disable-next-line
    const [deactivated, setDeactivated] = useState(false);

    const loadUsers = async () => {
        const deactivationState = searchParams.get("deactivated") === "true";
        setDeactivated(deactivationState);
        setAccounts([]);
        const users = await AdminService.getUsers(deactivationState);
        users.forEach(async(user) => {
            user.balance = await getAdminBalance(user.public_address)
            setAccounts( accounts => [...accounts, user]);
        })
    }

    const deactivate = async (user_uuid) => {
        if (window.confirm("Do you confirm deactivation?")) {
            try {
                const resp = await AdminService.deactivateUser(user_uuid);
                if (resp.status) {
                    toast.success(`Administration account successfully deactivated`, TOAST_OPTIONS);
                    loadUsers();
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                toast.error(e.response && e.response.data ? e.response.data.message : e.message, TOAST_OPTIONS);
            }
        }
    }

    const reactivate = async (user_uuid) => {
        try {
            const resp = await AdminService.reactivateUser(user_uuid);
            if (resp.status) {
                toast.success(`Administration account successfully reactivated`, TOAST_OPTIONS);
                loadUsers();
            } else
                toast.error(resp.message, TOAST_OPTIONS);
        } catch (e) {
            toast.error(e.response && e.response.data ? e.response.data.message : e.message, TOAST_OPTIONS);
        }
    }

    useEffect(() => {
        loadUsers();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={"MetaBank Users"} />
                <div className="content">
                    <div className="search mb-20">
                        <input type="text" className="semi" placeholder="Search email or address" />
                        <Button title={"Search"} />
                    </div>
                    <div className="relative display-inline-block mr-20">
                        <label>Email address</label>
                        <div className="relative display-inline-block">
                            <input type="email" className="semi" placeholder={"Email to receive link"} />
                        </div>
                    </div>
                    <div className="relative display-inline-block">
                        <label>Set amount to send <small>(Optional)</small></label>
                        <div className="relative display-inline-block">
                            <input type="number" className="semi" placeholder={"CâaEuro amount"} />
                            <img src={LOGO_BLACK} className="caaeuro" alt="Logo CâaEuro" />
                        </div>
                        <Button title={"Send"} />
                    </div>
                    <div className="slash"></div>
                    <div className="relative display-inline-block mr-20">
                        <label>
                            Sort by : <span className="filter heavy">Date</span> | <span className="filter">Balance</span> | <span className="filter">Email</span>
                        </label>
                    </div>
                    <div className="relative display-inline-block">
                        <label>
                            Filter : <span className={deactivated? "filter": "filter heavy"} onClick={() => window.location.href = "/admin/users"}>Active</span> | <span className={deactivated? "filter heavy": "filter"}  onClick={() => window.location.href = "/admin/users?deactivated=true"}>Deactivated</span> | <span className="filter">Pending</span>
                        </label>
                    </div>
                    <div className="beneficiaries">
                        {accounts.map(account =>
                            <div className="profile max" key={account.user_uuid}>
                                <div className="avatar" style={{ backgroundImage: `url('https://api.multiavatar.com/${account.user_uuid}.png')` }}></div>
                                <div className="profile_info locked">
                                    <span className="profile_name">{account.firstname || "-"} {account.lastname || "-"}</span>
                                    <span className="profile_email">{account.email_address}</span>
                                    <span className="small_desc left">Birth: {account.birthdate || "-"}</span>
                                </div>
                                <div className="profile_info pointer">
                                    <span className="small_desc">Press to browse all operations</span>
                                    <div className="redeemer">0 redeems | 0 pending</div>
                                    <span className="small_desc">Since {new Date(account.created_date).toLocaleDateString()}</span>
                                </div>
                                <div className="profile_info float-right mr-70">
                                    <span className="balance">{account.balance}<small>€</small></span>
                                </div>
                                {deactivated ?
                                    <div className="rm_beneficiary float-right" onClick={() => reactivate(account.user_uuid)}>
                                        ✅
                                    </div>
                                    :
                                    <div className="rm_beneficiary float-right" onClick={() => deactivate(account.user_uuid)}>
                                        🗑️
                                    </div>}
                            </div>)}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
};

export default AdminUsers;