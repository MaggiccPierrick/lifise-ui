//VISUALS
import BANKINGWEB3 from '../../assets/images/banking_web3.png';

//COMPONENTS
import Menu from '../../components/menu';
import BoardHeader from '../../components/boardheader';
import Button from '../../components/button';

const Assistance = () => {
    return (
        <div className="dashboard">
            <Menu />
            <div className="right_board">
                <BoardHeader title={"Assistance"} />
                <div className="content">
                    <p className="left"><strong>Describe your problem or remark</strong></p>
                    <p className="left">
                        <small>
                            Once sent, we will get in touch with you as soon as possible.
                            <br />
                            Thank you for your trust and support.
                        </small>
                    </p>
                    <textarea placeholder="Your message..."></textarea>
                    <div className="conditions">
                            By submitting this form, you consent to MetaBANK using your personal information to contact you and respond to your request for information.
                            Your information will be kept for the duration of our commercial exchanges and for a maximum of 2 years from our last exchange.
                            You benefit in particular from the rights of access, rectification and deletion of your data.
                    </div>
                    <div className="conditions">
                        You can exercise these rights by emailing us at <a href={"mailTo:contact@metabank.fr"}>contact@metabank.fr</a>
                    </div>
                    <div className="conditions">
                        To find out more about protecting your data, you can consult our <a href={"/"}>Privacy policy</a>.
                    </div>
                    <Button title={"Send message"}/>
                </div>
            </div>
        </div>
    )
};

export default Assistance;