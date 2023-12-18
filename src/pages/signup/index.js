import Button from "../../components/button";
import BANNER_VISUAL from "../../assets/images/girl_back_metabank.jpg";
import LOGO_BLACK from "../../assets/images/logo_black.png"
import FollowUp from "../../components/followup";
import { isMobile } from "react-device-detect";
import Header from "../../components/header";

const SignUp = () => {
    const homeRedirect = () => window.location.href = "/"
    const dashRedirect = () => window.location.href = "/dashboard"

    return (
        <>
            {isMobile && <Header/>}
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
                        <input type="text" className="semi" placeholder="John" />
                    </div>
                    <div className="display-inline-block mt-0">
                        <label>Lastname</label>
                        <input type="text" className="semi" placeholder="Doe" />
                    </div>
                    <label>Email</label>
                    <input type="text" placeholder="john.doe@mail.com" />
                    <label className="ml-0">
                        <input type="checkbox" /> I hereby declare to be a citizen of the European Union
                    </label>
                    <label className="ml-0">
                        <input type="checkbox" /> I agree the <a href={"/"}>General terms and conditions</a>
                    </label>
                    <Button title={"Create account"} click={dashRedirect} /> <FollowUp intro={"Already have an account ?"} description={"Sign In now"} link={"/signin"} />
                </div>
            </div>
        </>
    )
};

export default SignUp;