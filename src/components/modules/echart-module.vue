<template>
  <div class="echart-module" :id="echartsId">
    <Spin fix size="large" v-if="Loading"></Spin>
  </div>
</template>

<script>
import 'echarts/theme/macarons.js'
export default {
  name: 'echart-module',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.createEchart(this.data.type)
  },
  created () {
    this.echartsId = Math.random().toString(36).substr(2)
    this.Loading = true
  },
  computed: {
    // 折线图
    Line () {
      let title = this.data.title
      let data = this.data.data
      let option = {
        grid: {
          left: '4%',
          right: '4%',
          bottom: '4%',
          top: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: title,
          axisTick: {
            alignWithLabel: true
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          }
        },
        series: [{
          data: data,
          type: 'line',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#6CCDFC' // 0% 处的颜色
                }, {
                  offset: 1, color: '#2397E8' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        }]
      }
      return option
    },
    // 柱状图
    Bar () {
      let title = this.data.title
      let data = this.data.data
      let option = {
        grid: {
          left: '4%',
          right: '4%',
          bottom: '4%',
          top: '4%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: title,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          }
        },
        series: [{
          data: data,
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#6CCDFC' // 0% 处的颜色
                }, {
                  offset: 1, color: '#2397E8' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        }]
      }
      return option
    },
    // 多柱状图
    BarMore () {
      let key = this.data
      let data = []
      let series = []
      for (let i = 0; i < key.data.length; i++) {
        const element = key.data[i]
        data[i] = [element.key, ...element.value]
      }
      for (let i = 0; i < key.title.length; i++) {
        series.push({
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          type: 'bar'
        })
      }
      data.unshift(['product', ...key.title])

      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        dataset: {
          source: data
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '4%',
          top: '7%',
          containLabel: true
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {},
        series: series
      }
      return option
    },
    // 雷达图
    Radar () {
      let title = this.data.title
      let data = this.data.data
      let legend = []
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        legend.push(element.name)
      }

      let option = {
        tooltip: {},
        legend: {
          data: legend
        },
        radar: {
          indicator: title,
          center: ['50%', '55%'],
          radius: '88%'
        },
        series: [{
          type: 'radar',
          data: data
        }]
      }
      return option
    },
    // 混合折现柱状图
    Mixture () {
      let title = this.data.title
      let data = this.data.data
      let legend = []

      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        legend.push(element.name)
      }

      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: legend
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '4%',
          top: '7%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: title
        },
        yAxis: {
          type: 'value'
        },
        series: data
      }
      return option
    }
  },
  methods: {
    // 图表显示
    createEchart (type) {
      this.Loading = false

      let option
      switch (type) {
        case 'line':
          option = this.Line
          break
        case 'bar':
          option = this.Bar
          break
        case 'barMore':
          option = this.BarMore
          break
        case 'radar':
          option = this.Radar
          break
        case 'mixture':
          option = this.Mixture
          break

        default:
          break
      }
      let myChart = this.Echarts.init(document.getElementById(this.echartsId), 'macarons')
      myChart.setOption(option)

      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    // 根据数据返回颜色值
    getColor (list, data) {
      if (data >= 75) {
        return list[0]
      }
      if (data >= 50) {
        return list[1]
      }
      if (data >= 25) {
        return list[2]
      }
      if (data < 25) {
        return list[3]
      }
    },
    // 以下为类型数据事例
    demoData () {
      this.line = {
        type: 'line',
        title: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Cheese Brownie'],
        data: [100, 70, 40, 10]
      }

      this.bar = {
        type: 'bar',
        title: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Cheese Brownie'],
        data: [100, 70, 40, 10]
      }

      this.barright = {
        type: 'barright',
        title: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Cheese Brownie'],
        data: [100, 70, 40, 10]
      }

      this.barmore = {
        type: 'barmore',
        title: ['2015', '2016', '2017'],
        data: [
          { key: 'Matcha Latte', value: [72.4, 53.9, 39.1] },
          { key: 'Milk Tea', value: [83.1, 73.4, 55.1] },
          { key: 'Cheese Cocoa', value: [86.4, 65.2, 82.5] },
          { key: 'Cheese Brownie', value: [86.4, 73.4, 82.5] }
        ]
      }

      this.radar = {
        type: 'radar',
        title: [
          { name: '销售', max: 50 },
          { name: '信息', max: 50 },
          { name: '客服', max: 50 },
          { name: '研发', max: 50 },
          { name: '市场', max: 50 }
        ],
        data: [
          { name: '本校', value: [43, 40, 28, 35, 50, 19] },
          { name: '全区', value: [50, 34, 28, 31, 42, 21] }
        ]
      }

      this.mixture = {
        type: 'mixture',
        title: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [
          {
            data: [820, 912, 934, 534, 790, 930, 1020],
            type: 'bar',
            name: 'box1'
          }, {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            name: 'box2'
          }, {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line',
            name: 'box3'
          }
        ]

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.echart-module {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
