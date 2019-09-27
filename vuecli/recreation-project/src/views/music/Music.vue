<template>
<div v-if="!isShow" class="loading">
  <img src="../../assets/img/timg.gif" alt="">
</div>
  <div class="music" v-else>


    <div class="mucon">
<div class="playli" v-show="lishow">
  <ul>
    <li v-for="(item) in songList" :key="item.id" class="listsli" @click="chooseLists(item.id)">
      <div>
        <img :src="item.coverImgUrl" alt="">
      </div>
      <div class="listsname">{{item.name}}</div>
      <div></div>
    </li>
  </ul>
</div>
      <div class="playtable" v-show="tableshow" >
<div id="app" class="player">
        <aplayer ref="" :audio="audio" :lrcType="0" />
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>歌曲标题</th>
            <th>歌手</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in musicList" :key="item.id" class="mulist" @click="muPlay(index)">
            <th>{{index+1}}</th>
            <th>{{item.name}}</th>
            <th>{{item.ar[0].name}}</th>
          </tr>
        </tbody>
      </table>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lishow:true,
      tableshow:false,
      songList:[],
      isShow:false,
      musicList:[],
      audio: {
        name: '',
        artist: '',
        url: '',
        cover: '', // prettier-ignore
        lrc: '',
      },
    };
  },
  created(liid) {
        // if(liid){
        // this.getMusic();
        // }
      // this.getMusic();
        this.getSonglist();
    },
  methods: {
    getSonglist(){
      let songurl='http://musicapi.xiecheng.live/top/playlist'
      axios.get(songurl)
      .then((res)=>{
        // console.log(res.data.playlists[0].id);
        this.songList=res.data.playlists;
        this.isShow   = true;
      })
    },
    chooseLists(id){
      // console.log(id);
      this.getMusic(id);
      this.lishow=false;
      this.tableshow=true;
    },
    getMusic(id){
      // console.log(id);
      let musicurl='https://bird.ioliu.cn/netease/playlist?id='+id;
      axios.get(musicurl)
      .then((res)=>{
        // console.log(res);
        this.musicList=res.data.playlist.tracks;
        
      })
    },
     muPlay(index){
      // console.log(this.musicList[index].id);
      let smusic='https://bird.ioliu.cn/netease/song?id='+this.musicList[index].id;
      axios.get(smusic)
      .then((res)=>{
        // console.log(res.data.data.mp3.url);
        this.audio.name=res.data.data.name;
        this.audio.artist=res.data.data.ar[0].name;
        this.audio.cover=res.data.data.al.picUrl;
        this.audio.url=res.data.data.mp3.url;
        // this.$refs.aplayer.play();
      })
      
    },
  },
};
</script>
<style>
.mucon{
  padding: 1rem 0;
  z-index: 1;
}
/* .player{
  position: absolute;
  top: 0;
} */
thead{
  font-size: 0.4rem;
}
.mulist{
  font-size: 0.3rem
}
.mulist:nth-child(odd){
  background-color:rgba(211, 208, 208, 0.37);
}
table{
  border-collapse: collapse;
  width: 100%;
}
.loading{
  width: 100%;
  height: 700px;
  background-color: rgb(255,239,196);
}
.loading img{
  width: 100%;
  padding:3rem 0;
}

.listsname{
  font-size: 0.2rem;
  padding-bottom: 0.3rem;
}
.listsli{
  float: left;
  width: 50%;
  
 
  
}
.listsli img{
  width: 100%;
  /* padding: 0 0.1rem; */
}
.playli{
  padding: 0.2rem;
}
</style>
