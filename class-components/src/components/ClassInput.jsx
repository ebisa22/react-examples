import { Component } from 'react';
import Count from './Count.jsx';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {id:crypto.randomUUID(),
         text:'Just some demo tasks'
        },
        {id:crypto.randomUUID(),
         text:'As an example'
        },
      ],
      inputVal: '',
      editingTodos:{}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
    this.handleEdit=this.handleEdit.bind(this);
    this.handleEditChange=this.handleEditChange.bind(this);
    this.handleResubmit=this.handleResubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat({id:crypto.randomUUID(),text:state.inputVal}),
      inputVal: '',
    }));
  }
  handleDelete(targetId){
    this.setState((state)=>({
      ...state,
      todos:state.todos.filter(todo=>targetId!==todo.id),
         
    }))
  }
  handleEdit(targetTodo){
    this.setState(state=>(
      {...state,
       editingTodos:{
        ...state.editingTodos,
        [targetTodo.id]:targetTodo.text
       }
      }
    ))
  }
  handleEditChange(e,targetId){
    this.setState(state=>(
      {
        ...state,
        editingTodos:{
          ...state.editingTodos,
          [targetId]:e.target.value
        }
      }
    ))
  }
  handleResubmit(targetId){
    const {[targetId]:removed,...rest}=this.state.editingTodos;
    this.setState(state=>(
      {
        ...state,
        todos:state.todos.map(todo=>{
          if(todo.id === targetId)
              return {...todo,text:state.editingTodos[targetId]}
          else
            return todo
        }),
        editingTodos:rest
      }
    ))
  
  }
  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => {
             const isBeingEdited=Object.hasOwn(this.state.editingTodos,todo.id)
             if(isBeingEdited){
                return (
                  <li key={todo}>
                    <input type="text" value={this.state.editingTodos[todo.id]} onChange={
                      (e)=>{
                        this.handleEditChange(e,todo.id)
                      }
                    } />
                    <button
                      onClick={() => {
                        this.handleDelete(todo.id);
                      }}
                      className="btn"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        this.handleResubmit(todo.id);
                      }}
                    >
                      ReSubmit
                    </button>
                  </li>
                );
             }
             else{
              return (
                <li key={todo.id}>
                  {todo.text}
                  <button
                    onClick={() => {
                      this.handleDelete(todo.id);
                    }}
                    className="btn"
                  >
                    Delete
                  </button>
                  <button onClick={()=>{
                    this.handleEdit(todo)
                  }}>Edit</button>
                </li>
              );
             } 
           
  })}
        </ul>
        <Count numberOfTodos={this.state.todos.length}/>
      </section>
    );
  }
}

export default ClassInput;
