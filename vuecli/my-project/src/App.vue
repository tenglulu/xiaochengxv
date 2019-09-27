<template>
  <div id="app">
    <div id="nav">
      <div>
          <button @click="backhome">返回首页</button>
          <button @click="btntest2">test2</button>
          <button @click="back">返回</button>
          <button @click="forward">向前</button>
      </div>
      
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
       <router-link to="/connect">Connect</router-link>|
       <router-link to="/mine">Mine</router-link>|
       <router-link to="/aboutme">Aboutme</router-link>|
       <router-link to="/test3">Test3</router-link>


    </div>
    <div class="fadeconnet">
    <!-- <transition name="fade" > -->
      <router-view/>
      <router-view name="view1"/>
    <!-- </transition> -->
    </div>
    
    
  </div>
</template>
<script>
export default {
  methods:{
    backhome(){
      this.$router.push('/')
    },
    btntest2(){
      this.$router.push('/connect/test2/xiaod/23')
    },
    back(){
      this.$router.go(-1)
    },
    forward(){
      this.$router.go(1)
    }
      
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
.fadeconnet{
  position: relative;
}
.fade-enter{
  transform: translateX(-100%)
}
.fade-enter-active{
  position: absolute;
  top: 0;
  width: 100%;
  transition: all 1s ease;
}
.fade-enter-to{
  transform: translateX(0)
}
.fade-leave{
  transform: translateX(0)
}
.fade-leave-active{
  position: absolute;
  top: 0;
  width: 100%;
  transition: all 1s ease;
}
.fade-leave-to{
  transform: translateX(100%)
}
li{
  list-style: none;
}
</style>
