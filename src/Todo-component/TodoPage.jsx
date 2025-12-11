import {useState} from 'react'
import Todoitem from './Todoitem';
import { Plus, Rabbit } from 'lucide-react';
import { Trash2 } from 'lucide-react';

const TodoPage = () => {

    const [todos , setTodos ] = useState([]);

    const handlesubmit = (e) => {
        e.preventDefault();
        const todotext = e.target.todo.value

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

    const emptystate = <div className='text-secondary flex flex-col items-center gap-4 mt-18'>
        <Rabbit size={45}/>
        <h3>Your ToDo's Are Empty </h3>

    </div>

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
        if(!todotext) return
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
    <div className='max-w-2xl lg:p-12 p-10 space-y-6 mx-auto '>
        <h1 className="text-center  font-display font-bold text-accent text-6xl">Super To-Do</h1>
        <p className='text-center text-lg font-light text-secondary italic'>Manage Your ToDos With Ease!</p>
        <form className="bg-gray-800 px-6 py-4 rounded-lg flex justify-between gap-4" onSubmit={handlesubmit}>
            <input 
            type="text" 
            name="todo"
            required
            placeholder='Enter To Do Here...'
            className='flex-1 font-body focus-outline-none'
            />
            <button className='bg-accent text-black rounded-lg p-3 cursor-pointer hover:bg-accent-hover transition-colors ' type="submit">
                <Plus />
            </button>
        </form>

        <div className='flex justify-center gap-6 '>
            {!istodosorted &&
            <button
            className='ring-2 px-4 py-2 rounded-lg ring-accent hover:bg-accent hover:text-black cursor-pointer '
            onClick={handlesorttodos}>Sort ToDos</button>}
            {!istodoEmpty &&
            <button 
            className='ring-2 px-4 py-2 rounded-lg ring-red-400 flex gap-2 hover:bg-red-400 hover:text-black cursor-pointer '
            onClick={handledelete}> 
            <Trash2 />
            Delete All 
            </button>}
        </div>
        {!istodoEmpty &&
            <p
            className='text-secondary text-right mt-10'
            >{completedtodos}/{todos.length} completed </p>}

        {!istodoEmpty ? 
        <div className='space-y-4 '>
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