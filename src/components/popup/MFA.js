import './popup.css';
import { useState } from 'react';

//COMPONENTS
import Button from '../button';

//VISUALS
import LOGO from "../../assets/images/logo.png";
import ReactCodeInput from 'react-code-input';

const PopUpMFA = ({ confirm, closeDisplay }) => {
    const [mfa, changeMFA] = useState(null);

    return (
        <div className="cover">
            <div className="pop_up">
                <img src={LOGO} alt="MetaBank logo" className="logo" />
                <span className="metabank_typo">MetaBank</span>
                <p>
                    Un code de confirmation vient de vous être envoyé <strong>sur votre adresse email</strong>.
                    Veuillez le saisir pour confirmer votre demande.
                </p>
                <div>
                    <ReactCodeInput type='number' fields={6} onChange={(value) => changeMFA(value)} inputStyle={{
                                                                                                        fontSize: "22px",
                                                                                                        borderRadius: "6px",
                                                                                                        border: "1px solid lightgrey",
                                                                                                        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px",
                                                                                                        margin: "4px",
                                                                                                        paddingLeft: "8px",
                                                                                                        width: "42px",
                                                                                                        height: "42px",
                                                                                                        boxSizing: "border-box",
                                                                                                        color: "black",
                                                                                                        backgroundColor: "white",
                                                                                                        display: "inline-block"}} />
                </div>
                <Button title={"Confirm"} click={() => confirm(mfa)} />
                <Button title={"Cancel"} framed={true} click={closeDisplay} />
            </div>
        </div>
    )
};

export default PopUpMFA;