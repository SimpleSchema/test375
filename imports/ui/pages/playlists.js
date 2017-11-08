import './playlists.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import { Songs } from '../../collections/songs.js';
import { Playlists } from '../../collections/playlists.js';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import select2 from 'select2';




//Acounts config

Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
});



Template.addPlaylist.onCreated(function () {
  this.autorun(() => {
    Meteor.subscribe("PlaylistPub");


    });
});

Template.playlists.helpers({



playlists() {
  var currentUserId = Meteor.userId();
    return Playlists.find({userId: currentUserId});


  }
});

// button to submit
Template.playlists.events({



'submit .add-to-list': function(event){
  event.preventDefault();

    const target = event.target;
    const song = target.song.value;
    const artist= target.artist.value;
    const downloads= target.downloads.value;

// Calls the method
      Meteor.call("addPlaylist", song, artist, downloads)

    // Clear form

    target.song.value= '';
    target.artist.value= '';
    target.downloads.value= '';
  },

});


Template.playlists.events({
  'click #removeSong': function() {
    event.preventDefault();



    var songId = this._id;

    Meteor.call('removeSongFromList', songId);
  }
});


Template.addSongToList.helpers({
    playlists() {
      return Playlists.find({});
    }
});

Template.addSongToList.events({
  'submit .add-song': function() {
    event.preventDefault();
  }
})

Template.addSongToList.events({
  "change #select2": function(event, template){
    var selectValue = template.$("#select2").val();
    console.log("AYYYYYYYYE");
  }
});

Template.addSongToList.onCreated( function() {
      $("#ayyLmao").select2({
          placeholder: "Ayy select a Lmao!",
      });
    });
