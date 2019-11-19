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
          top: '5%'
        },
        xAxis: {
          type: 'category',
          data: title,
          boundaryGap: false,
          axisTick: {
            alignWithLabel: true
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          data: data,
          type: 'line',
          areaStyle: {},
          label: {
            normal: {
              show: true,
              position: 'top'
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
          data: title,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          show: false
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
            barBorderRadius: [8, 8, 0, 0]
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
          itemStyle: {
            barBorderRadius: [8, 8, 0, 0]
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
        yAxis: {
          type: 'value',
          show: false
        },
        series: series
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
        if (element.type == 'bar') {
          element.label = {
            normal: {
              show: true,
              position: 'inside'
            }
          }
          element.itemStyle = {
            barBorderRadius: [8, 8, 0, 0]
          }
        }
        if (element.type == 'line') {
          element.label = {
            normal: {
              show: true,
              position: 'top'
            }
          }
        }
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
          type: 'value',
          show: false
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
