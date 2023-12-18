import "./menu.css";
import LOGO from '../../assets/images/logo.png';

const Menu = () => {
    const currentPath = window.location.pathname;

    return (
        <>
            <div className="left_menu">
                <img src={LOGO} alt="MetaBank logo" className="logo" />
                <span className="metabank_typo">MetaBank</span>
                <a href={"/dashboard"} className={currentPath === "/dashboard" ? "entry active mt-50" : "entry mt-50"}>
                    <span className="icon">💳</span> My account
                </a>
                <div className="entry">
                    <span className="icon">💸</span> Transfer funds
                </div>
                <div className="entry">
                    <span className="icon">🗃️</span> Operations
                </div>
                <div className="entry">
                    <span className="icon">🪪</span> Beneficiaries
                </div>
                <div className="entry">
                    <span className="icon">🛟</span> Assistance
                </div>

                <div className="share">
                    <div className="rocket">
                        🚀
                    </div>
                    <p className="center">
                        Send a link to invite your friends
                        <br />
                        to join you
                    </p>
                    <button className="action">Share with friends</button>
                    <p className="center"><a href="#terms">General terms of use</a></p>
                    <p className="center"><a href="#privacy">Privacy policy</a></p>
                </div>
            </div>
            <div className="mobile_menu">
                <div className={currentPath === "/dashboard" ? "entry active" : "entry"} onClick={() => window.location.href="/dashboard"}>
                    💳
                </div>
                <div className={currentPath === "/transfers" ? "entry realigned active" : "entry realigned"} onClick={() => window.location.href="/transfers"}>
                    💸
                </div>
                <div className="entry realigned">
                    🗃️
                </div>
                <div className="entry">
                    🪪
                </div>
                <div className="entry realigned">
                    🛟
                </div>
            </div>
        </>
    )
};

export default Menu;