<script setup>
import ModalUpdate from "@/components/ModalUpdate.vue";
import Loading from "@/components/Loading.vue";

defineProps({
  listdata: {
    type: Array,
    required: true,
  },
});
</script>

<script>
export default {
  data() {
    return {
      userModal: null,
      loading: false,
    };
  },
  methods: {
    handleDelete(id, name) {
      const confirmation = confirm(
        `Deseja mesmo excluir o(a) cliente ${name}?`
      );

      if (confirmation) {
        this.loading = true;
        fetch(
          process.env.NODE_ENV === "development"
            ? `http://localhost:8888/${id}`
            : `https://qualicorp-hiring-test.herokuapp.com/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            this.$router.go();
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
          });
      }
    },
    openModal(id) {
      this.userModal = id;
    },
    closeModal() {
      this.userModal = null;
    },
  },
};
</script>

<template>
  <div class="mt" v-if="loading">
    <Loading :loading="loading" />
  </div>

  <div v-else>
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
        <tr v-for="value in listdata" :key="value.id">
          <td>{{ value.name }}</td>
          <td>{{ value.cpf }}</td>
          <td>{{ value.email }}</td>
          <td>{{ value.phone }}</td>
          <td>{{ value.uf }}</td>
          <td v-if="value.qualiClient">
            <div class="client-quali">
              <span> Cliente </span>

              <img
                src="../assets/logo-quali.svg"
                alt="Cliente"
                title="Cliente Quali"
              />
            </div>
          </td>
          <td v-else>Não Possui</td>

          <td class="todo-button">
            <img
              src="../assets/edit.svg"
              alt="Edit"
              title="Editar Cliente"
              @click="openModal(value)"
            />
            <img
              src="../assets/delete.svg"
              alt="Delete"
              title="Deletar Cliente"
              @click="handleDelete(value.id, value.name)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="container centered-text" v-else>
      <h2>Sem clientes registrados no momento ):</h2>
      <br />
      <h3>Comece acessando a aba acima "Cadastrar Cliente".</h3>
    </div>
  </div>

  <ModalUpdate v-if="userModal" :userData="userModal" @close="closeModal" />
</template>

<style scoped>
table {
  border-collapse: collapse;
}

#trheader th {
  font-weight: bold;
}

th,
td {
  height: 60px;
  padding: 0px 5px;
  border-bottom: 1px solid #ddd;
}

.client-quali {
  display: flex;
  justify-content: center;
  align-items: center;
}

.client-quali span {
  padding-right: 5px;
}
</style>
