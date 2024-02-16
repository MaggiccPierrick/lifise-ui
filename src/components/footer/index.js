import './footer.css';

//UTILS
import { isMobile } from 'react-device-detect';

//VISUALS
import LOGO from '../../assets/images/logo.png';
import LINKEDIN from '../../assets/images/LinkedIn_logo_initials.png';
import XTWITTER from '../../assets/images/twitter-x-logo.png';
import YOUTUBE from '../../assets/images/youtube.png';
import POLYGON from '../../assets/images/polygon-matic-logo.png';

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
                <img src={LOGO} alt="MetaBank logo" className="logo" />
                <span className="metabank_typo">MetaBank</span>
                {i18n.language === "en"? <span className="selecter" onClick={() => handleLangChange('fr')}>
                    FR
                </span>
                :
                <span className="selecter" onClick={() => handleLangChange('en')}>
                    EN
                </span>}
                <span className="selecter">{t('footer.cgu')}</span>
                <span className="selecter" onClick={() => window.open("https://www.metabank-france.eu/politique-de-confidentialité")}>{t('footer.policy')}</span>
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
                    En Liens! Rovaltain Web Société {t('footer.joint_company')} 67.530,40 euros
                </p>
                <p>
                    {t('footer.head_office')} : 16 Cours Alexandre Borodine
                    <br/>
                    26000 VALENCE 914 291 372 RCS ROMANS
                </p>
            </div>

            <div className="split">
                <h4>
                    {t('footer.follow_us')}
                </h4>
                <img src={LINKEDIN} alt="LinkedIn" className="social" onClick={() => window.open("https://www.linkedin.com/company/80497650")} />
                <img src={XTWITTER} alt="X Twitter" className="social" onClick={() => window.open("https://twitter.com/MetabankFrance")} />
                <img src={YOUTUBE} alt="Youtube" className="social" onClick={() => window.open("https://www.youtube.com/channel/UCscHwitaskD9i8IT_r3YVCA")} />
                <h4 className="mt-30">
                    Smart contract
                </h4>
                <img src={POLYGON} alt="Polygon" className="social" />
            </div>
        </footer>
    )
};

export default Footer;
