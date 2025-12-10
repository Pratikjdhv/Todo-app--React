import {useState} from 'react'
import Todoitem from './Todoitem';

const TodoPage = () => {

    const [todos , setTodos ] = useState([]);

    const handlesubmit = (e) => {
        e.preventDefault();
        const todotext = e.target.todo.value
        console.log(todotext)

        // todos.push(todotext); // not rerender component 
        // console.log(todos) // not rerender component
        // setTodos(todos);
        
        
        const newtodos = ([...todos , {
            text : todotext ,
            id : crypto.randomUUID() ,
            completed : false 
        }]);
        setTodos(newtodos);
        
        e.target.reset();
    }

    function handletoggle (id , checked ){
        const newtodos = todos.map((item) => {
            if(item.id === id){
                return {
                    ...item ,
                    completed : checked
                }
        }
        return item ;
    });
    setTodos (newtodos);
}

    function ontododelete (id){
        const newtodos = todos.filter(item => item.id != id )
        setTodos (newtodos);
    }

    const emptystate = <h3>Nothing's Here , Add a ToDo </h3>

  return (
    <div>
        <h1>Super To-Do</h1>
        <form onSubmit={handlesubmit}>
            <input 
            type="text" 
            name="todo"
            placeholder='Enter To Do Here...'
            />
            <button>Submit</button>
        </form>

        {todos.length > 0 ? <div>
            {todos.map((item) => (
                <Todoitem key={item.id} item={item} 
                handletoggle={handletoggle}
                ontododelete = {ontododelete}
                />
            ))}
        </div> 
        : emptystate} 

        
    </div>
  )
}

export default TodoPage