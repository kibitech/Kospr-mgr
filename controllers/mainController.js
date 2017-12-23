//************************************************
//                 MAIN CONTROLLER
//************************************************
var url           = '';
var url_e_d       = '';
var photo_url     = '';
var apikey        = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE1MTM5ODU1MTZ9.Bb9n4ZptsqaQShN-pbUBlpWVvrdE7ATlPZ10NicwecI';
app.controller('mainController', function($scope,$http,$route,$rootScope,$location,$anchorScroll,$compile,$sce,$timeout,$filter,fileUpload) {
  $scope.height_screen = screen.height;
  $scope.height_screen_home = screen.height - (screen.height * 0.21);
  $scope.height_screen_menu = screen.height - (screen.height * 0.24);
  $scope.height_screen_dashboard = screen.height - (screen.height * 0.24);    
  
  //Test
  $http.get('http://localhost:4000/users', { headers: {'Authorization': 'Bearer '+apikey} }).then(successCallback_, errorCallback_);
    function successCallback_(wuser){
      console.log(wuser);          
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
  
  $scope.registrar=function(data)
  {
    var username      = data.username.toLowerCase();
    var password1     = data.pass1;
    var password2     = data.pass2;
    var phone         = data.phone;
    var email         = data.email;
    //alert(username+'-'+password1+'-'+password2+'-'+phone+'-'+email); 
    if(password1 == password2)
    {
      var json = JSON.stringify({username:username, password:password1,phone:phone,email:email});      
      $scope.loading = true;
      $(".loading").fadeIn("300"); 
      //new
      $http.get(url+apikey+'/user/register/'+json).then(successCallback, errorCallback);
      function successCallback(data){
        if(data.data.register.username == true && data.data.register.email == false && data.data.register.register == false)
        {
          alert("Username is not available.");
        }
        else if(data.data.register.username == false && data.data.register.email == true && data.data.register.register == false)
        {
          alert("Email is not available.");
        }
        else if(data.data.register.username == false && data.data.register.email == false && data.data.register.register == true)
        {
          alert("Register successful!");
          $scope.loading = false;
          $(".loading").fadeOut("300");
          $scope.login_auto(username,password1);
        }
      }
      function errorCallback(error){
          //error code
      }
      //new      
    }
    else
    {
      alert("Passwords don't match.");
    }
  };
  
  $scope.login_auto=function(user,pass)
  {
    //alert("autologin-"+user+'-'+pass);
    $scope.loading = true;
    $(".loading").fadeIn("300");  
    //
    $http.get(url+apikey+'/login/{"username":"'+user.toLowerCase()+'", "password":"'+pass+'","platform":"app"}').then(successCallback, errorCallback);
      function successCallback(data){
        if(data.data.login == true)
        {
          //
          $http.get(url_e_d+'wuser/'+user.toLowerCase()).then(successCallback_, errorCallback_);
          function successCallback_(wuser){
            localStorage.setItem("signed_in", true);
            localStorage.setItem("user_id", wuser.data.id);
            localStorage.setItem("user_name", wuser.data.username);
            localStorage.setItem("user_img", wuser.data.img);
            localStorage.setItem("user_correo", wuser.data.email);
            localStorage.setItem("user_rol", wuser.data.rol);
            data.user = "";
            data.password = "";
          }
          function errorCallback_(error){
              //error code
          }
          $scope.loading = false;
          $(".loading").fadeOut("300");
          location.reload();
          //          
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
  
  //·················································/
  //················ S E R V I C E S ················/
  //·················································/ 
  
  $('.carousel').carousel({
    interval: 20000
  })
  
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
	
	//Pagination
	$rootScope.currentPage = 0;
	$rootScope.pageSize = 10;
	$rootScope.data = [];
	$scope.q = '';
    
	$rootScope.getData = function () {
		// needed for the pagination calc
		// https://docs.angularjs.org/api/ng/filter/filter
		return $filter('filter')($rootScope.data, $rootScope.q)
		}

	$rootScope.numberOfPages=function(){
			return Math.ceil($rootScope.getData().length/$rootScope.pageSize);                
	}

	for (var i=0; i<65; i++) {
			$rootScope.data.push("Item "+i);
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
    //var data = this.data;    
    /*console.log('file is ' );
    console.dir(file);
    console.log('Data is' );
    console.log(data);*/
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
    $http.get(url+apikey+'/login/{"username":"'+username.toLowerCase()+'", "password":"'+password+'","platform":"app"}').then(successCallback, errorCallback);
    function successCallback(res){
      if(res.data.login == true)
      {
        $http.get(url_e_d+'wuser/'+username.toLowerCase()).then(successCallback_, errorCallback_);
        function successCallback_(wuser){
          localStorage.setItem("signed_in", true);
          localStorage.setItem("user_id", wuser.data.id);
          localStorage.setItem("user_name", wuser.data.username);
          localStorage.setItem("user_img", wuser.data.img);
          localStorage.setItem("user_correo", wuser.data.email);
          localStorage.setItem("user_rol", wuser.data.rol);
          data.user = "";
          data.password = "";
          $scope.loading = false;
          $(".loading").fadeOut("300");
          location.reload();
        }
        function errorCallback_(error){
            //error code
        }        
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
    $http.get(url+apikey+'/login/{"username":"'+user.toLowerCase()+'", "password":"'+pass+'","platform":"app"}').success(function(data){
      if(data.login == true)
      {
        $scope.loading = false;
        $(".loading").fadeOut("300");
        $http.get(url+'wuser/'+user.toLowerCase()).success(function(wuser){
            localStorage.setItem("signed_in", true);
            localStorage.setItem("user_id", wuser.id);
            localStorage.setItem("user_name", wuser.username);
            localStorage.setItem("user_img", wuser.img);
            localStorage.setItem("user_correo", wuser.email);
            localStorage.setItem("user_rol", wuser.rol);
        })
        location.reload();
      }
      else
      {
        alert("Wrong user");
      }
    });
  }
  
	/*
  $scope.login_fb = function() { 
    //Facebook login
    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    window.fbAsyncInit = function() {
    FB.init({
      appId      : '',//*************** API ID ***********
      xfbml      : true,
      version    : 'v2.8'
    });
      //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMjdmMzY4Ny01NzA2LTQ2M2ItYmE0Ny0wZjc1ZjJlZGU3MDIifQ.LWzjdroEMoOEuvHetJk_Zr0eKSGWFByM5gwXzrAGbD0
    FB.login(function(response) {
        if (response.authResponse) {
         FB.api('/me', {fields: 'name,email,id,first_name'}, function(response) {           
           //console.log('Datos: ' + response.email + '.');
           //*****
           //Login
          var user = response.email;
          ////console.log(user);
          var pass = response.email;      
					$http.get(url+apikey+'/login/{"username":"'+user.toLowerCase()+'", "password":"'+pass+'","platform":"app"}').success(function(data){
            //alert(data);
            if(data.login == true)
            {
              //$http.get(url_ed+'/woonked/controlador/wuser.php?user='+user).success(function(wuser){
							$http.get(url_e_d+'wuser/'+username.toLowerCase()).then(successCallback_, errorCallback_);
                  localStorage.setItem("signed_in", true);
                  localStorage.setItem("user_id", wuser.id);
                  localStorage.setItem("user_name", wuser.username);
                  localStorage.setItem("user_img", wuser.img);
                  localStorage.setItem("user_correo", wuser.email);
                  localStorage.setItem("user_rol", wuser.rol);
                  localStorage.setItem("user_estado", wuser.status);              
                  location.reload();           
              })
            }
            else
            {
              //Registro
              //alert("Creando cuenta");
              var rdm  = Math.floor((Math.random() * 1000) + 1).toString()
              var reg_user_name = response.first_name.toLowerCase()+'_'+rdm;
              var reg_pass_1    = response.email;
              var reg_user_cel  = 0;
              var reg_user_cor  = response.email;
              //alert(reg_user_name+'-'+reg_pass_1+'-'+reg_user_cel+'-'+reg_user_cor); 
							
							var json = JSON.stringify({username:reg_user_name, password:reg_pass_1,phone:reg_user_cel,email:escape(reg_user_cor)});      
							$scope.loading = true;
							$(".loading").fadeIn("300"); 
							//new
							$http.get(url+apikey+'/user/register/'+json).then(successCallback, errorCallback);
							function successCallback(data){
								if(data.data.register.username == true && data.data.register.email == false && data.data.register.register == false)
								{
									alert("Username is not available.");
								}
								else if(data.data.register.username == false && data.data.register.email == true && data.data.register.register == false)
								{
									alert("Email is not available.");
								}
								else if(data.data.register.username == false && data.data.register.email == false && data.data.register.register == true)
								{
									alert("Register successful!");
									$scope.loading = false;
									$(".loading").fadeOut("300");
									$scope.login_auto(username,password1);
								}							              
              //Registro
            }
          });
          //Login
           //*****
         });
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    });
  };
  //Facebook login
  };     
  
  */
  
});

//························································
//························································
//··                DASHBOARD CONTROLLER                ··
//························································
//························································
app.controller('dashboardCtrl', function($scope, $http,$sce, $rootScope) {
  $scope.username = localStorage.getItem("user_name");
  $scope.user_img = localStorage.getItem("user_img");
  $scope.user_id  = localStorage.getItem("user_id");  
  var user_id     = localStorage.getItem("user_id");
});

//························································
//························································
//··                  OFFICES CONTROLLER                ··
//························································
//························································
app.controller('branchesCtrl', function($scope, $http,$sce, $rootScope) {
  $scope.username = localStorage.getItem("user_name");
  $scope.user_img = localStorage.getItem("user_img");
  $scope.user_id  = localStorage.getItem("user_id");  
  var user_id     = localStorage.getItem("user_id");
  
  /*
	//List branch
  $http.get(url+apikey+'/devices/list/'+user_id).then(successCallback, errorCallback);
  function successCallback(data){
    $scope.branches = data.data;
  }
  function errorCallback(error){
      //error code
  }
  //   
  
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
  
  //Add branch
  $scope.add_branch = function(data)
  {      
    $scope.loading = true;
    $(".loading").fadeIn("300");
    //Add branch
    $http.get(url+apikey+'/devices/add/{"company":"'+user_id+'","key":"'+data.key+'"}').then(successCallback, errorCallback);
    function successCallback(res){
      console.log(res)
      if(res.data.add_device)
      {
        $scope.branches.push({"ncd_id":res.data.last_device,"ncd_nom":res.data.last_device_name})
        $scope.loading = false;
        $(".loading").fadeOut("300");
        $('#add_branch').modal('hide'); 
      }      
      else if(res.data.add_device == false && res.data.home == false && res.data.key == true)
      {
        alert("Invalid Key")
        $scope.loading = false;
        $(".loading").fadeOut("300");
        $('#add_branch').modal('hide');
      }
      else if(res.data.add_device == false && res.data.home == false && res.data.key == false)
      {
        alert("No home")
        $scope.loading = false;
        $(".loading").fadeOut("300");
        $('#add_branch').modal('hide');
      }
      else if(res.data.add_device == false && res.data.home == null && res.data.key == null)
      {
        alert("Branch already exist")
        $scope.loading = false;
        $(".loading").fadeOut("300");
        $('#add_branch').modal('hide');
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
  $scope.username = localStorage.getItem("user_name");
  $scope.user_img = localStorage.getItem("user_img");
  $scope.user_id  = localStorage.getItem("user_id");  
  $scope.rol        = localStorage.getItem("user_rol");
  var user_id     = localStorage.getItem("user_id");  
  $scope.device = $routeParams.deviceId; //device id
  
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
