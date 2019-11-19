<template>
  <div class="calendar">
    <div class="handle">
      <div class="time">{{year}}-{{month < 10 ? '0' + month : month}}</div>
      <ul class="btn">
        <Icon @click="prevMon(year,month)" type="ios-arrow-back" />
        <Icon @click="nextMon(year,month)" type="ios-arrow-forward" />
      </ul>
    </div>
    <ul class="item week-title">
      <li v-for="(item, index) in weekTitle" :key="index">{{item}}</li>
    </ul>
    <ul class="item day-list">
      <li v-for="(item, index) in prevMonList" :key="'p'+index"></li>
      <li :class="{'today':Today==item.time,'active':item.more}" v-for="(item, index) in MonNumList" :key="index">
        <p>{{item.time}}</p>
        <div class="main" v-if="item.more">
          <div class="title">{{item.title}}</div>
          <div class="content">{{item.content}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'calendar-box',
  data () {
    return {
      weekTitle: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      year: null,
      month: null,
      day: null,
      moment: {}
    }
  },
  props: {
    data: {
      type: Array // 类型：Array,String,Number,Object,Boolean,Function,Symbol
    }
  },
  computed: {
    MonNumList () {
      let data = this.data
      let year = this.year
      let month = this.month
      let MonNum = new Date(year, month, 0)
      let list = MonNum.getDate()

      let dayList = []
      for (let i = 0; i < list; i++) {
        dayList.push({ time: i + 1 })
        if (data) {
          for (let j = 0; j < data.length; j++) {
            const element = data[j]
            element.timeList = element.time.split('-')
            if (year == element.timeList[0]) {
              if (month == element.timeList[1]) {
                if (i + 1 == element.timeList[2]) {
                  dayList[i].more = true
                  dayList[i].title = element.title
                  dayList[i].content = element.content
                }
              }
            }
          }
        }
      }
      return dayList
    },
    prevMonList () {
      let year = this.year
      let month = this.month

      let day = new Date(year, month - 1, 0)
      let week = day.getDay() + 1
      let weekList = week == 7 ? 0 : week

      return weekList
    },
    Today () {
      let time = new Date()
      let nowYear = time.getFullYear()
      let nowMonth = time.getMonth() + 1
      let day = false

      let year = this.year
      let month = this.month
      if (nowYear == year) {
        if (nowMonth == month) {
          day = time.getDate()
        }
      }
      return day
    },
    yearList: {
      get () {
        let year = this.year
        let yearlist = []
        for (let i = year - 20; i < year + 20; i++) {
          yearlist.push({
            year: i,
            select: false
          })
        }
        return yearlist
      },
      set () {}
    },
    monList: {
      get () {
        let monlist = []
        for (let i = 0; i < 12; i++) {
          monlist.push({
            month: i + 1,
            select: false
          })
        }
        return monlist
      },
      set () {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let time = new Date()
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()

      this.year = year
      this.month = month
      this.day = day
    },
    // 上一月
    prevMon (year, month) {
      if (month == 1) {
        this.month = 12
        this.year--
      } else {
        this.month--
      }
    },
    // 下一月
    nextMon (year, month) {
      if (month == 12) {
        this.month = 1
        this.year++
      } else {
        this.month++
      }
    },
    // 选取时间
    selectTime (list, name, key) {
      let datalist = this[list]
      for (let i = 0; i < datalist.length; i++) {
        const element = datalist[i]
        element.select = false
      }

      this.moment[name] = key[name]
      key.select = true
      this.$forceUpdate()
    },
    // 修改年月
    postTime () {
      this.year = this.moment.year
      this.month = this.moment.month
      this.moment = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  font-size: 0;
  width: 500px;
  .handle {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;

    justify-content: center;
    .time {
      font-size: 22px;
      display: flex;
      flex-direction: row;
      cursor: pointer;
      text-align: center;

      align-items: center;
      justify-content: center;
    }
    .btn {
      position: absolute;
      top: 0;
      display: flex;
      flex-direction: row;
      width: 100%;

      align-items: center;
      justify-content: space-between;
      i {
        font-size: 30px;
        cursor: pointer;
      }
    }
  }
  .item {
    display: flex;
    flex-direction: row;

    align-items: center;
    li {
      font-size: 14px;
      display: flex;
      flex-direction: row;
      width: 30px;
      height: 30px;
      margin: 0 20px;

      align-items: center;
      justify-content: center;
    }
  }
  .week-title {
    margin-top: 30px;
    padding-bottom: 10px;
    border-bottom: 2px solid #d4d5d7;
    li {
      color: #989898;
    }
  }
  .day-list {
    flex-wrap: wrap;
    li {
      position: relative;
      margin-top: 15px;
      cursor: pointer;
      color: #454545;
      border-radius: 50%;
      &:hover {
        .main {
          display: block;
        }
      }
      .main {
        position: absolute;
        bottom: 40px;
        left: -88px;
        display: none;
        width: 190px;
        padding: 16px 15px;
        border-radius: 6px;
        background-color: #fff;
        box-shadow: 2px 2px 18px 0 rgba(178,179,183,.50);
        &::before {
          position: absolute;
          bottom: -8px;
          left: 95px;
          width: 0;
          height: 0;
          content: '';
          border-top: 8px solid #dddfe2;
          border-right: 6px solid transparent;
          border-left: 6px solid transparent;
        }
        &::after {
          position: absolute;
          bottom: -7px;
          left: 95px;
          width: 0;
          height: 0;
          content: '';
          border-top: 8px solid #fff;
          border-right: 6px solid transparent;
          border-left: 6px solid transparent;
        }
        .title {
          font-size: 12px;
          color: #454545;
        }
        .content {
          font-size: 12px;
          line-height: 1.6;
          margin-top: 8px;
          color: #989898;
        }
      }
    }
    .today {
      background: #e5eaff;
    }
    .active {
      background: #ffbf01;
    }
  }
}
</style>
