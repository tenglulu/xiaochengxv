<template>
    <div>
        <div class="bookpic">
            <swiper :options="swiperOption">
                <swiper-slide v-for="item in bookLists" :key="item.id" @click.native="chooseBook(item)">
                    <div class="bookimg"><img :src="'https://images.weserv.nl/?url='+item.cover.url" /></div>
                    <div class="btitle">{{item.title}}</div>
                    <div class="bsubtitle">{{item.card_subtitle}}</div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    components: {
    swiper,
    swiperSlide
    },
    data() {
      return {
          bookLists:[],
        swiperOption: {
          slidesPerView: 3,
          slidesPerColumn: 2,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    },
    created() {
        this.getBook();
    },
    methods: {
        getBook(){
            let bird = 'https://bird.ioliu.cn/v2?url='
            let bookurl = `https://m.douban.com/rexxar/api/v2/subject_collection/book_fiction/items?start=0&count=20`
            axios.get(bird+bookurl).then((res)=>{
                // console.log(res);
                this.bookLists=res.data.subject_collection_items
            })
        },
        chooseBook(item){
            this.$router.push({
                name:'bookdetail',
                params:{
                    item
                }
            })
        }
    },
}
</script>
<style>
.bookpic{
    padding: 1.3rem 0.2rem;
    font-size: 0.3rem;
}
.swiper-container {
    /* height: auto!important; */
    height: 10.5rem;
    margin-left: auto;
    margin-right: auto;
  }
  .swiper-slide {
    height: 200px;
  }
  .bookimg img{
      width: 100%;
      /* height: 80%; */
  }
  .title{
      font-size: 0.3rem;
  }
  .bsubtitle{
    font-size: 0.1rem;
  }
</style>
