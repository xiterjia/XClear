(function(){
	chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.browserAction.setIcon({path: "images/icons/icon-48-1.png"});
		//默认配置，从localStorage里面取值
		var defaultOptions = function(){
			var xcache = localStorage["xcache"] == "true"; //default false
			var xcookies = localStorage["xcookies"] == "true";
			var xstorage = localStorage["xstorage"] == "true"; //default true
			var xindexedDB = localStorage["xindexedDB"] == "true";
			var xwebSQL = localStorage["xwebSQL"] == "true";
			var xpasswords = localStorage["xpasswords"] == "true";
			var xformData = localStorage["xformData"] == "true";
			var xhistory = localStorage["xhistory"] == "true";
			var xdownloads = localStorage["xdownloads"] == "true";
			var xpluginData = localStorage["xpluginData"] == "true";
			var xappcache = localStorage["xappcache"] == "true";
			var xfileSystems = localStorage["xfileSystems"] == "true";
			var xcacheDate = localStorage["xcacheDate"] || 7;
			return {
				xcache : xcache,
				xcookies : xcookies,
				xstorage : xstorage,
				xindexedDB : xindexedDB,
				xwebSQL : xwebSQL,
				xpasswords : xpasswords,
				xformData : xformData,
				xhistory : xhistory,
				xdownloads : xdownloads,
				xpluginData : xpluginData,
				xappcache : xappcache,
				xfileSystems : xfileSystems,
				xcacheDate : xcacheDate
			};
		}();
	

		function clearCache(){
			chrome.browsingData.remove({
		        "since": (new Date()).getTime() - defaultOptions.xcacheDate * 24 * 60 * 60 * 1000
			}, {
				"appcache": defaultOptions.xappcache,
				"downloads": defaultOptions.xdownloads,
				"fileSystems": defaultOptions.xfileSystems,
				"history": defaultOptions.xhistory,
				"pluginData": defaultOptions.xpluginData,
				"passwords": defaultOptions.xpasswords,
				"formData": defaultOptions.xformData,

				"cache": defaultOptions.xcache,
				"cookies": defaultOptions.xcookies,
				"indexedDB": defaultOptions.xindexedDB,
				"localStorage": defaultOptions.xstorage,
				"webSQL": defaultOptions.xwebSQL
			}, function(){
				chrome.browserAction.setIcon({path: "images/icons/icon-48.png"});
				setTimeout(function(){
					chrome.tabs.reload();
				},100);
			});
		}
		clearCache();
	});
})();
