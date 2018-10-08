import React, { Component } from 'react';
import './App.css';
import Note from './componentes/Note.jsx';
import Form from './noteForm/form.jsx';
import firebase from 'firebase';
import {db_config} from './config/config.js';
import 'firebase/database'; 

class App extends Component {
  constructor(props){
    super(props); //hereda todas las clases de component
    this.state = {
      notes: [ ]
      };    
      this.app =firebase.initializeApp(db_config);
      this.db = this.app.database().ref().child('notes');
      this.addNote = this.addNote.bind(this);
      this.removeNote = this.removeNote.bind(this);
      this.Google= this.Google.bind(this);
      this.logOut = this.logOut.bind(this);
      this.userLog = this.userLog.bind(this);
      this.List=this.List.bind(this);
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
          status: snap.val().status,
          text: snap.val().text
        })
        this.setState({notes});
      });

      this.db.on('child_removed', snap => {
        for(let i=0; i < notes.length; i++){
          if(notes[i].noteId == snap.key){
            notes.splice(i, 1);          
          }}        
        this.setState({notes});
      })
      this.db.on('child_changed', snap => {
        if (snap.val().status === false) {
         this.setState({ status: false});
      } else if (snap.val().status === true) {
         this.setState({ status: true});
    }  this.setState({notes});
      })
      }
   

    Google(){
      const provider = new firebase.auth.GoogleAuthProvider();  
      firebase.auth().signInWithPopup(provider)
      .then(response=>console.log(`${response.user.email} ha iniciado sesión`))
      .catch((err=>console.log("Error")))
   }
   
   logOut(){
     firebase.auth().signOut()
     .then(result=>{console.log(result)})
     .catch((err=>console.log(err)))
   }

   addNote (note,titulo){
    this.db.push().set({content: note,titulo:titulo,status:false, text: ''});
  }

  removeNote(noteId){
    this.db.child(noteId).remove();
  }

  List(id,status){
    const updateList = {};
    this.db.child(id).update({status: status})
    if(status){
      updateList[`/${id}/text`] =`Nota Completada`;
      this.db.update(updateList)
    }else{
      updateList[`/${id}/text`] =``;
      this.db.update(updateList)
    }
 }

   userLog(note){
    if(this.state.user){
      return (
        <div>
        <div className="noteHeader">
        <div className="logo"> 
         DataNotes<i className="fas fa-file-signature fa-1x"> </i>
        </div>
        <div className="signUp">
         <button onClick={this.logOut} className="btnSignUp">Cerrar Sesión</button>
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
                status= {note.status}
                removeNote = {this.removeNote}
                addNote={this.addNote}
                List={this.List}
                text={note.text}
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
          DataNotes<i className="fas fa-file-signature fa-1x icon"> </i>
        </div>
      <button className="btn" onClick={this.Google}>Inicia Sesión con Google</button>
      </div>
    )
    }
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