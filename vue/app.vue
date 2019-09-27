<template>
  <div id="app">
    <div id="topnav" v-bind:class="{active:isColor}" >
      <span>p</span>
    </div>
    <div id="nav" v-bind:class="{active:isColor}"  >
      <router-link to="/" class="title" @click.native="mcolor">电影</router-link> 
      <router-link to="/music" class="title" @click.native="ucolor">音乐</router-link>
      <router-link to="/book" class="title" >书籍</router-link>
      <router-link to="/chat" class="title">聊天</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isColor:false
    }
},
methods: {
    mcolor(){
      this.isColor=true
    }
},
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.active{
  background-color:rgb(33,150,243) !important;
  color: red;
}
  #topnav{
    position: fixed;
    top: 0;
    font-size: 50px;
    width: 100%;
    height: 1rem;
    background-color:pink;
    color: aliceblue;

  }
  #nav{
    position: fixed;
    bottom: 0;
    font-size: 20px;
    color: white;
    width: 100%;
    height: 1rem;
    background-color: pink;
  }
  #nav router-link{
    padding: 50px;
    color: white;
    margin: 0 50px;
  }
  /* a:visited{
    color: white
  } */
  .title{
    color:white;
    margin: 25px;
  }
</style>
