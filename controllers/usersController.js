const User = require('../models/Register');


const usersController =  {
    getUsers: async (req, res) => {
      const users = await User.find().select('-password').lean();

      if(!users?.length){
       return res.status(400).json({message: 'No users found'});
      }
      res.json(users)
    },
    register: async (req, res) => {

      const {
        name,
        dni,
        pulEntregada
      } = req.body;

      if(!name || !dni){
        return res.status(400).json({message: 'All fields are required'});
      }

      const duplicate = await User.findOne({ dni }).lean().exec();

      if(duplicate) { 
        return res.status(400).json({message: 'Duplicate dni'})
      }

      const userObject = { name, dni, pulEntregada: false }

      const user = await User.create(userObject);

      if(user) {
        res.status(201).json({message: `New user ${name} created`})
      } else {
        res.status(400).json({message: 'Invalid user data received'})
      } 
    },
    profile: async (req, res) => {
      try{
        const oneUser = await User.findById(req.params.id);

        res.status(200).json(oneUser)
     } catch (error){
        res.status(404).json ({ message: error.message })
     }
    },
    updateProfile: async (req, res) => { 
      try {
        const { _id, name, dni, pulEntregada } = req.body;

        if(!name || !dni || typeof pulEntregada !== 'boolean'){
          return res.status(400).json({message: 'All fields are required'})
        }
        const user = await User.findById(_id).exec();
        
        user.name = name;
        user.dni = dni;
        user.pulEntregada = pulEntregada;

        const updatedUser = await user.save();

        res.json({message: `${updatedUser.name} updated`})

      } catch (error) {
        res.status(409).json({ message: error.message }) 
      }   
    },
    deleteUser:async (req, res) => { 
         try {
          await User.findByIdAndDelete(req.params.id)

          res.status(204).json({message: 'Usuario eliminado'})
         } catch (error) {
          res.status(304).json({message: error.message})
         }
    } 
}


module.exports = usersController;
