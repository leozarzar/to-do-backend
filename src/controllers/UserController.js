const database = require('../models');
const fs = require('fs');
const path = require('path');

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
            const list = await database.User.findAll();
            
            const mappedList = await Promise.all(list.map(async ({id, name, photo_path}) => {
                
                if(photo_path){
                    try{
                        const filePath = path.join(__dirname, '../../', photo_path);
                        const data = await fs.promises.readFile(filePath);
                        const imageBase64 = data.toString('base64');
                        return {
                            id: id,
                            name: name,
                            photo: `data:image/png;base64,${imageBase64}`,
                        };
                    }catch(err) {
                        console.log(err);
                        return {
                            id: id,
                            name: name,
                            photo: null,
                        };
                    }
                }
                else{
                    return {
                        id: id,
                        name: name,
                        photo: null,
                    };
                }
            }));
            
            return res.status(200).json(mappedList);
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