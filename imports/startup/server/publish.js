import { Meteor } from 'meteor/meteor';
import { Songs } from '../../collections/songs.js';
import { Alerts } from '../../collections/alerts.js';
import { Playlists } from '../../collections/playlists.js'


Meteor.publish('SongsPub', function songPublication()  {
    return Songs.find();
});

Meteor.publish('AlertsPub', function alertPublication()  {
    return Alerts.find();
});

Meteor.publish('PlaylistPub', function playlistPublication() {
  return Playlists.find();
});

Meteor.publish('users', function()  {
    return Meteor.users.find();
});
