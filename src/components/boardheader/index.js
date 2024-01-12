import "./boardheader.css";
import React, { useState, useEffect } from 'react';

//UTILS
import TokenService from "../../services/token_services";

//VISUALS
import LOGO from '../../assets/images/logo.png';

const BoardHeader = ({ title }) => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const data = TokenService.getUser()
        setProfile(data.account)
    }, []);

    return (
        <div className="board_header">
            <h1>
                {title}
            </h1>
            <img src={LOGO} alt="MetaBank logo" className="logo" />
            <span className="metabank_typo">MetaBank</span>
            <div className="profile" onClick={() => window.location.href = "/profile"}>
                <div className="avatar" style={{ backgroundImage: profile.selfie ? `url('data:image/${profile.selfie_ext};base64,${profile.selfie}')` : `url('https://api.multiavatar.com/${profile.user_uuid}.png')` }}></div>
                <div className="profile_info">
                    {profile.firstname ?
                        <span className="profile_name">
                            {profile.firstname} {profile.lastname}
                        </span>
                        : profile.email_address &&
                        <span className="profile_name">
                            {profile.email_address.split("@")[0].split(".")[0].charAt(0).toUpperCase() + profile.email_address.split("@")[0].split(".")[0].slice(1)}
                        </span>}
                    <span className="profile_email">{profile.email_address}</span>
                </div>
            </div>
        </div>
    )
};

export default BoardHeader;