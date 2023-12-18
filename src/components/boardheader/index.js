import "./boardheader.css";

//VISUALS
import USER1 from '../../assets/images/user1.jpg';
import LOGO from '../../assets/images/logo.png';

const BoardHeader = () => {
    return (
        <div className="board_header">
            <h1>
                My account
            </h1>
            <img src={LOGO} alt="MetaBank logo" className="logo" />
            <span className="metabank_typo">MetaBank</span>
            <div className="profile">
                <div className="avatar" style={{ backgroundImage: `url('${USER1}')` }}></div>
                <div className="profile_info">
                    <span className="profile_name">Alicia G.</span>
                    <span className="profile_email">alicia.gordon@gotham.com</span>
                </div>
            </div>
        </div>
    )
};

export default BoardHeader;