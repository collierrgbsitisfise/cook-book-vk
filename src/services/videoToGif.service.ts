import * as gify from "gify";
import * as path from "path";
import * as fs from "fs";

class VideoToGif {
  constructor() {}

  public convertMp4toGif(videoSrc: string, pathToSave: string) {
    console.log("convert video to gif");
    var input = path.join(__dirname, "../../tmp_video/movie.mp4");
    var output = path.join(__dirname, "../../tmp_gif/movie.gif");
    gify(input, output, function(err: any) {
      if (err) {
          console.log(err);
      };
    });
  }
}

export default VideoToGif;
