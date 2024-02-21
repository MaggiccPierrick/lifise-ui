import './header.css';

//COMPONENTS
import Button from '../button';

//VISUALS
import LOGO from '../../assets/images/full_white.png';

//TRANSLATION
import { useTranslation } from 'react-i18next';

const Header = () => {
    const navigateSignUp = () => window.location.href = "/signup";
    const { t } = useTranslation();

    return (
        <header>
            <img src={LOGO} alt="MetaBank logo" className="logo" />
            <a href={"/"} className="selecter">CaâEuro</a>
            <a href={"/"} className="selecter">{t('header.values')}</a>
            <a href="https://www.linkedin.com/company/en-liens-rovaltain-web-com/posts/?feedView=all" target="_blank" rel="noreferrer" className="selecter">{t('header.news')}</a>
            <a href={"/signin"} className="selecter float-right mobile-keeper">{t('header.sign_in')}</a>
            <Button title={t('header.open_account')} right={true} click={navigateSignUp}/>
        </header>
    )
};

export default Header;
