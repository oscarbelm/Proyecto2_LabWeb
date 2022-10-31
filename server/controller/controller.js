var Userdb = require('../model/model');

// // create and save new user
exports.create = (req,res)=>{
//     // validate request
     if(!req.body){
         res.status(400).send({ message : "No puede estar vacio"});
         return;
     }

//     // new user
     const user = new Userdb({
         name : req.body.name,
         email : req.body.email,
         qrstatus : req.body.qrstatus
     })

//     // save user in the database
     user
         .save(user)
         .then(data => {
            //  res.send(data)
             res.redirect('/add-user');
         })
         .catch(err =>{
             res.status(500).send({
                 message : err.message || "Ocurrio un error"
             });
         });

}

// // retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

     if(req.query.id){
         const id = req.query.id;

         Userdb.findById(id)
             .then(data =>{
                 if(!data){
                     res.status(404).send({ message : "Usuario no encontrado con ID:  "+ id})
                 }else{
                     res.send(data)
                 }
             })
             .catch(err =>{
                 res.status(500).send({ message: "Error con el ID:  " + id})
             })

     }else{
        Userdb.find()
        .then(user =>{
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({message: err.message || "Ocurrio un error"})
    })

}}

// // Update a new idetified user by user id
exports.update = (req, res)=>{
     if(!req.body){
         return res
             .status(400)
             .send({ message : "No puede estar vacio"})
     }

     const id = req.params.id;
     Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
         .then(data => {
             if(!data){
                 res.status(404).send({ message : `No se pudo actualizar usuario con id ${id}. `})
             }else{
                 res.send(data)
             }
         })
         .catch(err =>{
             res.status(500).send({ message : "Error de actualizacion de usuario"})
         })
    }

// // Delete a user with specified user id in the request
exports.delete = (req, res)=>{
     const id = req.params.id;

     Userdb.findByIdAndDelete(id)
         .then(data => {
             if(!data){
                 res.status(404).send({ message : `No se puede eliminar ID ${id}.`})
             }else{
                 res.send({
                     message : "Usuario eliminado"
                 })
             }
         })
         .catch(err =>{
             res.status(500).send({
                 message: "No se pudo eliminar el ID: " + id
             });
         });
    }