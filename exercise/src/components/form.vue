<template>
  <div class="search-container">
    <div class="search-header">
      <div class="search-title">
        <h2 class="search-title__content">気づきを与えてくれたメンバー</h2>
      </div>
      <form class="search-form">
        <label class="search-form__lable">先輩や同僚、上司を検索</label>
        <div class="search-box__input" v-bind:class="{ choosen: true }">
          <input
            autocomplete="off"
            type="text"
            class="w-100 search-form__input"
            placeholder="検索してください"
            v-model="searchWord"
          />
          <div class="search-form__icon">
            <img src="../assets/search.svg" class="w-100" />
          </div>
          <div v-if="hasChoose">
            <ChoosenUser :choosenUser="choosenUser"></ChoosenUser>
          </div>
        </div>
        <div class="data-list">
          <ul class="data-list__wrapper">
            <li
              v-for="(user, index) in filterUser"
              :key="index"
              @click="chooseUser(user)"
            >
              {{ user.name }}
            </li>
          </ul>
        </div>
      </form>
      <div class="form-cont">
        <h3 class="form-cont__title">
          気づきを与えてくれた先輩や同僚、上司の一言
        </h3>
        <p class="form-cont__des">入力してください</p>
        <div class="aline"></div>
      </div>
      <div class="search-btn">
        <button></button>
        <p class="search-btn__content">
          メンバーを追加する
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import ChoosenUser from "./chooseUser.vue";

export default {
  components: {
    ChoosenUser
  },
  computed: {
    searchWord: {
      get() {
        return this.$store.getters.getSearchWord;
      },
      set(value) {
        this.$store.dispatch("filterUser", value);
      }
    },
    users() {
      return this.$store.getters.getUser;
    },
    filterUser() {
      return this.$store.getters.getFilterUser;
    },
    choosenUser() {
      return this.$store.getters.getChoosenUser;
    }
  },
  created() {},
  mounted() {
    this.$store.dispatch("getUser");
  },
  methods: {
    chooseUser(user) {
      this.$store.dispatch("choosenUser", user);
    },
    hasChoose() {
      if (this.choosenUser > 0) {
        return true;
      } else return 0;
    }
  }
};
</script>

<style scoped>
.search-title {
  width: 100%;
  margin-top: 20px;
  border-radius: 5px;
  background-color: #f8f8f8;
}
.search-title__content {
  padding: 4px 0 4px 10px;
  max-width: 487px;
  font-size: 18px;
  line-height: 30px;
}
.search-form {
  margin: 32px 10px 0 10px;
  max-width: 528px;
  position: relative;
}
.search-form__lable {
  display: block;
  max-width: 411px;
  max-height: 16px;
  font-size: 1rem;
  line-height: 22px;
  margin: 0;
}
.search-form__input {
  max-width: 528px;
  height: 40px;
  padding: 0 0 0 42px;
}
.search-form__input::placeholder {
  padding: 12px 0;
  font-size: 16px;
  color: #bfbfbf;
}
.search-box__input {
  position: relative;
  margin-top: 8px;
}

.search-form__icon {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 50%;
  left: 10px;
  transform: translate(0, -50%);
}
.form-cont {
  margin: 25px 0 25px 12px;
  max-width: 334px;
  position: relative;
}
.form-cont__title {
  font-size: 1rem;
  line-height: 24px;
  color: #666;
}
.form-cont__des {
  padding: 8px 0 0 8px;
  font-size: 1rem;
  line-height: 22px;
  color: #bfbfbf;
}
.aline {
  width: 770px;
  height: 1px;
  position: absolute;
  background-color: #dcdcdc;
  bottom: -8px;
  left: 0;
}
.search-btn {
  margin: 20px 0 31px 10px;
}
.search-btn__content {
  max-width: 141px;
  font-size: 1rem;
  line-height: 22px;
  color: #666;
  display: inline-block;
  vertical-align: middle;
}
.search-btn button {
  width: 24px;
  height: 24px;
  position: relative;
  border-radius: 50%;
  border: none;
  background-color: #627d98;
  display: inline-block;
  vertical-align: middle;
}
.search-btn button::before {
  content: "";
  width: 13px;
  height: 2px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.search-btn button::after {
  content: "";
  width: 13px;
  height: 2px;
  background-color: #fff;
  position: absolute;
  transform: translate(-50%, -50%) rotate(90deg);
}
.data-list {
  width: 100%;
  border: 1px solid #dcdcdc;
}
.data-list__wrapper {
  padding-top: 4px;
}
.data-list__wrapper li {
  padding: 10px 8px;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
}
.data-list__wrapper li:hover {
  background-color: #627d98;
}
.displayNone {
  display: none;
}
</style>
