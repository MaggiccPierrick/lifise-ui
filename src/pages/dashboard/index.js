//UTILS
import { isMobile } from 'react-device-detect';

//VISUALS
import LOGO_BLACK from '../../assets/images/logo_black.png';
import BANKINGWEB3 from '../../assets/images/banking_web3.png';

//COMPONENTS
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';
import Button from '../../components/button';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={"My account"} />
                <div className="content">
                    <p><small>Account number 0xE7E2cB8c81c10FF191A73FE266788C9Ce62EC754</small></p>
                    <h2>CaâEuro Balance</h2>
                    <span className="balance">402.41</span>
                    <img src={LOGO_BLACK} className="currency" alt="CaaEuro logo" />
                    {isMobile && <br />}
                    <Button title={"Purchase funds"} />
                    <Button title={"Redeem code"} framed={true} />
                </div>
                <img src={BANKINGWEB3} className="visual" alt="Digital banking" />
                {isMobile &&
                    <div className="share">
                        <p className="center">
                            Send a link to invite your friends
                            <br />
                            to join you
                        </p>
                        <button className="action" onClick={() => navigator.share({
                            text: "Join me and open your account now on MetaBank",
                            url: `https://metabank.codinsight.com`,
                            title: `Join me and open your account now on MetaBank`,
                        })}>Share with friends</button>
                    </div>
                }
            </div>
        </div>
    )
};

export default Dashboard;