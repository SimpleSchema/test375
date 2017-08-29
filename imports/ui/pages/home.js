import './home.html';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Songs } from '../../collections/songs.js';




Template.songsTable.onCreated(function () {
  this.autorun(() => {
    console.log("Test ayyyyyyyyy!");
    Meteor.subscribe("SongsPub", "myForm");
    });
});

Template.home.onCreated(function () {
  this.autorun(() => {
    console.log("Test ayyyyyyyyy!");
    Meteor.subscribe("SongsPub", "myForm");
    });
});
