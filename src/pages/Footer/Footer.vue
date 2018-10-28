<template lang='html'>
  <div>
    <!--有谱-->
    <div class="footer" v-show="system == 'YOUPU'">
      <p>地址：海淀区中关村东路18号财智国际大厦A座 1212室</p>
      <p>电话：400-0052-365  邮箱：corp@emingren.com</p>
      <p>技术支持：铭仁（北京）教育科技有限公司</p>
    </div>
    <!--睿芽-->
    <div class="footer" v-show="system == 'RYA'">
      <p>地址：徐汇区桂平路92号 4楼 E座</p>
      <p>电话：0371-55677276 &nbsp;&nbsp; 邮箱：fxd@onlyets.com</p>
      <p>技术支持：上海睿芽教育科技有限公司 &nbsp; 沪ICP备 15015250号 <span><a href="http://new.cnzz.com/v1/login.php?siteid=1273936869" target="_blank"><img src="../../assets/images/pic1.gif" alt=""></a></span></p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        system: this.global.system
      }
    }
  }
</script>

<style lang=''>

</style>
