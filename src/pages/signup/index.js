import React, { useState, useEffect } from 'react';
import { TOAST_OPTIONS } from "../../constants";

//UTILS
import { useSearchParams } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import { ToastContainer, toast } from 'react-toastify';
import UserService from '../../services/user_services';

//COMPONENTS
import FollowUp from "../../components/followup";
import Header from "../../components/header";
import Button from "../../components/button";
import { ThreeDots } from "react-loader-spinner";

//VISUALS
import BANNER_VISUAL from "../../assets/images/girl_back_metabank.jpg";
import LOGO_BLACK from "../../assets/images/logo_black.png";

const SignUp = ({ magic }) => {
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    const [email, onChangeEmail] = useState();
    const [firstname, onChangeFirstname] = useState(null);
    const [lastname, onChangeLastname] = useState(null);
    const [loading, onChangeLoading] = useState(false);
    const [checkEurope, toggleEuropeCheck] = useState(false);
    const [checkTerms, toggleTermsCheck] = useState(false);
    const [uuuid, setUuuid] = useState(null);

    const homeRedirect = () => window.location.href = "/";

    const magicSignUp = async () => {
        // eslint-disable-next-line
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
        if (!email || !re.test(email)) {
            toast.error('Email syntax invalid!', TOAST_OPTIONS);
        } else if (!firstname) {
            toast.error('Please set your firstname to open account', TOAST_OPTIONS);
        }  else if (!lastname) {
            toast.error('Please set your lastname to open account', TOAST_OPTIONS);
        } else if (!checkEurope) {
            toast.error('Please validate that you are a European citizen', TOAST_OPTIONS);
        }  else if (!checkTerms) {
            toast.error('Please agree General terms to open account', TOAST_OPTIONS);
        } else {
            try {
                onChangeLoading(true);
                const didToken = await magic.auth.loginWithEmailOTP({ email });
                const resp = await UserService.register(firstname, lastname, email, didToken, uuuid);
                if (resp.status)
                    window.location.href = "/dashboard"
                else {
                    toast.error(resp.message, TOAST_OPTIONS);
                    onChangeLoading(true);
                }
            } catch (e) {
                console.log(e);
                toast.error(uuuid? `Could not open account for email ${email}` : e.response && e.response.data ? e.response.data.message : e.message, TOAST_OPTIONS);
                onChangeLoading(false);
            }
        }
    }

    const checkInvit = () => {
        setUuuid(searchParams.get("user_uuid"))
    }

    useEffect(() => {
        checkInvit();
        // eslint-disable-next-line
    }, []);

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
                    <h1>Open your account</h1>
                    <div className="display-inline-block mr-20 mt-0">
                        <label>Firstname</label>
                        <input type="text" className="semi" placeholder="Firstname" onChange={e => onChangeFirstname(e.target.value)}/>
                    </div>
                    <div className="display-inline-block mt-0">
                        <label>Lastname</label>
                        <input type="text" className="semi" placeholder="Lastname" onChange={e => onChangeLastname(e.target.value)}/>
                    </div>
                    <label>Email</label>
                    <input type="text" placeholder="Email address" onChange={e => onChangeEmail(e.target.value)}/>
                    <label className="ml-0">
                        <input type="checkbox" onClick={() => toggleEuropeCheck(!checkEurope)}/> I hereby declare to be a citizen of the European Union
                    </label>
                    <label className="ml-0">
                        <input type="checkbox" onClick={() => toggleTermsCheck(!checkTerms)}/> I agree the <a href={"/"}>General terms and conditions</a>
                    </label>
                    {!loading &&
                        <>
                            <Button title={"Create account"} click={magicSignUp} /> <FollowUp intro={"Already have an account ?"} description={"Sign In now"} link={"/signin"} />
                        </>}
                    <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                </div>
            </div>
            <ToastContainer />
        </>
    )
};

export default SignUp;