import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Songs } from '../../collections/songs.js';

import '../../ui/pages/admin.html';
import '../../ui/pages/home.html';
import '../../ui/navigation/navigation.html';

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
