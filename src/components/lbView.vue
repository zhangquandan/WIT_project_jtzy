<template>
  <div id="lbView">
    <div class="top">
      <img style="width: 25px; height: 25px; vertical-align: -4px; margin-right: 5px;" src="../assets/img/Lower-left-icon.png" />
      {{title}}综合漏损指数
    </div>
    <div class="column">
      <span style="vertical-align: top;" class="column-item">{{title}}</span>
      <span class="column-item">
        <div style="height: 20px; line-height: 20px; text-align: justify; padding: 0 16px;">日用量<div style="width: 100%; display: inline-block;"></div>
        </div>
        <div style="height: 20px; line-height: 20px;">隔周增量</div>
      </span>
      <span class="column-item">
        <div style="height: 20px; line-height: 20px; text-align: justify; padding: 0 16px;">最小量<div style="width: 100%; display: inline-block;"></div>
        </div>
        <div style="height: 20px; line-height: 20px;">隔周增量</div>
      </span>
    </div>
    <div style="margin-top: 15px;">
      <div class="value" :key="index" v-for="(item,index) in val">
        <div style="width: 125px; margin-left: 30px; padding-left: 17px;" class="value-item">{{item.name}}</div>
        <div style="padding-left: 30px;" class="value-item">{{item.val.addTotal.toFixed(1)}}</div>
        <div style="padding-left: 40px;" class="value-item">{{item.val.addMin.toFixed(1)}}</div>
      </div>
      <div style="color: white; line-height: 300px;" v-show="$store.state.topTen.length == 0">
        暂无数据
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'lbView',

    props: {
      column: {
        type: String,
        default: "水表"
      },
    },

    data() {
      return {
        title: "",
        val:[]
      }
    },

    methods: {
      setData: function() {
        var that = this
        this.val = this.$store.state.topTen;
        switch (that.$store.state.viewType) {
          case 'build':
            that.title = "建筑"
            break
          case 'meter':
            that.title = "水表"
            break
          case 'dma':
            that.title = "DMA"
            break
        }
      }
    },

    mounted() {

    }
  }
</script>

<style scoped="scoped">
  #lbView {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url(../assets/img/lbViewBg.png);
    overflow: hidden;
  }

  .top {
    font-size: 1.25rem;
    color: rgb(250, 205, 65);
    height: 50px;
    line-height: 50px;
    background-color: rgb(4, 33, 103);
    margin: 4px;
    text-align: left;
    padding-left: 20px;
    box-sizing: border-box;
  }

  .top::after {
    content: '';
    height: 2px;
    width: 100%;
    display: block;
    background-image: linear-gradient(to right, rgb(4, 33, 103), rgb(4, 33, 103), rgb(0, 154, 215) 50%, rgb(4, 33, 103), rgb(4, 33, 103));
  }

  .title {
    padding-top: 30px;
    padding-bottom: 30px;
    color: #c9d2db;
    font-size: 0.75rem;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    display: -webkit-flex;
  }

  .column {
    text-align: center;
    margin-top: 20px;

  }

  .column .column-item {
    background-image: url(../assets/img/lbBg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: white;
    display: inline-block;
    height: 40px;
    width: 20%;
    line-height: 40px;
    font-size: 12px;
    margin: 0 15px;
  }

  .value {
    color: #5ecef4;
    width: 100%;
    height: 35px;
    text-align: left;
    box-sizing: border-box;
  }

  .value::after{
    content: '';
    display: block;
    height: 1px;
    background: #0000FF;
    width: 90%;
    margin: 0 auto;
  }

  .value .value-item {
    display: inline-block;
    height: 100%;
    width: 100px;
    font-size: 13px;
    padding-top: 12px;
    box-sizing: border-box;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
