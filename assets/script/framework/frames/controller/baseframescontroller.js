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
        this._startFrame = 0
        this._endFrame = 0
        this._frames = 0
        this._hasInit = false
        this._baseNode = null
        this._handler = null
        this._showView = null
        Global.resMgr.loadRes(Global.files.BaseFrameNode, cc.Prefab, this._initBaseNode.bind(this))
    },

    _initBaseNode(node)
    {
        this._baseNode = cc.instantiate(node)
        // console.log("_initBaseNode -> ", this._baseNode)
    },

    getBaseNode()
    {
        return this._baseNode
    },

    initData(startFrame, endFrame, view, args, handler)
    {
        this._startFrame = startFrame
        this._endFrame = endFrame
        this._handler = handler
        this._hasInit = true

        if (view != null)
        {
            view.removeFromParent()

            console.log("initData --------------> ", view._name, Global.uiMgr.getTopViewName())
            this._baseNode.setTag(view._name)
            view.setPosition(0,0)
            this._showView = view
            this._baseNode.addChild(view)
    
            var topView = Global.uiMgr.rootNode//Global.uiMgr.getTopView()
            this._baseNode.setPosition(0,0)
            topView.addChild(this._baseNode, 99999)
        }

        if(args != null)
        {
            this.analyzeArgs(args)
        }
    },

    analyzeArgs(args)
    {

    },

    onFramesStart()
    {
        console.log("BaseFramesController onFramesStart Run")
    },

    onFramesEnd()
    {
        console.log("BaseFramesController onFramesEnd Run")
    },
    
    onFramesUpdate()
    {
        console.log("BaseFramesController onFramesUpdate Run")
    },

    checkDestroy()
    {
        if (this._hasInit && this._frames > this._endFrame)
        {
            return true
        }
        return false
    },

    onUpdate()
    {
        if(!this._hasInit || this._baseNode == null)
        {
            return
        }
        // console.log("BaseFramesController onUpdate Run")
        this._frames ++ 
        if(this._frames == this._startFrame)
        {
            this.onFramesStart()
        }

        if(this._frames == this._endFrame)
        {
            this.onFramesEnd()
        }
        if(this._frames > this._startFrame && this._frames < this._endFrame)
        {
            this.onFramesUpdate()
        }
    },

    onDestroy()
    {
        console.log("BaseFramesController onDestroy Run")
        this._baseNode.destroy()
    }
});
