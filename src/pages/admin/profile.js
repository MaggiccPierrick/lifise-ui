import { useState, useEffect } from 'react';
import { TOAST_OPTIONS } from '../../constants';

//UTILS
import TokenService from "../../services/token_services";
import AdminService from "../../services/admin_services";
import { ToastContainer, toast } from 'react-toastify';

//COMPONENTS
import Menu from '../../components/menu/admin';
import BoardHeader from '../../components/boardheader/admin';
import Button from '../../components/button';
import { ThreeDots } from 'react-loader-spinner';
import QRCode from "react-qr-code";

//TRANSLATION
import { useTranslation } from 'react-i18next';

const AdminProfile = () => {
    const { t } = useTranslation();
    const [firstname, onChangeFirstname] = useState("");
    const [lastname, onChangeLastname] = useState("");
    const [email, onChangeEmail] = useState("");
    const [newPswd, onChangeNewPassword] = useState({});
    const [currentPswd, onChangeCurrentPassword] = useState({});
    const [loading, onChangeLoading] = useState(null);
    const [qr, onChangeQR] = useState();
    const [otp, onChangeOTP] = useState("");

    useEffect(() => {
        const data = TokenService.getUser();
        onChangeFirstname(data.account.firstname);
        onChangeLastname(data.account.lastname);
        onChangeEmail(data.account.email_address);
    }, []);

    const updateProfile = async () => {
        if (!firstname)
            toast.error(t('admin.invalid_firstname'), TOAST_OPTIONS);
        else if (!lastname)
            toast.error(t('admin.invalid_lastname'), TOAST_OPTIONS);
        else {
            onChangeLoading("profile");
            try {
                const resp = await AdminService.updateProfile(firstname, lastname);
                if (resp.status) {
                    toast.success(t('admin.profile_updated'), TOAST_OPTIONS);
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                console.log(e.response.data)
                toast.error(e.response && e.response.data ? e.response.data.message || e.response.data.msg : e.message, TOAST_OPTIONS);
            }
            onChangeLoading(null);
        }
    }

    const updateEmail = async () => {
        // eslint-disable-next-line
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
        if (!email || !re.test(email)) {
            toast.error(t('admin.invalid_email'), TOAST_OPTIONS);
        } else {
            onChangeLoading("email");
            try {
                const resp = await AdminService.updateEmail(email);
                if (resp.status) {
                    toast.success(t('admin.email_updated'), TOAST_OPTIONS);
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                console.log(e.response.data)
                toast.error(e.response && e.response.data ? e.response.data.message || e.response.data.msg : e.message, TOAST_OPTIONS);
            }
            onChangeLoading(null);
        }
    }

    const updatePassword = async () => {
        if (!currentPswd || currentPswd.length < 8)
            toast.error(t('admin.invalid_current_pswd'), TOAST_OPTIONS);
        else if (!newPswd || newPswd.length < 8)
            toast.error(t('admin.invalid_new_pswd'), TOAST_OPTIONS);
        else {
            onChangeLoading("password");
            try {
                const resp = await AdminService.updatePassword(currentPswd, newPswd);
                if (resp.status) {
                    toast.success(t('admin.new_pswd_success'), TOAST_OPTIONS);
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                console.log(e.response.data)
                toast.error(e.response && e.response.data ? e.response.data.message || e.response.data.msg : e.message, TOAST_OPTIONS);
            }
            onChangeLoading(null);
        }
    }

    const activateOTP = async () => {
        if (!otp || otp.length !== 6)
            toast.error(t('admin.invalid_current_otp'), TOAST_OPTIONS);
        else {
            onChangeLoading("generation");
            try {
                const resp = await AdminService.activateGA(otp);
                if (resp.status) {
                    toast.success(resp.message, TOAST_OPTIONS);
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                console.log(e.response.data)
                toast.error(e.response && e.response.data ? e.response.data.message || e.response.data.msg : e.message, TOAST_OPTIONS);
            }
            onChangeLoading(null);
        }
    }

    const generateQR = async () => {
        onChangeLoading("generation");
        try {
            const resp = await AdminService.generateGA();
            if (resp.status) {
                onChangeQR(resp.otp_auth_url)
            } else
                toast.error(resp.message, TOAST_OPTIONS);
        } catch (e) {
            console.log(e.response.data)
            toast.error(e.response && e.response.data ? e.response.data.message || e.response.data.msg : e.message, TOAST_OPTIONS);
        }
        onChangeLoading(null);
    }

    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={t('admin.profile')} />
                <div className="content">
                    <p><strong>{t('admin.edit_admin')} </strong></p>
                    <div className="mt-30">
                        <label>{t('admin.firstname')}</label>
                        <input type="text" value={firstname} onChange={(e) => onChangeFirstname(e.target.value)} />
                    </div>
                    <div className="mt-10 mb-20">
                        <label>{t('admin.lastname')}</label>
                        <input type="text" value={lastname} onChange={(e) => onChangeLastname(e.target.value)} />
                    </div>
                    <Button title={t('admin.update_profile')} loading={loading === "profile"} click={updateProfile} />
                    <ThreeDots visible={loading === "profile"} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                    <div className="mt-30 mb-20">
                        <label>{t('admin.email')}</label>
                        <input type="text" value={email} onChange={(e) => onChangeEmail(e.target.value)} />
                    </div>
                    <Button title={t('admin.update_email')} loading={loading === "email"} click={updateEmail} />
                    <ThreeDots visible={loading === "email"} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                    <div className="mt-30">
                        <label>{t('admin.current_pswd')}</label>
                        <input type="password" onChange={(e) => onChangeCurrentPassword(e.target.value)} />
                    </div>
                    <div className="mt-10 mb-20">
                        <label>{t('admin.new_pswd')}</label>
                        <input type="password" onChange={(e) => onChangeNewPassword(e.target.value)} />
                    </div>
                    <Button title={t('admin.update_pswd')} loading={loading === "password"} click={updatePassword} />
                    <ThreeDots visible={loading === "password"} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                    {qr ?
                        <div className="mt-30">
                            <label>
                            {t('admin.scan_activate')}
                            </label>
                            <QRCode
                                size={256}
                                value={qr}
                                style={{display: 'block', margin: '10px 20px'}}
                                bgColor={'transparent'}
                                viewBox={`0 0 256 256`}
                            />
                            <input type="text" value={otp} onChange={(e) => onChangeOTP(e.target.value)} />
                            <Button title={t('admin.activate')} loading={loading === "activation"} click={activateOTP} />
                            <ThreeDots visible={loading === "activation"} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                        </div>
                        :
                        <div className="mt-30">
                            <label>{t('admin.init_ga')}</label>
                            <Button title={t('admin.gen_qr')} loading={loading === "generation"} click={generateQR} />
                            <ThreeDots visible={loading === "generation"} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                        </div>
                    }
                </div>
            </div>
            <ToastContainer />
        </div>
    )
};

export default AdminProfile;