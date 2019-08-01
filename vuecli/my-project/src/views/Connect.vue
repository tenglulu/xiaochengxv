<template>
    <div>
        <h1>This is an about page</h1>
        <router-link :to="{name:'test1',params:{name:'xiaoa',age:'20'}}">test1</router-link>|
        <router-link to="/connect/test2/xiaob/21">test2</router-link>|
        <router-link to="/connect/gotest2/xiaoc/22" class="gotest2con">gotest2</router-link>
        <router-view/>

    </div>
</template>
<script>
export default {
    
}
</script>
<style >
    .gotest2con{
        color:green;
    }
</style>
