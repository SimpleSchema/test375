import { Meteor } from 'meteor/meteor';
import { Songs } from '../../collections/songs.js';

Meteor.publish('SongsPub', function songPublication()  {
    return Songs.find();
});
