import React, { useState } from 'react';
import { TOAST_OPTIONS } from "../../constants";

//UTILS
import { isMobile } from "react-device-detect";
import { ToastContainer, toast } from 'react-toastify';
import UserService from '../../services/user_services';

//COMPONENTS
import Header from "../../components/header";
import FollowUp from "../../components/followup";
import Button from "../../components/button";
import { ThreeDots } from "react-loader-spinner";

//VISUALS
import BANNER_VISUAL from "../../assets/images/girl_back_metabank.jpg";
import LOGO_BLACK from "../../assets/images/logo_black.png";

const SignIn = ({ magic }) => {
    const [email, onChangeEmail] = useState();
    const [loading, onChangeLoading] = useState(false);

    const homeRedirect = () => window.location.href = "/"

    const magicLogin = async () => {
        // eslint-disable-next-line
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
        if (!email || !re.test(email)) {
            toast.error('Email syntax invalid!', TOAST_OPTIONS);
        } else {
            try {
                onChangeLoading(true);
                const didToken = await magic.auth.loginWithEmailOTP({ email });
                console.log(didToken);
                const resp = await UserService.login(didToken);
                if (resp.status)
                    window.location.href = "/dashboard"
                else {
                    toast.error(resp.message, TOAST_OPTIONS);
                    onChangeLoading(true);
                }
            } catch (e) {
                console.log(e);
                toast.error(e.response && e.response.data ? e.response.data.message : e.message, TOAST_OPTIONS);
                onChangeLoading(false);
            }
        }
    }

    return (
        <>
            {isMobile && <Header />}
            <div className="container mt-0">
                <div className="left_sign" style={{ backgroundImage: `url('${BANNER_VISUAL}')` }}>
                    <img src={LOGO_BLACK} alt="MetaBank logo" className="logo" onClick={homeRedirect} />
                    <span className="metabank_typo" onClick={homeRedirect}>MetaBank</span>
                </div>
                <div className="right_sign">
                    <p className="instructions">Fill all required information to access your account</p>
                    <h1>Access your account</h1>
                    <label>Email</label>
                    <input type="text" placeholder="Email address" onChange={e => onChangeEmail(e.target.value)} />
                    <label className="mt-10">Powered by <a href="https://magic.link" target="_blank" rel="noreferrer">Magic.link</a></label>
                    {!loading &&
                        <>
                            <Button title={"Sign In"} click={magicLogin} /> <FollowUp intro={"No account ?"} description={"Create yours today"} link={"/signup"} />
                        </>}
                    <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                </div>
            </div>
            <ToastContainer />
        </>
    )
};

export default SignIn;