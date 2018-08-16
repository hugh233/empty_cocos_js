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

    ctor()
    {
        this.colors = new Array()
        this._index = 0
        this.initData()
    },

    initData()
    {
        this.colors.push(cc.color(72, 72, 72))
        this.colors.push(cc.color(72, 72, 72))
        this.colors.push(cc.color(72, 72, 72))
        this.colors.push(cc.color(72, 72, 72))
        this.colors.push(cc.color(72, 72, 72))
        this.colors.push(cc.color(187, 187, 187))
        this.colors.push(cc.color(230, 230, 230))
        this.colors.push(cc.color(255, 255, 255))
    },

    setView(view)
    {
        this._view = view
        this._frames = 0
        this.initPoint()
        this.registerListener()
    },

    onUpdate()
    {
        if(Global.gameMgr.hasInitComplete())
        {
            Global.uiMgr.removeByTag(Global.files.DialogView)
            return
        }

        this._frames++
        if(this._frames % 15 == 0)
        {
            this.initPoint()
            this._index++
            if(this._index > 7)
            {
                this._index = 0
            }
        }
    },

    swapColors()
    {
        var temp = this.colors.pop()
        this.colors.splice(0, 0, temp)
    },

    initPoint()
    {
        this.swapColors()
        for(var i = 0; i < 8; i++)
        {
            var point = this._view.mpNodePoints.getChildByName("mpImg"+i)
            point.color = this.colors[i]
        }
    },

    registerListener()
    {

    },

    releaseListener()
    {

    },

    onDestroy()
    {
        this.colors.splice(0)
        this.releaseListener()
        this._view = null
    },
});
