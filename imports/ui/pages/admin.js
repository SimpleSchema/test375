import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Songs } from '../../collections/songs.js';
import SimpleSchema from 'simpl-schema';
import './admin.html';


Template.SongsTable.onCreated(function () {
  this.autorun(() => {
    Meteor.subscribe("SongsPub", "myForm");

    });
});



Template.myForm.events({
    'click button#': function(){
      event.preventDefault();

         console.log("lmfao!!!!");
   }

Meteor.call('addSong');

});


Template.SongsTable.events({
  'click button': function() {
    event.preventDefault();

    var songId = this._id;

    Meteor.call('removeSong', songId);

  }
});

Template.SongsTable.helpers({
    songs: function () {
        return Songs.find({});
    },
});
