import React, { useState, useEffect } from 'react';
import { TOAST_OPTIONS } from '../../constants';

//UTILS
import { useSearchParams } from 'react-router-dom';
import AdminService from '../../services/admin_services';

//VISUALS
import LOGO_BLACK from '../../assets/images/logo_black.png';

//COMPONENTS
import Menu from '../../components/menu/admin';
import BoardHeader from '../../components/boardheader/admin';
import Button from '../../components/button';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

//TRANSLATION
import { useTranslation } from 'react-i18next';

const AdminUsers = () => {
    const { t } = useTranslation();
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
        setAccounts(users)
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
                    toast.warn(`${entry} ${t('admin.invalid_format_invit')}`, TOAST_OPTIONS);
                } else
                    mailingList.push(entry)
            }
            const resp = await AdminService.inviteUsers(mailingList, amount);
            if (resp.status) {
                toast.success(t('admin.invits_sent'), TOAST_OPTIONS);
                loadUsers();
            } else
                toast.error(resp.message, TOAST_OPTIONS);
            setLoading(false)
        } catch (e) {
            setLoading(false)
            toast.error(e.response && e.response.data ? t(e.response.data.message) : t(e.message), TOAST_OPTIONS);
        }
    }

    const deactivate = async (user_uuid) => {
        if (window.confirm(t('admin.confirm_deactivation'))) {
            try {
                const resp = await AdminService.deactivateUser(user_uuid);
                if (resp.status) {
                    toast.success(t('admin.account_deactivated'), TOAST_OPTIONS);
                    loadUsers();
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                toast.error(e.response && e.response.data ? t(e.response.data.message) : t(e.message), TOAST_OPTIONS);
            }
        }
    }

    const reactivate = async (user_uuid) => {
        try {
            const resp = await AdminService.reactivateUser(user_uuid);
            if (resp.status) {
                toast.success(t('admin.account_reactivated'), TOAST_OPTIONS);
                loadUsers();
            } else
                toast.error(resp.message, TOAST_OPTIONS);
        } catch (e) {
            toast.error(e.response && e.response.data ? t(e.response.data.message) : t(e.message), TOAST_OPTIONS);
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
                <BoardHeader title={t('admin.metabank_users')} />
                <div className="content">
                    {/* <div className="search mb-20">
                        <input type="text" className="semi" placeholder="Search email or address" />
                        <Button title={"Search"} />
                    </div> */}
                    {displayForm ?
                        <React.Fragment>
                            <label>{t('admin.email_addresses')} <small>{t('admin.seperate_comma')} ","</small></label>
                            <div className="relative display-inline-block">
                                <textarea placeholder={t('admin.emails_link')} onChange={e => onChangeEmails(e.target.value)}></textarea>
                            </div>
                            <label>{t('admin.amount_send')} <small>{t('admin.optionnal')}</small></label>
                            <div className="relative display-inline-block">
                                <input type="number" className="semi" placeholder={t('admin.caaeuro_amount')} onChange={e => onChangeAmount(e.target.value)} />
                                <img src={LOGO_BLACK} className="caaeuro" alt="Logo CâaEuro" />
                            </div>
                            <Button title={t('admin.send')} loading={loading} click={sendInvits} />
                            <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                        </React.Fragment>
                        :
                        <div className="float-right">
                            <Button title={t('admin.send_invits')} click={() => setDisplayForm(true)} />
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
                                {t('admin.filter')} : <span className={deactivated ? "filter" : "filter heavy"} onClick={() => window.location.href = "/admin/users"}>{t('admin.activated')}</span> | <span className={deactivated ? "filter heavy" : "filter"} onClick={() => window.location.href = "/admin/users?deactivated=true"}>{t('admin.deactivated')}</span> | <span className={pending ? "filter heavy" : "filter"} onClick={() => window.location.href = "/admin/users?pending=true"}>{t('admin.pending_cap')}</span>
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
                                        <span className="small_desc left">{t('admin.invit_sent')} {new Date(account.created_date).toLocaleDateString()}</span>
                                        <span className="profile_name">{account.token_claims.to_claim.length} <small>{t('admin.pending_lw')}</small> → {account.token_claims.total_to_claim} <small>CaaEUR</small></span>
                                    </div>
                                    <div className="rm_beneficiary float-right">
                                        🕒
                                    </div>
                                </div>
                                :
                                <div className="profile max" key={account.user_uuid}>
                                    <div className="avatar"
                                        onClick={() => window.open(`/admin/user/${account.user_uuid}`)}
                                        style={{ backgroundImage: `url('https://api.dicebear.com/7.x/initials/svg?seed=${account.email_address}')` }}>
                                    </div>
                                    <div className="profile_info locked">
                                        <span className="profile_name">{account.firstname || "-"} {account.lastname || "-"}</span>
                                        <span className="profile_email">{account.email_address}</span>
                                        <span className="small_desc left">{account.public_address}</span>
                                        {account.kyc_status ?
                                            account.kyc_status === "APPROVED" ?
                                                <span className="small_desc left">KYC : <strong className="success">{account.kyc_status}</strong></span>
                                                :
                                                <span className="small_desc left">KYC : <strong className="primary">{account.kyc_status}</strong></span>
                                            :
                                            <span className="small_desc left">KYC : <strong className="warning">{t('dashboard.no_kyc')}</strong></span>
                                        }
                                    </div>
                                    <div className="profile_info pointer">
                                        <span className="small_desc">{new Date(account.created_date).toLocaleDateString()} | Birth: {account.birthdate || "-"}</span>
                                        <div className="redeemer">
                                            {account.token_claims.to_claim.length} {t('admin.pending')} → {account.token_claims.total_to_claim} <small>CaaEUR</small>
                                        </div>
                                    </div>
                                    <div className="browse float-right" onClick={() => window.open(`/admin/user/${account.user_uuid}`)}>
                                        ➕
                                    </div>
                                    {deactivated ?
                                        account.public_address &&
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