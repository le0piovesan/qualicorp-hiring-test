<script setup>
defineProps({
  userid: {
    type: String,
    required: true,
  },
});
</script>

<script>
export default {
  data() {
    return {
      id: "",
      name: "",
      email: "",
      cpf: "",
      phone: "",
      ufList: [],
      uf: "",
      qualiClient: "",
    };
  },
  mounted() {
    Promise.all([
      fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => res.json())
        .then((data) => {
          data.forEach((element) => {
            this.ufList.push(element.sigla);
          });
        })
        .catch((err) => console.warn(err)),
      fetch(`http://localhost:8888/${this.userid}`)
        .then((res) => res.json())
        .then((data) => {
          const { name, email, cpf, phone, uf, qualiClient } = data;

          this.name = name;
          this.email = email;
          this.cpf = cpf;
          this.phone = phone;
          this.uf = uf;
          this.qualiClient = qualiClient;
        })
        .catch((err) => {
          console.log(err);
        }),
    ]);
  },
  methods: {
    handleUpdate() {
      const updateClient = {
        name: this.name,
        email: this.email,
        cpf: this.cpf,
        phone: this.phone,
        uf: this.uf,
        qualiClient: this.qualiClient,
      };
      console.log(updateClient);
    },
  },
};
</script>
<template>
  <div class="modal-container">
    <div class="modal">
      <form @submit.prevent="handleUpdate">
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
          <option v-for="(value, index) in ufList" :key="index" :value="value">
            {{ value }}
          </option>
        </select>

        <input type="checkbox" v-model="qualiClient" />
        <label>Cliente possui <span class="bold">quali</span>seguro</label>

        <div class="centered-text">
          <button>Atualizar Cliente</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
}

.modal {
  width: 40%;
  padding: 20px;
  margin: auto;
  background: #fff;
  border-radius: 10px;
  text-align: center;
}
</style>
