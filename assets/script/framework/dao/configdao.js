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
var BaseDao = require("basedao")
var Entity = require("configvo")

var Dao = cc.Class({
    extends: BaseDao,

    properties: {
    },

    ctor()
    {
        this._dataPath = "resources/json/t_s_config.json"
        this.registerListener()
    },

    parseItemData(args)
    {
        var path = args.path
        if(this._dataPath != path)
        {
            return
        }
        var obj = args.data
        for(var temp in obj)
        {
            var item = obj[temp]
            var voObj = new Entity()
            voObj.initData(item)
            this._config.push(voObj)
        }
        Global.configMgr.setConfigDao(this)
        Global.voteMgr.addVote("ENTER_MAIN", Global.func.voteTrue, Global.func)
    },

    getConfigValueById(id)
    {
        var data = this.getDataById(id)
        if(data == null)
        {
            console.error("ConfigDao getConfigValueById -> ", id)
            return 
        }
        return data.value
    },

    registerListener()
    {
        Global.eventMgr.registerListener("PARSE_ITEM_DATA", this.parseItemData.bind(this))
    },
    
    releaseListener()
    {
        Global.eventMgr.releaseListener("PARSE_ITEM_DATA", this.parseItemData.bind(this))
    },

    onDestroy()
    {
        this.releaseListener()
    },
});

module.exports = new Dao()