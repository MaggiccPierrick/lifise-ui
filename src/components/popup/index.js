import './popup.css';

//COMPONENTS
import Button from '../button';

//VISUALS
import LOGO from "../../assets/images/logo.png";

const PopUp = ({ setDisplayAMF }) => {

    const onClose = () => {
        window.location.href = "https://www.amf-france.org"
    };
    const accept = () => setDisplayAMF(false);

    return (
        <div className="cover">
            <div className="pop_up">
                <img src={LOGO} alt="MetaBank logo" className="logo" />
                <span className="metabank_typo">MetaBank</span>
                <p>
                    <strong>Les investissements liés aux cryptoactifs sont risqués par nature,</strong> les lecteurs
                    doivent faire leurs propres recherches avant d'entreprendre toute action et n'investir
                    que dans les limites de leurs capacités financières. Les articles et page de ce site ne constituent
                    pas de conseil en investissement. Cette page et ce site ne peuvent pas être tenus responsables,
                    directement ou indirectement, par tout dommage ou perte causée.
                </p>
                <p>
                    <strong>Recommandations de l'AMF :</strong>
                    <br />
                    Il n'existe pas de rendement élevé garanti, un produit présentant un potentiel de rendement élevé implique un risque élevé.
                    Cette prise de risque doit être en adéquation avec votre projet, votre horizon de placement et votre capacité à perdre
                    une partie de cette épargne. N'investissez pas si vous n'êtes pas prêt à perdre tout ou partie de votre capital.
                    <br />
                    <a href={"https://www.amf-france.org/fr/espace-epargnants/proteger-son-epargne/crypto-actifs-bitcoin-etc/investir-en-crypto-actifs-les-precautions-pratiques"} target="_blank" rel="noreferrer">En savoir plus</a>
                </p>
                <Button title={"J'ai compris et je suis majeur"} click={accept} />
                <Button title={"Quitter l'application"} framed={true} click={onClose} />
            </div>
        </div>
    )
};

export default PopUp;