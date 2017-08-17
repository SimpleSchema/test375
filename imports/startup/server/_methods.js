import { Meteor } from 'meteor/meteor';
import { Songs } from '../../collections/songs.js';
import '/imports/startup/server';
import '/imports/startup/both';
import { check } from 'meteor/check';



Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({
  addSong(songName, artistName) {

    check(songName, String);
    check(artistName, String);

    const song = Songs.findOne(songName);

    if (song) {
      throw new Meteor.error('Duplicate',
    'This song already exists in the database.');
    }

    Songs.insert({
      song_name: songName,
      artist_name: artistName
    });
},
  removeSong(SongId) {
    check(songId, String);

      Songs.remove({
        _id: songId
      });
    }
});
