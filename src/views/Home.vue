<script setup>
import Table from "@/components/Table.vue";
import Loading from "@/components/Loading.vue";
</script>

<script>
export default {
  data() {
    return {
      clients: [],
      loading: true,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      fetch(
        process.env.NODE_ENV === "development"
          ? "http://localhost:8888"
          : "https://qualicorp-hiring-test.herokuapp.com"
      )
        .then((res) => res.json())
        .then((data) => {
          this.clients = data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
};
</script>

<template>
  <main>
    <div v-if="loading" class="mt">
      <Loading :loading="loading" />
    </div>
    <Table v-else :listdata="clients" :updateComponent="getData" />
  </main>
</template>
