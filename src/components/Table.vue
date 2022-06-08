<script setup>
import { RouterLink, RouterView } from "vue-router";

defineProps({
  listdata: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <table class="container" v-if="listdata.length > 0">
    <thead>
      <tr id="trheader">
        <th scope="col">Nome</th>
        <th scope="col">CPF</th>
        <th scope="col">Email</th>
        <th scope="col">Telefone</th>
        <th scope="col">UF</th>
        <th scope="col">Qualiseguro</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(value, index) in listdata" :key="index">
        <th>{{ value.name }}</th>
        <th>{{ value.cpf }}</th>
        <th>{{ value.email }}</th>
        <th>{{ value.phone }}</th>
        <th>{{ value.uf }}</th>
        <th v-if="value.qualiClient">Possui</th>
        <th v-else>Não Possui</th>
        <RouterLink :to="{ name: 'Update', params: { id: value.id } }"
          >Editar</RouterLink
        >
        <th>Excluir</th>
      </tr>
    </tbody>
  </table>
  <div class="container centered-text" v-else>
    <h2>Sem clientes registrados no momento ):</h2>
    <br />
    <h3>Comece acessando a aba acima "Cadastrar Cliente".</h3>
  </div>
</template>

<style scoped>
#trheader th {
  font-weight: bold;
}

th {
  font-size: 18px;
}
</style>
