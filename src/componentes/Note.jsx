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
           
    // handleList(id){  

    //     Note.style.background="#000"
    // }

render(){
    return(
    <div className="Note">  
        <span onClick={ ()=> this.handleDelete(this.noteId)} className="fas fa-trash-alt"></span>  
        <span onClick={() => this.handle(this.noteId)} className="fas fa-edit"></span>
        <span onClick={() => this.handleList(this.noteId)} className="fas fa-check"></span>
        <p> {this.content}</p>      
        <li> {this.titulo}</li>
        
    </div>
    )}}




export default Note;

