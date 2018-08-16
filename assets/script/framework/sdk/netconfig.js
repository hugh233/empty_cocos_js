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
var NetConfig = cc.Class({
    properties: {
        
    },

    ctor()
    {
    },

    getHttpUrl()
    {
        // if(Global.isDebug)
        // {
        //     return "http://10.0.2.35:4100/tpf-login/authP/channelAuth"
        // }else
        // {
            return "https://game-login.syyx.com/tpf-login/authP/channelAuth"
        // }
    },
    
    getAppId()
    {
        return 600004
    },

    getChannelId()
    {
        return 1
    },

    getAppKey()
    {
        return "x93cfWSv-"
    },

    getPlatAddress()
    {
        // if(Global.isDebug)
        // {
            // return "ws://10.0.0.247:18092"
        // }else
        // {
            return "ws://ws-proxy-lg.syyx.com:18092"
        // }
    },

    getOppoTestInfo()
    {
        var data = JSON.parse(cc.sys.localStorage.getItem("userData"))
        if(data == null)
        {
            data = {name:""}
            data.name = this.getRandomName()
            cc.sys.localStorage.setItem("userData", JSON.stringify(data))
        }

        return {
            "userId":data.name,
            "userName":data.name,
            "avatar":"http://fs-uc-nearme-com-cn.oss-cn-hangzhou.aliyuncs.com/default.png",
            "code":200,
            "msg":"成功",
            }
    },

    getRandomName()
    {
        var name = "role_"
        var pos = 0
        var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        for (var i = 0; i < 6;  i++)
        {
            pos = Math.round(Math.random() * (arr.length-1))
            name += arr[pos]
        }
        return name
    },
});

module.exports = new NetConfig()
