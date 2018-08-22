import * as mongoose from 'mongoose';

const SchemaM = mongoose.Schema;

const povarenokSchema = new SchemaM({
  sourceVideo: {
    type: String,
  },
  cookName: {
    type: String,
  },
  LinkToPost: {
    type: String,
  },
  time: {
    type: Number,
    default: new Date()
  },
  posted: {
     type: Boolean,
     default: false 
  }
});

const povarenok = mongoose.model('povarenok-cooks', povarenokSchema);

export default povarenok;