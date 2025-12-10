import React from 'react'

const Todoitem = ({item , handletoggle ,ontododelete }) => {


  return (
    <div>
        <input 
        id = {item.id}
        checked={item.completed}
        type="checkbox"  
        onChange={(e) => handletoggle(item.id , e.target.checked)}
        />
        <label htmlFor={item.id}
        style={{textDecoration : item.completed ? 'line-through' : 'none'}}>
        {item.text}</label>

        <button onClick={() => ontododelete(item.id)}>
            Delete
        </button>
    </div>
  )
}

export default Todoitem