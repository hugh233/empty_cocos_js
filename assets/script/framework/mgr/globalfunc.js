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
var GlobalFunc = function()
{
    this.scaleArr = {}
}

GlobalFunc.prototype.voteTrue = function()
{
    return true
}

GlobalFunc.prototype.voteFalse = function()
{
    return false
}

GlobalFunc.prototype.setTexture = function(sprit, url)
{
    if(url == null || url == "")
    {
        console.log("setTexture url null ", url)    
        return
    }
    Global.resMgr.loadRes(url, cc.SpriteFrame, function(tex)
    {
        if(sprit && tex)
        {
            // console.log("setTexture -> ", url)    
            // if(sprit.spriteFrame != null)
            // {
                sprit.spriteFrame = tex
            // }
        }
    })
}

GlobalFunc.prototype.setTextureUrl = function(sprit, url)
{
    if(url == null || url == "")
    {
        console.log("setTextureUrl url null ")    
        url = "http://fs-uc-nearme-com-cn.oss-cn-hangzhou.aliyuncs.com/default.png"
    }
    var frames = new cc.SpriteFrame()
    cc.loader.load(url, function(err, data)
    {
        // console.log("setTextureUrl ->", err, data)
        if(sprit && data)
        {
            // console.log("setTexture -> ", url)    
            if(sprit.spriteFrame != null)
            {
                frames.setTexture(data)
                sprit.spriteFrame = frames
            }
        }
    })
}

GlobalFunc.prototype.isContains = function(arr, value)
{
    for(var i = 0; i < arr.length; i++)
    {
        var data = arr[i]
        if(data == value)
        {
            return true
        }
    }
    return false
}

GlobalFunc.prototype.touchEndHandler = function(node, func, target)
{
    // console.log("GlobalFunc.prototype.touchEndHandler Run", node.scale)
    // node.runAction(cc.scaleTo(0.2, node.scale-0.08, node.scale-0.08))
    node.on(cc.Node.EventType.TOUCH_END, func, target)
}

GlobalFunc.prototype.touchBeginHandler = function(event)
{
    if(event.target.getTag() == "HasClick")
    {
        return
    }
    event.target.setTag("HasClick")
    event.canClick = true
    var temp = event.target.scale
    var scaleBefore = cc.scaleBy(0.1, 1.08, 1.08)
    scaleBefore.easing(cc.easeBounceInOut())
    var scaleAfter = cc.scaleTo(0.1, temp, temp)
    var callback = cc.callFunc(this.clickEnd, this, event.target)
    var seq = cc.sequence(scaleBefore, scaleAfter, callback)
    event.target.runAction(seq)
}

GlobalFunc.prototype.clickEnd = function(node)
{
    node.setTag("")
}

GlobalFunc.prototype.clickEndEvent = function(node, func, target)
{
    this.touchEndHandler(node, func, target)
    node.on(cc.Node.EventType.TOUCH_START, this.touchBeginHandler, this)
}

GlobalFunc.prototype.formatTime = function(time)
{
    if(time <= 0)
    {
        return "00:00:00"
    }
    var h = Math.floor(time / 3600 % 24)
    var m = Math.floor(time / 60 % 60)
    var s = Math.floor(time % 60)
    var hStr = h+""
    var mStr = m+""
    var sStr = s+""
    if(h < 10)
    {
        hStr = "0"+h
    }
    if(m < 10)
    {
        mStr = "0"+m
    }
    if(s < 10)
    {
        sStr = "0"+s
    }
    return hStr+":"+mStr+":"+sStr
}

GlobalFunc.prototype.subString = function(str,n)
{
    var r=/[^\x00-\xff]/g;
    if(str.replace(r,"mm").length<=n)
    {
        return str
    }
    var m=Math.floor(n/2)
    for(var i=m;i<str.length;i++)
    {
        if(str.substr(0,i).replace(r,"mm").length>=n)
        {
            return str.substr(0,i)+"..."
        }
    }
    return str
}

Global.func = new GlobalFunc()