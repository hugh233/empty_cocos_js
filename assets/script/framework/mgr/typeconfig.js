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
var TypeConfig = cc.Class({
    properties: {

    },

    ctor()
    {
        this.ResType = {Gold: 0, Lv: 1, Dan: 2}
        this.ListViewType = {Common: 0, Frame: 1, Recovery: 2}
        this.WinSize = {width: 1080, height: 1920}
        this.BtnType = {Normal: 0, IsTrue: 1, IsFalse: 2}
        this.Sex = {Girl:0, Boy: 1}
        this.BattleResult = {Win: 0, Draw: 1, Lost: 2}
        this.Camp = {Self: 0, Enemy: 1}
        this.MatchCode = {NONE: 1, SUCCESS: 2, FAIL: 3, NOTABLE: 4, GAMEIDERR: 5, NOPLAYER: 6}
        this.AnswerRetEnum = {UNKNOW: -1, NO_ANSWER: 0, RIGHT: 1, ERROR: 2}
        this.StarType = {Normal: 0, Up: 1, Down: 2}
        this.ReleaseType = {Oppo: 1, Web: 2, Debug: 3, OppoDebug: 4}
        this.zOrder = {Dialog: 999999}
    },
});

module.exports = new TypeConfig()