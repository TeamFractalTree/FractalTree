function Main() {
  const [todo, setTodo] = React.useState(JSON.parse(localStorage.todoList || "[]"));
  const [input, setInput] = React.useState("");

  const updateTodoStorage = () => {
    setTimeout(() => localStorage.todoList = JSON.stringify(todo), 0);
  }
  updateTodoStorage();

  const submit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodo([...todo, { id: Date.now(), text: input, completed: false }]);
      updateTodoStorage();
      setInput("");
    }
  };

  const toggle = (id) => {
    setTodo(
      todo.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    updateTodoStorage();
  };

  const del = (id) => {
    setTodo(todo.filter((todo) => todo.id !== id));
    updateTodoStorage();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 w-full">
        <div className="h-full bg-white">
          <div className="w-full h-full">
            <div className="divide-y divide-pink-200">
              <div className="p-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">
                  Todo List
                </h1>

                <form onSubmit={submit} className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-4 py-2 border focus:outline-none focus:border-pink-600"
                    placeholder="Add a new todo"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-600 text-white"
                  >
                    <Icons.IconPlus />
                  </button>
                </form>

                <ul className="space-y-3">
                  {todo.map((todo) => (
                    <li
                      key={todo.id}
                      className="flex items-center gap-3 p-3 bg-pink-50"
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggle(todo.id)}
                        className="w-4 h-4 text-pink-600"
                      />
                      <span
                        className={`flex-1 ${
                          todo.completed ? " text-gray-400 line-through" : ""
                        }`}
                      >
                        {todo.text}
                      </span>
                      <button
                        onClick={() => del(todo.id)}
                        className="hover:text-pink-700 text-pink-600 "
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
