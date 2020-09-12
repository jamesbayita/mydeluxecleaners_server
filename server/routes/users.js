import express from 'express';
import User from '../models/emailListModel';
import validateUser from '../helpers/validation';
import sgMail from '@sendgrid/mail';
import getTimeStamp from '../helpers/getTimeStamp';
import {SENDGRID_API_KEY} from '../config';

sgMail.setApiKey(SENDGRID_API_KEY);

const usersRouter = express.Router()

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
      let msg = {
        to: email,
        from: 'support@mydeluxecleaners.com',
        templateId: 'd-a19357056bb94b8f936741893f66dbc4',
        dynamic_template_data: {
          first_name,
          last_name,
          date: getTimeStamp()
        }
      }

      await sgMail.send(msg);

    } catch (error) {
      // HANDLE ERRORS
      res.status(400).json({success: false, error});
    }
});

export default usersRouter;