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

    function handledeleteTodo (id){
        const newtodos = todos.filter(item => item.id != id )
        setTodos (newtodos);
    }

    const emptystate = <h3>Nothing's Here , Add a ToDo </h3>

    const completedtodos= todos.filter(item => item.completed).length ;

    const istodoEmpty = todos.length == 0 
    
    const comparefunction = (a,b) => a.text.localeCompare (b.text) ;

    const istodosorted = todos.every((todo , index , arr ) =>{
        return index === 0 || comparefunction(arr[index-1], todo) <= 0 ;
    })

    function handledelete() {
        setTodos ([]) ;
    }

    function handlesorttodos() {
        const newtodos = [...todos] ;
        newtodos.sort(comparefunction) ;
        setTodos (newtodos) ;
    }

    function handleUpdateTodoText (id , todotext ){
        const newtodos = todos.map((item) => {
            if (item.id === id ){
                return {...todos , text: todotext }
            }
            return item 
        })
        setTodos(newtodos)
    }

    function handleMoveUp (index){
        if(index == 0) return ;
        const newtodos = [...todos];
        [newtodos[index] , newtodos[index -1 ]] = [newtodos[index-1] , newtodos[index]]
        setTodos(newtodos)
    }
    function handleMoveDown (index){
        if(index == todos.length - 1 ) return ;
        const newtodos = [...todos];
        [newtodos[index] , newtodos[index +1 ]] = [newtodos[index+1] , newtodos[index]]
        setTodos(newtodos)

    }


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

        {!istodosorted &&
            <button onClick={handlesorttodos}>Sort ToDos</button>}
        {!istodoEmpty &&
            <button onClick={handledelete}>Delete All </button>}
        {!istodoEmpty &&
            <p>{completedtodos}/{todos.length} completed </p>}

        {!istodoEmpty ? 
        <div>
            {todos.map((item , index) => (
                <Todoitem key={item.id} item={item} 
                handletoggle={handletoggle}
                ontododelete = {handledeleteTodo}
                OnTodoEditUpdate = {handleUpdateTodoText}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                index={index}
                todosCount={todos.length}
                />
            ))}
        </div> 
        : emptystate} 

        
    </div>
  )
}

export default TodoPage