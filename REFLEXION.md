# REFLEXION.md

1. `robots.txt` empêche-t-il, à lui seul, le duplicate content entre
   `/produits?tri=prix` et `/produits?tri=prix-asc` ? Pourquoi ?

   **Non.** `robots.txt` agit uniquement sur l'**exploration** (le crawl) : il
   dit à Googlebot de ne pas télécharger certaines URLs. Il ne dit rien sur
   l'indexation. Une URL bloquée peut quand même être indexée si un lien
   (interne ou externe) pointe vers elle, simplement sans que Google ait pu lire
   son contenu. Et si on ne bloque aucune des deux, Google voit deux URLs au
   contenu identique et doit choisir seul laquelle garder.

2. Pourquoi la balise canonique est-elle l'outil adapté ici, plutôt que
   `robots.txt` ou une meta `noindex` ?

   Parce que le problème est un problème de **déduplication à l'indexation** :
   les deux URLs sont légitimes et doivent rester accessibles aux utilisateurs,
   on veut juste dire à Google « voici LA version de référence ».
   - `robots.txt` bloquerait le crawl de la variante, donc Google ne verrait
     jamais la canonique posée dessus, et les signaux (liens) reçus par cette
     URL seraient perdus.
   - `noindex` retirerait la page de l'index au lieu de la regrouper avec la
     version principale : on perdrait aussi la popularité qu'elle a gagnée.
   - La canonique, elle, laisse Google explorer les deux URLs, puis regroupe
     leurs signaux sur `/produits?tri=prix`, la seule qui apparaît dans les
     résultats.

3. Si demain `/admin` existe sur ce site et ne doit jamais être exploré par
   Google, quelle ligne ajoutes-tu dans `robots.txt` ?

   ```
   Disallow: /admin
   ```

   (sous `User-agent: *`). Elle est déjà présente dans `public/robots.txt`.
   Attention : `robots.txt` est public et ne protège rien. `/admin` doit
   surtout être protégé par une authentification, et on peut ajouter un
   `noindex` sur ses pages pour être sûr qu'elles ne soient jamais indexées.
