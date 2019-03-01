const app = getApp()

import * as echarts from '../../../components/ec-canvas/echarts';
// import images1 from ('../../../images/pie/tab_cart_selected.png')

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
        trigger: 'item',
        show:false,//控制扇形上文字的显示和影藏
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    // tooltip: {
    //   show:true,
    //   trigger: 'item',
    //   position: ['35%', '32%'],
    //   backgroundColor: 'implements',
    //   textStyle:{
    //       color: '#000000',
    //       fontStyle: 'normal',
    //       fontWeight: 'normal',
    //       fontFamily: 'sans-serif',
    //       fontSize: 14,
    //   },
    //   formatter: function(params){
    //       return formatter(params);
    //   }
    // },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap:false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                    },
                    formatter: function(value){
                      var arr = [
                            '{c| }',
                            value.data.name,
                            '￥' + '{b| }' + value.data.value
                                 ].join('\n')
                        return arr
                    },
                    rich: {
                      b: {
                        lineHeight: 33
                      },
                      c: {
                        // backgroundColor: {
                        //     image:'http://www.wxapp-union.com/uc_server/images/noavatar_small.gif',
                        // },
                        backgroundColor:"pink",
                        height: 30,
                        width:30,
                        left:'center',    //让图片居中
                      }
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
  };
  function formatter(params){
      return params.name+'/\n'+params.percent+'%'
    }

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  }
});
