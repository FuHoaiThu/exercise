import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users:[],
        filterUser: [],
        filteredIdUser:[],
        choosenUser: [],
        searchWord: null,
    },
    getters: {
        getchooseProduct(state, getters) {
            return state.chooseProduct
        },
        getUser(state) {
            return state.users
        },
        getSearchWord(state) {
            return state.searchWord
        },
        getFilterUser(state) {
            return state.filterUser
        },
        getChoosenUser(state) {
            return state.choosenUser
        }
    },
    actions: {
        getUser({state, commit},) {
            let urlBase = "https://jsonplaceholder.typicode.com/users"
            axios.get(urlBase)
                .then(response => {
                    commit('SET_USER', response.data)
                }) 
        },
        filterUser({state, commit}, value) {
            if(!value || value=='') {
                commit('RESTART_FILTER_USER', value)
            }
            else {
                commit('FILTER_USER', value)
            }
        },
        choosenUser({state, commit}, user) {
            commit("USER_CHOOSEN", user)
            // commit('DELETE_FILTER_USER', user)
        },
        removeChoosenUser({state, commit}, user) {
            commit("DELETE_USER_CHOOSEN", user)
        }
    },
    mutations: {
        SET_USER(state, user) {
            state.users = user
        },
        RESTART_FILTER_USER(state, word) {
            state.searchWord = null
            state.filterUser = []
        },
        FILTER_USER(state, word) {
            state.searchWord = word
            word = word.trim().toLowerCase()
            state.filterUser = state.users.filter(user => {
                let hasUserChoose = state.choosenUser.find(item => {
                    return item.id == user.id
                })
                return (user.name.toLowerCase().includes(word) && (!hasUserChoose))
            })
        },
        USER_CHOOSEN(state, user) {
            state.choosenUser.push({
                id: user.id,
                name: user.name
            })
            state.filterUser = []
            state.searchWord = null
        },
        // DELETE_FILTER_USER(state, user) {
        //     let index = state.filterUser.indexOf(user)
        //     state.filterUser.splice(index, 1)
        //     state.searchWord=null
        // },
        DELETE_USER_CHOOSEN(state, user) {
            let index = state.choosenUser.indexOf(user)
            state.choosenUser.splice(index, 1)
            state.filterUser.push(user)
        }
    }
})