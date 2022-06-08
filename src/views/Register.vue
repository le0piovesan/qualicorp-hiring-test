<script setup>
import Loading from "@/components/Loading.vue";
</script>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      cpf: "",
      phone: "",
      ufList: [],
      uf: "",
      qualiClient: true,
      loading: false,
    };
  },
  mounted() {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          this.ufList.push(element.sigla);
        });
      })
      .catch((err) => console.warn(err));

    this.$refs.name.focus();
  },
  methods: {
    handleSubmit() {
      this.loading = true;

      const newClient = {
        name: this.name,
        email: this.email,
        cpf: this.cpf,
        phone: this.phone,
        uf: this.uf,
        qualiClient: this.qualiClient,
      };

      fetch(
        process.env.NODE_ENV === "development"
          ? "http://localhost:8888"
          : "https://qualicorp-hiring-test.herokuapp.com",
        {
          method: "POST",
          body: JSON.stringify(newClient),
          mode: "cors",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          this.loading = false;
          this.$router.push({ name: "Home" });
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
  <form @submit.prevent="handleSubmit">
    <label>Nome:</label>
    <input type="text" required v-model="name" ref="name" />

    <label>CPF:</label>
    <input
      required
      v-model="cpf"
      v-mask="'###.###.###-##'"
      placeholder="Ex.: 000.000.000-00"
    />

    <label>Email:</label>
    <input type="email" required v-model="email" />

    <label>Telefone:</label>
    <input
      required
      v-model="phone"
      v-mask="'(##) #####-####'"
      placeholder="Ex.: (00) 00000-0000"
    />

    <label>Estado: </label>
    <select v-model="uf" required>
      <option v-for="(value, index) in ufList" :key="index" :value="value">
        {{ value }}
      </option>
    </select>

    <input type="checkbox" v-model="qualiClient" />
    <label>Cliente possui <span class="bold">quali</span>seguro</label>

    <div class="centered-text">
      <Loading v-if="loading" :loading="loading" />
      <button v-else>Cadastrar Cliente</button>
    </div>
  </form>
</template>
