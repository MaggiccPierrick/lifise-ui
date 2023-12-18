import './footer.css';
import LOGO from '../../assets/images/logo.png';
import LINKEDIN from '../../assets/images/LinkedIn_logo_initials.png';
import XTWITTER from '../../assets/images/twitter-x-logo.png';
import YOUTUBE from '../../assets/images/youtube.png';
import POLYGON from '../../assets/images/polygon-matic-logo.png';
import { isMobile } from 'react-device-detect';

const Footer = () => {
    const currentPath = window.location.pathname;

    return ( (!isMobile || ["/", "/signin", "/signup"].includes(currentPath)) &&
        <footer>
            <div className="split">
                <img src={LOGO} alt="MetaBank logo" className="logo" />
                <span className="metabank_typo">MetaBank</span>
                <span className="selecter">General terms of use</span>
                <span className="selecter">Privacy policy</span>
            </div>
            <div className="split">
                <h4>
                    Editor
                </h4>
                <p>
                    The publisher of the Site is MetaBank France, a simplified joint stock company
                    Capital of €47,000, registered 907 943 088 with the Montpellier RCS
                    VAT number: FR18907943088
                </p>
                <p>
                    Email : contact@metabank.fr
                    Publishing director: Mr. Pierrick TORASSO
                </p>
            </div>
            <div className="split">
                <h4>
                    Host
                </h4>
                <p>
                    The metabank.fr site is hosted in France by the company:
                    <br />
                    Amazon Web Services LLC
                    <br />
                    P.O. Box 81226
                    <br />
                    Seattle, WA 98108-1226
                </p>
            </div>
            <div className="split">
                <h4>
                    Follow us
                </h4>
                <img src={LINKEDIN} alt="LinkedIn" className="social" />
                <img src={XTWITTER} alt="X Twitter" className="social" />
                <img src={YOUTUBE} alt="Youtube" className="social" />
                <h4 className="mt-30">
                    Smart contract
                </h4>
                <img src={POLYGON} alt="Polygon" className="social" />
            </div>
        </footer>
    )
};

export default Footer;
