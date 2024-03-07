import { useState, useEffect } from 'react';

//UTILS
import { isIOS, isMobile } from "react-device-detect";
import PWAPrompt from 'react-ios-pwa-prompt'

//COMPONENTS
import Button from "../../components/button";
import PopUp from '../../components/popup';
import Header from '../../components/header';

//VISUALS
import BANNER_VISUAL from "../../assets/images/girl_back_metabank.jpg";
import BANNER_DARK_VISUAL from "../../assets/images/girl_back_metabank_dark.jpg";
import DISCORD_GROUP from "../../assets/images/discord_group.png";
import EUROPE from "../../assets/images/europe_flag.jpg";

//TRANSLATION
import { useTranslation } from 'react-i18next';

let deferredPrompt;

const Home = () => {
    const { t } = useTranslation();
    const [displayAMF, setDisplayAMF] = useState(!window.sessionStorage.getItem('amf_warning'));
    const [displayIOS, setDisplayIOS] = useState(false);

    const acceptAMFwarning = () => {
        setDisplayAMF(false);
        window.sessionStorage.setItem('amf_warning', 'accepted')
    }

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            deferredPrompt = e;
        });

        window.addEventListener('appinstalled', () => {
            // Log install to analytics
            console.log('INSTALL: Success');
        });
    }, []);

    const handleInstallClick = (e) => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
        });
    };

    const toggleIOSdisplay = () => setDisplayIOS(true);

    const navigateSignUp = () => window.location.href = "/signup";

    return (
        <>
            <Header />
            <div className="container">
                {displayAMF && <PopUp acceptAMFwarning={acceptAMFwarning} />}
                {displayIOS && <PWAPrompt promptOnVisit={50} timesToShow={50} copyClosePrompt="Close" debug={true} />}
                {isMobile ?
                    <>
                        <div className="right_b mt--20">
                            <img src={BANNER_DARK_VISUAL} className="banner_visual" alt={t('home.alt_banner')} />
                        </div>
                        <div className="left_b mt-reducer">
                            <span className="tagline ml-20 shadowed">{t('home.freedom')}</span>
                            <span className="tagline shadowed">{t('home.reliability')}</span>
                            <span className="tagline shadowed">{t('home.security')}</span>
                            <h2 className="ml-20 mb-reducer shadowed">
                                <small>{t('home.neo_bank')} <big>🚀</big></small>
                            </h2>
                            <p>
                                {t('home.banking_level')} {t('home.caaeuro_tech')}
                            </p>
                            <div className="center">
                                <Button title={t('home.get_started')} click={navigateSignUp} />
                                <Button title={t('home.intall_app')} framed={true} click={isIOS ? toggleIOSdisplay : handleInstallClick} />
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="left_b">
                            <span className="tagline">{t('home.freedom')}</span>
                            <span className="tagline">{t('home.reliability')}</span>
                            <span className="tagline">{t('home.security')}</span>
                            <h2>
                                {t('home.neo_bank')} <big>🚀</big>
                            </h2>
                            <p>
                                {t('home.banking_level')}
                                <br />
                                {t('home.caaeuro_tech')}
                            </p>
                            <Button title={t('home.get_started')} click={navigateSignUp} />
                        </div>
                        <div className="right_b">
                            <img src={BANNER_VISUAL} className="banner_visual" alt={t('home.alt_banner')} />
                        </div>
                    </>}
                <div className="box left">
                    <div className="display-inline-block mr-50">
                        <span className="tag">{t('home.more_freedom')}</span>
                        <span className="tag">{t('home.more_safety')}</span>
                        <span className="tag">{t('home.more_trust')}</span>
                    </div>
                    <div className="display-inline-block mr-50">
                        <span className="maxi">✨</span>
                    </div>
                </div>
                <div className="box center">
                    <span className="tag">{t('home.join_us')}</span>
                    <img src={DISCORD_GROUP} className="discord_group" alt={t('home.alt_discord')} />
                    <span className="subtitle">{t('home.growing_community')}</span>
                </div>
                <div className="box center">
                    <span className="tag">{t('home.circulating_funds')}</span>
                    <span className="big_number">100K+</span>
                    <span className="subtitle">{t('home.fully_decentralized')}</span>
                </div>
                <div className="box center mr-0">
                    <span className="tag">{t('home.active_accounts')}</span>
                    <span className="big_number">540</span>
                    <span className="subtitle">{t('home.free_europeans')}</span>
                </div>
                <div className="mt-50" id="caaeuro">
                    <span className="tagline">{t('home.public_money')}</span>
                    <h2>
                        {t('home.caaeuro_stablecoin')}
                    </h2>
                    <p>
                        {t('home.blockchain_access')}
                    </p>
                    <div className="shader grey-shade-one">
                        {t('home.secured_by_fr_bank')}
                    </div>
                    <div className="shader grey-shade-two">
                        {t('home.transparency')}
                    </div>
                    <div className="shader grey-shade-three">
                        {t('home.1_on_1')}
                    </div>
                    <div className="shader grey-shade-four">
                        {t('home.euro_num')}
                    </div>
                    <div className="shader grey-shade-five">
                        {t('home.p2p_crypto')}
                    </div>
                    <div className="shader grey-shade-six">
                        {t('home.emission')}
                    </div>
                    <p>
                        <big><strong>{t('home.mnbce')}</strong></big>
                    </p>
                </div>
                <div className="mt-100" id="values">
                    <h2>
                        {t('home.values')}
                    </h2>
                    <div className="value w-22 ml-0">
                        <p className="title">{t('home.stability')}</p>
                        {t('home.fluctuations')}
                    </div>
                    <div className="value dark w-22">
                        <p className="title">{t('home.price_reduction')}</p>
                        {t('home.predictability')}
                    </div>
                    <div className="value w-28">
                        <p className="title">{t('home.simplified_tx')}</p>
                        {t('home.usage')}
                    </div>
                    <div className="value dark w-28 mr-0">
                        <p className="title">{t('home.tx_fees')}</p>
                        {t('home.crypto_payment')}
                    </div>
                    <div className="value dark w-28 ml-0">
                        <p className="title">{t('home.world_market')}</p>
                        {t('home.world_currency')}
                    </div>
                    <div className="europe" style={{ backgroundImage: `url('${EUROPE}')` }}></div>
                    <div className="value w-28 mr-0">
                        <p className="title">{t('home.privacy')}</p>
                        {t('home.privacy_content')}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;
