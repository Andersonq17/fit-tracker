import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Exercise = props=>(
    <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date}</td>
    <td>
        <Link to={"/edit/"+props.exercise._id}>Editar</Link>  
        <button onClick={()=>{ props.deleteExercise(props.exercise._id) }} class="btn btn-danger ml-1">Eliminar</button>
    </td>
</tr>
);
  
      
    


export default class ListarEjercicio extends Component{
    constructor(props){
        super(props)
        this.state={ exercises : [], }
        this.deleteExercise= this.deleteExercise.bind(this)

    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
        .then(res=>{
            this.setState({
                exercises: res.data,
            });
        })
        .catch((err)=>{
            console.log(err)
        });
    }

    deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/'+id)
        .then(res=>console.log(res.data));
        this.setState({
            exercises : this.state.exercises.filter(elem => elem._id !== id)
        })
    }

    exercisesList(){
        return this.state.exercises.map(current=> {
            return <Exercise exercise= {current} deleteExercise = {this.deleteExercise} key={current._id}/>
        })
    }

    render(){
        return(
    <div className="container">
        <h3>Lista de ejercicios recientemente</h3>
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                <th scope="col">Usuario</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Duración</th>
                <th scope="col">Fecha</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
               {this.exercisesList()}
            </tbody>
        </table>
    </div>
        
        );
    }
}