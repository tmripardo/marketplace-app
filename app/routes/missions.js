module.exports = function(app){
    var images = require('../infra/connectionFactoryS3');

    /* ###################### GET ###################### */
    app.get('/missions', function(req, res){
        
        var connectionFactoryDynamo = app.infra.connectionFactoryDynamo();
        var missionDAO = new app.infra.MissionsDAO(connectionFactoryDynamo);
        
        res.end();
        //connection.end();
    });
    
    /* ###################### POST ###################### */
    app.post('/missions', function(req, res){
        
        var data = req.body;
        
        var connectionFactoryDynamo = app.infra.connectionFactoryDynamo();
        var missionDAO = new app.infra.MissionsDAO(connectionFactoryDynamo);
        
        if (typeof(data.action) != "undefined"){
            /*  Para adicionar um novo usuário
            
                var result = 
                {
                    name : <string>,
                    photo_id : <string>,
                    description : <string>,
                    skills : <string>,
                    email : <string>,
                    action : 'add'
                }
            
            */
            if(data.action === "add"){
                delete data.action;
                missionDAO.add(data, function(err, result){
                    if (err) {
                        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("Added item:", JSON.stringify(data, null, 2));
                        res.json(result);
                    }
                });
            } 
            /*  Para obter o json do usuário
            
                var result = 
                {
                    email : <string>,
                    action: 'get'
                }
            
            */
            else if(data.action === "get"){
                delete data.action;
                missionDAO.get(data, function(err, data) 
                {
                    if (err) {
                        console.error("Unable to find item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("FindItem succeeded:");
                        delete data.Count;
                        delete data.ScannedCount;
                        
                        res.json(data);
                        //console.log(JSON.stringify(data, null, 2));
                    }
                });
            } 
            /*  Para editar um usuário
            
                var result = 
                {
                    name : <string>,
                    photo_id : <string>,
                    description : <string>,
                    skills : <string>,
                    email : <string>,
                    action : 'edit'
                }
            
            */
            else if(data.action === "edit"){
                delete data.action;
                missionDAO.edit(data, function(err, data) {
                    if (err) {
                        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("UpdateItem succeeded:");
                        delete data.Count;
                        delete data.ScannedCount;
                        
                        res.json(data);
                    }
                });
            } 
            /*  Para deletar o usuário
            
                var result = 
                {
                    email : <string>,
                    action: 'delete'
                }
            
            */
            else if(data.action === "delete"){
                delete data.action;
                missionDAO.delete(data, function(err, data) {
                    if (err) {
                        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("DeleteItem succeeded:");
                        delete data.Count;
                        delete data.ScannedCount;
                        
                        res.json(data);
                    }
                });
            }
        }
        else{
            console.error("Unable to take an action!");
        }
    });
}