<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/menu" text="Menu" />
        </ion-buttons>
        <ion-title>{{ plat ? plat.nom : 'Plat' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="!plat && !erreur" class="ion-text-center"><ion-spinner /></div>
      <ion-text v-if="erreur" color="danger"><p>{{ erreur }}</p></ion-text>

      <ion-card v-if="plat">
        <ion-card-header>
          <ion-card-subtitle>{{ plat.categorie?.nom }}</ion-card-subtitle>
          <ion-card-title>{{ plat.nom }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>{{ plat.description }}</p>
          <h2 class="prix">{{ formatAriary(Number(plat.prix)) }}</h2>
          <ion-badge v-if="!plat.disponible" color="medium">Épuisé</ion-badge>
        </ion-card-content>
      </ion-card>

      <ion-button v-if="plat" expand="block" :disabled="!plat.disponible" @click="ajouterEtRevenir">
        <ion-icon slot="start" :icon="cartOutline" />
        Ajouter au panier
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonBadge,
  IonButton, IonIcon, IonSpinner, IonText, useIonRouter,
} from '@ionic/vue';
import { cartOutline } from 'ionicons/icons';
import api, { ErreurApi } from '@/services/api';
import { formatAriary } from '@/utils/format';
import { usePanier } from '@/composables/usePanier';

const route = useRoute();
const ionRouter = useIonRouter();
const { ajouter } = usePanier();

import type { Plat } from '@/types/gargote';

const plat = ref<Plat | null>(null);
const erreur = ref<string | null>(null);

onMounted(async () => {
  
  try {
    if(!plat.value)return ;
    plat.value = await api.getPlat(Number(route.params.id));
  } catch (e) {
    if(e instanceof ErreurApi && e.statut===404){
      erreur.value = "Ce plat n'existe pas.";
    }
    
  }
});

function ajouterEtRevenir() {
  if(plat.value){
    ajouter(plat.value);
  }
  ionRouter.back(); // retour au menu, avec l'animation de retour
}
</script>

<style scoped>
.prix {
  margin-top: 12px;
  font-weight: 700;
  color: var(--ion-color-primary);
}
</style>
