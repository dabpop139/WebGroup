//脚本
function safeFormat(postdt){
	if(typeof(postdt)=="undefined"){
		return null;
	}
	postdt=postdt.replace(/\*/gi,"~");
	postdt=postdt.replace(/'/gi,"’");
	postdt=postdt.replace(/insert/gi,"ｉnsert");
	postdt=postdt.replace(/select/gi,"ｓelect");
	postdt=postdt.replace(/delete/gi,"ｄelete");
	postdt=postdt.replace(/update/gi,"ｕpdate");
	postdt=postdt.replace(/count/gi,"ｃount");
	postdt=postdt.replace(/form/gi,"ｆorm");
	postdt=postdt.replace(/--/gi,"﹣﹣");
	return postdt;
};


function submitTips(tips){
	$(".top_tips h3").html(tips);
	$(".top_tips").slideDown();
	setTimeout(function(){
		$(".top_tips").slideUp();
		setTimeout(function(){
			$(".formpanel").fadeOut();
		}, 600);
	}, 2000);
};

function submitAjax(parms){
	if(!parms.query)parms.query = "";
	if(!parms.method)parms.method = "post";
	parms.query += "&userhash="+Math.random();
	$.ajax({"url":parms.url,
		"type":parms.method,
		"data":parms.query,
		"success":function(data){
			var tmp = null;
			try{
				tmp = $.parseJSON(data);
			}catch(e){
				
			}finally{
				if(tmp){
					data = tmp;
					//$.zoombox.hide();
					if(parseInt(data.statusCode) == 200){
						submitTips(data.message);
					}else if(parseInt(data.statusCode) == 300){
						submitTips(data.message);
					}else{
						submitTips(data.message);
					}
					setTimeout(function(){
						//xxx
					},2000);
				}
				else
				{
					if(data && data.substring(0,6) != 'error:')
					if(parms.target)
					{
						/*$('#'+parms.target).html(data);*/
					}
				}
				return data.statusCode;
			}
		}
	});
};

function formsubmit(){
	var _this = this;
	var status = false;
	var query;
	var target = $(_this).attr('direct');
	if(!target || target == '')target = 'datacontent';
	query = $(":input",_this).serialize();
	if(!$(_this).attr('action') || $(_this).attr('action') == '')return false;
	submitAjax({"url":$(_this).attr('action'),"query":query,"target":target});
	return false;
};

function checkForValidUrl(tab) { 
};

document.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		var href=tabs[0].url;
		var title=tabs[0].title;
		
		var pkeys="";
		var psim="";
		
		$("#purl").val(href);
		$("#ptitle").val(title);
		/*$("#psim").val(pkeys);
		$("#pkeys").val(psim);*/
		
		//chrome.extension.sendMessage 不能用这个
		chrome.tabs.sendMessage(tabs[0].id,{ greeting: "getkdmeta" }, function (response) {
			//$("#pkeys").val(JSON.stringify(response));
			$("#psim").val(response.desc);
			$("#pkeys").val(response.keys);
		});
		
		$("form").each(function(){
			if($(this).attr("noajax")!="noajax"){
				$(this).on('submit',formsubmit);
			}
		});
		$("#qscollect").click(function(){
			$("#gurl").val( escape(safeFormat($("#purl").val())) );
			$("#gtitle").val( escape(safeFormat($("#ptitle").val())) );
			$("#gsim").val( escape(safeFormat($("#psim").val())) );
			$("#gkeys").val( escape(safeFormat($("#pkeys").val())) );
			$("#form_favurl").submit();
		});
	});
});


/*chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.status == "loading") {
        checkForValidUrl(tab);
    }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo){
    chrome.tabs.getSelected(null, function(tab){
        checkForValidUrl(tab);
    });
});*/