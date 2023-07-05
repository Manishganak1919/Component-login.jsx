// api notification 
export const API_NOTIFICATION_MESSAGES = {
  loading:{
    title:'loading.......',
    message:'data is being loaded, please wait'
  },
  success:{
    title:'Success',
    message:'data successfully loaded'
  },
  responseFailure:{
    title:'Error',
    message:'An error occured while fectching response from the server.please try again'
  },
  requestFailure:{
    title:'Errror',
    message:'An error occured while parsing the request data'
  },
  networkError:{
    title:'Error',
    message:'Please check internet connectivity and try again latetr'
  } 
}

// API SERVICE CALLL IN api.js

export const SERVICE_URLS = {
  userSignup:{
    url:'/signup',
    method:'POST',
  },
  /***Now api is ready for loginUser function() in login component */
  userLogin:{
    url:'/login',
    method:'POST',
  },
  uploadFile:{
    url:'/file/upload',
    method:'POST'
  },
  createPost:{
    url:'create',
    method:'POST'
  },
  getAllPosts:{
    url:'/posts',
    method:'GET',
    params: true
  },
  getPostById: { 
    url: 'post', 
    method: 'GET', 
    query: true 
  }
}