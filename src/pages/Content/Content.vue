<template lang='html'>
  <div>
    <!-- 导航条 -->
    <div id="commNav">
      <ul id="navContent">
        <li><a @click="skipTo('Index')" :class="{'routeActive': route_name.includes('Index')}">{{$t('content.0')}}</a></li>
        <li><a @click="skipTo('StandardSearch')" :class="{'routeActive': route_name.includes('StandardSearch')}">{{$t('content.1')}}</a></li>
        <li><a @click="skipTo('LawSearch')" :class="{'routeActive': route_name.includes('LawSearch')}">{{$t('content.2')}}</a></li>
        <li><a @click="skipTo('StandardLawState')" :class="{'routeActive': route_name.includes('StandardLawState')}">{{$t('content.3')}}</a></li>
        <li><a @click="skipTo('LatestTranslation')" :class="{'routeActive': route_name.includes('LatestTranslation')}">{{$t('content.4')}}</a></li>
        <li><a @click="skipTo('Link')" :class="{'routeActive': route_name.includes('Link')}">{{$t('content.5')}}</a></li>
      </ul>
    </div>
    <div id="stage">
      <div id="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    data() {
      return {
      }
    },
    computed: {
      route_name() {
        return this.$store.state.route_name
      }
    },
    methods: {
      skipTo(name) {
        this.reload()
        this.$router.push({
          name
        })
        //this.$store.commit('change_route', {route_name: name})
      }
    }
  }
</script>

<style scoped>
  /*导航条*/
  #commNav{
    height:60px;
    width:100%;
    background: #0C7DCF;
  }
  #navContent{
    height:100%;
    width:70%;
    margin:0 auto;
  }
  #navContent li{
    margin-right:30px;
    float: left;
    list-style: none;
  }
  #navContent li a{
    display: block;
    color:#B3D6F0;
    font-size:18px;
    height:60px;
    line-height: 60px;
    border-bottom: 3px solid #0C7DCF
  }
  #navContent li a:hover{
    color:#fff;
    border-bottom: 3px solid #fff;
    font-weight: bold;
  }
  .views-box {
    padding: 15px 0;
    background-color: #efefef;
    min-height: 600px;
  }
  .views {
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    min-height: 600px;
    padding: 12px 20px 30px;
  }
  /*导航激活状态*/
  .routeActive {
    color:#fff !important;
    border-bottom: 3px solid #fff !important;
    font-weight: bold !important;
  }
  #stage {
    width: 100%;
    background: #f1f1f1;
    padding-bottom: 80px;
    padding-top: 40px;
    overflow: hidden;
  }
  #content {
    width: 100%;
    min-height: 680px;
  }
</style>
