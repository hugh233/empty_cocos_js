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
        var srcScale = args.src.scale
        var targetScale = args.target.scale
        this._stepS = (targetScale - srcScale) / (this._endFrame - this._startFrame)
    },
    
    onFramesStart()
    {
        this._baseNode.scale = this._args.src.scale
    },
    
    onFramesEnd()
    {
        this._baseNode.scale = this._args.target.scale
        if(this._handler)
        {
            this._handler.call()
        }
    },
    
    onFramesUpdate()
    {
        this._baseNode.scale += this._stepS
    }
});
