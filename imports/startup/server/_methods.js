import { Meteor } from 'meteor/meteor';
import { Songs } from '../../collections/songs.js';
import '/imports/startup/server';
import '/imports/startup/both';
import { check } from 'meteor/check';
import { Alerts } from '../../collections/alerts.js';
import { Playlists } from '../../collections/playlists.js';



Meteor.startup(() => {
    // code to run on server at startup
});


Meteor.methods({
    addSong(songName, artistName, rank, releaseDate, album, youtube) {


        check(songName, String);
        check(artistName, String);
        check(rank, String);
        check(releaseDate, String);
        check(album, String);
        check(youtube, String);


        const song = Songs.findOne(songName);

        if (song) {
            throw new Meteor.error('Duplicate',
                'This song already exists in the database.');
        }

        Songs.insert({

            song_name: songName,
            artist_name: artistName,
            song_rank: rank,
            release_date: releaseDate,
            album: album,
            youtube: youtube
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


        /*
          const alert = Alerts.find();

          if (alert) {
            throw new Meteor.error('Duplicate',
          'This song already exists in the database.');
        }
        */

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

  addPlaylist (song, artist, downloads){

    check (song, String);
    check (artist, String);
    check (downloads, String);

    const playlist = Songs.findOne();

    Playlists.insert({

      song: song,
      artist: artist,
      downloads: downloads

    });

  },

    removeSongFromList (songId) {

        check(songId, String);

        Songs.remove({
            _id: songId
        });
    },




});
