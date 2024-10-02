const database = require('../models');
const fs = require('fs');
const path = require('path');

class PurchaseOrderController {
    static async getById(req,res) {
        try{
            const {name, creation_date, receipt_date, photo_path, status} = await database.PurchaseOrder.findByPk(req.params.id);
            
            if(photo_path){
                const filePath = path.join(__dirname, '../../', photo_path);

                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        console.log(err);
                    return res.status(200).json({
                        name: name,
                        creation_date: creation_date,
                        receipt_date: receipt_date,
                        photo: null,
                        status: status
                    });
                    } else {
                    const imageBase64 = data.toString('base64');
                    return res.status(200).json({
                        name: name,
                        creation_date: creation_date,
                        receipt_date: receipt_date,
                        photo: `data:image/png;base64,${imageBase64}`,
                        status: status
                    });
                    }
                });
            }
            else{
                return res.status(200).json({
                    name: name,
                    creation_date: creation_date,
                    receipt_date: receipt_date,
                    photo: null,
                    status: status
                });
            }
            
        }
        catch(error){
            console.log(error);
        }
    }
    static async getAll(req,res) {
        try{
            const list = await database.PurchaseOrder.findAll();
            
            const mappedList = await Promise.all(list.map(async ({id, name, creation_date, receipt_date, photo_path, status}) => {

                if(photo_path){
                    try{
                        const filePath = path.join(__dirname, '../../', photo_path);
                        const data = await fs.promises.readFile(filePath);
                        const imageBase64 = data.toString('base64');
                        return {
                            id: id,
                            name: name,
                            creation_date: creation_date,
                            receipt_date: receipt_date,
                            photo: `data:image/png;base64,${imageBase64}`,
                            status: status,
                        };
                    }catch(err) {
                        console.log(err);
                        return {
                            id: id,
                            name: name,
                            creation_date: creation_date,
                            receipt_date: receipt_date,
                            photo: null,
                            status: status
                        };
                    }
                }
                else{
                    return {
                        id: id,
                        name: name,
                        creation_date: creation_date,
                        receipt_date: receipt_date,
                        photo: null,
                        status: status
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
            const {name, creation_date, receipt_date, status} = req.body;
            const imagePath = req.file ? req.file.path : null;

            return res.status(200).json(await database.PurchaseOrder.create({
                name: name,
                creation_date: creation_date,
                receipt_date: receipt_date,
                photo_path: imagePath,
                status: status,
            }));
        }
        catch(error){
            console.log(error);
        }
    }
    static async removeById(req,res) {
        try{
            const id = req.params.id;
            return res.status(200).json(await database.PurchaseOrder.destroy({
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

module.exports = PurchaseOrderController;