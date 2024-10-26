// simple reformat of the minutes and seconds
const formatRemainingSeconds = (seconds) => {
    return(seconds-(seconds%=60))/60+(9<seconds?':':':0')+seconds
}


const fancyFormat = (duration) => { 
    // Hours, minutes and seconds (from stack overflow)
    const hrs = ~~(duration / 3600); // shorthand for Math.floor()
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
  
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
  
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
  
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
  
    return ret;
}


export {formatRemainingSeconds, fancyFormat}