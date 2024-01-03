import "./menu.css";

//UTILS
import AdminService from "../../services/admin_services";

//VISUALS
import LOGO from '../../assets/images/logo.png';
import LOGO_BLACK from '../../assets/images/logo_black.png';
import POLYGON from '../../assets/images/polygon-matic-logo.png';
import Button from "../button";

const Menu = () => {
    const currentPath = window.location.pathname;

    const logout = () => {
        AdminService.logout()
    }

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
                        <small>0x95cF236dE0295F9e09f4bF3617D417346fEB6be4</small>
                        <br />
                        <big><strong>Reserve account balance</strong></big>
                    </p>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h1>10397.34</h1>
                                </td>
                                <td>
                                    <img src={LOGO_BLACK} width={"25px"} alt="Logo black"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h3>108</h3>
                                </td>
                                <td>
                                    <img src={POLYGON} width={"15px"} alt="Logo Matic Polygon"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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