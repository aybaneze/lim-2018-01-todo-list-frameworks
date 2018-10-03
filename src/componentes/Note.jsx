import React, {Component} from 'react';
import './Note.css';


class Note extends Component {
    constructor(props){
        super();
        this.titulo = props.titulo;
        this.content= props.content;
        this.noteId = props.noteId;
    }

    handleDelete(id){
        const response = window.confirm('se eliminará tu nota');
        if(response){
        this.props.removeNote(id);
        window.location.reload(true)
      }
        return;
      }
           
    handleList(id){

    }

render(){
    return(
    <div className="Note">  
        <span onClick={ ()=> this.handleDelete(this.noteId)} class="fas fa-trash-alt"></span>  
        <span onClick={() => this.handleList(this.noteId)} class="fas fa-edit"></span>
        <div className="titulo">
        <p> {this.titulo}</p>
        </div>
        <li> {this.content}</li>
        
    </div>
    )}}




export default Note;

