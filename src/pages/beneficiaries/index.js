//VISUALS
import BANKINGWEB3 from '../../assets/images/banking_web3.png';
import USER2 from '../../assets/images/user2.jpg';
import USER3 from '../../assets/images/user3.jpg';
import USER4 from '../../assets/images/user4.jpg';

//COMPONENTS
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';
import Button from '../../components/button'

const Beneficiaries = () => {
    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={"Beneficiaries"} />
                <div className="content">
                    <p><strong>Manage your beneficiaries</strong></p>
                    <div className="search">
                        <input type="text" className="semi" placeholder="Search by email or address" />
                        <Button title={"Search"} />
                    </div>
                    <div className="beneficiaries">
                        <div className="profile">
                            <div className="avatar" style={{ backgroundImage: `url('${USER2}')` }}></div>
                            <div className="profile_info">
                                <span className="profile_name">Alicia G.</span>
                                <span className="profile_email">alicia.gordon@gotham.com</span>
                            </div>
                            <div className="add_beneficiary">
                                +
                            </div>
                        </div>
                        <div className="profile">
                            <div className="avatar" style={{ backgroundImage: `url('${USER4}')` }}></div>
                            <div className="profile_info">
                                <span className="profile_name">Kamala Khan</span>
                                <span className="profile_email">kamala.khan@avengers.com</span>
                            </div>
                            <div className="rm_beneficiary">
                                🗑️
                            </div>
                        </div>
                        <div className="profile">
                            <div className="avatar" style={{ backgroundImage: `url('${USER3}')` }}></div>
                            <div className="profile_info">
                                <span className="profile_name">Nick Fury</span>
                                <span className="profile_email">nick.fury@shield.com</span>
                            </div>
                            <div className="rm_beneficiary">
                                🗑️
                            </div>
                        </div>
                    </div>
                </div>
                <img src={BANKINGWEB3} className="visual" alt="Digital banking" />
            </div>
        </div>
    )
};

export default Beneficiaries;