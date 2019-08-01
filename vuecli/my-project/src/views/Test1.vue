<template>
    <div>
     <h1>姓名：{{$route.params.name}}</h1>
     <h1>年龄：{{$route.params.age}}</h1>

    </div>
</template>
<script>
export default {
    beforeRouteEnter(to,from,next){
        console.log(to,from);
       next();
    },
    beforeRouteLeave (to, from, next) {
        console.log(to,from);
        next();
    }
    
}
</script>