import React, { useState, useEffect } from 'react';
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
import LOGO_BLACK from "../../assets/images/full_dark.png";

//TRANSLATION
import { useTranslation } from 'react-i18next';

const SignIn = ({ magic }) => {
    const { t } = useTranslation();
    const [email, onChangeEmail] = useState();
    const [loading, onChangeLoading] = useState(false);

    const homeRedirect = () => window.location.href = "/"

    const magicLogin = async () => {
        // eslint-disable-next-line
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
        if (!email || !re.test(email)) {
            toast.error(t('signin.error_email'), TOAST_OPTIONS);
        } else {
            try {
                onChangeLoading(true);
                const status = await UserService.checkEmail(email.toLowerCase())
                if (status) {
                    const didToken = await magic.auth.loginWithEmailOTP({ email: email.toLowerCase() });
                    const resp = await UserService.login(didToken);
                    if (resp.status)
                        window.location.href = "/dashboard"
                    else {
                        toast.error(resp.message, TOAST_OPTIONS);
                        onChangeLoading(false);
                    }
                }else{
                    toast.error(t('signin.no_account_found'), TOAST_OPTIONS);
                    onChangeLoading(false);
                }
            } catch (e) {
                console.log(e);
                toast.error(e.response && e.response.data ? t(e.response.data.message) : t(e.message), TOAST_OPTIONS);
                onChangeLoading(false);
            }
        }
    }

    const logout = async() => {
        await magic.user.logout()
    }

    useEffect(() => {
        logout();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {isMobile && <Header />}
            <div className="container mt-0">
                <div className="left_sign" style={{ backgroundImage: `url('${BANNER_VISUAL}')` }}>
                    <img src={LOGO_BLACK} alt="LiFiSe logo" className="logo" onClick={homeRedirect} />
                </div>
                <div className="right_sign">
                    <p className="instructions">{t('signin.fill_required_info')}</p>
                    <h1>{t('signin.access_account')}</h1>
                    <label>{t('signin.email_address')}</label>
                    <input type="text" placeholder={t('signin.email_address')} onChange={e => onChangeEmail(e.target.value)} />
                    <label className="mt-10">Powered by <a href="https://magic.link" target="_blank" rel="noreferrer">Magic.link</a></label>
                    {!loading &&
                        <>
                            <Button title={t('signin.sign_in')} click={magicLogin} /> <FollowUp intro={t('signin.no_account')} description={t('signin.create_yours')} link={"/signup"} />
                        </>}
                    <ThreeDots visible={loading} height="50" width="50" color="var(--primary)" radius="9" ariaLabel="three-dots-loading" />
                </div>
            </div>
            <ToastContainer />
        </>
    )
};

export default SignIn;