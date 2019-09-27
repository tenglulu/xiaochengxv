<template>
    <div class="zheader">
        <header :class="[activeClass]">
            <p>首页</p>
            <span>{{activeTitle}}</span>
        </header>
        <nav :class="[activeClass]">
        <ul>   
            <!-- <router-link to="/" class="title" @click.native="mocolor">电影</router-link> 
            <router-link to="/music" class="title" @click.native="mucolor">音乐</router-link>
            <router-link to="/book" class="title" @click.native="bocolor">书籍</router-link>
            <router-link to="/chat" class="title" @click.native="chcolor">聊天</router-link> -->
               
            <li @click="clickHandle(item)" v-for="(item,index) in NavList" :key="index">{{item.title}}</li>
        </ul>
        </nav>
    </div>
</template>
<script>
export default {
    data(){
        return {
            activeClass:"movie",
            activeTitle:"电影",
           NavList:[
                {
                    title   : "电影",
                    pathName: "/",
                    navClass: "movie"
                },
                {
                    title   : "音乐",
                    pathName: "/music",
                    navClass: "music"
                },
                {
                    title   : "书籍",
                    pathName: "/book",
                    navClass: "book"
                },
                {
                    title   : "聊天",
                    pathName: "/chat",
                    navClass: "chat"
                }
           ]
        }
    },
    methods: {
        // mocolor(){
        //     this.activeClass="movie"
        // },
        // mucolor(){
        //     this.activeClass="music"
        // },
        // bocolor(){
        //     this.activeClass="book"
        // },
        // chcolor(){
        //     this.activeClass="chat"
        // },
        clickHandle(obj){
            // console.log(obj.pathName)
            this.$router.push(obj.pathName);
            this.activeTitle=obj.title;
            this.activeClass=obj.navClass;
        }
    },
}
</script>
<style scoped>
.movie{
    background-color: rgb(241, 98, 117);
}
.music{
background-color: rgb(66, 224, 203);
}
.book{
background-color: rgba(247, 221, 75);
}
.chat{
background-color: rgba(63, 81, 181);
}
header{
    position: fixed;
    top: 0;
    width: 100%;
    height: 1rem;
    background-color:pink;
    text-align: center;
    line-height: 1rem;
    color: white;
}
nav{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1rem;
    background-color:pink;
    font-size: 0.4rem;
}
header p{
     font-size: .2rem;
    position : absolute;
    left     : 10px;
    top      : 50%;   
    transform: translateY(-50%);

}
header span{
    font-size: 0.7rem;

}
 nav ul{
    width  : 100%;
    display: flex;
}
 nav ul li{
     list-style: none;
    flex-grow  : 1;
    text-align : center;
    line-height: 1rem;
    text-decoration: none;
    color: aliceblue;
}
header{
    z-index: 1000;
}
</style>
