<template>
  <div>
    <ul>
      <li v-for="(product, index) in products" :key="index">
        {{ product.title }} {{ product.price }}
      </li>
    </ul>
  </div>
</template>
<script>
import store from "@/store/index";
</script>
