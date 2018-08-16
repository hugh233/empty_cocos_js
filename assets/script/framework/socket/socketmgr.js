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
var SocketMgr = cc.Class({
    properties: {
    },
    ctor()
    {
        // this.init()
        this._handlers = new Array()
    },

    addProto(id, handler)
    {
        // console.log("SocketMgr addProto Run -> ", id)
        if(this._handlers[id] == null)
        {
            this._handlers[id] = new Array()
        }
        this._handlers[id][this._handlers[id].length] = handler
    },
    
    removeProto(id, handler)
    {
        // console.log("SocketMgr removeProto Run -> ", id)
        if(handler == null)
        {
            this._handlers[id] = null
        }else
        {
            for(var i = 0; i < this._handlers[id].length; i++)
            {
                console.log("this._handlers[id][i].prototype", this._handlers[id][i].prototype === handler.prototype)
                if(this._handlers[id][i].prototype === handler.prototype)
                {
                    this._handlers[id].splice(i, 1)
                }
            }
        }
    },
    
    dispatchProto(id, args)
    {
        console.log("SocketMgr dispatchProto Run -> ", id)
        if(this._handlers[id] && this._handlers[id].length > 0)
        {
            for(var i = 0; i < this._handlers[id].length; i++)
            {
                var func = this._handlers[id][i]
                func.call(func.this, args)
            }
        }
    },
    
    send(id)
    {
        console.log("SocketMgr send Run -> ", id)
        var self = this
        var time = 500
        if(id == Global.protoCode.c2s.REQ_MATCH)
        {
            time = 2000
        }
        setTimeout(() => {
            self.receive(id)
        }, time);
    },
    
    receive(id)
    {
        console.log("SocketMgr receive Run -> ", id)
        // this.dispatchProto(id)
        this.tempDispatch(id)
    },

    tempDispatch(id)
    {
        var data = {}
        if(id == Global.protoCode.c2s.REQ_MATCH)
        {
            data = 2//(Math.floor(Math.random() * 10) % 2)
        }else if(id == Global.protoCode.c2s.REQ_ACCOUNT)
        {
            var selfScore = Global.battleMgr.getSelfScore()
            var enemyScore = Global.battleMgr.getEnemyScore()
            if (selfScore > enemyScore)
            {
                data.result = Global.battleMgr.getSelfScore() > Global.battleMgr    
            }
            else if(selfScore < enemyScore)
            {
                data.result = Global.battleMgr.getSelfScore() > Global.battleMgr    
            }
            else
            {
                data.result = Global.battleMgr.getSelfScore() > Global.battleMgr    
            }
            data.lv = 2
            data.danLv = 2
            data.starNum = 2
        }
        this.dispatchProto(id, data)
    },

    init()
    {
        console.log("socketMgr init Run")    
        this._sdkInit = sdk.getBuilder()
                            .setParam("appId",1)
                            .setParam("channelId",1)
                            .setParam("appKey","test")
                            .build()
        this._sdkInit.init()

        var self = this;
        this._sdkInit.setEventHandler(sdkDefine.eventType.ON_ACCOUNT_LOGIN_RESULT,function(sucess,code,msg){
            if(sucess == true){
                //plat login
                console.log("socketMgr init Run Success")    
                self._sdkInit.getPlat().connectAndLoginPlat("ws://10.17.4.222:18092");
            }else{
                console.error("account login error!");
            }
        })
    },

    addProtoListener(id, handler)
    {
        this._sdkInit.setEventHandler(id, handler)
    },

    removeProtoListener(id, handler)
    {

    },

    // send(msg){
    //    this._ws.send(msg)
    // },

    // onDestroy()
    // {

    // }
});

module.exports = new SocketMgr()