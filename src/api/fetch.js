import axios from 'axios'
const service = axios.create({
  // baseURL:'/api',
  baseURL:'http://47.110.33.227:8280',
  timeout:5000,
  withCredentials:true
})

service.interceptors.response.use(function(response) {
	if (response.data.errCode == 10100 || !localStorage.getItem('token')) {
			service({
				url: '/wsis-sso/user/login?username=zhangfan&password=123456',
				method: 'post',
				withCredentials: false,
			}).then((response) => {
				if(response.data.status == 400){
					alert("账号密码错误")
				}else{
					localStorage.setItem("token", response.data.data)
					setTimeout(function(){
						location.reload()
					},3000)
				}
			})
	}
	return response
}, function(error) {
	console.log(error)
})

service.interceptors.request.use(
  config => {
    if (localStorage.getItem("token")) {
      config.headers['access_token'] = localStorage.getItem("token")
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
