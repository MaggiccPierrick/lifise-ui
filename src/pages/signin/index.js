//UTILS
import { isMobile } from "react-device-detect";

//COMPONENTS
import Header from "../../components/header";
import FollowUp from "../../components/followup";
import Button from "../../components/button";

//VISUALS
import BANNER_VISUAL from "../../assets/images/girl_back_metabank.jpg";
import LOGO_BLACK from "../../assets/images/logo_black.png";

const SignIn = () => {
    const homeRedirect = () => window.location.href = "/"
    const dashRedirect = () => window.location.href = "/dashboard"

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
                    <input type="text" placeholder="john.doe@mail.com" />
                    <label className="mt-10">Powered by <a href="https://magic.link" target="_blank" rel="noreferrer">Magic.link</a></label>
                    <Button title={"Sign In"} click={dashRedirect} /> <FollowUp intro={"No account ?"} description={"Create yours today"} link={"/signup"} />
                </div>
            </div>
        </>
    )
};

export default SignIn;