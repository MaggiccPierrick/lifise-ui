import './header.css';

//COMPONENTS
import Button from '../button';

//VISUALS
import LOGO from '../../assets/images/logo.png';

const Header = () => {
    const navigateSignUp = () => window.location.href = "/signup";

    return (
        <header>
            <img src={LOGO} alt="MetaBank logo" className="logo" />
            <span className="metabank_typo">MetaBank</span>
            <a href={"/"} className="selecter">CaâEuro</a>
            <a href={"/"} className="selecter">Values</a>
            <a href="https://www.linkedin.com/company/en-liens-rovaltain-web-com/posts/?feedView=all" target="_blank" rel="noreferrer" className="selecter">News</a>
            <a href={"/signin"} className="selecter float-right mobile-keeper">Sign In</a>
            <Button title={"Open FREE account"} right={true} click={navigateSignUp}/>
        </header>
    )
};

export default Header;
