var deviceType = "";
deviceType = (function(){
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
	return deviceType=="ios" && typeof window.webkit != "undefined" && typeof window.webkit.messageHandlers != "undefined";
})();

// APP -> WEB
var FromApp = {
	// 01. 푸쉬 토큰 획득 callback
	receivePushToken : function(pushToken){
		alert(pushToken);
	},
	// 02. 아이디/패스워드 저장 callback
	receiveUserInfoStoreResult : function(success){
		alert(success);
	},
	// 03. 아이디/패스워드 획득 callback
	receiveUserInfo : function(id, pwd){
		alert('id:' + id + ' pwd:' + pwd);
	},
	
	// 04. 파일 다운로드 callback
	receiveDownloadResult : function(url){
		alert(url);
	},
	// 05. 파일 다운로드 callback
	receiveUploadResult : function(url){
		alert(url);
	},

	// 06. FCM 수신시 호출되는 callback. global js에 포함되어야 함.
	receiveFCM : function(jsonStr){
		alert(jsonStr);
	},

	// 06-01. FCM 수신 callback 설정 결과 callback
	receiveFCMSetResult : function(result){
		alert(result);
	},
		
	// 07. 전화번호 획득 callback
	receivePhoneNumber : function(pn){
		alert(pn);
	},

	// 08. 토스트 메세지 callback
	receiveToastResult : function(result){
		alert(result);
	},

	// 09. JSON 저장 callback
	receiveStoresJsonResult : function(result){
		alert(result);
	},

	// 10. JSON 획득 callback
	receiveJsonData : function(jsonStr){
		alert(jsonStr);
	}
}

// WEB -> APP
var ToApp = {
	// 01. 푸쉬 토큰 불러오기 (FromApp.requestToken 이 APP 에서 호출됨 )
	requestToken : function(callback){
		if (isAndroid){
			Android.requestToken(callback);
		}else if (isIOS){
			IOS.requestToken.postMessage([callback]);
		}
	},

	// 02. 아이디/패스워드 저장 
	requestStoresUser : function(callback, id, pwd){
		if (isAndroid){
			Android.requestStoresUser(callback, id, pwd);
		}else if (isIOS){
			IOS.requestStoresUser.postMessage([callback, id, pwd]);
		}
	},

	// 03. 아이디/패스워드 획득 
	requestUser : function(callback){
		if (isAndroid){
			Android.requestUser(callback);
		}else if (isIOS){
			IOS.requestUser.postMessage([callback]);
		}
	}, 

	// 04. 파일 다운로드 
	requestDownload : function(callback, downUrl){
		if (isAndroid){
			Android.requestDownload(callback, downUrl);
		}else if (isIOS){
			IOS.requestDownload.postMessage([callback, downUrl]);
		}
	}, 

	// 05. 파일 업로드
	requestUpload : function(callback, uploadUri){
		if (isAndroid){
			Android.requestUpload(callback, uploadUri);
		}else if (isIOS){
			IOS.requestUpload.postMessage([callback, uploadUri]);
		}
	}, 
	
	// 06. FCM(푸시) 메세지 callback function 설정. global js에서 최초 로딩 될 때 1회 호출 되어야 함.
	/**
	* @param fcmReceiveCallback FCM이 수신되었을 때 호출될 callback
	* @param fmcFuncSetCallback FCM이 callback이 올바르게 설정 되었는가에 대한 결과를 받을 callback, 필요 없을 경우 공백문자('');
	*/
	requestSetsTheFCMFunction : function(fcmReceiveCallback, fmcFuncSetCallback){
		if (isAndroid){
			Android.requestSetsTheFCMFunction(fcmReceiveCallback, fmcFuncSetCallback);
		}else if (isIOS){
			IOS.requestSetsTheFCMFunction.postMessage([fcmReceiveCallback, fmcFuncSetCallback]);
		}
	}, 

	// 07. 전화번호 획득 
	requestPhoneNumber : function(callback){
		if (isAndroid){
			Android.requestPhoneNumber(callback);
		}else if (isIOS){
			IOS.requestPhoneNumber.postMessage([callback]);
		}
	}, 

	// 08. Toast message
	requestToast : function(callback, title, msg){
		if (isAndroid){
			Android.requestToast(callback, title, msg);
		}else if (isIOS){
			IOS.requestToast.postMessage([callback, title, msg]);
		}
	}, 

	// 09. JSON 저장 
	requestStoresJsonData : function(callback, storeKey, jsonStr){
		if (isAndroid){
			Android.requestStoresJsonData(callback, storeKey, jsonStr);
		}else if (isIOS){
			IOS.requestStoresJsonData.postMessage([callback, storeKey, jsonStr]);
		}
	}, 

	// 10. JSON 획득 
	requestJsonData : function(callback, storeKey){
		if (isAndroid){
			Android.requestJsonData(callback, storeKey);
		}else if (isIOS){
			IOS.requestJsonData.postMessage([callback, storeKey]);
		}
	},

	// 11. FCM 전송 테스트 - 푸시전송 테스트입니다. 구현하지 마세요.
	requestSendFCM : function(){
		if (isAndroid){
			Android.requestSendFCM();
		}else if (isIOS){
			IOS.requestSendFCM.postMessage([]);
		}
	}

}






