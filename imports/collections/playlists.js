import { Mongo } from "meteor/mongo";
import SimpleSchema from 'simpl-schema';
import { Songs } from './songs.js';



export const Playlists = new Mongo.Collection("Playlists");

Playlists.schema = new SimpleSchema({

      song: {
        type: String,
        optional: true
      },

      artist: {
      type: String,
      optional: true
    },

    downloads: {
      type: String,
      optional: true
    },

    userId: {
      type: String,
      optional: true
    },



});

const playlist ={
  song: 'Stairway To Heaven',
  artist: 'Led Zeppelin',
  downloads: '',
  userId: this.userId,




};

Playlists.schema.validate(playlist);
