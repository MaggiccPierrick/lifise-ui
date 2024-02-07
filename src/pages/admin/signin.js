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

const AdminSignIn = () => {
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
            toast.error('Email syntax invalid!', TOAST_OPTIONS);
        } else if (!password || password.length < 8) {
            toast.error('Password format invalid!', TOAST_OPTIONS);
        } else {
            onChangeLoading(true);
            try {
                const resp = await AdminService.login(email, password);
                if (resp.status) {
                    toast.success(`Authentication code sent to ${email}`, TOAST_OPTIONS);
                    onChangeValidation(true);
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                if (e.response && e.response.data && e.response.data.message === "error_authentication_method") {
                    setGA(true)
                } else
                    toast.error(e.response && e.response.data ? e.response.data.message : e.message, TOAST_OPTIONS);
            }
            onChangeLoading(false);
        }
    }

    const verify = async () => {
        if (!code || code.length !== 6)
            toast.error('Verification code format invalid!', TOAST_OPTIONS);
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
                        <p className="instructions">Fill all required information to access administration</p>
                        <h1>Administration access</h1>
                        <label>Email</label>
                        <input type="email" placeholder="john.doe@mail.com" onChange={e => onChangeEmail(e.target.value)} />
                        <label>Password</label>
                        <input type="password" placeholder="Secured password" onChange={e => onChangePassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login()} />
                        {isGA &&
                            <React.Fragment>
                                <label>Authenticator OTP</label>
                                <input type="number" placeholder="Google authenticator" onChange={e => onChangeCode(e.target.value)} />
                            </React.Fragment>
                        }
                        {!loading &&
                            <>
                                <Button title={"Sign In"} click={isGA? verify : login} /> <FollowUp intro={"No password or forgotten?"} description={"Set new password"} link={"/admin/reset"} />
                            </>}
                        <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                    </div>
                    :
                    <div className="right_sign">
                        <p className="instructions">Set the verification code received in your email inbox</p>
                        <h1>Access verification</h1>
                        <label>Authentication code</label>
                        <input type="text" placeholder="Code" value={code} onChange={e => onChangeCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && verify()} />
                        {!loading &&
                            <>
                                <Button title={"Verify"} click={verify} />
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