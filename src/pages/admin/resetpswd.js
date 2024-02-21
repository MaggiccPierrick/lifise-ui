import React, { useState } from 'react';
import { TOAST_OPTIONS } from '../../constants';

//UTILS
import { isMobile } from "react-device-detect";
import AdminService from "../../services/admin_services";

//COMPONENTS
import Header from "../../components/header";
import FollowUp from "../../components/followup";
import Button from "../../components/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';

//VISUALS
import BANNER_VISUAL from "../../assets/images/back_admin.jpg";
import LOGO_WHITE from "../../assets/images/full_white.png";

//TRANSLATION
import { useTranslation } from 'react-i18next';

const AdminResetPswd = () => {
    const { t } = useTranslation();
    const [email, onChangeEmail] = useState();
    const [password, onChangePassword] = useState();
    const [validation, onChangeValidation] = useState(false);
    const [code, onChangeCode] = useState('');
    const [loading, onChangeLoading] = useState(false);
    const [success, onChangeSuccess] = useState(false);

    const sendReset = async () => {
        // eslint-disable-next-line
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
        if (!email || !re.test(email)) {
            toast.error(t('admin.invalid_email'), TOAST_OPTIONS);
        } else {
            onChangeLoading(true);
            try {
                const resp = await AdminService.sendReset(email);
                if (resp.status) {
                    toast.success(`${t('admin.reset_code')} ${email}`, TOAST_OPTIONS);
                    onChangeValidation(true);
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                toast.error(e.response && e.response.data ? t(e.response.data.message) : t(e.message), TOAST_OPTIONS);
            }
            onChangeLoading(false);
        }
    }

    const newPswd = async () => {
        if (!code || code.length !== 8)
            toast.error(t('admin.invalid_code'), TOAST_OPTIONS);
        else if (!password || password.length < 8)
            toast.error(t('admin.invalid_password'), TOAST_OPTIONS);
        else {
            onChangeLoading(true);
            try {
                const resp = await AdminService.resetPswd(email, password, code);
                if (resp.status) {
                    toast.success(t('admin.new_pswd_success'), TOAST_OPTIONS);
                    onChangeSuccess(true);
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                console.log(e.response.data)
                toast.error(e.response && e.response.data ? t(e.response.data.message) : t(e.message), TOAST_OPTIONS);
            }
            onChangeLoading(false);
        }
    }

    const homeRedirect = () => window.location.href = "/";
    const signRedirect = () => window.location.href = "/admin/signin";

    return (
        <>
            {isMobile && <Header />}
            <div className="container mt-0">
                <div className="left_sign" style={{ backgroundImage: `url('${BANNER_VISUAL}')` }}>
                    <img src={LOGO_WHITE} alt="MetaBank logo" className="logo" onClick={homeRedirect} />
                </div>
                {!validation ?
                    <div className="right_sign">
                        <p className="instructions">{t('admin.fill_required_code')}</p>
                        <h1>{t('admin.receive_code')}</h1>
                        <label>{t('admin.email')}</label>
                        <input type="email" placeholder="john.doe@mail.com" onChange={e => onChangeEmail(e.target.value)} />
                        <Button title={t('admin.send_reset')} click={sendReset} loading={loading} />
                        <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                    </div>
                    :
                    <div className="right_sign">
                        <p className="instructions">{t('admin.set_code_pswd')}</p>
                        <h1>{t('admin.set_new_pswd')}</h1>
                        <label>{t('admin.verif_code')}</label>
                        <input type="text" placeholder="Code" onChange={e => onChangeCode(e.target.value)} value={code}/>
                        <label>{t('admin.pswd')}</label>
                        <input type="password" placeholder={t('admin.secured_pswd')} onChange={e => onChangePassword(e.target.value)}/>
                        {!loading && !success && <>
                            <Button title={t('admin.set_new_pswd')} click={newPswd} /> <FollowUp intro={t('admin.did_not_receive')} description={t('admin.resend_code')} action={sendReset} />
                        </>}
                        <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                        <Button title={t('admin.go_sign_in')} click={signRedirect} loading={loading || !success} />
                    </div>
                }
            </div>
            <ToastContainer />
        </>
    )
};

export default AdminResetPswd;