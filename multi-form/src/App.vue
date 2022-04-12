<template>
  <div id="app">
    <div class="multi-form">
      <MultiForm></MultiForm>
    </div>
  </div>
</template>

<script>
import MultiForm from "./components/multiForm.vue";

export default {
  name: "App",
  components: {
    MultiForm
  }
};
</script>

<style>
@font-face {
  font-family: "Poppins-Medium";
  src: url("./assets/Poppins/Poppins-Medium.ttf");
}
@font-face {
  font-family: "Poppins-Regular";
  src: url("./assets/Poppins/Poppins-Regular.ttf");
}
@font-face {
  font-family: "Poppins-Thin";
  src: url("./assets/Poppins/Poppins-Thin.ttf");
}
*,
body {
  padding: 0;
  margin: 0;
}
html {
  font-size: 16px;
}
body {
  font-family: "Poppins-Medium", sans-serif;
  font-size: 1rem;
  color: #000;
}
p {
  margin: 0;
}
.row {
  margin-left: 0;
  margin-right: 0;
}
ul li {
  list-style: none;
}
ul,
p {
  margin: 0;
  padding: 0;
}
</style>
