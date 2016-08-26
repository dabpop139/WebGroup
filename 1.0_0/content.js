//脚本
chrome.runtime.onMessage.addListener( function (request, sender, response) {
	if (request.greeting == "getkdmeta") {
		
		var okeys;
		if($("meta[name='keywords']").length>0){
			okeys=$("meta[name='keywords']");
		}else{
			okeys=$("meta[name='Keywords']");
		}
		var pkeys_a=okeys.attr("content");
		
		var osim;
		if($("meta[name='description']").length>0){
			osim=$("meta[name='description']");
		}else{
			osim=$("meta[name='Description']");
		}
		var psim_a=osim.attr("content");
		response({keys:pkeys_a,desc:psim_a});
	}
});