<template>
  <div class="mcontent">
    <ul v-for="(item) in dataList" :key="item.id" class="moviedata ">
      <div class="movielist ">
        <div class="mtitle">
            <li >{{item.title}}</li>
             <li class="msubtitle">{{item.card_subtitle}}</li>
        </div>
      <div class="mpicture">
        <li >
          <!-- <img :src="item.cover.url" /> -->
          <img :src="'https://images.weserv.nl/?url='+item.cover.url" />
        </li>
      </div>
     
     
      </div>
      
    </ul>
  </div>
</template>
<script>
export default {
    data() {
      return {
        // motitle:"",
        // actor:"",
        // mopicture:"",
        dataList:[]
      }
    },
    created() {
        this.getData();
    },
    methods: {
      getData(){
        let birdapi = 'https://bird.ioliu.cn/v2?url='
            let urlapi = `https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items?start=0&count=10`
            axios.get(birdapi+urlapi)
            .then((res)=>{
                // console.log(res.data.subject_collection_items);
                //console.log(res.data.subject_collection_items[0].title);
                this.dataList=res.data.subject_collection_items;
            })
      }
    },
}
</script>
<style>
.mcontent{
  padding: 1rem 0;
}
.moviedata{
  padding: 0;
  margin: 0;
}
.movielist{
 
  height: 171px;
  border-bottom: 1px solid black;
  padding: 10px;
}
.mtitle{
 font-size: .35rem;
 float: right;
 width: 60%;
 
}
.msubtitle{
  font-size: 0.25rem;
}
.mpicture{
  width: 40%;
}
.moviedata li img{
  /* width: 121.33px; */
  height: 169.86px;
  width: 85%;
  float: left;
}

</style>

