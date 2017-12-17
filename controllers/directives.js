app.directive('loading', function () {
  return {
    restrict: 'E',
    replace:true,
    template: '<div class="loading "><i class="fa fa-spinner fa-spin fa-5x fa-fw loading_gif"></i><span class="sr-only">Loading...</span></div>',
    link: function (scope, element, attr) {
          scope.$watch('loading', function (val) {
              if (val)
                  $(element).show();
              else
                  $(element).hide();
          });
    }
  }
});

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', function ($http) {    
    this.uploadFileToUrl = function(file, data, uploadUrl){
      var fd = new FormData();                
      fd.append('data', data);
      fd.append('file', file);
      //console.log(data);
      //
      return $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      }).then(successCallback, errorCallback);
      function successCallback(res){
        if(res.data.files.length == 0)
        {          
          return {status:false,path:res.data.path};
        }
        else
        {
          return {status:true,path:res.data.path};  
        }
      }
      function errorCallback(error){
          //error code
      }
      //         
    }
}]);
