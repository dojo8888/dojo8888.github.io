var deviceType = (function(){
    var device= "";
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){
        device= 'ios';
    }else if( userAgent.match( /Android/i ) ){
        device= 'android';
    }else{
        device= 'unknown'; 
    }   
    return device;
})();

isAndroid = (function(){
  return deviceType=="android" && typeof Android != "undefined";
})();

isIOS = (function(){
  return deviceType=="ios" && typeof IOS != "undefined";
})();

var postMessage = function(bridgeName, message) {
    if (isAndroid){
        Android[bridgeName](JSON.stringify(message));
    } else if (isIOS) {
        IOS[bridgeName].postMessage(message);
    } else {
        console.log(bridgeName, message);
    }
}

var simpleAlert = (...options) => {
    alert(options.join(" + "));
}

var appCallback = {
    "getJson" : simpleAlert, 
    "getPushToken":simpleAlert,
    "getLocation":simpleAlert,
    "getVersion":simpleAlert
}

var appRequest = {
    "setJson" : () => {
        let message = {
            "key" : "test",
            "data" : JSON.stringify(
              {
                "keyA" : "aaaa",
                "keyB" : "bbbb"
              }
            )
        }
        postMessage("setJson", message);
    },
    "getJson": () => {
        let message = {
            "key" : "test",
            "callback" : "appCallback.getJson"
        }
        postMessage("getJson",message);
    },
    "getPushToken": () => {
        let message = {
            "callback" : "appCallback.getPushToken"
        }
        postMessage("getPushToken",message);
    },
    "getLocation": () => {
        let message = {
            "callback" : "appCallback.getLocation"
        }
        postMessage("getLocation",message);
    },
    "getVersion": () => {
        let message = {
            "callback" : "appCallback.getVersion"
        }
        postMessage("getVersion",message);
    },
    "openUrlEx": () => {
        let message = {
            "url" : "http://m.naver.com"
        }
        postMessage("openUrlEx",message);
    },
    "openUrlPop" : () => {
        let message = {
            "url" : "http://m.naver.com",
            "title" : "네이버"
        }
        postMessage("openUrlPop",message);
    },
    "fileDownload" : () => {
        let message = {
            "url" : "https://myreviews4you.com/wp-content/uploads/2017/06/10.IU_.jpg"
          }
        postMessage("fileDownload",message);
    },
    "shareURL" : () => {
        postMessage("shareURL");
    },
    "closeWindow" : () => {
        let message = {
            "url" : "https://m.naver.com/"
          }
        postMessage("closeWindow",message);
    }
}
