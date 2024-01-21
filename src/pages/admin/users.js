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
import { ThreeDots } from 'react-loader-spinner';

const AdminUsers = () => {
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    const [accounts, setAccounts] = useState([]);
    const [emails, onChangeEmails] = useState();
    const [amount, onChangeAmount] = useState(0);
    const [displayForm, setDisplayForm] = useState(false);
    const [deactivated, setDeactivated] = useState(false);
    const [pending, setPending] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadUsers = async () => {
        const pendingState = searchParams.get("pending") === "true";
        const deactivationState = !pendingState && (searchParams.get("deactivated") === "true");
        setDeactivated(deactivationState);
        setPending(pendingState);
        setAccounts([]);
        const users = await AdminService.getUsers(deactivationState, pendingState);
        if (pendingState)
            setAccounts(users)
        else
            users.forEach(async (user) => {
                user.balance = await getAdminBalance(user.public_address)
                setAccounts(accounts => [...accounts, user]);
            })
    }

    const sendInvits = async () => {
        try {
            setLoading(true)
            const trimmed = emails.replace(/ /g, '').split(',');
            let mailingList = []
            // eslint-disable-next-line
            let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
            for (let entry of trimmed) {
                if (!entry || entry.length < 4) {
                    console.error('Invalid entry')
                } else if (!re.test(entry)) {
                    toast.warn(`Email ${entry} invalid. Invitation not sent for this user!`, TOAST_OPTIONS);
                } else
                    mailingList.push(entry)
            }
            const resp = await AdminService.inviteUsers(mailingList, amount);
            if (resp.status) {
                toast.success(`Invitations successfully sent`, TOAST_OPTIONS);
                loadUsers();
            } else
                toast.error(resp.message, TOAST_OPTIONS);
            setLoading(false)
        } catch (e) {
            setLoading(false)
            toast.error(e.response && e.response.data ? e.response.data.message : e.message, TOAST_OPTIONS);
        }
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
                    {/* <div className="search mb-20">
                        <input type="text" className="semi" placeholder="Search email or address" />
                        <Button title={"Search"} />
                    </div> */}
                    {displayForm ?
                        <React.Fragment>
                            <label>Email addresses <small>Seperate by comma ","</small></label>
                            <div className="relative display-inline-block">
                                <textarea placeholder={"Emails to receive link"} onChange={e => onChangeEmails(e.target.value)}></textarea>
                            </div>
                            <label>Set amount to send <small>(Optional)</small></label>
                            <div className="relative display-inline-block">
                                <input type="number" className="semi" placeholder={"CâaEuro amount"} onChange={e => onChangeAmount(e.target.value)} />
                                <img src={LOGO_BLACK} className="caaeuro" alt="Logo CâaEuro" />
                            </div>
                            <Button title={"Send"} loading={loading} click={sendInvits} />
                            <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                        </React.Fragment>
                        :
                        <div className="float-right">
                            <Button title={"Send invits and CaaEUR"} click={() => setDisplayForm(true)} />
                        </div>
                    }
                    <div className="mt-30">
                        {/* <div className="relative display-inline-block mr-20">
                        <label>
                            Sort by : <span className="filter heavy">Date</span> | <span className="filter">Balance</span> | <span className="filter">Email</span>
                        </label>
                    </div> */}
                        <div className="relative display-inline-block">
                            <label>
                                Filter : <span className={deactivated ? "filter" : "filter heavy"} onClick={() => window.location.href = "/admin/users"}>Active</span> | <span className={deactivated ? "filter heavy" : "filter"} onClick={() => window.location.href = "/admin/users?deactivated=true"}>Deactivated</span> | <span className={pending ? "filter heavy" : "filter"} onClick={() => window.location.href = "/admin/users?pending=true"}>Pending</span>
                            </label>
                        </div>
                    </div>
                    <ThreeDots visible={!accounts || (accounts.length === 0)} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                    <div className="beneficiaries">
                        {accounts.map(account =>
                            pending ?
                                <div className="profile max" key={account.user_uuid}>
                                    <div className="avatar" style={{ backgroundImage: `url('https://api.dicebear.com/7.x/initials/svg?seed=${account.email_address}')` }}></div>
                                    <div className="profile_info locked">
                                        <span className="profile_name">{account.email_address}</span>
                                        <span className="small_desc left">Invit sent {new Date(account.created_date).toLocaleDateString()}</span>
                                        <span className="profile_name">0 redeems → 0 <small>CaaEUR</small></span>
                                    </div>
                                    <div className="rm_beneficiary float-right">
                                        🕒
                                    </div>
                                </div>
                                :
                                <div className="profile max" key={account.user_uuid}>
                                    <div className="avatar" style={{ backgroundImage: account.selfie ? `url('data:image/${account.selfie_ext};base64,${account.selfie}')` : `url('https://api.multiavatar.com/${account.user_uuid}.png')` }}></div>
                                    <div className="profile_info locked">
                                        <span className="profile_name">{account.firstname || "-"} {account.lastname || "-"}</span>
                                        <span className="profile_email">{account.email_address}</span>
                                        <span className="small_desc left">{new Date(account.created_date).toLocaleDateString()} | Birth: {account.birthdate || "-"}</span>
                                    </div>
                                    <div className="profile_info pointer">
                                        <span className="small_desc">Press to browse all operations</span>
                                        <div className="redeemer">0 redeems | 0 pending</div>
                                        <strong className="small_desc">0 <small>CaaEUR</small></strong>
                                    </div>
                                    <div className="profile_info float-right mr-70">
                                        <span className="balance">{account.balance} <img src={LOGO_BLACK} className="balance_logo" alt="Logo CâaEuro" /></span>
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