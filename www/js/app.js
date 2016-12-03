// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngStorage','ion-datetime-picker'])

.run(function($rootScope, $ionicPopup, $ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  //button back for exitapp

  $ionicPlatform.registerBackButtonAction(function() {
    var confirmPopup = $ionicPopup.confirm({
        title: 'Salir',
        template: '¿Esta seguro que desea cerrar la aplicación?',
        buttons : [
                    {
                      text : 'Cancel',
                      type : 'button-dark button-outline',
                    }, 
                    {
                      text : 'Ok',
                      type : 'button-dark',
                      onTap : function() {
                         ionic.Platform.exitApp();
                        }
                    }
                  ]

    });
}, 100);

})


.config(function($stateProvider, $urlRouterProvider) { 

  $stateProvider

      .state('tab', {
        url: '/tab',
        abstract: true, 
        views:{
          'contenido': {
            templateUrl: 'templates/tabs.html'
          }
        }
      })

      .state('tab2', {
        url: '/tab2',
        abstract: true, 
        views:{
          'contenido': {
            templateUrl: 'templates/tabs2.html'
          }
        }
      })

      .state('tab3', {
        url: '/tab3',
        abstract: true, 
        views:{
          'contenido': {
            templateUrl: 'templates/tabs3.html'
          }
        }
      })

      .state('login',{
        url:'/login',
        views:{
          'contenido':{
            templateUrl:'templates/login.html'            
          }
        }
      })

      .state('tab.homeU',{
        url:'/homeU',
        views:{
          'homeuser':{
            templateUrl:'templates/home-user.html'
          }
        }
      })

      .state('tab.buscarp',{
        url:'/buscarp',
        views:{
          'buscarp':{
            templateUrl:'templates/buscar-paciente.html'
          }
        }
      })

      .state('tab2.nuevacita',{
        url:'/nuevacita',
        views:{
          'cita':{
            templateUrl:'templates/nueva-cita.html'
          }
        }
      })

      .state('tab2.receta',{
        url:'/receta',
        views:{
          'recetas':{
            templateUrl:'templates/diagnostico.html'
          }
        }
      })

      .state('tab3.historia',{
        url:'/historiapaciente',
        views:{
          'historial':{
            templateUrl:'templates/historial.html'
          }
        }
      })
      .state('tab3.diag',{
        url:'/diagnosticobasico',
        views:{
          'realizardiag':{
            templateUrl:'templates/realizar-diag.html'
          }
        }
      })
    

  $urlRouterProvider.otherwise('/login');

})


//login controller whit PHP server
.controller('IniciarSesion', function($scope, $http, $ionicPopup, $state, $sessionStorage) {
    $scope.data = {};

    $scope.submit = function(){
        var link = 'http://192.168.6.30/api.php';
      $sessionStorage.miusuario = $scope.data.email;
    


        $http.post(link, {email: $scope.data.email, pass: $scope.data.contrasena}).
        then(function (res){
            $scope.response = res.data;
            
            var popLogin = $ionicPopup.alert({
               title: '<b>INICIAR SESIÓN</b>',
               scope: $scope,
               //link data to the template
               template: '<p ng-bind="response"></p>',
              
               buttons:   [
                            {
                              text:'Aceptar',
                              type: 'button-dark',

                              //add route for button
                              onTap : function() {
                                var dos = res.data; 
                                var uno ="Datos correctos ¡BIENVENIDO!";
                                if (uno === dos) {
                                  $state.go('tab.homeU');
                                }
                                
                              }
                            }
                          ]
                 });

        });

        $scope.data.email= '';
        $scope.data.contrasena='';

    };

    $scope.submit2 = function(){
        var link2 = 'http://192.168.6.30/api2.php';

        $http.post(link2, {email: $scope.data.email2, pass: $scope.data.contrasena2}).
        then(function (res2){
            $scope.response2 = res2.data;
            
            var popLogin2 = $ionicPopup.alert({
               title: '<b>INICIAR SESIÓN</b>',
               scope: $scope,
               //link data to the template
               template: '<p ng-bind="response2"> hola</p>',
              
               buttons:   [
                            {
                              text:'Aceptar',
                              type: 'button-dark',

                              //add route for button
                                onTap : function() {
                                var dos = res2.data; 
                                var uno ="Datos correctos ¡BIENVENIDO!";
                                if (uno === dos) {
                                  $state.go('tab2.nuevacita');
                                }
                                
                              }
                            }
                          ]
                 });

        });
    };

})

.controller('DatosUsuario',function($scope,$http, $sessionStorage){

    var link3 = 'http://192.168.6.30/sesion.php';

        $http.post(link3, {email: $sessionStorage.miusuario}).
        then(function (res3){
            $scope.response3 = res3.data;
        });

    var link4 = 'http://192.168.6.30/telefono-ayudante.php';

        $http.post(link4, {email: $sessionStorage.miusuario}).
        then(function (res4){
            $scope.response4 = res4.data;
        });

    var link5 = 'http://192.168.6.30/direccion-ayudante.php';

        $http.post(link5, {email: $sessionStorage.miusuario}).
        then(function (res5){
            $scope.response5 = res5.data;
        });
    var link6 = 'http://192.168.6.30/edad-ayudante.php';

        $http.post(link6, {email: $sessionStorage.miusuario}).
        then(function (res6){
            $scope.response6 = res6.data;
        });
    var link7 = 'http://192.168.6.30/email-ayudante.php';

        $http.post(link7, {email: $sessionStorage.miusuario}).
        then(function (res7){
            $scope.response7 = res7.data;
        });
})


//Controller for diagnostic for one Afiliate

.controller('DatosDiagnostico',function($scope, $http, $sessionStorage){

  var link8 = 'http://192.168.6.30/nombre-paciente.php';

        $http.post(link8, {email: $sessionStorage.mipaciente}).
        then(function (res8){
            $scope.response8 = res8.data;
        });
  var link9 = 'http://192.168.6.30/ayudante-registro.php';

        $http.post(link9, {email: $sessionStorage.mipaciente}).
        then(function (res9){
            $scope.response9 = res9.data;
        });
  var link10 = 'http://192.168.6.30/ultima-rito.php';

        $http.post(link10, {email: $sessionStorage.mipaciente}).
        then(function (res10){
            $scope.response10 = res10.data;
        });
   var link11 = 'http://192.168.6.30/ultima-presion.php';

        $http.post(link11, {email: $sessionStorage.mipaciente}).
        then(function (res11){
            $scope.response11 = res11.data;
        });
   var link12 = 'http://192.168.6.30/ultima-glucosa.php';

        $http.post(link12, {email: $sessionStorage.mipaciente}).
        then(function (res12){
            $scope.response12 = res12.data;
        });
   var link13 = 'http://192.168.6.30/ultima-temperatura.php';

        $http.post(link13, {email: $sessionStorage.mipaciente}).
        then(function (res13){
            $scope.response13 = res13.data;
        });

})

//Controller for search Afilate on BD

.controller('BuscarAfiliado', function($scope, $http, $ionicPopup, $state, $sessionStorage){
  $scope.data = {};
  
  $scope.buscarPaciente = function(){
  
  var link = 'http://192.168.6.30/buscar-paciente.php';
     
    


        $http.post(link, {email: $scope.data.emailpaciente}).
        then(function (res3){
            $scope.responsepac = res3.data;
            
            var popLogin = $ionicPopup.alert({
               title: '<b>BUSCAR PACIENTE</b>',
               scope: $scope,
               //link data to the template
               template: '<p ng-bind="responsepac"></p>',
              
               buttons:   [
                            {
                              text:'Aceptar',
                              type: 'button-dark',

                                //add route for button
                                onTap : function() {
                                var doss = res3.data; 
                                var uno = "¡Afiliado encontrado!";
                                if (uno === doss) {
                                  $state.go('tab3.historia');
                                }
                                
                              }
                            }
                          ]
                 });

        });
        $sessionStorage.mipaciente = $scope.data.emailpaciente;
        $scope.data.emailpaciente = '';

  };

})

.controller('RealizarDiag',function($scope, $http, $sessionStorage, $ionicPopup, $window){

//all toggles whit value = true

  $scope.ritmo = true;  
  $scope.presion = true;  
  $scope.glucosa = true;  
  $scope.temperatura = true;


  $scope.realizarDiagnostico = function(){

  $sessionStorage.miritmo = '0';
  $sessionStorage.mipresion = '0';
  $sessionStorage.miglucosa = '0';
  $sessionStorage.mitemperatura = '0'; 

  

    if ($scope.ritmo === true) {
        
      var link14 = 'http://192.168.6.30/tomar-ritmo.php';

        $http.post(link14, {email: $sessionStorage.mipaciente, email2: $sessionStorage.miusuario}).
        then(function (res14){
          
            $scope.response14 = res14.data;
            var valor1 = $scope.response14;
            if (valor1 === '') {
                $sessionStorage.rr = 1;
                var rr1 = $sessionStorage.rr;
                $window.sessionStorage.removeItem('ngStorage-rr');
            }else{
              $sessionStorage.rr = 0;
            }
        });

    }else{
        
         $sessionStorage.miritmo = 1;
        $scope.response14='';
    }
    if ($scope.presion === true) {

      var link15 = 'http://192.168.6.30/tomar-presion.php';

        $http.post(link15, {email: $sessionStorage.mipaciente, email2: $sessionStorage.miusuario}).
        then(function (res15){
            
            $scope.response15 = res15.data;
            var valor2 = $scope.response15;
            if (valor2 === '') {
                $sessionStorage.rp = 1;
                 var rp1 = $sessionStorage.rp;
                $window.sessionStorage.removeItem('ngStorage-rp');
            }else{
              $sessionStorage.rp = 0;
            }
        });
        
    }else{
        
        $sessionStorage.mipresion = 1;
        $scope.response15='';
    }
    if ($scope.glucosa === true) {

      var link16 = 'http://192.168.6.30/tomar-glucosa.php';

        $http.post(link16, {email: $sessionStorage.mipaciente, email2: $sessionStorage.miusuario}).
        then(function (res16){
            
            $scope.response16 = res16.data;
            var valor3 = $scope.response16;
            if (valor3 === '') {
                $sessionStorage.rg = 1;
                 var rg1 = $sessionStorage.rg;
                $window.sessionStorage.removeItem('ngStorage-rg');
            }else{
              $sessionStorage.rg = 0;
            }
        });
        
    }else{
    
        $sessionStorage.miglucosa = 1;
        $scope.response16='';
    }
    if ($scope.temperatura === true) {

      var link17 = 'http://192.168.6.30/tomar-temperatura.php';

        $http.post(link17, {email: $sessionStorage.mipaciente, email2: $sessionStorage.miusuario}).
        then(function (res17){
          
            $scope.response17 = res17.data;
            var valor4 = $scope.response17;
            if (valor4 === '') {
                $sessionStorage.rt = 1;
                 var rt1 = $sessionStorage.rt;
                $window.sessionStorage.removeItem('ngStorage-rt');
            }else{
              $sessionStorage.rt = 0;
            }
        });
        
    }else{
        
        $sessionStorage.mitemperatura = 1;
        $scope.response17='';
    }



     if ($sessionStorage.miritmo === '1' && $sessionStorage.mipresion ==='1' && $sessionStorage.miglucosa ==='1' && $sessionStorage.mitemperatura ==='1') {

        var error1 = $ionicPopup.alert({
               title: '<b>Error</b>',
               scope: $scope,
               template: 'No selecciono ninguna operacion, debe seleccionar almenos uno para obtener resultados',
              
               buttons:   [
                            {
                              text:'Aceptar',
                              type: 'button-dark',
                            }
                          ]
                 });

    
      }

    if ($sessionStorage.rr === 1 && $sessionStorage.rp ===1 && $sessionStorage.rg ===1 && $sessionStorage.rt ===1) {

          var error2 = $ionicPopup.alert({
                 title: '<b>Error</b>',
                 scope: $scope,
                 template: 'No se pudo obtener el diagnostico, intente de nuevo o verifique la conexion con el dispositivo hardware',
                
                 buttons:   [
                              {
                                text:'Aceptar',
                                type: 'button-dark',
                              }
                            ]
                   });
                
        
}

    /*
    var link18 = 'http://192.168.6.30/registrar-diagnostico.php';

        $http.post(link18, {email: $sessionStorage.mipaciente, email2: $sessionStorage.miusuario}).
        then(function (res18){
            $scope.response18 = res18.data;
        });
    */

  };

  $scope.guardarDiagnostico = function(){

      var link18 = 'http://192.168.6.30/registrar-diagnostico.php';

        $http.post(link18, {email: $sessionStorage.mipaciente, email2: $sessionStorage.miusuario}).
        then(function (res18){
           $scope.response18 = res18.data;
              
            var registrardiagnostivco = $ionicPopup.alert({
               title: '<b>Registrando Diagnostico</b>',
               scope: $scope,
               //link data to the template
               template: '<p ng-bind="response18"></p>',
              
               buttons:   [
                            {
                              text:'Aceptar',
                              type: 'button-dark',

                            }
                          ]
                 });

        });
  }



})

.controller('DestruirVariables',function($scope, $state, $window){

  $scope.destruirPaciente = function(){
    $window.sessionStorage.removeItem('ngStorage-mipaciente');
    $state.go('tab.buscarp');
  }


  $scope.destruirUsuario = function(){
    $window.sessionStorage.removeItem('ngStorage-miusuario');
    $state.go('login');
  }


})