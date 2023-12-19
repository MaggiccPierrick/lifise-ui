//VISUALS
import BANKINGWEB3 from '../../assets/images/digital_banking.png';

//COMPONENTS
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';

const Operations = () => {
    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={"Operations"}/>
                <div className="content">
                    <p><strong>Browse past operations</strong></p>
                </div>
                <img src={BANKINGWEB3} className="visual" alt="Digital banking" />
            </div>
        </div>
    )
};

export default Operations;