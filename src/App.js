import React, { Component } from 'react';
import './App.css';
import Note from './componentes/Note.jsx';
import Form from './noteForm/form.jsx';
import firebase from 'firebase';
import {db_config} from './config/config.js';
import 'firebase/database'; 

class App extends Component {
  constructor(){
    super(); //hereda todas las clases de component
    this.state = {
      notes: 
      [
      
      ]
      };

      this.app =firebase.initializeApp(db_config);
      this.db = this.app.database().ref().child('notes');
      this.addNote = this.addNote.bind(this);
      this.removeNote = this.removeNote.bind(this);
    }

    //se carga todos los datos
    componentDidMount(){
      const { notes } = this.state;
      this.db.on('child_added', snap=>{
        
        notes.push({
          noteId: snap.key,
          content: snap.val().content 
        })

        this.setState({notes});
      });
      this.db.on('child_removed', snap => {
        for(let i=0; i <notes.length; i++){
          if(notes[i].noteId = snap.key){
            notes.splice(i, 1)
          }
        }
        this.setState({notes});
      })
    }

    addNote (note){
 
      this.db.push().set({content: note});
     
    }

    removeNote(noteId){
      this.db.child(noteId).remove();

    }
  
  render() {
    return (
      <div className="notesContainer">
        
        <div className="noteHeader">
          <h1>React</h1>
         </div>

        <div className="noteBody">
           <ul>
            {
              this.state.notes.map(note=>{
              return(
                <Note
                content = {note.content}
                noteId = { note.noteId}
                key={note.noteId}
                removeNote = {this.removeNote}
                />
              )
            })
            }
          </ul>
         </div> 

         <div className="noteFooter">
         <Form addNote={this.addNote}/>
        </div>   
        </div>
    );
  }
}

export default App;
