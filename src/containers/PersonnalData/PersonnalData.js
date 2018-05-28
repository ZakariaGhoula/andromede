import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class PersonnalData extends Component {

  render() {
    const styles = require('./PersonnalData.scss');
    return (
      <div className={styles.checkout}>
        <Helmet title="Protection des données personnelles"/>
        <section className={styles.sectionIntroCollections}>
          <div className={styles.containerBlock}>
            <div className={'container-fluid'}>
              <div className={' row'}>
                <div
                  className={styles.colImgSquare + ' col-sm-12 col-md-10 col-md-push-1'}
                  ref={'scoller'}>
                  <h1 className={styles.title}>Protection des données personnelles
                    <hr/>
                  </h1>
                  <p>La maison Andromède et Persée construit avec ses utilisateurs des relations fortes et durables,
                    fond&eacute;es sur la confiance r&eacute;ciproque : assurer la s&eacute;curit&eacute; et la
                    confidentialit&eacute; des donn&eacute;es personnelles de ses utilisateurs est une
                    priorit&eacute; absolue pour La maison Andromède et Persée.</p>
                  <p>La maison Andromède et Persée respecte l&rsquo;ensemble des dispositions r&eacute;glementaires et
                    l&eacute;gislatives fran&ccedil;aises et europ&eacute;ennes relatives &agrave; la protection des
                    donn&eacute;es personnelles.</p>
                  <p>La maison Andromède et Persée se conforme &eacute;galement aux r&egrave;gles
                    d&eacute;ontologiques &eacute;dict&eacute;es par les instances ordinales repr&eacute;sentatives des
                    professions m&eacute;dicales et param&eacute;dicales pr&eacute;sentes sur son service.</p>
                  <p>La maison Andromède et Persée applique une politique extr&ecirc;mement stricte pour garantir la
                    protection des donn&eacute;es personnelles de sant&eacute; de ses utilisateurs :</p>
                  <ul>
                    <li>Chaque utilisateur d&rsquo;La maison Andromède et Persée reste ma&icirc;tre de ses
                      donn&eacute;es. La maison Andromède et Persée n&rsquo;en dispose pas librement.
                    </li>
                    <li>&nbsp;Elles sont trait&eacute;es de mani&egrave;re transparente, confidentielle et
                      s&eacute;curis&eacute;e.
                    </li>
                    <li>La maison Andromède et Persée estengag&eacute;dansuned&eacute;marche continue de protection
                      desdonn&eacute;es de sesutilisateurs, en conformit&eacute;avec la
                      LoiInformatiqueetLibert&eacute;sdu 6 janvier 1978 modifi&eacute;e
                      (ci-apr&egrave;s &laquo; LIL &raquo;) etduR&egrave;glement (UE) g&eacute;n&eacute;ralsur la
                      protection desdonn&eacute;esdu 27 avril 2016 (ci-apr&egrave;s &laquo; RGPD &raquo;).
                    </li>
                    <li>La maison Andromède et Persée dispose d&rsquo;une &eacute;quipe d&eacute;di&eacute;e &agrave; la
                      protection des donn&eacute;es personnelles, compos&eacute;e d&rsquo;une Directrice Juridique et
                      DPO (Data Protection Officer d&eacute;clar&eacute; aupr&egrave;s de la CNIL), d&rsquo;un Directeur
                      de la s&eacute;curit&eacute; et d&rsquo;ing&eacute;nieurs sp&eacute;cialis&eacute;s.
                    </li>
                  </ul>
                  <h2 className={styles.titleBlack}>OBJET DE LA PRÉSENTE POLITIQUE</h2>
                  <p>La maison Andromède et Persée souhaite vous informer par l&rsquo;interm&eacute;diaire de la
                    pr&eacute;sente
                    politique de la mani&egrave;re dont nous prot&eacute;geons vos
                    donn&eacute;es &agrave; caract&egrave;re personnel trait&eacute;es via le site <a
                      href="https://www.andromedeetpersee.com.">https://www.andromedeetpersee.com.</a></p>
                  <p>La pr&eacute;sente politique d&eacute;crit la mani&egrave;re dont La maison Andromède et Persée
                    traitent les
                    donn&eacute;es &agrave; caract&egrave;re personnel des visiteurs et des utilisateurs
                    (ci-apr&egrave;s le/les &laquo; Utilisateur(s) &raquo;) lors de leur navigation sur le site <a
                      href="https://www.andromedeetpersee.com">www.andromedeetpersee.com</a> (ci-apr&egrave;s
                    le &laquo; Site &raquo;)
                    et de leur utilisation des services de La maison Andromède et Persée.</p>
                  <p>Cette Politique peut &ecirc;tre modifi&eacute;e, compl&eacute;t&eacute;e ou mise &agrave; jour afin
                    notamment de se conformer &agrave; toute &eacute;volution l&eacute;gale, r&eacute;glementaire,
                    jurisprudentielle et technique. Cependant, les Donn&eacute;es Personnelles de l&rsquo;Utilisateur
                    seront toujours trait&eacute;es conform&eacute;ment &agrave; la politique en vigueur au moment de
                    leur collecte, sauf si une prescription l&eacute;gale imp&eacute;rative venait &agrave; en disposer
                    autrement et serait d'application r&eacute;troactive.</p>
                  <p>Cette politique fait partie int&eacute;grante des Conditions G&eacute;n&eacute;rales
                    d&rsquo;Utilisation du Site.</p>
                  <h2 className={styles.titleBlack}>COLLECTE & ORIGINE DES DONNEES</h2>
                  <p>Toutes les donn&eacute;es concernant les Utilisateurs sont collect&eacute;es directement
                    aupr&egrave;s de ces derniers.</p>
                  <p>La maison Andromède et Persée s&rsquo;engage &agrave; recueillir le consentement de ses
                    Utilisateurs et/ou &agrave; leur permettre de s&rsquo;opposer &agrave; l&rsquo;utilisation de leurs
                    donn&eacute;es pour certaines finalit&eacute;s, d&egrave;s que cela est n&eacute;cessaire.</p>
                  <p>Dans tous les cas, les Utilisateurs sont inform&eacute;s des finalit&eacute;s pour lesquelles leurs
                    donn&eacute;es sont collect&eacute;es via les diff&eacute;rents formulaires de collecte de
                    donn&eacute;es en ligne et via la Charte de gestion des cookies.</p>
                  <h2 className={styles.titleBlack}>FINALITE DES DONNEES COLLECTEES</h2>
                  <p>Le recueil de vos Donn&eacute;es Personnelles a pour base l&eacute;gale : -
                    l&rsquo;int&eacute;r&ecirc;t l&eacute;gitime d&rsquo;La maison Andromède et Persée &agrave; assurer
                    la meilleure qualit&eacute; de ses services, et &agrave; am&eacute;liorer le fonctionnement de son
                    Site - l&rsquo;int&eacute;r&ecirc;t l&eacute;gitime d&rsquo;La maison Andromède et
                    Persée &agrave; r&eacute;aliser des enqu&ecirc;tes de satisfaction facultatives sur ses services en
                    vue de les am&eacute;liorer- le consentement de ses Utilisateurs lorsque celui-ci est requis par la
                    r&eacute;glementation en vigueur, notamment en mati&egrave;re de prospection commerciale et de
                    cookies.</p>
                  <p>Les donn&eacute;es des Utilisateurs d&rsquo;La maison Andromède et Persée sont principalement
                    trait&eacute;es pour : - permettre leur navigation sur le Site.</p>
                  <p>A titre subsidiaire les donn&eacute;es des Utilisateurs sont &eacute;galement collect&eacute;es
                    pour : - pr&eacute;venir et lutter contre la fraude informatique (spamming, hacking&hellip;) -
                    am&eacute;liorer la navigation sur le Site - mener des enqu&ecirc;tes de satisfaction facultatives
                    sur les services de La maison Andromède et Persée (ces enqu&ecirc;tes sont r&eacute;alis&eacute;es
                    de mani&egrave;re anonyme ou sont anonymis&eacute;es &agrave; bref d&eacute;lai) - effectuer des
                    statistiques sur l&rsquo;utilisation de l&rsquo;outil, un reporting interne pour les &eacute;quipes
                    de recherche &amp; d&eacute;veloppement d&rsquo;La maison Andromède et Persée ainsi qu&rsquo;un
                    reporting &agrave; destination des Professionnels (sans qu&rsquo;aucune Donn&eacute;e de
                    Sant&eacute; ne soit utilis&eacute;e).</p>
                  <p>Vous retrouverez plus de d&eacute;tails sur la gestion des cookies nous permettant
                    d&rsquo;atteindre cette finalit&eacute; dans notre Charte de gestion des cookies.</p>
                  <p>Le caract&egrave;re obligatoire ou facultatif des donn&eacute;es personnelles demand&eacute;es et
                    les &eacute;ventuelles cons&eacute;quences d'un d&eacute;faut de
                    r&eacute;ponse &agrave; l&rsquo;&eacute;gard des Utilisateurs de La maison Andromède et Persée sont
                    pr&eacute;cis&eacute;s lors de leur(s) collecte(s).</p>
                  <h2 className={styles.titleBlack}>TYPES DE DONNÉES TRAITÉES</h2>
                  <p>La maison Andromède et Persée est susceptible de traiter : - Nom (et nom de naissance),
                    pr&eacute;nom, date de naissance - Num&eacute;ro de t&eacute;l&eacute;phone, adresse email, adresse
                    postale (&eacute;ventuellement digicode) - Mot de passe -</p>
                  <p>La maison Andromède et Persée est susceptible de traiter, en tant que Responsable de Traitement,
                    pour permettre la navigation sur le Site : donn&eacute;es de connexion et d&rsquo;utilisation du
                    Site - pour pr&eacute;venir et lutter contre la fraude informatique (spamming, hacking&hellip;) :
                    mat&eacute;riel informatique utilis&eacute; pour la navigation, l&rsquo;adresse IP, le mot de passe
                    (hash&eacute;) - pour am&eacute;liorer la navigation sur le Site : donn&eacute;es de connexion et
                    d&rsquo;utilisation - pour mener des enqu&ecirc;tes de satisfaction facultatives sur La maison
                    Andromède et Persée : adresse email - pour mener des campagnes de communication (sms, mail) :
                    num&eacute;ro de t&eacute;l&eacute;phone, adresse email</p>
                  <h2 className={styles.titleBlack}>NON-COMMUNICATION DES DONNÉES PERSONNELLES</h2>
                  <p>Les Donn&eacute;es Personnelles de l&rsquo;Utilisateur ne seront pas transmises &agrave; des
                    acteurs commerciaux ou publicitaires.</p>
                  <p>Les Donn&eacute;es Personnelles de l&rsquo;Utilisateur peuvent &ecirc;tre trait&eacute;es par des
                    filiales d&rsquo;La maison Andromède et Persée et des sous-traitants (prestataires de services),
                    dans le respect absolu du principe &eacute;nonc&eacute; ci-dessus, exclusivement afin de
                    r&eacute;aliser les finalit&eacute;s de la pr&eacute;sente politique.</p>
                  <p>Dans la limite de leurs attributions respectives et pour les finalit&eacute;s rappel&eacute;es
                    ci-dessus, les principales personnes susceptibles d&rsquo;avoir acc&egrave;s aux donn&eacute;es des
                    Utilisateurs (hors Donn&eacute;es de Sant&eacute;) d&rsquo;La maison Andromède et Persée sont
                    principalement les agents de notre service client.</p>
                  <h2 className={styles.titleBlack}>DUREE DE CONSERVATION DES DONNEES</h2>
                  <p>Nous conservons vos données uniquement le temps nécessaire pour les finalités poursuivies,
                    conformément aux prescriptions légales.</p>
                  <h2 className={styles.titleBlack}>LES DROITS DES
                    UTILISATEURS</h2>
                  <p>Chaque fois que La maison Andromède et Persée traite des Donn&eacute;es Personnelles, La maison
                    Andromède et Persée prend toutes les mesures raisonnables pour s&rsquo;assurer de l&rsquo;exactitude
                    et de la pertinence des Donn&eacute;es Personnelles au regard des finalit&eacute;s pour lesquelles
                    La maison Andromède et Persée les traite.</p>
                  <p>Conform&eacute;ment &agrave; la r&eacute;glementation europ&eacute;enne en vigueur, les
                    Utilisateurs de La maison Andromède et Persée disposent des droits suivants : - droit d'acc&egrave;s
                    (article 15 RGPD) et de rectification (article 16 RGPD), de mise &agrave; jour, de compl&eacute;tude
                    des donn&eacute;es des Utilisateurs - droit de verrouillage ou d&rsquo;effacement des donn&eacute;es
                    des Utilisateurs &agrave; caract&egrave;re personnel (article 17 du RGPD), lorsqu&rsquo;elles sont
                    inexactes, incompl&egrave;tes, &eacute;quivoques, p&eacute;rim&eacute;es, ou dont la collecte,
                    l'utilisation, la communication ou la conservation est interdite (en savoir plus) - droit de
                    retirer &agrave; tout moment un consentement (article 13-2c RGPD) - droit &agrave; la limitation du
                    traitement des donn&eacute;es des Utilisateurs (article 18 RGPD) - droit d&rsquo;opposition au
                    traitement des donn&eacute;es des Utilisateurs (article 21 RGPD) (en savoir plus) -
                    droit &agrave; la portabilit&eacute; des donn&eacute;es que les Utilisateurs auront fournies,
                    lorsque ces donn&eacute;es font l&rsquo;objet de traitements automatis&eacute;s fond&eacute;s sur
                    leur consentement ou sur un contrat (article 20 RGPD) - droit de d&eacute;finir le sort des
                    donn&eacute;es des Utilisateurs apr&egrave;s leur mort et de choisir &agrave; qui La maison
                    Andromède et Persée devra communiquer (ou non) ses donn&eacute;es &agrave; un tiers qu&rsquo;ils
                    aura pr&eacute;alablement d&eacute;sign&eacute; (en savoir plus)</p>
                  <p>D&egrave;s que La maison Andromède et Persée a connaissance du d&eacute;c&egrave;s d&rsquo;un
                    Utilisateur et &agrave; d&eacute;faut d&rsquo;instructions de sa part, La maison Andromède et Persée
                    s&rsquo;engage &agrave; d&eacute;truire ses donn&eacute;es, sauf si leur conservation
                    s&rsquo;av&egrave;re n&eacute;cessaire &agrave; des fins probatoires ou pour
                    r&eacute;pondre &agrave; une obligation l&eacute;gale (telle que la conservation du dossier).</p>
                  <h2 className={styles.titleBlack}>RÉSEAUX SOCIAUX</h2>
                  <p>L&rsquo;Utilisateur de La maison Andromède et Persée a la possibilit&eacute; de cliquer sur les
                    ic&ocirc;nes d&eacute;di&eacute;es aux r&eacute;seaux sociaux Instagram, Facebook et Google Plus
                    figurant sur le Site d&rsquo;La maison Andromède et Persée.</p>
                  <p>Les r&eacute;seaux sociaux permettent d'am&eacute;liorer la convivialit&eacute; du Site et
                    aident &agrave; sa promotion via les partages. Les services de partage de vid&eacute;o permettent
                    d'enrichir le Site d&rsquo;La maison Andromède et Persée de contenus vid&eacute;o et augmentent sa
                    visibilit&eacute;.</p>
                  <p>Lorsque l&rsquo;Utilisateur clique sur ces boutons, La maison Andromède et Persée pourra avoir
                    acc&egrave;s aux informations personnelles que l&rsquo;Utilisateur aura indiqu&eacute;es comme
                    publiques et accessibles depuis ses profils Instagram, Facebook et&nbsp;Google Plus.&nbsp;Cependant,
                    La maison Andromède et Persée ne cr&eacute;e ni n&rsquo;utilise aucune base de donn&eacute;es
                    ind&eacute;pendante de Instagram, Facebook et&nbsp;Google Plus&nbsp;&agrave; partir des informations
                    personnelles que l&rsquo;Utilisateur peut y publier et La maison Andromède et Persée ne traitera
                    aucune donn&eacute;e relevant de sa vie priv&eacute;e par ce biais.</p>
                  <p>Si l&rsquo;Utilisateur ne souhaite pas que La maison Andromède et Persée ait acc&egrave;s aux
                    informations personnelles publi&eacute;es sur l&rsquo;espace public de ses profils ou de ses comptes
                    sociaux, l&rsquo;Utilisateur devra alors utiliser les moyens mis &agrave; sa disposition par
                    Instagram, Facebook et&nbsp;Google Plus afin de limiter l&rsquo;acc&egrave;s &agrave; ses
                    donn&eacute;es.</p>
                  <h2 className={styles.titleBlack}>SÉCURITÉ</h2>
                  <p>La maison Andromède et Persée met en &oelig;uvre toutes les mesures techniques et
                    organisationnelles afin d&rsquo;assurer la s&eacute;curit&eacute; des traitements de
                    donn&eacute;es &agrave; caract&egrave;re personnel et la confidentialit&eacute; de Donn&eacute;es
                    Personnelles.</p>
                  <p>A ce titre, La maison Andromède et Persée prend toutes les pr&eacute;cautions utiles, au regard de
                    la nature des donn&eacute;es et des risques pr&eacute;sent&eacute;s par le traitement, afin de
                    pr&eacute;server la s&eacute;curit&eacute; des donn&eacute;es et, notamment, d&rsquo;emp&ecirc;cher
                    qu&rsquo;elles soient d&eacute;form&eacute;es, endommag&eacute;es, ou que des tiers non
                    autoris&eacute;s y aient acc&egrave;s (protection physique des locaux, proc&eacute;d&eacute;s
                    d&rsquo;authentification avec acc&egrave;s personnel et s&eacute;curis&eacute; via des identifiants
                    et mots de passe confidentiels, journalisation des connexions, chiffrement de certaines
                    donn&eacute;es&hellip;).</p>
                  <h2 className={styles.titleBlack}>INFORMATIONS PERSONNELLES ET MINEURS</h2>
                  <p>En principe, le Site s&rsquo;adressent &agrave; des personnes majeures capables de contracter des
                    obligations conform&eacute;ment &agrave; la l&eacute;gislation du pays dans lequel se trouve
                    l&rsquo;Utilisateur.</p>
                  <p>L'Utilisateur mineur de moins de 16 ans ou incapable doit obtenir le consentement pr&eacute;alable
                    de son responsable l&eacute;gal pr&eacute;alablement &agrave; la saisie de ses donn&eacute;es sur le
                    Site. Sauf obligation l&eacute;gale de confidentialit&eacute; ou li&eacute;e au secret
                    m&eacute;dical, La maison Andromède et Persée pourra directement informer ce responsable (i) des cat&eacute;gories
                    sp&eacute;cifiques de Donn&eacute;es Personnelles recueillies aupr&egrave;s de la personne mineure
                    (ii) de la possibilit&eacute; de s&rsquo;opposer &agrave; la collecte, l&rsquo;utilisation ou la
                    conservation de celles-ci.</p>
                  <p>L&rsquo;&acirc;ge de 16 ans peut &ecirc;tre abaiss&eacute; jusqu&rsquo;&agrave; 13 ans en fonction
                    de la r&eacute;glementation locale de la r&eacute;sidence habituelle de l&rsquo;Utilisateur, en
                    vertu de l&rsquo;article 8 du RGPD.</p></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
