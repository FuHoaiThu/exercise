<template>
  <div>
    <section class="tabs">
      <!--tab title-->
      <div class="tabs-mark">
        <div
          class="tabs-mark__acitve"
          :style="{ width: 34 * (activeStep + 1) + '%' }"
        ></div>
      </div>
      <div class="row tabs-wrapper">
        <div
          class="col-lg-4 col-md-4 tabs-item p-0"
          v-for="(step, index) in formSteps"
          :key="index"
        >
          <div :class="{ active: index === activeStep }">
            <div class="tabs-title">
              <p class="tabs-title__indx">{{ index + 1 }}</p>
              <p class="tabs-title__cont">{{ formSteps[index].title }}</p>
            </div>
          </div>
        </div>
      </div>
      <!--tab content-->
      <div class="tabs-content tabs-wrapper">
        <!--input field-->
        <div
          class="input-field"
          v-for="(field, index) in formSteps[activeStep].fields"
          :key="index"
        >
          <label class="input-field__label">{{ field.label }}</label>
          <div class="position-relative">
            <input
              class="input-field__text"
              :class="{ 'input-error': !field.valid }"
              type="text"
              v-model="field.value"
              value="field.value"
              required="required"
              @click.prevent="checkField(field)"
              @keyup="checkField(field)"
            />
          </div>
          <p
            class="input-field__error"
            :style="[field.valid ? { display: 'none' } : { display: 'block' }]"
          >
            {{ field.error }}
          </p>
        </div>
        <!--select option-->
        <div
          v-if="activeStep === formSteps.length - 1"
          class="position-relative"
        >
          <span>{{ formSteps[activeStep].label }}</span>
          <div
            class="select-option position-relative"
            :class="{ 'input-error': !choose }"
            @click="showOption = !showOption"
          >
            <span class="select-option__cont">{{
              formSteps[activeStep].value
            }}</span>
            <span class="input-field__icon"></span>
          </div>
          <p
            class="input-field__error"
            :style="[choose ? { display: 'none' } : { display: 'block' }]"
          >
            The field is required!
          </p>
          <div class="select-option__list" v-if="showOption">
            <ul>
              <li
                v-for="(item, index) in options"
                :key="index"
                @click="selectedOption(item.value)"
              >
                <p>{{ item.value }}</p>
              </li>
            </ul>
          </div>
          <form class="chekbox">
            <input type="checkbox" v-model="checked" />
            <label> I accept terms & conditions</label>
            <p
              class="input-field__error p-0"
              :style="[checked ? { display: 'none' } : { display: 'block' }]"
            >
              The field is required!
            </p>
          </form>
        </div>
      </div>
      <!--tabs action-->
      <div class="tabs-action">
        <!--previous-->
        <button
          class="btn tabs-action__btn tabs-btn--green"
          v-if="activeStep >= 0 && activeStep + 1 < formSteps.length"
          @click="preivousStep"
        >
          previous
        </button>
        <!--next-->
        <button
          class="btn tabs-action__btn tabs-btn--blue"
          v-if="activeStep + 1 < formSteps.length"
          @click="checkFieldAll"
        >
          next
        </button>
        <!--Reset-->
        <button
          class="btn tabs-action__btn tabs-btn--blue"
          v-if="activeStep === formSteps.length - 1"
          @click="resetForm"
        >
          reset
        </button>
        <!--send-->
        <button
          class="btn tabs-action__btn tabs-btn--green"
          v-if="activeStep === formSteps.length - 1"
          @click="sendInfo(checked)"
        >
          send
        </button>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      activeStep: 0,
      choose: false,
      checked: false,
      checkbox: false,
      showOption: false,
      formSteps: [
        {
          title: "About You",
          fields: [
            {
              label: "Full Name",
              value: "",
              valid: true,
              pattern: /^[A-Za-z ]+$/,
              error: "The field is required!"
            },
            {
              label: "Email",
              value: "",
              valid: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              error: "The field is required!"
            }
          ]
        },
        {
          title: "About your Company",
          fields: [
            {
              label: "Your Company Name",
              value: "",
              valid: true,
              pattern: /^[A-Za-z ]+$/,
              error: "The field is required!"
            },
            {
              label: "Number of Employees",
              value: "",
              valid: true,
              pattern: /^[0-9]+$/,
              error: "The field is required!"
            }
          ]
        },
        {
          title: "Finishing Up",
          label: "From Where did you hear about us",
          value: "-- Choose anwser --",
          fields: []
        }
      ],
      options: [
        { value: "Friend" },
        { value: "Facebook" },
        { value: "Website" }
      ]
    };
  },
  methods: {
    nextStep() {
      this.activeStep++;
    },
    preivousStep() {
      if (this.activeStep === 0) {
        return;
      }
      this.activeStep--;
    },
    checkFieldAll() {
      let valid = true;
      this.formSteps[this.activeStep].fields.forEach(field => {
        if (!field.pattern.test(field.value)) {
          valid = false;
          field.valid = false;
        } else {
          field.valid = true;
        }
      });
      if (valid) {
        this.nextStep();
      }
    },
    checkField(field) {
      if (field.value === "" || !field.pattern.test(field.value)) {
        field.valid = false;
      } else {
        field.valid = true;
      }
      if (
        field.label === "Email" &&
        !field.pattern.test(field.value) &&
        field.value != ""
      ) {
        field.error = "The field must be email!";
      }
      if (
        field.label === "Number of Employees" &&
        !field.pattern.test(field.value) &&
        field.value != ""
      ) {
        field.error = "Should be a valid value!";
      }
    },
    selectedOption(value) {
      this.formSteps[this.formSteps.length - 1].value = value;
      this.showOption = false;
      this.choose = true;
    },
    resetForm() {
      this.activeStep = 0;
      this.formSteps.forEach(step => {
        step.fields.forEach(field => {
          field.value = "";
        });
      });
    },
    sendInfo(checked) {}
  }
};
</script>
<style scoped="scoped">
.tabs {
  max-width: 900px;
  margin: 0 auto;
  padding-top: 50px;
}
.tabs-wrapper {
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2), 6px 12px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}
.tabs-title__cont,
.tabs-title__indx {
  display: inline-block;
  vertical-align: middle;
}
.tabs-title {
  padding: 8px 20px;
  border-radius: 12px;
  background-color: #f3f3f3;
  width: fit-content;
  width: -moz-fit-content;
  margin: 0 auto;
}
.tabs-item:first-child .tabs-title {
  margin-left: 0;
}
.tabs-item:last-child .tabs-title {
  margin-right: 0;
}
.tabs-title__indx {
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 50%;
  color: #f7f7f7;
  background-color: #969899;
  text-align: center;
  margin-right: 8px;
}
.tabs-title__cont {
  color: #8f9294;
  font-size: 0.875rem;
  font-weight: 500;
}
.active .tabs-title {
  border: 2px solid #9fbcd7;
}
.tabs-mark {
  width: 100%;
  height: 18px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 15px;
}
.tabs-mark__acitve {
  height: 100%;
  width: 0;
  background-color: #437fe8;
  border-radius: 12px;
  transition: width 0.5s ease;
}
.input-field {
  margin-bottom: 12px;
}

.input-field__label {
  display: block;
  font-family: "Poppins-Regular", sans-serif;
  margin-bottom: 6px;
}
.input-field__text {
  color: #000;
  font-family: "Poppins-Regular", sans-serif;
  font-size: 0.875rem;
  width: 100%;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  transition: all 0.2s ease;
  position: relative;
}
.input-field__text:focus {
  border: 2px solid #9fbcd7;
}
.input-field:last-child .input-field__text {
  cursor: pointer;
}
.input-field__icon {
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 6px solid #262626;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
}
.input-field__error {
  color: #aa4651;
  font-family: "Poppins-Regular", sans-serif;
  font-size: 0.75rem;
  padding-top: 8px;
  display: none;
}
.tabs-action {
  width: 100%;
  margin-top: 50px;
  text-align: center;
}
.tabs-action__btn {
  display: inline-block;
  outline: none;
  border: unset;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
  padding: 8px 24px;
  cursor: pointer;
  box-shadow: 1px 1px 10px rgb(0 0 0 / 40%);
  transition: box-shadow 0.3s ease-out;
  margin: 0 7.5px;
}
.tabs-btn--green {
  background-color: #72e6b1;
}
.tabs-btn--blue {
  background-color: #1e68cf;
}
.tabs-action__btn:hover {
  box-shadow: 1px 1px 10px rgb(0 0 0 / 40%), 6px 6px 12px rgb(0 0 0 / 20%);
}
.select-option {
  border: 1px solid #ccc;
  border-radius: 6px;
  position: relative;
  cursor: pointer;
  padding: 10px 12px;
}
.select-option__cont {
  font-family: "Poppins-Regular", sans-serif;
  font-size: 0.875rem;
}
.select-option__list {
  padding: 12px 0;
  border-radius: 12px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 4px 8px rgb(0 0 0 / 20%);
  position: absolute;
  top: 80px;
  left: 0;
  transition: all 0.3s ease;
}
.select-option__list li {
  padding: 8px 16px;
  transition: all 0.2s ease;
  cursor: pointer;
}
.select-option__list li p {
  font-family: "Poppins-Regular", sans-serif;
  font-size: 0.875rem;
}
.select-option__list li:hover {
  background-color: #bdc3c7;
}
.chekbox {
  padding-top: 20px;
}
.chekbox label {
  margin-left: 6px;
  font-family: "Poppins-Regular", sans-serif;
  font-size: 0.875rem;
  vertical-align: top;
}
.input-error {
  box-shadow: 0 0 4px #f4b6c1;
  border: 1px solid #aa4651;
}
</style>
