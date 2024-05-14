const express = require('express');
const taskRoute = require('./tasksRoute.js');

module.exports = app => {

    app.use(express.json());
    app.get('/', (req,res) => res.status(200).send({mensagem: 'Boas-vindas à API'}));
    app.use(taskRoute);
}