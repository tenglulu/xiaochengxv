<template>
    <div>
        <h1>{{$store.state.count}}</h1>
     <h1>姓名：{{$route.params.username}}</h1>
     <h1>年龄：{{$route.params.userage}}</h1>
    <button @click="show">click</button>
    <transition name="fadet">
    <div v-show="isShow">hello world</div>

    </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isShow:true
        }
    },
    methods: {
        show(){
            this.isShow=!this.isShow;
        }
    },
}
</script>
<style scoped>
    .fadet-enter{
        opacity: 0;
    }
    .fadet-enter-active{
        transition: all 1s ease;
    }
    .fadet-enter-to{
        opacity: 1;
    }
    .fadet-leave{
        opacity: 1;
    }
    .fadet-leave-active{
        transition: all 1s ease;
    }
    .fadet-leave-to{
        opacity: 0;
    }

</style>


