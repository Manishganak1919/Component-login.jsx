import axios from 'axios';
import { API_NOTIFICATION_MESSAGES ,SERVICE_URLS} from '../constants/config';
import { getAccessToken ,getType} from '../utils/common-utils';

const API_URL =`http://localhost:8000`;
const axiosInstance = axios.create({
  baseURL:API_URL,
  timeout:10000,
  headers:{
    "Content-Type":"application/json"
  }
})

/***  for request ***/
axiosInstance.interceptors.request.use(
  function(config) {
    if (config.TYPE.params) {
        config.params = config.TYPE.params
    } else if (config.TYPE.query) {
        config.url = config.url + '/' + config.TYPE.query;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
)
/*** for response****/
axiosInstance.interceptors.response.use(
  function (response){
    /*** stop global loader here***/
    return processResponse(response);
  },
  function (error){
    /*** stop global error here***/
    return Promise.reject(processError(error));

  }
)
/*** processResponse function ***/
const processResponse = (response)=>{
  if(response?.status === 200){
    return {isSuccess:true,data:response.data}
  }else{
    return{
      isFailure:true,
      status:response?.status,
      msg:response?.msg,
      code:response?.code
    }
  }
}
/**** process request function ****/
const  processError = async(error)=>{

  if(error.response){
    /**request from client is sucessfully but server responds other than 200 */
    console.log('Error in response:',error.toJSON())
    return{
      isError:true,
      msg:API_NOTIFICATION_MESSAGES.responseFailure,
      code:error.response.status
    }

  }else if(error.request){
    /** request are made but no respone from server***/
    console.log('Error in Request:',error.toJSON())
    return{
      isError:true,
      msg:API_NOTIFICATION_MESSAGES.requestFailure,
      code:""
    }

  }else{
    /*** something happening error in frontend part***/
    console.log('Error in Network:',error.toJSON())
    return{
      isError:true,
      msg:API_NOTIFICATION_MESSAGES.networkError,
      code:""
    }
  }
}
// ab mere ko actual api create krni hai

const API = {};

for(const[key,value] of Object.entries(SERVICE_URLS)){
  API[key] = (body,showUploadProgress,showDownloadProgress)=>
    axiosInstance({
      method: value.method,
      url:value.url,
      data:body,
      responseType:value.responseType,
      headers:{
        authorization: getAccessToken()
      },
      TYPE: getType(value, body),
      onUploadProgress:function(progressEvent){
        if(showUploadProgress){
          let percentageCompleted = Math.round((progressEvent.loaded*100)/progressEvent.total)
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress:function(progressEvent){
        if(showDownloadProgress){
          let percentageCompleted = Math.round((progressEvent.loaded*100)/progressEvent.total)
          showDownloadProgress(percentageCompleted);
        }
      }

    })
}

export {API};