<script setup>
import Loading from "@/components/Loading.vue";

defineProps({
  userid: {
    type: Object,
    required: true,
  },
});
</script>

<script>
export default {
  data() {
    return {
      id: this.userid.id,
      name: this.userid.name,
      email: this.userid.email,
      cpf: this.userid.cpf,
      phone: this.userid.phone,
      ufList: [],
      uf: this.userid.uf,
      qualiClient: this.userid.qualiClient,
      loading: false,
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
    ]);
  },
  methods: {
    handleUpdate() {
      this.loading = true;

      const updateClient = {
        name: this.name,
        email: this.email,
        cpf: this.cpf,
        phone: this.phone,
        uf: this.uf,
        qualiClient: this.qualiClient,
      };

      fetch(`http://localhost:8888/${this.userid.id}`, {
        method: "PUT",
        body: JSON.stringify(updateClient),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((res) => res.json())
        .then((data) => {
          this.loading = false;
          this.$emit("close");
          this.$router.go();
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
  <div class="modal-container">
    <div class="modal">
      <button type="button" class="close" @click="$emit('close')">
        X Fechar
      </button>
      <form @submit.prevent="handleUpdate">
        <h1>Detalhes do(a) cliente {{ name }}</h1>
        <label>Nome:</label>
        <input type="text" required v-model="name" ref="name" />

        <label>CPF:</label>
        <input
          type="text"
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
          <button v-else>Atualizar Cliente</button>
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
  width: 60vw;
  padding: 20px;
  margin: auto;
  background: #fff;
  border-radius: 10px;
  text-align: center;
}
.close {
  text-align: left;
}
</style>
