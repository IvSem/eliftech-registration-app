<template>
  <div v-if="!isLoading" class="pagination">
    <ul class="pagination__list">
      <li
        v-for="pageNumber in totalPage"
        :key="pageNumber"
        class="pagination__item"
        :class="{ 'bg-blue-500': pageNumber === page, 'hover:bg-blue-500': pageNumber !== page }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </li>
    </ul>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  totalPage: {
    type: Number,
    default: 0
  },
  page: {
    type: Number,
    default: 0
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:page'])

const changePage = (pageNumber) => {
  emits('update:page', pageNumber)
}
</script>

<style scoped>
.pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.pagination__list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
}

.pagination__item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid blue;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
