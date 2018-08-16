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
        HIGH:200,   //每一项的高度
        PAGE_NUM:5,  //每一页8个项
        item_prefab:{  //项的资源预制体
            type:cc.Prefab,
            default:null,
        },
        mpScrollView:{ //获取scrollview组件
            type:cc.ScrollView,
            default:null,
        },
        ctrlName: "demolistcontroller",
    },

    onLoad () 
    {
        this._type = Global.typeConfig.ListViewType.Common
        this.content = this.mpScrollView.content;
        this._hasInit = false
        this._offSet = null
        this._tempY = this.content.y
        this._valueSet = new Array()
        this.items = new Array()

        var Controller = require(this.ctrlName)
        this._ctrl = new Controller()
        this._ctrl.initData(this)

        this._isNeedLoad = false
    },

    initData(args)
    {
        this._type = args.type || this._type
        this.MAX_COUNT = args.maxCount || 100
        this.PAGE_NUM = args.showCount || this.PAGE_NUM
        this._hasInit = true
        this._offSet = args.offset

        this._valueSet.splice(0)
        for(var i=0;i<this.MAX_COUNT;i++)
        {
            this._valueSet.push(i)
        }
        if(this.items && this.items.length > 0)
        {
            for(var i = 0; i < this.items.length; i++)
            {
                this.items[i].destroy()
            }
        }
        this.items.splice(0)
        //每次加载3页
        var count = this.PAGE_NUM*3
        // if(this._valueSet.length <= 15)
        // {
        //     this._isNeedLoad = false
        //     count = this._valueSet.length
        // }else
        // {
        //     this._isNeedLoad = true
        // }
        for(var i=0;i<count;i++)
        {
            var item = cc.instantiate(this.item_prefab);
            item.on(cc.Node.EventType.TOUCH_END, this.onItemClick, this)
            this.content.addChild(item);
            this.items.push(item);
        }
        this.mpScrollView.node.on("scroll-ended",this.onScrollEnded.bind(this),this);
    },

    onItemClick(event)
    {
        if (this._ctrl && this._ctrl.onItemClick)
        {
            this._ctrl.onItemClick(event.target, event.target.index)
        }
    },

    frameLoad()
    {

    },

    loadData(startIndex)
    {
        if(!this._hasInit)
        {
            return
        }

        this.startIndex=startIndex;
        for(var i = 0;i<this.PAGE_NUM*3;i++)
        {
            if(this._ctrl && this._ctrl.onDataFiller)
            {
                this.items[i].index = this._valueSet[this.startIndex+i]
                this._ctrl.onDataFiller(this.items[i], this._valueSet[this.startIndex+i])
            }
        }

        if(this._offSet!=null)
        {
            this.mpScrollView.scrollToPercentVertical(this._offSet, 2)
        }
    },

    loadScrollData()
    {
        if(!this._hasInit)
        {
            return
        }
        //向下加载数据
        //当开始位置比_valueSet的长度小则代表没加载完
         if(this.startIndex + this.PAGE_NUM * 3 < this._valueSet.length &&
          this.content.y >= this.startY + this.PAGE_NUM * 2 * this.HIGH)//content超过2个PAGE的高度
        {
            //_autoScrolling在引擎源码中负责处理scrollview的滚动动作
            if(this.mpScrollView._autoScrolling){ //等自动滚动结束后再加载防止滚动过快，直接跳到非常后的位置
                this.mpScrollView.elastic = false; //关闭回弹效果 美观
                return;
            }
            var down_loaded = this.PAGE_NUM; 
            this.startIndex += down_loaded;

            if(this.startIndex + this.PAGE_NUM * 3>this._valueSet.length)
            {
                //超过数据范围的长度
                var out_len = this.startIndex + this.PAGE_NUM * 3 - this._valueSet.length;
                down_loaded -= out_len;
                this.startIndex -= out_len;
            }
            this.loadData(this.startIndex);
            this.content.y -= down_loaded * this.HIGH;
            return;
        }
        //向上加载
        if(this.startIndex>0 && this.content.y<=this.startY)
        {
            if(this.mpScrollView._autoScrolling){ 
                this.mpScrollView.elastic = false;
                return;
             }
            var upLoaded = this.PAGE_NUM;
            this.startIndex -= upLoaded;
            if(this.startIndex<0){
                upLoaded +=this.startIndex;
                this.startIndex=0;
            }
            this.loadData(this.startIndex);
            this.content.y += upLoaded * this.HIGH;
        }
    },

    onScrollEnded()
    {
        // if(!this._isNeedLoad)
        // {
        //     return
        // }
        this.loadScrollData()
        this.mpScrollView.elastic = true
        if (this._ctrl && this._ctrl.onScrollEnded)
        {
            this._ctrl.onScrollEnded()
        }
    },

    update (dt) 
    {
        this._dts += dt
        if(this._dts >= Global.FRAME)
        {
            this._dts -= Global.FRAME
            this.onFiexUpdate(Global.FRAME)
        }
    },

    onFiexUpdate(dt)
    {
        this.loadScrollData()
    },

    start () 
    {
        this.startY = this.content.y//初始化起始y坐标
        this.startIndex = 0 //100项数据里面的起始数据记录索引
        if(Global.uiMgr.getTopViewName() != "rank_view")
        {
            this.loadData(this.startIndex)
        }
    },

    resetView(startIndex)
    {
        this.startY = this._tempY//this.content.y//初始化起始y坐标
        this.startIndex = startIndex //100项数据里面的起始数据记录索引
        this.loadData(this.startIndex)
    },

    onDestroy()
    {
        // for(var i = 0; i < this._item_data.length; i++)
        // {
        //     var item = this._item_data[i]
        //     if(item)
        //     {
        //         item.onDestroy()
        //         // item.off(cc.Node.EventType.TOUCH_END, this.onItemClick, this)
        //     }
        // }
        if(this._ctrl && this._ctrl.onDestroy)
        {
            this._ctrl.onDestroy()
        }
        this.startIndex = 0
        this.items.splice(0)
        this._valueSet.splice(0)
    }

});
