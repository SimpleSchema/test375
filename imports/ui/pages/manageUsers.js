import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import './manageUsers.html';

Template.usersTable.onCreated(function () {
  this.autorun(() => {
    Meteor.subscribe("users");
    });
});

Template.usersTable.helpers({
    users: function () {
        return Meteor.users.find();
    },
});


Template.usersTable.events({
  'click .removeUser': function() {
    event.preventDefault();

    var userId = this._id;

    Meteor.call('removeUser', userId);

  }
});




Template.InsertRoles.events({
  'submit .InsertRoleForm': function(event) {
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const role = target.role.value;

    // Call method
    Meteor.call('insertRole', role);

    // Clear form
    target.role.value = '';
  },
});

Template.usersTable.events({
  'change #selectRole': function(event, template){
    var selectedRole = template.$("#selectRole").val();

    var userId = this._id;

    Meteor.call('updateRoles', userId, selectedRole);
    console.log(selectedRole);
  }
});

Template.usersTable.helpers({
  selected: function(v1, v2) {
    return (v1 === v2);
  }
});
