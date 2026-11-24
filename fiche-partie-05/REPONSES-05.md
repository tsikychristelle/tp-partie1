# Réponses — TP Gargote Mobile, partie 2 : de JavaScript à TypeScript

Nom et prénom :MIALISOA Tsiky Christelle
Groupe :A

Répondez en quelques phrases, avec vos mots. Quand une question demande ce que
vous avez observé, décrivez ce que vous avez réellement vu à l'écran ou dans la console.

## Fiche 05 — Les problèmes

| Incident | Où l'erreur s'est-elle manifestée ? | Message affiché (s'il y en a un) | Temps pour trouver la cause |
|---|---|---|---|
| 1. Prix additionnés |L'erreur s'est manifester dans l'affichge du detail du plat | | 2 min|
| 2. Faute de frappe |L'erreur s'est manifester durant l'affichage des menu | |1 min |
| 3. API renommée |L'erreur s'est manifester pendant le chargement des plats  |  | 2 min|
| 4. Mauvais argument | L'erreur s'est manifester lorsqu'on va vers l'onglet panier et ou on doit afficher les plats dans le panier| | |
| 5. await oublié | L'erreur s'est manifester lors du chargement de la page | | 3min |

- Q5.1 : Pour les messages d'erreur clair :3,ceux qui ont été visible seulement pour les utilisateur attentif : 1 ,ceux qui aurait pu passer en production sans que personne ne s'en aperçoive :1 
- Q5.2 :Pour l'incident 3 j'ai modifier dans la page ```api/server.js```,```views/MenuPage.vue```,```views/PanierPage.vue```, ```views/PlatDetail.vue```.Je l'ai trouvé en premier lier dans ```api/server.js``` ,puis en cherchant toutes les pages qui peuvent avoir l'expression `p.nom` ou `plat.nom`.Non,Elle ne suffit pas parce que ce n'est pas seulement le plat qui admet des attribut `nom`. 
