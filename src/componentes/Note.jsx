import React, {Component} from 'react';
import './Note.css';

class Note extends Component {
    constructor(props){
        super(props);
        this.content= props.content;
        this.titulo = props.titulo;
        this.status= props.status;   
        this.noteId = props.noteId;
        this.text = props.text;
        
    }

    handleDelete(id){    
        const response = window.confirm('se eliminará tu nota');
        if(response){
        this.props.removeNote(id);
      }
        return;
      }
 
    handleList(id,status){ 
        
        const response = window.confirm('Estas actualizando el estado de tu nota');
        if(response){
        if (status === false) {
         status = true
          this.props.List(id,status)
        }else if (status === true) {
            status = false
            this.props.List(id,status)
           }
           window.location.reload(true)
        }
    }

render(){
    return(
    <div className="Note" id="check">  
        <span onClick={()=> this.handleDelete(this.noteId)} className="fas fa-trash-alt"></span>  
        <span onClick={() => this.handleList(this.noteId,this.status)} className="fas fa-check"></span>
         <p> {this.content}</p>         
        <li> {this.titulo}</li>

        <h1>{this.text}</h1>
    </div>
    )
}
}




export default Note;

