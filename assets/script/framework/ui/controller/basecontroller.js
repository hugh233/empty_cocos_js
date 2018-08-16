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

    setView(view, frameNum)
    {
        this._view = view
        this._frames = 0
        this._exitFrames = 0

        this._frameEnd = frameNum
        this._showExit = false

        this._handler = null
        this._args = new Array()
        this.registerListener()
    },

    onButtonClickBack()
    {
        Global.uiMgr.showFullView(Global.files.MainView)
    },

    onUpdate()
    {
    },
    
    onFixedUpdate()
    {
        this._frames ++
        if(this._showExit)
        {
            if(this._exitFrames == 0)
            {
                Global.eventMgr.dispatchEvent("BASE_SHOW_EXIT_BEGIN")
            }
            this._exitFrames++
            if(this._exitFrames > this._frameEnd)
            {
                this._handler.call(this._handler.this, this._args)
                return
            }
            this._view.titleExit(this._exitFrames)
            this._view.contentExit(this._exitFrames)
            return
        }
    
        if(this._frames == this._frameEnd)
        {
            this.enterView()
            Global.eventMgr.dispatchEvent("BASE_SHOW_ENTER_COMPLETE")
        }
        if(this._frames > this._frameEnd)
        {
            return
        }
        if(this._frames == 1)
        {
            this.onShowEnterBegin()
        }
        this._view.titleEnter(this._frames)
        this._view.contentEnter(this._frames)
    },

    onShowEnterBegin()
    {
        // Global.soundMgr.playSound(Global.pathMgr.SOUND_CHANGE_VIEW)
        Global.eventMgr.dispatchEvent("BASE_SHOW_ENTER_BEGIN")
    },

    enterView()
    {
        this._view.enterView()
    },
    
    exitView(handler, args)
    {
        this._showExit = true
        this._handler = handler
        this._args = args
        
        Global.voteMgr.addVote("EXIT_VIEW", Global.func.voteTrue, Global.func)
    },

    registerListener()
    {
    },
    
    releaseListener()
    {
        Global.voteMgr.removeVote("EXIT_VIEW", Global.func.voteTrue, Global.func)
    },

    onDestroy()
    {
        this.releaseListener()
        this._view = null
    },
});
