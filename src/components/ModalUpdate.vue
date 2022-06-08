<script setup>
import Loading from "@/components/Loading.vue";

defineProps({
  userData: {
    type: Object,
    required: true,
  },
});
</script>

<script>
export default {
  data() {
    return {
      id: this.userData.id,
      name: this.userData.name,
      email: this.userData.email,
      cpf: this.userData.cpf,
      phone: this.userData.phone,
      ufList: [],
      uf: this.userData.uf,
      qualiClient: this.userData.qualiClient,
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

      fetch(
        process.env.NODE_ENV === "development"
          ? `http://localhost:8888/${this.userData.id}`
          : `https://qualicorp-hiring-test.herokuapp.com/${this.userData.id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify(updateClient),
        }
      )
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
        <label for="name">Nome:</label>
        <input
          type="text"
          required
          :value="name"
          @input="(event) => (name = event.target.value)"
          ref="name"
          id="name"
        />

        <label for="cpf">CPF:</label>
        <input
          type="text"
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
