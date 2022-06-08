<script>
export default {
  props: {
    loading: Boolean,
  },
};
</script>

<template>
  <div v-if="loading" class="loader"></div>
</template>

<style scoped>
.loader {
  border: 16px solid #171a88;
  border-top: 16px solid #ffb61e;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
