import "./boardheader.css";
import React, { useState, useEffect } from 'react';

//UTILS
import TokenService from "../../services/token_services";

//VISUALS
import LOGO from '../../assets/images/logo.png';

const BoardHeader = ({title}) => {
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
            <div className="profile pointer" onClick={() => window.location.href = "/admin/profile"}>
                <div className="avatar" style={{ backgroundImage: `url('https://api.dicebear.com/7.x/fun-emoji/svg?seed=${profile.admin_uuid}')` }}></div>
                <div className="profile_info">
                    <span className="profile_name">{profile.firstname} {profile.lastname}</span>
                    <span className="profile_email">{profile.email_address}</span>
                </div>
            </div>
        </div>
    )
};

export default BoardHeader;