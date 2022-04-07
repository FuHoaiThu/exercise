<template>
  <div class="choosen-product">
    <ul class="choosen-product__wrapper">
      <li v-for="(product, index) in choosenProduct" :key="index">
        {{ product.title }}
        <img src="../assets/X.svg" class="choosen-product--delete" />
      </li>
    </ul>
  </div>
</template>
<script>
//import { defineComponent } from '@vue/composition-api'

export default {
  computed: {
    choosenProduct() {
      let choosen = this.$store.getters.getchooseProduct;
      console.log(choosen.length);
      this.$emit("haveChoose", choosen.length);
      return choosen;
    },
    getchooseProductLength() {
      console.log(this.choosenProduct.length);
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
