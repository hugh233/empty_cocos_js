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
var LinearFramesController = require("linearframescontroller")
var TipsFramesController = require("tipsframescontroller")
var FadeFramesController = require("fadeframescontroller")
var ScaleFramesController = require("scaleframescontroller")

var FramsMgr = cc.Class({
    properties: 
    {
        
    },

    ctor()
    {
        this._ctrls = new Array()
    },

    showLinearTween(startFrame, endFrame, uiName, args, handler)
    {
        var self = this
        var ctrl = new LinearFramesController()
        Global.resMgr.loadRes(uiName, cc.Prefab, function(prefab)
        { 
            var ui = cc.instantiate(prefab)
            ctrl.initData(startFrame, endFrame, ui, args, handler)
            self._ctrls.push(ctrl)
        })
    },

    showTipsTween(startFrame, endFrame, uiName, args, handler)
    {
        var self = this
        var ctrl = new TipsFramesController()
        Global.resMgr.loadRes(uiName, cc.Prefab, function(prefab)
        { 
            var ui = cc.instantiate(prefab)
            ctrl.initData(startFrame, endFrame, ui, args, handler)
            self._ctrls.push(ctrl)
        })
    },

    showFadeTween(startFrame, endFrame, uiName, args, handler)
    {
        var self = this
        var ctrl = new FadeFramesController()
        Global.resMgr.loadRes(uiName, cc.Prefab, function(prefab)
        { 
            var ui = cc.instantiate(prefab)
            ctrl.initData(startFrame, endFrame, ui, args, handler)
            self._ctrls.push(ctrl)
        })
    },

    showGroupTween(startFrams, endFrames, uiName, args, handler)
    {
        var self = this
        var linearCtrl = null
        var fadeCtrl = null
        var scaleCtrl = null

        if(startFrams.linear)
        {
            linearCtrl = new LinearFramesController()
        }

        if(startFrams.fade)
        {
            fadeCtrl = new FadeFramesController()
        }

        if(startFrams.scale)
        {
            scaleCtrl = new ScaleFramesController()    
        }
        Global.resMgr.loadRes(uiName, cc.Prefab, function(prefab)
        { 
            var linearUi = cc.instantiate(prefab)
            if(startFrams.linear)
            {
                linearCtrl.initData(startFrams.linear, endFrames.linear, linearUi, args, handler)
                self._ctrls.push(linearCtrl)
            }

            if(startFrams.fade)
            {
                fadeCtrl.initData(startFrams.fade, endFrames.fade, linearCtrl.getBaseNode(), args, handler)
                self._ctrls.push(fadeCtrl)
            }
            
            if(startFrams.scale)
            {
                scaleCtrl.initData(startFrams.scale, endFrames.scale, linearCtrl.getBaseNode(), args, handler)
                self._ctrls.push(scaleCtrl)
            }
        })
    },

    onUpdate()
    {
        if (this._ctrls.length > 0)
        {
            for (var i = 0; i < this._ctrls.length; i++)
            {
                var ctrl = this._ctrls[i]
                if(ctrl.checkDestroy())
                {
                    ctrl.onDestroy()
                    this._ctrls.splice(i, 1)
                }else
                {
                    ctrl.onUpdate()
                }
            }
        }
    },

    onDestroy()
    {
        for (var ctrl in this._ctrls)
        {
            ctrl.onDestroy()
        }
    }
});

module.exports = new FramsMgr()