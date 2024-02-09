import "./menu.css";

//VISUALS
import LOGO from '../../assets/images/logo.png';

//TRANSLATION
import { useTranslation } from 'react-i18next';

const Menu = () => {
    const currentPath = window.location.pathname;
    const { t } = useTranslation();

    return (
        <>
            <div className="left_menu">
                <img src={LOGO} alt="MetaBank logo" className="logo" />
                <span className="metabank_typo">MetaBank</span>
                <a href={"/dashboard"} className={currentPath === "/dashboard" ? "entry active mt-50" : "entry mt-50"}>
                    <span className="icon">💳</span> {t('menu.my_account')}
                </a>
                <a href={"/transfers"} className={currentPath === "/transfers" ? "entry active" : "entry"}>
                    <span className="icon">💸</span> {t('menu.transfer_funds')}
                </a>
                <a href={"/operations"} className={currentPath === "/operations" ? "entry active" : "entry"}>
                    <span className="icon">🗃️</span> {t('menu.operations')}
                </a>
                <a href={"/beneficiaries"} className={currentPath === "/beneficiaries" ? "entry active" : "entry"}>
                    <span className="icon">🪪</span> {t('menu.beneficiaries')}
                </a>
                <a href={"/assistance"} className={currentPath === "/assistance" ? "entry active" : "entry"}>
                    <span className="icon">🛟</span> {t('menu.assistance')}
                </a>

                {navigator.share && <div className="share">
                    <div className="rocket">
                        🚀
                    </div>
                    <p className="center">
                        {t('menu.send_link')}
                        <br />
                        {t('menu.join_you')}
                    </p>
                    <button className="action" onClick={() => navigator.share({
                        text: t('menu.join_me'),
                        url: `https://metabank.codinsight.com`,
                        title: t('menu.join_me'),
                    })}>{t('menu.share')}</button>
                    <p className="center"><a href="#terms">{t('menu.cgu')}</a></p>
                    <p className="center"><a href="https://www.metabank-france.eu/politique-de-confidentialité" target="_blank" rel="noreferrer">{t('menu.policy')}</a></p>
                </div>}
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