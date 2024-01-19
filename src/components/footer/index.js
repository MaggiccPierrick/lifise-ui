import './footer.css';

//UTILS
import { isMobile } from 'react-device-detect';

//VISUALS
import LOGO from '../../assets/images/logo.png';
import LINKEDIN from '../../assets/images/LinkedIn_logo_initials.png';
import XTWITTER from '../../assets/images/twitter-x-logo.png';
import YOUTUBE from '../../assets/images/youtube.png';
import POLYGON from '../../assets/images/polygon-matic-logo.png';

const Footer = () => {
    const currentPath = window.location.pathname;

    return ( (!isMobile || ["/", "/signin", "/signup"].includes(currentPath)) &&
        <footer>
            <div className="split">
                <img src={LOGO} alt="MetaBank logo" className="logo" />
                <span className="metabank_typo">MetaBank</span>
                <span className="selecter">General terms of use</span>
                <span className="selecter"onClick={() => window.open("https://www.metabank-france.eu/politique-de-confidentialité")}>Privacy policy</span>
            </div>
            <div className="split">
                <h4>
                    Follow us
                </h4>
                <img src={LINKEDIN} alt="LinkedIn" className="social" onClick={() => window.open("https://www.linkedin.com/company/80497650")}/>
                <img src={XTWITTER} alt="X Twitter" className="social" onClick={() => window.open("https://twitter.com/MetabankFrance")}/>
                <img src={YOUTUBE} alt="Youtube" className="social" onClick={() => window.open("https://www.youtube.com/channel/UCscHwitaskD9i8IT_r3YVCA")}/>
                <h4 className="mt-30">
                    Smart contract
                </h4>
                <img src={POLYGON} alt="Polygon" className="social" />
            </div>
        </footer>
    )
};

export default Footer;
