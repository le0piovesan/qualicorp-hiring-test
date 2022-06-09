<script setup>
import FormInput from "@/components/FormInput.vue";
import Loading from "@/components/Loading.vue";
</script>

<script>
export default {
  data() {
    return {
      userProperties: {
        name: "",
        email: "",
        cpf: "",
        phone: "",
        uf: "",
        qualiClient: true,
      },
      loading: false,
    };
  },
  methods: {
    postSubmit(user) {
      this.loading = true;

      fetch(
        process.env.NODE_ENV === "development"
          ? "http://localhost:8888"
          : "https://qualicorp-hiring-test.herokuapp.com",
        {
          method: "POST",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify(user),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          this.loading = false;
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
  },
};
</script>

<template>
  <div v-if="loading" class="mt">
    <Loading :loading="loading" />
  </div>
  <FormInput v-else :user="userProperties" :postSubmit="postSubmit" />
</template>
