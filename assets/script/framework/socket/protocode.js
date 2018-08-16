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
var ProtoCode = cc.Class({
    ctor()
    {
        this.c2s = 
        {
            "REQ_MATCH": 1001,
            "REQ_ACCOUNT": 1002,
            "REQ_ROUND": 1003,
            "REQ_SEND_ANSWER": 1004,
        }

        this.s2c =
        {
            "RECV_ROLE": 101,
            "RECV_MATCH": 2001,
            "RECV_ACCOUNT": 2002,
            "RECV_RES": 2003,
            "RECV_ROUND": 2004,
            "RECV_ANSWER": 2005,
            "RECV_GAME_START": 2006,
            "RECV_GAME_END": 2007,
            "RECV_SCORE": 2008,
        }
    }
});

module.exports = new ProtoCode()
