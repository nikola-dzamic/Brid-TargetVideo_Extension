checkIfOutstream = (player) => {
  // Deki said if the name attribute of the player object has "OSPlayer" in it, this is an outstream. Only way to differentiate between an outstream and player. True for outstream, false for player.
  return player.name.includes("OSPlayer") ? true : false
}

checkIfCarousel = (player) => {
  return player.hasOwnProperty('Carousel')
}

/*
// TODO: Started working on friendly iframe detection
var i, frames;
frames = document.getElementsByTagName("iframe");
for (i = 0; i < frames.length; ++i)
{
  //console.log(frames[i])
  var innerDoc = frames[i].contentDocument || frames[i].contentWindow.document;
  //console.log(innerDoc);

}
*/

// TODO: Add support here for players located in friendly iframes. This is gonna be sex.
if (typeof BPLR === "undefined" && typeof Brid === "undefined") {
  console.log("No BPLR or Brid players found on page. If the BPLR or Brid player is in an iframe, this debug script will not be able to give you debug data for the player.");
} else {
  if (typeof bplrPlayers === "undefined") {
    bplrPlayers = document.querySelectorAll('div[id^=TargetVideo_].bplr, div[id^=Brid_].bplr, div[id^=TargetVideo_].brid, div[id^=Brid_].brid');
    let bplrEnv = $bp(bplrPlayers[0].id).assets.URLconfig.service;

    // Uncomment below line to enable display of first player object in console.
    //console.log($bp(bplrPlayers[0].id));

    for (let i = 0; i < bplrPlayers.length; i++) {
      let bplrHostType = "INTERNALLY"
      let bplrStreamType = "VOD/MP4";
      let playerObjs = $bp(bplrPlayers[i].id);
      console.log("Player "+(i+1));
      console.log("Owner ID: %c" + playerObjs.assets.config.Partner.user_id, "font-weight: bold;");
      console.log ("Partner ID: %c"+playerObjs.assets.config.Partner.id, "font-weight: bold;");
      console.log ("Player ID: %c"+playerObjs.assets.config.id, "font-weight: bold;");
      console.log ("Autoplay: "+playerObjs.assets.config.autoplay+" --- Inview: "+playerObjs.assets.config.autoplayInview+" --- %"+playerObjs.assets.config.autoplayInviewPct);
      console.log ("Sticky: %c"+playerObjs.assets.config.slide_inview, "font-weight: bold;", " --- Mobile sticky disabled: "+playerObjs.assets.config.slide_inview_mobile);

      if (checkIfOutstream(playerObjs)) {
        console.log("%cBPLR or Brid Outstream player detected!.", "color:#24b07f;font-weight: bold;");
        console.log ("JSON Config URL: "+bplrEnv+"/services/unit/"+playerObjs.assets.config.id+".json");
      }
      else {
        if (playerObjs.videos.length == 0) {
          console.log("%cVideo list is empty. No videos to display. Check for content GEO targeting.", "color:#24b07f;font-weight: bold;");
        }
        else {
          if (playerObjs.currentSource.source.hasOwnProperty('streaming') || playerObjs.currentSource.source.sd.includes(".m3u8")) {
            bplrStreamType = "STREAMING/HLS";
          }
          if (!playerObjs.currentSource.source.sd.includes("cdn.bplr.tv")) {
            bplrHostType = "EXTERNALLY";
          }
          console.log("Video playing is %c"+bplrHostType+" hosted and is "+bplrStreamType, "font-weight: bold;");
        }

        if (checkIfCarousel(playerObjs)) {
          console.log ("Carousel ID: %c"+playerObjs.assets.carousel, "font-weight: bold;");
          console.log ("Carousel JSON Config URL: "+bplrEnv+"/services/get/carousel/"+playerObjs.assets.config.id+"/"+playerObjs.assets.carousel+".json");
        }

        if (typeof playerObjs.assets.config.playlist === 'undefined') {
            console.log ("Video ID: %c"+playerObjs.videos.id, "font-weight: bold;");
            console.log ("Video JSON Config URL: "+bplrEnv+"/services/get/video/"+playerObjs.assets.config.id+"/"+playerObjs.videos.id+".json");
        }
        else {
            if (typeof playerObjs.assets.config.playlist === 'object') {
                switch (playerObjs.assets.config.playlist.mode) {
                    case "latest":
                        console.log ("Latest playlist used: "+bplrEnv+"/services/get/latest/"+playerObjs.assets.config.id+"/0/1/25/0.json");
                        break;
                    case "channel":
                        console.log ("Latest playlist by channel used. Channel ID: "+playerObjs.assets.config.playlist.id);
                        console.log ("JSON Config URL: "+bplrEnv+"/services/get/channel/"+playerObjs.assets.config.id+"/"+playerObjs.assets.config.playlist.id+"/1/25/0.json");
                        break;
                    case "tag":
                        console.log ("Latest playlist by tag used. Tag: "+playerObjs.assets.config.playlist.id);
                        console.log ("JSON Config URL: "+bplrEnv+"/services/get/tag/"+playerObjs.assets.config.id+"/"+playerObjs.assets.config.playlist.id+"/1/25/0.json");
                        break;
                    case "widget":
                        console.log ("Widget. Type: "+playerObjs.assets.config.playlist.widget_type);
                        console.log ("JSON Config URL: "+bplrEnv+"/services/get/widget/"+playerObjs.assets.config.id+"/"+playerObjs.assets.config.playlist.id+"/1/25.json");
                        break;
                    default:
                        console.log("Not able to recognize playlist.");
                    }
            }
            else {
                console.log ("Playlist ID: %c"+playerObjs.assets.config.playlist, "font-weight: bold;");
                console.log("JSON Config URL: "+bplrEnv+"/services/get/playlist/"+playerObjs.assets.config.id+"/"+playerObjs.assets.config.playlist+".json");
            }
        }
      }
      console.log("%cPlayer ADS Object", "color:#24b07f; font-size: 20px");
      console.log(playerObjs.assets.config.hasOwnProperty('AdSchedule'));
      
      if (playerObjs.assets.config.hasOwnProperty('AdSchedule')) {
        for (let j = 0; j < playerObjs.assets.config.AdSchedule.length; j++) {
          console.dir(playerObjs.assets.config.AdSchedule[j]);
        }
      }
      console.log ("------------------------------------------------------------------------------");
    }
  } else {
    console.log("Script already run! Exiting gracefully.");
  }
}