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
            <a href={"/#caaeuro"} className="selecter">CaâEuro</a>
            <a href={"/#values"} className="selecter">{t('header.values')}</a>
            <span onClick={() => alert('Coming soon')} target="_blank" rel="noreferrer" className="selecter">{t('header.news')}</span>
            <span onClick={() => alert(`${t('header.website')} coming soon`)} target="_blank" rel="noreferrer" className="selecter">{t('header.website')}</span>
            <a href={"/signin"} className="selecter float-right mobile-keeper">{t('header.sign_in')}</a>
            <Button title={t('header.open_account')} right={true} click={navigateSignUp}/>
        </header>
    )
};

export default Header;
