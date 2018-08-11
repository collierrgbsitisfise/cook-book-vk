import * as gify from "gify";
import * as path from "path";
import * as fs from "fs";
import * as hjs from "handbrake-js";
import * as exec from "child_process";
import * as conv from 'video-converter';

class VideoToGif {
  constructor() {}

  public convertMp4toGif(videoSrc: string, pathToSave: string) {
    var input = path.join(__dirname, `../../tmp_video/${videoSrc}`);
    var output = path.join(__dirname, `../../tmp_gif/${pathToSave}`);
    conv.setFfmpegPath("/usr/bin/ffmpeg", function(err:any) {
        if (err) {
            console.log('ERROR');
            console.log(err);
        };
    
        conv.convert(input, output, function(err:any) {
            console.log('ERRORS');
            console.log(err);
            if (err) {
                console.log('conver error');
            };
            console.log("done");
        });
        console.log('no errors');
    });
    // console.log(input);
    // console.log(output);
    // console.log("-------------------------------------");
    // const cmd = "/usr/bin/ffmpeg";
    // return new Promise((res, _) => {
    //   var args = ["-y", "-i", `${input}`, `${output}`];
    //   let proc = exec.spawn(cmd, args);
    //   console.log("TGSI COMMAND");
    //   console.log(`/usr/bin/ffmpeg -i ${input} ${output}`);
    //   exec.exec(
    //     `/usr/bin/ffmpeg -i ${input} ${output}`,
    //     (error, stdout, stderr) => {
    //       console.log("lalaka");
    //       console.log(stderr);
    //       //   res("ok");
    //     }
    //   );
    //   proc.stdout.on("data", function(data) {
    //     console.log("DATA");
    //     console.log(data.toString("utf8"));
    //   });

    //   proc.stderr.on("data", function(data) {
    //     console.log("ERROR");
    //     console.log(data.toString("utf8"));
    //   });

    //   proc.on("close", function() {
    //     console.log("finished");
    //     res("ok");
    //   });
    // });
  }
}

export default VideoToGif;
