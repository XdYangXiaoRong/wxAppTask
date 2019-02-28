//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    productList: [//产品列表信息
      {
        id: 1,
        name: '产品一',
        code: 100001,
        amount: 1
      },
      {
        id: 2,
        name: '产品二',
        code: 100002,
        amount: 5
      },
      {
        id: 3,
        name: '产品三',
        code: 300001,
        amount: 10
      }
    ]
  },
  /**
   * slide-delete 删除产品
   */
  handleSlideDelete({ detail: { id } }) {
    let productList = this.data.productList
    let productIndex = productList.findIndex(item => item.id = id)
    productList.splice(productIndex, 1)

    this.setData({
      productList
    })
  },
  onLoad: function () {
   
  },
  
})
