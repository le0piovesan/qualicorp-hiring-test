<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      name: "",
      email: "",
      cpf: "",
      phone: "",
      ufList: [],
      uf: "",
      qualiClient: true,
    };
  },
  mounted() {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          this.uf.push(element.sigla);
        });
      })
      .catch((err) => console.warn(err));

    this.$refs.name.focus();
  },
  methods: {
    handleUpdate() {
      const updateClient = {
        name: this.name,
        email: this.email,
        cpf: this.cpf,
        phone: this.phone,
        uf: this.uf,
        terms: this.terms,
      };
      console.log(updateClient);
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<template>
  <form @submit.prevent="handleUpdate">
    <h1>Atualizar cliente</h1>
    <p>O id atual é {{ $route.params.id }}</p>

    <label>Nome:</label>
    <input type="text" required v-model="name" ref="name" />

    <label>CPF:</label>
    <input type="text" required v-model="cpf" />

    <label>Email:</label>
    <input type="email" required v-model="email" />

    <label>Telefone:</label>
    <input type="tel" required v-model="phone" />

    <label>Estado: </label>
    <select v-model="uf" required>
      <option v-for="(value, index) in ufList" :key="index" value="value">
        {{ value }}
      </option>
    </select>

    <div class="terms">
      <input type="checkbox" required v-model="terms" />
      <label>Cliente possui <span class="bold">quali</span>seguro</label>
    </div>

    <div class="centered-text">
      <button>Cadastrar Cliente</button>
    </div>
  </form>
</template>

<style></style>
