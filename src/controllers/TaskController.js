const database = require('../models');

class TaskController {
    static async getById(req,res) {
        try{
            const task = await database.Task.findByPk(req.params.id);
            return res.status(200).json(task);
        }
        catch(error){
            
        }
    }
    static async getAll(req,res) {
        try{
            const list = await database.Task.findAll();
            return res.status(200).json(list);
        }
        catch(error){
            
        }
    }
    static async add(req,res) {
        try{
            const {titulo,feito} = req.body;
            return res.status(200).json(await database.Task.create({
                titulo: titulo,
                feito: feito === undefined ? 0 : feito
            }));
        }
        catch(error){
            
        }
    }
    static async removeById(req,res) {
        try{
            const id = req.params.id;
            return res.status(200).json(await database.Task.destroy({
                where: {
                    id: id,
                }
            }));
        }
        catch(error){
            
        }
    }
    static async removeAll(req,res) {
        try{
            return res.status(200).json(await database.Task.truncate());
        }
        catch(error){
            
        }
    }
    static async updateById(req,res) {
        try{
            return res.status(200).json(await database.Task.update(
                req.body,
                {
                    where: {
                        id: req.params.id
                    }
                }
            ));
        }
        catch(error){
            
        }
    }
}

module.exports = TaskController;