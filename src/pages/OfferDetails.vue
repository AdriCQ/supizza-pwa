<script setup lang="ts">
import NavTop from "@/components/menu/NavTop.vue";
import PromoDetails from "@/components/forms/PromoDetails.vue";
import { useDataStore } from "@/helpers/pinia";
import { onBeforeMount, ref } from "vue";
import type { IPromo, IPizza, IResponseDataKey } from "@/types";
import { useRoute } from "vue-router";

const $dataStore = useDataStore();
const $route = useRoute();

const offer = ref<IPizza | IPromo>();
const offerType = ref<IResponseDataKey>();

onBeforeMount(() => {
  if ($route.query.type && $route.query.id) {
    const type = $route.query.type;
    const id = Number($route.query.id);
    if (type === "promos" || type === "pizzas") offerType.value = type;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resp = ($dataStore[type] as IPizza[] | IPromo[]).find(
      (v: IPromo | IPizza) => v.id === id
    );
    offer.value = resp;
  } else if ($dataStore.selected) {
    offer.value = $dataStore.selected.value;
    offerType.value = $dataStore.selected.type;
  }
});
</script>

<template>
  <NavTop back="back" />

  <div class="relative" v-if="offer">
    <!-- Top Image -->
    <div class="fixed h-96 w-full bg-slate-500">
      <img
        v-if="offer?.img"
        :src="offer.img"
        :alt="offer.title"
        :title="offer.title"
        class="w-full"
      />
    </div>
    <!-- / Top Image -->

    <!-- Content -->
    <div
      class="min-h-[15rem] translate-y-96 space-y-4 rounded-t-3xl bg-white px-4 pb-24 pt-8"
    >
      <div class="flex gap-2 text-primary">
        <div class="flex-1">
          <h1 class="text-2xl">{{ offer?.title }}</h1>
        </div>

        <div class="flex-none text-lg font-bold">
          ${{ Number(offer?.price).toFixed(2) }}
        </div>
      </div>

      <!-- Details -->
      <div class="mt-2">
        <PromoDetails
          v-if="offerType === 'promos'"
          :promo="(offer as IPromo)"
        />
      </div>
      <!-- / Details -->
    </div>
    <!-- / Content -->

    <div class="fixed bottom-0 w-full bg-white px-6 pb-4">
      <div class="btn-disabled btn-primary btn w-full">Añadir</div>
    </div>
  </div>
</template>
