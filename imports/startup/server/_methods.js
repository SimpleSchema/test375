import { Meteor } from 'meteor/meteor';
import { Songs } from '../../collections/songs.js';
import '/imports/startup/server';
import '/imports/startup/both';
import { check } from 'meteor/check';
import { Alerts } from '../../collections/alerts.js';
import { Playlists } from '../../collections/playlists.js';
import { Roles } from 'meteor/alanning:roles';



Meteor.startup(() => {
    // code to run on server at startup
});


Meteor.methods({
    addSong(songName, artistName,releaseDate, album, youtube) {


        check(songName, String);
        check(artistName, String);
        check(releaseDate, String);
        check(album, String);
        check(youtube, String);




        const song = Songs.findOne(songName);

        if (song) {
            throw new Meteor.error('Duplicate',
                'This song already exists in the database.');
        }


        var loggedInUser = Meteor.user();
        var userId = this._id;

        if (!loggedInUser ||
          !Roles.userIsInRole(loggedInUser,
          ['admin']))

          {
            throw new Meteor.Error(403, "Access Denied")

          }

        Songs.insert({

            song_name: songName,
            artist_name: artistName,
            release_date: releaseDate,
            album: album,
            youtube: youtube,


        });
    },




    removeSong(songId) {

        check(songId, String);

        Songs.remove({
            _id: songId
        });
    },


});

Meteor.methods({
    addAlert(type, title, message) {


        check(type, String);
        check(title, String);
        check(message, String);

        var loggedInUser = Meteor.user();
        var userId = this._id;


        if (!loggedInUser ||
          !Roles.userIsInRole(loggedInUser,
          ['admin']))

          {
            throw new Meteor.Error(403, "Access Denied")

          }

        Alerts.insert({

            type: type,
            title: title,
            message: message

        });
    },

    removeAlert(alertId) {

        check(alertId, String);


        Alerts.remove({
            _id: alertId
        });
    },



});

Meteor.methods({
  addPlaylist (songId){

    // Check if "songId" is a string
    check (songId, String);

    // Check if the user is logged in
    if (!this.userId) {
      throw new Meteor.error ('not-authorized');
    }

    // Find and return the songs document by searching Songs collection with the selected song _id
    var doc = Songs.findOne({_id: songId});

    // Check if the song document exists
    if (!doc) {
      throw new Meteor.error ('song not found');
    }

    // Check to make sure the song doesn't already exist in the Playlists collection for the specified user

    var checkForDuplicate = Playlists.find({songId: songId, userId: this.userId}).count();

    if (checkForDuplicate > 0) {
      throw new Meteor.error ('song already exists in playlist');
    }

// Check to see if the logged in and the user is in the 'admin' role
    var loggedInUser = Meteor.user();
    var userId = this._id;


    if (!loggedInUser ||
      !Roles.userIsInRole(loggedInUser,
      ['admin']))

      {
        throw new Meteor.Error("Access Denied")

      }

    // Add the song to the Playlists collection for the user
    Playlists.insert({
      title: doc.song_name,
      artist: doc.artist_name,
      release_date: doc.release_date,
      album: doc.album,
      youtube: doc.youtube,
      songId: doc._id,
      userId: this.userId
    });

    // Update the song document in the Songs collection to increase "playlistAdds" by 1
    Songs.update(
       { _id: doc._id },
       { $inc: { playlistAdds: 1 } }
    );

  },
  removeSongFromList (songId) {
    // Check if "songId" is a string
        check(songId, String);

        // Find and return the songs document in the Playlists collection
        var playlistDoc = Playlists.findOne({_id: songId});

        // Checking to see if the loggedInUser is in the admin role
        var loggedInUser = Meteor.user();
        var userId = this._id;


        if (!loggedInUser ||
          !Roles.userIsInRole(loggedInUser,
          ['admin']))

          {
            throw new Meteor.Error(403, "Access Denied")

          }

        // Remove the song from the Playlists colleciton
        Playlists.remove({
            _id: songId
        });

        // Decrease the "playlistAdds" field for the song in the Songs collection by 1
        Songs.update(
           { _id: playlistDoc.songId },
           { $inc: { playlistAdds: -1 } }
        );
    },
});



Meteor.methods({

  updateRoles: function (targetUserId, roles) {
    var loggedInUser = Meteor.user();
    var userId = this._id;


    if (!loggedInUser ||
      !Roles.userIsInRole(loggedInUser,
      ['admin']))

      {
        throw new Meteor.Error(403, "Access Denied")

      }
        Roles.setUserRoles(targetUserId, roles);


},

  removeUser(userId) {

      check(userId, String);

      Meteor.users.remove({
          _id: userId
      });
  },



});
