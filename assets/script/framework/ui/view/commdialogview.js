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
        mpLabelDesc: cc.Label,
        mpLabelLeft: cc.Label,
        mpLabelRight: cc.Label,
        mpNodeLeft: cc.Node,
        mpNodeRight: cc.Node,
    },

    ctor()
    {
        this._hasInitCtrl = false
    },

    onLoad () 
    {
        this.initCtrl()
        this.initView()
    },

    initCtrl()
    {
        if(this._hasInitCtrl)
        {
            return
        }

        this._hasInitCtrl = true
        var Controller = require("commdialogcontroller")
        this._ctrl = new Controller()
        this._ctrl.setView(this)
    },

    setData(data)
    {
        this.initCtrl()
        this._ctrl.setData(data)

        this.mpLabelDesc.string = data.desc || ""
        this.mpLabelLeft.string = data.left || ""
        this.mpLabelRight.string = data.right || ""
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
