# Fiche 05 — Les problèmes

**Durée** : 1 h · **Slides** : deck « Partie 2 — De JavaScript à TypeScript », section 3, jusqu'à la slide « Au TP : fiche 05 »

## Objectif

Votre application fonctionne. Vous allez maintenant introduire **cinq incidents
réalistes**, ceux qui arrivent tous les jours sur un vrai projet, et observer
comment JavaScript réagit.

## Protocole

Pour chaque incident :

1. faites la modification demandée ;
2. **sans regarder la console d'abord**, utilisez l'application comme un utilisateur ;
3. notez où et quand le problème apparaît, et le message affiché s'il y en a un ;
4. chronométrez le temps qu'il faut à votre voisin pour trouver la cause, sans lui dire ce que vous avez changé ;
5. **annulez la modification** (`git checkout -- .`) avant de passer au suivant.

Remplissez le tableau de `REPONSES-05.md` au fur et à mesure.

## Incident 1 — Les prix additionnés

Le gérant veut afficher, sur la page de détail, le prix du plat accompagné de riz.

Dans `PlatDetailPage.vue` :

```js
const riz = ref(null);
// dans onMounted, après le chargement du plat :
riz.value = await api.getPlat(7);
```

```html
<p v-if="riz">Avec du riz : {{ formatAriary(plat.prix + riz.prix) }}</p>
<!-- Le prix ne s'affiche pas  -->
```

## Incident 2 — Une faute de frappe

Dans `MenuPage.vue`, remplacez `plat.disponible` par `plat.disponnible`
(deux « n ») **dans le badge « Épuisé » uniquement**.
<!-- Tout les plats sont affiches épuisé -->
## Incident 3 — L'équipe API a changé un nom de champ

L'API passe en version 2 : le champ `nom` des plats devient `libelle`.

Arrêtez l'API et relancez-la ainsi :

```bash
npm run start:v2
```
<!-- Aucun plat n'est recharger  -->

Parcourez toute l'application : menu, recherche, détail, panier, commande.
Puis corrigez votre code pour qu'il fonctionne avec la version 2, **sans aide
de l'enseignant**. Comptez les endroits modifiés.

Remettez ensuite l'API en version 1 (`npm start`) et annulez vos corrections.

## Incident 4 — Le mauvais argument

Dans `MenuPage.vue`, un développeur pressé écrit :

```html
@click.stop.prevent="ajouterAuPanier(plat.id)"
```
p.nom
Ajoutez deux plats au panier, puis ouvrez l'onglet Panier.
<!-- Dans l'onglet panier il affiche juste que deux produits est ajouter au panier sans le préciser -->?

## Incident 5 — Le `await` oublié

Dans la fonction `charger()` de `MenuPage.vue`, retirez le mot `await` :

```js
plats.value = api.getPlats(id);
```

## Questions

- **Q5.1** Sur les cinq incidents, combien ont produit un message d'erreur clair ? Combien ont été visibles seulement par un utilisateur attentif ? Lequel aurait pu passer en production sans que personne ne s'en aperçoive ?
- **Q5.2** Pour l'incident 3 : combien d'endroits avez-vous modifiés ? Comment les avez-vous trouvés ? Une recherche du mot `nom` dans le projet suffisait-elle ? Pourquoi ?

À la fiche 07, vous rejouerez exactement ces cinq incidents en TypeScript.
