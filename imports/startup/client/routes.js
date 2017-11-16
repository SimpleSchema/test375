import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Songs } from '../../collections/songs.js';
import { Alerts } from '../../collections/alerts.js';

import '../../ui/pages/admin.html';
import '../../ui/pages/home.html';
import '../../ui/navigation/navigation.html';
import '../../ui/pages/alertpage.html';
import '../../ui/pages/playlists.html';




FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "home"});
  }
});

FlowRouter.route('/admin', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "admin"});
  }
});

FlowRouter.route('/admin/alerts', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "alerts"});
  }
});

FlowRouter.route('/users/playlists', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "playlists"});
  }
});

FlowRouter.route('/admin/users', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "manageUsers"});
  }
});
