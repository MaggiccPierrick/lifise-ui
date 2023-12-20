import "./menu.css";

//VISUALS
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
                <a href={"/transfers"} className={currentPath === "/transfers" ? "entry active" : "entry"}>
                    <span className="icon">💸</span> Transfer funds
                </a>
                <a href={"/operations"} className={currentPath === "/operations" ? "entry active" : "entry"}>
                    <span className="icon">🗃️</span> Operations
                </a>
                <a href={"/beneficiaries"} className={currentPath === "/beneficiaries" ? "entry active" : "entry"}>
                    <span className="icon">🪪</span> Beneficiaries
                </a>
                <a href={"/assistance"} className={currentPath === "/assistance" ? "entry active" : "entry"}>
                    <span className="icon">🛟</span> Assistance
                </a>

                <div className="share">
                    <div className="rocket">
                        🚀
                    </div>
                    <p className="center">
                        Send a link to invite your friends
                        <br />
                        to join you
                    </p>
                    <button className="action" onClick={() => navigator.share({
                        text: "Join me and open your account now on MetaBank",
                        url: `https://metabank.codinsight.com`,
                        title: `Join me and open your account now on MetaBank`,
                    })}>Share with friends</button>
                    <p className="center"><a href="#terms">General terms of use</a></p>
                    <p className="center"><a href="https://www.metabank-france.eu/politique-de-confidentialité" target="_blank" rel="noreferrer">Privacy policy</a></p>
                </div>
            </div>
            <div className="mobile_menu">
                <div className={currentPath === "/dashboard" ? "entry realigned active" : "entry realigned"} onClick={() => window.location.href = "/dashboard"}>
                    💳
                </div>
                <div className={currentPath === "/transfers" ? "entry realigned active" : "entry realigned"} onClick={() => window.location.href = "/transfers"}>
                    💸
                </div>
                <div className={currentPath === "/operations" ? "entry realigned active" : "entry realigned"} onClick={() => window.location.href = "/operations"}>
                    🗃️
                </div>
                <div className={currentPath === "/beneficiaries" ? "entry realigned active" : "entry realigned"} onClick={() => window.location.href = "/beneficiaries"}>
                    🪪
                </div>
                <div className={currentPath === "/assistance" ? "entry realigned active" : "entry realigned"} onClick={() => window.location.href = "/assistance"}>
                    🛟
                </div>
            </div>
        </>
    )
};

export default Menu;