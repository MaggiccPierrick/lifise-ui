//VISUALS
import USER1 from '../../assets/images/user1.jpg';

//COMPONENTS
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';
import Button from '../../components/button';

const Profile = () => {
    const homeRedirect = () => window.location.href = "/"

    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={"Profile"} />
                <div className="content">
                    <p><strong>Edit your profile</strong></p>
                    <div className="big_avatar" style={{ backgroundImage: `url('${USER1}')` }}></div>
                    <small>Press to change profile picture</small>
                    <div className="mt-30">
                        <label>Firstname</label>
                        <input type="text" value="Alicia"/>
                    </div>
                    <div className="mt-10 mb-20">
                        <label>Lastname</label>
                        <input type="text" value="Gordon"/>
                    </div>
                    <Button title={"Update profile"}/>
                    <div className="mt-30 mb-20">
                        <label>Email</label>
                        <input type="text" value="alicia.gordon@gotham.com"/>
                    </div>
                    <Button title={"Update email"}/>
                </div>
                <div className="disconnect">
                    <Button title={"Disconnect"} click={homeRedirect} />
                </div>
            </div>
        </div>
    )
};

export default Profile;