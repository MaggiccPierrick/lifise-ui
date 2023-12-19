//VISUALS
import BANKINGWEB3 from '../../assets/images/banking_web3.png';

//COMPONENTS
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';

const Beneficiaries = () => {
    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={"Beneficiaries"}/>
                <div className="content">
                    <p><strong>Manage your beneficiaries</strong></p>
                </div>
                <img src={BANKINGWEB3} className="visual" alt="Digital banking" />
            </div>
        </div>
    )
};

export default Beneficiaries;