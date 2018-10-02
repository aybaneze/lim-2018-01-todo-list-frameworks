import React, {Component} from 'react';
import './Note.css';


class Note extends Component {
    constructor(props){
        super();
        this.content= props.content;
        this.noteId = props.noteId;
    }

    handleDelete(id){
        const response = window.confirm('se eliminará tu nota')
        if(response){
        this.props.removeNote(id);
    }else
        return;
    }

render(){
    return(
    <div className="Note">  
        <span onClick={ ()=> this.handleDelete(this.noteId)}>&times;</span>    
        <li> {this.content} </li>
    </div>
    )}}




export default Note;

