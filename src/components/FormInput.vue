<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    postSubmit: {
      type: Function,
    },
    putSubmit: {
      type: Function,
    },
  },
  data() {
    return {
      ufList: [],
      loading: false,
      cpfError: false,
      phoneError: false,
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
      if (this.user.cpf.length < 14) this.cpfError = true;
      else if (this.user.phone.length < 15) this.phoneError = true;
      else
        !this.user.id ? this.postSubmit(this.user) : this.putSubmit(this.user);
    },
  },
};
</script>

<template>
  <form @submit.prevent="handleSubmit" style="text-align: left">
    <label for="user.name">Nome:</label>
    <input
      type="text"
      required
      :value="user.name"
      @input="(event) => (user.name = event.target.value)"
      ref="nameRef"
      id="user.name"
    />

    <label for="user.cpf">CPF:</label>
    <input
      type="text"
      required
      :value="user.cpf"
      @input="(event) => (user.cpf = event.target.value)"
      v-mask="'###.###.###-##'"
      placeholder="000.000.000-00"
      id="user.cpf"
    />
    <p v-if="cpfError && this.user.cpf.length < 14" class="error">
      Por favor informe o CPF completo
    </p>

    <label for="user.email">Email:</label>
    <input
      type="email"
      required
      :value="user.email"
      @input="(event) => (user.email = event.target.value)"
      id="user.email"
    />

    <label for="user.phone">Telefone:</label>
    <input
      required
      :value="user.phone"
      @input="(event) => (user.phone = event.target.value)"
      v-mask="'(##) #####-####'"
      placeholder="(00) 00000-0000"
      id="user.phone"
    />
    <p v-if="phoneError && this.user.phone.length < 15" class="error">
      Por favor informe o número completo
    </p>

    <label for="user.uf">Estado: </label>
    <select
      :value="user.uf"
      @input="(event) => (user.uf = event.target.value)"
      required
      id="user.uf"
    >
      <option v-for="(value, index) in ufList" :key="index" :value="value">
        {{ value }}
      </option>
    </select>

    <label class="checkbox-container" for="user.qualiClient"
      >Cliente possui <span class="bold">quali</span>seguro
      <input
        type="checkbox"
        :checked="user.qualiClient"
        @change="(event) => (user.qualiClient = event.target.checked)"
        id="user.qualiClient"
      />
      <span class="checkmark"></span>
    </label>

    <div class="centered-text">
      <button v-if="this.user.id">Atualizar Cliente</button>
      <button v-else>Cadastrar Cliente</button>
    </div>
  </form>
</template>
