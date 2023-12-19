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
                <BoardHeader title={"Profile"}/>
                <div className="content">
                    <p><strong>Edit your profile</strong></p>
                </div>
                <div className="disconnect">
                    <Button title={"Disconnect"} click={homeRedirect}/>
                </div>
            </div>
        </div>
    )
};

export default Profile;