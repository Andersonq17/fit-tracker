const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const port= process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri= process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('Conexion con MongoDB exitosa!');
});

const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/user');

app.use('/exercises', exercisesRouter); // links en el navegador, llama los archivos del router
app.use('/users', userRouter);

app.listen(port, ()=>{
    console.log(`Servidor activo en puerto: ${port}`);
});