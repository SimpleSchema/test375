import { Mongo } from "meteor/mongo";
import SimpleSchema from 'simpl-schema';
import { Songs } from './songs.js';



export const Playlists = new Mongo.Collection("Playlists");

Playlists.schema = new SimpleSchema({

      title: {
        type: String,
        optional: true
      },

      artist: {
      type: String,
      optional: true
    },

    release_date: {
      type: String,
      optional: true
    },

    album: {
      type: String,
      optional: true
    },

    youtube: {
      type: String,
      optional: true
    },

    songId: {
      type: String,
      optional: true
    },

    userId: {
      type: String,
      optional: true
    },



});

const playlist ={
  title: 'Stairway To Heaven',
  artist: 'Led Zeppelin',
  userId: this.userId,




};

Playlists.schema.validate(playlist);
