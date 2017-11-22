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
        return Meteor.users.find({});

  },
});


Template.usersTable.helpers({
    settings: function () {
        return {
            collection: Meteor.users,
            rowsPerPage: 10,
            showFilter: true,
          fields: [
            {key: '_id', label: 'User ID'},
            {key: 'username', label: 'Username'},
            {key: 'roles', label: 'Role', tmpl: Template.roleDropdown },
            {key: 'action', label: 'Action', tmpl: Template.removeUserButton}

        ] };
    }
});


Template.removeUserButton.events({
  'click .removeUser': function() {
    event.preventDefault();

    var userId = this._id;
    var loggedInUser = Meteor.user();

    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser,
        ['admin'])) {
          throw new Meteor.Error(403, "Access Denied")
        }

    Meteor.call('removeUser', userId);

  }
});

Template.roleDropdown.events({
  'change #selectRole': function(event, template){
    var selectedRole = template.$("#selectRole").val();
    var loggedInUser = Meteor.user();
    var userId = this._id;

    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser,
        ['admin'])) {
          throw new Meteor.Error(403, "Access Denied")
        }



    Meteor.call('updateRoles', userId, selectedRole);

  }
});

Template.roleDropdown.helpers({
  selected: function(v1, v2) {
    return (v1 === v2);
  
  }
});
