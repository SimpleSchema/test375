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
    'submit .InsertSongForm': function(event){
      event.preventDefault();

      const target = event.target;
      const song = target.song.value;
      const artist = target.artist.value;

      console.log("song: " + song);
      console.log("artist: " + artist);


      //clear form
      target.title.value = '';
      target.message.value = '';
   }
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
