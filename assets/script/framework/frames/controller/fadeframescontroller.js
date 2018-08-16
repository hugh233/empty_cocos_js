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
var BaseFramesController = require("baseframescontroller")

cc.Class({
    extends: BaseFramesController,
    properties: {

    },

    ctor()
    {
        this._args = null
    },

    analyzeArgs(args)
    {
        this._args = args
        var srcAlpha = args.src.alpha
        var targetAlpha = args.src.alpha
        this._step_alpha = Math.floor((targetAlpha - srcAlpha) / (this._endFrame - this._startFrame))
    },
    
    onFramesStart()
    {
        this._baseNode.opacity = this._args.src.alpha
    },
    
    onFramesUpdate()
    {
        this._baseNode.opacity += this._step_alpha
        if(this._baseNode.opacity > 255)
        {
            this._baseNode.opacity = 255
        }
    },

    onFramesEnd()
    {

    }
});
