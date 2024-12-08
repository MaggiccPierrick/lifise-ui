import './popup.css';

//COMPONENTS
import Button from '../button';

//VISUALS
import LOGO from "../../assets/images/logo.png";

//TRANSLATION
import { useTranslation } from 'react-i18next';

const PopUp = ({ acceptAMFwarning }) => {
    const { t } = useTranslation();

    const onClose = () => {
        window.location.href = "https://www.amf-france.org"
    };

    return (
        <div className="cover">
            <div className="pop_up">
                <img src={LOGO} alt="LiFiSe logo" className="logo" />
                <span className="lifise_typo">LiFiSe</span>
                <p>
                    <strong> {t('popup.invest_warning1')} </strong> {t('popup.invest_warning2')}
                </p>
                <p>
                    <strong>{t('popup.amf')} :</strong>
                    <br />
                    {t('popup.amf_warning')}
                    <br />
                    <a href={"https://www.amf-france.org/fr/espace-epargnants/proteger-son-epargne/crypto-actifs-bitcoin-etc/investir-en-crypto-actifs-les-precautions-pratiques"} target="_blank" rel="noreferrer">{t('popup.learn_more')}</a>
                </p>
                <Button title={t('popup.confirm_age')} click={acceptAMFwarning} />
                <Button title={t('popup.quit_app')} framed={true} click={onClose} />
            </div>
        </div>
    )
};

export default PopUp;