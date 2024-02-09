import React, { useState } from 'react';
import { TOAST_OPTIONS } from '../../constants';

//UTILS
import { isMobile } from "react-device-detect";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from "../../services/admin_services";

//COMPONENTS
import Header from "../../components/header";
import FollowUp from "../../components/followup";
import Button from "../../components/button";

//VISUALS
import BANNER_VISUAL from "../../assets/images/back_admin.jpg";
import LOGO_WHITE from "../../assets/images/logo_white.png";
import { ThreeDots } from 'react-loader-spinner';

//TRANSLATION
import { useTranslation } from 'react-i18next';

const AdminSignIn = () => {
    const { t } = useTranslation();
    const [email, onChangeEmail] = useState();
    const [password, onChangePassword] = useState();
    const [validation, onChangeValidation] = useState(false);
    const [code, onChangeCode] = useState('');
    const [loading, onChangeLoading] = useState(false);
    const [isGA, setGA] = useState(false);

    const login = async () => {
        // eslint-disable-next-line
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
        if (!email || !re.test(email)) {
            toast.error(t('admin.invalid_email'), TOAST_OPTIONS);
        } else if (!password || password.length < 8) {
            toast.error(t('admin.invalid_password'), TOAST_OPTIONS);
        } else {
            onChangeLoading(true);
            try {
                const resp = await AdminService.login(email, password);
                if (resp.status) {
                    toast.success(`${t('admin.auth_code_sent')} ${email}`, TOAST_OPTIONS);
                    onChangeValidation(true);
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                if (e.response && e.response.data && e.response.data.message === "error_authentication_method") {
                    setGA(true)
                } else
                    toast.error(e.response && e.response.data ? t(e.response.data.message) : t(e.message), TOAST_OPTIONS);
            }
            onChangeLoading(false);
        }
    }

    const verify = async () => {
        if (!code || code.length !== 6)
            toast.error(t('admin.invalid_code'), TOAST_OPTIONS);
        else {
            onChangeLoading(true);
            try {
                const resp = await AdminService.login2fa(email, password, code);
                if (resp.status) {
                    window.location.href = "/admin/dashboard"
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                console.log(e.response.data)
                toast.error(e.response && e.response.data ? e.response.data.message || e.response.data.msg : e.message, TOAST_OPTIONS);
            }
            onChangeLoading(false);
        }
    }

    const homeRedirect = () => window.location.href = "/"

    return (
        <>
            {isMobile && <Header />}
            <div className="container mt-0">
                <div className="left_sign" style={{ backgroundImage: `url('${BANNER_VISUAL}')` }}>
                    <img src={LOGO_WHITE} alt="MetaBank logo" className="logo" onClick={homeRedirect} />
                    <span className="metabank_typo white" onClick={homeRedirect}>MetaBank</span>
                </div>
                {!validation ?
                    <div className="right_sign">
                        <p className="instructions">{t('admin.fill_required')}</p>
                        <h1>{t('admin.admin_access')}s</h1>
                        <label>{t('admin.email')}</label>
                        <input type="email" placeholder="john.doe@mail.com" onChange={e => onChangeEmail(e.target.value)} />
                        <label>{t('admin.pswd')}</label>
                        <input type="password" placeholder={t('admin.secured_pswd')} onChange={e => onChangePassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login()} />
                        {isGA &&
                            <React.Fragment>
                                <label>{t('admin.auth_otp')}</label>
                                <input type="number" placeholder="Google authenticator" onChange={e => onChangeCode(e.target.value)} />
                            </React.Fragment>
                        }
                        {!loading &&
                            <>
                                <Button title={t('admin.sign_in')} click={isGA? verify : login} /> <FollowUp intro={t('admin.no_pswd')} description={t('admin.set_pswd')} link={"/admin/reset"} />
                            </>}
                        <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                    </div>
                    :
                    <div className="right_sign">
                        <p className="instructions">{t('admin.set_code')}</p>
                        <h1>{t('admin.verif_access')}</h1>
                        <label>{t('admin.auth_code')}</label>
                        <input type="text" placeholder="Code" value={code} onChange={e => onChangeCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && verify()} />
                        {!loading &&
                            <>
                                <Button title={t('admin.verify')} click={verify} />
                            </>}
                        <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                    </div>
                }
            </div>
            <ToastContainer />
        </>
    )
};

export default AdminSignIn;