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

    setView(view)
    {
        this._frames = 0
        this._frameSec = 0
        this._timeSec = 0
        this._view = view
        this._index = 0
        // this._datas = [
        //     {alpha: 0.2, step: 0.007, isUp: false, node: this._view.mpImg0}, 
        //     {alpha: 0.4, step: 0.014, isUp: false, node: this._view.mpImg1}, 
        //     {alpha: 0.6, step: 0.021, isUp: false, node: this._view.mpImg2},
        //     {alpha: 0.8, step: 0.027, isUp: false, node: this._view.mpImg3},
        //     {alpha: 1, step: 0.035, isUp: false, node: this._view.mpImg4} ]
        this._datas = [
            {alpha: 1, step: 0.035, isUp: false, node: this._view.mpImg0}, 
            {alpha: 1, step: 0.035, isUp: false, node: this._view.mpImg1}, 
            {alpha: 1, step: 0.035, isUp: false, node: this._view.mpImg2},
            {alpha: 1, step: 0.035, isUp: false, node: this._view.mpImg3},
            {alpha: 1, step: 0.035, isUp: false, node: this._view.mpImg4} ]
        this.registerListener()
    },

    onUpdate()
    {
        this._frames ++
        this._frameSec ++ 

        if(this._frameSec >= 60)
        {
            this._frameSec = 0
            this._timeSec ++
        }

        this.tweenOnce(this._timeSec % 5)

        // this.tweenOnce(0)
        // this.tweenOnce(1)
        // this.tweenOnce(2)
        // this.tweenOnce(3)
        // this.tweenOnce(4)
    },

    getIsUpByType(index)
    {
        return this._datas[index].isUp
    },

    setIsUpByType(index, isUp)
    {
        this._datas[index].isUp = isUp
    },

    tweenOnce(index)
    {
        var data = this._datas[index]
        var tempNode = data.node
        var tempAlpha = tempNode.opacity
        var isUp = data.isUp
        if(isUp)
        {
            tempAlpha += data.step * 255
            if(tempAlpha >= data.alpha * 255)
            {
                this.setIsUpByType(index, false)
                tempAlpha = data.alpha * 255
            }
        }else
        {
            tempAlpha -= data.step * 255
            if(tempAlpha <= 0)
            {
                this.setIsUpByType(index, true)
                tempAlpha = 0
            }
        }
        tempNode.opacity = tempAlpha
    },

    registerListener()
    {

    },

    releaseListener()
    {

    },

    onDestroy()
    {
        this.releaseListener()
        this._view = null
    },
});
