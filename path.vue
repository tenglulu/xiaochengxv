<template> 
  <div class="pathbackground">
    <div class="pathPage">
    <h1 class="pathsTop" v-if="mypath_list.length">我的学习路径</h1>
    <section class="pathsMiddle">
      <ul class="clear">
        <li class="pm-box" v-for="(item,index) in mypath_list" :key="index">
          <div class="pm-boxcontent">
            <a href="###" class="boxcontent-top" @click="goPathdetail(item.pathId)">
              <!-- <div class="path-picture" v-bind:style="{'background-image': 'url(' + item.pathImg + ')'}"></div> -->
              <div class="path-picture" >
                <img :src="item.pathImg" alt="">
              </div>
              <h2 class="path-name">{{item.pathName}}</h2>
              <p class="pathtime">
                <span class="pathtime-left">
                  <strong>{{item.courseCount}}</strong>
                  课时
                </span>
                <span>
                  <strong>{{item.courseTime}}</strong>
                  小时
                </span>
              </p>
            </a>
            <div class="boxcontent-middle"></div>
            <div class="boxcontent-bottom">
              <p class="bb-top" v-show="false">
                <strong>1%</strong>
                <span>Watched</span>
              </p>
              <p class="bb-bottom" >
                <a href>获取你的技能</a>
              </p>
              <div class="skill-picture">
              <div class="bb-picture"></div>
              </div>
              
            </div>
          </div>
        </li>
      </ul>
    </section>
    <div class="pathsBottom">
      <div class="pb-title">
        <h1>学习路径</h1>
        <ul>
          <li
            v-bind:class="navActive==index?'isActive':''"
            v-for="(item,index) in titleList"
            :key="index"
            @click="conrtolTabbar(index,item)"
          >
            <a class="navLink" href="###">{{item}}</a>
          </li>
        </ul>
        <form class="pb-form" v-show="false">
          <label>查找学习路径</label>
          <input type="text" v-model="searchPathname" @keyup="searchPath"/>
        </form>
      </div>
      <section class="pb-content">
        <ul>
          <li v-for="(item,index) in theshow" :key="index">
            <a href="###" class="pb-content-link" @click="goPathdetail(item.pathId)">
              <img :src="item.pathImg" class="pb-content-picture" />

              <div class="pb-content-name">
                <h2>{{item.pathName}}</h2>
                <div class="pb-content-introduce">
                  <p>
                    <span>{{item.courseCount}}</span>
                    课时
                  </p>
                  <p>
                    <span>{{item.courseTime}}</span>
                    小时
                  </p>
                  <span class="skill-svg">
                    <svg viewBox="0 0 512 512" aria-label="Skill IQ" class="_3AaTpHcO"><title>Skill IQ</title><defs><linearGradient x1="23.812%" y1="22.445%" x2="100%" y2="100%" id="icon-datacamp-linearGradient-10"><stop stop-color="#F05A28" offset="0%"></stop><stop stop-color="#E80A89" offset="100%"></stop></linearGradient></defs><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill-rule="nonzero"><path d="M512,256 L512,512 L256,512 C114.615104,512 0,397.384896 0,256 C0,114.615104 114.615104,0 256,0 C397.384896,0 512,114.615104 512,256 Z" fill="url(#icon-datacamp-linearGradient-10)"></path><circle fill="#222222" cx="260.736" cy="260.736" r="132.736"></circle></g></g></svg>
                    获取你的技能
                  </span>
                  <div class="pb-content-morebox">
                    <span class="pb-content-more"><svg class="spot" 
                    @mouseover="conrtolSpot(index,item)"
                    @mouseout="removeSpot(index,item)"
                    v-bind:class="spotActive==index?'isspotActive':'nospotActive'"
                     viewBox="0 0 512 512" role="img" aria-label="More"><title>More</title><g class="hn90O8sm GNRz_V09"><g><path d="M68.3,193.7C34,193.7,6,221.6,6,256c0,34.4,28,62.3,62.3,62.3c34.4,0,62.3-28,62.3-62.3S102.6,193.7,68.3,193.7z"></path><path d="M256,193.7c-34.3,0-62.3,28-62.3,62.3c0,34.3,27.9,62.3,62.3,62.3c34.4,0,62.3-28,62.3-62.3 C318.3,221.7,290.3,193.7,256,193.7z"></path><path d="M443.7,193.7c-34.3,0-62.3,28-62.3,62.3c0,34.3,27.9,62.3,62.3,62.3c34.3,0,62.3-28,62.3-62.3 C506,221.7,478,193.7,443.7,193.7z"></path></g></g></svg></span>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
  </div>
</template>
<script>
import {formatDate, setLevel} from '@/assets/js/common.js'
import { log } from "util";
export default {
  data() {
    return {
      mypath_list: [],
      titleList: ["All", "Development", "IT Ops", "Data"],
      navActive: 0,
      path_list: [],
      isShow: 0,
      theshow: [],
      searchPathname:"",
      spotActive:20000000
    };
  },
  created(){
    this.getPathsdata();
  },
  methods: {
    goPathdetail(id){
       this.$router.push({
              name:"pathdetail",
              params:{
                  id
              }
          })
    },
    conrtolTabbar(index, item) {
      this.theshow = [];
      console.log(item);
      let arr = [];
      this.navActive = index;
      if (item == 'All') {
        arr = this.path_list;
      } else {
        for (let i = 0; i < this.path_list.length; i++) {
          if (this.path_list[i].path_type == item) {
            console.log(i);
            arr.push(this.path_list[i]);
          }
        }
      }
      this.theshow = arr;
    },
    conrtolSpot(index){
      this.spotActive = index;
    },
    removeSpot(){
       this.spotActive = 2000000;
    },
    searchPath(){
       this.theshow = [];
      console.log(this.searchPathname);
      let narr=[];
       for(let i=0;i<this.path_list.length;i++){
                console.log(this.path_list[i].path_name,this.searchPathname);
                if(this.path_list[i].path_name.includes(this.searchPathname)){
                    narr.push(this.path_list[i])
                }
            }
            this.theshow = narr;
            
    },
    getPathsdata(){
      this.$post(
        "http://101.132.158.185:8082/path/getPathListApi",
        {
          token_id:1
        },
        {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhIiwidXNlcmlkIjoiNWQ1Y2I4ZWNkYWZlM2MzN2RjYjNlMzZkIiwiaWF0IjoxNTY2MzY2NDQyLCJleHAiOjIyNTc1NjY0NDJ9.ZB1nwIfxMceYNrZJucE6TfBGfFgTdSbG0cvrhDAq_dM"
          }
        }
      )
        .then((res)=> {
          // handle success
          if (res.errno == 101) {
            // 处理成功
            // res.data.data
            console.log(res)
            this.mypath_list=res.data.mypath_list;
            this.changeMycoursetime()
            this.path_list=res.data.path_list;
            this.changeCoursetime()
            this.theshow = this.path_list;
          } else {
            alert(errsmg);
            // 处理其他错误码的情况
          }
        })
        .catch(function(err) {
          // handle error
          // alert('服务器错误请稍后重试。。。')
        });
    },
    changeMycoursetime(){
      this.mypath_list.map(function(item){
          item.courseTime=formatDate(item.courseTime).substr(0, 1)
            })
    },
     changeCoursetime(){
      this.path_list.map(function(item){
          item.courseTime=formatDate(item.courseTime).substr(0, 1)
            })
    }
  }
};
</script>
<style scoped>
.skill-picture{
    height: 100%;
    width: 37%;
    padding: 0 5%;
    margin-right: -18px;
    margin-top: -8px;
    float: right;
}
.bb-picture{
  width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 50%;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODEiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGlkPSJiIiBkPSJNMCAwaDE2djEwSDB6Ii8+PHBhdGggZD0iTTE2IDIyYTIgMiAwIDEgMCAwLTQgMiAyIDAgMCAwIDAgNHoiIGlkPSJhIi8+PG1hc2sgaWQ9ImQiIG1hc2tDb250ZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBtYXNrVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiB4PSItMiIgeT0iLTIiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMiAxNmg4djhoLTh6Ii8+PHVzZSB4bGluazpocmVmPSIjYSIvPjwvbWFzaz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAyMCkiPjxtYXNrIGlkPSJjIiBmaWxsPSIjZmZmIj48dXNlIHhsaW5rOmhyZWY9IiNiIi8+PC9tYXNrPjxnIG9wYWNpdHk9Ii4zMDEiIG1hc2s9InVybCgjYykiIGZpbGw9IiNGRkQ1NDgiPjxwYXRoIGQ9Ik0xNy43MjguMDEydjkuNDAxSDIuNTY4bC0uNDIyLjAxMVMyLjEwNiA2Ljc4MyA1Ljc3IDQuMzhDOS40MzQgMS45NzYgMTUuOTM4LjQxNiAxNy40NTguMDcxbC4yNy0uMDU5eiIvPjwvZz48L2c+PGcgc3Ryb2tlLXdpZHRoPSIyIj48cGF0aCBkPSJNMS4xNTIgMjkuNGMwLS4wNjEtLjA0LTIuNTU2IDMuNjI0LTQuOTU5IDMuNjY0LTIuNDAzIDEwLjE2OC0zLjk2MyAxMS42ODgtNC4zMDhsLjI5LS4wNjMiIHN0cm9rZT0iI0ZGQzIwMCIvPjxwYXRoIGQ9Ik02NC44NCAxMC42MWwuMjgzLS4wNjdjMS4zNjctLjMyIDYuNzQxLTEuNTggMTAuNjEyLTMuNTg0IDQuMjUtMi4yIDQuMTMyLTUuMTg3IDQuMTMyLTUuNTg4IiBzdHJva2U9IiMyNkMxRTEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNi41NyAyMC4xMDZjMi4xNzQtLjQ3IDE2LjI1MS0zLjQ1NyAyNy4zMzQtNS4zNDMgMTEuODI4LTIuMDEyIDIwLjkzNy00LjE1MiAyMC45MzctNC4xNTIuMDUxLS4wMTQuMzk2LS4wODguMzk2LS4wODgiIHN0cm9rZT0iIzg2Q0UyMSIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAxKSI+PHVzZSBmaWxsPSIjMTgxODE4IiB4bGluazpocmVmPSIjYSIvPjx1c2Ugc3Ryb2tlPSIjRkZDMjAwIiBtYXNrPSJ1cmwoI2QpIiBzdHJva2Utd2lkdGg9IjQiIHhsaW5rOmhyZWY9IiNhIi8+PC9nPjwvZz48L3N2Zz4=")
}
.pb-content-morebox{
  margin-right: 5.5px;
    flex: 0;
    float: right;
}
.pb-content-more svg{
    width: 20px;
    height: 20px;
    color: #aaa;
    font-size: 14px;
    font-weight: 300;
    overflow: hidden;
    margin-top: -25px;
    /* margin: auto 0; */
    
}
.nospotActive{
  fill:#aaa;
}
.isspotActive{
  fill:#fff;
}
.skill-svg svg{
    flex: 1;
    color: #aaa;
    font-size: 14px;
    font-weight: 300;
    overflow: hidden;
    height: 13.44px;
    width: 13.44px;
}
.pathbackground{
  background-color: #181818;
  box-sizing: border-box;
  text-size-adjust: 100%;
  font-family: Gotham SSm A,Gotham SSm B,sans-serif;
  line-height: 1.71429;
  background-image: url()
}
.pb-content {
  margin: 0 0 0 -20px;
}
.pb-content li {
  width: 50%;
  display: inline-block;
  padding-left: 20px;
  vertical-align: top;
  margin-bottom: 20px;
}
.pb-content-link {
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
  background-color: #222;
  border-radius: 2px;
  height: 94px;
}
.pb-content-link:hover {
  text-decoration: none;
  background-color: #333;
}
.pb-content-picture {
  height: 85px;
  width: 85px;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: contain;
  padding: 5px;
}
.pb-content-name {
  flex: 1;
  padding: 20px 22.5px 20px 15px;
  min-width: 0;
}
.pb-content-name h2 {
  font-size: 20px;
  font-weight: 500;
  color: #efefef;
  margin-bottom: 0;
}
.pb-content-introduce {
  color: #aaa;
}
.pb-content-introduce p {
  display: inline-block;
  margin-right: 15px;
  font-size: 15px;
  font-weight: 300;
}
.pb-content-introduce p span {
  font-weight: 500;
  color: #efefef;
}
.isActive {
  border-bottom: 5px solid #ff7b39;
}
.pb-title {
  width: 100%;
  position: relative;
  display: flex;
  border-bottom: 1px solid #2d2d2d;
  margin-bottom: 17px;
  max-height: 54px;
}
.pb-form {
  position: absolute;
  right: 0px;
  width: 333.89px;
  height: 52px;
  margin-top: -17px;
}
.pb-form input {
  float: left;
  width: 333.89px;
  border: 1px solid #aaa;
  background-color: #181818;
  color: #f2f2f2;
}
.pb-form label {
  color: #f2f2f2;
  float: left;
  margin: 0;
}
.pb-title h1 {
  font-size: 26px;
  font-weight: 350;
  letter-spacing: -0.015em;
  color: #f2f2f2;
  padding-right: 65px;
}
.pb-title li {
  float: left;
  height: 53px;
}
.navLink {
  color: #aaa;
  line-height: 0px;
  padding: 6px 4px 18px;
  margin: 0 18px 0 5px;
  display: inline-block;
  font-size: 15px;
}
.navLink:hover {
  color: #fff;
  text-decoration: none;
}
.pathPage {
  margin-top: 64px;
  padding: 20px;
}
.pathsTop {
  font-size: 26px;
  font-weight: 350;
  letter-spacing: -0.015em;
  color: #f2f2f2;
  padding-right: 65px;
  text-align: start;
  margin-bottom: 24px;
  margin-top: 0;
}

.clear::after {
  content: "";
  display: block;
  clear: both;
}
.clear li:nth-child(4n){
  margin-right: 0;
}
.pm-box {
  display: flex;
  width: 335px;
  height: 268px;
  float: left;
  margin-right: 20px;
  margin-bottom: 20px;
}
.pm-boxcontent {
  color: #aaa;
  width: 335px;
  height: 268px;
  float: left;
}
.boxcontent-top {
  height: 72%;
  display: block;
  background-color: #222;
  padding: 8% 6%;
  text-decoration: none;
  color: #aaa;
}
.boxcontent-top:hover {
  text-decoration: none;
  color: #aaa;
}
.path-picture {
  height: 35.38px;
  width: 12%;
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-position-y: center;
  background-size: contain;
  margin-bottom: 4%;
}
.path-picture img{
  width: 35px;
  height:35px ;
}
.path-name {
  font-size: 19.4375px;
  color: #fff;
  font-weight: 530;
  line-height: 1.5em;
  margin: 0 0 4% 0;
  text-align: start;
}
.pathtime {
  /* font-size: 14.0476px; */
  text-align: start;
  /* font-weight: 300; */
}
.pathtime strong {
  color: #fff;
}
.pathtime-left {
  margin-right: 0.6em;
}

.boxcontent-middle {
  height: 0.8%;
  background-color: rgba(255, 255, 255, 0.3);
  display: block;
}
.boxcontent-bottom {
  height: 72.91px;
  background-color: #333;
  padding-top: 4%;
  padding-right: 6%;
  padding-left: 6%;
}
.bb-top {
  text-align: start;
}
.bb-top strong {
  color: #fff;
}
.bb-bottom a{
  margin-top: 10px;
}
.boxcontent-bottom :any-link {
  color: #ff7b39;
  text-align: start;
  text-decoration: none;
  float: left;
}
a:hover {
  text-decoration: none;
}
.bb-bottom {
  text-align: start;
}
.bb-bottom strong {
  color: #fff;
}
.bb-bottom span {
  color: #ffc800;
}
.pathsBottom {
  text-align: start;
}
</style>