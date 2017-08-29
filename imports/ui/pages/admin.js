import './admin.html';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Songs } from '../../collections/songs.js';


Template.SongsTable.onCreated(function () {
  this.autorun(() => {
    Meteor.subscribe("SongsPub");
    console.log("Test ayyyyyyyyy!");

    });
});



Template.admin.events({
    'click .submitSong': function(){
      event.preventDefault();

         console.log("lmfao!!!!");
   }

//Meteor.call('addSong');

});


Template.SongsTable.events({
  'click button': function() {
    event.preventDefault();
    console.log("Test ayyyyyyyyy!");

    var songId = this._id;

    //Meteor.call('removeSong', songId);

  }
});

Template.SongsTable.helpers({
    songs: function () {
        return Songs.find({});
    },
});
