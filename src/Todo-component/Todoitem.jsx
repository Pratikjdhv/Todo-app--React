import { Check, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { SquarePen } from "lucide-react";
import {Trash2 } from "lucide-react";
import {X} from 'lucide-react'
import Checkbox from "./Checkbox";

const Todoitem = ({
  item,
  handletoggle,
  ontododelete,
  OnTodoEditUpdate,
  onMoveUp,
  onMoveDown,
  index,
  todosCount,
}) => {
  const [showedittodo, setedittodo] = useState(false);

  function handleEditTodo(e) {
    e.preventDefault();
    const todoText = e.target["todo"].value;
    OnTodoEditUpdate(item.id, todoText);
    setedittodo(false);
  }

  const todoEditForm = (
    <div className="flex bg-gray-900 px-4 py-2 justify-between items-center rounded-lg min-h-20 group">
      <form className="flex-1 flex gap-2 px-2 items-center " onSubmit={handleEditTodo}>
        <input className="flex-1 border border-secondary rounded-lg px-4 py-2 font-body" type="text" name="todo" defaultValue={item.text} />
        <button className="hover:bg-gray-700 rounded-md cursor-pointer p-1 text-green-400">
          <Check />
        </button>
        <button className="hover:bg-gray-700 rounded-md cursor-pointer p-1 text-red-400" onClick={() => setedittodo(false)}>
          <X />
        </button>
      </form>
    </div>
  );

  const todoitem = (
    <div className="flex items-center justify-between gap-4 hover:bg-gray-800 rounded-lg px-4 py-2 group">
      <div className="flex flex-col text-secondary gap-1">
        <button
          className="hover:bg-gray-700 rounded-md cursor-pointer p-1"
          disabled={index == 0}
          onClick={() => onMoveUp(index)}
        >
          <ChevronUp />
        </button>
        <button
          className="hover:bg-gray-700 rounded-md cursor-pointer p-1"
          disabled={index == todosCount - 1}
          onClick={() => onMoveDown(index)}
        >
          <ChevronDown />
        </button>
      </div>

      <div className="flex-1 flex gap-4 items-center ">
        
        <Checkbox 
          id={item.id}
          checked={item.completed}
          onChange={(e) => handletoggle(item.id, e.target.checked)}
          label={item.text}
        />
      </div>

      <div className="hidden group-hover:flex gap-4">
        <button 
        className="hover:bg-gray-700 rounded-md cursor-pointer p-2"
        onClick={() => setedittodo(true)}>
          <SquarePen />
        </button>
        <button
        className="text-red-400 hover:bg-gray-700 rounded-md cursor-pointer p-2"
        onClick={() => ontododelete(item.id)}>
          <Trash2 />
        </button>
      </div>
    </div>
  );

  return (
    <div className="border-t border-secondary pt-3">
      {showedittodo ? todoEditForm : todoitem}
    </div>
  );
};

export default Todoitem;
