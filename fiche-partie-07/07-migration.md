# Fiche 07 — Migrer l'application en TypeScript

**Durée** : 2 h · **Slides** : deck « Partie 2 — De JavaScript à TypeScript », section 5, jusqu'à la slide « Au TP : fiche 07 »

## Objectif

Convertir **votre** application de la fiche 04 en TypeScript, fichier par fichier,
puis rejouer les cinq incidents de la fiche 05.

Partez d'un état propre : `git status` ne doit rien afficher. Créez une branche :

```bash
git checkout -b typescript
```

## 1. Installer les outils

Dans `app/` :

```bash
npm install -D typescript@6.0.3 vue-tsc@3.3.13 @vue/tsconfig@0.9.1
```

- `typescript` : le compilateur ;
- `vue-tsc` : la même chose, capable de lire aussi les fichiers `.vue` et leurs templates ;
- `@vue/tsconfig` : une configuration recommandée par l'équipe Vue.

## 2. Configurer

Créez `app/tsconfig.json` :

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "types": ["vite/client"],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src/**/*.ts", "src/**/*.vue"]
}
```

Créez `app/src/env.d.ts`, qui décrit les variables du fichier `.env` :

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

Dans `package.json`, remplacez les scripts :

```json
"scripts": {
  "dev": "vite",
  "typecheck": "vue-tsc --noEmit",
  "build": "vue-tsc --noEmit && vite build",
  "preview": "vite preview"
}
```

Le build refusera désormais de produire l'application si le typage est faux.

## 3. Renommer

```bash
git mv src/main.js src/main.ts
git mv src/router/index.js src/router/index.ts
git mv src/services/api.js src/services/api.ts
git mv src/utils/format.js src/utils/format.ts
git mv src/composables/usePanier.js src/composables/usePanier.ts
```

Dans `index.html`, remplacez `/src/main.js` par `/src/main.ts`.

Dans **chaque** fichier `.vue`, remplacez `<script setup>` par `<script setup lang="ts">`.

`vite.config.js` reste en JavaScript.

## 4. Décrire les données : `src/types/gargote.ts`

C'est le cœur de la migration : une seule description des données, utilisée partout.
Voici le début :

```ts
export interface Categorie {
  id: number;
  nom: string;
}

export interface Plat {
  id: number;
  nom: string;
  description: string;
  /** Montant envoyé par l'API sous forme de chaîne : "6000.00" */
  prix: string;
  categorie_id: number;
  disponible: boolean;
  categorie: Categorie | null;
}
```

**À vous** : en vous aidant des réponses réelles de l'API (`curl` ou le navigateur), écrivez :

- `StatutCommande` : type union (`'en_attente' | ...`, voyez la slide sur les types union) ;
- `LigneCommande` et `Commande` : ce que renvoie `GET /commandes` ;
- `NouvelleCommande` : ce que l'on **envoie** à `POST /commandes` ;
- `LignePanier` : `{ plat, quantite }`.

## 5. Typer les fonctions utilitaires

**`utils/format.ts`** : `formatAriary(montant: number): string` et `formatDate(iso: string): string`.
Oui, `number` seulement : ce choix va révéler des choses.

**`services/api.ts`** : rendez `requete` **générique**, et remplacez l'erreur bricolée par une classe :

```ts
import type { Categorie, Commande, NouvelleCommande, Plat } from '@/types/gargote';

export class ErreurApi extends Error {
  constructor(
    message: string,
    public statut: number,
    public details: Record<string, string> = {},
  ) {
    super(message);
  }
}

async function requete<T>(chemin: string, options: RequestInit = {}): Promise<T> {
  // ... même corps qu'avant, mais :
  //   throw new ErreurApi(message, reponse.status, donnees?.erreurs ?? {});
  //   return donnees as T;
}
```

Puis typez chaque méthode : `getPlats(categorieId?: number | null): Promise<Plat[]>`, etc.

**`composables/usePanier.ts`** : `ref<LignePanier[]>([])`, et les paramètres de chaque fonction.

**`router/index.ts`** : `const routes: RouteRecordRaw[] = [...]`
(`import type { RouteRecordRaw } from 'vue-router'`).

Notez le mot `import type` : la configuration Vue exige de séparer les imports de **types**
(effacés à la compilation) des imports de **valeurs**.

## 6. Le premier diagnostic

```bash
npm run typecheck
```

**Notez le nombre d'erreurs** dans `REPONSES-07.md`. Pas de panique : elles se rangent
dans une poignée de familles. Corrigez-les fichier par fichier.

| Message (extrait) | Cause | Correction |
|---|---|---|
| `Property 'nom' does not exist on type 'never'` | `ref([])` : TS ne sait pas ce que contiendra le tableau | `ref<Plat[]>([])` |
| `... is not assignable to type 'null'` | `ref(null)` : TS croit que la valeur sera toujours `null` | `ref<Plat \| null>(null)`, `ref<string \| null>(null)` |
| `Argument of type 'string' is not assignable to parameter of type 'number'` sur `formatAriary` | le prix est une chaîne | `formatAriary(Number(plat.prix))` |
| `Parameter 'event' implicitly has an 'any' type` | paramètre non typé | `event: RefresherCustomEvent` (`import type` depuis `@ionic/vue`) |
| `'e' is of type 'unknown'` | dans un `catch`, l'erreur peut être n'importe quoi | `if (e instanceof ErreurApi && e.statut === 404)` |
| `'string \| string[]' is not assignable to 'number'` | `route.params.id` est du texte | `Number(route.params.id)` |
| `Argument of type 'null' is not assignable to parameter of type 'Plat'` | `plat.value` peut encore être `null` | une garde : `if (!plat.value) return;` |
| `'plat.categorie' is possibly 'null'` | l'interface autorise `null` | `plat.categorie?.nom` |
| `Type 'string' is not assignable to type 'boolean'` sur `detail="false"` | un attribut HTML est toujours du texte | `:detail="false"` |

Recommencez jusqu'à obtenir **zéro erreur**. Puis vérifiez que l'application
fonctionne toujours (`npm run dev`) : la migration ne doit rien changer au comportement.

## 7. Rejouer les cinq incidents

Reprenez les incidents de la fiche 05, un par un, **avec VS Code ouvert sur le fichier**.
Pour chacun, notez si l'erreur est soulignée dès la frappe, et le message.

Pour l'incident 3, ne relancez pas l'API : modifiez simplement `nom` en `libelle`
dans l'interface `Plat`, puis lancez `npm run typecheck`.

Annulez chaque incident avant le suivant. Faites un commit à la fin.

## Questions

- **Q7.1** Combien d'erreurs au premier diagnostic ? Quelle famille était la plus fréquente ?
- **Q7.2** Complétez le second tableau de `REPONSES-07.md`. Lequel des cinq incidents TypeScript n'aurait-il **pas** détecté si `formatAriary` acceptait `number | string` ?
- **Q7.3** Incident 3 : combien d'erreurs le compilateur a-t-il listées ? Comparez avec votre recherche manuelle de la fiche 05.
- **Q7.4** `git diff main --stat` (ou `master`, selon le nom de votre branche de départ) : combien de lignes ont changé ? Selon vous, le coût de la migration valait-il le bénéfice ? Argumentez, dans les deux sens.
