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
var EventMgr = cc.Class({
    properties: {

    },

    ctor()
    {
        this._handlers = new Array()
    },

    registerListener(eventName, handler)
    {
        if(this._handlers[eventName] == null)
        {
            this._handlers[eventName] = new Array()
        }
        this._handlers[eventName][this._handlers[eventName].length] = handler
        // console.log("registerListener -> ", eventName)
    },
    
    dispatchEvent(eventName, args)
    {
        // console.log("dispatchEvent -> ", eventName)
        if(this._handlers[eventName] && this._handlers[eventName].length > 0)
        {
            for(var i = 0; i < this._handlers[eventName].length; i++)
            {
                var handler = this._handlers[eventName][i]
                handler.call(handler.this, args)
            }
        }
    },
    
    releaseListener(eventName, handler)
    {
        // console.log("releaseListener Run -> ", eventName, handler == null)
        if(this._handlers[eventName])
        {
            if(handler == null)
            {
                this._handlers[eventName] = null
            }else
            {
                for(var i = 0; i < this._handlers[eventName].length; i++)
                {
                    if(this._handlers[eventName][i].prototype === handler.prototype)
                    {
                        this._handlers[eventName].splice(i, 1)
                    }
                }
            }
        }
    },

    onDestroy()
    {
        this._handlers.splice(0)
    }
});

module.exports = new EventMgr()