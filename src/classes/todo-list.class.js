import { Todo } from ".";


export class TodoList {

  constructor () {
    this.cargarLocalStorage();
  }

  nuevoTodo ( todo ) {
    this.todos.push(todo);
    this.guardarLocalStorage();
  }

  eliminarTodo ( id ) {
    this.todos = this.todos.filter((todo) => todo.id !== parseInt(id) );
    this.guardarLocalStorage();
  }

  marcarCompletado ( id ) {
    for (const todo of this.todos) {
      if (todo.id === parseInt(id)) {
        todo.completado = !todo.completado;
        this.guardarLocalStorage();
        break;
      }
    }
  }

  eliminarCompletados () {
    this.todos = this.todos.filter((todo) => !todo.completado );
    this.guardarLocalStorage();
  }

  guardarLocalStorage () {
    localStorage.setItem('todo', JSON.stringify(this.todos));
  }

  cargarLocalStorage () {
    this.todos = ( localStorage.getItem('todo') ) ? JSON.parse(localStorage.getItem('todo')) : [];
    // Convertir a instancias de la clase ToDo
    this.todos = this.todos.map( Todo.fromJson );
  }

}
