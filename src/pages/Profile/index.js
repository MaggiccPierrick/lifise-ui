import { useState, useEffect, useRef } from 'react';
import { TOAST_OPTIONS } from '../../constants';

//UTILS
import TokenService from "../../services/token_services";
import UserService from "../../services/user_services";
import { ToastContainer, toast } from 'react-toastify';
import { Buffer } from 'buffer';

//COMPONENTS
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';
import Button from '../../components/button';
import { ThreeDots } from 'react-loader-spinner';

//TRANSLATION
import { useTranslation } from 'react-i18next';

const Profile = ({ magic }) => {
    const { t } = useTranslation();
    const inputRef = useRef();
    const [profile, setProfile] = useState({});
    const [firstname, onChangeFirstname] = useState("");
    const [lastname, onChangeLastname] = useState("");
    const [birthdate, onChangeBirthdate] = useState("");
    const [avExt, onChangeExtension] = useState(null);
    const [avB64, onChangeB64] = useState(null);
    const [loading, onChangeLoading] = useState(null);

    const handleAvatarUpload = () => { inputRef.current.click() }

    const onAvatarHandler = async (event) => {
        const reader = new FileReader()
        const extension = event.target.files[0] && event.target.files[0].name.split('.').pop().toLowerCase()
        if (!extension || !['jpg', 'png', 'jpeg'].includes(extension)) {
            toast.error(t('profile.invalid_img_ext'), TOAST_OPTIONS);
        } else if (event.target.files[0].size > 32000000) {
            toast.error(t('profile.img_size_exceed'), TOAST_OPTIONS);
        } else {
            onChangeExtension(extension)
            reader.onloadend = () => processFile(reader)
            reader.readAsArrayBuffer(event.target.files[0])
        }
    }

    const processFile = (reader) => {
        const buffer = Buffer.from(reader.result)
        const base64data = buffer.toString('base64')
        onChangeB64(base64data)
    }

    useEffect(() => {
        const data = TokenService.getUser();
        setProfile(data.account);
        onChangeFirstname(data.account.firstname || "");
        onChangeLastname(data.account.lastname || "");
        onChangeBirthdate(data.account.birthdate || "");
        onChangeB64(data.account.selfie);
        onChangeExtension(data.account.selfie_ext);
    }, []);

    const logout = () => {
        magic.user.logout().then(() => {
            UserService.logout()
        });
    }

    const updateProfile = async () => {
        if (!firstname)
            toast.error(t('profile.error_firstname'), TOAST_OPTIONS);
        else if (!lastname)
            toast.error(t('profile.error_lastname'), TOAST_OPTIONS);
        else {
            onChangeLoading("profile");
            try {
                const resp = await UserService.updateProfile(firstname, lastname, birthdate, avB64, avExt);
                if (resp.status) {
                    toast.success(t('profile.profile_updated'), TOAST_OPTIONS);
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                console.log(e.response.data)
                toast.error(e.response && e.response.data ? t(e.response.data.message) : t(e.message), TOAST_OPTIONS);
            }
            onChangeLoading(null);
        }
    }

    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={t('profile.profile')} />
                <div className="content">
                    <p><strong>{t('profile.edit_profile')}</strong></p>
                    <div className="big_avatar"
                        onClick={handleAvatarUpload}
                        style={{
                            backgroundImage: avB64 ? `url('data:image/${avExt};base64,${avB64}')` :
                                `url('https://api.multiavatar.com/${profile.user_uuid}.png')`
                        }}>
                    </div>
                    <input className="display-none" type="file" ref={inputRef}
                        accept="image/png,image/jpeg"
                        onChange={(e) => onAvatarHandler(e)} />
                    <small>{t('profile.press_picture')}</small>
                    <div className="mt-30">
                        <label>{t('profile.firstname')}</label>
                        <input type="text" value={firstname} onChange={(e) => onChangeFirstname(e.target.value)} />
                    </div>
                    <div className="mt-10 mb-20">
                        <label>{t('profile.lastname')}</label>
                        <input type="text" value={lastname} onChange={(e) => onChangeLastname(e.target.value)} />
                    </div>
                    <div className="mt-10 mb-20">
                        <label>{t('profile.birthdate')}</label>
                        <input type="date" value={birthdate} onChange={(e) => onChangeBirthdate(e.target.value)} />
                    </div>
                    <Button title={t('profile.update_profile')} loading={loading === "profile"} click={updateProfile} />
                    <ThreeDots visible={loading === "profile"} height="50" width="50" color="var(--primary)" radius="9" ariaLabel="three-dots-loading" />
                </div>
                <div className="disconnect">
                    <Button title={t('profile.disconnect')} click={logout} />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
};

export default Profile;