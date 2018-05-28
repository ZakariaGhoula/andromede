import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {LinkContainer} from 'react-router-bootstrap';

export default class Livraison extends Component {

  render() {
    const styles = require('./Livraison.scss');
    return (
      <div className={styles.checkout}>
        <Helmet title="Livraison et retour"/>
        <section className={styles.sectionIntroCollections}>
          <div className={styles.containerBlock}>
            <div className={'container-fluid'}>
              <div className={' row'}>
                <div
                  className={styles.colImgSquare + ' col-sm-12 col-md-10 col-md-push-1'}
                  ref={'scoller'}>
                  <h1 className={styles.title}>Livraison et retour
                    <hr/>
                  </h1>
                  <h2 className={styles.titleBlack}>La Commande :
                  </h2>
                  <p>La commande est validée une fois que le paiement a été accepté par Andromède et Persée. Andromède
                    et Persée se réserve le droit de refuser une commande si le Client présente déjà un litige avec
                    Andromède et Persée ou si Andromède et Persée estime que le Client comporte un risque de défaut de
                    paiement. Andromède et Persée se réserve alors le droit de demander à son Client des informations
                    complémentaires s'il l'estime nécessaire, telles qu’une pièce d'identité ou un justificatif de
                    domicile. Sans réponse du Client dans un délai de 6 jours suivant la commande, la commande et le
                    paiement sont annulés. Andromède et Persée s'engage à honorer les commandes reçues, uniquement dans
                    la limite des stocks disponibles. </p>
                  <h2 className={styles.titleBlack}>Livraison en France métropolitaine
                  </h2>
                  <p>Toute commande est expédié dans les dix jours suivant la validation de la commande</p>
                  <p>Délai de livraison après expédition</p>
                  <p>48 heures ouvrés avec Colissimo</p>
                  <p>Tarif Colissimo pour tout achat : 5 euros </p>
                  <h2 className={styles.titleBlack}>Livraison DOM TOM et International
                  </h2>
                  <p>Toute commande est expédié dans les dix jours suivant la validation de la commande.</p>
                  <p>Hors Union Européenne, des taxes de douane ou d'importation peuvent s'ajouter au prix de nos
                    produits et restent à la charge du Client. Il est donc du ressort du Client de s'informer de leur
                    montant auprès de son bureau de douane local.
                  </p>
                  <h2 className={styles.titleBlack}>Retours & Echanges </h2>
                  <p>Tout Client peut demander l'échange de son article dans un délai de 14 jours à compter de la date
                    de la commande. Les retours des commandes expédiées en France métropolitaine et hors de France
                    métropolitaine sont à la charge du Client.
                  </p>
                  <p>Le produit pour lequel le Client demande un échange doit être intact, non ouvert et dans son
                    emballage d'origine. Le Client doit joindre à son envoi le produit, le numéro de la commande
                    concernée par le retour, la désignation du ou des produits concernés par le retour, ainsi qu'une
                    demande d'échange ou de bon d'achat.</p>

                  <p>L’adresse de retour est :<br/>19 square d’Artois, 77186 Noisiel</p>
                  <p>Nous vous conseillons de choisir un mode de transport avec numéro de suivi. Sans numéro de suivi,
                    nous n’accepterons aucune réclamation.</p>
                  <p>De plus, afin que votre retour soit traité dans les plus brefs délais, nous vous conseillons de le
                    signaler également par email à <a
                      href="mailto:contact@andromedeetpersee.com">contact@andromedeetpersee.com</a>.
                  </p>
                  <p>Si l'article est refusé par Andromède et Persée, celui-ci est renvoyé au Client aux frais de
                    Andromède et Persée sans que le Client ne puisse exiger quelque compensation que ce soit.
                  </p>
                  <p>Lorsque la commande était accompagnée d’un cadeau offert sous conditions, si vous retournez des
                    produits et que le montant restant de votre commande ne remplit plus les conditions de l’offre, dans
                    ce cas il faut également nous retourner le cadeau pour pouvoir être remboursé (voir
                    nos <b><LinkContainer to={'/fr/cgv'}><a>CGV</a></LinkContainer></b> pour plus de détails).
                  </p>
                  <p>Les commandes réalisées sur le site internet Andromède et Persée ne peuvent être ni retournées ni échangées dans les boutiques.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
