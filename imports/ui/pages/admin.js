import './admin.html';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Songs } from '../../collections/songs.js';


Template.SongsTable.onCreated(function () {
  this.autorun(() => {
    Meteor.subscribe("SongsPub");


    });
});



Template.admin.events({
    'submit .InsertSongForm': function(event){
      event.preventDefault();

      const target = event.target;
      const song = target.song.value;
      const artist = target.artist.value;

    Meteor.call("addSong", song, artist );


      //clear form
      target.song.value = '';
      target.artist.value = '';
   }
});

Template.admin.events({
    'submit .InsertSongTopTen': function(event){
      event.preventDefault();

      const target = event.target;
      const song = target.song.value;
      const artist = target.artist.value;

    Meteor.call("addSong", song, artist );


      //clear form
      target.song.value = '';
      target.artist.value = '';
   }
});



Template.admin.events({
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

Template.topTenTable.helpers({
    songs: function () {
        return Songs.find({});
    },
});
