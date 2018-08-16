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
var VoteMgr = cc.Class({
    properties: {

    },

    ctor()
    {
        this._voteArr = new Array()
        this._voteObjArr = new Array()
    },

    onUpdate()
    {

    },

    addVote(type, func, obj)
    {
        if(this._voteArr[type] == null)
        {
            this._voteArr[type] = new Array()
            this._voteObjArr[type] = new Array()
        }
        this._voteArr[type][this._voteArr[type].length] = func
        this._voteObjArr[type][this._voteObjArr[type].length] = obj
    },

    removeVote(type, func, obj)
    {
        // console.log("removeVote -> ", this._voteArr[type])
        if(this._voteArr[type])
        {
            if(func == null)
            {
                this._voteArr[type] = null
                this._voteObjArr[type] = null
            }else
            {
                for(var i = 0; i < this._voteArr[type].length; i++)
                {
                    if(this._voteArr[type][i].prototype === func.prototype)
                    {
                        this._voteArr[type].splice(i, 1)
                        this._voteObjArr[type].splice(i, 1)
                    }
                }
            }
        }
    },

    startVote(type, defaultValue)
    {
        // console.log("startVote Run -> ", this._voteArr[type])
        var result = null
        if(this._voteArr[type] && this._voteArr[type].length > 0)
        {
            for(var i = 0; i < this._voteArr[type].length; i++)
            {
                // if(func instanceof Function)
                // {
                    var func = this._voteArr[type][i]
                    var obj = this._voteObjArr[type][i]
                    var isAssent = func.call(obj)
                    // console.log("startVote Run 1 -> ", defaultValue, isAssent)
                    if(defaultValue == false)
                    {
                        if(result == null)
                        {
                            result = true
                        }
                        result = isAssent && result
                    }else
                    {
                        if (defaultValue != isAssent)
                        {
                            // console.log("voteMgr:startVote -> ", type, isAssent)
                            return isAssent
                        }
                    }
                // }
            }
        }
        if(result)
        {
            return result
        }
        return defaultValue
    },

    onDestroy()
    {
        this._voteArr.splice(0)
        this._voteObjArr.splice(0)
    }
});

module.exports = new VoteMgr()