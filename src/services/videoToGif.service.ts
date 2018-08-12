import * as path from "path";
import * as fs from "fs";
import * as exec from "child_process";

class VideoToGif {
  constructor() {}

  public convertMp4toGif(videoSrc: string, pathToSave: string) {
    var input = path.join(__dirname, `../../tmp_video/${videoSrc}`);
    var output = path.join(__dirname, `../../tmp_gif/${pathToSave}`);
    const cmd = "sh";
    return new Promise((res, _) => {
      var args = [path.join(__dirname, `../../test.sh`)];
      let proc = exec.spawn(cmd, args);
      proc.stdout.on("data", function(data) {
        console.log("DATA");
        console.log(data.toString("utf8"));
      });

      proc.stderr.on("data", function(data) {
        console.log("ERROR");
        console.log(data.toString("utf8"));
      });

      proc.on("close", function() {
        console.log("finished");
        res("ok");
      });
    });
  }

  public addAditionalHeadersToMp4(videoSrc: string) {
    console.log("I am in additions headers");
    var input = path.join(__dirname, `../../tmp_video/${videoSrc}`);
    var output = path.join(__dirname, `../../tmp_video_norm/${videoSrc}`);
    var cmd = "sh";
    return new Promise(res => {
      fs.writeFileSync(
        path.join(__dirname, `../../addHeadersScript.sh`),
        `ffmpeg -i ${input} -c:v libx265 -c:a copy -flags +global_header ${output}`
      );
      res("ok");
      var args = [path.join(__dirname, `../../addHeadersScript.sh`)];
      let proc = exec.spawn(cmd, args);
      proc.stdout.on("data", function(data) {
        console.log("DATA");
        console.log(data.toString("utf8"));
      });

      proc.stderr.on("data", function(data) {
        console.log("ERROR");
        console.log(data.toString("utf8"));
      });

      proc.on("close", function() {
        console.log("finished");
        res("ok");
      });
    });
  }
}

export default VideoToGif;
