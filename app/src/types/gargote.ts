export interface Categorie{
    id:number;
    nom:string;
}
export interface Plat{
    id:number;
    nom:string;
    description:string;
    prix:string;
    categorie_id:number;
    disponible:boolean;
    categorie:Categorie|null;

}
type StatutCommande = 'en_attente'|'en_preparation'|'servie'|'payee';
export interface LigneCommande{
    plat_id:number;
    nom:string;
    quantite:number;
    prix_unitaire:string;
    sous_total:string;
    
}
export interface Commande{
    id:number;
    table:number;
    date:string;
    statut:StatutCommande;
    total:string;
    lignes:LigneCommande[];
}
export interface NouvelleCommande{
    table:number;
    lignes:{plat_id:number,quantite:number}[];
}
export interface LignePanier{
    plat:Plat;
    quantite:number;
}