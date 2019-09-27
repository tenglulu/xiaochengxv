<template>
  <div class="teacherInformation-background">
    <div class="teacherInformation-page">
      <section class="authorSidebar">
        <div class="teacher-picture">
          <div class="pic-content">
            <img :src="teacher_avatar" />
          </div>
        </div>
        <div class="teacher-name">
          <h1>
            {{teacher_name}}
            <span>
              <img src alt />
            </span>
          </h1>
          <h2>Pluralsight Author</h2>
        </div>
        <div class="teacher-follow">
          <button>Follow</button>
          <div class="followers-count">
            <span>803</span>
            Followers
          </div>
        </div>
        <div class="teacher-intro">{{teacher_intro}}</div>
        <a href class="teacher-more">Show more...</a>
        <ul class="teacher-link">
          <li>
            <a href>jonathanfimlls.com</a>
          </li>
          <li>
            <a href>Linkedln</a>
          </li>
        </ul>
      </section>
      <div class="authorCourse">
        <div class="course-summary">
          <div class="summary-box">
            <h3>编写内容</h3>
            <div class="summary-count">9</div>
            <div class="countlabel">天</div>
          </div>
          <div class="summary-box">
            <h3>总评分</h3>
            <div class="summary-count">1,633</div>
          </div>
          <div class="summary-box">
            <h3>平均内容分级</h3>
            <div class="summary-count">4.5</div>
          </div>
        </div>
        <div class="courseList">
          <h2 class="courstList-title">Content by {{teacher_name}}</h2>
          <div class="courseList-box">
            <ul class="courseList-boxUl">
              <li v-for="(item,index) in course_list" :key="index" class="courseList-boxLi">
                <a href>{{item.course_name}}</a>
                <div class="courseIntroduce">
                  <div>
                    <div class="crouse-icon">
                      <span class="iconfont icon-iconfontplay2"></span>
                    </div>
                    <div>Course</div>
                  </div>
                  <div class="spacing">.</div>
                  <div>Beginner</div>
                  <div class="spacing">.</div>
                  <div>{{item.course_time}}</div>
                  <div class="spacing">.</div>
                  <div>{{item.course_create_date}}</div>
                  <div class="spacing">.</div>
                  <div class="score-star">
                    <svg
                      role="img"
                      aria-label="star fill icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M7.71590761,13.8522772 L2.25298114,9.9052852 C2.0291483,9.74356485 1.97879619,9.43101223 2.14051654,9.2071794 C2.23452325,9.07706721 2.38528246,9 2.54580174,9 L9.32999992,9 L11.5259342,2.42042174 C11.6133563,2.15848284 11.8965694,2.01700903 12.1585083,2.10443114 C12.3076212,2.15419757 12.4246481,2.2711924 12.4744554,2.42029163 L14.6724396,9 L21.4541983,9 C21.7303406,9 21.9541983,9.22385763 21.9541983,9.5 C21.9541983,9.66051929 21.877131,9.81127849 21.7470189,9.9052852 L16.2840924,13.8522772 L18.5094075,20.5282225 C18.5967314,20.7901941 18.4551514,21.0733541 18.1931797,21.160678 C18.0405447,21.2115563 17.8727519,21.1858764 17.7423206,21.091676 L12.0021534,16.9459997 L6.25731585,21.0924971 C6.03340576,21.2541105 5.72087724,21.203609 5.55926386,20.9796989 C5.46513169,20.8492818 5.43948525,20.6815443 5.49034729,20.5289581 L7.71590761,13.8522772 Z"
                      />
                    </svg>
                  </div>
                  <div class="score-star">
                    <svg
                      role="img"
                      aria-label="star fill icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M7.71590761,13.8522772 L2.25298114,9.9052852 C2.0291483,9.74356485 1.97879619,9.43101223 2.14051654,9.2071794 C2.23452325,9.07706721 2.38528246,9 2.54580174,9 L9.32999992,9 L11.5259342,2.42042174 C11.6133563,2.15848284 11.8965694,2.01700903 12.1585083,2.10443114 C12.3076212,2.15419757 12.4246481,2.2711924 12.4744554,2.42029163 L14.6724396,9 L21.4541983,9 C21.7303406,9 21.9541983,9.22385763 21.9541983,9.5 C21.9541983,9.66051929 21.877131,9.81127849 21.7470189,9.9052852 L16.2840924,13.8522772 L18.5094075,20.5282225 C18.5967314,20.7901941 18.4551514,21.0733541 18.1931797,21.160678 C18.0405447,21.2115563 17.8727519,21.1858764 17.7423206,21.091676 L12.0021534,16.9459997 L6.25731585,21.0924971 C6.03340576,21.2541105 5.72087724,21.203609 5.55926386,20.9796989 C5.46513169,20.8492818 5.43948525,20.6815443 5.49034729,20.5289581 L7.71590761,13.8522772 Z"
                      />
                    </svg>
                  </div>
                  <div class="score-star">
                    <svg
                      role="img"
                      aria-label="star fill icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M7.71590761,13.8522772 L2.25298114,9.9052852 C2.0291483,9.74356485 1.97879619,9.43101223 2.14051654,9.2071794 C2.23452325,9.07706721 2.38528246,9 2.54580174,9 L9.32999992,9 L11.5259342,2.42042174 C11.6133563,2.15848284 11.8965694,2.01700903 12.1585083,2.10443114 C12.3076212,2.15419757 12.4246481,2.2711924 12.4744554,2.42029163 L14.6724396,9 L21.4541983,9 C21.7303406,9 21.9541983,9.22385763 21.9541983,9.5 C21.9541983,9.66051929 21.877131,9.81127849 21.7470189,9.9052852 L16.2840924,13.8522772 L18.5094075,20.5282225 C18.5967314,20.7901941 18.4551514,21.0733541 18.1931797,21.160678 C18.0405447,21.2115563 17.8727519,21.1858764 17.7423206,21.091676 L12.0021534,16.9459997 L6.25731585,21.0924971 C6.03340576,21.2541105 5.72087724,21.203609 5.55926386,20.9796989 C5.46513169,20.8492818 5.43948525,20.6815443 5.49034729,20.5289581 L7.71590761,13.8522772 Z"
                      />
                    </svg>
                  </div>
                  <div class="score-star">
                    <svg
                      role="img"
                      aria-label="star fill icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M7.71590761,13.8522772 L2.25298114,9.9052852 C2.0291483,9.74356485 1.97879619,9.43101223 2.14051654,9.2071794 C2.23452325,9.07706721 2.38528246,9 2.54580174,9 L9.32999992,9 L11.5259342,2.42042174 C11.6133563,2.15848284 11.8965694,2.01700903 12.1585083,2.10443114 C12.3076212,2.15419757 12.4246481,2.2711924 12.4744554,2.42029163 L14.6724396,9 L21.4541983,9 C21.7303406,9 21.9541983,9.22385763 21.9541983,9.5 C21.9541983,9.66051929 21.877131,9.81127849 21.7470189,9.9052852 L16.2840924,13.8522772 L18.5094075,20.5282225 C18.5967314,20.7901941 18.4551514,21.0733541 18.1931797,21.160678 C18.0405447,21.2115563 17.8727519,21.1858764 17.7423206,21.091676 L12.0021534,16.9459997 L6.25731585,21.0924971 C6.03340576,21.2541105 5.72087724,21.203609 5.55926386,20.9796989 C5.46513169,20.8492818 5.43948525,20.6815443 5.49034729,20.5289581 L7.71590761,13.8522772 Z"
                      />
                    </svg>
                  </div>
                  <div class="score-star">
                    <svg
                      role="img"
                      aria-label="star fill icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M7.71590761,13.8522772 L2.25298114,9.9052852 C2.0291483,9.74356485 1.97879619,9.43101223 2.14051654,9.2071794 C2.23452325,9.07706721 2.38528246,9 2.54580174,9 L9.32999992,9 L11.5259342,2.42042174 C11.6133563,2.15848284 11.8965694,2.01700903 12.1585083,2.10443114 C12.3076212,2.15419757 12.4246481,2.2711924 12.4744554,2.42029163 L14.6724396,9 L21.4541983,9 C21.7303406,9 21.9541983,9.22385763 21.9541983,9.5 C21.9541983,9.66051929 21.877131,9.81127849 21.7470189,9.9052852 L16.2840924,13.8522772 L18.5094075,20.5282225 C18.5967314,20.7901941 18.4551514,21.0733541 18.1931797,21.160678 C18.0405447,21.2115563 17.8727519,21.1858764 17.7423206,21.091676 L12.0021534,16.9459997 L6.25731585,21.0924971 C6.03340576,21.2541105 5.72087724,21.203609 5.55926386,20.9796989 C5.46513169,20.8492818 5.43948525,20.6815443 5.49034729,20.5289581 L7.71590761,13.8522772 Z"
                      />
                    </svg>
                  </div>
                  <div class="course_score">{{item.course_score}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      teacher_avatar:
        "https://pluralsight.imgix.net/author/lg/jonathan-mills-v2.jpg",
      teacher_name: "Jonathan Mills",
      teacher_intro:
        "Jonathan is a Pluralsight Author, Technology Advisor, and Business Leader. As a member of the Chief Digital Advisory team at World Wide Technology, Jonathan is able to leverage his unique experiences and skills to drive digital transformation for his clients. As a dedicated developer community...",
      course_list: [
        {
          course_name: "RESTful Web Servies with Node.js and Express",
          course_time: "2hr2m",
          course_create_date: "Jan 24,2019",
          course_id: "1",
          course_score: "(68)" //评分
        },
        {
          course_name: "RESTful Web Servies with Node.js and Express",
          course_time: "2hr2m",
          course_create_date: "Jan 24,2019",
          course_id: "",
          course_score: "" //评分
        },
        {
          course_name: "RESTful Web Servies with Node.js and Express",
          course_time: "2hr2m",
          course_create_date: "Jan 24,2019",
          course_id: "",
          course_score: "" //评分
        },
        {
          course_name: "RESTful Web Servies with Node.js and Express",
          course_time: "2hr2m",
          course_create_date: "Jan 24,2019",
          course_id: "",
          course_score: "" //评分
        },
        {
          course_name: "RESTful Web Servies with Node.js and Express",
          course_time: "2hr2m",
          course_create_date: "Jan 24,2019",
          course_id: "",
          course_score: "" //评分
        },
        {
          course_name: "RESTful Web Servies with Node.js and Express",
          course_time: "2hr2m",
          course_create_date: "Jan 24,2019",
          course_id: "",
          course_score: "" //评分
        }
      ]
    };
  },
  created(){
    this.getdata()
  },
  methods:{
    getdata() {
      this.$request
        .post(
          "https://bird.ioliu.cn/v2?url=http://101.132.158.185:8081/teacher/information"
        )
        .then(function(res) {
          console.log(res.data);
          // handle success
          if (res.data.errno * 1 === 0) {
            // 处理成功
            // res.data.data
          } else {
            alert(errsmg);
            // 处理其他错误码的情况
          }
        })
        .catch(function(err) {
          // handle error
          // alert('服务器错误请稍后重试。。。')
        });
    }
  }
};
</script>
<style >
.course_score {
  margin-left: 4px;
  line-height: 20px;
}
.score-star svg {
  fill: rgb(54, 54, 54);
  display: inline-block;
  height: 16px;
  width: 16px;
}
.score-star {
  line-height: 17px;
}
.teacherInformation-background {
  background-color: #181818;
  box-sizing: border-box;
  text-size-adjust: 100%;
  line-height: 1.71429;
}
.crouse-icon {
  display: inline-block;
  margin-right: 8px;
}
.crouse-icon span {
  fill: currentcolor;

  font-size: 13px;
}
.spacing {
  margin: 0 8px;
}
.courseIntroduce div {
  float: left;
}
.courseIntroduce::after {
  content: "";
  display: block;
  clear: both;
}
.courseIntroduce {
  color: #aaaaaa;
  font-size: 14px;
  margin-top: 5px;
}
.courseList-boxLi a {
  font-size: 16px;
  font-weight: normal;
  color: white !important;
  margin-right: 30px;
}
.courseList-boxLi {
  padding: 20px 0;
  border-bottom: 1px solid #181818;
}
.courseList-boxUl {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: start;
}
.courseList-box {
  padding: 0px 24px 16px 24px;
  background-color: #222;
}
.courstList-title {
  text-align: start;
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: 300;
}
.authorCourse {
  padding: 24px 24px 24px 8px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 300px);
  float: left;
}
.course-summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  min-height: 178px;
}
.course-summary .summary-box {
  border-left: 1px solid #5b5b5b;
  flex: 1;
  text-align: start;
  padding: 0 24px;
}
.course-summary h3{
  color: #9b9b9b;
  font-size: 17px;
  margin-bottom: 24px;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 18px;
  line-height: 1;
}
.countlabel{
  color: #626262;
    font-weight: 550;
    margin: 2px 0;
    line-height: 1;
}
.summary-count {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
}
.course-summary p {
  color: #626262;
  font-weight: 500;
  margin: 2px 0;
  line-height: 1;
}
.teacher-link {
  margin-top: 48px;
  text-align: start;
}
.teacher-link a {
  color: #ffffff !important;
}
.teacher-more {
  text-decoration: none;
  color: #f96816;
  position: absolute;
  left: 24px;
  display: block;
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 300;
}
.teacher-intro {
  font-size: 15.84px;
  font-weight: 450;
  line-height: 1.5;
  margin: 0 0 8px;
  text-align: start;
}
.teacher-follow {
  margin-bottom: 24px;
  position: relative;
  height: 72px;
  width: 150px;
}
.teacher-follow button {
  margin: 0 0 8px;
  width: 130px;
  height: 40px;
  color: #fff;
  font-weight: 600;
  background-color: #ff7b39;
  position: absolute;
  left: 0;
}
.followers-count {
  display: block;
  font-size: 15.84px;
  position: absolute;
  left: 0;
  bottom: 0;
}
.followers-count span {
  font-weight: 600;
}
.teacher-name {
  margin-bottom: 16px;
}
.teacher-name h1 {
  font-size: 25px;
  margin-bottom: 2px;
  font-weight: 100;
  line-height: 1.1;
  text-align: start;
}
.teacher-name h2 {
  font-size: 15.84px;
  text-align: start;
}
.teacherInformation-page {
  width: 1440px;
  height: 1500px;
  margin-top: 64px;
  color: #fff;
}
.authorSidebar {
  font-weight: 200;
  flex: 0 0 300px;
  width: 300px;
  padding: 24px 16px 24px 24px;
  color: #fff;
  height: 1139px;
  float: left;
}

.teacher-picture {
  margin-bottom: 16px;
  position: relative;
  height: 160px;
}
.pic-content {
  display: inline-block;
  text-align: center;
  width: 160px;
  height: 160px;
  font-size: 30px;
  overflow: hidden;
  border-radius: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
.pic-content img {
  max-width: 100%;
  vertical-align: middle;
}
</style>