import { useState, useEffect } from 'react';

//UTILS
import { isIOS, isMobile } from "react-device-detect";
import PWAPrompt from 'react-ios-pwa-prompt'

//COMPONENTS
import Button from "../../components/button";
import PopUp from '../../components/popup';
import Header from '../../components/header';

//VISUALS
import BANNER_VISUAL from "../../assets/images/girl_back_metabank.jpg";
import BANNER_DARK_VISUAL from "../../assets/images/girl_back_metabank_dark.jpg";
import DISCORD_GROUP from "../../assets/images/discord_group.png";
import EUROPE from "../../assets/images/europe_flag.jpg";

let deferredPrompt;

const Home = () => {
    const [displayAMF, setDisplayAMF] = useState(true);
    const [displayIOS, setDisplayIOS] = useState(false);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            deferredPrompt = e;
        });

        window.addEventListener('appinstalled', () => {
            // Log install to analytics
            console.log('INSTALL: Success');
        });
    }, []);

    const handleInstallClick = (e) => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
        });
    };

    const toggleIOSdisplay = () => setDisplayIOS(!displayIOS);

    const navigateSignUp = () => window.location.href = "/signup";

    return (
        <>
            <Header />
            <div className="container">
                {displayAMF && <PopUp setDisplayAMF={setDisplayAMF} />}
                {displayIOS && <PWAPrompt promptOnVisit={10} timesToShow={10} copyClosePrompt="Close" permanentlyHideOnDismiss={false}/>}
                {isMobile ?
                    <>
                        <div className="right_b mt--20">
                            <img src={BANNER_DARK_VISUAL} className="banner_visual" alt="Girl standing in front of a graffiti wall" />
                        </div>
                        <div className="left_b mt-reducer">
                            <span className="tagline ml-20 shadowed">Liberté</span>
                            <span className="tagline shadowed">Fiabilité</span>
                            <span className="tagline shadowed">Sécurité</span>
                            <h2 className="ml-20 mb-reducer shadowed">
                                <small>The open Neo Bank powered by web3 for everyone <big>🚀</big></small>
                            </h2>
                            <p>
                                We are bringing banking to a whole new level leveraging CaâEuro stablecoin and top notch technology.
                            </p>
                            <div className="center">
                                <Button title={"Get started now"} click={navigateSignUp}/>
                                <Button title={"Install App"} framed={true} click={isIOS? toggleIOSdisplay : handleInstallClick} />
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="left_b">
                            <span className="tagline">Liberté</span>
                            <span className="tagline">Fiabilité</span>
                            <span className="tagline">Sécurité</span>
                            <h2>
                                The open Neo Bank powered by web3 for everyone <big>🚀</big>
                            </h2>
                            <p>
                                We are bringing banking to a whole new level leveraging
                                <br />
                                CaâEuro stablecoin and top notch technology.
                            </p>
                            <Button title={"Get started now"} click={navigateSignUp}/>
                        </div>
                        <div className="right_b">
                            <img src={BANNER_VISUAL} className="banner_visual" alt="Girl standing in front of a graffiti wall" />
                        </div>
                    </>}
                <div className="box left">
                    <div className="display-inline-block mr-50">
                        <span className="tag">More freedom</span>
                        <span className="tag">More safety</span>
                        <span className="tag">More trust</span>
                    </div>
                    <div className="display-inline-block mr-50">
                        <span className="maxi">✨</span>
                    </div>
                </div>
                <div className="box center">
                    <span className="tag">Join us</span>
                    <img src={DISCORD_GROUP} className="discord_group" alt="Discord group" />
                    <span className="subtitle">A growing community</span>
                </div>
                <div className="box center">
                    <span className="tag">Circulating funds</span>
                    <span className="big_number">100K+</span>
                    <span className="subtitle">Fully decentralized and free</span>
                </div>
                <div className="box center mr-0">
                    <span className="tag">Active accounts</span>
                    <span className="big_number">540</span>
                    <span className="subtitle">Free and open for all Europeans</span>
                </div>
                <div className="mt-50">
                    <span className="tagline">Monnaie numérique grand public</span>
                    <h2>
                        CaâEuro stablecoin
                    </h2>
                    <p>
                        Accès par la blockchains publique Polygon et le système bancaire traditionnel à une monnaie stable numérique de type euro à 445 millions de consommateurs et 23 millions d'entreprises.
                    </p>
                    <div className="shader grey-shade-one">
                        Collatéral sécurisé par  la Banque Delubac
                    </div>
                    <div className="shader grey-shade-two">
                        Tranparence et sécurisation des échanges
                    </div>
                    <div className="shader grey-shade-three">
                        Un stablecoin collatérisé en 1 pour 1
                    </div>
                    <div className="shader grey-shade-four">
                        Déplafonnement de l'euro numérique
                    </div>
                    <div className="shader grey-shade-five">
                        Echanges cryptographiques en P2P (OTC)
                    </div>
                    <div className="shader grey-shade-six">
                        Protocole d'émission sécurisé et audité
                    </div>
                    <p>
                        <big><strong>La monnaie de paiement numérique grand public complémentaire et alternative au MNBCE</strong></big>
                    </p>
                </div>
                <div className="mt-100">
                    <h2>
                        Our values
                    </h2>
                    <div className="value w-22 ml-0">
                        <p className="title">Stabilité accrue</p>
                        Bien que les cryptomonnaies telles que le Bitcoin soient populaires,
                        elles sont sujettes à des fluctuations de prix importantes. Un euro stablecoin, en revanche, est conçu pour maintenir une valeur stable
                        par rapport à l'euro. Cela signifie que les joueurs peuvent effectuer des transactions sans craindre
                        que la valeur de leurs fonds ne diminue brusquement.
                    </div>
                    <div className="value dark w-22">
                        <p className="title">Réduction des risques</p>
                        Les fluctuations de prix des cryptomonnaies traditionnelles peuvent créer des risques pour les opérateurs de jeux d'argent
                        et les joueurs. En acceptant un euro stablecoin, les risques liés aux variations de prix sont minimisés, offrant ainsi
                        une plus grande prévisibilité des revenus et des dépenses.
                    </div>
                    <div className="value w-28">
                        <p className="title">Simplification des transactions</p>
                        L'utilisation d'un euro stablecoin peut simplifier les transactions pour les joueurs et les opérateurs de jeux d'argent.
                        Les dépôts et les retraits peuvent être effectués rapidement et facilement, sans avoir à se soucier des conversions de devises
                        ou des procédures complexes. Cela améliore l'expérience utilisateur et facilite la gestion des flux de trésorerie
                        pour les opérateurs de casinos.
                    </div>
                    <div className="value dark w-28 mr-0">
                        <p className="title">Frais de transactions réduits</p>
                        Les paiements par cryptomonnaie, y compris les stablecoins, peuvent généralement entraîner des frais de transaction moins
                        élevés que les méthodes de paiement traditionnelles. Cela peut bénéficier tant aux joueurs qu'aux opérateurs de casinos
                        en réduisant les coûts liés aux paiements et en augmentant ainsi les marges bénéficiaires.
                    </div>
                    <div className="value dark w-28 ml-0">
                        <p className="title">Marché mondial élargi</p>
                        L'euro est l'une des principales devises mondiales. En utilisant un euro stablecoin, les casinos en ligne
                        et les sites de jeux d'argent peuvent attirer des joueurs du monde entier, indépendamment des différences
                        de devises et des contraintes de taux de change. Cela peut élargir leur base de clients et stimuler
                        la croissance de leur activité.
                    </div>
                    <div className="europe" style={{ backgroundImage: `url('${EUROPE}')` }}></div>
                    <div className="value w-28 mr-0">
                        <p className="title">Confidentialité et sécurité</p>
                        Comme pour les autres cryptomonnaies, l'utilisation d'un euro stablecoin peut offrir un certain niveau d'anonymat
                        pour les transactions. Cela peut être attrayant pour les joueurs qui souhaitent préserver leur vie privée.
                        De plus, les transactions effectuées avec un euro stablecoin sont généralement sécurisées à l'aide de technologies
                        de cryptographie avancées, offrant ainsi une protection supplémentaire contre les fraudes et les atteintes à la sécurité.
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;