/* Exercices générés au hasard. ch = index du chapitre (0 = chapitre 1). */
(() => {
const { R, pick, shuf, T, fr } = OUT;
const G = COURS.generes;
const eur = x => fr(x, 0) + " €";
const prenom = () => pick(["Léa", "Hugo", "Inès", "Yanis", "Camille", "Nathan", "Sarah", "Mehdi", "Chloé", "Lucas", "Manon", "Adam", "Jade", "Théo"]);
const societe = () => pick(["NovaSoft", "CloudLy", "Datalis", "WebForge", "Pixelia", "NetKeep", "Codexa", "Infralink", "ByteRun", "Secura"]);

/* Exercice de classement : on tire n éléments d'un tableau [situation, réponse]. */
const classer = (titre, niv, ch, consigne, pool, n, note = "", entetes = ["Situation", "Réponse"]) =>
  G.push({ titre, niv, ch, gen() { const sel = shuf(pool).slice(0, n); return { q: `<p>${consigne}</p><ol>${sel.map(x => `<li>${x[0]}</li>`).join("")}</ol>`, c: T(entetes, sel.map(x => [x[0], `<b>${x[1]}</b>`])) + (note ? `<p>${note}</p>` : "") }; } });

/* ================================================= CALCULS */
G.push({ titre: "Valeur ajoutée", niv: 1, ch: 4, gen() {
  const ca = R(40, 180) * 10000, lic = R(3, 12) * 5000, heb = R(2, 8) * 3000, st = R(0, 6) * 5000, sal = Math.round(ca * R(35, 55) / 100 / 1000) * 1000;
  const ci = lic + heb + st, va = ca - ci;
  return { q: `<p>L'ESN <b>${societe()}</b> présente les éléments suivants pour l'année :</p>${T(["Élément", "Montant"], [["Chiffre d'affaires", eur(ca)], ["Licences logicielles achetées", eur(lic)], ["Hébergement cloud", eur(heb)], ["Sous-traitance de développement", eur(st)], ["Salaires et cotisations", eur(sal)]])}<ol><li>Calculez la valeur ajoutée.</li><li>Calculez la part des salaires dans la valeur ajoutée. Que représente cette part ?</li></ol>`,
    c: `<ol><li>Consommations intermédiaires = ${eur(lic)} + ${eur(heb)} + ${eur(st)} = ${eur(ci)}. <b>VA = ${eur(ca)} − ${eur(ci)} = ${eur(va)}.</b></li><li>${eur(sal)} / ${eur(va)} × 100 ≈ <b>${fr(sal / va * 100, 1)} %</b>. C'est la part de la richesse créée qui rémunère le facteur travail (partage de la valeur ajoutée). Les salaires ne sont pas des consommations intermédiaires.</li></ol>` };
}});

G.push({ titre: "FRNG, BFR et trésorerie", niv: 2, ch: 12, gen() {
  const cp = R(15, 60) * 10, emp = R(5, 40) * 10, immo = R(15, 80) * 10, stk = R(0, 6) * 10, cli = R(10, 40) * 10, frs = R(5, 30) * 10;
  const frng = cp + emp - immo, bfr = stk + cli - frs, tn = frng - bfr;
  return { q: `<p>Bilan simplifié de <b>${societe()}</b> (en k€) : capitaux propres ${cp} ; emprunts à long terme ${emp} ; immobilisations ${immo} ; stocks ${stk} ; créances clients ${cli} ; dettes fournisseurs et sociales ${frs}.</p><ol><li>Calculez le FRNG, le BFR et la trésorerie nette.</li><li>Commentez la situation et proposez une solution.</li></ol>`,
    c: `<ol><li>FRNG = (${cp} + ${emp}) − ${immo} = <b>${frng} k€</b>. BFR = ${stk} + ${cli} − ${frs} = <b>${bfr} k€</b>. Trésorerie nette = FRNG − BFR = <b>${tn} k€</b>.</li><li>${frng < 0 ? "Le FRNG est négatif : les immobilisations ne sont pas entièrement financées par des ressources stables, situation dangereuse. Il faut renforcer les ressources stables (augmentation de capital, emprunt long terme). " : "Le FRNG est positif : les ressources stables financent les immobilisations. "}${tn < 0 ? `La trésorerie est <b>négative</b> : l'entreprise dépend du découvert. Leviers : réduire le BFR (raccourcir les délais clients, affacturage, négocier des délais fournisseurs) ou augmenter le FRNG.` : `La trésorerie est <b>positive</b> : l'exploitation est financée. Attention à ne pas garder trop de trésorerie inutilisée (elle pourrait financer des investissements).`}</li></ol>` };
}});

G.push({ titre: "Calcul de l'impôt sur les sociétés", niv: 1, ch: 9, gen() {
  const ben = R(2, 40) * 5000, t1 = Math.min(ben, 42500), t2 = Math.max(0, ben - 42500), is = t1 * 0.15 + t2 * 0.25;
  return { q: `<p>La SAS <b>${societe()}</b> (PME éligible au taux réduit) réalise un bénéfice imposable de <b>${eur(ben)}</b>. Le taux réduit de 15 % s'applique jusqu'à 42 500 €, le taux normal de 25 % au-delà.</p><ol><li>Calculez l'impôt sur les sociétés.</li><li>Quel serait l'intérêt de l'IS plutôt que l'IR pour l'associé unique ?</li></ol>`,
    c: `<ol><li>${t2 > 0 ? `42 500 × 15 % = ${eur(42500 * 0.15)} ; (${eur(ben)} − 42 500 €) × 25 % = ${eur(t2 * 0.25)}. ` : `${eur(ben)} × 15 % = ${eur(t1 * 0.15)}. `}<b>IS = ${eur(is)}</b>, soit un taux moyen de ${fr(is / ben * 100, 1)} %.</li><li>À l'IS, seul le bénéfice est taxé à un taux proportionnel ; l'associé n'est imposé que sur ce qu'il se verse (rémunération ou dividendes). À l'IR, tout le bénéfice est ajouté à ses revenus et taxé au barème progressif (jusqu'à 45 %) : l'IS devient intéressant quand le bénéfice augmente et qu'on souhaite en réinvestir une partie.</li></ol>` };
}});

G.push({ titre: "Productivité et gains de productivité", niv: 1, ch: 8, gen() {
  const n = R(3, 8), h1 = n * R(140, 160), q1 = Math.round(h1 * R(15, 25) / 10), h2 = n * R(140, 160), q2 = Math.round(h2 * R(20, 32) / 10);
  const p1 = q1 / h1, p2 = q2 / h2, ev = (p2 - p1) / p1 * 100;
  return { q: `<p>Le service support de <b>${societe()}</b> compte ${n} techniciens. En mars, ils ont traité <b>${q1} tickets en ${h1} heures</b>. En avril, après l'installation d'un outil d'automatisation et d'une base de connaissances, ils ont traité <b>${q2} tickets en ${h2} heures</b>.</p><ol><li>Calculez la productivité horaire pour chaque mois et son évolution en %.</li><li>De quel type d'investissement s'agit-il ? Quels effets possibles sur l'emploi ?</li></ol>`,
    c: `<ol><li>Mars : ${q1} / ${h1} ≈ <b>${fr(p1, 2)}</b> ticket/heure. Avril : ${q2} / ${h2} ≈ <b>${fr(p2, 2)}</b> ticket/heure. Évolution : (${fr(p2, 2)} − ${fr(p1, 2)}) / ${fr(p1, 2)} × 100 ≈ <b>${ev >= 0 ? "+" : ""}${fr(ev, 1)} %</b>.</li><li>Un <b>investissement de productivité</b> (substitution partielle du capital au travail). Effets : soit produire plus avec les mêmes effectifs (absorber la croissance), soit réduire les besoins en personnel ; les tâches répétitives disparaissent et les compétences demandées évoluent (destruction créatrice).</li></ol>` };
}});

G.push({ titre: "Taux de chômage et taux d'emploi", niv: 1, ch: 18, gen() {
  const pop15 = R(30, 60) * 100000, actifs = Math.round(pop15 * R(55, 72) / 100 / 1000) * 1000, ch = Math.round(actifs * R(5, 12) / 100 / 100) * 100, occ = actifs - ch;
  return { q: `<p>Dans une région, on compte <b>${fr(pop15, 0)}</b> personnes de 15 à 64 ans, dont <b>${fr(actifs, 0)}</b> actifs. Parmi eux, <b>${fr(ch, 0)}</b> sont au chômage au sens du BIT.</p><ol><li>Calculez le taux de chômage et le taux d'emploi.</li><li>Rappelez les 3 conditions pour être chômeur au sens du BIT.</li></ol>`,
    c: `<ol><li>Taux de chômage = ${fr(ch, 0)} / ${fr(actifs, 0)} × 100 = <b>${fr(ch / actifs * 100, 1)} %</b>. Actifs occupés = ${fr(occ, 0)}. Taux d'emploi = ${fr(occ, 0)} / ${fr(pop15, 0)} × 100 = <b>${fr(occ / pop15 * 100, 1)} %</b>.</li><li>Être sans emploi (pas une heure travaillée dans la semaine de référence), disponible sous 15 jours, avoir cherché activement un emploi dans le mois précédent.</li></ol>` };
}});

G.push({ titre: "Efficacité et efficience", niv: 2, ch: 3, gen() {
  const obj = R(20, 50) * 10, res = Math.round(obj * R(80, 125) / 100), bud = R(20, 60) * 1000, cout = Math.round(bud * R(80, 140) / 100 / 100) * 100;
  const eff = res / obj * 100;
  return { q: `<p>L'équipe commerciale de <b>${societe()}</b> devait signer <b>${obj}</b> nouveaux abonnements avec un budget de <b>${eur(bud)}</b>. Elle en a signé <b>${res}</b> pour un coût réel de <b>${eur(cout)}</b>.</p><p>Analysez l'efficacité et l'efficience de l'équipe.</p>`,
    c: `<p><b>Efficacité</b> (résultat / objectif) : ${res} / ${obj} = ${fr(eff, 0)} % : ${eff >= 100 ? "objectif atteint, l'équipe est efficace" : "objectif non atteint, l'équipe n'est pas pleinement efficace"}.</p><p><b>Efficience</b> (résultat / moyens) : coût prévu par abonnement ${eur(bud / obj)}, coût réel ${eur(cout / res)}. ${cout / res <= bud / obj ? "Le coût par abonnement est inférieur ou égal au prévu : l'équipe est efficiente." : "Le coût par abonnement dépasse le prévu : l'équipe est peu efficiente."}</p><p>On peut aussi s'interroger sur la <b>pertinence</b> des moyens choisis (canaux de prospection, outils).</p>` };
}});

G.push({ titre: "Indemnité de fin de CDD", niv: 1, ch: 19, gen() {
  const mois = R(3, 12), sal = R(19, 30) * 100, cp = Math.round(sal * mois * 0.1);
  return { q: `<p>${prenom()} a été embauché(e) en CDD de <b>${mois} mois</b> par <b>${societe()}</b> pour faire face à un accroissement temporaire d'activité, avec un salaire brut mensuel de <b>${eur(sal)}</b>. Le contrat arrive à son terme et n'est pas suivi d'un CDI.</p><ol><li>Calculez l'indemnité de fin de contrat (prime de précarité de 10 %).</li><li>L'employeur aurait-il pu rompre le contrat avant son terme ?</li></ol>`,
    c: `<ol><li>Rémunération totale brute : ${eur(sal)} × ${mois} = ${eur(sal * mois)}. <b>Indemnité = 10 % = ${eur(cp)}</b> (s'y ajoute l'indemnité compensatrice de congés payés si les congés n'ont pas été pris).</li><li>Non, sauf cas limitatifs : <b>faute grave</b>, <b>force majeure</b>, <b>accord des deux parties</b>, inaptitude constatée par le médecin du travail. Le salarié peut aussi rompre s'il justifie d'une embauche en CDI.</li></ol>` };
}});

G.push({ titre: "Achat en ligne et rétractation", niv: 2, ch: 16, gen() {
  const d0 = new Date(2026, R(0, 10), R(1, 20)), liv = R(2, 6), ret = R(8, 20), info = Math.random() < 0.75;
  const add = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const fd = d => d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const recu = add(d0, liv), demande = add(recu, ret), fin = add(recu, 14), ok = ret <= 14 || !info;
  return { q: `<p>${prenom()} commande un casque gaming sur le site d'une boutique en ligne le <b>${fd(d0)}</b>. Il est livré le <b>${fd(recu)}</b>. ${info ? "Les conditions générales mentionnent le droit de rétractation." : "Le site ne mentionne nulle part le droit de rétractation."} Le <b>${fd(demande)}</b>, l'acheteur veut renvoyer le casque, qui ne lui plaît pas.</p><ol><li>Peut-il exercer son droit de rétractation ?</li><li>Qui paie les frais de retour et dans quel délai est-il remboursé ?</li></ol>`,
    c: `<ol><li>Le consommateur dispose de <b>14 jours</b> à compter de la <b>réception</b> du bien pour se rétracter, sans motif (Code de la consommation). ${info ? `Le délai expire le ${fd(fin)}. La demande arrive ${ret} jours après la réception : ${ret <= 14 ? "<b>elle est dans les délais</b>" : "<b>elle est hors délai</b> : le vendeur peut refuser"}.` : `Le vendeur n'a pas informé de ce droit : le délai est <b>prolongé de 12 mois</b>. <b>La rétractation est possible.</b>`}</li><li>${ok ? "Les frais de retour sont à la charge du consommateur s'il en a été informé (sinon, le vendeur les supporte). Le vendeur rembourse toutes les sommes versées, y compris les frais de livraison standard, dans les <b>14 jours</b> suivant la rétractation (il peut attendre la récupération du bien)." : "Sans droit de rétractation, il reste les garanties (conformité, vices cachés) si le casque est défectueux ; un simple changement d'avis ne suffit pas."}</li></ol>` };
}});

/* ================================================= CAS DE DROIT (syllogismes) */
const casDroit = [
() => { const p = prenom(), s = societe(), cat = pick([["technicien", 3], ["employé", 2], ["cadre", 4]]), dur = cat[1] + R(1, 2);
  return { t: "Période d'essai", q: `<p>${p} est embauché(e) en CDI comme <b>${cat[0]}</b> chez ${s}. Le contrat prévoit une période d'essai de <b>${dur} mois</b>, sans renouvellement, et la convention collective ne prévoit rien de plus. Au bout de ${dur} mois moins une semaine, l'employeur met fin à l'essai.</p><p>La rupture est-elle valable ? Raisonnez avec la méthode du syllogisme.</p>`,
    c: `<p><b>Problème :</b> une période d'essai peut-elle dépasser la durée maximale prévue par la loi ?</p><p><b>Règle :</b> la période d'essai d'un CDI ne peut dépasser <b>2 mois</b> pour les ouvriers et employés, <b>3 mois</b> pour les agents de maîtrise et techniciens, <b>4 mois</b> pour les cadres (art. L. 1221-19 C. trav.), sauf renouvellement prévu par accord de branche et par le contrat.</p><p><b>Application :</b> ${p} est ${cat[0]} : maximum ${cat[1]} mois. Le contrat prévoit ${dur} mois, au-delà du maximum légal. La rupture intervient après ${cat[1]} mois : la période d'essai était déjà terminée.</p><p><b>Conclusion :</b> la clause est illicite au-delà de ${cat[1]} mois ; la rupture s'analyse en un <b>licenciement sans cause réelle et sérieuse</b> (et irrégulier) : ${p} peut obtenir des indemnités devant le conseil de prud'hommes.</p>` }; },
() => { const p = prenom(), s = societe(), mot = pick(["que le logiciel était déjà utilisé par plus de 500 clients, alors qu'il n'en avait que 12", "que les données étaient hébergées en France, alors qu'elles l'étaient hors de l'Union européenne", "que la solution était certifiée ISO 27001, ce qui était faux"]);
  return { t: "Vice du consentement", q: `<p>La société de ${p} a signé un contrat d'abonnement de 3 ans avec l'éditeur ${s}. Avant la signature, le commercial de ${s} a affirmé ${mot}. ${p} l'a découvert après la signature et affirme qu'il n'aurait jamais signé sinon.</p><p>Que peut faire la société ? Syllogisme.</p>`,
    c: `<p><b>Problème :</b> un contrat obtenu grâce à un mensonge du cocontractant est-il valable ?</p><p><b>Règle :</b> le consentement doit être libre et éclairé (art. 1128 C. civ.). Le <b>dol</b> est le fait pour un contractant d'obtenir le consentement de l'autre par des manœuvres ou des mensonges, ou par la dissimulation intentionnelle d'une information déterminante (art. 1137). Il est sanctionné par la <b>nullité relative</b> (art. 1131) et peut ouvrir droit à des dommages-intérêts.</p><p><b>Application :</b> le commercial a affirmé ${mot} ; il s'agit d'un mensonge intentionnel sur un élément <b>déterminant</b> du consentement.</p><p><b>Conclusion :</b> la société peut demander l'<b>annulation</b> du contrat pour dol (restitution des sommes versées) et des dommages-intérêts.</p>` }; },
() => { const p = prenom(), s = societe(), ans = R(1, 5), zone = pick(["toute la France", "toute l'Europe", "la région Île-de-France", "un rayon de 30 km autour de Lyon"]), cp = Math.random() < 0.5;
  const ok = cp && ans <= 2 && zone !== "toute l'Europe" && zone !== "toute la France";
  return { t: "Clause de non-concurrence", q: `<p>${p}, administrateur réseau chez ${s}, démissionne. Son contrat prévoit qu'il ne pourra pas travailler pour un concurrent pendant <b>${ans} an${ans > 1 ? "s" : ""}</b> sur <b>${zone}</b>${cp ? ", moyennant une indemnité mensuelle égale à 40 % de son ancien salaire" : ", sans aucune contrepartie financière"}.</p><p>La clause est-elle valable ? Syllogisme.</p>`,
    c: `<p><b>Problème :</b> à quelles conditions une clause de non-concurrence est-elle valable ?</p><p><b>Règle :</b> selon la Cour de cassation (Cass. soc., 10 juillet 2002), la clause doit, cumulativement : être indispensable à la protection des intérêts légitimes de l'entreprise, être limitée dans le <b>temps</b> et dans l'<b>espace</b>, tenir compte des spécificités de l'emploi du salarié, et comporter une <b>contrepartie financière</b>.</p><p><b>Application :</b> ${cp ? "une contrepartie est prévue" : "<b>aucune contrepartie</b> n'est prévue, ce qui suffit à rendre la clause nulle"} ; durée de ${ans} an${ans > 1 ? "s" : ""} ${ans <= 2 ? "raisonnable" : "longue, qui peut être jugée excessive"} ; zone « ${zone} » ${zone.includes("rayon") || zone.includes("région") ? "limitée" : "très large, qui empêche le salarié de retrouver un emploi dans son métier"}. L'intérêt légitime doit être démontré (accès à des informations sensibles, clientèle).</p><p><b>Conclusion :</b> ${ok ? "la clause semble <b>valable</b> si l'entreprise justifie d'un intérêt légitime : " + p + " doit la respecter et percevra la contrepartie." : "la clause est <b>nulle</b> (ou peut être réduite par le juge) : " + p + " peut travailler pour un concurrent."}</p>` }; },
() => { const p = prenom(), s = societe(), t = pick([["son salaire passe de 2 400 € à 2 200 € par mois", true, "la rémunération"], ["ses horaires passent de 9 h-17 h à 8 h 30-16 h 30", false, "les horaires (dans la même journée)"], ["son lieu de travail est déplacé de Paris 12e à Paris 15e", false, "le lieu de travail dans le même secteur géographique"], ["son poste de technicien devient un poste d'assistant commercial", true, "la qualification"], ["son temps de travail passe de 35 h à 28 h par semaine", true, "la durée du travail"], ["son lieu de travail est déplacé de Lille à Marseille, sans clause de mobilité", true, "le lieu de travail hors du secteur géographique"]]);
  return { t: "Modification du contrat de travail", q: `<p>${s} informe ${p} que ${t[0]}. ${p} refuse. L'employeur estime que ce refus est une faute.</p><p>Analysez la situation (syllogisme).</p>`,
    c: `<p><b>Problème :</b> l'employeur peut-il imposer ce changement au salarié ?</p><p><b>Règle :</b> le contrat a force obligatoire (art. 1103 C. civ.). La <b>modification d'un élément essentiel</b> du contrat (rémunération, qualification, durée du travail, lieu de travail hors du secteur géographique) nécessite l'<b>accord du salarié</b>. En revanche, un simple <b>changement des conditions de travail</b> relève du <b>pouvoir de direction</b> de l'employeur et s'impose au salarié.</p><p><b>Application :</b> le changement porte sur ${t[2]} : ${t[1] ? "c'est une <b>modification du contrat</b>" : "c'est un <b>changement des conditions de travail</b>"}.</p><p><b>Conclusion :</b> ${t[1] ? `${p} peut refuser sans commettre de faute ; l'employeur doit renoncer ou engager une procédure de licenciement fondée sur une cause réelle et sérieuse (souvent économique).` : `l'employeur peut l'imposer ; le refus de ${p} peut être une faute justifiant une sanction, voire un licenciement (sauf atteinte excessive à sa vie personnelle et familiale).`}</p>` }; },
() => { const s = societe(), j = R(5, 25), pen = R(1, 5) * 100, fm = pick([[false, "une panne de son principal serveur de développement"], [false, "la démission de deux de ses développeurs"], [true, "une inondation exceptionnelle et imprévisible qui a détruit ses locaux et son matériel"]]);
  return { t: "Retard dans un contrat de prestation", q: `<p>L'agence ${s} devait livrer une application mobile le 1er juin. Le contrat prévoit une pénalité de <b>${pen} € par jour de retard</b>. L'application est livrée avec <b>${j} jours</b> de retard. ${s} invoque ${fm[1]}.</p><p>Le client peut-il obtenir les pénalités ? Syllogisme.</p>`,
    c: `<p><b>Problème :</b> le prestataire peut-il s'exonérer de sa responsabilité contractuelle en invoquant cet événement ?</p><p><b>Règle :</b> le contrat a force obligatoire (art. 1103 C. civ.) ; en cas d'inexécution, le créancier peut obtenir réparation (art. 1217, 1231-1). Une <b>clause pénale</b> fixe à l'avance l'indemnité (art. 1231-5). Le débiteur est exonéré en cas de <b>force majeure</b> : événement échappant à son contrôle, imprévisible lors de la conclusion du contrat et irrésistible (art. 1218).</p><p><b>Application :</b> la livraison à date est une obligation de résultat, non respectée (${j} jours de retard). ${fm[0] ? "L'inondation exceptionnelle est extérieure, imprévisible et irrésistible : elle peut constituer un cas de force majeure." : "Cet événement relève de l'organisation interne du prestataire : il n'est ni extérieur ni irrésistible, ce n'est pas un cas de force majeure."}</p><p><b>Conclusion :</b> ${fm[0] ? `${s} est probablement exonérée ; le client ne peut pas exiger les pénalités pour la période d'empêchement.` : `${s} doit payer la pénalité : ${j} × ${pen} € = <b>${eur(j * pen)}</b> (le juge peut la modérer si elle est manifestement excessive ou dérisoire).`}</p>` }; },
() => { const p = prenom(), s = societe(), perso = Math.random() < 0.5;
  return { t: "Contrôle de la messagerie", q: `<p>Le directeur de ${s} soupçonne ${p} de transmettre des fichiers clients à un concurrent. En son absence, il ouvre sur son poste ${perso ? "un dossier intitulé « PERSONNEL – ne pas ouvrir »" : "des e-mails rangés dans la boîte de réception professionnelle, sans mention particulière"} et y trouve des preuves. Peut-il les utiliser pour licencier ${p} ?</p>`,
    c: `<p><b>Problème :</b> l'employeur peut-il consulter les fichiers et messages présents sur le poste professionnel d'un salarié, hors de sa présence ?</p><p><b>Règle :</b> le salarié a droit au respect de sa vie privée au travail (art. 9 C. civ. ; arrêt Nikon, Cass. soc. 2 oct. 2001). Les fichiers et messages présents sur l'outil professionnel sont <b>présumés professionnels</b> : l'employeur peut les ouvrir hors de la présence du salarié, <b>sauf</b> s'ils sont identifiés comme <b>personnels</b> ; dans ce cas, il ne peut les ouvrir qu'en présence du salarié ou celui-ci dûment appelé (sauf risque ou événement particulier).</p><p><b>Application :</b> ${perso ? `le dossier était clairement identifié comme personnel et ${p} était absent(e) et non appelé(e).` : "les e-mails n'étaient pas identifiés comme personnels : ils sont présumés professionnels."}</p><p><b>Conclusion :</b> ${perso ? "la preuve a été obtenue de façon <b>illicite</b> et risque d'être écartée ; l'employeur aurait dû convoquer le salarié pour ouvrir le dossier devant lui." : "l'employeur pouvait les consulter ; la preuve est <b>recevable</b> et peut fonder un licenciement (probablement pour faute grave), à condition de respecter la procédure."}</p>` }; },
() => { const s = societe(), c2 = pick(["Pixelia", "WebForge", "Codexa"]), acte = pick([["publie de faux avis négatifs sur les produits de", "dénigrement"], ["reprend le logo, les couleurs et un nom presque identique à celui de", "imitation (risque de confusion)"], ["débauche en un mois la moitié de l'équipe de développement de", "désorganisation"]]);
  return { t: "Concurrence déloyale", q: `<p>L'entreprise ${s} ${acte[0]} son concurrent ${c2}. ${c2} constate une baisse de 20 % de ses ventes sur le trimestre.</p><p>${c2} peut-elle obtenir réparation ? Syllogisme.</p>`,
    c: `<p><b>Problème :</b> une entreprise victime d'agissements déloyaux d'un concurrent peut-elle obtenir réparation ?</p><p><b>Règle :</b> l'action en <b>concurrence déloyale</b> repose sur la responsabilité civile extracontractuelle (art. 1240 C. civ.) : il faut une <b>faute</b> (dénigrement, imitation créant une confusion, désorganisation, parasitisme), un <b>dommage</b> et un <b>lien de causalité</b>.</p><p><b>Application :</b> la faute est un acte de <b>${acte[1]}</b>. Le dommage est la baisse de 20 % des ventes et l'atteinte à l'image. ${c2} devra prouver que cette baisse vient bien de ces agissements et non d'une évolution du marché.</p><p><b>Conclusion :</b> si le lien de causalité est établi, ${c2} obtiendra des <b>dommages-intérêts</b> et la cessation des agissements.</p>` }; },
];
G.push({ titre: "Cas pratique de droit", niv: 3, ch: null, ths: [1, 2, 4, 5], gen() { const x = pick(casDroit)(); return { q: `<p class="exch">${x.t}</p>${x.q}`, c: x.c }; } });
G.push({ titre: "Cas pratique de droit", niv: 3, ch: null, ths: [1, 2, 4, 5], gen() { const x = pick(casDroit)(); return { q: `<p class="exch">${x.t}</p>${x.q}`, c: x.c }; } });

/* ================================================= CLASSEMENTS */
classer("Identifier le vice ou le défaut de validité", 2, 2, "Pour chaque situation, indiquez la condition de validité du contrat qui n'est pas respectée (et le vice précis s'il s'agit du consentement).", [
  ["Un vendeur affirme faussement qu'un ordinateur d'occasion n'a jamais été réparé.", "consentement : dol"],
  ["Un acheteur croit acheter un tableau original, c'est une copie, sans que le vendeur l'ait trompé.", "consentement : erreur sur une qualité essentielle"],
  ["Un fournisseur menace de révéler des informations compromettantes si son client ne signe pas.", "consentement : violence"],
  ["Un adolescent de 15 ans achète une moto à crédit.", "capacité (mineur)"],
  ["Un contrat porte sur la vente de données personnelles volées.", "contenu illicite"],
  ["Un client en grande difficulté accepte un prix excessif imposé par son seul fournisseur qui exploite cette dépendance.", "consentement : violence (abus de dépendance)"],
  ["Un salarié signe un contrat au nom de sa société sans avoir le pouvoir de l'engager.", "capacité / pouvoir de représentation"],
  ["Un éditeur cache volontairement qu'une faille critique de son logiciel n'est pas corrigée.", "consentement : dol par réticence"],
], 4, "Sanction : la <b>nullité</b>, relative pour les vices du consentement et l'incapacité (seule la partie protégée agit), absolue pour un contenu illicite.");

classer("Contractuelle ou délictuelle ?", 2, 10, "Pour chaque situation, indiquez le régime de responsabilité civile applicable.", [
  ["Un hébergeur perd les données de son client à cause d'une erreur de sauvegarde.", "contractuelle"],
  ["Un câble mal fixé dans un salon professionnel fait chuter un visiteur.", "délictuelle (fait des choses)"],
  ["Un livreur salarié renverse un piéton pendant sa tournée.", "délictuelle (fait d'autrui : l'employeur répond de son salarié)"],
  ["Une batterie de smartphone explose et blesse son utilisateur.", "produits défectueux (art. 1245)"],
  ["Un prestataire livre un site web avec 3 mois de retard.", "contractuelle"],
  ["Une entreprise dénigre un concurrent sur les réseaux sociaux.", "délictuelle (concurrence déloyale, art. 1240)"],
  ["Un technicien en intervention casse le serveur du client.", "contractuelle"],
], 4, "Règle du <b>non-cumul</b> : s'il existe un contrat entre l'auteur et la victime et que le dommage résulte de son inexécution, seule la responsabilité contractuelle s'applique.");

classer("Pratiques de concurrence", 2, 6, "Qualifiez chaque pratique.", [
  ["Trois opérateurs se mettent d'accord pour ne pas baisser leurs prix.", "entente horizontale"],
  ["Un fabricant impose à ses distributeurs un prix de revente minimum.", "entente verticale"],
  ["Un acteur qui détient 85 % du marché oblige ses clients à acheter aussi son service de maintenance.", "abus de position dominante (vente liée)"],
  ["Une entreprise vend des produits en dessous de son prix d'achat hors période de soldes.", "revente à perte"],
  ["Une marque de vêtements utilise le nom d'un parfum célèbre pour profiter de sa notoriété.", "parasitisme"],
  ["Un concurrent affirme publiquement que les produits d'un autre sont dangereux, sans preuve.", "dénigrement"],
  ["Un grand client cesse du jour au lendemain une relation de 10 ans avec un sous-traitant.", "rupture brutale d'une relation commerciale établie"],
  ["Une start-up copie le design et le nom d'une application concurrente.", "imitation / confusion (voire contrefaçon)"],
], 4, "Ententes et abus de position dominante : Autorité de la concurrence (art. L. 420-1 et L. 420-2 C. com.). Concurrence déloyale : action en responsabilité devant le juge (art. 1240 C. civ.).");

classer("Classer dans le PESTEL", 1, 7, "Classez chaque élément de l'environnement d'une ESN dans le PESTEL et dites s'il est plutôt une opportunité (O) ou une menace (M).", [
  ["Hausse des taux d'intérêt de la BCE", "Économique (M : investissements plus chers)"],
  ["Entrée en application du règlement européen sur l'IA", "Légal (M : contraintes, ou O : besoin de conseil)"],
  ["Généralisation du télétravail", "Socioculturel (O : besoin d'outils collaboratifs et de sécurité)"],
  ["Explosion des cyberattaques contre les PME", "Technologique (O pour une ESN qui vend de la sécurité)"],
  ["Plan public de soutien à la souveraineté numérique", "Politique (O)"],
  ["Pression pour réduire l'empreinte carbone du numérique", "Écologique (M : coûts, ou O : offre « green IT »)"],
  ["Pénurie de développeurs qualifiés", "Socioculturel / économique (M)"],
  ["Directive NIS2 qui renforce les obligations de cybersécurité", "Légal (O : nouveaux besoins clients)"],
  ["Inflation et hausse du coût de l'énergie", "Économique (M)"],
], 5, "Un même élément peut être une opportunité ou une menace selon l'entreprise : justifie toujours.");

classer("Reconnaître la stratégie", 2, 26, "Identifiez la stratégie mise en œuvre dans chaque situation.", [
  ["Un hébergeur propose les serveurs les moins chers du marché grâce à des data centers standardisés.", "domination par les coûts"],
  ["Un éditeur vend plus cher un logiciel réputé pour sa sécurité et son support 24/7.", "différenciation"],
  ["Une PME ne développe que des logiciels pour les cabinets d'orthophonie.", "focalisation (niche)"],
  ["Un opérateur télécom se lance dans la banque en ligne.", "diversification"],
  ["Un fabricant de PC rachète son fournisseur de cartes mères.", "intégration verticale en amont"],
  ["Une ESN rachète une start-up de cybersécurité.", "croissance externe (absorption) et diversification liée"],
  ["Une start-up ouvre une filiale commerciale en Espagne.", "internationalisation par implantation directe"],
  ["Deux éditeurs concurrents développent ensemble un standard commun.", "alliance (croissance conjointe)"],
  ["Une entreprise confie sa paie et son support informatique à des prestataires.", "externalisation (recentrage sur le cœur de métier)"],
  ["Un groupe vend ses activités secondaires pour se concentrer sur le cloud.", "spécialisation (recentrage)"],
], 5);

classer("Places de marché et modèles économiques", 1, 13, "Pour chaque exemple, indiquez le type de place de marché (B2C, C2C, B2B, G2C) ou le modèle de tarification.", [
  ["Leboncoin entre particuliers", "C2C"],
  ["impots.gouv.fr", "G2C"],
  ["Une plateforme où des entreprises achètent du matériel réseau à des grossistes", "B2B"],
  ["Amazon qui vend ses propres produits", "B2C"],
  ["Une appli de musique gratuite avec publicité et version premium sans pub", "freemium"],
  ["Un jeu gratuit qui vend des skins", "free to play"],
  ["Des billets de train dont le prix monte quand le train se remplit", "yield management"],
  ["Un logiciel de comptabilité payé chaque mois par utilisateur", "abonnement (SaaS)"],
  ["Un réseau social gratuit financé par la publicité ciblée", "gratuité financée par les données et la publicité (marché biface)"],
], 5);

classer("Droits RGPD", 1, 15, "Quel droit la personne exerce-t-elle ?", [
  ["Un client demande la copie de toutes les données qu'une boutique détient sur lui.", "droit d'accès"],
  ["Une cliente veut que son ancienne adresse soit corrigée.", "droit de rectification"],
  ["Un internaute demande la suppression de son compte et de ses données.", "droit à l'effacement"],
  ["Un client veut récupérer son historique dans un format réutilisable pour changer d'opérateur.", "droit à la portabilité"],
  ["Une personne refuse de recevoir de la prospection commerciale.", "droit d'opposition"],
  ["Une personne demande à un moteur de recherche de ne plus afficher un vieil article associé à son nom.", "droit au déréférencement"],
  ["Une association de victimes agit en justice après une fuite de données.", "action de groupe"],
], 4, "Le responsable de traitement doit répondre en principe dans un délai d'<b>un mois</b>.");

classer("Mécanismes de coordination (Mintzberg)", 1, 11, "Identifiez le mécanisme de coordination principal.", [
  ["Deux développeurs se mettent d'accord à l'oral sur une fonction.", "ajustement mutuel"],
  ["Le responsable du support répartit chaque matin les tickets.", "supervision directe"],
  ["Les techniciens suivent une procédure écrite pour créer un compte utilisateur.", "standardisation des procédés"],
  ["Chaque technicien doit résoudre 90 % des tickets en moins de 4 heures.", "standardisation des résultats"],
  ["L'entreprise n'embauche que des administrateurs certifiés.", "standardisation des qualifications"],
  ["Les valeurs de l'entreprise (« le client d'abord ») guident les comportements.", "standardisation des normes"],
], 4);

classer("Herzberg : hygiène ou motivation ?", 1, 23, "Classez chaque élément : facteur d'hygiène ou facteur moteur (Herzberg).", [
  ["le salaire", "facteur d'hygiène"],
  ["les conditions matérielles (bureau, matériel)", "facteur d'hygiène"],
  ["la reconnaissance du travail accompli", "facteur moteur"],
  ["les relations avec les collègues", "facteur d'hygiène"],
  ["la possibilité de prendre des responsabilités", "facteur moteur"],
  ["l'intérêt du travail lui-même", "facteur moteur"],
  ["la sécurité de l'emploi", "facteur d'hygiène"],
  ["les perspectives de promotion", "facteur moteur"],
  ["la politique et l'administration de l'entreprise", "facteur d'hygiène"],
], 5, "Les facteurs d'hygiène évitent l'insatisfaction ; seuls les facteurs moteurs créent une vraie motivation.");

classer("Modification du contrat ou des conditions de travail ?", 2, 20, "Pour chaque décision de l'employeur, dites s'il s'agit d'une modification du contrat (accord du salarié nécessaire) ou d'un changement des conditions de travail (imposable).", [
  ["Baisse de la rémunération fixe", "modification du contrat"],
  ["Nouvel outil de ticketing à utiliser", "changement des conditions de travail"],
  ["Passage d'un temps plein à un temps partiel", "modification du contrat"],
  ["Déménagement du bureau dans la même ville", "changement des conditions de travail"],
  ["Passage d'un horaire de jour à un horaire de nuit", "modification du contrat"],
  ["Nouvelles tâches correspondant à la qualification du salarié", "changement des conditions de travail"],
  ["Rétrogradation de cadre à technicien", "modification du contrat"],
  ["Mutation dans une autre région avec une clause de mobilité valable", "changement des conditions de travail (application de la clause)"],
], 4);

classer("Choisir un mode de financement", 2, 12, "Proposez le mode de financement le plus adapté à chaque besoin.", [
  ["Un décalage de trésorerie de 10 jours en fin de mois", "découvert bancaire"],
  ["Des factures clients payées à 60 jours, besoin de liquidités tout de suite", "affacturage (ou escompte)"],
  ["Une flotte de véhicules à renouveler tous les 3 ans", "crédit-bail (location avec option d'achat)"],
  ["Une start-up déficitaire qui veut accélérer sa croissance", "augmentation de capital (business angels, capital-risque)"],
  ["Une PME rentable avec de grosses réserves qui achète des serveurs", "autofinancement"],
  ["Un nouveau bâtiment pour une entreprise qui ne veut pas ouvrir son capital", "emprunt bancaire à long terme"],
  ["Un projet innovant de R&D d'une PME", "prêt d'innovation ou subvention Bpifrance, crédit d'impôt recherche"],
], 4);

classer("Identifier la structure juridique", 1, 9, "Quelle forme juridique correspond à chaque situation ?", [
  ["Un développeur freelance seul, sans capital, avec des formalités simplifiées", "entreprise individuelle (micro-entreprise)"],
  ["Une société à associé unique dirigée par un président assimilé salarié", "SASU"],
  ["Une société de 2 à 100 associés dirigée par un gérant", "SARL"],
  ["Une société cotée en Bourse avec un conseil d'administration", "SA"],
  ["Une entreprise dont les salariés détiennent la majorité du capital, une personne = une voix", "SCOP"],
  ["Une société unipersonnelle dont le gérant associé unique est travailleur non salarié", "EURL"],
], 4);

/* ================================================= DÉVELOPPEMENT STRUCTURÉ */
const sujetsDS = [
  ["Le numérique renforce-t-il la concurrence entre les entreprises ?", "effets de réseau, plateformes, barrières à l'entrée plus faibles, comparateurs, GAFAM, DMA", "I. Le numérique intensifie la concurrence (baisse des barrières à l'entrée, transparence des prix, nouveaux entrants, ubérisation). II. Mais il favorise aussi la concentration (effets de réseau, « winner takes all », géants qui rachètent les start-up), d'où une régulation spécifique (DMA, Autorité de la concurrence)."],
  ["L'entreprise peut-elle surveiller librement ses salariés grâce aux outils numériques ?", "pouvoir de direction, vie privée (art. 9 C. civ.), art. L. 1121-1 et L. 1222-4 C. trav., RGPD, CSE, arrêt Nikon", "I. L'employeur dispose d'un pouvoir de contrôle légitime (pouvoir de direction, sécurité du SI, charte informatique, géolocalisation pour des finalités précises). II. Ce pouvoir est strictement encadré : vie privée, proportionnalité, information préalable, consultation du CSE, RGPD ; à défaut, preuves irrecevables et sanctions."],
  ["La croissance externe est-elle la meilleure voie de développement pour une entreprise du numérique ?", "fusion, absorption, prise de participation, synergies, taille critique, croissance interne, alliances", "I. La croissance externe offre rapidité, compétences, clients, taille critique et synergies (rachats de start-up par les géants). II. Mais elle est coûteuse et risquée (intégration, choc des cultures, contrôle des concentrations) ; croissance interne et croissance conjointe (alliances, partenariats) sont des alternatives."],
  ["Le contrat suffit-il à protéger l'entreprise dans ses relations avec ses partenaires ?", "force obligatoire, clauses (pénale, limitative, confidentialité, SLA), exécution forcée, responsabilité contractuelle, force majeure, imprévision", "I. Le contrat est un outil de sécurité (force obligatoire, clauses adaptées, sanctions de l'inexécution, responsabilité contractuelle). II. Mais sa protection a des limites (clauses encadrées ou écartées, force majeure, imprévision, insolvabilité du partenaire, coût et durée des procès) : il faut le compléter (assurance, garanties, choix des partenaires)."],
  ["La flexibilité du travail est-elle une solution pour la performance des entreprises ?", "CDD, intérim, télétravail, modulation, rupture conventionnelle, dualisme, motivation, GPEC", "I. La flexibilité permet de s'adapter à la conjoncture et d'améliorer la performance (ajustement des effectifs, organisation du temps de travail, télétravail). II. Mais elle a des limites (précarité, dualisme du marché du travail, démotivation, turn-over, perte de compétences) : la performance durable passe aussi par la fidélisation et le développement des compétences."],
  ["La RSE est-elle une contrainte ou une opportunité pour l'entreprise ?", "finalités sociale et sociétale, parties prenantes, externalités, reporting, image, numérique responsable", "I. La RSE peut être vécue comme une contrainte (coûts, obligations de reporting, investissements, contrôle des parties prenantes). II. C'est aussi une opportunité (image et e-réputation, attractivité pour les talents, fidélité des clients, innovation, anticipation de la réglementation)."],
  ["Le droit protège-t-il suffisamment les créations de l'entreprise du numérique ?", "droit d'auteur, logiciel, art. L. 113-9 CPI, brevet, marque, base de données, licences, contrefaçon", "I. Le droit offre un ensemble de protections (droit d'auteur automatique pour le logiciel, droits de l'employeur sur les logiciels des salariés, marque, droit du producteur de bases de données, action en contrefaçon). II. Mais ces protections ont des limites (logiciel non brevetable en tant que tel, idées non protégées, preuve de l'antériorité, contrefaçon internationale, coût des actions) : l'entreprise doit aussi se protéger par des contrats et des mesures techniques."],
];
G.push({ titre: "Préparer un développement structuré", niv: 3, ch: null, ths: [1, 2, 3, 4, 5, 6], gen() {
  const [qq, notions, plan] = pick(sujetsDS);
  return { q: `<p><b>Sujet :</b> « ${qq} »</p><p>Construisez l'introduction (accroche, définitions, problématique, annonce du plan) et un plan détaillé en deux parties, avec des exemples.</p>`,
    c: `<p><b>Notions à mobiliser :</b> ${notions}.</p><p><b>Plan possible :</b> ${plan}</p><p><b>Introduction :</b> 1) une <b>accroche</b> (un fait d'actualité, un chiffre, un exemple d'entreprise) ; 2) la <b>définition</b> des termes du sujet ; 3) la <b>problématique</b>, qui fait apparaître la tension du sujet ; 4) l'<b>annonce du plan</b>.</p><p><b>Conclusion :</b> réponse claire à la question, puis ouverture.</p>` };
}});
})();
