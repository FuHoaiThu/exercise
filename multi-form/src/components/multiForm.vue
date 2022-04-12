<template>
    <div>
        <section class="tabs">
            <!--tab title-->
            <div class="tabs-mark">
                <div class="tabs-mark__acitve" :style="{width: 34 * (activeStep+1) + '%'}"></div>
            </div>
            <div class="row tabs-wrapper">
                <div
                    class="col-lg-4 col-md-4 tabs-item p-0"
                    v-for="(step, index) in formSteps"
                    :key="index">
                    <div :class="{'active': index===activeStep}">
                        <div class="tabs-title">
                            <p class="tabs-title__indx">{{index + 1}}</p>
                            <p class="tabs-title__cont">{{formSteps[index].title}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--tab content-->
            <div class="tabs-content tabs-wrapper">
                <div
                    class="input-field"
                    v-for="(field, index) in formSteps[activeStep].fields"
                    :key="index">
                    <label class="input-field__label">{{field.label}}</label>
                    <input
                        class="input-field__text"
                        :class="{'input-error': field.valid === false}"
                        type="text"
                        v-model="field.value"
                        required="required"
                        @click="checkField(field)"
                        @change="checkField(field)"/>
                    <p
                        class="input-field__error"
                        :style="[field.valid ? {display: 'none'} : {display: 'block'}]">The field is required!</p>
                </div>
            </div>
                <!--tabs action-->
                <div class="tabs-action">
                    <button
                        class="btn tabs-action__btn tabs-btn--green"
                        v-if="activeStep >= 0"
                        @click="preivousStep">previous</button>
                    <button
                        class="btn tabs-action__btn tabs-btn--blue"
                        v-if="activeStep+1 < formSteps.length"
                        @click="nextStep">next</button>
                </div>
            </section>
        </div>
    </template>
    <script>
        export default {
            data: () => {
                return {
                    activeStep: 0,
                    error: false,
                    formSteps: [
                        {
                            title: "About You",
                            fields: [
                                {
                                    label: "Full Name",
                                    value: '',
                                    valid: true,
                                    pattern: /.+/
                                }, {
                                    label: "Email",
                                    value: '',
                                    valid: true,
                                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                                }
                            ]
                        }, {
                            title: "About your Company",
                            fields: [
                                {
                                    label: "Address",
                                    value: '',
                                    valid: true
                                }, {
                                    label: "City",
                                    value: '',
                                    valid: true
                                }, {
                                    label: "State",
                                    value: '',
                                    valid: true
                                }
                            ]
                        }, {
                            title: "Finishing Up",
                            fields: [
                                {
                                    label: "Thanh you for participarting"
                                }
                            ]
                        }
                    ]
                }
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
                checkFields() {
                    let valid = true;
                    this
                        .formSteps[this.activeStep]
                        .fields
                        .forEach(field => {
                            if (!field.pattern.test(field.value)) {
                                valid = false;
                                field.valid = false;
                            } else {
                                field.valid = true;
                            }
                        });
                    if (valid) {
                        this.error = false;
                        this.nextStep();
                    } else {
                        this.error = true;
                    }
                },
                checkField(field) {
                    console.log(field.value);
                    if (field.value === '' || !field.pattern.test(field.value)) {
                        field.valid = false;
                    } else {
                        field.valid = true;
                    }
                }
            }
        }
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
            box-shadow: 0 4px 10px rgba(0, 0, 0, .2), 6px 12px 20px rgba(0, 0, 0, .1);
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
            margin-bottom: 6px;
        }
        .input-field__text {
            color: #586068;
            font-size: 1rem;
            width: 100%;
            padding: 8px 16px;
            border-radius: 4px;
            border: 1px solid #ccc;
            outline: none;
            transition: all 0.2s ease;
        }
        .input-field__error {
            color: #aa4651;
            font-size: 0.75rem;
            padding-top: 8px;
            display: none;
        }
        .input-error {
            box-shadow: 0 0 4px #f4b6c1;
            border: 1px solid #aa4651;
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
    </style>