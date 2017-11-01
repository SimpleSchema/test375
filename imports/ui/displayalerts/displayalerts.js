import { Meteor } from 'meteor/meteor';
import './displayalerts.html';
import { Alerts } from '/imports/collections/alerts.js';



// *** displayAlerts Template ***

Template.displayAlerts.onCreated(function displayAlertsCreated() {
    Meteor.subscribe('AlertsPub')
});

Template.displayAlerts.helpers({
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
