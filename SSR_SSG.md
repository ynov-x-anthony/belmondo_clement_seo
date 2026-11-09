# SSR_SSG.md

Pour CE catalogue (quelques dizaines de produits, mis à jour occasionnellement) :

1. Choisirais-tu plutôt du SSR, du SSG, ou du pré-rendu ? Justifie en une
   ou deux phrases en t'appuyant sur la fréquence de mise à jour du contenu.

   **Du SSG.** Le contenu change rarement et le nombre de pages est petit : on
   peut générer le HTML complet de chaque fiche produit au moment du build, et
   le servir tel quel. Les crawlers et les bots des réseaux sociaux reçoivent
   directement le vrai `<title>`, la description et les balises `og:*`, sans
   exécuter de JS, et c'est la solution la plus rapide (bon pour le LCP). Il
   suffit de relancer un build à chaque modification du catalogue.

   (Le pré-rendu serait une solution acceptable pour garder la SPA Vite actuelle
   sans migrer vers Next.js, mais le SSG natif est plus propre.)

2. Si demain ce site affichait un **stock en temps réel** (quantité
   disponible qui change à chaque commande), ce choix changerait-il ? Pourquoi ?

   **Oui, en partie.** Une page générée au build afficherait un stock figé, donc
   faux dès la première commande. Deux options :
   - passer les fiches produits en **SSR** : le HTML est généré à chaque
     requête, avec le stock du moment ;
   - ou, plus économique, **garder le SSG** pour tout le contenu stable (nom,
     description, prix, meta SEO) et charger **uniquement le stock côté client**
     via un appel API. Le stock n'a aucun intérêt SEO, donc il n'a pas besoin
     d'être dans le HTML initial.

   C'est le mélange « route par route / bloc par bloc » vu dans la quête.
