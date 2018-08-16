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
        var srcPos = args.src
        var targetPos = args.target
        
        this._stepX = (targetPos.x - srcPos.x) / (this._endFrame - this._startFrame)
        this._stepY = (targetPos.y - srcPos.y) / (this._endFrame - this._startFrame)
    },
    
    onFramesStart()
    {
        this._baseNode.setPosition(this._args.src.x, this._args.src.y)
    },
    
    onFramesEnd()
    {
        if(this._handler)
        {
            this._handler.call()
        }
    },
    
    onFramesUpdate()
    {
        if(this._args.src.x == this._args.target.x && this._args.src.y == this._args.target.y)
        {
            console.log("onFrameUpdate return - >", this._args)
            return
        }
        // console.log("LinearFramesController onFrameUpdate run", this._stepX, this._stepY)
        this._baseNode.setPositionX(this._baseNode.getPositionX() + this._stepX)
        this._baseNode.setPositionY(this._baseNode.getPositionY() + this._stepY)
    }
});
