<template lang='html'>
  <div @click="docClick()">
    <Header :isShowStatusBox="isShowStatusBox" @changeStatusBox="changeStatus"></Header>
    <Content></Content>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../Header/Header.vue'
  import Content from '../Content/Content.vue'
  import Footer from '../Footer/Footer.vue'
  export default {
    data() {
      return {
        isShowStatusBox: false
      }
    },
    mounted() {

    },
    components: {
      Header,
      Content,
      Footer
    },
    methods: {
      docClick() {
        this.isShowStatusBox = false
      },
      changeStatus() {
        this.isShowStatusBox = true
      }
    }
  }
</script>

<style lang='' scoped>

</style>
