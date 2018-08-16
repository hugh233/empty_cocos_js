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
var UIMgr = cc.Class({

    properties: {
        rootNode:
        {
            get: function()
            {
                return cc.director.getScene().getChildByName("Canvas")
            }
        },
    },

    ctor()
    {
        this._uiCache = new Array()
    },

    isContains(tb, name)
    {
        for (var item in tb)
        {
            if (name == item)
            {
                return true
            }
        }
        return false
    },

    hasSameView(uiName, isFull)
    {
        var tag = uiName
        if(isFull)
        {
            tag = "FullUi"
        }
        var oldUi = this.rootNode.getChildByTag(tag)
        if(oldUi && oldUi.name == this.getNewUiName(uiName))
        {
            return true
        }

        if(this.isContains(this._uiCache, uiName))
        {
            return true
        }
        return false
    },

    getNewUiName(uiName)
    {
        var strs = uiName.split("/")
        var newUiName = uiName
        if(strs.length > 0)
        {
            newUiName = strs[strs.length - 1]
        }
        return newUiName
    },

    showFullView: function(uiName)
    {
        if(this.hasSameView(uiName, true))
        {
            return
        }

        var newUiName = this.getNewUiName(uiName)
        this._uiCache.push(uiName)

        var self = this
        cc.loader.loadRes(uiName, cc.Prefab, function(err, prefab)
        {
            if(prefab == null)
            {
                console.log("uimgr showFullView failed: ", uiName, err)
                return
            }
            var oldUi = self.rootNode.getChildByTag("FullUi")
            if (oldUi)
            {
                var baseview = oldUi.getComponent("baseview")
                if(baseview)
                {
                    baseview.exitView(self._showNewView.bind(self), [oldUi, prefab, newUiName])
                }else
                {
                    self._showNewView([oldUi, prefab, newUiName])
                }
            }else
            {
                self._showNewView([oldUi, prefab, newUiName])
            }
        })
    },

    _showNewView(args)
    {
        var oldUi = args[0]
        var prefab = args[1]
        if (oldUi)
        {
            oldUi.destroy()
        }

        var ui = cc.instantiate(prefab)
        ui.setTag("FullUi")
        ui.name = args[2]
        this.rootNode.addChild(ui, this._uiCache.length)
    },

    addView(view, uiName, zOrder)
    {
        zOrder = zOrder || this._uiCache.length
        if(this.hasSameView(uiName, false))
        {
            return
        }

        var newUiName = this.getNewUiName(uiName)
        if(view == null)
        {
            console.log("uiMgr addView null")
            return 
        }
        this._uiCache.push(uiName)
        view.setTag(uiName)
        view.name = newUiName
        view.setPosition(0,0)
        this.rootNode.addChild(view, zOrder)
    },

    showTweenUi(uiName, handler)
    {
        if(this.isContains(this._uiCache, uiName))
        {
            return
        }
        this._uiCache.push(uiName)
        var self = this
        cc.loader.loadRes(uiName, cc.Prefab, function(err, prefab)
        {
            if(prefab == null)
            {
                console.log("uimgr showTweenUi failed: ", uiName, err)
                return
            }
            var ui = cc.instantiate(prefab)
            ui.setTag(uiName)
            self.rootNode.addChild(ui, self._uiCache.length)

            if(handler)
            {
                handler.call(handler.this, ui)
            }
        })
    },

    getTopView()
    {
        if(this.rootNode.children[this._uiCache.length - 1] != null)
        {
            return this.rootNode.children[this._uiCache.length - 1]
        }
        return this.rootNode.getChildByTag("FullUi")
    },

    getTopViewName()
    {
        var ui = this.getTopView()
        return ui.name
    },

    removeByTag(tag)
    {
        var ui = this.getUiByTag(tag)
        if(ui)
        {
            ui.destroy()
        }
        else
        {
            console.log("uiMgr removeByTag ui is null -> ", tag)
        }
    },

    getUiByTag(uiName)
    {
        var ui = this.rootNode.getChildByTag(uiName)
        return ui
    },
});

module.exports = new UIMgr()


