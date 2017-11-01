import './playlists.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Songs } from '../../collections/songs.js';
import { Playlists } from '../../collections/playlists.js';
import { check } from 'meteor/check';


Template.addPlaylist.onCreated(function () {
  this.autorun(() => {
    Meteor.subscribe("PlaylistPub");


    });
});

Template.addPlaylist.helpers({

    playlists() {
      return Playlists.find()
  }
});

Template.addPlaylist.events({

'submit #add-to-list': function(event){
  event.preventDefault();


    console.log("Ayyye it works");


    const target = event.target;
    const song = target.song.value;
    const artist= target.artist.value;
    const downloads= target.downloads.value;

      //Meteor.call('addPlaylist', song, artist, downloads)

    // Clear form

    target.song.value= '';
    target.artist.value= '';
    target.downloads.value= '';
  }
})
