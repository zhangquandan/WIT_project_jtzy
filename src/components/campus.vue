<template>
  <div id="campus">
    <div class="top">
      <img style="width: 25px; height: 25px; vertical-align: -4px; margin-right: 5px;" src="../assets/img/RU_icon.png" />
      校区用水漏损概括
    </div>
    <div class="content">
      <div class="title">全校区</div>
      <ul class="list">
        <li>综合侧漏指数:<span>{{$store.state.maprange[0] ? $store.state.maprange[0].value.leakageIndex : '正在获取'}}</span></li>
        <li>日用量隔周增量:<span>{{$store.state.maprange[0] ? $store.state.maprange[0].value.addTotal : '正在获取'}}吨</span></li>
        <li>日用量隔周增幅:<span>{{$store.state.maprange[0] ? $store.state.maprange[0].value.addRangeTotal : '正在获取'}}</span></li>
        <li>日最小量隔周增量:<span>{{$store.state.maprange[0] ? $store.state.maprange[0].value.addMin : '正在获取'}}吨</span></li>
        <li>日最小量隔周增幅:<span>{{$store.state.maprange[0] ? $store.state.maprange[0].value.addRangeMin : '正在获取'}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
</script>

<style scoped="scoped">
  #campus {
    color: white;
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url(../assets/img/schoolInfo.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    overflow: hidden;
  }

  .top {
    font-size: 1.25rem;
    color: rgb(250, 205, 65);
    height: 50px;
    line-height: 50px;
    background-color: rgb(4, 33, 103);
    margin: 2px;
    text-align: left;
    padding-left: 20px;
    box-sizing: border-box;
  }

  .title{
    background-image: url(../assets/img/lbBg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 200px;
    height: 40px;
    line-height: 40px;
    margin: 20px auto;
  }

  .top::after {
    content: '';
    height: 2px;
    width: 100%;
    display: block;
    background-image: linear-gradient(to right, rgb(4, 33, 103), rgb(4, 33, 103), rgb(0, 154, 215) 50%, rgb(4, 33, 103), rgb(4, 33, 103));
  }

  .list {
    padding-left: 100px;
  }

  .list li {
    list-style-type: none;
    background: url(../assets/img/notepad.png) no-repeat 0rem 0.3rem;
    background-size: 0.8rem 0.8rem;
    text-align: left;
    padding-left: 20px;
    box-sizing: border-box;
    color: #5ECEF4;
    margin-bottom: 20px;
  }

  li span{
    color: white
  }
</style>
