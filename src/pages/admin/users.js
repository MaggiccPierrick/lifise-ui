import React, { useState, useEffect } from 'react';

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

const AdminUsers = ({ magic }) => {
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    const [accounts, setAccounts] = useState([]);
    // eslint-disable-next-line
    const [deactivated, setDeactivated] = useState(false);

    const loadUsers = async () => {
        const deactivationState = searchParams.get("deactivated") === "true";
        setDeactivated(deactivationState);
        const users = await AdminService.getUsers(deactivationState);
        users.forEach(async(user) => {
            user.balance = await getAdminBalance(user.public_address)
            setAccounts( accounts => [...accounts, user]);
        })
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
                            Filter : <span className="filter heavy">All</span> | <span className="filter">Active</span> | <span className="filter">Pending</span>
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
                                <div className="profile_info float-right">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="balance">{account.balance}</span>
                                                </td>
                                                <td>
                                                    <img src={LOGO_BLACK} width={"26px"} alt="Logo black" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AdminUsers;