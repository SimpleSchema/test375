import './alertpage.html';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Alerts } from '../../collections/alerts.js';


Template.alerts.onCreated(function () {
  this.autorun(() => {

    Meteor.subscribe("SongsPub");
    Meteor.subscribe("AlertsPub");
    Meteor.subscribe("PlaylistPub");


    });
});

Template.alerts.helpers({

    alerts: function () {
      return Alerts.find({});
  }
});

Template.alerts.events({

  'submit .InsertAlertForm': function(event){

    event.preventDefault();
    const target = event.target;
    const type = target.type.value;
    const title = target.title.value;
    const message = target.message.value;

    Meteor.call("addAlert", type, title, message, function(err, result) {
      if (!err) {
        sAlert.success('Alert Added!');
      } else {
        sAlert.error ('Oops!, Something went wrong' + err.ToString());
      }
    });

    target.type.value = '';
    target.title.value = '';
    target.message.value = '';

  }
});


Template.previousAlerts.onCreated(function displayAlertsCreated() {
    Meteor.subscribe('AlertsPub')
});

Template.previousAlerts.helpers({
    checkAlerts: function() {
        return Alerts.find({
        }).fetch();
    },
    alertWarning: function() {
        if (this.type === 'warning')
            return true;
        else
            return false;
    },
    alertInfo: function() {
        if (this.type === 'info')
            return true;
        else
            return false;
    },
    alertSuccess: function() {
        if (this.type === 'success')
            return true;
        else
            return false;
    },
    alertDanger: function() {
        if (this.type === 'danger')
            return true;
        else
            return false;
    },
});

Template.previousAlerts.events({
    'click .removeAlert': function(e, t) {

        e.preventDefault();

        Meteor.call('removeAlert', this._id, function(error) {
            if (error) {
                if (typeof Errors === "undefined");
                else Errors.throw(error.reason);
                return;
            } else {
                return;
            }
        });

    }
});
