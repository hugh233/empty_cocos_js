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
        mpImgIcon: cc.Sprite,
        mpLabelNum: cc.Label,
        mpImgAdd: cc.Sprite,
    },

    ctor()
    {
        this._isPause = false
    },

    setPause(isPause)
    {
        this._isPause = isPause
    },

    setIcon(iconPath)
    {
        // console.log("ResView setIcon Run", iconPath)
        Global.func.setTexture(this.mpImgIcon, iconPath)
    },
    
    setNum(num)
    {
        if(this._isPause)
        {
            return
        }
        // console.log("ResView setNum Run", num)
        this.mpLabelNum.string = num
    },

    getImgAdd()
    {
        return this.mpImgAdd
    },
    
    showAdd(isShow)
    {
        // console.log("ResView showAdd Run", isShow)
        this.mpImgAdd.node.active = isShow
    },
});
