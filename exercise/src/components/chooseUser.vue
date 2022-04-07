<template>
  <div class="choosen-product" ref="widthItem">
    <ul class="choosen-product__wrapper">
      <li v-for="(user, index) in choosenUser" :key="index" ref="item">
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
      width: 0,
      windowWidth: 0,
      windowHeight: 0,
      windowTop: 0
    };
  },
  computed: {},
  methods: {
    getWindowWidth() {
      if (this.choosenUser.length > 0) {
        this.windowWidth =
          this.$refs.item[this.choosenUser.length - 1].getBoundingClientRect()
            .right - this.$refs.item[0].getBoundingClientRect().left;
      }
      this.$emit("childWidth", this.windowWidth);
    },
    getWindowHeight() {
      this.windowHeight = this.$refs.widthItem.clientHeight;
      this.$emit("childHeight", this.windowHeight);
    },
    getWindowTop() {
      if (this.choosenUser.length > 0) {
        this.windowTop =
          this.$refs.item[this.choosenUser.length - 1].getBoundingClientRect()
            .top - this.$refs.item[0].getBoundingClientRect().top;
        this.$emit("childTop", this.windowTop);
      }
    },
    removeChoosenUser(user) {
      this.$store.dispatch("removeChoosenUser", user);
      this.windowWidth = this.$refs.widthItem.clientWidth;
    }
  },
  updated() {
    this.getWindowWidth();
    this.getWindowHeight();
    this.getWindowTop();
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
