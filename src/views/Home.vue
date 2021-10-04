<template>
  <div class="home">
    <div class="container">
      <h1>Shopping list</h1>
      <p @click="add = true" v-if="!add">Add list ➕</p>
      <input
        v-if="add"
        class="input"
        placeholder="New list"
        v-model="newList"
        @keyup.enter="addList"
        @blur="add = false"
      />
      <div class="list">
        <Card v-for="list in $store.state.lists" :key="list.id" :list="list" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "Home",
  components: {
    Card,
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

<style lang="scss" scoped>
.home {
  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
