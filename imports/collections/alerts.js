import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import SimpleSchema from 'simpl-schema';



export const Alerts = new Mongo.Collection("Alerts");

Alerts.schema = new SimpleSchema({

  title: {
    type: String,
    optional:true
  },
  type: {
    type: String,
    optional:true
  },
  message: {
    type: String,
    optional:true
  },

});

const alert = {
  title: '',
  type: '',
  message: ''
};

Alerts.schema.validate(alert);
