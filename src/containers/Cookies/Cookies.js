import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Cookies extends Component {

  render() {
    const styles = require('./Cookies.scss');
    return (
      <div className={styles.checkout}>
        <Helmet title="Informations sur les cookies"/>
        <section className={styles.sectionIntroCollections}>
          <div className={styles.containerBlock}>
            <div className={'container-fluid'}>
              <div className={' row'}>
                <div
                  className={styles.colImgSquare + ' col-sm-12 col-md-10 col-md-push-1'}
                  ref={'scoller'}>
                  <h1 className={styles.title}>INFORMATIONS SUR LES COOKIES
                    <hr/>
                  </h1>
                  <p className={styles.textThanks}>VEUILLEZ LIRE ATTENTIVEMENT LA PRÉSENTE DÉCLARATION RELATIVE AUX
                    COOKIES AVANT D’UTILISER OU DE VOUS PROCURER TOUT CONTENU, INFORMATION, PRODUIT OU SERVICE PAR LE
                    BIAIS DE CE SITE. EN ACCÉDANT À CE SITE, VOUS ACCEPTEZ, SANS RESTRICTION OU QUALIFICATION,
                    L'INTÉGRALITÉ DE LA PRÉSENTE DÉCLARATION RELATIVE AUX COOKIES.
                  </p>
                  <p>Nous nous réservons le droit de modifier, mettre à jour ou corriger, à tout moment et sans préavis,
                    tout ou partie de la présente déclaration relative aux cookies ou des informations contenues sur le
                    Site en publiant la déclaration mise à jour sur le Site. Le fait que vous continuiez à utiliser ce
                    Site signifie que vous acceptez la Déclaration relative aux cookies mise à jour. Si vous n’acceptez
                    pas cette Déclaration relative aux cookies (dans sa version pouvant être occasionnellement
                    modifiée), merci de quitter le Site immédiatement.
                  </p>
                  <h2 className={styles.titleBlack}>Définition d’un cookie :</h2>
                  <p>Un cookie est un fichier texte susceptible d’être déposé sur votre terminal à l’occasion de la
                    visite de notre site. Il a pour but de collecter des informations anonymes relatives à votre
                    navigation et de vous adresser des contenus adaptés à votre terminal ou à vos centres d’intérêts.
                    Seul l'émetteur d'un cookie est susceptible de lire ou de modifier des informations qui y sont
                    contenues.
                  </p>
                  <h2 className={styles.titleBlack}>Les cookies sur ce site :</h2>
                  <p>Le site que vous visitez utilise des cookies. Ainsi, le site est susceptible d'accéder à des
                    informations déjà stockées dans votre équipement terminal de communications électroniques et d'y
                    inscrire des informations.
                    Les cookies utilisés par le site relèvent de deux catégories :
                    - cookies dits strictement nécessaires, qui ne nécessitent pas votre consentement préalable,
                    - autres cookies soumis à votre consentement préalable.
                  </p>
                  <p>Nous utilisons ces cookies pour permettre et faciliter la navigation sur le site notamment en
                    mémorisant vos préférences de navigation définies au cours de votre session.
                    Ces cookies ne peuvent pas, techniquement, être désactivés depuis le site. Vous pouvez néanmoins
                    vous opposer à l'utilisation de ces cookies, exclusivement en paramétrant votre navigateur. Ce
                    paramétrage dépend du navigateur que vous utilisez, mais il est en général simple à réaliser : en
                    principe, vous pouvez soit activer une fonction de navigation privée soit uniquement interdire ou
                    restreindre les cookies. Attention, il se peut que des cookies aient été enregistrés sur votre
                    périphérique avant le paramétrage de votre navigateur : dans ce cas, effacez votre historique de
                    navigation, toujours en utilisant le paramétrage de votre navigateur.
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
