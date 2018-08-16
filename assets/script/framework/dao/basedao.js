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
cc.Class({
    properties: {
    },

    ctor()
    {
        this._config = new Array()
        this._dataPath = null
    },
    
    parseConfig()
    {
        if(this._config == null)
        {
            console.log("Config init ...", this._dataPath)
            this._config = new Array()
        }

        if(this._dataPath == null)
        {
            console.log("Config init ERROR no datapath")
            return
        }

        var self = this
        cc.loader.loadRes(self._dataPath, function(err, obj)
        {
            if(err)   
            {
                console.log("parseConfig ERROR -> ", self._dataPath, err)
                return 
            }
            self.parseItemData(obj)
        })
    },

    parseItemData(obj)
    {

    },

    getConfig()
    {
        if(this._config == null)
        {
            console.log("dao has not init in getConfig")
            this._config = new Array()
        }
        
        return this._config
    },

    getDataById(id)
    {
        if(this._config == null)
        {
            console.log("dao has not init in getDataById")
            return
        }

        for(var i = 0; i < this._config.length; i++)
        {
            var data =  this._config[i]
            if(data.id == id)
            {
                return data
            }
        }
        return null
    },
});
