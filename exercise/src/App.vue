<template>
  <div id="app">
    <div class="search">
      <Form></Form>
    </div>
  </div>
</template>

<script>
import Form from "./components/form.vue";
import HandleData from "./store/modules/handle";
export default {
  name: "App",
  components: {
    Form,
    HandleData
  }
};
</script>

<style>
@font-face {
  font-family: "noto-regular";
  src: url("./assets/font/Noto_Sans/NotoSans-Regular.ttf") format("truetype");
}

*,
body {
  padding: 0;
  margin: 0;
}
html {
  font-size: 14px;
}
body {
  font-family: "noto-regular";
  color: #333;
  font-weight: 400;
}
h2,
h3,
p,
ul {
  margin: 0;
}
ul li {
  list-style: none;
}
.search {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-container {
  max-width: 924px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
}
</style>
