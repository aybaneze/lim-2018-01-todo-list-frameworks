import React, { Component } from 'react';
import './form.css';

class Form extends Component {
 constructor(){
  super();
  this.addNote = this.addNote.bind(this);
 }

addNote(){
    let textVacio = this.textInput.value.trim();
   if(this.textInput.value != '' && textVacio != "" ){
    this.props.addNote(this.textInput.value,this.textTitulo.value);
    this.textTitulo.value= '';
    this.textInput.value= '';
    this.textTitulo.focus();
}else{
    alert("debe llenar los campos vacios")
}
}



 render(){
     return(
         <div className="NoteForm">
            Mi Nota
            <input placeholder="titulo" type="text"  ref={input=>{this.textInput = input;}}/>
            <input placeholder="Escribe tu nota" type="text"  ref={titulo=>{this.textTitulo = titulo;}}/><br/>
            <button onClick={this.addNote}>Agregar</button>
         </div>
     )
 }
}

export default Form;