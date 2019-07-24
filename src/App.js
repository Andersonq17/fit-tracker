import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from './components/Navbar'
import ListaEjercicios from './components/ListaEjercicios'
import EditarEjercicios from './components/EditarEjercicios'
import CrearEjercicios from './components/CrearEjercicios'
import CrearUsuario from './components/CrearUsuario'

function App() {
  return (
   <Router>
      <Navbar />
      <Route path="/" exact component={ListaEjercicios} />
      <Route path="/edit/:id" component={EditarEjercicios} />
      <Route path="/create" component={CrearEjercicios} />
      <Route path="/user" component={CrearUsuario} />

    </Router>
    
  );
}

export default App;
