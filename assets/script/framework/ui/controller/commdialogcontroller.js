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
        this._view = view
        this._viewData = null
        this._leftHandler = null
        this._rightHandler = null
        this.registerListener()
    },

    setData(data)
    {
        this._viewData = data
        if(data.leftHandler != null)
        {
            this._leftHandler = data.leftHandler
        }
        if(data.rightHandler != null)
        {
            this._rightHandler = data.rightHandler
        }
    },

    onButtonClickLeft()
    {
        Global.eventMgr.dispatchEvent("CLOSE_DIALOG")
        if(this._leftHandler != null)
        {
            this._leftHandler.call()
        }
        Global.uiMgr.removeByTag(Global.files.CommDialogView, true)
    },

    onButtonClickRight()
    {
        Global.eventMgr.dispatchEvent("CLOSE_DIALOG")
        if(this._rightHandler != null)
        {
            this._rightHandler.call()
        }
        Global.uiMgr.removeByTag(Global.files.CommDialogView, true)
    },

    registerListener()
    {
        this._view.mpNodeLeft.on(cc.Node.EventType.TOUCH_END, this.onButtonClickLeft, this)
        this._view.mpNodeRight.on(cc.Node.EventType.TOUCH_END, this.onButtonClickRight, this)
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
