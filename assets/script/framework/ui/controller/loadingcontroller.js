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
    properties: 
    {
    },

    setView(view)
    {
        this._dts = 0
        this._view = view
        this._canEnter = false
        this._viewData = null
        this._dirData = null
        this._configData = null
        this._completeCount = 0
        this._totalCount = 0
        this._hasEnter = false
        this.onPreLoadRes()
        this.registerListener()
        Global.eventMgr.dispatchEvent("SET_BG_VISIBLE", false)
    },

    onPreLoadRes()
    {
        this._viewData = this.getViewData()
        this._configData = this.getConfigData()
        this._totalCount = this._viewData.length + this._configData.length
        this._dirData = this.getDirData()

        var self = this
        Global.voteMgr.addVote("ENTER_MAIN", Global.func.voteFalse, Global.func)
        cc.loader.loadRes(Global.files.TestView, cc.Prefab, function()
        {
            self._completeCount ++ 
            if(self._view && self._view.setPro)
            {
                self._view.setPro(self._completeCount / self._totalCount)
            }
            Global.voteMgr.removeVote("ENTER_MAIN", Global.func.voteFalse, Global.func)
            Global.voteMgr.addVote("ENTER_MAIN", Global.func.voteTrue, Global.func)
        })

        this.loadDir(this._dirData)
        this.loadConfig(this._configData)
        this.loadView(this._viewData)
    },

    loadDir(arr)
    {
        var self = this
        for(let i = 0; i < arr.length; i++)
        {
            var strPath = arr[i]
            Global.voteMgr.addVote("ENTER_MAIN", Global.func.voteFalse, Global.func)
            cc.loader.loadResDir(strPath, function(args)
            {
                self._completeCount ++ 
                if(self._view && self._view.setPro)
                {
                    self._view.setPro(self._completeCount / self._totalCount)
                }
                Global.voteMgr.removeVote("ENTER_MAIN", Global.func.voteFalse, Global.func)
            })
        }
    },
    
    getDirData()
    {
        var data = new Array()
        data.push("sound")
        data.push("particle")
        data.push("spine")
        return data
    },

    getViewData()
    {
        var data = new Array()
        data.push(Global.files.TestView)
        data.push(Global.files.DialogView)
        data.push(Global.files.CommDialogView)
        data.push(Global.files.ReConnectView)
        data.push(Global.files.TipsUI)
        data.push(Global.files.BaseFrameNode)
        data.push(Global.files.ResNode)
        data.push(Global.files.MainView)
        return data
    },

    getConfigData()
    {
        var data = new Array()
        data.push("resources/json/t_s_config.json")
        return data
    },

    loadView(arr)
    {
        var self = this
        for(let i = 0; i < arr.length; i++)
        {
            var strPath = arr[i]
            Global.voteMgr.addVote("ENTER_MAIN", Global.func.voteFalse, Global.func)
            cc.loader.loadRes(strPath, function(args)
            {
                self._completeCount ++ 
                if(self._view && self._view.setPro)
                {
                    self._view.setPro(self._completeCount / self._totalCount)
                }
                Global.voteMgr.removeVote("ENTER_MAIN", Global.func.voteFalse, Global.func)
            })
        }
    },

    loadConfig(arr)
    {
        var self = this
        for(let i = 0; i < arr.length; i++)
        {
            var strPath = arr[i]
            Global.voteMgr.addVote("ENTER_MAIN", Global.func.voteFalse, Global.func)
            Global.resMgr.loadUrlRes(strPath, function(args)
            {
                self._completeCount ++ 
                if(self._view && self._view.setPro)
                {
                    self._view.setPro(self._completeCount / self._totalCount)
                }
                Global.eventMgr.dispatchEvent("PARSE_ITEM_DATA", args)
                Global.voteMgr.removeVote("ENTER_MAIN", Global.func.voteFalse, Global.func)
            })
        }
    },

    onUpdate(dt)
    {
        if(Global.voteMgr.startVote("ENTER_MAIN", false) && !this._hasEnter)
        {
            Global.eventMgr.dispatchEvent("SET_BG_VISIBLE", true)
            this._hasEnter = true
            Global.uiMgr.showFullView(Global.files.TestView)
            Global.voteMgr.removeVote("ENTER_MAIN")
        }
    },

    registerListener()
    {

    },

    releaseListener()
    {

    },

    onDestroy()
    {
        this.releaseListener()
        this._view = null
    },
});
