import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [],
    items: [],
  },
  mutations: {
    init: (state) => {
      if (localStorage.getItem("lists")) {
        state.lists = JSON.parse(localStorage.getItem("lists"));

        if (localStorage.getItem("items")) {
          state.items = JSON.parse(localStorage.getItem("items"));
        }
      }
    },
    addList: (state, data) => {
      state.lists.push(data);
      localStorage.setItem("lists", JSON.stringify(state.lists));
    },
    removeList: (state, data) => {
      state.lists.splice(state.lists.indexOf(data), 1);
      localStorage.setItem("lists", JSON.stringify(state.lists));
    },
    addItem: (state, data) => {
      state.items.push(data);
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    editItem: (state, item) => {
      const index = state.items.findIndex((i) => i.id === item.id);
      state.items[index].name = item.name;
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    removeItem: (state, data) => {
      state.items.splice(state.items.indexOf(data), 1);
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    doneItem: (state, item) => {
      const index = state.items.findIndex((i) => i.id === item.id);
      state.items[index].done = !state.items[index].done;
      localStorage.setItem("items", JSON.stringify(state.items));
    },
  },
  actions: {
    removeList: ({ commit, state }, data) => {
      state.items
        .filter((item) => item.listId === data.id)
        .forEach((item) => {
          commit("removeItem", item);
        });
      commit("removeList", data);
    },
  },
  modules: {},
});
