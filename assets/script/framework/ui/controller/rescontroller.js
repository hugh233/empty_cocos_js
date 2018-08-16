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
        this._number = 0
        this._isPause = false
    },

    setData(type, parent, isShowAdd)
    {
        var self = this
        this._type = type
        Global.resMgr.loadRes(Global.files.ResNode, cc.Prefab, function(prefab)
        {
            self._view = cc.instantiate(prefab)
            self._view.setPosition(0, 0)
            parent.addChild(self._view)
            self.initView(type, isShowAdd)
            self.registerListener()
        })
    },
    
    getView()
    {
        return this._view
    },

    getViewScript()
    {
        return this._view.getComponent("resview")
    },
    
    initView(type, isShowAdd)
    {
        if(type == Global.typeConfig.ResType.Lv)
        {
            this.getViewScript().setIcon(Global.pathMgr.COMM_LEVEL)
            this._number = 0//Global.gameMgr.getUserLv()
        }
        this.getViewScript().showAdd(isShowAdd)
        this.setNum(this._number)
    },

    setNum(num)
    {
        this.getViewScript().setNum(num)
    },

    initData()
    {
        if(this._type == Global.typeConfig.ResType.Lv)
        {
            this._number = Global.gameMgr.getUserLv()
        }

        this.setNum(this._number)
    },

    onButtonClickAdd()
    {
        console.log("ResController onButtonClickAdd Run")
    },

    recvResUpdate(args)
    {
        if(args.type == this._type)
        {
            this.getViewScript().setNum(args.num)
        }
    },

    registerListener()
    {
        this.getViewScript().getImgAdd().node.on(cc.Node.EventType.TOUCH_END, this.onButtonClickAdd, this)
        
        // Global.socketMgr.addProto(Global.protoCode.s2c.RECV_RES, this.recvResUpdate.bind(this))
        Global.eventMgr.registerListener("RECV_ROLE_UPDATE", this.initData.bind(this))
    },
    
    releaseListener()
    {
        // this.getViewScript().getImgAdd().node.off(cc.Node.EventType.TOUCH_END, this.onButtonClickAdd, this)
        // Global.socketMgr.removeProto(Global.protoCode.s2c.RECV_RES, this.recvResUpdate.bind(this))
        Global.eventMgr.releaseListener("RECV_ROLE_UPDATE", this.initData.bind(this))
    },

    onDestroy()
    {
        this.releaseListener()
        this._view = null
    },
});
