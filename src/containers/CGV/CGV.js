import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class CGV extends Component {

  render() {
    const styles = require('./CGV.scss');
    return (
      <div className={styles.checkout}>
        <Helmet title="CGU/CGV"/>
        <section className={styles.sectionIntroCollections}>
          <div className={styles.containerBlock}>
            <div className={'container-fluid'}>
              <div className={' row'}>
                <div
                  className={styles.colImgSquare + ' col-sm-12 col-md-10 col-md-push-1'}
                  ref={'scoller'}>
                  <h1 className={styles.title}>CGU/CGV
                    <hr/>
                  </h1>
                  <p>Les pr&eacute;sentes Conditions G&eacute;n&eacute;rales de Vente sont conclues entre d'une part
                    Androm&egrave;de et Pers&eacute;e, SARL au capital de 15 000 &euro; immatricul&eacute;e au RCS de
                    Meaux sous le num&eacute;ro 832 204 572, ayant son si&egrave;ge au 19 square d&rsquo;Artois 77186
                    Noisiel, et d'autre part toute personne ayant effectu&eacute; un achat sur le site
                    http://www.andromedeetpersee.com, ci-apr&egrave;s d&eacute;nomm&eacute;e &laquo; le Client &raquo;.
                    Tout achat sur le site www.andromedeetpersee.com entra&icirc;ne automatiquement l'acceptation de
                    l'int&eacute;gralit&eacute; de ces conditions dont le Client reconna&icirc;t avoir pris connaissance
                    pr&eacute;alablement &agrave; sa commande.</p>
                  <p>Si une partie quelconque des Conditions de Vente venait &agrave; &ecirc;tre inapplicable (y compris
                    toute disposition relative &agrave; l'exon&eacute;ration de responsabilit&eacute;),
                    l'applicabilit&eacute; du reste des Conditions de Vente n'en serait pas affect&eacute;e, et les
                    autres clauses resteraient en vigueur. Autant que possible, dans le cas o&ugrave; une clause/sous
                    clause ou une partie de clause/sous clause peut &ecirc;tre s&eacute;par&eacute;e du reste de la
                    clause afin de rendre la partie restante valable, la clause doit &ecirc;tre
                    interpr&eacute;t&eacute;e en cons&eacute;quence. Dans le cas contraire, le Client accepte que la
                    clause en question soit rectifi&eacute;e et interpr&eacute;t&eacute;e de telle mani&egrave;re
                    qu'elle se rapproche du sens original de la clause, conform&eacute;ment &agrave; la loi.</p>
                  <h2 className={styles.titleBlack}>Article 1 : Confidentialité</h2>
                  <p>L'ensemble des donn&eacute;es &agrave; caract&egrave;re personnel communiqu&eacute;es par le Client
                    sur le site www.andromedeetpersee.com font l&rsquo;objet d&rsquo;un traitement informatique
                    destin&eacute; au traitement et &agrave; la livraison des commandes, au choix
                    des &eacute;chantillons offerts au Client. Ces donn&eacute;es sont exclusivement
                    r&eacute;serv&eacute;es &agrave; Androm&egrave;de et Pers&eacute;e.</p>
                  <p>Conform&eacute;ment &agrave; loi &laquo; informatique et libert&eacute;s &raquo; n&deg;78-17 du 6
                    janvier 1978 modifi&eacute;e, le traitement des donn&eacute;es &agrave; caract&egrave;re personnel
                    du Client fait l'objet d'une d&eacute;claration aupr&egrave;s de la CNIL et le Client dispose d'un
                    droit d'acc&egrave;s, de modification, de rectification et de suppression des donn&eacute;es le
                    concernant en s&rsquo;adressant &agrave; Androm&egrave;de et Pers&eacute;e, 19 square
                    d&rsquo;Artois, 77186 Noisiel &ndash; <a
                      href="mailto:contact@ohmycream.com">contact@andromedeetpersee.com</a>.</p>
                  <p>En utilisant ce Site Internet, le Client consent au traitement de ses informations personnelles
                    dans les conditions d&eacute;crites sous cette rubrique, et garantit que toutes les donn&eacute;es
                    fournies sont exactes et &agrave; jour. Le Client est &eacute;galement responsable de maintenir et
                    mettre &agrave; jour les informations de son compte pour qu&rsquo;elles soient justes et
                    compl&egrave;tes.</p>
                  <p>Le Client peut s'inscrire &agrave; la newsletter de Androm&egrave;de et Pers&eacute;e et ainsi
                    choisir d'&ecirc;tre r&eacute;guli&egrave;rement inform&eacute; des offres propos&eacute;es. Il
                    a, &agrave; tout moment, la possibilit&eacute; de se d&eacute;sabonner en cliquant sur le lien
                    pr&eacute;vu &agrave; cet effet sur chacune des newsletters.</p>
                  <h2 className={styles.titleBlack}>Article 2 : Capacité de l'acheteur</h2>
                  <p>Le Client qui achète sur le site déclare être juridiquement capable de s’engager au titre des
                    présentes conditions générales de vente.</p>
                  <h2 className={styles.titleBlack}>Article 3 : Prix et disponibilité</h2>
                  <p>Tous les prix pr&eacute;sent&eacute;s sur le site s'entendent toutes taxes comprises. Les prix des
                    produits sont indiqu&eacute;s en euros.&nbsp;Les prix des produits s'entendent hors frais de
                    livraison (port, emballage et confection du colis selon montants en vigueur). Le montant des frais
                    de livraison sera pr&eacute;cis&eacute; avant validation de la commande.</p>
                  <p>Androm&egrave;de et Pers&eacute;e se r&eacute;serve le droit de modifier ses prix sans
                    pr&eacute;avis et les prix appliqu&eacute;s au Client correspondent &agrave; ceux affich&eacute;s
                    sur le site au moment de sa commande. Les marchandises restent la
                    propri&eacute;t&eacute; int&eacute;grale de Androm&egrave;de et Pers&eacute;e jusqu'&agrave; la
                    r&eacute;ception de la somme totale due acquitt&eacute;e par le Client.</p>
                  <p>Androm&egrave;de et Pers&eacute;e s'efforce au mieux de renseigner (y compris la
                    disponibilit&eacute;), les descriptions et les prix de la mani&egrave;re la plus exacte
                    possible.</p>
                  <h2 className={styles.titleBlack}>Article 4 : Commande et paiement</h2>
                  <p><strong>A. Commande</strong></p>
                  <p>La commande est valid&eacute;e une fois que le paiement a &eacute;t&eacute; accept&eacute; par
                    Androm&egrave;de et Pers&eacute;e. Androm&egrave;de et Pers&eacute;e se r&eacute;serve le droit de
                    refuser une commande si le Client pr&eacute;sente d&eacute;j&agrave; un litige avec Androm&egrave;de
                    et Pers&eacute;e ou si Androm&egrave;de et Pers&eacute;e estime que le Client comporte un risque de
                    d&eacute;faut de paiement. Androm&egrave;de et Pers&eacute;e se r&eacute;serve alors le droit de
                    demander &agrave; son Client des informations compl&eacute;mentaires s'il l'estime
                    n&eacute;cessaire, telles qu&rsquo;une pi&egrave;ce d'identit&eacute; ou un justificatif de
                    domicile. Sans r&eacute;ponse du Client dans un d&eacute;lai de 5 jours suivant la commande, la
                    commande et le paiement sont annul&eacute;s. Androm&egrave;de et Pers&eacute;e
                    s'engage &agrave; honorer les commandes re&ccedil;ues, uniquement dans la limite des stocks
                    disponibles.</p>
                  <p><strong>B. Paiement&nbsp;</strong></p>
                  <p>Une fois que le Client valide sa commande, il accepte l'int&eacute;gralit&eacute; des Conditions
                    G&eacute;n&eacute;rales de Vente. Le Client paie sur le site www.andromedeetpersee.com par carte
                    bancaire (CB, Visa ou Mastercard) via la plateforme de paiement s&eacute;curis&eacute; Stripe. Les
                    paiements par ch&egrave;que ou esp&egrave;ces ne sont pas accept&eacute;s.</p>
                  <p><strong>C.&nbsp;Paiement 3D Secure&nbsp;</strong></p>
                  <p>Votre commande peut &ecirc;tre soumise &agrave; une v&eacute;rification 3D Secure. 3D Secure est un
                    syst&egrave;me de paiement par authentification permettant de vous garantir une
                    s&eacute;curit&eacute; optimale lors de vos achats en ligne. Lors du paiement, votre banque
                    v&eacute;rifie l&rsquo;identit&eacute; du porteur de la carte avant de valider la transaction.</p>
                  <p><strong>Fonctionnement d&rsquo;une v&eacute;rification 3D Secure</strong><br/>Apr&egrave;s avoir
                    valid&eacute; vos coordonn&eacute;es bancaires, vous &ecirc;tes transf&eacute;r&eacute; sur le site
                    de votre banque. Dans la fen&ecirc;tre 3D Secure qui s&rsquo;affiche, le
                    proc&eacute;d&eacute; d&rsquo;authentification &agrave; suivre est propre &agrave; chaque banque. Il
                    peut vous &ecirc;tre demand&eacute; :<br/>&bull; De saisir votre date de naissance<br/>&bull; De
                    renseigner un code re&ccedil;u par SMS<br/>&bull; Ou encore de r&eacute;pondre &agrave; une question
                    personnelle.<br/>Cet &eacute;change d&rsquo;information entre vous et votre banque est
                    s&eacute;curis&eacute;. Il permet de garantir l&rsquo;identit&eacute; de l&rsquo;utilisateur de la
                    carte. Pour toute question sur le code 3D Secure (obtention, perte, modification&hellip;), contactez
                    directement votre banque. ATTENTION : Apr&egrave;s 3 &eacute;checs d&rsquo;authentification, votre
                    transaction est annul&eacute;e. Votre carte sera bloqu&eacute;e. Contactez alors votre banque.</p>
                  <p><strong>C. V&eacute;rification des paiements&nbsp;</strong></p>
                  <p>Afin de se prot&eacute;ger contre certaines pratiques abusives de la part de fraudeurs,
                    Androm&egrave;de et Pers&eacute;e contr&ocirc;le les commandes qui
                    ont &eacute;t&eacute; valid&eacute;es sur son site. Dans le cadre de ce contr&ocirc;le, notre
                    service client pourra &ecirc;tre amen&eacute; &agrave; vous demander certaines pi&egrave;ces
                    utiles &agrave; la validation de votre commande et notamment un justificatif de
                    domicile &agrave; votre nom, ou au nom de la personne indiqu&eacute;e pour l'adresse de livraison
                    etc.</p>
                  <p>Androm&egrave;de et Pers&eacute;e confie la s&eacute;curit&eacute; de ses transactions au
                    prestataire Stripe. Le paiement est s&eacute;curis&eacute; gr&acirc;ce au syst&egrave;me de paiement
                    en ligne de notre partenaire Stripe. Les donn&eacute;es bancaires ne circulent sur le r&eacute;seau
                    Internet que sous forme encrypt&eacute;e, c'est-&agrave;-dire qu'elles sont cod&eacute;es de
                    mani&egrave;re &agrave; les rendre totalement illisibles et ne sont ainsi jamais conserv&eacute;es
                    par Androm&egrave;de et Pers&eacute;e.</p>
                  <h2 className={styles.titleBlack}>Article 5 : Livraisons en France Métropolitaine </h2>
                  <p>Les commandes sont exp&eacute;di&eacute;es sous dix jours ouvr&eacute;s &agrave; partir de la
                    validation de la commande.</p>
                  <p>Tous les d&eacute;tails des co&ucirc;ts et d&eacute;lais de livraison en France
                    M&eacute;tropolitaine se trouvent sur la page&nbsp;<a title="Livraisons &amp; Retours"
                                                                          href="https://www.andromedeetpersee.com/fr/livraison"><strong>Livraisons &amp; Retours</strong></a>.
                  </p>
                  <h2 className={styles.titleBlack}>Article 6 : Livraisons Dom Tom & International</h2>
                  <p>Les commandes sont exp&eacute;di&eacute;es sous dix jours &agrave; partir de la validation de la
                    commande.</p>
                  <p>Hors Union Europ&eacute;enne, des taxes de douane ou d'importation peuvent s'ajouter au prix de nos
                    produits et restent &agrave; la charge du Client. Il est donc du ressort du Client de s'informer de
                    leur montant aupr&egrave;s de son bureau de douane local.</p>
                  <p>Les frais de port sont &agrave; la charge du Client et varient en fonction du lieu de destination :
                    tous les d&eacute;tails des co&ucirc;ts et d&eacute;lais par zone g&eacute;ographique se trouvent
                    sur la page&nbsp;<a title="Livraisons &amp; Retours"
                                        href="https://www.andromedeetpersee.com/fr/livraison"><strong>Livraisons &amp; Retours</strong></a>.&nbsp;
                  </p>
                  <h2 className={styles.titleBlack}>Article 7 : Retour, Echange</h2>
                  <p>Le Client dispose d&rsquo;un d&eacute;lai de 14 jours &agrave; compter du jour de r&eacute;ception
                    de sa commande pour exercer son droit de r&eacute;tractation sans donner de motif.</p>
                  <p>Conform&eacute;ment &agrave; l&rsquo;article L.121-28 du Code de la consommation, le droit de
                    r&eacute;tractation ne peut &ecirc;tre exerc&eacute; pour les contrats de fourniture de biens qui
                    ont &eacute;t&eacute; descell&eacute;s par le Client apr&egrave;s la livraison et qui ne
                    peuvent &ecirc;tre renvoy&eacute;s pour des raisons d'hygi&egrave;ne ou de protection de la
                    sant&eacute;. &nbsp;Tous les produits retourn&eacute;s sont inspect&eacute;s. Tout produit
                    retourn&eacute; qui serait incomplet, endommag&eacute;, us&eacute; ou sale ne sera pas repris et il
                    sera retourn&eacute; au Client sans que le Client ne puisse exiger quelque compensation que ce
                    soit.</p>
                  <p>Pour exercer le droit de r&eacute;tractation, le Client doit notifier &agrave; Androm&egrave;de et
                    Pers&eacute;e (19 square d&rsquo;Artois 77186 Noisiel&ndash; contact@andromedeetpersee.com) sa
                    d&eacute;cision de r&eacute;tractation avant l'expiration du d&eacute;lai au moyen d'une
                    d&eacute;claration d&eacute;nu&eacute;e d'ambigu&iuml;t&eacute; (par exemple, lettre envoy&eacute;e
                    par la poste ou courrier &eacute;lectronique).</p>
                  <p>Le Client peut utiliser le mod&egrave;le de formulaire de r&eacute;tractation figurant ci-dessous
                    :</p>
                  <p>(Veuillez compl&eacute;ter et renvoyer le pr&eacute;sent formulaire uniquement si vous souhaitez
                    vous r&eacute;tracter du contrat.)</p>
                  <p>A l'attention de Androm&egrave;de et Pers&eacute;e, 19 square d&rsquo;Artois 77186 Noisiel,
                    contact@andromedeetpersee.com :</p>
                  <p>&nbsp;</p>
                  <p>Je/nous (*) vous notifie/notifions (*) par la pr&eacute;sente ma/notre (*) r&eacute;tractation du
                    contrat portant sur la vente du bien (*)/pour la prestation de services (*) ci-dessous
                    :<br/>Command&eacute; le (*)/re&ccedil;u le (*) :<br/>Nom du (des) consommateur(s) :<br/>Adresse du
                    (des) consommateur(s) :&nbsp;<br/>Signature du (des) consommateur(s) (uniquement en cas de
                    notification du pr&eacute;sent formulaire sur papier) :&nbsp;<br/>Date :&nbsp;<br/>(*) Rayez la
                    mention inutile.</p>
                  <p>En cas de r&eacute;tractation de la part du Client, Androm&egrave;de et Pers&eacute;e lui
                    remboursera le montant de sa commande, y compris les frais de livraison (&agrave; l'exception des
                    frais suppl&eacute;mentaires d&eacute;coulant du fait qu&rsquo;il a choisi, le
                    cas &eacute;ch&eacute;ant, un mode de livraison plus co&ucirc;teux que le mode de livraison standard
                    propos&eacute; par Androm&egrave;de et Pers&eacute;e) au plus tard quatorze jours &agrave; compter
                    du jour o&ugrave; Androm&egrave;de et Pers&eacute;e est inform&eacute;e de sa d&eacute;cision de
                    r&eacute;tractation.&nbsp;</p>
                  <p>Androm&egrave;de et Pers&eacute;e peut diff&eacute;rer le remboursement
                    jusqu'&agrave; r&eacute;ception des produits retourn&eacute;s ou jusqu'&agrave; ce que le Client ait
                    fourni une preuve d'exp&eacute;dition des produits, la date retenue &eacute;tant celle du premier de
                    ces faits.</p>
                  <p>Lorsque &nbsp;la commande &eacute;tait accompagn&eacute;e d&rsquo;un cadeau offert au Client sous
                    conditions &ndash; par exemple, cadeau offert seulement si un montant minimum de
                    commande &eacute;tait atteint &ndash; et que le Client ne remplit plus les conditions
                    n&eacute;cessaires &agrave; l&rsquo;obtention du cadeau du fait de l&rsquo;exercice du droit de
                    r&eacute;tractation par le Client, le cadeau doit &ecirc;tre
                    renvoy&eacute; &agrave; Androm&egrave;de et Pers&eacute;e avec les produits retourn&eacute;s et
                    Androm&egrave;de et Pers&eacute;e peut diff&eacute;rer le remboursement
                    jusqu'&agrave; r&eacute;ception du cadeau ou jusqu'&agrave; ce que le Client ait fourni une preuve
                    d'exp&eacute;dition du cadeau, la date retenue &eacute;tant celle du premier de ces faits.</p>
                  <p>Androm&egrave;de et Pers&eacute;e proc&eacute;dera au remboursement en utilisant le m&ecirc;me
                    moyen de paiement que celui utilis&eacute; pour la transaction initiale, sauf si le Client convient
                    express&eacute;ment d'un moyen diff&eacute;rent et que ce remboursement n'occasionne pas de frais
                    pour le Client.&nbsp;</p>
                  <p>Le Client devra prendre en charge les frais directs de renvoi du bien.</p>
                  <p>Androm&egrave;de et Pers&eacute;e conseille au Client de choisir un mode de transport avec
                    num&eacute;ro de suivi. Sans num&eacute;ro de suivi, Androm&egrave;de et Pers&eacute;e
                    n&rsquo;acceptera aucune r&eacute;clamation.&nbsp;</p>
                  <p>La responsabilit&eacute; du Client n'est engag&eacute;e qu'&agrave; l'&eacute;gard de la
                    d&eacute;pr&eacute;ciation du bien r&eacute;sultant de manipulations autres que celles
                    n&eacute;cessaires pour &eacute;tablir la nature, les caract&eacute;ristiques et le bon
                    fonctionnement de ce bien.</p>
                  <p>Les commandes r&eacute;alis&eacute;es sur le site internet d'Androm&egrave;de et Pers&eacute;e ne
                    peuvent &ecirc;tre ni retourn&eacute;es ni &eacute;chang&eacute;es dans les boutiques.</p>
                  <h2 className={styles.titleBlack}>Article 8 : Bons d'achat</h2>
                  <p>Les bons d&rsquo;achat envoy&eacute;s par Androm&egrave;de et Pers&eacute;e en &eacute;change d&rsquo;un retour ou achet&eacute;s par le Client sont utilisables pendant 1 an sur l&rsquo;ensemble des produits propos&eacute;s sur le site www.andromedetepersee.com. Les bons d&rsquo;achat ne sont pas cumulables entre eux ni avec des codes promotionnels.&nbsp;Les bons cadeaux achet&eacute;s sur le site internet Androm&egrave;de et Pers&eacute;e et dans les boutiques Androm&egrave;de et Pers&eacute;e ne peuvent donner lieu &agrave; un remboursement en esp&egrave;ces.</p>
                  <h2 className={styles.titleBlack}>Article 9 : Codes promotionnels</h2>
                  <p>Les codes promotionnels s'appliquent uniquement sur les prix de base non-remis&eacute;s. Les codes promotionnels ne sont pas cumulables entre eux ni avec des bons d&rsquo;achat. Les codes promotionnels sont utilisables 1 fois par compte Client sauf instruction contraire de Androm&egrave;de et Pers&eacute;e. Ces codes ne sont pas remboursables lors d&rsquo;un &eacute;change.</p>
                  <h2 className={styles.titleBlack}>Article 10 : Propriété intellectuelle</h2>
                  <p>Tous les &eacute;l&eacute;ments pr&eacute;sents sur le site www.andromedeetpersee.com, qu'ils soient visuels, textuels ou sonores, sont la propri&eacute;t&eacute; exclusive de Androm&egrave;de et Pers&eacute;e, ou du titulaire des droits de propri&eacute;t&eacute; intellectuelle concern&eacute;, et sont &agrave; ce titre prot&eacute;g&eacute;s par le code de la propri&eacute;t&eacute; intellectuelle et le droit d'auteur. A ce titre, toute reproduction de la marque Androm&egrave;de et Pers&eacute;e ou du site www.andromedeetpersee.com, partielle ou int&eacute;grale, est strictement interdite.&nbsp;</p>
                  <p>Vous pouvez mettre en place des liens vers notre site internet si vous le faites de mani&egrave;re loyale et que cela ne porte en aucun cas atteinte &agrave; notre r&eacute;putation ou profite de notre notori&eacute;t&eacute;. Il vous est toutefois interdit d'&eacute;tablir un tel lien de sorte que cela sugg&egrave;re une forme d'association si celle-ci n&rsquo;existe pas. Par ailleurs, il est strictement interdit de mettre en place un lien vers notre site sur un site internet qui ne vous appartient pas. Nous nous r&eacute;servons le droit de supprimer les liens sans pr&eacute;avis.</p>
                  <h2 className={styles.titleBlack}>Article 11 : Limitation de responsabilité</h2>
                  <p>La soci&eacute;t&eacute; Androm&egrave;de et Pers&eacute;e ne pourra &ecirc;tre responsable &agrave; l'&eacute;gard des tiers, en cas de dommages indirects, de dommages sp&eacute;ciaux ou d'incidents d&eacute;coulant d'une n&eacute;gligence, d'une d&eacute;faillance ou d'une maladresse du Client, ou r&eacute;sultant d'une mauvaise utilisation par le Client de l'un des produits propos&eacute;s &agrave; la vente sur le site www.andromedeetpersee.com. Concernant l'acc&egrave;s au site, la consultation de ce dernier, le processus de commande, de paiement de livraison et de service, la soci&eacute;t&eacute; Androm&egrave;de et Pers&eacute;e n'a qu'une obligation de moyens. La responsabilit&eacute; de Androm&egrave;de et Pers&eacute;e ne saurait &ecirc;tre engag&eacute;e pour tous les inconv&eacute;nients ou dommages inh&eacute;rents au r&eacute;seau Internet, notamment toute perturbation de la connexion ou toute intrusion de virus informatique. En outre Androm&egrave;de et Pers&eacute;e est exon&eacute;r&eacute;e de toute responsabilit&eacute; pour tout fait qualifi&eacute; de force majeure au sens de la jurisprudence de la Cour de Cassation. Enfin la responsabilit&eacute; de Androm&egrave;de et Pers&eacute;e est limit&eacute;e au montant de la commande du Client.</p>
                  <h2 className={styles.titleBlack}>Article 12 : Garantie légale</h2>
                  <p>Les produits vendus sur le site www.andromedeetpersee.com sont soumis &agrave; la garantie l&eacute;gale de conformit&eacute; &eacute;nonc&eacute;e par les articles L.217-4 et suivants du Code de la consommation et &agrave; la garantie contre les vices cach&eacute;s &eacute;nonc&eacute;s par les articles 1641 et suivants du Code civil.</p>
                  <p><strong>12.1 Garantie l&eacute;gale de conformit&eacute;</strong></p>
                  <p><strong>Article L. 217-4 du Code de la consommation :&nbsp;</strong>Le vendeur livre un bien conforme au contrat et r&eacute;pond des d&eacute;fauts de conformit&eacute; existant lors de la d&eacute;livrance. Il r&eacute;pond &eacute;galement des d&eacute;fauts de conformit&eacute; r&eacute;sultant de l'emballage, des instructions de montage ou de l'installation lorsque celle-ci a &eacute;t&eacute; mise &agrave; sa charge par le contrat ou a &eacute;t&eacute; r&eacute;alis&eacute;e sous sa responsabilit&eacute;.&nbsp;<strong>Article L. 217-5 du Code de la consommation</strong>&nbsp;: Le bien est conforme au contrat : 1&deg; S&rsquo;il est propre &agrave; l'usage habituellement attendu d'un bien semblable et, le cas &eacute;ch&eacute;ant : - s'il correspond &agrave; la description donn&eacute;e par le vendeur et poss&egrave;de les qualit&eacute;s que celui-ci a pr&eacute;sent&eacute;es &agrave; l'acheteur sous forme d'&eacute;chantillon ou de mod&egrave;le ; - s'il pr&eacute;sente les qualit&eacute;s qu'un acheteur peut l&eacute;gitimement attendre eu &eacute;gard aux d&eacute;clarations publiques faites par le vendeur, par le producteur ou par son repr&eacute;sentant, notamment dans la publicit&eacute; ou l'&eacute;tiquetage ; 2&deg; Ou s'il pr&eacute;sente les caract&eacute;ristiques d&eacute;finies d'un commun accord par les parties ou est propre &agrave; tout usage sp&eacute;cial recherch&eacute; par l'acheteur, port&eacute; &agrave; la connaissance du vendeur et que ce dernier a accept&eacute;.&nbsp;<strong>Article L. 217-12 du Code de la consommation</strong>&nbsp;: L'action r&eacute;sultant du d&eacute;faut de conformit&eacute; se prescrit par deux ans &agrave; compter de la d&eacute;livrance du bien.</p>
                  <p><strong><br />12.2 Garantie des d&eacute;fauts de la chose vendue</strong></p>
                  <p><strong>Article 1641 du Code civil :</strong>&nbsp;Le Vendeur est tenu de la garantie &agrave; raison des d&eacute;fauts cach&eacute;s de la chose vendue qui la rendent impropre &agrave; l'usage auquel on la destine, ou qui diminuent tellement cet usage que l'acheteur ne l'aurait pas acquise, ou n'en aurait donn&eacute; qu'un moindre prix, s'il les avait connus.&nbsp;<strong>Article 1648 du Code civil :</strong>&nbsp;L'action r&eacute;sultant des vices r&eacute;dhibitoires doit &ecirc;tre intent&eacute;e par l'acqu&eacute;reur dans un d&eacute;lai de deux ans &agrave; compter de la d&eacute;couverte du vice.</p>
                  <p><em>Lorsqu'il agit en garantie l&eacute;gale de conformit&eacute;, le Client :</em></p>
                  <p><em>- b&eacute;n&eacute;ficie d'un d&eacute;lai de deux ans &agrave; compter de la d&eacute;livrance du bien pour agir ;</em><br /><em>- peut choisir entre la r&eacute;paration ou le remplacement du bien, sous r&eacute;serve des conditions de co&ucirc;t pr&eacute;vues par l'article L.217-9 du Code de la consommation ;</em><br /><em>- est dispens&eacute; de rapporter la preuve de l'existence du d&eacute;faut de conformit&eacute; du bien durant les vingt-quatre mois suivant la d&eacute;livrance du bien.</em></p>
                  <p><em>La garantie l&eacute;gale de conformit&eacute; s'applique ind&eacute;pendamment de la garantie commerciale &eacute;ventuellement consentie.&nbsp;</em></p>
                  <p><em>Le Client peut d&eacute;cider de mettre en &oelig;uvre la garantie contre les d&eacute;fauts cach&eacute;s de la chose vendue au sens de l'article 1641 du code civil et peut dans cette hypoth&egrave;se choisir entre la r&eacute;solution de la vente ou une r&eacute;duction du prix de vente conform&eacute;ment &agrave; l'article 1644 du code civil.</em> </p>
                  <h2 className={styles.titleBlack}>Article 13 : Litige - Réclamation - Informations</h2>
                  <p>Si vous avez une question, une r&eacute;clamation ou besoin d&rsquo;informations relatives aux conditions de vente en ligne mises en place par Androm&egrave;de et Pers&eacute;e, adressez-vous au Service Client par courrier &eacute;lectronique &agrave; l&rsquo;adresse suivante : contact@andromedeetpersee.com.</p>
                  <h2 className={styles.titleBlack}>Article 14 : Droit applicable</h2>
                  <p>Le Client accepte et reconna&icirc;t pleinement que le droit fran&ccedil;ais r&eacute;git les pr&eacute;sentes Conditions G&eacute;n&eacute;rales de Vente, ainsi que tout diff&eacute;rend ou litige pouvant surgir entre le Client et la soci&eacute;t&eacute; Androm&egrave;de et Pers&eacute;e. De plus, l'internaute (ou le Client) accepte qu'en cas de litige, suite &agrave; une visite ou &agrave; un achat sur www.andromedeetpersee.com, ce sont les tribunaux fran&ccedil;ais qui sont reconnus comp&eacute;tents.</p>
                  <p>&nbsp;</p>
                  <p><strong>D&eacute;claration relative &agrave; la protection des donn&eacute;es &agrave; caract&egrave;re personnel</strong></p>
                  <p><strong>1. Collecte et utilisation g&eacute;n&eacute;rale des donn&eacute;es</strong></p>
                  <p>&nbsp;</p>
                  <p>a. Commande : Lors de votre commande, nous sommes amen&eacute;s &agrave; enregistrer vos donn&eacute;es afin de traiter au mieux votre commande et de proc&eacute;der &agrave; l&rsquo;exp&eacute;dition des produits achet&eacute;s. Ces informations sont &eacute;galement conserv&eacute;es &agrave; des fins de s&eacute;curit&eacute;, afin de respecter les obligations l&eacute;gales et r&eacute;glementaires, ainsi que pour nous permettre d&rsquo;am&eacute;liorer et personnaliser nos offres. Gr&acirc;ce &agrave; votre adresse e-mail nous pourrons vous envoyer une confirmation de commande et communiquer avec vous si n&eacute;cessaire. Votre adresse e-mail permet &eacute;galement votre identification lors de la connexion &agrave; votre compte d&rsquo;utilisateur. Les donn&eacute;es &agrave; caract&egrave;re personnel collect&eacute;es sur www.andromedeetpersee.com sont exclusivement r&eacute;serv&eacute;es &agrave; la soci&eacute;t&eacute; Androm&egrave;de et Pers&eacute;e.<br /><br />b. Connexion &agrave; votre compte d&rsquo;utilisateur : Quand vous passez commande sur notre site, nous vous proposons un acc&egrave;s &agrave; votre &laquo; Compte Utilisateur &raquo; prot&eacute;g&eacute; par un mot de passe. Cela vous permet d&rsquo;avoir acc&egrave;s aux informations relatives &agrave; vos commandes pass&eacute;es et de corriger vos informations personnelles si besoin. Il est important de ne pas divulguer &agrave; des tiers les donn&eacute;es d&rsquo;acc&egrave;s &agrave; votre &laquo; Compte Utilisateur &raquo; dont l&rsquo;usage est strictement personnel.<br /><br />c. Publicit&eacute; : Nous utilisons les donn&eacute;es vous concernant pour vous envoyer des informations sur nos produits et vous recommander des produits en vente sur notre site qui pourraient vous int&eacute;resser. Nous avons recours &agrave; la publicit&eacute; par email uniquement dans les limites d&eacute;finies par la loi.<br /><br />d. Abonnement &agrave; la newsletter : Si vous d&eacute;cidez de vous abonner &agrave; notre newsletter, vous recevrez des informations sur des offres avantageuses dont vous pourrez interrompre la r&eacute;ception &agrave; tout moment en cliquant sur le lien pr&eacute;vu &agrave; cet effet sur chacune des newsletters. Les informations collect&eacute;es dans le cadre de l&rsquo;inscription &agrave; notre newsletter nous permettent de vous faire des offres commerciales plus pertinentes.<br /><br />e. Consultation de sites Web : Pour des raisons de s&eacute;curit&eacute;, lors de vos visites sur notre site les donn&eacute;es suivantes peuvent &ecirc;tre recueillies et enregistr&eacute;es de mani&egrave;re temporaire : nom de domaine ou adresse IP, code r&eacute;ponse http, le nombre d&rsquo;octets transf&eacute;r&eacute;s, l&rsquo;adresse du site internet par lequel l&rsquo;utilisateur est arriv&eacute;. Ces donn&eacute;es sont recueillies de mani&egrave;re totalement anonyme (nous collectons les donn&eacute;es mais nous ne les associons pas &agrave; une identit&eacute;) et nous permettent de proposer des offres plus pertinentes &agrave; nos utilisateurs.<br />&nbsp;</p>
                  <p><strong>2. Enregistrement de donn&eacute;es au moyen de cookies</strong></p>
                  <p>Un cookie est un petit fichier enregistr&eacute; sur l&rsquo;ordinateur. Il contient des informations sur la navigation effectu&eacute;e sur les pages de notre site. Il permet de faciliter l&rsquo;utilisation ult&eacute;rieure du site par la m&ecirc;me personne et de reprendre les pr&eacute;f&eacute;rences choisies par un utilisateur lors de la visite. Il vous est possible de limiter l&rsquo;usage de cookies en configurant votre navigateur, ceci limitant n&eacute;anmoins l&rsquo;utilisation de certains services que nous offrons sur notre site. Vous avez &eacute;galement la possibilit&eacute; d&rsquo;effacer les cookies manuellement.<br /><br />Google Analytics &nbsp;Nous utilisons Google Analytics, un service de la soci&eacute;t&eacute; Google Inc. (&laquo; Google &raquo;) pour comprendre comment les utilisateurs interagissent avec notre site. Google Analytics utilise des cookies. Les informations obtenues &agrave; l'aide des cookies sur vos habitudes d&rsquo;utilisation du site www.andromedeetpersee.fr (y compris votre adresse IP) sont transf&eacute;r&eacute;es &agrave; un serveur de Google o&ugrave; elles sont enregistr&eacute;es. &nbsp;Les conditions d'utilisation de Google Analytics, auxquelles Androm&egrave;de et Pers&eacute;e a adh&eacute;r&eacute;, interdisent la transmission &agrave; Google Analytics d'informations personnelles permettant d&rsquo;identifier un individu, y compris (sans s'y limiter) les noms, les adresses e-mail ou les informations bancaires. Google utilise les informations collect&eacute;es afin de conna&icirc;tre vos habitudes d&rsquo;utilisation de notre site internet ainsi que d&rsquo;autres services en rapport avec l&rsquo;utilisation de notre site internet. Il vous est possible de limiter l&rsquo;usage de cookies en configurant votre navigateur, ceci limitant n&eacute;anmoins l&rsquo;utilisation de certains services que nous offrons sur notre site. Les cookies peuvent &eacute;galement s&rsquo;effacer manuellement. Si vous ne voulez pas que votre navigateur utilise Google Analytics, vous pouvez installer le module compl&eacute;mentaire de navigateur pour la d&eacute;sactivation de Google Analytics : https://tools.google.com/dlpage/gaoptout<br /><br />En naviguant sur notre site internet vous acceptez que les donn&eacute;es vous concernant soient manipul&eacute;es par Google avec les finalit&eacute;s d&eacute;crites ci-dessus.<br /><br />Pour plus d&rsquo;informations sur l&rsquo;utilisation des cookies par Androm&egrave;de et Pers&eacute;e, consultez notre d&eacute;claration relative &agrave; l&rsquo;utilisation des cookies.<br />&nbsp;</p>
                  <p><strong>3. Transfert s&eacute;curis&eacute; de donn&eacute;es&nbsp;</strong></p>
                  <p>Notre site fait l'objet d'un syst&egrave;me de s&eacute;curisation. Nous avons adopt&eacute; le proc&eacute;d&eacute; de cryptage SSL (Secure Socket Layer) qui assure une protection contre la perte, la destruction, l&rsquo;acc&egrave;s, la modification ou la diffusion de vos donn&eacute;es par des tiers non autoris&eacute;s.<br />&nbsp;</p>
                  <p><strong>4. Vos droits</strong></p>
                  <p>Droits d&rsquo;acc&egrave;s et de rectification : Conform&eacute;ment &agrave; loi &laquo; informatique et libert&eacute;s &raquo; n&deg;78-17 du 6 janvier 1978 modifi&eacute;e, vous disposez d&rsquo;un droit d&rsquo;acc&egrave;s, de modification, de rectification et de suppression des donn&eacute;es qui vous concernent. Pour toute demande relative au traitement de vos donn&eacute;es personnelles ou pour exercer vos droits, nous vous invitons &agrave; nous &eacute;crire, en indiquant vos coordonn&eacute;es, &agrave; : Androm&egrave;de et Pers&eacute;e, 19 square d&rsquo;Artois 77186 Noisiel &ndash; contact@andromedeetpersee.com.</p>
                  <p>Droit d&rsquo;opposition : Vous pouvez, pour des motifs l&eacute;gitimes, vous opposer &agrave; tout moment, de mani&egrave;re s&eacute;lective ou globale, &agrave; l&rsquo;utilisation de vos donn&eacute;es personnelles &agrave; des fins publicitaires ou pour des &eacute;tudes. A cette fin, une simple notification &eacute;crite de votre demande est suffisante par email ou courrier &agrave; l&rsquo;adresse cit&eacute;e ci-dessus.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    );
  }
}
