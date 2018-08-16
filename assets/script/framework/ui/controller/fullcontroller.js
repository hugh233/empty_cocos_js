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
var uiMgr = Global.uiMgr
var resMgr = Global.resMgr
var files = Global.files

cc.Class({
    properties: {
    },
    ctor()
    {
        this._view = null
        this._showView = null
        this._showViewPath = ""
    },

    getShowViewPath()
    {
        return this._showViewPath
    },

    initShowView(viewPath, data)
    {
        var self = this
        resMgr.loadRes(viewPath, cc.Prefab, function(prefab)
        {
            self._showView = cc.instantiate(prefab)
            self._showView.setPosition(0,0)
            if(self._view != null)
            {
                if(data != null)
                {
                    self._showView.setData(data)   
                }
                self._view.addChild(self._showView)
            }
        })
    },
    
    setShowView(viewPath, data)
    {
        this._showViewPath = viewPath
        var self = this
        resMgr.loadRes(files.FullView, cc.Prefab, function(prefab)
        {
            self._view = cc.instantiate(prefab)
            uiMgr.addView(self._view, files.FullView)
            self.registerListener()
            self.initShowView(viewPath, data)
        })
    },

    getView()
    {
        return this._view
    },

    getViewScript()
    {
        return this._view.getComponent("fullview")
    },

    registerListener()
    {
    },

    releaseListener()
    {
    },

    onDestroy()
    {
        
        this._view = null
        this.releaseListener()
    },
});
