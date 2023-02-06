import Vue from "vue"
import Vuex from "vuex"
import Fetch from "../js/Fetch"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    info: {
      id: "",
      is_superuser: ""
    }
  },
})

export const state = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(store)
  }, 10);
})

export default store