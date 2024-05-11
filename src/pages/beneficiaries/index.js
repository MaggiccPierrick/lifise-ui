import { useState, useEffect } from 'react';
import { TOAST_OPTIONS } from '../../constants';

//UTILS
import UserService from "../../services/user_services";
import { ToastContainer, toast } from 'react-toastify';
import { isMobile } from 'react-device-detect';
import { validateAddr } from '../../services/magic';

//VISUALS
import BANKINGWEB3 from '../../assets/images/banking_web3.png';

//COMPONENTS
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';
import Button from '../../components/button'
import PopUpMFA from '../../components/popup/MFA';

//TRANSLATION
import { useTranslation } from 'react-i18next';

const Beneficiaries = () => {
    const { t } = useTranslation();
    const [searchField, changeSearchField] = useState("");
    const [profile, setProfile] = useState(null);
    const [addr, setAddr] = useState(null);
    const [email, onChangeEmail] = useState(null);
    const [beneficiaries, setBeneficiaries] = useState("");
    const [display, changeDisplay] = useState(false);

    const loadBeneficiaries = async () => {
        const data = await UserService.getBeneficiaries()
        setBeneficiaries(data)
    }

    useEffect(() => {
        loadBeneficiaries()
    }, []);

    const searchUser = async () => {
        setProfile(null)
        setAddr(null)
        // eslint-disable-next-line
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
        if (!searchField) {
            toast.error(t('beneficiaries.invalid_email'), TOAST_OPTIONS)
        } else if (validateAddr(searchField.toLocaleLowerCase())) {
            setAddr(searchField)
        } else if (re.test(searchField)) {
            const data = await UserService.searchUser(searchField)
            if (data.status) {
                toast.success(data.message, TOAST_OPTIONS)
                setProfile(data.user)
            } else
                toast.error(data.message, TOAST_OPTIONS)
        } else {
            toast.error(t('beneficiaries.invalid_email'), TOAST_OPTIONS)
        }
    }

    const closeDisplay = () => {
        changeDisplay(false)
    }

    const showDisplay = () => {
        changeDisplay(true)
    }

    const confirm = async (mfa) => {
        if (!mfa) {
            toast.error(t('beneficiaries.invalid_2fa'), TOAST_OPTIONS)
        } else if (profile) {
            const data = await UserService.addReferencedBeneficiary(profile.user_uuid, mfa)
            if (data.status) {
                toast.success(data.message, TOAST_OPTIONS)
                changeSearchField("")
                setProfile(null)
                loadBeneficiaries()
            } else
                toast.error(data.message, TOAST_OPTIONS)
        } else if (addr) {
            const data = await UserService.addUnreferencedBeneficiary(addr, email, mfa)
            if (data.status) {
                toast.success(data.message, TOAST_OPTIONS)
                changeSearchField("")
                setAddr(null)
                onChangeEmail(null)
                loadBeneficiaries()
            } else
                toast.error(data.message, TOAST_OPTIONS)
        } else {
            toast.error(t('beneficiaries.invalid_2fa'), TOAST_OPTIONS)
        }
        closeDisplay()
    }

    const addBeneficiary = async () => {
        if (profile) {
            const data = await UserService.addReferencedBeneficiary(profile.user_uuid)
            if (data.status)
                showDisplay()
            else
                toast.error(data.message, TOAST_OPTIONS)
        } else if (addr) {
            const data = await UserService.addUnreferencedBeneficiary(addr)
            if (data.status)
                showDisplay()
            else
                toast.error(data.message, TOAST_OPTIONS)
        }
    }

    const removeBeneficiary = async (beneficiary_uuid) => {
        if (window.confirm(t('beneficiaries.confirm_remove'))) {
            try {
                const data = await UserService.rmBeneficiary(beneficiary_uuid)
                if (data.status) {
                    toast.success(data.message, TOAST_OPTIONS)
                    loadBeneficiaries()
                } else
                    toast.error(data.message, TOAST_OPTIONS)
            } catch (e) {
                toast.error(e.response && e.response.data ? t(e.response.data.message) : t(e.message), TOAST_OPTIONS);
            }
        }
    }

    return (
        <>
            {display && <PopUpMFA confirm={confirm} closeDisplay={closeDisplay} />}
            <div className="dashboard">
                <Menu />
                <div className="right_board">
                    <BoardHeader title={t('beneficiaries.beneficiaries')} />
                    {!isMobile && <img src={BANKINGWEB3} className="visual" alt="Digital banking" />}
                    <div className="content">
                        <p><strong>{t('beneficiaries.manage')}</strong></p>
                        <div className="search">
                            <input type="text" placeholder={t('beneficiaries.search_email')} onChange={(e) => changeSearchField(e.target.value)} value={searchField} />
                            <Button title={t('beneficiaries.search')} click={searchUser} />
                        </div>
                        <div className="beneficiaries">
                            {profile && <div className="profile">
                                <div className="avatar" style={{ backgroundImage: profile.selfie ? `url('data:image/${profile.selfie_ext};base64,${profile.selfie}')` : `url('https://api.multiavatar.com/${profile.user_uuid}.png')` }}></div>
                                <div className="profile_info">
                                    <span className="profile_name">{profile.firstname} {profile.lastname}</span>
                                    <span className="profile_email">
                                        {profile.email_address}
                                        <br />
                                        <small>{profile.public_address}</small>
                                    </span>
                                </div>
                                <div className="add_beneficiary" onClick={addBeneficiary}>
                                    +
                                </div>
                            </div>}
                            {addr && <div className="mt-10 mb-40">
                                <div className="relative display-inline-block mr-20">
                                    <label>{t('beneficiaries.set_email')} <strong>{addr}</strong></label>
                                    <div className="relative display-inline-block">
                                        <input type="email" className="semi" placeholder={`Email address`} onChange={(e) => onChangeEmail(e.target.value)} />
                                    </div>
                                    <Button title={t('beneficiaries.add')} click={addBeneficiary} />
                                </div>
                            </div>}
                            {beneficiaries && beneficiaries.map(beneficiary =>
                                beneficiary.user_uuid ?
                                    <div className="profile" key={beneficiary.beneficiary_uuid}>
                                        <div className="avatar" style={{ backgroundImage: beneficiary.selfie ? `url('data:image/${beneficiary.selfie_ext};base64,${beneficiary.selfie}')` : `url('https://api.multiavatar.com/${beneficiary.user_uuid}.png')` }}></div>
                                        <div className="profile_info">
                                            <span className="profile_name">{beneficiary.firstname} {beneficiary.lastname}</span>
                                            <span className="profile_email">
                                                {beneficiary.email_address}
                                                <br />
                                                <small>{beneficiary.public_address}</small>
                                            </span>
                                        </div>
                                        <div className="rm_beneficiary" onClick={() => removeBeneficiary(beneficiary.beneficiary_uuid)}>
                                            🗑️
                                        </div>
                                    </div>
                                    :
                                    <div className="profile" key={beneficiary.beneficiary_uuid}>
                                        <div className="avatar" style={{ backgroundImage: `url('https://api.multiavatar.com/${beneficiary.public_address}.png')` }}></div>
                                        <div className="profile_info">
                                            <span className="profile_name">{beneficiary.email}</span>
                                            <span className="profile_email">
                                                {t('beneficiaries.external_account')}
                                                <br />
                                                <small>{beneficiary.public_address}</small>
                                            </span>
                                        </div>
                                        <div className="rm_beneficiary" onClick={() => removeBeneficiary(beneficiary.beneficiary_uuid)}>
                                            🗑️
                                        </div>
                                    </div>
                            )}
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
};

export default Beneficiaries;