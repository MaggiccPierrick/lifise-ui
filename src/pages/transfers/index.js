//UTILS
import Select from 'react-select'

//COMPONENTS 
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';
import Button from '../../components/button';

//VISUALS
import LOGO_BLACK from '../../assets/images/logo_black.png';
import BANKINGWEB3 from '../../assets/images/digital_banking.png';
import USER3 from '../../assets/images/user3.jpg';
import USER4 from '../../assets/images/user4.jpg';
import FollowUp from '../../components/followup';

const Transfers = () => {
    const beneficiaries = [
        { fullname: 'Kamala Khan', email: 'kamala.khan@avengers.com', avatar: USER4 },
        { fullname: 'Nick Fury', email: 'nick.fury@avengers.com', avatar: USER3 },
    ];

    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={"Transfer funds"}/>
                <div className="content">
                    <label>Select beneficiary</label>
                    <div className="select">
                        <Select
                            value={beneficiaries.email}
                            options={beneficiaries}
                            formatOptionLabel={beneficiary => (
                                <div className="select_profile">
                                    <div className="select_avatar" style={{ backgroundImage: `url('${beneficiary.avatar}')` }}></div>
                                    <div className="select_info">
                                        <span className="select_name">{beneficiary.fullname}</span>
                                        <span className="select_email">{beneficiary.email}</span>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                    <FollowUp intro={"Can't find your beneficiary ?"} description={"Add a new beneficiary"} link={"/beneficiaries"}/>
                    <label className="mt-50">Set amount to send</label>
                    <div className="relative display-inline-block">
                        <input type="number" className="semi" placeholder={"CâaEuro amount"} />
                        <img src={LOGO_BLACK} className="caaeuro" alt="Logo CâaEuro" />
                        <label className="mt-0 mb-40"><small>Max 402.41 <img src={LOGO_BLACK} width={"8px"} alt="Logo CâaEuro" /></small></label>
                    </div>
                    <div className="relative display-inline-block mobile_block">
                        <Button title={"Send funds"} />
                        <FollowUp intro={"No fees required"} />
                    </div>
                </div>
                <img src={BANKINGWEB3} className="visual v_mobile" alt="Digital banking" />
            </div>
        </div>
    )
};

export default Transfers;