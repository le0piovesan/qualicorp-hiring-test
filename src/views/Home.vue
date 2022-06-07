<script setup>
import Table from "@/components/Table.vue";
</script>

<script>
export default {
  data() {
    return {
      clients: [
        {
          id: 1,
          name: "Leonardo",
          cpf: "123456789",
          email: "leonardo@email.com",
          phone: "32222222",
        },
        {
          id: 2,
          name: "Michele",
          cpf: "9876544321",
          email: "michele@email.com",
          phone: "999999999",
        },
      ],
    };
  },
};
</script>

<template>
  <main>
    <Table :listdata="clients" />
  </main>
</template>
