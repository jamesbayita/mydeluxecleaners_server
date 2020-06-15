import express, { response } from 'express';
import User from '../models/emailListModel';
import validateUser from '../helpers/validation';

const usersRouter = express.Router()

usersRouter.get('', (req, res) => {
  res.send('Hello World');
});

usersRouter.post('', async (req, res) => {
    try {
      // DESTRUCTURE THE REQ.BODY OBJECT
      const {first_name, last_name, email} = req.body
      // VALIDATE THE OBJECTS VALUES WITH JOI
      await validateUser.validateAsync({first_name, last_name, email});
      // CREATE NEW USER OBJECT AND SAVE IT TO DB
      let user = new User({first_name, last_name, email})
      // USER SCHEMA VALIDATOR WILL CHECK IF EMAIL ALREADY EXISTS
      // WILL RETURN ERROR IF TRUE
      await user.save().then((doc) => {
          res.status(201).json({success:true, doc});
      })
    } catch (error) {
      // HANDLE ERRORS
      res.status(400).json({success: false, error});
    }
});

export default usersRouter;