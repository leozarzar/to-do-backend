const express = require('express');
const taskRoute = require('./tasksRoute.js');
const userRoute = require('./userRoute.js');
const purchaseOrderRoute = require('./purchaseOrderRoute.js');
const upload = require('../upload.js');

module.exports = app => {

    app.use(express.json());
    app.get('/', (req,res) => res.status(200).send({mensagem: 'Boas-vindas à API'}));
    app.post('/upload', upload.single('image'), (req,res) => {
        try{
            res.send(`Imagem salva no caminho: ${req.file.path}`)
        } catch(error){
            res.status(400).send('Erro ao fazer upload de imagem.')
        }
    })
    app.use(taskRoute);
    app.use(userRoute);
    app.use(purchaseOrderRoute);
}