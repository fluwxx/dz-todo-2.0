import React, { useState, useEffect } from "react";
import { initTodos, createTodo } from "./todos";

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
};

const todoListStyle = {
    width: "400px",
    textAlign: "center",
};

const labelStyle = {
    display: "block",
    marginBottom: "10px",
};

const ulStyle = {
    listStyleType: "none",
    padding: "0",
};

const liStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #ccc",
    padding: "10px",
};

const buttonStyle = {
    marginLeft: "5px",
    cursor: "pointer",
    backgroundColor: '#4a8919'

};

export default function TodoList() {

        const [todos, setTodos] = useState(initTodos);
        const [showActive, setShowActive] = useState(false);
        const [activeTodos, setActiveTodos] = useState([]);
        const [visibleTodos, setVisibleTodos] = useState([]);
        const [footer, setFooter] = useState(null);

        useEffect(() => {
            setActiveTodos(todos.filter((todo) => !todo.completed));
        }, [todos]);

        useEffect(() => {
            setVisibleTodos(showActive ? activeTodos : todos);
        }, [showActive, todos, activeTodos]);

        useEffect(() => {
            setFooter(<footer>{activeTodos.length} todos left</footer>);
        }, [activeTodos]);

        const handleEditTodo = (id, newText) => {
            const updatedTodos = todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            );
            setTodos(updatedTodos);
        };

        const handleDeleteTodo = (id) => {
            const updatedTodos = todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos);
        };

        const handleToggleTodo = (id) => {
            const updatedTodos = todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            setTodos(updatedTodos);
        };


        return (
        <div style={containerStyle}>
            <div style={todoListStyle}>
                <label style={labelStyle}>
                    <input
                        type="checkbox"
                        checked={showActive}
                        onChange={(e) => setShowActive(e.target.checked)}
                    />
                    Show only active todos
                </label>
                <NewTodo onAdd={(newTodo) => setTodos([...todos, newTodo])} />
                <ul style={ulStyle}>
                    {visibleTodos.map((todo) => (
                        <li key={todo.id} style={liStyle}>
              <span
                  style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                  }}
              >
                {todo.text}
              </span>
                            <div>
                                <button
                                    style={buttonStyle}
                                    onClick={() =>
                                        handleEditTodo(
                                            todo.id,
                                            prompt("Edit task:", todo.text)
                                        )
                                    }
                                >
                                    Edit
                                </button>
                                <button
                                    style={buttonStyle}
                                    onClick={() => handleDeleteTodo(todo.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    style={buttonStyle}
                                    onClick={() => handleToggleTodo(todo.id)}
                                >
                                    Toggle
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                {footer}
            </div>
        </div>
    );
}

function NewTodo({ onAdd }) {
    const [text, setText] = useState("");

    function handleAddClick() {
        setText("");
        onAdd(createTodo(text));
    }

    return (
        <>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={handleAddClick}>добавить</button>
        </>
    );
}
