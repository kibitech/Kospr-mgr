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
  
  $scope.dashboard = [{name:"Security",url:"/#/security",icon:"fa-shield"},{name:"Segments",url:"/#/segments",icon:"fa-cubes"},{name:"Nodes",url:"/#/nodes",icon:"fa-cube"}]

  /*
  //Test
  $http.get(url+'/users').then(successCallback_, errorCallback_);
    function successCallback_(wuser){
      //console.log(wuser);          
    }
    function errorCallback_(error){
        //error code
    }        
  //Test
  */
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
    $scope.loading = true;
    $(".loading").fadeIn("300");  
    //
    $http.get(url+'/login/{"username":"'+username.toLowerCase()+'", "password":"'+pass+'"}').then(successCallback, errorCallback);
    function successCallback(res){      
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

  //Del user
  $scope.del_user = function(){    
    var id = this.users[this.$index].id;
    var scope = this.users;
    var index = this.$index;                       
    var conf = confirm("do you are sure to you want to delete this user?");
    if(conf)
    {          
      $http.get(url+'/user/del/'+this.u.id).then(successCallback, errorCallback);
      function successCallback(res){ 
        if(res.data.user_del)  
        {
          if(scope.length -1 == index)
          {      
            scope.splice(-1,1)
          }
          else
          {
            scope.splice(index, 1);
          }          
        }
        else
        {
          alert("Error, please try later again!");
        }
        
      }
      function errorCallback(error){
          //error code
      } 
    }
  }  
  
});

//························································
//························································
//··              SEGMENTS CONTROLLER                   ··
//························································
//························································
app.controller('segmentsCtrl', function($scope, $http, $routeParams, $rootScope, $sce, $timeout) {  
  $scope.username   = localStorage.getItem("user_name");
  $scope.user_email = localStorage.getItem("user_email");
  $scope.user_rol   = localStorage.getItem("user_rol");
  $scope.user_id    = localStorage.getItem("user_id");   
  $scope.apikey     = localStorage.getItem("apikey");      
  
  //List Segments
  $http.get(url+'/segments').then(successCallback_, errorCallback_);
  function successCallback_(res){    
    $rootScope.segments = res.data;         
  }
  function errorCallback_(error){
      //error code
  } 

  //Add segment
  $scope.add_segment = function(data) {       
    $scope.loading = true;
    $(".loading").fadeIn("300"); 
    $http.get(url+'/segment/add/{"name":"'+data.name+'"}').then(successCallback_, errorCallback_);
    function successCallback_(res){    
      if(res.data.segment_add) {
        $scope.segments.push({"id":res.data.last_segment,"name":data.name,"date":$scope.date_,"status":1})    
        $scope.loading = false;
        $(".loading").fadeOut("300");
        $('#add_segment').modal('hide'); 
      } 
      else{
        alert("Error, please try later again!");
      }      
    }
    function errorCallback_(error){
        //error code
    }
  }

   //Del user
  $scope.del_segment = function(){    
    var id = this.segments[this.$index].id;
    var scope = this.segments;
    var index = this.$index;                       
    var conf = confirm("do you are sure to you want to delete this segment?");
    if(conf)
    {          
      $http.get(url+'/segment/del/'+this.s.id).then(successCallback, errorCallback);
      function successCallback(res){ 
        if(res.data.del_segment)  
        {
          if(scope.length -1 == index)
          {      
            scope.splice(-1,1)
          }
          else
          {
            scope.splice(index, 1);
          }          
        }
        else
        {
          alert("Error, please try later again!");
        }
        
      }
      function errorCallback(error){
          //error code
      }       
    }
  }  
});

//························································
//························································
//··                 NODES CONTROLLER                   ··
//························································
//························································
app.controller('nodesCtrl', function($scope, $http, $routeParams, $rootScope, $sce, $timeout) {  
  $scope.username   = localStorage.getItem("user_name");
  $scope.user_email = localStorage.getItem("user_email");
  $scope.user_rol   = localStorage.getItem("user_rol");
  $scope.user_id    = localStorage.getItem("user_id");   
  $scope.apikey     = localStorage.getItem("apikey");    
  
  //List Nodes
  $http.get(url+'/nodes').then(successCallback_, errorCallback_);
  function successCallback_(res){    
    $rootScope.nodes = res.data;         
  }
  function errorCallback_(error){
      //error code
  } 

  //List Segments
  $http.get(url+'/segments').then(successCallback_segments, errorCallback_segments);
  function successCallback_segments(res){    
    $rootScope.segments = res.data;         
  }
  function errorCallback_segments(error){
      //error code
  } 

  //Add node
  $scope.add_node = function(data) {               
    $scope.loading = true;
    $(".loading").fadeIn("300"); 
    $http.get(url+'/nodes/add/{"sku":"'+data.sku+'","manufacturer":"'+data.manufacturer+'","version":"'+data.version+'","user":"'+$scope.user_id+'","segment":"'+data.segment.id+'"}').then(successCallback_, errorCallback_);
    function successCallback_(res){    
      if(res.data.node_add) {
        $scope.nodes.push({"id":res.data.last_node,"nodekey":res.data.nodekey,"sku":data.sku,"manufacturer":data.manufacturer,"version":data.version,"segment_id":data.segment.id,"segment_name":data.segment.name,"user_id":$scope.user_id,"username":$scope.username,"date":$scope.date_,"status":1});
        $scope.loading = false;
        $(".loading").fadeOut("300");
        $('#add_node').modal('hide'); 
      } 
      else{
        alert("Error, please try later again!");
      }      
    }
    function errorCallback_(error){
        //error code
    }
  }

   //Del node
  $scope.del_node = function(){    
    var id = this.segments[this.$index].id;
    var scope = this.nodes;
    var index = this.$index;                       
    var conf = confirm("do you are sure to you want to delete this node?");
    if(conf)
    {          
      $http.get(url+'/node/del/'+this.n.id).then(successCallback, errorCallback);
      function successCallback(res){ 
        if(res.data.node_del)  
        {
          if(scope.length -1 == index)
          {      
            scope.splice(-1,1)
          }
          else
          {
            scope.splice(index, 1);
          }          
        }
        else
        {
          alert("Error, please try later again!");
        }
        
      }
      function errorCallback(error){
          //error code
      }       
    }
  }  
});

//························································
//························································
//··                  NODE CONTROLLER                   ··
//························································
//························································
app.controller('nodeCtrl', function($scope, $http, $routeParams, $rootScope, $sce, $timeout) {  
  $scope.username   = localStorage.getItem("user_name");
  $scope.user_email = localStorage.getItem("user_email");
  $scope.user_rol   = localStorage.getItem("user_rol");
  $scope.user_id    = localStorage.getItem("user_id");  
  $scope.apikey     = localStorage.getItem("apikey");   
  $scope.nodeId       = $routeParams.nodeId;  
  //List Node
  $http.get(url+'/node/'+$scope.nodeId).then(successCallback_, errorCallback_);
  function successCallback_(res){    
    $rootScope.node = res.data;         
  }
  function errorCallback_(error){
      //error code
  } 
  
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
