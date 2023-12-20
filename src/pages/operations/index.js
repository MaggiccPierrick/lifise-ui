//VISUALS
import BANKINGWEB3 from '../../assets/images/digital_banking.png';
import USER3 from '../../assets/images/user3.jpg';
import USER4 from '../../assets/images/user4.jpg';
import LOGO from '../../assets/images/logo.png';
import LOGO_BLACK from '../../assets/images/logo_black.png';

//COMPONENTS
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';

const Operations = () => {
    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={"Operations"} />
                <div className="content">
                    <p><strong>Browse past operations</strong></p>
                    <div className="operation">
                        <div className="op_type">Received</div>
                        <div className="op_link">0x7a6953bff412a986935b2b07ffebb5adca6a4e0fb7d679f1934c4646baefdec1</div>
                        <div className="op_date">December 14th 2023, 09:43</div>
                        <div className="select">
                            <div className="select_profile">
                                <div className="select_avatar" style={{ backgroundImage: `url('${USER4}')` }}></div>
                                <div className="select_info">
                                    <span className="select_name">Kamala Khan</span>
                                    <span className="select_email">kamala.khan@avengers.com</span>
                                </div>
                            </div>
                        </div>
                        <div className="tx_value">+ 24.41</div>
                        <img className="tx_symbol" alt="CaâEuro symbol" src={LOGO}/>
                    </div>
                    <div className="operation mobile-ml-40">
                        <div className="op_type">Sent</div>
                        <div className="op_link">0xda571e0a5f5e2c6b7a81bafe9489050cf3138fadf613c26fbecdf4c6a4696d7b</div>
                        <div className="op_date">December 13th 2023, 18:09</div>
                        <div className="select">
                            <div className="select_profile">
                                <div className="select_avatar" style={{ backgroundImage: `url('${USER3}')` }}></div>
                                <div className="select_info">
                                    <span className="select_name">Nick Fury</span>
                                    <span className="select_email">nick.fury@avengers.com</span>
                                </div>
                            </div>
                        </div>
                        <div className="tx_value black">- 310.00</div>
                        <img className="tx_symbol" alt="CaâEuro symbol" src={LOGO_BLACK}/>
                    </div>
                    <div className="operation">
                        <div className="op_type">Redeem</div>
                        <div className="op_link">0xda571e0a5f5e2c6b7a81bafe9489050cf3138fadf613c26fbecdf4c6a4696d7b</div>
                        <div className="op_date">December 13th 2023, 19:20</div>
                        <div className="select">
                            <div className="select_profile">
                                <div className="select_avatar" style={{ backgroundImage: `url('${LOGO_BLACK}')` }}></div>
                                <div className="select_info">
                                    <span className="select_name">MetaBank</span>
                                    <span className="select_email">Redeem code : <strong>qE26tqug93</strong></span>
                                </div>
                            </div>
                        </div>
                        <div className="tx_value">+ 688.00</div>
                        <img className="tx_symbol" alt="CaâEuro symbol" src={LOGO}/>
                    </div>
                </div>
                <img src={BANKINGWEB3} className="visual" alt="Digital banking" />
            </div>
        </div>
    )
};

export default Operations;