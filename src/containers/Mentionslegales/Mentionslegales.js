import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Mentionslegales extends Component {

  render() {
    const styles = require('./Mentionslegales.scss');
    return (
      <div className={styles.checkout}>
        <Helmet title="Mentions Légales"/>
        <section className={styles.sectionIntroCollections}>
          <div className={styles.containerBlock}>
            <div className={'container-fluid'}>
              <div className={' row'}>
                <div
                  className={styles.colImgSquare + ' col-sm-12 col-md-10 col-md-push-1'}
                  ref={'scoller'}>
                  <h1 className={styles.title}>Mentions Légales
                    <hr/>
                  </h1>
                  <h2 className={styles.titleBlack}>A. INFORMATIONS GENERALES</h2>
                  <p className={styles.textThanks}>Conformément aux dispositions des articles 6-III et 19 de la loi pour
                    la Confiance dans l'Économie Numérique, nous vous informons que :<br/><br/>
                    Le site Internet www.andromedeetpersee.com est un site édité par : La maison Andromede et
                    Persée<br/><br/>
                    Inscrite aux registre du commerce français sous le numéro de SIRET 832204572000016<br/><br/>
                    Assujettie à la TVA sous le numéro FR 83 83 22 04 572<br/><br/>
                    Dont le siège social est situé : 19 square d'Artois 77186 Noisiel<br/>
                    Le prestataire assurant le stockage direct et permanent de www.andromedeetpersee.com est :<br/><br/>
                    Eurogamma Consultants SLU
                  </p>
                  <h2 className={styles.titleBlack}>B. CONDITIONS D'UTILISATION</h2>
                  <p>L'utilisateur du site internet www.andromedeetpersee.com reconnaît disposer de la capacité
                    juridique, de la compétence et des moyens nécessaires pour accéder et utiliser ce Service.<br/>
                    L'utilisateur du Service reconnaît avoir vérifié que la configuration informatique utilisée ne
                    contient aucun virus ou contenu susceptible de menacer la sécurité du Service et qu'elle est en
                    parfait état de fonctionnement.
                  </p>
                  <h2 className={styles.titleBlack}>C. MISE EN GARDE SUR LES INFORMATIONS</h2>
                  <p>L'exploitant du Service met tout en œuvre pour offrir aux utilisateurs des informations et/ou
                    outils disponibles et vérifiés mais ne saurait être tenu pour responsable des erreurs, d'une absence
                    de disponibilité des informations et/ou de la présence d'un virus sur son site.<br/>
                    Les informations fournies par l'exploitant du Service et ses éventuels partenaires le sont à titre
                    indicatif. Ceux-ci ne sauraient garantir l'exactitude, la complétude, l'actualité des informations
                    diffusées par le Service. Ces informations ne sauraient dispenser l'utilisateur d'une analyse
                    complémentaire et personnalisée.<br/>
                    En conséquence, l'utilisateur reconnaît utiliser ces informations sous sa responsabilité
                    exclusive.<br/>
                    Pour des raisons de maintenance, l'exploitant du Service pourra interrompre l'accès de son site et
                    s'efforcera d'en avertir préalablement les utilisateurs dès lors que cela est possible.</p>
                  <h2 className={styles.titleBlack}>D. DONNEES A CARACTERE PERSONNEL</h2>
                  <p>L'utilisateur est notamment inform&eacute; que, conform&eacute;ment &agrave; l'article 32 de la loi n&deg; 78-87 du 6 janvier 1978, les informations communiqu&eacute;es par l'utilisateur du fait des formulaires pr&eacute;sents sur le Service sont n&eacute;cessaires pour r&eacute;pondre &agrave; sa demande, et sont destin&eacute;es &agrave; l'exploitant du Service, responsable du traitement, notamment &agrave; des fins de gestion administrative des inscriptions.</p>
                  <p>En tout &eacute;tat de cause <a href="https://www.andromedeetpersee.com">www.andromedeetpersee.com</a> ne collecte des informations personnelles relatives &agrave; l&rsquo;utilisateur (nom, adresse &eacute;lectronique, coordonn&eacute;es t&eacute;l&eacute;phoniques) que pour le besoin des Services propos&eacute;s, notamment pour l&rsquo;inscription &agrave; des espaces de discussion par le biais de formulaires en ligne ou pour des traitements statistiques. L&rsquo;utilisateur fournit ces informations en toute connaissance de cause, notamment lorsqu&rsquo;il proc&egrave;de par lui-m&ecirc;me &agrave; leur saisie. Il est alors pr&eacute;cis&eacute; &agrave; l&rsquo;utilisateur du Service le caract&egrave;re obligatoire ou non des informations qu&rsquo;il serait amen&eacute; &agrave; fournir.</p>
                  <p>Nous collectons et traitons notamment vos nom, adresse, adresse email, mot de passe, num&eacute;ro de t&eacute;l&eacute;phone, num&eacute;ro de carte de cr&eacute;dit, adresse IP, donn&eacute;es de connexions et donn&eacute;es de navigation. Certaines donn&eacute;es sont collect&eacute;es automatiquement du fait de vos actions sur le Site.</p>
                  <p>Nous ne collectons volontairement pas d&rsquo;informations sensibles, telles que concernant la race, l&rsquo;ethnie, les opinions politiques, croyances religieuses et philosophiques, l&rsquo;appartenance &agrave; un syndicat, les d&eacute;tails de sant&eacute; ou d&rsquo;orientation sexuelle.</p>
                  <p>Les donn&eacute;es sont conserv&eacute;es pendant une dur&eacute;e qui n&rsquo;exc&egrave;de pas la dur&eacute;e n&eacute;cessaire aux finalit&eacute;s pour lesquelles elles ont &eacute;t&eacute; collect&eacute;es.</p>
                  <p>L'utilisateur est inform&eacute; qu'il dispose d'un droit d'acc&egrave;s, d'interrogation et de rectification qui lui permet, le cas &eacute;ch&eacute;ant, de faire rectifier, compl&eacute;ter, mettre &agrave; jour, verrouiller ou effacer les donn&eacute;es personnelles le concernant qui sont inexactes, incompl&egrave;tes, &eacute;quivoques, p&eacute;rim&eacute;es ou dont la collecte, l'utilisation, la communication ou la conservation est interdite.</p>
                  <p>L'utilisateur dispose &eacute;galement d'un droit d'opposition au traitement de ses donn&eacute;es pour des motifs l&eacute;gitimes ainsi qu'un droit d'opposition &agrave; ce que ces donn&eacute;es soient utilis&eacute;es &agrave; des fins de prospection commerciale.</p>
                  <p>L'ensemble de ces droits s'exerce aupr&egrave;s de <a href="https://www.andromedeetpersee.com">www.andromedeetpersee.com</a> par courrier accompagn&eacute; d'une copie d'un titre d'identit&eacute; comportant une signature &agrave; adresser &agrave; : SERVICE DES DONNEES PERSONNEL Andromède et persée &ndash; 19 square d'Artois 77186 Noisiel ou par l'interm&eacute;diaire du formulaire de courrier &eacute;lectronique contact@andromedeetpersee.com</p>
                  <p>L'utilisateur est inform&eacute; que, lors de ses visites sur le site, un cookie peut s'installer automatiquement sur son logiciel de navigation.</p>
                  <p>Le cookie est un bloc de donn&eacute;es qui ne permet pas d'identifier les utilisateurs mais sert &agrave; enregistrer des informations relatives &agrave; la navigation de celui-ci dans le Service.</p>
                  <p>Le param&eacute;trage du logiciel de navigation permet d'informer de la pr&eacute;sence de cookie et &eacute;ventuellement de la refuser de la mani&egrave;re d&eacute;crite &agrave; l'adresse suivante : <a href="http://www.cnil.fr/">http://www.cnil.fr/</a></p>
                  <p>L'utilisateur dispose d'un droit d'acc&egrave;s, de retrait et de modification des donn&eacute;es personnelles communiqu&eacute;es par le biais du cookie dans les conditions indiqu&eacute;es ci-dessus.</p>
                  <p>Les utilisateurs du Service <a href="https://www.andromedeetpersee.com">www.andromedeetpersee.com</a> sont eux-m&ecirc;mes tenus de respecter les dispositions de la loi relative &agrave; l'Informatique, aux fichiers et aux libert&eacute;s, dont la violation est passible de sanctions p&eacute;nales.</p>
                  <p>lls doivent notamment s'abstenir, s'agissant des informations &agrave; caract&egrave;re personnel auxquelles ils acc&egrave;dent, de toute collecte, de toute utilisation d&eacute;tourn&eacute;e et, d'une mani&egrave;re g&eacute;n&eacute;rale, de tout acte susceptible de porter atteinte &agrave; la vie priv&eacute;e ou &agrave; la r&eacute;putation des personnes.</p>
                  <h2 className={styles.titleBlack}>E. DROITS DE PROPRIETE</h2>
                  <p>La structure g&eacute;n&eacute;rale, ainsi que les textes, images anim&eacute;es ou non, sons, savoir-faire..., et tout autre &eacute;l&eacute;ment composant le site sont la propri&eacute;t&eacute; exclusive de l'exploitant du Service et de tiers ayant autoris&eacute; <a href="https://www.andromedeetpersee.com">www.andromedeetpersee.com</a> &agrave; les exploiter.</p>
                  <p>Toute repr&eacute;sentation totale ou partielle de ce Service, par quelque proc&eacute;d&eacute; que ce soit, sans l'autorisation expresse de l'exploitant du site internet est interdite et constituerait une contrefa&ccedil;on sanctionn&eacute;e par les articles L.335-2 et suivants du Code de la propri&eacute;t&eacute; intellectuelle.</p>
                  <p>Il en est de m&ecirc;me des bases de donn&eacute;es figurant, le cas &eacute;ch&eacute;ant, sur le Service qui sont prot&eacute;g&eacute;es par les dispositions de la loi du 1er juillet 1998 portant transposition dans le Code de la propri&eacute;t&eacute; intellectuelle de la directive du 11 mars 1996 relative &agrave; la protection juridique des bases de donn&eacute;es, et dont <a href="www.andromedeetpersee.com">www.andromedeetpersee.com</a> est producteur.</p>
                  <p>Les marques de <a href="https://www.andromedeetpersee.com">www.andromedeetpersee.com</a> et de ses partenaires, ainsi que les logos figurant sur le site sont des marques d&eacute;pos&eacute;es.</p>
                  <p>Toutes les photos de notre site internet sont des r&eacute;alisations de nos propres chantiers, elles restent donc la propri&eacute;t&eacute; exclusive de l'entreprise <a href="https://www.andromedeetpersee.com">www.andromedeetpersee.com</a> . Toute reproduction totale ou partielle de ces photos est donc prohib&eacute;e.</p>
                  <p>Toute reproduction totale ou partielle de ces marques ou logos, effectu&eacute;e &agrave; partir des &eacute;l&eacute;ments du Service sans l'autorisation expresse de l'exploitant, est donc prohib&eacute;e, au sens de l'article L.713-2 du Code de la propri&eacute;t&eacute; intellectuelle.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
  }
  }
