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
    extends: cc.Component,

    properties: 
    {
        mpImg0: cc.Node,
        mpImg1: cc.Node,
        mpImg2: cc.Node,
        mpImg3: cc.Node,
        mpImg4: cc.Node,
    },

    onLoad () 
    {
        this.initCtrl()
        this.initView()
    },

    initCtrl()
    {
        var Controller = require("basebgcontroller")
        this._ctrl = new Controller()
        this._ctrl.setView(this)
    },

    update()
    {
        if(this._ctrl && this._ctrl.onUpdate)
        {
            this._ctrl.onUpdate()
        }
    },

    initView()
    {

    },

    onDestroy()
    {
        if (this._ctrl)
        {
            this._ctrl.onDestroy()
        }
    },
});
