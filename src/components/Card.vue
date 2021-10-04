<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title">
        {{ list.name }}
      </div>
      <span class="card-remove" @click="removeList(list)">✖️</span>
    </div>
    <div class="card-inner">
      <Item v-for="item in items" :key="item.id" :item="item" />
    </div>
    <div class="card-footer">
      <input
        class="card-input"
        autocomplete="off"
        placeholder="New item"
        v-model="newItem"
        @keyup.enter="addItem"
      />
      <div class="card-buttons">
        <button
          @click="done = false"
          type="button"
          class="button"
          :class="
            done === false ? 'button--state-active' : 'button--state-noactive'
          "
        >
          All
        </button>
        <button
          @click="done = true"
          type="button"
          class="button"
          :class="
            done === true ? 'button--state-active' : 'button--state-noactive'
          "
        >
          Done
        </button>
      </div>
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
        (item) => item.list.id === this.list.id
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
        list: this.list,
      });
      this.newItem = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 1rem 1%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 98%;
  border: 1px solid gray;
  border-radius: 5px;

  &-header {
    margin-bottom: 3px;
    display: flex;
    justify-content: space-between;
    font-size: 32px;
  }

  &-title {
    line-height: 1;
  }

  &-footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .button {
    &--state-active {
      background-color: #42b983;
    }

    &--state-noactive {
      background-color: transparent;
    }
  }

  @media (min-width: 1024px) {
    flex: 0 0 48%;
  }

  @media (min-width: 1400px) {
    flex: 0 0 31%;
  }

  @media (min-width: 1920px) {
    flex: 0 0 23%;
  }
}
</style>
