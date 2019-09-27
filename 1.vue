<template> 
  <div class="pathbackground">
    <div class="pathPage">
    <h1 class="pathsTop">My Paths</h1>
    <section class="pathsMiddle">
      <ul class="clear">
        <li class="pm-box" v-for="(item,index) in mypath_list" :key="index">
          <div class="pm-boxcontent">
            <a href class="boxcontent-top">
              <div class="path-picture" v-bind:style="{backgroundImage:item.path_img}"></div>
              <h2 class="path-name">{{item.path_name}}</h2>
              <p class="pathtime">
                <span class="pathtime-left">
                  <strong>{{item.course_count}}</strong>
                  Course
                </span>
                <span>
                  <strong>{{item.course_time}}</strong>
                  Hours
                </span>
              </p>
            </a>
            <div class="boxcontent-middle"></div>
            <div class="boxcontent-bottom">
              <p class="bb-top">
                <strong>1%</strong>
                <span>Watched</span>
              </p>
              <p>
                <a href>Get your Skill IQ</a>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <div class="pathsBottom">
      <div class="pb-title">
        <h1>Paths</h1>
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
          <label>Filter Paths</label>
          <input type="text" v-model="searchPathname" @keyup="searchPath"/>
        </form>
      </div>
      <section class="pb-content">
        <ul>
          <li v-for="(item,index) in theshow" :key="index">
            <a href class="pb-content-link">
              <img :src="item.path_url" class="pb-content-picture" />

              <div class="pb-content-name">
                <h2>{{item.path_name}}</h2>
                <div class="pb-content-introduce">
                  <p>
                    <span>{{item.course_count}}</span>
                    Courses
                  </p>
                  <p>
                    <span>{{item.course_time}}</span>
                    Hours
                  </p>
                  <span></span>
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
import { log } from "util";
export default {
  data() {
    return {
      mypath_list: [
        {
          path_id: 111,
          path_img:
            'url("https://pluralsight.imgix.net/paths/path-icons/javascript-36f5949a45.png?trim=color&w=75")',
          path_name: "JavaScript",
          course_count: "8",
          course_time: "21",
          skill_score: "",
          skill_id: ""
        },
        {
          path_id: 112,
          path_img:
            'url("https://pluralsight.imgix.net/paths/path-icons/html5-7ac65c8ec0.png?trim=color&w=75")',
          path_name: "HTML5",
          course_count: "9",
          course_time: "27",
          skill_score: "",
          skill_id: ""
        },
        {
          path_id: 111,
          path_img:
            'url("https://pluralsight.imgix.net/paths/path-icons/javascript-36f5949a45.png?trim=color&w=75")',
          path_name: "JavaScript",
          course_count: "8",
          course_time: "21",
          skill_score: "",
          skill_id: ""
        },
        {
          path_id: 112,
          path_img:
            'url("https://pluralsight.imgix.net/paths/path-icons/html5-7ac65c8ec0.png?trim=color&w=75")',
          path_name: "HTML5",
          course_count: "9",
          course_time: "27",
          skill_score: "",
          skill_id: ""
        },
        
      ],
      titleList: ["All", "Development", "IT Ops", "Data"],
      navActive: 0,
      path_list: [
        {
          path_id: 1,
          path_name: "AWS Databases",
          path_url:
            "https://pluralsight2.imgix.net/paths/images/aws-certified-devops-engineer-25d912e3da.png?w=140",
          course_count: "",
          course_time: "",
          path_type: "Development"
        },
        {
          path_id: 2,
          path_name: ".Net Develoment on Microsoft",
          path_url:
            "https://pluralsight2.imgix.net/paths/images/vmware-a9cdbeb3ff.png?w=140",
          course_count: "",
          course_time: "",
          path_type: "Development"
        },
        {
          path_id: 3,
          path_name: "3ds",
          path_url:
            "https://pluralsight2.imgix.net/paths/images/group-policy-administration-ee0dacafe8.png?w=140",
          course_count: "",
          course_time: "",
          path_type: "IT Ops"
        },
        {
          path_id: 4,
          path_name: "Adobe Campaign",
          path_url:
            "https://pluralsight.imgix.net/paths/path-icons/3dsmax-008c85cd63.png?w=140",
          course_count: "",
          course_time: "",
          path_type: "IT Ops"
        },
        {
          path_id: 5,
          path_name: "Adobe Campaign",
          path_url:
            "https://pluralsight.imgix.net/paths/path-icons/3dsmax-008c85cd63.png?w=140",
          course_count: "",
          course_time: "",
          path_type: "IT Ops"
        },
        {
          path_id: 6,
          path_name: ".Net Develoment on Microsoft",
          path_url:
            "https://pluralsight2.imgix.net/paths/images/vmware-a9cdbeb3ff.png?w=140",
          course_count: "",
          course_time: "",
          path_type: "IT Ops"
        },
        {
          path_id: 7,
          path_name: ".Net Develoment on Microsoft",
          path_url:
            "https://pluralsight2.imgix.net/paths/images/vmware-a9cdbeb3ff.png?w=140",
          course_count: "",
          course_time: "",
          path_type: "Data"
        },
        {
          path_id: 8,
          path_name: "3ds",
          path_url:
            "https://pluralsight2.imgix.net/paths/images/group-policy-administration-ee0dacafe8.png?w=140",
          course_count: "",
          course_time: "",
          path_type: "Data"
        }
      ],
      isShow: 0,
      theshow: [],
      searchPathname:""
    };
  },
  created(){
    this.theshow = this.path_list;
  },
  methods: {
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
            
    }
  }
};
</script>
<style >
.pathbackground{
  background-color: #181818;
  box-sizing: border-box;
  text-size-adjust: 100%;
  font-family: Gotham SSm A,Gotham SSm B,sans-serif;
  line-height: 1.71429;
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