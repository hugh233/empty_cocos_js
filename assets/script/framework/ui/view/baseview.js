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
    extends: cc.Component,

    properties: 
    {
        mpNodeTitle: cc.Node,
        mpNodeContent: cc.Node,
        mpNodeContent2: cc.Node,
        mpNodeContent3: cc.Node,

        mpIsReverse: false,
        mpIsReverse2: false,
        mpIsReverse3: false,

        mpNumFrameEnd: 10,
        xOffset: 500,
        yOffset: 200,
    },

    onLoad () 
    {
        this._dts = 0
        this.initCtrl()
        this.initView()
    },

    initCtrl()
    {
        var Controller = require("basecontroller")
        this._ctrl = new Controller()
        this._ctrl.setView(this, this.mpNumFrameEnd)
    },

    contentEnter(frame)
    {
        if(frame % 2 != 1)
        {
            return
        }

        var x = this.getMoveOffsetX(this._contentPos, this.mpIsReverse, frame)
        this.mpNodeContent.setPositionX(x)
        this.mpNodeContent.opacity = 255 * frame / this.mpNumFrameEnd

        Global.eventMgr.dispatchEvent("CONTENT_ENTER_X", {x:x, alpha: this.mpNodeContent.opacity})
        
        if(this.mpNodeContent2)
        {
            // var x2 = this.getMoveOffsetX(this._contentPos2, this.mpIsReverse2, frame)
            this.mpNodeContent2.setPositionX(x * 1.5)
            this.mpNodeContent2.opacity = 255 * frame / this.mpNumFrameEnd
        }
        if(this.mpNodeContent3)
        {
            // var x3 = this.getMoveOffsetX(this._contentPos3, this.mpIsReverse3, frame)
            this.mpNodeContent3.setPositionX(x * 3)
            this.mpNodeContent3.opacity = 255 * frame / this.mpNumFrameEnd
        }
    },

    getMoveOffsetX(pos, isReverse, frame)
    {
        var x = 0
        if(isReverse)
        {
            x = (pos.x + this.xOffset) + this.xOffset * frame / this.mpNumFrameEnd
        }else
        {
            x = (pos.x + this.xOffset) - this.xOffset * frame / this.mpNumFrameEnd
        }
        return x
    },

    contentExit(frame)
    {
        if(frame % 2 != 1)
        {
            return
        }
        var x = this._contentPos.x + this.xOffset * frame / this.mpNumFrameEnd
        this.mpNodeContent.setPositionX(x)

        this.mpNodeContent.opacity = 255 - 255 * frame / this.mpNumFrameEnd
        Global.eventMgr.dispatchEvent("CONTENT_ENTER_X", {x:x, alpha: this.mpNodeContent.opacity})

        if(this.mpNodeContent2)
        {
            this.mpNodeContent2.setPositionX(x * 2 / 3)
            this.mpNodeContent2.opacity = 255 - 255 * frame / this.mpNumFrameEnd
        }
        if(this.mpNodeContent3)
        {
            this.mpNodeContent3.setPositionX(x / 3)
            this.mpNodeContent3.opacity = 255 - 255 * frame / this.mpNumFrameEnd
        }
    },

    titleEnter(frame)
    {
        if(frame % 2 != 1)
        {
            return
        }

        var y = (this._titlePos.y + this.yOffset) - this.yOffset * frame / this.mpNumFrameEnd
        this.mpNodeTitle.setPositionY(y)
        
        this.mpNodeTitle.opacity = 255 * frame / this.mpNumFrameEnd
    },

    titleExit(frame)
    {
        if(frame % 2 != 1)
        {
            return
        }

        var y = this._titlePos.y + this.yOffset * frame / this.mpNumFrameEnd
        this.mpNodeTitle.setPositionY(y)

        this.mpNodeTitle.opacity = 255 - 255 * frame / this.mpNumFrameEnd

    },

    update(dt)
    {
        // console.log("baseview -> update : ", dt, this._dts)
        this._dts += dt
        if(this._dts >= Global.FRAME)
        {
            this._dts -= Global.FRAME
            this.onFixedUpdate(Global.FRAME)
        }
        if(this._ctrl)
        {
            this._ctrl.onUpdate()
        }
    },
    
    onFixedUpdate(dt)
    {
        // console.log("baseview -> onFixedUpdate : ", dt)
        if(this._ctrl && this._ctrl.onFixedUpdate)
        {
            this._ctrl.onFixedUpdate(dt)
        }
    },

    enterView()
    {
        this.mpNodeTitle.setPosition(this._titlePos)
        this.mpNodeContent.setPosition(this._contentPos)
        if(this.mpNodeContent2)
        {
            this.mpNodeContent2.setPosition(this._contentPos2)
        }
        if(this.mpNodeContent3)
        {
            this.mpNodeContent3.setPosition(this._contentPos3)
        }
        Global.eventMgr.dispatchEvent("BASE_ENTER_VIEW")
    },

    exitView(handler, args)
    {
        if(this._ctrl)
        {
            this._ctrl.exitView(handler, args)
        }
        Global.eventMgr.dispatchEvent("BASE_EXIT_VIEW")
    },
    
    initView()
    {
        this._titlePos = this.mpNodeTitle.getPosition()
        this._contentPos = this.mpNodeContent.getPosition()
        if(this.mpNodeContent2)
        {
            this._contentPos2 = this.mpNodeContent2.getPosition()
            if(this.mpIsReverse)
            {
                this.mpNodeContent2.setPositionX(cc.p(this._contentPos2.x - this.xOffset, this._contentPos2.y))
            }else
            {
                this.mpNodeContent2.setPositionX(cc.p(this._contentPos2.x + this.xOffset, this._contentPos2.y))
            }
        }
        if(this.mpNodeContent3)
        {
            this._contentPos3 = this.mpNodeContent3.getPosition()
            if(this.mpIsReverse)
            {
                this.mpNodeContent3.setPositionX(cc.p(this._contentPos3.x - this.xOffset, this._contentPos3.y))
            }else
            {
                this.mpNodeContent3.setPositionX(cc.p(this._contentPos3.x + this.xOffset, this._contentPos3.y))
            }
        }

        this.mpNodeTitle.setPositionY(cc.p(this._titlePos.x, this._titlePos.y + this.yOffset))
        if(this.mpIsReverse)
        {
            this.mpNodeContent.setPositionX(cc.p(this._contentPos.x - this.xOffset, this._contentPos.y))
        }else
        {
            this.mpNodeContent.setPositionX(cc.p(this._contentPos.x + this.xOffset, this._contentPos.y))
        }

    },

    onDestroy()
    {
        if (this._ctrl)
        {
            this._ctrl.onDestroy()
        }
    },
});
