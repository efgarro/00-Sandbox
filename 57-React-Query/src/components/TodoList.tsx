import * as React from "react";

import {
  useQueryTodos,
  useAddTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "../apiRequests/apiFns";
import { ITodo } from "../types/rqTypes";

const TodoList = () => {
  const [newTodo, setNewTodo] = React.useState("");

  const { isLoading, isError, error, data } = useQueryTodos();

  const addTodo = useAddTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  //   const todosList = data.map((todo: ITodo) => {
  //     return (
  //       <article key={todo.id}>
  //         <div className="todo">
  //           <input
  //             type="checkbox"
  //             checked={todo.completed}
  //             id={todo.id}
  //             onChange={() =>
  //               updateTodo.mutate({ ...todo, completed: !todo.completed })
  //             }
  //           />
  //           <label htmlFor={todo.id}>{todo.title}</label>
  //         </div>
  //         <button
  //           className="trash"
  //           onClick={() => deleteTodo.mutate({ id: todo.id })}
  //         >
  //           Trash
  //           {/* <FontAwesomeIcon icon={faTrash} /> */}
  //         </button>
  //       </article>
  //     );
  //   });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addTodo.mutate({
      userId: "1",
      title: "BBQ Paint",
      completed: false,
      id: "500",
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <React.Fragment>
      <h1>TodoList</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">Enter a new todo item</label>
        <div className="new-todo">
          <input
            type="text"
            id="new-todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo"
          />
        </div>
        <button className="submit">
          Upload
          {/* <FontAwesomeIcon icon={faUpload} /> */}
        </button>
      </form>
      {data.map((todo: ITodo) => {
        return (
          <article key={todo.id}>
            <div className="todo">
              <input
                type="checkbox"
                checked={todo.completed}
                id={todo.id}
                onChange={() =>
                  updateTodo.mutate({ ...todo, completed: !todo.completed })
                }
              />
              <label htmlFor={todo.id}>{todo.title}</label>
            </div>
            <button
              className="trash"
              onClick={() => deleteTodo.mutate({ id: todo.id })}
            >
              Trash
              {/* <FontAwesomeIcon icon={faTrash} /> */}
            </button>
          </article>
        );
      })}
    </React.Fragment>
  );
};

export default TodoList;
