<template>
  <div class="search">
    <div class="container">
      <h1>Search items</h1>
      <input
        class="input"
        autofocus
        autocomplete="off"
        placeholder="Search"
        v-model="query"
      />
      <ul>
        <li v-for="item in items" :key="item.id">
          <Item :item="item" :showListName="true" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item";

export default {
  components: {
    Item,
  },
  data() {
    return {
      query: null,
    };
  },
  beforeCreate() {
    this.$store.commit("init");
  },
  computed: {
    items() {
      if (this.query === "") {
        return [];
      }
      return this.$store.state.items.filter((item) =>
        item.name.includes(this.query)
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
