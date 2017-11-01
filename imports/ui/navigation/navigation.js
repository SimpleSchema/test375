import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';


//Acounts Config

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});


import "./navigation.html";
