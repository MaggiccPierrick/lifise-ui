import React, { useState } from 'react';
import { TOAST_OPTIONS } from '../../constants';

//UTILS
import UserService from '../../services/user_services';

//COMPONENTS
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';
import Button from '../../components/button';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

//TRANSLATION
import { useTranslation } from 'react-i18next';

const Assistance = () => {
    const { t } = useTranslation();
    const [message, setMessage] = useState();
    const [loading, onChangeLoading] = useState(false);

    const sendMsg = async () => {
        if (!message || message.length < 8)
            toast.error(t('assistance.invalid_msg'), TOAST_OPTIONS);
        else {
            onChangeLoading(true);
            try {
                const resp = await UserService.requestAssist(message);
                if (resp.status) {
                    toast.success(t('assistance.message_sent'), TOAST_OPTIONS);
                } else
                    toast.error(resp.message, TOAST_OPTIONS);
            } catch (e) {
                console.log(e.response.data)
                toast.error(e.response && e.response.data ? t(e.response.data.message) : t(e.message), TOAST_OPTIONS);
            }
            onChangeLoading(false);
        }
    }

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
                    <textarea placeholder={t('assistance.your_message')} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <div className="conditions">
                        {t('assistance.disclaimer_sub')}
                    </div>
                    <div className="conditions">
                        {t('assistance.exercice_rights')} <a href={"mailTo:contact@metabank-france.eu"}>contact@metabank-france.eu</a>
                    </div>
                    <div className="conditions">
                        {t('assistance.find_more')} <a href={"https://www.metabank-france.eu/politique-de-confidentialité"} target="_blank" rel="noreferrer">{t('assistance.policy')}</a>.
                    </div>
                    <ThreeDots visible={loading} height="50" width="50" color="#1F90FA" radius="9" ariaLabel="three-dots-loading" />
                    <Button title={t('assistance.send_msg')} loading={loading} click={sendMsg}/>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
};

export default Assistance;