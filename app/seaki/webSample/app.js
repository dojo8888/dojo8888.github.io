

// 필수 선언 구문 (START)
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
// 필수 선언 구문 (END)




// 따로 구현할 것
var simpleAlert = (...options) => {
    alert(options.join(" + "));
}


// 따로 구현할 것
var appCallback = {
    "appGetJson" : simpleAlert, 
    "getPushToken":simpleAlert,
}


var appRequest = {

    // json 데이타 저장
    // @param key : 저장키
    // @param data : 저장할 데이터
    "appSetJson" : (key, jsonString) => {
        let message = {
            "key" : key,
            "data" : jsonString
        }
        postMessage("appSetJson", message);
    },

    // 저장한 json 데이타 불러오기
    // @param key : 저장키
    // @param callback : 응답받을 콜백함수 명
    // appCallback.getJson('{"id" : "aaaa","password" : "bbbb","autoLoginYn" : "Y"}')
    "appGetJson": (key, callbackFunName) => {
        let message = {
            "key" : key,
            "callback" : callbackFunName
        }
        postMessage("appGetJson",message);
    },
    
    // firebase token 불러오기, 콜백으로 응답받음
    // 최초 fcm 으로 부터 token 을 받아오는데 시간이 걸리므로, 시간차가 발생할 수 있음
    // @param callback : 응답받을 콜백함수 명
    // appCallback.getPushToken('wef1f12-1d11g1g-12e12-f1f1g1')
    "getPushToken": (callbackFunName) => {
        let message = {
            "callback" : callbackFunName
        }
        postMessage("getPushToken",message);
    },
    
    // 최신 앱 버전 앱에 전달 (최신 버전은 서버에서 관리되어야 함)
    // 앱에서는 전달받은 버전을 사용자 폰의 앱 버전과 비교하여 업데이트 여부를 수행 
    // @param iosTitle : iOS 앱업데이트 알림 문구 "최신 업데이트가 있습니다. "
    // @param aosTitle : android 앱업데이트 알림 문구 "최신 업데이트가 있습니다. "
    // @param iosVersion : iOS 버전 (ex. "1.0.0") 
    // @param aosVersion : 안드로이드 버전 (ex. "1.0.0")
    // @param forceYn : "Y" or "N"
    "appVersionCheck": (title ,iosVersion, aosVersion, forceYn) => {
        let message = {
            "title" : title,
            "iosVersion" : iosVersion,
            "aosVersion" : aosVersion,
            "forceYn" : forceYn
        }
        postMessage("appVersionCheck",message);
    },
    // 본인인증 페이지 호출
    // "appPhoneAuth" : () => {
    //     postMessage("appPhoneAuth");
    // },
    // 앱 설정으로 이동 (푸시 설정 등)
    "goAppSetting" : () => {
        postMessage("goAppSetting");
    },
    
    // 앱 강제 종료
    "appStop": () => {
        postMessage("appStop");
    },

    // window.opener 함수 호출 대체
    // @param funcName : 함수명
    // @param args : array 형태의 함수 전달 args 
    // "appOpenerCall": (funcName, args) => {
    //     let message = {
    //         "funcName" : funcName,
    //         "args" : args
    //     }
    //     postMessage("appOpenerCall",message);
    // },

    // 웹 페이지 공유하기
    // @param url : 공유할 페이지 주소
    "shareURL" : (url) => {
        let message = {
            "url" : url
        }
        postMessage("shareURL", message);
    }
}
