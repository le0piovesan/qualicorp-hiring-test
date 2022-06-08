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
      uf: "",
      ufList: [],
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

    this.$refs.nameRef.focus();
  },
  methods: {
    handleSubmit() {
      // this.loading = true;

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
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify(newClient),
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
    <label for="name">Nome:</label>
    <input
      type="text"
      required
      :value="name"
      @input="(event) => (name = event.target.value)"
      ref="nameRef"
      id="name"
    />

    <label for="cpf">CPF:</label>
    <input
      required
      :value="cpf"
      @input="(event) => (cpf = event.target.value)"
      v-mask="'###.###.###-##'"
      placeholder="Ex.: 000.000.000-00"
      id="cpf"
    />

    <label for="email">Email:</label>
    <input
      type="email"
      required
      :value="email"
      @input="(event) => (email = event.target.value)"
      id="email"
    />

    <label for="phone">Telefone:</label>
    <input
      required
      :value="phone"
      @input="(event) => (phone = event.target.value)"
      v-mask="'(##) #####-####'"
      placeholder="Ex.: (00) 00000-0000"
      id="phone"
    />

    <label for="uf">Estado: </label>
    <select
      :value="uf"
      @input="(event) => (uf = event.target.value)"
      required
      id="uf"
    >
      <option v-for="(value, index) in ufList" :key="index" :value="value">
        {{ value }}
      </option>
    </select>

    <input
      type="checkbox"
      :checked="qualiClient"
      @change="(event) => (qualiClient = event.target.checked)"
      id="qualiClient"
    />
    <label for="qualiClient"
      >Cliente possui <span class="bold">quali</span>seguro</label
    >

    <div class="centered-text">
      <Loading v-if="loading" :loading="loading" />
      <button v-else>Cadastrar Cliente</button>
    </div>
  </form>
</template>
