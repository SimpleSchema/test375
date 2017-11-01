import './admin.html';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Songs } from '../../collections/songs.js';
import { Alerts } from '../../collections/alerts.js';


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
      const rank = target.rank.value;
      const releaseDate = target.release_date.value;
      const album = target.album.value;
      const youtube = target.youtube.value;

Meteor.call("addSong", song, artist, rank, releaseDate, album, youtube );

      //clear form
      target.song.value = '';
      target.artist.value = '';
      target.rank.value = '';
      target.release_date.value = '';
      target.album.value = '';
      target.youtube.value = '';

   }
});

Template.admin.events({
  'click #deleteSong': function() {
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
