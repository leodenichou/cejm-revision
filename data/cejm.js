/* ==========================================================================
   E4 — CULTURE ÉCONOMIQUE, JURIDIQUE ET MANAGÉRIALE POUR L'INFORMATIQUE
   Les 27 chapitres du cours, rangés dans les 6 thèmes du programme.
   Les chapitres sont ajoutés par data/theme1-3.js et data/theme4-6.js.
   ========================================================================== */
const COURS = {
  sous: "BTS SIO · E4 CEJM · écrit 4 h · coef. 3",
  titreAccueil: "CEJM.<br>Éco, droit, management : tout pour l'E4.",
  intro: "Les 27 chapitres de ton cours en fiches, des quiz, des cas pratiques de droit générés au hasard, la méthode du syllogisme et du développement structuré, et des sujets complets corrigés.",
  themes: [
    "L'intégration de l'entreprise dans son environnement",
    "La régulation de l'activité économique",
    "L'organisation de l'activité de l'entreprise",
    "L'impact du numérique sur la vie de l'entreprise",
    "Les mutations du travail",
    "Les choix stratégiques de l'entreprise",
  ],
  epreuve: `<p><b>E4 — Culture économique, juridique et managériale pour l'informatique</b> (unité U3) : épreuve <b>écrite</b> de <b>4 heures</b>, <b>coefficient 3</b>. Le sujet est <b>spécifique au BTS SIO</b> : l'entreprise étudiée est souvent liée au numérique (ESN, éditeur, start-up, hébergeur…).</p>
    <p><b>Le déroulé :</b> une étude de cas avec une base documentaire (articles, extraits de contrats, textes de loi, jurisprudence, chiffres). En général :</p>
    <ul><li><b>Partie 1 — Analyse de la situation</b> : des questions d'économie, de droit et de management sur l'entreprise, à traiter avec les documents.</li><li><b>Partie 2 — Développement structuré</b> : une argumentation organisée (introduction, plan en 2 ou 3 parties, conclusion) qui répond à une question, appuyée sur tes connaissances, les documents et des exemples réels.</li></ul>
    <p><b>Ce qui est évalué :</b> analyser les situations auxquelles l'entreprise est confrontée, exploiter une base documentaire économique, juridique et managériale, proposer des solutions argumentées.</p>
    <p>Demande à ton prof de CEJM un sujet SIO récent pour voir le découpage exact et le barème.</p>`,
  chapitres: [],
  generes: [],
  methode: [],
  sujets: [],
  vocab: [],
  vocabSens: ["Notion → Définition", "Définition → Notion"],
};
/* Ajoute un chapitre : th = numéro du thème (1 à 6). */
const CH = (th, court, titre, resume, fiche, quiz, exos = []) => COURS.chapitres.push({ th, court, titre, resume, fiche, quiz, exos });
