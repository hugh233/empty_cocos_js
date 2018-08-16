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
var TipsMgr = cc.Class({
    ctor()
    {
        this._tipsList = new Array()    
        this._canShow = true
    },

    showTips(str)
    {
        // Global.uiMgr.showTweenUi(Global.files.TipsUI, this.loadTipsComplete.bind(this))
        // this._tipsList.push()
        this._canShow = false
        Global.framesMgr.showTipsTween(1, 60, Global.files.TipsUI, {
            src: {x: 0, y: 0},
            target: {x: 0, y: 200},
            tips: str
        })
    },

    popTips()
    {
        this._canShow = true
    },

    checkShowTips()
    {
        return this._canShow
    },

    onUpdate()
    {
        // if(this.checkShowTips())
        // {
        //     showTips()
        // }
    },

    loadTipsComplete()
    {

    },

    showTipsComplete()
    {

    },

    onDestroy()
    {
        this._tipsList.splice(0)
        this.releaseListener()
    },
});

module.exports = new TipsMgr()
