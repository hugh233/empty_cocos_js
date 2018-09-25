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

    properties: {
        itemTemplate: { // item template to instantiate other items
            default: null,
            type: cc.Node
        },
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        spawnCount: 0, // 实际创建的项数量
        // totalCount: 0, // 在列表中显示的项数量
        spacing: 0, // 项之间的间隔大小
        ctrlName: "demofiller",
        // lblScrollEvent: cc.Label, // 用来显示滚动事件的名称
        // btnAddItem: cc.Button,
        // btnRemoveItem: cc.Button,
        // btnJumpToPosition: cc.Button, 
        // lblJumpPosition: cc.Label,
        // lblTotalItems: cc.Label,
    },

    // use this for initialization
    onLoad() {
        this.itemTemplate.active = false
        this.items = [] // 存储实际创建的项数组
        this._dts = 0
        this._hasInit = false
        this.initCtrl()
    },

    initCtrl()
    {
        var Controller = require(this.ctrlName)
        this._ctrl = new Controller()
        var self = this
        // setTimeout(() => {
            this._ctrl.initData(this)
        // }, 0);
    },

    // 列表初始化
    initialize(datas) 
    {
        this.content = this.scrollView.content
        if(this.items.length > 0)
        {
            for (let i = 0; i < this.items.length; i ++)
            {
                var item = this.items[i]
                item.destroy()
            }
        }

        this.updateTimer = 0
        this.updateInterval = 0.2
        this.totalCount = datas.length
        // 使用这个变量来判断滚动操作是向上还是向下
        this.lastContentPosY = 0 
        // 设定缓冲矩形的大小为实际创建项的高度累加，当某项超出缓冲矩形时，则更新该项的显示内容
        this.bufferZone = this.spawnCount * (this.itemTemplate.height + this.spacing) / 2
        // 获取整个列表的高度
        this.content.height = datas.length * (this.itemTemplate.height + this.spacing) + this.spacing

        if(datas.length < this.spawnCount)
        {
            this.spawnCount = datas.length
        }

        for (let i = 0; i < this.spawnCount; i++) 
        { // spawn items, we only need to do this once
            // console.log("mptableview for -> ", this.spawnCount, i)

            let item = cc.instantiate(this.itemTemplate)
            item.active = true
            this.content.addChild(item)
            // 设置该item的坐标（注意父节点content的Anchor坐标是(0.5, 1)，所以item的y坐标总是负值）
            item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1))
            // item.getComponent('Item').updateItem(i, i)
            item.on(cc.Node.EventType.TOUCH_END, this.onItemClick, this)
            item.index = i

            this.onDataFiller(item, i)
            this.items.push(item)
        }
        this._hasInit = true
    },

    onItemClick(event)
    {
        if (this._ctrl && this._ctrl.onItemClick)
        {
            this._ctrl.onItemClick(event.target, event.target.index)
        }
    },

    onDataFiller(item, index)
    {
        if(this._ctrl && this._ctrl.onDataFiller)
        {
            this._ctrl.onDataFiller(item, index)
        }
    },

    // 返回item在ScrollView空间的坐标值
    getPositionInView(item) 
    {
        let worldPos = item.parent.convertToWorldSpaceAR(item.position)
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos)
        return viewPos
    },

    onFixedUpdate(dt)
    {
        this.updateData(dt)
    },

    update(dt)
    {
        this._dts += dt
        if(this._dts >= Global.FRAME)
        {
            this._dts -= Global.FRAME
            this.onFixedUpdate(Global.FRAME)
        }
    },

    // 每帧调用一次。根据滚动位置动态更新item的坐标和显示(所以spawnCount可以比totalCount少很多)
    updateData(dt) 
    {
        if(!this._hasInit)
        {
            return
        }

        if(this.spawnCount < 5)
        {
            this.scrollView.vertical = false
            return
        }

        this.updateTimer += dt
        if (this.updateTimer < this.updateInterval) {
            return // we don't need to do the math every frame
        }
        this.updateTimer = 0
        let items = this.items
        // 如果当前content的y坐标小于上次记录值，则代表往下滚动，否则往上。
        let isDown = this.scrollView.content.y < this.lastContentPosY
        // 实际创建项占了多高（即它们的高度累加）
        let offset = (this.itemTemplate.height + this.spacing) * items.length
        console.log("mptableview updateData offset ->", offset, this.scrollView.content.y, this.lastContentPosY)
        let newY = 0

        // 遍历数组，更新item的位置和显示
        for (let i = 0; i < items.length; i++) 
        {
            let tempItem = items[i]
            let viewPos = this.getPositionInView(tempItem)
            if (isDown)
            {
                // 提前计算出该item的新的y坐标
                newY = tempItem.y + offset
                // 如果往下滚动时item已经超出缓冲矩形，且newY未超出content上边界，
                // 则更新item的坐标（即上移了一个offset的位置），同时更新item的显示内容
                if (viewPos.y < -this.bufferZone && newY < 0) 
                {
                    tempItem.setPositionY(newY)
                    items[i].itemId = items[i].itemId - items.length
                    tempItem.index = tempItem.index - items.length
                    this.onDataFiller(tempItem, tempItem.index)
                }
            } else
            {
                // 提前计算出该item的新的y坐标
                newY = tempItem.y - offset
                // 如果往上滚动时item已经超出缓冲矩形，且newY未超出content下边界，
                // 则更新item的坐标（即下移了一个offset的位置），同时更新item的显示内容
                if (viewPos.y > this.bufferZone && newY > -this.content.height) 
                {
                    tempItem.setPositionY(newY)
                    items[i].itemId = items[i].itemId + items.length
                    tempItem.index = tempItem.index + items.length
                    this.onDataFiller(tempItem, tempItem.index)
                }
            }
        }

        // 更新lastContentPosY和总项数显示
        this.lastContentPosY = this.scrollView.content.y
    },

    resetData(datas)
    {
        let items = this.items
        for (let i = 0; i < items.length; i++) 
        {
            let tempItem = items[i]
            this.onDataFiller(tempItem, tempItem.index)
        }
        this.content.height = datas.length * (this.itemTemplate.height + this.spacing) + this.spacing
        this.totalCount = datas.length
    },

    addItem() 
    {
        this.content.height = (this.totalCount + 1) * (this.itemTemplate.height + this.spacing) + this.spacing // get total content height
        this.totalCount = this.totalCount + 1
    },

    removeItem() 
    {
        if (this.totalCount - 1 < 30) 
        {
            cc.error("can't remove item less than 30!")
            return
        }

        this.content.height = (this.totalCount - 1) * (this.itemTemplate.height + this.spacing) + this.spacing // get total content height
        this.totalCount = this.totalCount - 1
    },

    scrollToFixedPosition() 
    {
        // 在2秒内完成
        this.scrollView.scrollToOffset(cc.p(0, 500), 2)
    },

    scrollEvent(sender, event) 
    {
        switch(event) {
            case 0: 
               this.lblScrollEvent.string = "Scroll to Top"
               break
            case 1: 
               this.lblScrollEvent.string = "Scroll to Bottom"
               break
            case 2: 
               this.lblScrollEvent.string = "Scroll to Left"
               break
            case 3: 
               this.lblScrollEvent.string = "Scroll to Right"
               break
            case 4: 
               this.lblScrollEvent.string = "Scrolling"
               break
            case 5: 
               this.lblScrollEvent.string = "Bounce Top"
               break
            case 6: 
               this.lblScrollEvent.string = "Bounce bottom"
               break
            case 7: 
               this.lblScrollEvent.string = "Bounce left"
               break
            case 8: 
               this.lblScrollEvent.string = "Bounce right"
               break
            case 9: 
               this.lblScrollEvent.string = "Auto scroll ended"
               break
        }
    },

    onDestroy()
    {
        this._hasInit = false
        if(this._ctrl && this._ctrl.onDestroy)
        {
            this._ctrl.onDestroy()
        }
    }

});
