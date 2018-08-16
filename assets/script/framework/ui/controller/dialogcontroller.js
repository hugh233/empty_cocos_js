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

        this._view = null
        this._showView = null
        this._handler = null
        this._showViewPath = ""
    },

    getShowViewPath()
    {
        return this._showViewPath
    },

    initShowView(viewPath, data)
    {
        var self = this
        Global.resMgr.loadRes(viewPath, cc.Prefab, function(prefab)
        {
            self._showView = cc.instantiate(prefab)
            self._showView.setPosition(0,0)
            if(self._view != null)
            {
                if(data != null && data.componentName != null)
                {
                    var viewScript = self._showView.getComponent(data.componentName)
                    viewScript.setData(data)
                }
                self._view.addChild(self._showView)
                let scaleBefore = cc.scaleTo(0, 1.2, 1.2)
                let scaleAfter = cc.scaleTo(0.2, 1, 1)
                scaleAfter.easing(cc.easeBounceOut())
                let seq = cc.sequence(scaleBefore, scaleAfter)
                self._showView.runAction(seq)
            }
        })
    },
    
    setShowView(viewPath, isAutoClose, data)
    {
        this._showViewPath = viewPath
        this._isAutoClose = isAutoClose
        var self = this
        Global.resMgr.loadRes(Global.files.DialogView, cc.Prefab, function(prefab)
        {
            self._view = cc.instantiate(prefab)
            Global.uiMgr.addView(self._view, viewPath, Global.typeConfig.zOrder.Dialog)
            self.getViewScript().initCtrl(self)
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
        return this._view.getComponent("dialogview")
    },

    onButtonClickMesk(event)
    {
        var touchPoint = event.touch._point
        var viewSize = this._showView.getContentSize()
        var winSize = Global.typeConfig.WinSize
        
        if( (touchPoint.x >= (winSize.width - viewSize.width) / 2) 
        &&  (touchPoint.x <= (winSize.width - viewSize.width) / 2 + viewSize.width)
        &&  (touchPoint.y >= (winSize.height - viewSize.height) / 2)
        &&  (touchPoint.y <= (winSize.height - viewSize.height) / 2 + viewSize.height) )
        {
        }else
        {
            if(this._isAutoClose)
            {
                Global.uiMgr.removeByTag(this._showViewPath, false)
            }
        }
        return
    },

    onDialogClose()
    {
        this.getViewScript().mpNodeMesk.node.active = false
    },

    registerListener()
    {
        this.getViewScript().mpNodeMesk.node.on(cc.Node.EventType.TOUCH_END, this.onButtonClickMesk, this)
        Global.eventMgr.registerListener("CLOSE_DIALOG", this.onDialogClose.bind(this))
    },

    releaseListener()
    {
        // this.getViewScript().mpNodeMesk.node.off(cc.Node.EventType.TOUCH_END, this.onButtonClickMesk, this)
        Global.eventMgr.releaseListener("CLOSE_DIALOG", this.onDialogClose.bind(this))
    },

    onDestroy()
    {
        console.log("DialogController onDestroy Run")
        this.releaseListener()
        this._view = null
    },
});
