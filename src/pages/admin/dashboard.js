import React, { useState, useEffect } from 'react';

//UTILS
import { useSearchParams } from 'react-router-dom';
import AdminService from '../../services/admin_services';
import TokenService from "../../services/token_services";
import { TOAST_OPTIONS } from '../../constants';

//COMPONENTS
import Menu from '../../components/menu/admin';
import BoardHeader from '../../components/boardheader/admin';
import Button from '../../components/button';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

const AdminDashboard = () => {
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    const [profile, setProfile] = useState({});
    const [accounts, setAccounts] = useState([]);
    const [deactivated, setDeactivated] = useState(false);
    const [email, onChangeEmail] = useState();
    const [firstname, onChangeFirstname] = useState();
    const [lastname, onChangeLastname] = useState();
    const [loading, onChangeLoading] = useState(false);
    const [displayCreation, setDisplayCreation] = useState(false);

    const loadAdmins = async () => {
        const data = TokenService.getUser();
        setProfile(data.account);
        const deactivationState = searchParams.get("deactivated") === "true";
        setDeactivated(deactivationState);
        const admins = await AdminService.getAdmins(deactivationState);
        setAccounts(admins);
    }

    const toggleCreation = () => {
        setDisplayCreation(!displayCreation)
    }

    const deactivate = async (admin_uuid) => {
        if (window.confirm("Do you confirm deactivation?")) {
            try {
                const resp = await AdminService.deactivate(admin_uuid);
                if (resp.status) {
                    toast.success(`Administration account successfully deactivated`, TOAST_OPTIONS);
                    loadAdmins();
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                toast.error(e.response && e.response.data ? e.response.data.message : e.message, TOAST_OPTIONS);
            }
        }
    }

    const reactivate = async (admin_uuid) => {
        try {
            const resp = await AdminService.reactivate(admin_uuid);
            if (resp.status) {
                toast.success(`Administration account successfully reactivated`, TOAST_OPTIONS);
                loadAdmins();
            } else
                toast.error(resp.message, TOAST_OPTIONS);
        } catch (e) {
            toast.error(e.response && e.response.data ? e.response.data.message : e.message, TOAST_OPTIONS);
        }
    }

    const createAdmin = async () => {
        // eslint-disable-next-line
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
        if (!email || !re.test(email))
            toast.error('Email syntax invalid!', TOAST_OPTIONS);
        else if (!firstname)
            toast.error('Firstname invalid!', TOAST_OPTIONS);
        else if (!lastname)
            toast.error('Lastname invalid!', TOAST_OPTIONS);
        else {
            onChangeLoading(true);
            try {
                const resp = await AdminService.createAdmin(email, firstname, lastname);
                if (resp.status) {
                    toast.success(`Account successfully created`, TOAST_OPTIONS);
                    loadAdmins();
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                toast.error(e.response && e.response.data ? e.response.data.message : e.message, TOAST_OPTIONS);
            }
            onChangeLoading(false);
        }
    }

    useEffect(() => {
        loadAdmins();
        // eslint-disable-next-line
    }, []);


    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={"Administrators"} />
                <div className="content">
                    <p><strong>Manage administration accounts</strong></p>
                        <label className="ml-0">
                            Filter : <span className={deactivated? "filter": "filter heavy"} onClick={() => window.location.href = "/admin/dashboard"}>Active</span> | <span className={deactivated? "filter heavy": "filter"}  onClick={() => window.location.href = "/admin/dashboard?deactivated=true"}>Deactivated</span>
                        </label>
                    <div className="beneficiaries">
                        {accounts.map(account =>
                            <div className="profile" key={account.admin_uuid}>
                                <div className="avatar" style={{ backgroundImage: `url('https://api.dicebear.com/7.x/fun-emoji/svg?seed=${account.admin_uuid}')` }}></div>
                                <div className="profile_info">
                                    <span className="profile_name">{account.firstname} {account.lastname}</span>
                                    {profile.admin_uuid === account.admin_uuid ?
                                        <span className="profile_email">{account.email_address} | <a href={"/admin/profile"}>Update</a></span>
                                        :
                                        <span className="profile_email">{account.email_address}</span>
                                    }
                                </div>
                                {deactivated ?
                                    <div className="rm_beneficiary" onClick={() => reactivate(account.admin_uuid)}>
                                        ✅
                                    </div>
                                    :
                                    <div className="rm_beneficiary" onClick={() => deactivate(account.admin_uuid)}>
                                        🗑️
                                    </div>}
                            </div>
                        )}
                    </div>
                    <Button title={"New account"} click={toggleCreation} loading={displayCreation} />
                    {displayCreation && <div className="white_board">
                        <p><strong>Create new administration account</strong></p>
                        <div className="mt-30">
                            <label>Firstname</label>
                            <input type="text" placeholder='John' onChange={e => onChangeFirstname(e.target.value)} />
                        </div>
                        <div className="mt-10">
                            <label>Lastname</label>
                            <input type="text" placeholder='Doe' onChange={e => onChangeLastname(e.target.value)} />
                        </div>
                        <div className="mt-10 mb-20">
                            <label>Email</label>
                            <input type="text" placeholder='john.doe@mail.com' onChange={e => onChangeEmail(e.target.value)} />
                        </div>
                        <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                        <Button title={"Create"} click={createAdmin} loading={loading} />
                        <Button title={"Cancel"} click={toggleCreation} loading={loading} framed={true} />
                    </div>}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
};

export default AdminDashboard;