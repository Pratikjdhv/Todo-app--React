import React, { useState } from 'react'

const Todoitem = ({item , handletoggle ,ontododelete  , OnTodoEditUpdate , onMoveUp , onMoveDown ,index ,todosCount }) => {

  const [showedittodo , setedittodo ] = useState(false);

  function handleEditTodo (e){
    e.preventDefault ()
    const todoText = e.target['todo'].value;
    OnTodoEditUpdate (item.id , todoText);
    setedittodo(false)
  }

  const todoEditForm =(
    <div>
      <form onSubmit={handleEditTodo} >
        <input type="text" name="todo" defaultValue={item.text}/>
        <button >
          Update 
        </button>
        <button onClick={() => setedittodo (false)} >
          Cancle 
        </button>
      </form>
    </div>
  );

  const todoitem = (
    <div>
        <button disabled={index==0}onClick={() => onMoveUp(index)}>⬆️</button>
        <button disabled={index==todosCount-1}onClick={() => onMoveDown(index)}>⬇️</button>
        <input 
        id = {item.id}
        checked={item.completed}
        type="checkbox"  
        onChange={(e) => handletoggle(item.id , e.target.checked)}
        />
        <label htmlFor={item.id}
        style={{textDecoration : item.completed ? 'line-through' : 'none'}}>
        {item.text}</label>

        <button onClick={() => setedittodo(true)}>Edit</button>
        <button onClick={() => ontododelete(item.id)}>
            Delete
        </button>
    </div>
  )



  return (
    <div>
      {showedittodo ? todoEditForm : todoitem}
    </div>
  )
}

export default Todoitem