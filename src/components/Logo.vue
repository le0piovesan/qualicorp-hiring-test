<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="greetings">
    <h1 class="logo">{{ title }}</h1>
    <h3>
      Teste CRUD para cadastro de clientes feito para
      <a target="_blank" href="https://www.qualicorp.com.br/">Qualicorp</a>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
  text-align: center;
}

h3 {
  font-size: 1.2rem;
  text-align: center;
}
</style>
