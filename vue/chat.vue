<template>
    <div class="chatinfo">
        <input type="text" v-model="cinfo">
        <button @click="getChat">发送</button>
    </div>
</template>
<script>
import md5 from "blueimp-md5"
export default {
    data() {
        return {
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
            str+="app_key=LLk9cAuteuM1CHLz"
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
                app_id:"2119555443",
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

        })
        }
        
    }
}
</script>
<style>
.chatinfo{
    padding: 1rem 0;
}
</style>
