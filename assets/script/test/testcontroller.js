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
        this._resCtrls = new Array()
        this.initRes()
        this.registerListener()
    },

    initRes()
    {
        var ResController = require("rescontroller")

        var res = new ResController()
        res.setData(Global.typeConfig.ResType.Lv, this._view.mpNodeRes, true)

        this._resCtrls.push(res)
    },

    onButtonClickSbowDialog()
    {
        console.log("TestController onButtonClickSbowDialog Run")
        var Controller = require("dialogcontroller")
        var ctrl = new Controller()
        ctrl.setShowView(Global.files.CommDialogView, false, {componentName: "commdialogview", desc: "这是内容", left: "左边按钮", right: "右边按钮"})
    },

    onButtonClickMain()
    {
        console.log("TestController onButtonClickMain Run")
        Global.uiMgr.showFullView(Global.files.MainView)
    },

    onButtonClickTips()
    {
        console.log("TestController onButtonClickTips Run")
        Global.tipsMgr.showTips("测试飘字")
        Global.eventMgr.dispatchEvent("TEST_FUNC")
    },

    testFunc()
    {
        console.log("TestController testFunc Run")
    },

    registerListener()
    {
        Global.func.clickEndEvent(this._view.mpBtnDialog, this.onButtonClickSbowDialog, this)
        Global.func.clickEndEvent(this._view.mpBtnMain, this.onButtonClickMain, this)
        Global.func.clickEndEvent(this._view.mpBtnTips, this.onButtonClickTips, this)

        Global.eventMgr.registerListener("TEST_FUNC", this.testFunc.bind(this))
    },

    releaseListener()
    {
        Global.eventMgr.releaseListener("TEST_FUNC", this.testFunc.bind(this))
    },

    destroyRes()
    {
        for (var i = 0; i < this._resCtrls.length; i++)
        {
            var ctrl = this._resCtrls[i]
            if(ctrl)
            {
                ctrl.onDestroy()
            }
        }
    },

    onDestroy()
    {
        this.destroyRes()
        this.releaseListener()
        this._view = null
    },
});
