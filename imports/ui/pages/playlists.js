import './playlists.html';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Songs } from '../../collections/songs.js';
import { Playlists } from '../../collections/playlists.js';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import 'select2-bootstrap-theme/dist/select2-bootstrap.css';
import { ReactiveVar } from 'meteor/reactive-var'





//Acounts config




Template.addPlaylist.onCreated(function () {
  this.autorun(() => {
    Meteor.subscribe("PlaylistPub");
      Meteor.subscribe("SongsPub");


    });
});

Template.addSongToList.onCreated(function () {
  this.autorun(() => {
    Meteor.subscribe("PlaylistPub");
    Meteor.subscribe("SongsPub");


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
    const playlistAdds= target.playlist_adds.value;

// Calls the method
Meteor.call("addPlaylist", songId, (error, result) => {
console.log("error" + error);
console.log("result" + result);
console.log("ayyy");
});

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

    Meteor.call('removeSongFromList', songId, function(err,result) {
        if (!err) {
            sAlert.success('Song Successfully Removed From Playlist!');
    } else {
            sAlert.error('Oops, something went wrong: ' + err.toString());
        //or: sAlert.error(err);
        }
  });

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

  }
});




Template.addSongToList.onRendered( function() {
        $('.songsDropdown').select2({
          placeholder: 'Select A Song',
          theme: "bootstrap"




        });
    });


Template.addSongToList.helpers({

  returnSongs() {

    return Songs.find({});
  }

});


Template.addSongToList.events({

  'submit .addSongToPlaylist': function(event){
    event.preventDefault();

      const target= event.target;
      const songId = target.title.value;

      // Calls the method

      Meteor.call("addPlaylist", songId, function(err,result) {
          if (!err) {
              sAlert.success('The song has been successfully added to your playlist!');
      } else {
              sAlert.error('Oops, something went wrong: ' + err.toString());
          //or: sAlert.error(err);
          }
      });




  }



});
