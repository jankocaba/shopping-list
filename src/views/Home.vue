<template>
  <div class="home">
    <div class="container">
      <h1>Shopping list</h1>
      <p v-if="!add">Add list <span @click="add = true">➕</span></p>
      <input
        v-if="add"
        class="new-list"
        placeholder="List"
        v-model="newList"
        @keyup.enter="addList"
        @blur="add = false"
      />
      <List v-for="list in $store.state.lists" :key="list.id" :list="list" />
    </div>
  </div>
</template>

<script>
import List from "@/components/List";

export default {
  name: "Home",
  components: {
    List,
  },
  data() {
    return {
      add: false,
      newList: "",
    };
  },
  beforeCreate() {
    this.$store.commit("init");
  },
  methods: {
    addList() {
      if (this.newList === "") {
        this.add = false;
        return;
      }
      this.$store.commit("addList", {
        name: this.newList,
        id: this.$store.state.lists.length
          ? Math.max(...this.$store.state.lists.map((l) => l.id)) + 1
          : 0,
      });
      this.add = false;
      this.newList = "";
    },
  },
};
</script>
