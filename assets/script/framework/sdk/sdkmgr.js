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
var sdk = Global.sdk
var sdkDefine = Global.sdkDefine

var SdkMgr = cc.Class({
    extends: cc.Component,

    properties: {
    },

    ctor()
    {
        this._sdkIns = null
        this._rankInfo = null
        this._platInfo = null
        this._gameInfo = null
        this._battleInfo = null
        this._userRankInfo = null
        this._oppoInfo = null
        //47.96.81.166
        //zhizhui:10.0.0.247
        //badun:10.0.0.243
        this._address = Global.netConfig.getPlatAddress()
    },

    getAddress()
    {
        return this._address
    },

    initOppo()
    {
        console.log("sdkmgr initOppo -> ", window.OPPO)
        var self = this

        window.OPPO.checkPay(function(res)
        {
            console.log("oppo checkPay Run ", res)
        })

        window.OPPO.login({
            packageName: "com.qile.lg.qanda.nearme.gamecenter",
            callback: function(res)
            {
                // {
                // "userId":"2000010000",
                // "userName":"User2000010000",
                // "avatar":"http://fs-uc-nearme-com-cn.oss-cn-hangzhou.aliyuncs.com/default.png",
                // "code":200,
                // "msg":"成功",
                // }
                console.log("oppo login callback run", res)
                if(res.code == 200)
                {
                    self.onInit(res)
                    console.log("oppo login success ")
                }
            }
        })
    },

    onInit(res)
    {
        this._oppoInfo = res
        Global.gameMgr.recvOppoPlatInfo(res)
        console.log("sdkMgr onInit -> ", JSON.stringify(this._oppoInfo))
        if(this._sdkIns != null)
        {
            return
        }
        this._sdkIns = sdk.getBuilder()
                        .setParam("appId",600004)
                        .setParam("channelId",1)
                        .setParam("appKey","x93cfWSv-")
                        .build()

        this._sdkIns.init()
        // this._sdkIns.setFakeLoginAccount(true)  //绕过登录，假登录!

        var self = this;
        this._sdkIns.setEventHandler(sdkDefine.eventType.ON_ACCOUNT_LOGIN_RESULT,function(sucess,code,msg){
            if(sucess == true){
                //plat login
                console.log("sdkMgr account login success")
                // self._sdkIns.getPlat().connectAndLoginPlat(self._address);
                self.reqConnect()
            }else{
                console.error("sdkMgr account login error!");
            }
        })

        this._sdkIns.setEventHandler(sdkDefine.eventType.ON_PLAT_DISCONNECT,function(code){
            self.onDisconnect(code)
        })
        this._sdkIns.setEventHandler(sdkDefine.eventType.ON_PLAT_CONNECT_ERROR,function(){
            self.onConnectError()
        })
        this._sdkIns.setEventHandler(sdkDefine.eventType.ON_PLAT_LOGIN_RESULT,function(sucess){
            self.onLoginHandler(sucess)
        })
        this._sdkIns.setEventHandler(sdkDefine.eventType.ON_PLAT_MATCH_RSP,function(retCode,matchId){
            self.onMatchResponse(retCode,matchId)
        })

        this._sdkIns.setEventHandler(sdkDefine.eventType.ON_PLAT_MATCH_CANCEL_RSP,function(retCode){
            console.log("cancel retCode:"+retCode.toString())
            Global.eventMgr.dispatchEvent("RECV_CANCEL_MATCH", retCode)
        })

        this._sdkIns.setEventHandler(sdkDefine.eventType.ON_PLAT_USERINFO_RSP, function (userInfo) {
            console.log("sdkmgr recvPlatUserInfo Run -> ", userInfo)
            self._platInfo = userInfo
            Global.gameMgr.recvPlatUserInfo(userInfo)
        })

        this._sdkIns.setEventHandler(sdkDefine.eventType.ON_PLAT_USER_BATTLEINFO_RSP, function (battleInfo) {
            console.log("sdkmgr recvBattleInfo Run -> ", battleInfo)
            self._battleInfo = battleInfo
            Global.gameMgr.recvBattleInfo(battleInfo)
        })

        this._sdkIns.setEventHandler(sdkDefine.eventType.ON_PLAT_USER_RANKINFO_RSP, function (rankId, 
            rankName, ranking, uid, userInRankInfo, rankRate) {
            var rankInfo = {}
            rankInfo.rankId = rankId
            rankInfo.rankName = rankName
            // rankInfo.rankCount = rankCount
            rankInfo.rankRate = rankRate
            rankInfo.ranking = ranking
            rankInfo.uid = uid
            rankInfo.userInRankInfo = userInRankInfo
            console.log("sdkmgr recvPlatUserRank Run -> ", rankInfo)
            Global.gameMgr.recvPlatUserRank(rankInfo)
        })
        
        this._sdkIns.setEventHandler(sdkDefine.eventType.ON_PLAT_RANKINFO_RSP, function (rankId, rankName, userInRankInfoList) {
            var rankInfo = {}
            rankInfo.rankId = rankId
            rankInfo.rankName = rankName
            // rankInfo.rankCount = rankCount
            rankInfo.userInRankInfoList = userInRankInfoList
            console.log("sdkmgr recvrankinfos Run -> ", rankInfo)
            Global.rankMgr.recvRankInfo(rankInfo)
        })
        
        this._sdkIns.setEventHandler(sdkDefine.eventType.ON_PLAT_MATCH_RESULT,function(code, info){
            self.onMatchResult(code, info)
        })

        this._sdkIns.setEventHandler(sdkDefine.eventType.ON_PLAT_RELOGIN_RESULT, function (result, playerStatus) {
            console.log("sdkmgr relogin", result, playerStatus)
            if (!result){
                console.error("sdkmgr relogin error")
                return
            }
            self.onLoginHandler(result)
        })

        this._sdkIns.setEventHandler(sdkDefine.eventType.ON_PLAT_BOX_DETAIL_RSP, function (bFinish, currboxDetail) {
            console.log("sdkmgr recvboxdetail Run -> ", bFinish, currboxDetail)
            var info = {}
            info.isFinish = bFinish
            info.detail = currboxDetail
            Global.gameMgr.recvMoneyBoxDetail(info)
        })

        this._sdkIns.setEventHandler(sdkDefine.eventType.ON_PLAT_BOX_AWARD_RSP, function (gameInfo, nextBoxDetail) {
            console.log("sdkmgr recvboxaward Run -> ", gameInfo, nextBoxDetail)
            var info = {}
            info.gameInfo = gameInfo
            info.nextBoxDetail = nextBoxDetail
            Global.gameMgr.recvGetMoneyBox(info)
        })

        this._sdkIns.getGameChannel().registGameProtoHandler(Global.pbCode.Msg_Game_Hall_S2C_UserInfoRsp, function (msgId, msgBuff){
            var userInfoRsp = Global.pb.gameMsg.hall.UserInfoRsp.decode(msgBuff)
            Global.eventMgr.dispatchEvent(msgId+"", userInfoRsp)
        })

        this._sdkIns.getGameChannel().registGameProtoHandler(Global.pbCode.Msg_Game_Hall_S2C_UpgradeLevel, function (msgId, msgBuff) {
            var upgradeInfo = Global.pb.gameMsg.hall.UpgradeLevel.decode(msgBuff)
            Global.eventMgr.dispatchEvent(msgId+"", upgradeInfo)
        })

        
        if(this._oppoInfo != null)        
        {
            console.log("sdkMgr oppoInfo UserId -> ", this._oppoInfo.userId)
            this._sdkIns.loginAccount(Global.netConfig.getHttpUrl(),this._oppoInfo.userId,"abc123");
        }else
        {
            console.log("sdkMgr local name -> ", data.name)
            this._sdkIns.loginAccount(Global.netConfig.getHttpUrl(),data.name,"abc123");
        }

        this._sdkIns.getGameChannel().registGameProtoHandler(Global.pbCode.Msg_Game_Hall_S2C_UpgradeDivision, function (msgId, msgBuff) {
            // console.log("sdkmgr recvUpgrade", msgId)
            var datas = Global.pb.gameMsg.hall.UpgradeDivision.decode(msgBuff)
            Global.eventMgr.dispatchEvent(msgId+"", datas)
        })

        this._sdkIns.getGameChannel().registGameProtoHandler(Global.pbCode.Msg_Game_Hall_S2C_FieldUpdate, function (msgId, msgBuff) {
            // console.log("sdkmgr recvUpgrade", msgId)
            var datas = Global.pb.gameMsg.hall.FieldUpdate.decode(msgBuff)
            Global.eventMgr.dispatchEvent(msgId+"", datas)
            // var userInfoRsp = Global.pb.gameMsg.hall.UserInfoRsp.decode(msgBuff)
            // Global.eventMgr.dispatchEvent(msgId+"", userInfoRsp)
        })
    },

    getRankInfo()
    {
        return this._rankInfo
    },

    getPlatUserInfo()
    {
        return this._platInfo
    },

    getBattleInfo()
    {
        return this._battleInfo
    },

    getOppoInfo()
    {
        return this._oppoInfo
    },

    getUserRankInfo()
    {
        return this._userRankInfo
    },

    getGameUserInfo()
    {
        return this._gameInfo
    },

    onLoginHandler(success, code, msg)
    {
        console.log("sdkMgr onLoginHandler Run -> ", success, code, msg)    

        if(success == true){
            Global.voteMgr.removeVote("ENTER_MAIN", Global.func.voteFalse, Global.func)
            Global.voteMgr.addVote("ENTER_MAIN", Global.func.voteTrue, Global.func)
            this.onLoginSuccess()
        }else{
            this.onLoginFail()
        }
    },

    onLoginSuccess()
    {
        console.log("sdkMgr onLoginSuccess Run")
        Global.eventMgr.dispatchEvent("LOGIN_SUCCESS")

        var self = this
        var UpdateUserBaseInfo = Global.pb.gameMsg.hall.UpdateUserBaseInfo
        var req = UpdateUserBaseInfo.create({
            "avatar": self._oppoInfo.avatar,
            "nickName": self._oppoInfo.userName,
        })
        var buff = UpdateUserBaseInfo.encode(req).finish()
        this._sdkIns.getGameChannel().send(Global.pbCode.Msg_Game_Hall_C2S_UpdateUserBaseInfo, buff)

        this.reqGameUserInfo()
        this.reqPlatUserInfo()
        this.reqBattleInfo()
        this.reqUserRankInfo()
        this.reqMoneyBoxDetail()
        this.reqRankInfo(1, 1, 100)
    },

    onLoginFail()
    {
        console.log("sdkMgr onLoginFail Run")
        Global.eventMgr.dispatchEvent("LOGIN_FAIL")
    },

    reqConnect()
    {
        console.log("sdkMgr reqConnect Run ")
        Global.gameMgr.resetInit()
        this._sdkIns.getPlat().connectAndLoginPlat(this._address)
    },
    
    reqReconnect()
    {
        console.log("sdkMgr reqReconnect Run ")
        Global.gameMgr.resetInit()
        // if(Global.uiMgr.getTopViewName() != "oppo_loading")
        // {
        //     var DialogController = require("dialogcontroller")
        //     var ctrl = new DialogController()
        //     ctrl.setShowView(Global.files.LoadingView, false)
        // }
        var DialogController = require("dialogcontroller")
        var ctrl = new DialogController()
        ctrl.setShowView(Global.files.LoadingView, false)
        this._sdkIns.getPlat().reconnectAndLoginPlat()
    },

    onDisconnect(code)
    {
        console.log("sdkMgr onDisconnect Run -> ", code)
        // Global.eventMgr.dispatchEvent("ON_DISCONNECT")
        this.reqReconnect()
    },

    onConnectError()
    {
        console.log("sdkMgr onConnectError Run ")
        // Global.eventMgr.dispatchEvent("CONNECT_ERROR")
        this.reqReconnect()
    },

    onMatchResponse(code, matchId)
    {
        console.log("sdkMgr onMatchResponse Run ", code, matchId)
        // Global.eventMgr.dispatchEvent("ON_BATTLE_MATCH_RSP", [code, matchId])
    },

    onMatchResult(code, info)
    {
        if(code != 0)
        {
            console.error("sdkMgr match result error !!!!", code)
        }

        console.log("sdkMgr onMatchResult Run ", code, info)
        Global.eventMgr.dispatchEvent("ON_MATCH_INFO", {code: code, info: info})
        var self = this
        var battle = this._sdkIns.getBattle()
        battle.setGameEventHandler("on_login_rsp",function(retCode)
        {
            console.log("sdkMgr on_login_rsp, code:"+ retCode.toString())
            Global.eventMgr.dispatchEvent("ON_LOGIN_RSP", retCode)
        })

        battle.setGameEventHandler("on_game_start", function(content)
        {
            // analyzePb()
        })

        battle.setGameEventHandler("on_game_msg", function(playerId, msg, msgId)
        {
            // analyzePb()
            console.log("sdkMgr on_game_msg: playerId: " + playerId, msgId)
            self.dispatchBattleMsg(playerId, msg, msgId)
        })

        battle.setGameEventHandler("on_game_end", function(rsp)
        {
            // analyzePb()
        })

        battle.login()
    },

    reqOpenMoneyBox()
    {
        console.log("sdkMgr reqOpenMoneyBox Run ", Global.gameMgr.getCurBoxIndex())
        this._sdkIns.getPlat().getBoxAward(1, Global.gameMgr.getCurBoxIndex())
    },
    
    reqMoneyBoxDetail()
    {
        this._sdkIns.getPlat().getBoxDetail(1)
    },

    reqUserRankInfo()
    {
        console.log("sdkMgr reqUserRankInfo Run ", Global.gameMgr.getUserId())
        this._sdkIns.getPlat().getUserRankInfo(1, Global.gameMgr.getUserId())
    },  

    reqBattleInfo()
    {
        this._sdkIns.getPlat().getBattleInfo()
    },

    reqGameUserInfo()
    {
        var id = this._sdkIns.getPlat().platUserInfo.id
        var req = Global.pb.gameMsg.hall.UserInfoReq.create({
            "uid": this._sdkIns.getPlat().platUserInfo.id,
        })
        console.log("sdkMgr reqGameUserInfo Run -> ", req)
        var buff = Global.pb.gameMsg.hall.UserInfoReq.encode(req).finish()
        this._sdkIns.getGameChannel().send(Global.pbCode.Msg_Game_Hall_C2S_UserInfoReq, buff, buff.byteLength)
    },

    reqRankInfo(rankId, startIndex, endIndex)
    {
        this._sdkIns.getPlat().getRankInfo(1, startIndex, endIndex)
    },

    reqPlatUserInfo()
    {
        this._sdkIns.getPlat().getUserInfo()
    },

    reqMatch(dan)
    {
        var req = Global.pb.gameMsg.hall.StartMatchReq.create({
            "roomDivision": dan,
        })
        console.log("sdkMgr reqMatch Run ", req.roomDivision, dan)
        var buff = Global.pb.gameMsg.hall.StartMatchReq.encode(req).finish()
        this._sdkIns.getPlat().match(buff)
    },

    cancelMatch()
    {
        console.log("sdkMgr cancelMatch Run ")
        this._sdkIns.getPlat().cancelMatch()
    },

    reqBattleFinish()
    {
        this._sdkIns.getBattle().finish()
    },

    reqReadyToStart()
    {
        console.log("sdkMgr reqReady Run")
        this._sdkIns.getBattle().ready()
    },

    reqBattleMsg(msgId, exceptSelf, bytes)
    {
        console.log("sdkmgr reqBattleMsg run -> ", msgId)
        this._sdkIns.getBattle().broadcast(bytes, exceptSelf, msgId)
    },

    reqForceQuitBattle()
    {
        this._sdkIns.getBattle().getWay()
    },

    reqGameMsg(msgId)
    {

    },

    dispatchPlatMsg()
    {

    },

    dispatchBattleMsg(playerId, msg, msgId)
    {
        //analyze
        // console.log("sdkMgr dispatchBattleMsg -> ", playerId, msgId)
        Global.eventMgr.dispatchEvent(msgId+"", msg)
    },
});

module.exports = new SdkMgr()
