import { Mongo } from "meteor/mongo";
import SimpleSchema from 'simpl-schema';

export const Songs = new Mongo.Collection("Songs");

Songs.schema = new SimpleSchema({

  song_name: {
    type: String,
    optional: true
  },

  artist_name: {
    type: String,
    optional: true
  }


});

const song = {
  song_name: 'Stairway To Heaven',
  artist_name: 'Led Zeppelin',


};

Songs.schema.validate(song);
