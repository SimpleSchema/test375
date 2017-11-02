import './playlists.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Songs } from '../../collections/songs.js';
import { Playlists } from '../../collections/playlists.js';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';


Template.addPlaylist.onCreated(function () {
  this.autorun(() => {
    Meteor.subscribe("PlaylistPub");


    });
});

Template.addPlaylist.helpers({

    playlists() {
      return Playlists.find()
  }
});

// Adds the song to the table...
Template.addPlaylist.events({

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
  }
});


Template.addPlaylist.events({
  'click #removeSong': function() {
    event.preventDefault();


    var songId = this._id;

    //Meteor.call('removeSongFromList', songId);
  }
});
