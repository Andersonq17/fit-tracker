import React, {Component} from 'react'
import axios from 'axios'

export default class CrearUsuario extends Component{
    constructor(props){
        super(props)
        this.state={
            username:"",
        
        }
        this.onChangeUser=this.onChangeUser.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
    }
    onChangeUser(e){
        const {name,value} = e.target
        this.setState({
            [name]: value
        });

    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            username : this.state.username
        }
        console.log(user);
        axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data));
        

        this.setState({
            username: "",
        });
        window.location= '/create';

    }

    render(){
        return(
        <div className="container">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label >Ingrese nombre de usuario</label>
                    <input 
                    type="text"
                    name="username" 
                    className="form-control" 
                    placeholder="Usuario"
                    value={this.state.username}
                    onChange={this.onChangeUser}/>
                </div>
                
                <button type="submit" className="btn btn-primary">Crear</button>

        </form>
        </div>
    
        );
    }
}