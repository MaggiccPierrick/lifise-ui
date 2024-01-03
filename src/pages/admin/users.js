//VISUALS
import USER2 from '../../assets/images/user2.jpg';
import USER3 from '../../assets/images/user3.jpg';
import USER4 from '../../assets/images/user4.jpg';
import LOGO_BLACK from '../../assets/images/logo_black.png';

//COMPONENTS
import Menu from '../../components/menu/admin';
import BoardHeader from '../../components/boardheader/admin';
import Button from '../../components/button'

const AdminUsers = () => {
    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={"MetaBank Users"} />
                <div className="content">
                    <div className="search mb-20">
                        <input type="text" className="semi" placeholder="Search email or address" />
                        <Button title={"Search"} />
                    </div>
                    <div className="relative display-inline-block mr-20">
                        <label>Email address</label>
                        <div className="relative display-inline-block">
                            <input type="email" className="semi" placeholder={"Email to receive link"} />
                        </div>
                    </div>
                    <div className="relative display-inline-block">
                        <label>Set amount to send <small>(Optional)</small></label>
                        <div className="relative display-inline-block">
                            <input type="number" className="semi" placeholder={"CâaEuro amount"} />
                            <img src={LOGO_BLACK} className="caaeuro" alt="Logo CâaEuro" />
                        </div>
                        <Button title={"Send"} />
                    </div>
                    <div className="slash"></div>
                    <div className="relative display-inline-block mr-20">
                        <label>
                            Sort by : <span className="filter heavy">Date</span> | <span className="filter">Balance</span> | <span className="filter">Email</span>
                        </label>
                    </div>
                    <div className="relative display-inline-block">
                        <label>
                            Filter : <span className="filter heavy">All</span> | <span className="filter">Active</span> | <span className="filter">Pending</span>
                        </label>
                    </div>
                    <div className="beneficiaries">
                        <div className="profile max">
                            <div className="avatar" style={{ backgroundImage: `url('${USER2}')` }}></div>
                            <div className="profile_info locked">
                                <span className="profile_name">Alicia G.</span>
                                <span className="profile_email">alicia.gordon@gotham.com</span>
                            </div>
                            <div className="profile_info pointer">
                                <span className="small_desc">Press to browse all operations</span>
                                <div className="redeemer">2 redeems | 1 pending</div>
                                <span className="small_desc">Since December 7th, 2023</span>
                            </div>
                            <div className="profile_info float-right">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span className="balance">651</span>
                                            </td>
                                            <td>
                                                <img src={LOGO_BLACK} width={"26px"} alt="Logo black" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="profile max">
                            <div className="avatar" style={{ backgroundImage: `url('${USER4}')` }}></div>
                            <div className="profile_info locked">
                                <span className="profile_name">Kamala Khan</span>
                                <span className="profile_email">kamala.khan@avengers.com</span>
                            </div>
                            <div className="profile_info pointer">
                                <span className="small_desc">Press to browse all operations</span>
                                <div className="redeemer">2 redeems | 1 pending</div>
                                <span className="small_desc">Since December 7th, 2023</span>
                            </div>
                            <div className="profile_info float-right">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span className="balance">180</span>
                                            </td>
                                            <td>
                                                <img src={LOGO_BLACK} width={"26px"} alt="Logo black" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="profile max">
                            <div className="avatar" style={{ backgroundImage: `url('${USER3}')` }}></div>
                            <div className="profile_info locked">
                                <span className="profile_name">Nick Fury</span>
                                <span className="profile_email">nick.fury@shield.com</span>
                            </div>
                            <div className="profile_info pointer">
                                <span className="small_desc">Press to browse all operations</span>
                                <div className="redeemer">2 redeems | 1 pending</div>
                                <span className="small_desc">Since December 7th, 2023</span>
                            </div>
                            <div className="profile_info float-right">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span className="balance">402.41</span>
                                            </td>
                                            <td>
                                                <img src={LOGO_BLACK} width={"26px"} alt="Logo black" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AdminUsers;