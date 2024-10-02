const database = require('../models');

class UserController {
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
            const {name} = req.body;
            const imagePath = req.file.path;

            return res.status(200).json(await database.User.create({
                name: name,
                photo_path: imagePath
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

module.exports = UserController;