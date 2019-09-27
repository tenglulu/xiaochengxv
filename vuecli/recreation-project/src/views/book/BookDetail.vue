<template>
<div class="bookinfo">
    <div v-if="bookInfo.title">
        <div class="infoword">
            <p class="infotitle">{{bookInfo.title}}</p>
             <div class="infovalue">评分{{bookList.rating.value}}</div>
            <p>{{bookList.info}}/{{bookInfo.subject.pages[0]}}页</p>
        </div>
        <div class="infoimg">
            <img :src="bookInfo.subject.pic.large" alt="" srcset="">
        </div>
        <div class="infocomment">{{bookList.recommend_comment}}</div>
    </div>
    
</div>
    
</template>
<script>
export default {
    data() {
        return {
            bookInfo:[],
            bookList:[],
        }
    },
    created() {
        
        console.log(this.$route.params.item);
        // console.log(this.$route.params.item.id);
        // let bookid=this.$route.params.item
        this.getbContent(this.$route.params.item)
    },
    methods: {
        getbContent(bookid){
            if(bookid){
                console.log(bookid.id);
                this.bookList=bookid;
                let birdurl="https://bird.ioliu.cn/v2?url=";
            let bookUrl = "https://m.douban.com/rexxar/api/v2/market/book/"+bookid.id;
            axios.get(birdurl+bookUrl).then((res)=>{
                console.log(res);
                this.bookInfo=res.data.data
                
            })
            }
            
            
        },
        
    },
    
}
</script>
<style>
.bookinfo{
    padding: 1.5rem 0rem;
    position: relative;
}
.infoword{
    font-size: 0.3rem;
    width: 50%;
    padding: 0.2rem;
    float: left;
}
.infoimg{
    width: 40%;
    float: right;
    position: absolute;
    top: 1.5rem;
    right: 0.4rem;
}
.infoimg img{
    width: 100%;
}
.infotitle{
    font-size: 0.5rem;
}
.infovalue{
    color:red;
    font-size: 0.3rem;
}
.infocomment{
    font-size: 0.3rem;
    padding: 5.5rem 0.3rem;
}
</style>
