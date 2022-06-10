<script setup>
import ModalUpdate from "@/components/ModalUpdate.vue";
import Loading from "@/components/Loading.vue";

defineProps({
  listdata: {
    type: Array,
    required: true,
  },
  updateComponent: { type: Function },
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
  watch: {
    userModal() {
      this.updateComponent();
    },
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
            this.loading = false;
            this.updateComponent();
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
          <td data-label="Nome">{{ value.name }}</td>
          <td data-label="CPF">{{ value.cpf }}</td>
          <td data-label="Email">{{ value.email }}</td>
          <td data-label="Telefone">{{ value.phone }}</td>
          <td data-label="UF">{{ value.uf }}</td>
          <td data-label="Qualiseguro" v-if="value.qualiClient">
            <div class="client-quali">
              <span> Cliente </span>

              <img
                src="../assets/logo-quali.svg"
                alt="Cliente"
                title="Cliente Quali"
              />
            </div>
          </td>
          <td data-label="Qualiseguro" v-else>Não Possui</td>

          <td data-label="Ações" class="todo-button">
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
