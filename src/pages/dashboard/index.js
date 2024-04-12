import React, { useState, useEffect } from 'react'
import { TOAST_OPTIONS, EXPLORER } from '../../constants'

//UTILS
import { isMobile } from 'react-device-detect'
import TokenService from "../../services/token_services"
import UserService from '../../services/user_services'

//VISUALS
import LOGO_BLACK from '../../assets/images/logo_black.png'
import BANKINGWEB3 from '../../assets/images/banking_web3.png'

//COMPONENTS
import Menu from '../../components/menu'
import BoardHeader from '../../components/boardheader'
import Button from '../../components/button'
import { ToastContainer, toast } from 'react-toastify'
import { ThreeDots } from 'react-loader-spinner'
import { Synaps } from '@synaps-io/verify-sdk'

//TRANSLATION
import { useTranslation } from 'react-i18next'

const Dashboard = () => {
    const { t } = useTranslation()
    const [profile, setProfile] = useState({})
    const [balance, setBalance] = useState("-")
    const [tokenClaims, setTokenClaims] = useState([])
    const [claiming, onChangeClaiming] = useState(false)
    const [displayPurchase, setDisplayPurchase] = useState(false)
    const [amount, setAmount] = useState("")
    const [loading, onChangeLoading] = useState(null)
    const [trigger, onChangeTrigger] = useState(false)
    const [banking, setBanking] = useState({})
    const [reference, setReference] = useState(null)
    const [price, setPrice] = useState(null)
    const [orders, setOrders] = useState([])
    const [processing, onChangeProcessing] = useState(null)
    const [kycDetails, setKYCdetails] = useState({})
    const [copied, setCopied] = useState(null)

    const togglePurchase = () => {
        if (kycDetails && kycDetails.kyc_status === "APPROVED")
            setDisplayPurchase(true);
        else{
            toast.info(t('dashboard.approved_kyc'), TOAST_OPTIONS);
            startKYC();
        }
    }

    const copyClipboard = (key, value) => {
        setCopied(key)
        navigator.clipboard.writeText(value)
        setTimeout(() => {
            setCopied(null)
        }, 2000)
    }

    const loadInfo = async () => {
        const data = TokenService.getUser()
        setProfile(data.account)
        const acc = await UserService.getAccountDetails()
        setBalance(acc.wallet.token_balance)
        setTokenClaims(acc.token_claims.to_claim)
        const purchases = await UserService.listOrders()
        setOrders(purchases)
        const details = await UserService.detailsKYC()
        setKYCdetails(details)
        onChangeTrigger(true)
    }

    useEffect(() => {
        loadInfo()
        // eslint-disable-next-line
    }, [])

    const claimFunds = async (claim_uuid) => {
        if (kycDetails && kycDetails.kyc_status === "APPROVED") {
            if (claiming)
                toast.warn(t('dashboard.wait_claim'), TOAST_OPTIONS)
            else {
                onChangeClaiming(true)
                try {
                    const resp = await UserService.claim([claim_uuid])
                    if (resp.status && resp.transactions[claim_uuid]) {
                        toast.success(`${t('dashboard.funds_claimed')} ${resp.transactions[claim_uuid].tx_hash.substring(0, 10)}...${resp.transactions[claim_uuid].tx_hash.substring(resp.transactions[claim_uuid].tx_hash.length - 10, resp.transactions[claim_uuid].tx_hash.length - 1)}`, TOAST_OPTIONS)
                        setTimeout(async () => {
                            await loadInfo()
                            onChangeClaiming(false)
                        }, 2500)
                    } else {
                        toast.error(resp.message, TOAST_OPTIONS)
                        onChangeClaiming(false)
                    }
                } catch (e) {
                    console.log(e.response.data)
                    toast.error(e.response && e.response.data ? t(e.response.data.message) : t(e.message), TOAST_OPTIONS)
                    onChangeClaiming(false)
                }
            }
        }
        else{
            toast.info(t('dashboard.claim_kyc'), TOAST_OPTIONS);
            startKYC();
        }
    }

    const depositOrder = async () => {
        if (!amount || amount === "-" || (parseInt(amount) < 50))
            toast.error(t('transfer.invalid_amount') + ' Min. 50 €', TOAST_OPTIONS)
        else {
            onChangeLoading(true)
            if (window.confirm(t('dashboard.confirm_deposit'))) {
                try {
                    const resp = await UserService.createOrder(parseInt(amount))
                    if (resp.status) {
                        setBanking(resp.bank_account)
                        setReference(resp.reference)
                        setPrice(resp.price_eur)
                        toast.success(t('dashboard.order_created'), TOAST_OPTIONS)
                    } else
                        toast.error(resp.message, TOAST_OPTIONS)
                } catch (e) {
                    console.log(e.response.data)
                    toast.error(e.response && e.response.data ? t(e.response.data.message) : t(e.message), TOAST_OPTIONS)
                }
            }
            onChangeLoading(false)
        }
    }

    const startKYC = async () => {
        onChangeProcessing(true)
        const sessionId = await UserService.initKYC()
        Synaps.init({
            sessionId,
            onFinish: async () => {
                toast.success(t('dashboard.kyc_finished'), TOAST_OPTIONS)
                const details = await UserService.detailsKYC()
                setKYCdetails(details)
            },
            mode: 'modal',
        })
        setTimeout(() => {
            Synaps.show()
        }, 1000)
    }

    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={t('dashboard.my_account')} />
                {!reference && !isMobile && <img src={BANKINGWEB3} className="visual" alt="Digital banking" />}
                <div className="content">
                    {trigger && <p>
                        <small>{t('dashboard.account_number')} {profile.public_address}</small>
                        <br />
                        {kycDetails.kyc_status ?
                            kycDetails.kyc_status === "APPROVED" ?
                                <small>{t('dashboard.kyc_status')} : <strong className="success">{kycDetails.kyc_status}</strong></small>
                                :
                                <small>{t('dashboard.kyc_status')} : <strong className="primary">{kycDetails.kyc_status}</strong></small>
                            :
                            <small>{t('dashboard.kyc_status')} : <strong className="warning">{t('dashboard.no_kyc')}</strong></small>
                        }
                    </p>}
                    <h2>{t('dashboard.caaeuro_balance')}</h2>
                    <span className="balance">{balance}</span>
                    <img src={LOGO_BLACK} className="currency" alt="CaaEuro logo" />
                    {isMobile && <br />}
                    {!reference && !displayPurchase && trigger && <Button title={t('dashboard.purchase_funds')} click={togglePurchase} />}
                    {!reference && !displayPurchase && !processing && (!kycDetails.kyc_status || ["SUBMISSION_REQUIRED", "REJECTED"].includes(kycDetails.kyc_status)) && trigger && <Button title={t('dashboard.process_kyc')} framed={true} click={startKYC} />}
                    {!reference && displayPurchase &&
                        <React.Fragment>
                            <h2 className="mt-50">{t('dashboard.purchase_by_transfer')}</h2>
                            <label>{t('dashboard.amount_to_purchase')}</label>
                            <div className="relative display-inline-block">
                                <input type="number" className="semi" placeholder={"CâaEuro amount"} min="0" step="1" onChange={(e) => setAmount(e.target.value)} value={amount} />
                                <img src={LOGO_BLACK} className="caaeuro" alt="Logo CâaEuro" />
                            </div>
                            {!loading &&
                                <div className="relative display-inline-block mobile_simple_block">
                                    <Button title={t('dashboard.set_order')} click={depositOrder} />
                                    <Button title={t('dashboard.cancel')} framed={true} click={() => setDisplayPurchase(false)} />
                                </div>}
                            <div className="relative display-inline-block mobile_simple_block ml-20">
                                <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                            </div>
                        </React.Fragment>
                    }
                    {reference &&
                        <React.Fragment>
                            <h2 className="mt-50">{t('dashboard.order_created_short')}</h2>
                            <label className="ml-0">
                                <small>{t('dashboard.order_mail')}</small>
                            </label>
                            <label className="ml-0">
                                {t('dashboard.order_complete1')} <strong>{t('dashboard.order_complete2')}</strong> {t('dashboard.order_complete3')}
                            </label>
                            <table className="receipt_order">
                                <tr>
                                    <td>
                                        <label>{t('dashboard.reference')}</label>
                                    </td>
                                    <td>
                                        <label><h3 className="primary">{reference} <span className="pointer" onClick={() => copyClipboard("ref", reference)}>{copied === "ref" ? "✅" : "📋"}</span></h3></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>{t('dashboard.amount')}</label>
                                    </td>
                                    <td>
                                        <label><h3>{price} € <span className="pointer" onClick={() => copyClipboard("price", price)}>{copied === "price" ? "✅" : "📋"}</span></h3></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>{t('dashboard.acc_number')}</label>
                                    </td>
                                    <td>
                                        <label><h3>{banking.iban} <span className="pointer" onClick={() => copyClipboard("iban", banking.iban)}>{copied === "iban" ? "✅" : "📋"}</span></h3></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>BIC/SWIFT</label>
                                    </td>
                                    <td>
                                        <label><h3>{banking.bic_swift} <span className="pointer" onClick={() => copyClipboard("bic", banking.bic_swift)}>{copied === "bic" ? "✅" : "📋"}</span></h3></label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>{t('dashboard.bank_name')}</label>
                                    </td>
                                    <td>
                                        <label><h3>{banking.bank_name} <span className="pointer" onClick={() => copyClipboard("bank_name", banking.bank_name)}>{copied === "bank_name" ? "✅" : "📋"}</span></h3></label>
                                    </td>
                                </tr>
                            </table>
                            <hr />
                        </React.Fragment>
                    }
                    {!loading && orders.map(op =>
                        <div className="operation purchase" key={op.user_purchase_uuid}>
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
                            <div className="select">
                                <div className="select_profile">
                                    <div className="select_avatar" style={{ backgroundImage: `url('${LOGO_BLACK}')` }}></div>
                                    <div className="select_info">
                                        <span className="select_email">{t('dashboard.purchase_to')} <strong>MetaBank</strong></span>
                                        <span className="select_name">
                                            {t('dashboard.ordered')} {op.total_price_eur} <small>€</small> <small>{t('dashboard.for')}</small> {op.nb_token} <small>CaâEuro</small>
                                        </span>
                                        {op.amount_received && <span className="select_name primary">
                                            {t('dashboard.received_wire_tx')} {op.amount_received} <small>€</small>
                                            <br />
                                            <small>{t('dashboard.payment_of')}</small> {op.amount_received} <small>CaâEuro</small>
                                        </span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
                    {isMobile &&
                        <div className="share share_mobile">
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
            </div>
            <ToastContainer />
        </div>
    )
}

export default Dashboard