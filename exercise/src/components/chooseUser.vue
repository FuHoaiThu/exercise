<template>
  <div class="choosen-product">
    <ul class="choosen-product__wrapper">
      <li v-for="(user, index) in choosenUser" :key="index" ref="widthItem">
        {{ user.name }}
        <img
          src="../assets/X.svg"
          class="choosen-product--delete"
          @click="removeChoosenUser(user)"
        />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["choosenUser"],
  data() {
    return {
      width: 0
    };
  },
  computed: {},
  methods: {
    removeChoosenUser(user) {
      this.$store.dispatch("removeChoosenUser", user);
    }
  }
};
</script>

<style scoped>
.choosen-product {
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translate(0, -50%);
}
.choosen-product__wrapper li {
  display: inline-block;
  padding: 4px 4px 4px 16px;
  text-align: center;
  background-color: #f0f4f8;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 24px;
  color: #627d98;
}
.choosen-product--delete {
  width: 14px;
  height: 14px;
  padding-left: 4px;
  cursor: pointer;
}
</style>
