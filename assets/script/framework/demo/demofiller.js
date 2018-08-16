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
        this._view = null
        this._datas = null
        this.registerListener()
    },

    initData(view)
    {
        this._view = view
        this._datas = this.getTestData()
        this._view.initialize(this._datas)
    },

    onItemClick(item, index)
    {

    },

    onDataFiller(item, index)
    {
        if(Global.voteMgr.startVote("EXIT_VIEW", false))
        {
            return
        }
        var data = this._datas[index]
        item.getComponent(cc.Label).string = data
    },

    onScrollEnded()
    {
    },
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

    getTestData()
    {
        var data = new Array()
        for(var i = 0; i < 20; i++)
        {
            data.push("我是机器人"+i)
        }
        return data
    },

    enterViewComplete()
    {
    },

    onUpdateRankList()
    {
    },

    registerListener()
    {
        Global.eventMgr.registerListener("UPDATE_RANK_LIST", this.onUpdateRankList.bind(this))
        Global.eventMgr.registerListener("BASE_SHOW_ENTER_COMPLETE", this.enterViewComplete.bind(this))
    },

    releaseListener()
    {
        Global.eventMgr.releaseListener("UPDATE_RANK_LIST", this.onUpdateRankList.bind(this))
        Global.eventMgr.releaseListener("BASE_SHOW_ENTER_COMPLETE", this.enterViewComplete.bind(this))
    },

    onDestroy()
    {
        this._datas = null
        this.releaseListener()
    },


});
