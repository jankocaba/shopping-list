<template>
  <div class="item" :class="{ 'is-editing': item === editedItem }">
    <div class="item-inner">
      <input
        class="item-input"
        type="text"
        v-model="item.name"
        v-todo-focus="item === editedItem"
        @blur="doneEdit()"
        @keyup.enter="doneEdit()"
        @keyup.esc="cancelEdit()"
      />
      <div class="item-title">
        <input
          class="item-checkbox"
          type="checkbox"
          v-model="picked"
          @change="toggle"
        />
        <span @click="editItem()">
          {{ item.name }}
          <span v-if="showListName"> ({{ item.list.name }})</span>
        </span>
      </div>
      <span class="item-remove" @click="removeItem()">✖️</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
    showListName: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editedItem: null,
      picked: this.item.done,
    };
  },
  methods: {
    editItem() {
      this.beforeEdit = this.item.name;
      this.editedItem = this.item;
    },
    doneEdit() {
      if (!this.editedItem) {
        return;
      }
      this.editedItem = null;
      if (!this.item.name) {
        this.$store.commit("removeItem", this.item);
      }
      this.$store.commit("editItem", this.item);
    },
    cancelEdit() {
      this.editedItem = null;
      this.item.name = this.beforeEdit;
    },
    removeItem() {
      this.$store.commit("removeItem", this.item);
    },
    toggle() {
      this.$store.commit("doneItem", this.item);
    },
  },
  directives: {
    "todo-focus": (el, binding) => {
      if (binding.value) {
        el.focus();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  &-inner {
    display: flex;
    justify-content: space-between;
  }

  &-title {
    display: flex;
    align-items: center;
    font-size: 24px;
  }

  &-checkbox {
    margin-right: 10px;
  }

  &-input {
    display: none;
    height: 33px;
  }

  &.is-editing {
    .item-input {
      display: block;
    }

    .item-title {
      display: none;
    }
  }
}
</style>
