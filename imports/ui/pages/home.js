import './home.html';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Songs } from '../../collections/songs.js';
import { Alerts } from '../../collections/alerts.js';
import { Playlists } from '../../collections/playlists.js'





Template.songsTable.onCreated(function () {
  this.autorun(() => {

    Meteor.subscribe("SongsPub");
    });
});

Template.songsTable.helpers({
  songs: function() {
    return Songs.find({}, {sort: {playlistAdds: -1}});
  }
});

Template.home.onCreated(function () {
  this.autorun(() => {

    Meteor.subscribe("SongsPub" );
    });
});
