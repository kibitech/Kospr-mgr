//************************************************
//                 MAIN CONTROLLER
//************************************************
var url           = 'http://localhost:4000';
var url_e_d       = '';
var photo_url     = '';

app.controller('mainController', function($scope,$http,$route,$rootScope,$location,$anchorScroll,$compile,$sce,$timeout,fileUpload) {
  $scope.height_screen = screen.height;
  $scope.height_screen_home = screen.height - (screen.height * 0.21);
  $scope.height_screen_menu = screen.height - (screen.height * 0.24);
  $scope.height_screen_dashboard = screen.height - (screen.height * 0.24);    
  
  $scope.dashboard = [{name:"Security",url:"/#/security",icon:"fa-shield"},{name:"Branches",url:"/#/branches",icon:"fa-map-marker"}]

  //Test
  $http.get(url+'/users').then(successCallback_, errorCallback_);
    function successCallback_(wuser){
      //console.log(wuser);          
    }
    function errorCallback_(error){
        //error code
    }        
  //

  $scope.logout = function() {
    $scope.loading = true;
    $(".loading").fadeIn("300");
    location.href = '#/';
    localStorage.removeItem('signed_in'); 
    $scope.loading = false;
    $(".loading").fadeOut("300");
    location.reload();
  };  

  $scope.username   = localStorage.getItem("user_name");
  $scope.user_id    = localStorage.getItem("user_id");
  $scope.user_img   = localStorage.getItem("user_img");
  $scope.rol        = localStorage.getItem("user_rol");
  $scope.apikey     = localStorage.getItem("apikey");
  var login_estado  = localStorage.getItem("signed_in");

  $rootScope.date_ = new Date();
  
  if(login_estado)
  {
    $scope.loged = true;    
  }
  else
  {
    $scope.loged = false;
  }      
  
  $scope.login_auto=function(user,pass)
  {
    //alert("autologin-"+user+'-'+pass);
    $scope.loading = true;
    $(".loading").fadeIn("300");  
    //
    $http.get(url+'/login/{"username":"'+username.toLowerCase()+'", "password":"'+pass+'"}').then(successCallback, errorCallback);
    function successCallback(res){
      //console.log("RESP",res.data)
      if(res.data.login == true)
      {        
        localStorage.setItem("signed_in", true);
        localStorage.setItem("user_id", res.data.user.id);
        localStorage.setItem("user_name", res.data.user.username);        
        localStorage.setItem("user_email", res.data.user.email);
        localStorage.setItem("user_rol", res.data.user.type);
        localStorage.setItem("apikey", res.data.user.token);
        data.user = "";
        data.password = "";
        $scope.loading = false;
        $(".loading").fadeOut("300");
        location.reload();              
      }
      else
      {
        alert("Wrong user");
      }
    }
    function errorCallback(error){
        //error code
    }
    //
  }

  //$http.defaults.Authorization = 'Bearer '+apikey;
  //Get token  
  /*$http.post(url+'/api/token/{"username":"admin","password":"admin"}').then(successCallback_, errorCallback_);
  function successCallback_(token){
    console.log(token.data.token);    
  }
  function errorCallback_(error){
      //error code
  } */
  
  //·················································/
  //················ S E R V I C E S ················/
  //·················································/  
  
  //Load image url dinamically 
  $rootScope.img_route = function(url)
  {
    return photo_url+url;
  }
  
  //Load image url dinamically 
  $rootScope.img_route_xk = function(url)
  {
    return employee_url+url;
  }
  
  //Decode URI encode 
  $rootScope.decode = function(val)
  {
     return decodeURIComponent(val);
  }
  
  //Encode URI 
  $rootScope.encode = function(val)
  {
    return encodeURIComponent(val);
  }

	//Upload
	
	//Set image to full view
  $rootScope.set_image = function(src)
  {		
    $rootScope.image_src = src		
  }
	
	//Set upload option
  $rootScope.set_upload_option = function(option,id,index,id2,index2)
  {
    $rootScope.upload_option = option;  
    if(option == "employee_photo")
    {
      $rootScope.upload_employee_id    = id;
      $rootScope.upload_employee_index = index;
    }    
  }
	
	//Get upload photo for preview image
  $rootScope.img_prev = function(input)
  {		
    if (input.files && input.files[0]) {
      $scope.reader = new FileReader();
			//Mejora de la versión.
      $scope.reader.onload = $scope.imageIsLoaded 
      $scope.reader.readAsDataURL(input.files[0]);
    }
		
  }
	
	//Mejora de la versión
	$scope.imageIsLoaded = function(e){
    $scope.$apply(function() {
        $scope.prev_src =e.target.result;
    });
	}
	
  
  //Clear photo selected
  $scope.prev_src_clr = function()
  {
    $scope.prev_src ='';
  }
	
	//Upload photo
  $rootScope.uploadFile = function(option){
    var file = this.myFile;
    var uploadUrl = url+"upload";
    var modal_opt = '#upload_photo';
    if(option=="employee_photo")
    {
      var data = JSON.stringify({apikey:apikey,option:"photo_employee",employee:$rootScope.upload_employee_id});
    }      
    fileUpload.uploadFileToUrl(file,data, uploadUrl).then(function(res) {
      if(res == false)
      {
        alert("You don't have allow to upload files.")
      }
      else
      {                        
        alert("Photo upload successfull!")
        if(option == "employee_photo")
        {   
					$rootScope.employees[$rootScope.upload_employee_index].img = res.path
        }        
        $scope.prev_src ='';
        $(modal_opt).modal('hide');
      }
    });
  };
	
	//Upload
});

//························································
//························································
//··                  LOGIN CONTROLLER                  ··
//························································
//························································
app.controller('loginController', function($scope,$http,$rootScope) {
  $scope.login = function(data)
  {
    var username     = data.user;
    var password  = data.password;  
    $scope.loading = true;
    $(".loading").fadeIn("300");
    //
    $http.get(url+'/login/{"username":"'+username.toLowerCase()+'", "password":"'+password+'"}').then(successCallback, errorCallback);
    function successCallback(res){
      //console.log("RESP",res.data.user)
      if(res.data.login == true)
      {        
        localStorage.setItem("signed_in", true);
        localStorage.setItem("user_id", res.data.user.id);
        localStorage.setItem("user_name", res.data.user.username);        
        localStorage.setItem("user_email", res.data.user.email);
        localStorage.setItem("user_rol", res.data.user.type);
        localStorage.setItem("apikey", res.data.user.token);        
        data.user = "";
        data.password = "";
        $scope.loading = false;
        $(".loading").fadeOut("300");
        location.reload();              
      }
      else
      {
        alert("Wrong user");
      }
    }
    function errorCallback(error){
        //error code
    }
    //    
  };
  
  $scope.login_auto=function(user,pass)
  {
    //alert("autologin-"+user+'-'+pass);
    $scope.loading = true;
    $(".loading").fadeIn("300");
    $http.get(url+'/login/{"username":"'+username.toLowerCase()+'", "password":"'+password+'"}').then(successCallback, errorCallback);
    function successCallback(res){
      //console.log("RESP",res.data)
      if(res.data.login == true)
      {        
        localStorage.setItem("signed_in", true);
        localStorage.setItem("user_id", res.data.user.id);
        localStorage.setItem("user_name", res.data.user.username);        
        localStorage.setItem("user_email", res.data.user.email);
        localStorage.setItem("user_rol", res.data.user.type);
        localStorage.setItem("apikey", res.data.user.token);
        data.user = "";
        data.password = "";
        $scope.loading = false;
        $(".loading").fadeOut("300");
        location.reload();              
      }
      else
      {
        alert("Wrong user");
      }
      function errorCallback(error){
          //error code
      }
    }
  }  
});

//························································
//························································
//··                DASHBOARD CONTROLLER                ··
//························································
//························································
app.controller('dashboardCtrl', function($scope, $http,$sce, $rootScope) {
  $scope.username   = localStorage.getItem("user_name");
  $scope.user_email = localStorage.getItem("user_email");
  $scope.user_rol   = localStorage.getItem("user_rol");
  $scope.user_id    = localStorage.getItem("user_id");  
  $scope.apikey     = localStorage.getItem("apikey");  

});

//························································
//························································
//··              SECURITY CONTROLLER                   ··
//························································
//························································
app.controller('securityCtrl', function($scope, $http, $routeParams, $rootScope, $sce, $timeout) {  
  $scope.username   = localStorage.getItem("user_name");
  $scope.user_email = localStorage.getItem("user_email");
  $scope.user_rol   = localStorage.getItem("user_rol");
  $scope.user_id    = localStorage.getItem("user_id");   
  $scope.apikey     = localStorage.getItem("apikey");    
  //Menu options
  $rootScope.security = [{name:"Users",icon:"fa-users",mode:"modal",modal:"users",add:true, add_title:"Add new user",add_modal:"add_user"},{name:"Branches",url:"/#/branches",icon:"fa-map-marker",mode:"link"}]

  //List Users
  $http.get(url+'/users').then(successCallback_, errorCallback_);
  function successCallback_(res){    
    $rootScope.users = res.data;         
  }
  function errorCallback_(error){
      //error code
  } 

  //List Users type
  $http.get(url+'/users/type').then(successCallback_type, errorCallback_type);
  function successCallback_type(res){    
    $rootScope.users_type = res.data;         
  }
  function errorCallback_type(error){
      //error code
  }  

  //Add user
  //http://localhost:4000/user/add/{"username":"judlup","password":"kibitech","email":"judlup@domoteco.com","type":"1"}
  $scope.add_user = function(json) {   
    if(json.password_1 == json.password_2)
    {          
      $scope.loading = true;
      $(".loading").fadeIn("300");
      $http.get(url+'/user/add/{"username":"'+json.username+'","password":"'+json.password_1+'","email":"'+$scope.encode(json.email)+'","type":'+json.type.id+'}').then(successCallback_, errorCallback_);
      function successCallback_(res){         
        if(res.data.add_user)
        {        
          $scope.users.push({"id":res.data.last_user,"username":json.username,"type_id":json.type.id,"type":json.type.name,"status":1})          
          $scope.loading = false;
          $(".loading").fadeOut("300");
          $('#add_user').modal('hide');     
        }
        else
        {
          alert("Error, please,try later again")        
        }
        
      }
      function errorCallback_(error){
          //error code
      }  
    }
    else
    {
      alert("Password not match")
    }
    
  }


  /*
  //List employees
  $http.get(url+apikey+'/employee/list/'+$scope.device).then(successCallback, errorCallback);
  function successCallback(data){
    $scope.employees = data.data;
  }
  function errorCallback(error){
      //error code
  }
  //    
  */
  
});

//························································
//························································
//··                  OFFICES CONTROLLER                ··
//························································
//························································
app.controller('branchesCtrl', function($scope, $http,$sce, $rootScope) {
  $scope.username   = localStorage.getItem("user_name");
  $scope.user_email = localStorage.getItem("user_email");
  $scope.user_rol   = localStorage.getItem("user_rol");
  $scope.user_id    = localStorage.getItem("user_id"); 
  $scope.apikey     = localStorage.getItem("apikey");  
  
  /*
  
  //Load information in modal.
  $rootScope.show_edit_brand = function()
  {
    
    $scope.e_branch = this.b;
    $scope.e_b_index = this.$index    
  }
  
  //Edit branch
  $scope.edit_branch = function(data)
  {
    $scope.loading = true;
    $(".loading").fadeIn("300");
    //Edit branch
    $http.get(url+apikey+'/devices/edit/{"device":"'+$scope.e_branch.ncd_id+'","name":"'+data.ncd_nom+'"}').then(successCallback, errorCallback);
    function successCallback(data){
      if(data.data.edit_edit)
      {
        $scope.loading = false;
        $(".loading").fadeOut("300");
        $('#edit_branch').modal('hide'); 
      }      
      else
      {
        alert("Error")
      }
    }
    function errorCallback(error){
        //error code
    }
    //   
  }  
	
	$scope.load_branch = function()
	{
		$scope.branch_id = this.b.ncd_id;
	}
	*/
});

//························································
//························································
//··                BRANCH CONTROLLER                   ··
//························································
//························································
app.controller('branchCtrl', function($scope, $http, $routeParams, $rootScope, $sce, $timeout) {  
  $scope.username   = localStorage.getItem("user_name");
  $scope.user_email = localStorage.getItem("user_email");
  $scope.user_rol   = localStorage.getItem("user_rol");
  $scope.user_id    = localStorage.getItem("user_id");  
  $scope.apikey     = localStorage.getItem("apikey");   
  $scope.device     = $routeParams.deviceId; //device id
  	
	
});

Date.prototype.format = function(fstr, utc) {
  var that = this;
  utc = utc ? 'getUTC' : 'get';
  return fstr.replace (/%[YmdHMS]/g, function (m) {
    switch (m) {
        case '%Y': return that[utc + 'FullYear'] ();
        case '%m': m = 1 + that[utc + 'Month'] (); break;
        case '%d': m = that[utc + 'Date'] (); break;
        case '%H': m = that[utc + 'Hours'] (); break;
        case '%M': m = that[utc + 'Minutes'] (); break;
        case '%S': m = that[utc + 'Seconds'] (); break;
        default: return m.slice (1);
    }
    return ('0' + m).slice (-2);
	});
};
