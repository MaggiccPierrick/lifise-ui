import "./menu.css";
import React from 'react';
import { TOAST_OPTIONS } from '../../constants';

//COMPONENTS
import { ToastContainer, toast } from 'react-toastify';

//VISUALS
import LOGO from '../../assets/images/full_dark.png';

//TRANSLATION
import { useTranslation } from 'react-i18next';

const Menu = () => {
    const currentPath = window.location.pathname;
    const { t } = useTranslation();

    return (
        <>
            <ToastContainer />
            <div className="left_menu">
                <img src={LOGO} alt="MetaBank logo" className="logo" />
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
                <a href={"#airdrop"} onClick={() => toast.info('Coming soon', TOAST_OPTIONS)} className={currentPath === "/airdrop" ? "entry active" : "entry"} >
                    <span className="icon">🪙</span> Airdrop Caâm
                </a>
                <a href={"#sponsor"} onClick={() => toast.info('Coming soon', TOAST_OPTIONS)} className={currentPath === "/sponsor" ? "entry active" : "entry"}>
                    <span className="icon">🌟</span> {t('menu.sponsorship')}
                </a>
                <div className="share">
                    {navigator.share && <React.Fragment>
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
                    </React.Fragment>}
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