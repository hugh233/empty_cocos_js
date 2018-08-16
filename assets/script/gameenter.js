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
require("global")
require("globalfunc")
Global.eventMgr = require("eventmgr")
Global.voteMgr = require("votemgr")
Global.files = require("filelist")
Global.resMgr = require("resmgr")
Global.uiMgr = require("uimgr")
// Global.sdkMgr = require("sdkmgr")
Global.typeConfig = require("typeconfig")
Global.tipsMgr = require("tipsmgr")
Global.framesMgr = require("framesmgr")
Global.pathMgr = require("pathmgr")
Global.soundMgr = require("soundmgr")
Global.protoCode = require("protocode")
Global.socketMgr = require("socketmgr")

cc.Class({
    extends: cc.Component,

    properties: 
    {
        mpImgBg: cc.Node,
    },

    ctor()
    {
    },

    onLoad () 
    {
        Global.uiMgr.showFullView(Global.files.LoadingView)
    },

    onFixedUpdate(dt)
    {

    },

    update(dt)
    {
        this._dts += dt
        if(this._dts >= Global.FRAME)
        {
            this._dts -= Global.FRAME
            this.onFixedUpdate(Global.FRAME)
        }

        Global.framesMgr.onUpdate()
    },

    onDestroy()
    {
        this.releaseListener()
    },

    registerListener()
    {
        Global.eventMgr.registerListener("SET_BG_VISIBLE", this.setBgVisible.bind(this))
    },
    
    releaseListener()
    {
        Global.eventMgr.releaseListener("SET_BG_VISIBLE", this.setBgVisible.bind(this))
    },

});
