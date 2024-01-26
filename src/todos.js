import React from "react";

let nextId = 0;

export  function createTodo(text, completed = false) {
    return {
        id: nextId++,
        text,
        completed,
    };
}

export const initTodos = [
    createTodo('Get orange', true),
    createTodo('Get apple', true),
    createTodo('Get carrot', true),
];
