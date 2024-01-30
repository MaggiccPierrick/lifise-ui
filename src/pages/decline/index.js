import React, { useEffect } from 'react';

//UTILS
import { useSearchParams } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import UserService from '../../services/user_services';

//COMPONENTS
import Header from "../../components/header";

//VISUALS
import BANNER_VISUAL from "../../assets/images/girl_back_metabank.jpg";
import LOGO_BLACK from "../../assets/images/logo_black.png";

const Decline = () => {
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();

    const homeRedirect = () => window.location.href = "/";

    const decline = async() => {
        const uuid = searchParams.get("user_uuid")
        await UserService.decline(uuid)
    }

    useEffect(() => {
        decline();
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
                    <p className="instructions">Your request has been validated</p>
                    <h1>Your account is now deactivated</h1>
                </div>
            </div>
        </>
    )
};

export default Decline;