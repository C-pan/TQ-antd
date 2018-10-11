import Jsonp  from 'jsonp';
import Axios from 'axios'
import { Modal} from 'antd'
var mock ='https://www.easy-mock.com/mock/5ac88b60dc9d9d4f37716708/'
var baseApi ='https://smj.byteflyerits.com/'
export default class axios {
    static jsonp(options){
        return new Promise((resolve, reject) => {
            Jsonp(options.url, {
                param: 'callback'
            }, function (err, res) { 
                if(res.status=='success'){
                    resolve(res)
                }else{
                    reject(res.messsage)
                }
                
            })
        })
    }

    static ajax(options){
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        
        return new Promise((resolve, reject) => {
            Axios({ 
                url:options.url,
                method: options.method || 'get',
                baseURL: options.mock ?mock:'',
                timeout:5000,
                params: (options.data && options.data.params) || '' 
            }).then(res=>{
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                //  
                if(res.status=='200'){ 
                    if(res.data.status){
                        resolve(res.data)
                    }else{
                        Modal.error({
                            title: "提示",
                            content: res.data.msg||"数据请求失败1"
                        })
                    }
                }else{
                    reject(res.data)
                }

                
            }).catch(res=>{
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                Modal.error({
                    title: "提示",
                    content:"数据请求失败2"
                })
                reject(res.data)
            })
        })
        
    }
}