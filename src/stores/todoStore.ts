import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Todo {
    id: number
    text: string
    completed: boolean
}

export const useTodoStore = defineStore('todo', () => {
    const todos = ref<Todo[]>([])

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            text,
            completed: false
        }
        todos.value.push(newTodo)
        saveTodos()
    }

    const removeTodo = (id: number) => {
        todos.value = todos.value.filter(todo => todo.id !== id)
        saveTodos()
    }

    const toggleTodo = (id: number) => {
        const todo = todos.value.find(todo => todo.id === id)
        if (todo) {
            todo.completed = !todo.completed
            saveTodos()
        }
    }

    const editTodo = (id: number, newText: string) => {
        const todo = todos.value.find(todo => todo.id === id)
        if (todo) {
            todo.text = newText
            saveTodos()
        }
    }

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos.value))
    }

    const loadTodos = () => {
        const savedTodos = localStorage.getItem('todos')
        if (savedTodos) {
            todos.value = JSON.parse(savedTodos)
        }
    }

    return {
        todos,
        addTodo,
        removeTodo,
        toggleTodo,
        editTodo,
        loadTodos
    }
})