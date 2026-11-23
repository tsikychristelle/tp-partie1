/*
 * Tous les appels à l'API passent par ce fichier.
 * Les pages n'utilisent jamais fetch() directement.
 */
import type { Categorie, Commande, NouvelleCommande, Plat } from '@/types/gargote';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';


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

  const reponse = await fetch(BASE_URL + chemin, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const donnees = reponse.status === 204 ? null : await reponse.json();

  if (!reponse.ok) {
    throw new ErreurApi(donnees.message, reponse.status, donnees?.details?? {});
  }
  return donnees as T ;
}


export default {
  getCategories(): Promise<Categorie[]> {
    return requete('/categories');
  },

  getPlats(categorieId?:number | null): Promise<Plat[]> {
    return requete(categorieId ? `/plats?categorie=${categorieId}` : '/plats');
  },

  getPlat(id: number): Promise<Plat> {
    return requete(`/plats/${id}`);
  },

  getCommandes(): Promise<Commande[]> {
    return requete('/commandes');
  },

  creerCommande(commande:NouvelleCommande): Promise<Commande> {
    return requete('/commandes', { method: 'POST', body: JSON.stringify(commande) });
  },
};
