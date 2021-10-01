<template>
  <div class="list">
    <div class="list-title">
      <p>{{ list.name }}</p>
      <span @click="removeList(list)">✖️</span>
    </div>
    <input
      class="new-item"
      autofocus
      autocomplete="off"
      placeholder="new item"
      v-model="newItem"
      @keyup.enter="addItem"
    />
    <button
      @click="done = false"
      type="button"
      class="button"
      :class="{ 'button--state-active': !done }"
    >
      All
    </button>
    <button
      @click="done = true"
      type="button"
      class="button"
      :class="{ 'button--state-active': done }"
    >
      Done
    </button>
    <div class="items">
      <Item v-for="item in items" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item";

export default {
  props: {
    list: {
      type: Object,
    },
  },
  data() {
    return {
      add: false,
      newItem: "",
      done: false,
    };
  },
  components: {
    Item,
  },
  computed: {
    items() {
      let items = this.$store.state.items.filter(
        (item) => item.listId === this.list.id
      );
      if (this.done) {
        items = this.$store.state.items.filter((item) => item.done === true);
      }
      return items;
    },
  },
  methods: {
    removeList(list) {
      this.$store.dispatch("removeList", list);
    },
    addItem() {
      if (this.newItem === "") {
        return;
      }
      this.$store.commit("addItem", {
        name: this.newItem,
        id: this.$store.state.items.length
          ? Math.max(...this.$store.state.items.map((l) => l.id)) + 1
          : 0,
        done: true,
        listId: this.list.id,
        listName: this.list.name,
      });
      this.newItem = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  &-title {
    display: flex;
    align-items: center;

    p {
      margin: 0;
      font-size: 32px;
    }
  }
  .button {
    &--state-active {
      background-color: green;
    }
  }
  .items {
    padding-left: 30px;
  }
}
</style>
