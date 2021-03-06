import './admin.html';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Songs } from '../../collections/songs.js';
import { Alerts } from '../../collections/alerts.js';
import { Playlists } from '../../collections/playlists.js';

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
      const releaseDate = target.release_date.value;
      const album = target.album.value;
      const youtube = target.youtube.value;

    



// Button that adds the song to the Songs Database
Meteor.call("addSong", song, artist, releaseDate, album, youtube, function (err, result) {
    if(!err) {
      sAlert.success('Song Has Succesfully Been Added To The Database!');
    } else {
      sAlert.error('Song Already Exists In The Database!' + err.toString());
    }
});

      //clear form
      target.song.value = '';
      target.artist.value = '';
      target.release_date.value = '';
      target.album.value = '';
      target.youtube.value = '';


   }
});

Template.admin.events({
  'click #deleteSong': function() {
    event.preventDefault();


    var songId = this._id;

    Meteor.call('removeSong', songId, function(err, result) {
      if (!err) {
        sAlert.success('Song Has Successfully Been Removed From The Database!');
      } else {
        sAlert.error('Oops!, Something went wrong' + err.toString());
      }
    });
  }
});

Template.SongsTable.helpers({
    songs: function () {
        return Songs.find({});
    },
});
