<script setup>
import FormInput from "@/components/FormInput.vue";
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
      userProperties: this.userData,
      loading: false,
    };
  },
  methods: {
    putSubmit(user) {
      this.loading = true;

      fetch(
        process.env.NODE_ENV === "development"
          ? `http://localhost:8888/${user.id}`
          : `https://qualicorp-hiring-test.herokuapp.com/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify(user),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          this.$emit("close");
          this.loading = false;
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
  <div class="modal-container" @click="$emit('close')">
    <Loading v-if="loading" :loading="loading" />
    <div v-else class="modal" @click.stop>
      <button type="button" class="close" @click="$emit('close')">
        X Fechar
      </button>

      <FormInput :user="userProperties" :putSubmit="putSubmit" />
    </div>
  </div>
</template>

<style scoped>
.close {
  color: #000;
  font-weight: bold;
  background-color: #fff;
}
.close:hover {
  opacity: 0.4;
  transition: 0.8s ease;
}
</style>
