import './footer.css';

//UTILS
import { isMobile } from 'react-device-detect';

//VISUALS
import LOGO from '../../assets/images/full_white_baseline.png';
import LINKEDIN from '../../assets/images/LinkedIn_logo_initials.png';
import XTWITTER from '../../assets/images/twitter-x-logo.png';
import YOUTUBE from '../../assets/images/youtube.png';
import POLYGON from '../../assets/images/polygon-matic-logo.png';
import INSTAGRAM from '../../assets/images/instagram.png';
import DISCORD from '../../assets/images/discord.png';
import FACEBOOK from '../../assets/images/facebook.png';

//TRANSLATION
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const currentPath = window.location.pathname;
    const { t, i18n } = useTranslation();

    const handleLangChange = lang => {
        i18n.changeLanguage(lang);
    };

    return ((!isMobile || ["/", "/signin", "/signup"].includes(currentPath)) &&
        <footer>
            <div className="split">
                <img src={LOGO} alt="LiFiSe logo" className="logo" />
                {i18n.language === "en" ? <span className="selecter" onClick={() => handleLangChange('fr')}>
                    FR
                </span>
                    :
                    <span className="selecter" onClick={() => handleLangChange('en')}>
                        EN
                    </span>}
                <span className="selecter" onClick={() => window.open("https://www.metabank-france.eu/cgu")}>{t('footer.cgu')}</span>
                <span className="selecter" onClick={() => window.open("https://www.metabank-france.eu/avis-general-de-confidentialite")}>{t('footer.policy')}</span>
                <span className="selecter" onClick={() => window.open(
                    i18n.language === "fr" ?
                        "https://cdn.prod.website-files.com/660599d39e3bc42cffcc1db3/663377e0afeaf43701c73f8b_Whitepaper%20-%20MetaBank-France%20V6.pdf"
                        :
                        "https://cdn.prod.website-files.com/660599d39e3bc42cffcc1db3/66337764c8a1c99429c2f6d0_Whitepaper%20-%20MetaBank-France%20V6%20english.pdf")}>{t('footer.whitepaper')}</span>
            </div>
            <div className="split">
                <h4>
                    {t('footer.editor')}
                </h4>
                <p>
                    {t('footer.publisher')}
                    <br />
                    {t('footer.vat_number')}
                </p>
                <p>
                    Email : <strong><a href={"mailTo:contact@metabank-france.eu"}>contact@metabank-france.eu</a></strong>
                    <br />
                    {t('footer.publising_director')}
                </p>
            </div>
            <div className="split">
                <h4>
                    {t('footer.legals')}
                </h4>
                <p>
                    En Liens! Rovaltain Web Société {t('footer.joint_company')} 47 600,00 €
                </p>
                <p>
                    {t('footer.head_office')} : 16 Cours Alexandre Borodine
                    <br />
                    26000 VALENCE 914 291 372 RCS ROMANS - {t('footer.tva')} : FR84914291372
                </p>
            </div>

            <div className="split">
                <h4>
                    {t('footer.follow_us')}
                </h4>
                <img src={LINKEDIN} alt="LinkedIn" className="social" onClick={() => window.open("https://www.linkedin.com/company/80497650")} />
                <img src={XTWITTER} alt="X Twitter" className="social" onClick={() => window.open("https://twitter.com/MetabankFrance")} />
                <img src={YOUTUBE} alt="Youtube" className="social" onClick={() => window.open("https://www.youtube.com/channel/UCscHwitaskD9i8IT_r3YVCA")} />
                <img src={FACEBOOK} alt="X Twitter" className="social" onClick={() => window.open("https://www.facebook.com/metapoker.series/")} />
                <img src={INSTAGRAM} alt="Instagram" className="social" onClick={() => window.open("https://www.instagram.com/metapokerseries/")} />
                <img src={DISCORD} alt="Discord" className="social" onClick={() => window.open("https://discord.gg/metabank-france")} />
                <h4 className="mt-30">
                    Smart contract
                </h4>
                <img src={POLYGON} alt="Polygon" className="social" onClick={() => window.open("https://polygonscan.com/address/0xed3004e8b62cf241a2fe4B2347Ca316ef15F539e")} />
            </div>
        </footer>
    )
};

export default Footer;
