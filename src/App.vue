<script setup>
import { RouterLink, RouterView } from "vue-router";
import Logo from "@/components/Logo.vue";
</script>

<template>
  <header>
    <div>
      <Logo title="CRUD Clientes" />

      <nav>
        <RouterLink :to="{ name: 'Home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'Register' }">Cadastrar Cliente</RouterLink>
        <RouterLink :to="{ name: 'About' }">Sobre</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
</style>
