import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super(); //hereda todas las clases de component
    this.state = {
      notes: [{
        noteId: 1,
        content: 'hola'
        },
        {
          noteId: 2,
          content: 'chau' 
        }]
      }
    }
  
  render() {
    return (
      <div className="todoList">
        <div className="noteHeader">
          <h1>React</h1>
        </div>
        <div className="noteSection">
           <ul>
            {
              this.state.notes.map(note=>{
              return(
              <li key={note.noteId}>{note.content}</li>
              )
            })
            }
          </ul>
         </div>     
        </div>
    );
  }
}

export default App;
