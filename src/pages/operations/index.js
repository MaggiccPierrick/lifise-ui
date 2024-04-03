import React, { useState, useEffect } from 'react';

//VISUALS
import BANKINGWEB3 from '../../assets/images/digital_banking.png';
import LOGO from '../../assets/images/logo.png';
import LOGO_BLACK from '../../assets/images/logo_black.png';

//COMPONENTS
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';
import { ThreeDots } from 'react-loader-spinner';

//UTILS
import UserService from '../../services/user_services';
import TokenService from '../../services/token_services';
import { EXPLORER } from '../../constants';
import { isMobile } from 'react-device-detect';

//TRANSLATION
import { useTranslation } from 'react-i18next';

const Operations = () => {
    const { t } = useTranslation();
    const [profile, setProfile] = useState({});
    const [operations, setOperations] = useState([]);
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [loading, onChangeLoading] = useState(true);

    const loadOps = async () => {
        const data = TokenService.getUser()
        setProfile(data.account)
        const bs = await UserService.getBeneficiaries()
        let benfs = {}
        for (let b of bs) {
            benfs[b.public_address.toLowerCase()] = b
        }
        setBeneficiaries(benfs)
        const ops = await UserService.getOperations()
        setOperations(ops)
        onChangeLoading(false)
    }

    useEffect(() => {
        loadOps();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={t('ops.operations')} />
                <div className="content">
                    <p><strong>{t('ops.browse_ops')}</strong></p>
                    <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                    {!loading && operations.map(op =>
                        <div className={profile.public_address.toLowerCase() === op.from ? "operation mobile-ml-40" : "operation"} key={op.hash}>
                            <div className="op_type">{profile.public_address.toLowerCase() === op.from ? t('ops.sent') : t('ops.received')} </div>
                            <div className="op_link" onClick={() => window.open(`${EXPLORER}/tx/${op.hash}`)}>{op.hash}</div>
                            <div className="op_date">{new Date(op.block_time).toLocaleDateString()} {new Date(op.block_time).toLocaleTimeString()}</div>
                            <div className="select">
                                {profile.public_address.toLowerCase() === op.from ?
                                    <div className="select_profile">
                                        <div className="select_avatar" style={{
                                            backgroundImage:
                                                beneficiaries[op.to] ?
                                                    beneficiaries[op.to].selfie ?
                                                        `url('data:image/${beneficiaries[op.to].selfie_ext};base64,${beneficiaries[op.to].selfie}')`
                                                        :
                                                        `url('https://api.multiavatar.com/${beneficiaries[op.to].user_uuid}.png')`
                                                    : `url('https://api.multiavatar.com/${op.to}.png')`
                                        }}></div>
                                        <div className="select_info">
                                            <span className="select_name">
                                                {beneficiaries[op.to] && beneficiaries[op.to].firstname ?
                                                    `${beneficiaries[op.to].firstname} ${beneficiaries[op.to].lastname}`
                                                    :
                                                    `${op.to.substring(0, 10)}...${op.to.substring(0, 15)}`}
                                            </span>
                                            <span className="select_email">{beneficiaries[op.to] ? beneficiaries[op.to].email_address : t('ops.unreferenced_receiver')}</span>
                                        </div>
                                    </div>
                                    :
                                    op.claim_uuid ?
                                        <div className="select_profile">
                                            <div className="select_avatar" style={{ backgroundImage: `url('${LOGO_BLACK}')` }}></div>
                                            <div className="select_info">
                                                <span className="select_name">
                                                    MetaBank
                                                </span>
                                                <span className="select_email">{t('ops.offered_by')} <strong>MetaBank</strong></span>
                                            </div>
                                        </div>
                                        :
                                        <div className="select_profile">
                                            <div className="select_avatar" style={{
                                                backgroundImage:
                                                    beneficiaries[op.from] ?
                                                        beneficiaries[op.from].selfie ?
                                                            `url('data:image/${beneficiaries[op.from].selfie_ext};base64,${beneficiaries[op.from].selfie}')`
                                                            :
                                                            `url('https://api.multiavatar.com/${beneficiaries[op.from].user_uuid}.png')`
                                                        : `url('https://api.multiavatar.com/${op.from}.png')`
                                            }}></div>
                                            <div className="select_info">
                                                <span className="select_name">
                                                    {beneficiaries[op.from] && beneficiaries[op.from].firstname ?
                                                        `${beneficiaries[op.from].firstname} ${beneficiaries[op.from].lastname}`
                                                        :
                                                        `${op.from.substring(0, 10)}...${op.from.substring(0, 15)}`}
                                                </span>
                                                <span className="select_email">{beneficiaries[op.from] ? beneficiaries[op.from].email_address : t('ops.unreferenced_sender')}</span>
                                            </div>
                                        </div>
                                }
                            </div>
                            {profile.public_address.toLowerCase() === op.to ?
                                <div className="tx_value">+ {op.value}</div>
                                :
                                <div className="tx_value black">- {op.value}</div>}
                            <img className="tx_symbol" alt="CaâEuro symbol" src={profile.public_address.toLowerCase() === op.to ? LOGO : LOGO_BLACK} />
                        </div>
                    )}
                    <div style={{height: "120px"}}></div>
                </div>
                {!isMobile && <img src={BANKINGWEB3} className="visual" alt="Digital banking" />}
            </div>
        </div>
    )
};

export default Operations;