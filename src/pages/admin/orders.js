import React, { useState, useEffect } from 'react';

//UTILS
import AdminService from '../../services/admin_services';
import { TOAST_OPTIONS, EXPLORER } from '../../constants';

//VISUALS
import LOGO_BLACK from '../../assets/images/logo_black.png'

//COMPONENTS
import Menu from '../../components/menu/admin';
import BoardHeader from '../../components/boardheader/admin';
import Button from '../../components/button';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

//TRANSLATION
import { useTranslation } from 'react-i18next';

const AdminOrders = () => {
    const { t } = useTranslation();
    const [pending, setPending] = useState(true);
    const [orders, setOrders] = useState(null);
    const [users, setUsers] = useState({});
    const [loading, onChangeLoading] = useState(false);
    const [amount, setAmount] = useState("");
    const [displayValidation, setDisplayValidation] = useState(null);

    const loadOrders = async () => {
        setOrders(null)
        let ords = await AdminService.listOrders(pending);
        setOrders(ords.orders);
        setUsers(ords.user_info);
    }

    const toggleValidation = (uuid) => {
        setDisplayValidation(displayValidation === uuid ? null : uuid)
    }

    const validateOrder = async (user_uuid) => {
        if (!amount || amount === "-" || (parseInt(amount) < 10))
            toast.error(t('transfer.invalid_amount') + ' Min. 10 €', TOAST_OPTIONS)
        else {
            onChangeLoading(true)
            if (window.confirm(t('admin.confirm_order'))) {
                try {
                    const resp = await AdminService.validateOrder(user_uuid, displayValidation, parseInt(amount))
                    if (resp.status) {
                        setAmount("")
                        setTimeout(() => {
                            onChangeLoading(false)
                            setDisplayValidation(null)
                            toast.success(t('admin.order_validated'), TOAST_OPTIONS)
                            loadOrders()
                        }, 10000)
                    } else {
                        toast.error(resp.message, TOAST_OPTIONS)
                        onChangeLoading(false)
                    }
                } catch (e) {
                    onChangeLoading(false)
                    console.log(e.response.data)
                    toast.error(e.response && e.response.data ? t(e.response.data.message) : t(e.message), TOAST_OPTIONS)
                }
            }
        }
    }

    useEffect(() => {
        loadOrders();
        // eslint-disable-next-line
    }, [pending]);


    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={t('admin.orders')} />
                <div className="content">
                    <p><strong>{t('admin.manage_orders')}</strong></p>
                    <label className="ml-0">
                        {t('admin.filter')} : <span className={pending ? "filter heavy" : "filter "} onClick={() => setPending(true)}>Pending</span> | <span className={!pending ? "filter heavy" : "filter"} onClick={() => setPending(false)}>Validated</span>
                    </label>
                    <ThreeDots visible={!orders} height="50" width="50" color="var(--primary)" radius="9" ariaLabel="three-dots-loading" />
                    {orders && orders.map(op =>
                        <div className="operation" key={op.user_purchase_uuid} style={{ minWidth: '80%' }}>
                            <div className="op_type">
                                {t('dashboard.purchase')}
                                <br />
                                <small className="primary">REF: {op.reference}</small>
                            </div>
                            {op.tx_hash ?
                                <div className="op_link" onClick={() => window.open(`${EXPLORER}/tx/${op.tx_hash}`)}>{op.tx_hash}</div>
                                :
                                <div className="op_pending">{t('dashboard.awaiting_transfer')}</div>
                            }
                            <label className="ml-0">{t('dashboard.created')} {new Date(op.created_date).toLocaleDateString()}</label>
                            {op.payment_date && <label className="ml-0">{t('dashboard.funds_sent')} {new Date(op.payment_date).toLocaleDateString()}</label>}
                            {users[op.user_uuid] && <div className="beneficiaries">
                                <div className="profile">
                                    <div className="avatar"
                                        onClick={() => window.open(`/admin/user/${op.user_uuid}`)}
                                        style={{ backgroundImage: `url('https://api.dicebear.com/7.x/initials/svg?seed=${users[op.user_uuid].firstname}')` }}>
                                    </div>
                                    <div className="profile_info locked">
                                        <span className="profile_name">
                                            {users[op.user_uuid].firstname || "-"} {users[op.user_uuid].lastname || "-"}
                                            {users[op.user_uuid].kyc_status ?
                                                users[op.user_uuid].kyc_status === "APPROVED" ?
                                                    <small className="ml-10"><strong className="success">KYC {users[op.user_uuid].kyc_status}</strong></small>
                                                    :
                                                    <small className="ml-10"><strong className="primary">KYC {users[op.user_uuid].kyc_status}</strong></small>
                                                :
                                                <small className="ml-10"><strong className="warning">KYC {t('dashboard.no_kyc')}</strong></small>
                                            }
                                        </span>
                                        <span className="profile_email">{users[op.user_uuid].email}</span>
                                        <span className="small_desc left">{users[op.user_uuid].public_address}</span>
                                    </div>
                                </div>
                            </div>}
                            <div className="select">
                                <div className="select_profile">
                                    <div className="select_avatar" style={{ backgroundImage: `url('${LOGO_BLACK}')` }}></div>
                                    <div className="select_info">
                                        <span className="select_email">{t('dashboard.purchase_to')} <strong>LiFiSe</strong></span>
                                        <span className="select_name">
                                            {t('dashboard.ordered')} {op.total_price_eur} <small>€</small> <small>{t('dashboard.for')}</small> {op.nb_token} <small>EuroLFS</small>
                                        </span>
                                        {op.amount_received && <span className="select_name primary">
                                            {t('dashboard.received_wire_tx')} {op.amount_received} <small>€</small>
                                            <br />
                                            <small>{t('dashboard.payment_of')}</small> {op.amount_received} <small>EuroLFS</small>
                                        </span>}
                                    </div>
                                </div>
                            </div>
                            {pending && displayValidation !== op.user_purchase_uuid && <div className="mt-10">
                                <Button click={() => toggleValidation(op.user_purchase_uuid)} loading={loading} title={t('admin.confirm_order')} />
                            </div>}
                            {displayValidation === op.user_purchase_uuid &&
                                <React.Fragment>
                                    <label>{t('admin.amount_received')}</label>
                                    <div className="relative display-inline-block">
                                        <input type="number" className="semi" placeholder={"EuroLFS amount"} min="0" step="1" onChange={(e) => setAmount(e.target.value)} />
                                        <img src={LOGO_BLACK} className="eurolfs" alt="Logo EuroLFS" />
                                    </div>
                                    {!loading &&
                                        <div className="relative display-inline-block mobile_block">
                                            <Button title={t('admin.validate')} click={() => validateOrder(op.user_uuid)} />
                                            <Button title={t('dashboard.cancel')} framed={true} click={() => toggleValidation(op.user_purchase_uuid)} />
                                        </div>}
                                    <div className="relative display-inline-block mobile_block ml-20">
                                        <ThreeDots visible={loading} height="50" width="50" color="var(--primary)" radius="9" ariaLabel="three-dots-loading" />
                                    </div>
                                </React.Fragment>
                            }
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
};

export default AdminOrders;