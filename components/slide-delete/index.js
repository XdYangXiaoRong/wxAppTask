Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    itemIndex:{
      type:Number,
      value:0,
      observer(newVal) {
        if(newVal) {
          this.setData({
            xmove: 0
          })
        }
      }
    },
    deleteBtnWth:{//删除按钮的宽度，删除按钮有多宽，左滑时就滑动多远
      type:Number,
      value:65
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ifAnimation:false,
    translateX: 0,
    xmove:0,//向左滑动的距离
    moveItem:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * 显示删除按钮
   */
    showDeleteButton: function (e) {
      console.log("showDeleteButton",e)
      // let productIndex = e.currentTarget.dataset.productindex
      // this.setXmove(productIndex, -65)
      let leftMove=this.data.deleteBtnWth
      this.setXmove(-leftMove)
    },

    /**
     * 隐藏删除按钮
     */
    hideDeleteButton: function (e) {
      // let productIndex = e.currentTarget.dataset.productindex
      // this.setXmove(productIndex, 0)
      this.setXmove(0)
    },

    /**
     * 设置movable-view位移
     */
    setXmove: function (xmove){
      console.log(999,xmove)
      this.setData({
        xmove:xmove
      })
    },
    /**
     * 处理movable-view移动事件
     */
    handleMovableChange: function (e) {
      // console.log("move",e.detail.source,e.detail.x)
      if (e.detail.source === 'friction') {//friction（惯性）
        if (e.detail.x < -30) {
          this.showDeleteButton(e)
        } else {
          this.hideDeleteButton(e)
        }
      } else if (e.detail.source === 'out-of-bounds' && e.detail.x === 0) {//out-of-bounds（超出移动范围后的回弹)，回到原来的位置
        this.hideDeleteButton(e)
      }
    },

    /**
     * 处理touchstart事件
     */
    handleTouchStart(e) {
      console.log('start',e)
      this.startX = e.touches[0].pageX
      setTimeout(()=>{
        this.setData({
          ifAnimation:true
        })
      },100)
     
    },

    /**
     * 处理touchend事件
     */
    handleTouchEnd(e) {
      console.log('end',e)
      if(e.changedTouches[0].pageX < this.startX && e.changedTouches[0].pageX - this.startX <= -30) {
        this.showDeleteButton(e)
      } else if(e.changedTouches[0].pageX > this.startX && e.changedTouches[0].pageX - this.startX < 30) {
        this.showDeleteButton(e)
      } else {
        this.hideDeleteButton(e)
      }
      setTimeout(()=>{
        this.setData({
          ifAnimation:false
        })
      },100)
    },
    /**
     * 组件操作事件（此示例只有删除事件，可根据需要增加其他事件）
     */
    handleAction(e) {
      // var data=e.currentTarget
      var id=this.data.itemIndex;//当前操作项的特殊标记
      this.triggerEvent('action', {
        id:id
      })
    }
  },
  ready() {
    // this.actionWidth = 60
    console.log(3333,this.data.itemIndex)
    // console.log(8888,this.data.animation)
    // this.setData({
    //   ifAnimation:this.data.animation
    // })
  }
})