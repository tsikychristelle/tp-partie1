# Réponses — TP Gargote Mobile, partie 2 : de JavaScript à TypeScript

Nom et prénom :MIALISOA Tsiky Christelle
Groupe :A

Répondez en quelques phrases, avec vos mots. Quand une question demande ce que
vous avez observé, décrivez ce que vous avez réellement vu à l'écran ou dans la console.

## Fiche 07 — Migration

Nombre d'erreurs signalées au premier `npm run typecheck` :49

| Incident | En TypeScript, détecté à l'écriture ? | Message du compilateur |
|---|---|---|
| 1. Prix additionnés | Oui | `Argument of type 'string' is not assignable to parameter of type 'number'` |
| 2. Faute de frappe | Oui | `Property 'disponnible' does not exist on type 'Plat'` |
| 3. API renommée | Oui | `Property 'nom' does not exist on type 'Plat'` après remplacement de `nom` par `libelle` |
| 4. Mauvais argument | Oui | `Argument of type 'number' is not assignable to parameter of type 'Plat'` |
| 5. await oublié | Oui | `Argument of type 'Promise<Plat[]>' is not assignable to parameter of type 'Plat[]'` |

- Q7.1 :Au premier diagnostic j'appercois 49 erreurs et les plus frequent sont `Property '' does not exist on type 'never'`
- Q7.2 :C'est l'incident 1 
- Q7.3 :
- Q7.3 : Dans cet incident, j'ai eu 6 erreurs dans les pages Menu, Panier et PlatDetail. Quand je l'avais cherché manuellement dans la fiche 05, j'avais aussi trouvé les principaux fichiers, mais TypeScript me montre directement où il faut corriger.
- Q7.4 : La migration a toucher 14 fichiers, avec 132 lignes ajouter et 60 lignes supprimer. Au debut, c'est un peu plus de travail mais ça permet de trouver les erreurs pendant qu'on écrit le code. Selon moi, le bénéfice vaut quand même le cout.
 