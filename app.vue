<script setup lang="ts">
import '~/assets/css/main.css'
import '~/assets/css/medium-zoom.css'
const route = useRoute()
</script>

<template>
  <Html lang="fr">
    <Head>
      <Link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Head>

    <Body>
      <AppHeader v-if="route.path !== '/'" />

      <main class="main pt-[80px]">
        <NuxtPage />
      </main>

      <AppFooter />
    </Body>
  </Html>
</template>
