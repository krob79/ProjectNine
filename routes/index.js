const express = require('express');
const router = express.Router();
const User = require('../models').User;

const users = [];

/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        // Forward error to the global error handler
        next(error);
      }
    }
  }

  router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the REST API project!',
    });
  });

  // Route that returns the current authenticated user.
  //NEED AUTHENTICATION HERE
router.get('/users', asyncHandler(async (req, res) => {
    const user = req.currentUser;
  
    res.status(201).json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress
    });
    
  }));

router.post('/users', asyncHandler(async(req, res) => {
  console.log("---body " + req.body);
  try{
    await User.create(req.body);
    res.status(201).json({message:"User successfully created!"});
  }catch(error){
    console.log("Error: " + error.name);

    if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
      const errors = error.errors.map(err => err.message);
      res.status(400).json({errors});
    }else{
      throw error;
    }
  }


}));

module.exports = router;
