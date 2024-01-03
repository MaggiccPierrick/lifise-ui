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
import LOGO_WHITE from "../../assets/images/logo_white.png";

const AdminResetPswd = () => {
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
            toast.error('Email syntax invalid!', TOAST_OPTIONS);
        } else {
            onChangeLoading(true);
            try {
                const resp = await AdminService.sendReset(email);
                if (resp.status) {
                    toast.success(`Reset code sent to ${email}`, TOAST_OPTIONS);
                    onChangeValidation(true);
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                toast.error(e.response && e.response.data ? e.response.data.message : e.message, TOAST_OPTIONS);
            }
            onChangeLoading(false);
        }
    }

    const newPswd = async () => {
        if (!code || code.length !== 8)
            toast.error('Verification code format invalid!', TOAST_OPTIONS);
        else if (!password || password.length < 8)
            toast.error('Password format invalid!', TOAST_OPTIONS);
        else {
            onChangeLoading(true);
            try {
                const resp = await AdminService.resetPswd(email, password, code);
                if (resp.status) {
                    toast.success(`New password successfully registered`, TOAST_OPTIONS);
                    onChangeSuccess(true);
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                console.log(e.response.data)
                toast.error(e.response && e.response.data ? e.response.data.message || e.response.data.msg : e.message, TOAST_OPTIONS);
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
                    <span className="metabank_typo white" onClick={homeRedirect}>MetaBank</span>
                </div>
                {!validation ?
                    <div className="right_sign">
                        <p className="instructions">Fill all required information to receive a reset code</p>
                        <h1>Receive verification code</h1>
                        <label>Email</label>
                        <input type="email" placeholder="john.doe@mail.com" onChange={e => onChangeEmail(e.target.value)} />
                        <Button title={"Send reset code"} click={sendReset} loading={loading} />
                        <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                    </div>
                    :
                    <div className="right_sign">
                        <p className="instructions">Set the verification code and new password</p>
                        <h1>Set new password</h1>
                        <label>Verification code</label>
                        <input type="text" placeholder="Code" onChange={e => onChangeCode(e.target.value)} value={code}/>
                        <label>Password</label>
                        <input type="password" placeholder="Secured password" onChange={e => onChangePassword(e.target.value)}/>
                        {!loading && !success && <>
                            <Button title={"Set new password"} click={newPswd} /> <FollowUp intro={"Did not receive it ?"} description={"Resend code"} action={sendReset} />
                        </>}
                        <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                        <Button title={"Go to Sign In"} click={signRedirect} loading={loading || !success} />
                    </div>
                }
            </div>
            <ToastContainer />
        </>
    )
};

export default AdminResetPswd;