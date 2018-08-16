/*------------------------------------------------------------------------------------------
--
--　　　　　　　┏┓　　　┏┓+ +
--　　　　　　┏┛┻━━━┛┻┓ + +
--　　　　　　┃　　　　　　　┃ 　
--　　　　　　┃　　　━　　　┃ ++ + + +
--　　　　　 ████━████ ┃+
--　　　　　　┃　　　　　　　┃ +
--　　　　　　┃　　　┻　　　┃
--　　　　　　┃　　　　　　　┃ + +
--　　　　　　┗━┓　　　┏━┛
--　　　　　　　　┃　　　┃　　　　　　　　　　　
--　　　　　　　　┃　　　┃ + + + +
--　　　　　　　　┃　　　┃　　　　　　　　　　　
--　　　　　　　　┃　　　┃ + 　　　　　　
--　　　　　　　　┃　　　┃
--　　　　　　　　┃　　　┃　　+　　　　　　　　　
--　　　　　　　　┃　 　　┗━━━┓ + +
--　　　　　　　　┃ 　　　　　　　┣┓
--　　　　　　　　┃ 　　　　　　　┏┛
--　　　　　　　　┗┓┓┏━┳┓┏┛ + + + +
--　　　　　　　　　┃┫┫　┃┫┫
--　　　　　　　　　┗┻┛　┗┻┛+ + + +
--
-- 
-- Code is far away from bug with the animal protecting
-- Author  : (moxun)hongchang.huang
------------------------------------------------------------------------------------------*/
var ResMgr = cc.Class({
    properties: {
    },

    loadRes(uiUrl, type, handler)
    {
        cc.loader.loadRes(uiUrl, type, function(err, res)
        {
            if(res == null)
            {
                console.log("resmgr loadRes failed: ", uiUrl, err)
                return
            }
            if (handler)
            {
                handler.call(handler.this, res)
            }
        })
    },

    loadUrlRes(path, handler)
    {
        var url = cc.url.raw(path)
        cc.loader.load(url, function(err, data)
        {
            if(err)
            {
                console.log("resmgr loadUrlRes failed: ", url, err)
                return
            }
            if (handler)
            {
                handler.call(handler.this, {data: data, path: path})
            }
        })
    },

});

module.exports = new ResMgr()
