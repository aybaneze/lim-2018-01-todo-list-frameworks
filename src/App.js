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
      user : null,
      notes: [ ]
      };    
      this.app =firebase.initializeApp(db_config);
      this.db = this.app.database().ref().child('notes');
      this.addNote = this.addNote.bind(this);
      this.removeNote = this.removeNote.bind(this);
      this.Google= this.Google.bind(this);
      this.logOut = this.logOut.bind(this);
      this.userLog = this.userLog.bind(this);
    }

    //se carga todos los datos
    componentDidMount(){
      firebase.auth().onAuthStateChanged(user=>{       
        this.setState({user})
      })
      const { notes } = this.state;
      this.db.on('child_added', snap => {    
        notes.push({
          noteId: snap.key,
          titulo: snap.val().titulo,
          content: snap.val().content,
         
        })
        this.setState({notes});
      });

      this.db.on('child_removed', snap => {
        for(let i=0; i <notes.length; i++){
          if(notes[i].noteId == snap.key){
            notes.slice(i, 1);
            // window.location.reload(true)
          }}        
        this.setState({notes});
      })
    }

    Google(){
      const provider = new firebase.auth.GoogleAuthProvider();
   
      firebase.auth().signInWithPopup(provider)
      .then(response=>console.log(`${response.user.email} ha iniciado sesión`))
      .catch((err=>console.log("${err.code} erro")))
   }
   
   logOut(){
     firebase.auth().signOut()
     .then(result=>{})
     .catch((err=>console.log("${err.code} erro")))
   }

   userLog(note){
    if(this.state.user){
      return (
        <div>
        <div className="noteHeader">
        <div className="logo"> 
         DataNotes<i class="fas fa-file-signature fa-1x"> </i>
        </div>
        <div className="signUp">
         <button onClick={this.logOut} className="btnSignUp">Cierra Sesión</button>
        </div>
        </div>
        <aside>
         <img src={this.state.user.photoURL} /> <br/>
          <p>{this.state.user.displayName}</p> <br/>
          <Form addNote={this.addNote}/>
        </aside>
        <div className="noteBody">       
           <ul>
            {
              this.state.notes.map(note=>{
              return(
                <Note
                content = {note.content}
                titulo = {note.titulo}
                noteId = { note.noteId}
                key={note.noteId}
                removeNote = {this.removeNote}
                editNote={this.removeNote}
                />
              )
            })
            }
          </ul>
         </div> 
          </div>)
    }else {
      return(
      <div>
        <div className="init">
          DataNotes<i class="fas fa-file-signature fa-1x icon"> </i>
        </div>
      <button className="btn" onClick={this.Google}>Inicia Sesión con Google</button>
      </div>
    )
    }
  }

    addNote (note,titulo){
      this.db.push().set({content: note,titulo:titulo});
    }

    removeNote(noteId){
      this.db.child(noteId).remove();
    }

    editNote(noteId){
      this.db.push().set({status: noteId});
    }
  
  render() {
    return (
      <div className="notesContainer">         
          {this.userLog(this.state.notes)}                
        </div>
    );
  }
}

export default App;