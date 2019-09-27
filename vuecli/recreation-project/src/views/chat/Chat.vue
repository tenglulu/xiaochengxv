<template>
    <div class="chatinfo">
        <div class="cbottom">
            <input type="text" v-model="cinfo" class="inp">
            <button @click="getChat">发送</button>
        </div>
<div v-for="item in canswer" :key="item.answer" class="mychat">
<div class="rightd">
    <span class="rightd_h">
        <img src="../../assets/img/WechatIMG3.jpeg" />
    </span>
    <div class="speech right" ng-class="speech left">
        {{item.question}}
    </div>
</div>
<div  class="leftd" >
    <span class="leftd_h">
        <img src="../../assets/img/WechatIMG1.jpeg" />
    </span>
    <div  class="speech left" ng-class="speech left">
        {{item.answer}}
    </div>
</div>
</div>

    </div>
</template>
<script>
import md5 from "blueimp-md5"
export default {
    data() {
        return {
            canswer:[],
            cinfo:"",
        }
    },
    created() {
        
    },
    methods:{
        getSign(params){
           let arr=Object.keys(params).sort();
           let str="";
           for(let i=0;i<arr.length;i++){
                str+=arr[i]+"="+encodeURI(params[arr[i]])+"&";
           }
            str+="app_key=dEniWUSlkuUS5msT"
            str = md5(str).toString().toUpperCase();
            return str
        },
        getTimestamp(){
            let timer = new Date();
            timer=Date.parse(timer);
            timer = timer.toString().substr(0,10)
            return timer;
        },
        getNoncestr(){
            let str = Math.random().toString(36);
            return str.substr(2);
            
        },
        getChat(){
            let birdapi = 'https://bird.ioliu.cn/v2?url='
            let chatapi = `https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat`
            let params={
                app_id:"2119588149",
                time_stamp:this.getTimestamp(),
                nonce_str:this.getNoncestr(),
                session:"10000",
                question:this.cinfo,
            }
            params.sign = this.getSign(params);
            console.log(params);
            axios.get(birdapi+chatapi,{
                params
            }).then((res)=>{
            console.log(res);
            this.canswer.push({
                    answer:res.data.data.answer,
                    question:this.cinfo
                })
        })
        }
        
    }
}
</script>
<style>
.chatinfo{
    padding: 1.2rem 0;
    font-size: 0.2rem;
}
.inp{
    width: 85%;
    height: 0.5rem;
    border: 1px solid black;
    
}
button{
    margin-left:  0.1rem;
    background-color: rgba(128, 128, 128, 0.007);
}
.cbottom{
    margin:  0 0.3rem;
    width: 100%;
   position: fixed;
   bottom: 1.2rem;
}
.mychat{
    padding-bottom: 2rem;
}

div.speech {
    float: left;
    margin: 10px 0;
    padding: 8px;
    table-layout: fixed;
    word-break: break-all;
    position: relative;
    background: -webkit-gradient( linear, 50% 0%, 50% 100%, from(#ffffff), color-stop(0.1, #ececec), color-stop(0.5, #dbdbdb), color-stop(0.9, #dcdcdc), to(#8c8c8c) );
    border: 1px solid #989898;
    border-radius: 8px;
}
div.speech:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 15px;
    top: -20px;
    border: 10px solid;
    border-color: transparent transparent #989898 transparent;
}
div.speech:after {
 content: '';
 position: absolute;
 width: 0;
 height: 0;
 left: 17px;
 top: -16px;
 border: 8px solid;
 border-color: transparent transparent #ffffff transparent;
}
div.speech.right {
 display: inline-block;
 box-shadow: -2px 2px 5px #CCC;
 margin-right: 10px;
 max-width: 75%;
 /* float: right; */
 background: -webkit-gradient( linear, 50% 0%, 50% 100%, from(#e4ffa7), color-stop(0.1, #bced50), color-stop(0.4, #aed943), color-stop(0.8, #a7d143), to(#99BF40) );
}
div.speech.right:before {
 content: '';
 position: absolute;
 width: 0;
 height: 0;
 top: 9px;
 bottom: auto;
 left: auto;
 right: -10px;
 border-width: 9px 0 9px 10px;
 border-color: transparent #989898;
}
div.speech.right:after {
 content: '';
 position: absolute;
 width: 0;
 height: 0;
 top: 10px;
 bottom: auto;
 left: auto;
 right: -8px;
 border-width: 8px 0 8px 9px;
 border-color: transparent #bced50;
}
div .left {
 display: inline-block;
 box-shadow: 2px 2px 2px #CCCCCC;
 margin-left: 10px;
 max-width: 75%;
 position: relative;
 background: -webkit-gradient( linear, 50% 0%, 50% 100%, from(#ffffff), color-stop(0.1, #eae8e8), color-stop(0.4, #E3E3E3), color-stop(0.8, #DFDFDF), to(#D9D9D9) );
}
div .left:before {
 content: '';
 position: absolute;
 width: 0;
 height: 0;
 top: 9px;
 bottom: auto;
 left: -10px;
 border-width: 9px 10px 9px 0;
 border-color: transparent #989898;
}
div .left:after {
 content: '';
 position: absolute;
 width: 0;
 height: 0;
 top: 10px;
 bottom: auto;
 left: -8px;
 border-width: 8px 9px 8px 0;
 border-color: transparent #eae8e8;
}
.leftimg {
 float: left;
 margin-top: 10px;
}
.rightimg {
 float: right;
 margin-top: 10px;
}
.leftd {
 clear: both;
 float: left;
 margin-left: 10px;
}
.rightd {
 clear: both;
 float: right;
 margin-right: 10px;
}
.leftd_h{
 width: 39px;
 height: 39px;
 border-radius: 100%;
 display: block;
 float: left;
 overflow: hidden;
}
 
.leftd_h img{
 display: block;
 width: 100%;
 height: auto;
}
.rightd_h{
 width: 39px;
 height: 39px;
 border-radius: 100%;
 display: block;
 float: right;
 overflow: hidden;
}
 
.rightd_h img{
 display: block;
 width: 100%;
 height: auto;
}
</style>
