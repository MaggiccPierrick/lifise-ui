import { useState, useEffect } from 'react';
import { EXPLORER } from '../../constants';

//UTILS
import AdminService from '../../services/admin_services';
import { useParams } from 'react-router';

//COMPONENTS
import Menu from '../../components/menu/admin';
import BoardHeader from '../../components/boardheader/admin';

//MEDIA
import POLYGON from '../../assets/images/polygon-matic-logo.png';
import LOGO_BLACK from '../../assets/images/logo_black.png';
import LOGO from '../../assets/images/logo.png';

//TRANSLATION
import { useTranslation } from 'react-i18next';

const AdminUser = () => {
    const { t } = useTranslation();
    const [profile, setProfile] = useState({});
    const { user_uuid } = useParams();

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, []);

    const loadUser = async () => {
        const data = await AdminService.getUser(user_uuid);
        console.log(data)
        setProfile(data);
    }

    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={profile.firstname? `${profile.firstname} ${profile.lastname}` : t('admin.metabank_users')} />
                {profile && profile.public_address && <div className="content">
                    <div className="big_avatar"
                        style={{
                            backgroundImage: profile.selfie ? `url('data:image/${profile.selfie_ext};base64,${profile.selfie}')` :
                                `url('https://api.multiavatar.com/${profile.user_uuid}.png')`
                        }}>
                    </div>
                    <div className="mt-10">
                        <h2>{profile.firstname} {profile.lastname}</h2>
                    </div>
                    <p>{t('admin.profile.email')}: <strong>{profile.email_address}</strong></p>
                    <p>{t('admin.profile.address')}: <strong>{profile.public_address}</strong></p>
                    <p>{t('admin.profile.birthdate')}: <strong>{profile.birthdate ? new Date(profile.birthdate).toLocaleDateString() : '-'}</strong></p>
                    <h3>
                        <small>{t('admin.profile.matic')}:</small> <strong>{profile.wallet && parseFloat(profile.wallet.matic).toFixed(2)}</strong> <img src={POLYGON} className="matic_logo" alt="Logo Matic Polygon" />
                    </h3>
                    <h2>
                        <small>{t('admin.profile.caaeuro')}:</small> <strong>{profile.wallet && parseFloat(profile.wallet.token_balance).toFixed(2)}</strong> <img src={LOGO_BLACK} className="balance_logo" alt="Logo CaaEuro" />
                    </h2>
                    {profile.token_claims && profile.token_claims.to_claim.length > 0 && <p className="mt-30"><strong>{t('admin.profile.pending')}</strong></p>}
                    {profile.token_claims && profile.token_claims.to_claim.map(op =>
                        <div className="operation" key={op.token_claim_uuid}>
                            <div className="op_type">{t('admin.pending')} </div>
                            <div className="op_link" onClick={() => window.open(`${EXPLORER}/tx/${op.tx_hash}`)}>{op.tx_hash}</div>
                            <div className="op_date">
                                {t('admin.profile.created_date')} {new Date(op.created_date).toLocaleDateString()} {new Date(op.created_date).toLocaleTimeString()}
                            </div>
                            <div className="select">
                                <div className="select_profile">
                                    <div className="select_avatar" style={{ backgroundImage: `url('${LOGO_BLACK}')` }}></div>
                                    <div className="select_info">
                                        <span className="select_name">
                                            MetaBank
                                        </span>
                                        <span className="select_email">
                                            {t('admin.profile.awaiting')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="tx_value">+ {op.nb_token}</div>
                            <img className="tx_symbol" alt="CaâEuro symbol" src={LOGO} />
                        </div>
                    )}
                    {profile.token_claims && profile.token_claims.already_claimed.length > 0 && <p className="mt-30"><strong>{t('admin.profile.already_claimed')}</strong></p>}
                    {profile.token_claims && profile.token_claims.already_claimed.map(op =>
                        <div className="operation" key={op.token_claim_uuid}>
                            <div className="op_type">{t('admin.claimed')} </div>
                            <div className="op_link" onClick={() => window.open(`${EXPLORER}/tx/${op.tx_hash}`)}>{op.tx_hash}</div>
                            <div className="op_date">
                                {t('admin.profile.created_date')} {new Date(op.created_date).toLocaleDateString()} {new Date(op.created_date).toLocaleTimeString()}
                            </div>
                            <div className="select">
                                <div className="select_profile">
                                    <div className="select_avatar" style={{ backgroundImage: `url('${LOGO_BLACK}')` }}></div>
                                    <div className="select_info">
                                        <span className="select_name">
                                            MetaBank
                                        </span>
                                        <span className="select_email">
                                            {t('admin.profile.claimed_date')} {new Date(op.claimed_date).toLocaleDateString()} {new Date(op.claimed_date).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="tx_value black">+ {op.nb_token}</div>
                            <img className="tx_symbol" alt="CaâEuro symbol" src={LOGO_BLACK} />
                        </div>
                    )}
                </div>}
            </div>
        </div>
    )
};

export default AdminUser;