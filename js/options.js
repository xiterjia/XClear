(function($){
    // 默认配置，从localStorage里面取值
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
    //关闭按钮
    $("#close").on('click',function(){
        //关闭当前窗口
        closeWindows();
    });
    //保存按钮
    $("#save").on('click',function(){
        $("[id^='x']").each(function(){
            var _this = $(this),key = _this.attr('id');
            if(_this.is('select')){
                localStorage[key] = _this.val();
            }else{
                localStorage[key] =  _this.is(':checked') ? 'true' : 'false';
            }
        });
        //关闭当前窗口
        closeWindows();
    });
    //加载数据
    $(function(){
        $.each(defaultOptions,function(key,value){
            if(key == "xcacheDate"){
                $('#'+key).children('option[value="'+value+'"]').attr('selected','selected');
            }else{
                $('#' + key).attr('checked',value);
            }
        });
    });
    // 关闭当前窗口
    function closeWindows(){
        chrome.windows.getAll({populate: true}, function(windows) {
            if (windows.length > 1 || windows[0].tabs.length > 1) {
                window.close();
            } else {
                chrome.tabs.create({
                    "url": "chrome://newtab/",
                    "selected": false
                }, function(tab) {
                    window.close();
                });
            }
        });
    }
})(jQuery);