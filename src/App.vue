<template>
  <div class="todo-app">
    <h1>Todo List</h1>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add new todo">
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" :checked="todo.completed" @change="toggleTodo(todo.id)">
        <input v-if="editingId === todo.id" v-model="editText" @keyup.enter="finishEditing">
        <button v-if="editingId === todo.id" @click="finishEditing">Done</button>
        <span v-if="editingId !== todo.id" :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button v-if="editingId !== todo.id" @click="startEditing(todo)">Edit</button>
        <button v-if="editingId !== todo.id" @click="removeTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from 'vue'
import {useTodoStore} from './stores/todoStore'
import {storeToRefs} from 'pinia'

export default defineComponent({
  name: 'App',
  setup() {
    const todoStore = useTodoStore()
    const {todos} = storeToRefs(todoStore)
    const {addTodo, removeTodo, toggleTodo, editTodo, loadTodos} = todoStore

    const newTodo = ref('')
    const editingId = ref<number | null>(null)
    const editText = ref('')

    const startEditing = (todo: { id: number; text: string }) => {
      editingId.value = todo.id
      editText.value = todo.text
    }

    const finishEditing = () => {
      if (editingId.value !== null) {
        editTodo(editingId.value, editText.value)
        editingId.value = null
      }
    }

    onMounted(() => {
      loadTodos()
    })

    return {
      todos,
      newTodo,
      editingId,
      editText,
      addTodo: () => {
        if (newTodo.value.trim()) {
          addTodo(newTodo.value.trim())
          newTodo.value = ''
        }
      },
      removeTodo,
      toggleTodo,
      startEditing,
      finishEditing
    }
  }
})
</script>

<style scoped>
.todo-app {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 500px;
  min-width: fit-content;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(227, 227, 212, 0.2);
}

h1 {
  margin-bottom: 15px;
  margin-top: 5px;
}

ul {
  list-style-type: none;
  padding: 0;
}

span {
  margin-right: 3px;
}

input[type="text"] {
  flex-grow: 1;
  margin-right: 10px;
}

li {
  margin-bottom: 10px;
}

button {
  margin-left: 5px;
}

.completed {
  text-decoration: line-through;
  color: #888;
}
</style>
