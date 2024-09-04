import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TiDelete } from 'react-icons/ti'
import '../css/style.css'

const Home = () => {
    const [Todos, SetTodos] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/get')
             .then(response => SetTodos(response.data))
             .catch(err => console.error(err))
    }, [])

    const [Task, setTask] = useState('')
    const AddTask = (task) => {
        
        axios.post('http://localhost:3001/add', {task})
             .then(response => SetTodos([...Todos, response.data]))
             .catch(err => console.error(err))
    }

    const handleAdd = () => {
        if( Task.trim()!== ''){
            AddTask(Task)
            setTask('')
        }
    }

    const handleCheck = (id) => {
        axios.put(`http://localhost:3001/update/${id}`)
             .then(response => {
                const updatedTodo = response.data
                SetTodos(prevTodos => prevTodos.map(todo => todo._id === id ? updatedTodo : todo))
             })
             .catch(err => console.error(err))
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
             .then(() => SetTodos(Todos.filter(todo => todo._id !== id)))
             .catch(err => console.error(err))
    }


    return (
        <div className='col-md-5 col-sm-10 col-8 col-lg-4  mx-auto my-5 border rounded p-5 shadow'>
            <h2 className='text-success'>To do List</h2>
            <div className='input-group my-4'>
                <input type="text" className='form-control p-2'  value={Task} onChange={(e) => setTask(e.target.value)} />
                <button type="submit" className='btn btn-success text-light' onClick={handleAdd}>Add+</button>
            </div>


            {
                Todos.length === 0 ? (<div> <h5 className='text-secondary'>Nothing to do</h5></div>) :
                Todos.map(todo => {
                    return (  
                    <div className=' m-2 border rounded d-flex align-items-center shadow-sm' key={todo._id}>
                        <input type="checkbox"  onChange={() => handleCheck(todo._id)} checked = {todo.done}
                        id="check"  className=' form-check-input col-2 mx-auto border border-success'
                        />
                        <label htmlFor="check" className='col-8 mx-auto'>
                            <h4 className='m-3 text-success p-md-2 col'>
                                {todo.done ? <s>{todo.task}</s> : todo.task}
                            </h4>
                        </label>
                        
                            <TiDelete color='red' size={50} className='col-2' id='delete' onClick={() => handleDelete(todo._id)}/>
                         
                         
                    </div>      
                )})
            }
        </div>
    );
};




export default Home;
