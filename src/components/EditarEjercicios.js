import React, {Component} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'


export default class EditarEjercicio extends Component{
    constructor(props){
        super(props)
        this.state={
            username: '',
            description: '',
            duration: '',
            date : new Date(),
            users:[]
        }

        this.onChangeExercise=this.onChangeExercise.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:5000/exercises/' + this.props.match.params.id)
        .then(res=> {
            this.setState({
                username: res.data.username,
                description: res.data.description,
                duration:res.data.duration,
                date:new Date(res.data.date),
            })
        }).catch(err=>{
            console.log(err)
        })

        axios.get('http://localhost:5000/users/')
        .then(res=>{
            if (res.data.length > 0){
                this.setState({
                    users:res.data.map(user=> user.username),
                    
                })
            }
        })
    }

    onChangeExercise(e){
        const {name,value} = e.target
        this.setState({
            [name]: value
        });

    }

    onChangeDate(date){
        this.setState({
            date:date
        })
    }


    onSubmit(e){
        e.preventDefault();

        const exercise = {
            username :this.state.username,
            description: this.state.description,
            duration : this.state.duration,
            date : this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
        .then(res=>console.log(res.data));

        window.location= '/';
    }

    render(){
        return(
            <div className="container mt-10">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <h3 className="text-center">Editar Ejercicio</h3>

                <select 
                className="form-control"
                required
                placeholder="Selecione usuario"
                name="username"
                value={this.state.username}
                onChange={this.onChangeExercise}>
                    {this.state.users.map(function (user){
                        return <option
                            key={user}
                            value={user}>{user} 
                            </option>
                    })}
                    
                </select>

                </div>
                <div className="form-group">
                
                <input 
                type="text"
                name="description" 
                className="form-control" 
                placeholder="Descripcion del ejercicio"
                value={this.state.description}
                onChange={this.onChangeExercise}/>
                </div>

                <div className="form-group">
                
                <input 
                type="number" 
                className="form-control" 
                placeholder="Duración (en minutos)"
                name="duration"
                value={this.state.duration}
                onChange={this.onChangeExercise}/>


                </div>

                <div className="form-group">
                
                <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}/>
                

                </div>

                <div className="form-group">
                <button type="submit" className="btn btn-warning">Guardar Cambios</button>
                </div>
            </form>
         </div>
        );
    }
}