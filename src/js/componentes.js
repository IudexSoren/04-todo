import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias al HTML
const divTodoList = document.querySelector('.todo-list');
const txtNewTodo = document.querySelector('.new-todo');
const btnClearCompleted = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {
   const htmlTodo = `
      <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
				<div class="view">
					<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
					<label>${ todo.tarea }</label>
					<button class="destroy"></button>
				</div>
				<input class="edit" value="${ todo.tarea }">
			</li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.appendChild( div.firstElementChild );

    return div.firstElementChild;
}


// Eventos

txtNewTodo.addEventListener('keyup', ( event ) => {
  // Presiona enter
  if (event.keyCode === 13 && txtNewTodo.value.length > 0) {
    const newTodo = new Todo( txtNewTodo.value );
    todoList.nuevoTodo(newTodo);
    crearTodoHtml(newTodo);
    txtNewTodo.value = '';
  }
});

divTodoList.addEventListener('click', ( event ) => {
  // input || label || button
  const nombreElemento = event.target.localName;
  // Obtener el li con el id
  const todoElemento = event.target.parentElement.parentElement;
  // Obtener id del todo
  const todoId = todoElemento.getAttribute('data-id');
  // Click en el check
  if ( nombreElemento.includes('input') ) {
    todoList.marcarCompletado( todoId );
    todoElemento.classList.toggle('completed');
  } else if ( nombreElemento.includes('button') ) { /* Click en button */
    todoList.eliminarTodo( todoId );
    divTodoList.removeChild(todoElemento);
  }
});

btnClearCompleted.addEventListener('click', () => {
  todoList.eliminarCompletados();
  // Eliminar HTML del todo de abajo hacia arriba
  for (let i = divTodoList.childElementCount - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];
    if (elemento.classList.contains('completed')) {
      divTodoList.removeChild(elemento);
    }
  }
});

ulFilters.addEventListener('click', ( event ) => {
  const filtro = event.target.text;
  if ( !filtro ) return; // Undefined

  anchorFiltros.forEach( elem => elem.classList.remove('selected') );
  event.target.classList.add('selected');

  for (const elemento of divTodoList.children) {
    elemento.classList.remove('hidden');

    const completado = elemento.classList.contains('completed');

    switch ( filtro ) {
      case 'Pendientes':
        if (completado) {
          elemento.classList.add('hidden');
        }
        break;
      case 'Completados':
        if (!completado) {
          elemento.classList.add('hidden');
        }
        break;
    }
  }

});