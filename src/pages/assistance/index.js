//COMPONENTS
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';
import Button from '../../components/button';

//TRANSLATION
import { useTranslation } from 'react-i18next';

const Assistance = () => {
    const { t } = useTranslation();

    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={t('assistance.assistance')} />
                <div className="content">
                    <p className="left"><strong>{t('assistance.describe_pb')}</strong></p>
                    <p className="left">
                        <small>
                            {t('assistance.get_in_touch')}
                            <br />
                            {t('assistance.thank_you')}
                        </small>
                    </p>
                    <textarea placeholder={t('assistance.your_message')}></textarea>
                    <div className="conditions">
                        {t('assistance.disclaimer_sub')}
                    </div>
                    <div className="conditions">
                        {t('assistance.exercice_rights')} <a href={"mailTo:contact@metabank.fr"}>contact@metabank.fr</a>
                    </div>
                    <div className="conditions">
                        {t('assistance.find_more')} <a href={"https://www.metabank-france.eu/politique-de-confidentialité"} target="_blank" rel="noreferrer">{t('assistance.policy')}</a>.
                    </div>
                    <Button title={t('assistance.send_msg')} />
                </div>
            </div>
        </div>
    )
};

export default Assistance;