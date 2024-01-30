import "./menu.css";
import React, { useState, useEffect } from 'react';

//UTILS
import AdminService from "../../services/admin_services";

//VISUALS
import LOGO from '../../assets/images/logo.png';
import LOGO_BLACK from '../../assets/images/logo_black.png';
import POLYGON from '../../assets/images/polygon-matic-logo.png';
import Button from "../button";

const Menu = () => {
    const [balances, setBalances] = useState("-");
    const [address, setAddress] = useState(null);
    const currentPath = window.location.pathname;

    const logout = () => {
        AdminService.logout()
    }

    const loadBalances = async() => {
        const data = await AdminService.getAdminBalance()
        setBalances(data.balances)
        setAddress(data.address)
    } 

    useEffect(() => {
        loadBalances();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="left_menu">
                <img src={LOGO} alt="MetaBank logo" className="logo" />
                <span className="metabank_typo">MetaBank</span>
                <a href={"/admin/dashboard"} className={currentPath === "/admin/dashboard" ? "entry active mt-50" : "entry mt-50"}>
                    <span className="icon">🥋</span> Administrators
                </a>
                <a href={"/admin/users"} className={currentPath === "/admin/users" ? "entry active" : "entry"}>
                    <span className="icon">👥</span> Users
                </a>

                <div className="share">
                    <div className="rocket">
                        🏦
                    </div>
                    <p className="center">
                        <small>{address}</small>
                        <br />
                        <big><strong>Reserve account balance</strong></big>
                    </p>
                    {balances && <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h1>{parseFloat(balances.token_balance).toFixed(2)}</h1>
                                </td>
                                <td>
                                    <img src={LOGO_BLACK} width={"25px"} alt="Logo black"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h3>{parseFloat(balances.matic).toFixed(2)}</h3>
                                </td>
                                <td>
                                    <img src={POLYGON} width={"15px"} alt="Logo Matic Polygon"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>}
                    <Button title={"Disconnect"} click={logout}/>
                </div>
            </div>
            <div className="mobile_menu">
                <div className={currentPath === "/admin/dashboard" ? "entry realigned active" : "entry realigned"} onClick={() => window.location.href = "/admin/dashboard"}>
                    🥋
                </div>
                <div className={currentPath === "/admin/users" ? "entry realigned active" : "entry realigned"} onClick={() => window.location.href = "/admin/users"}>
                    👥
                </div>
                <div className={"entry realigned"} onClick={logout}>
                    🈵
                </div>
            </div>
        </>
    )
};

export default Menu;