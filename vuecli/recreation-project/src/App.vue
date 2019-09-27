<template>
  <div>
    <Navigation></Navigation>
      <router-view/>
  </div>
</template>
<script>
import Navigation from "@/components/Navigation.vue"
export default {
    components:{
      Navigation
    }
}
</script>
<style>
*{
    margin: 0;
    padding: 0;
}
#nav{
  list-style: none;
}
li{
  list-style: none;
}
/* .clearfix::after{
  content: "";
  display: block;
  clear: both;
} */
</style>
