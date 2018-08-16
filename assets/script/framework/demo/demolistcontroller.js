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
        console.log("ListExpendController ctor Run")
        this._view = null
    },

    initData(view)
    {
        console.log("ListExpendController initData Run")
        this._view = view
        this._view.initData({maxCount: 200, showCount: 6, itemHeight: 100, lineSpace: 20})
    },

    onItemClick(item, index)
    {
        console.log("ListExpendController onItemClick Run", index)
    },

    onDataFiller(item, index)
    {
        console.log("ListExpendController onDataFiller Run", index)
        var label = item.getChildByName("mpLabel").getComponent(cc.Label)
        label.string = index
    },

    onScrollEnded()
    {
        console.log("ListExpendController onScrollEnded Run")
    },

/////////////////////////////////////////////////////////////////
//华丽丽的分界线
//以上的方法名不能改哦
/////////////////////////////////////////////////////////////////
});
