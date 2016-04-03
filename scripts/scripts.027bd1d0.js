"use strict";angular.module("hormilApp",["ngSanitize","ngTouch","ui.router"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("app",{"abstract":!0,templateUrl:"views/main.html",controller:"MainCtrl"}).state("app.dimensiones",{url:"/?m",templateUrl:"views/dimensiones.html",data:{name:"Dimensiones",porcentaje:12}}).state("app.color",{url:"/color",templateUrl:"views/color.html",data:{name:"Color",porcentaje:38}}).state("app.escalla",{url:"/escalla",templateUrl:"views/escalla.html",data:{name:"Escalla",porcentaje:63}}).state("app.pileta",{url:"/pileta",templateUrl:"views/pileta.html",data:{name:"Pileta",porcentaje:100}}).state("app.enviar",{url:"/enviar",templateUrl:"views/enviar.html",data:{name:"Enviar consulta",porcentaje:100}})}]).run(["$rootScope","$state",function(a,b){a.$state=b,a.$on("$stateChangeStart",function(a,c,d,e){""===e.name&&"app.dimensiones"!==c.name?(a.preventDefault(),b.go("app.dimensiones")):"app.enviar"===e.name&&"1"!==d.m&&(a.preventDefault(),b.go("app.enviar"))})}]),angular.module("hormilApp").controller("MainCtrl",["$scope","$timeout","$state",function(a,b,c){function d(){for(var b=[],c=0;c<a.config.orifMax;c++)b.push({n:c+1});a.rangoDiametro=b.slice(a.config.orifMin-1)}a.config={largoMin:100,largoMax:200,anchoMin:50,anchoMax:64,ladoMin:5,ladoMax:10,topMin:5,topMax:10,orifMin:3,orifMax:5,colores:[{id:1,color:"blanco",granito:"negro",clase:"color1"},{id:2,color:"gris",granito:"blanco",clase:"color2"}],escalla:[{id:1,name:"roja",clase:"roja"},{id:2,name:"gris",clase:"gris"}],pileta:[{id:1,tipo:"simple",img:"//i.gyazo.com/2a303fbf46c88cbe2a08d144969ec4c8.png",name:"Pileta simple",mat:"aluminio",largo:41,ancho:35,prof:14,lado:5,top:5},{id:2,tipo:"doble",img:"//i.gyazo.com/ed5b28a06557017497ce976452d3bf0b.png",name:"Pileta doble",mat:"aluminio",largo:76,ancho:35,prof:14,lado:5,top:5},{id:3,tipo:"unaymedia",img:"//i.gyazo.com/44dc496ff6b53896468588ef095b6d82.png",name:"Pileta y media",mat:"aluminio",largo:74,ancho:35,prof:14,lado:5,top:5}],orificio:[{posicion:1,clase:"pos1",align:"left",n:"inferior izquierda",diametro:3},{posicion:2,clase:"pos2",align:"left",n:"centro izquierda",diametro:3},{posicion:3,clase:"pos3",align:"left",n:"superior izquierda",diametro:3},{posicion:4,clase:"pos4",align:"center",n:"superior centro",diametro:3},{posicion:5,clase:"pos5",align:"right",n:"superior derecha",diametro:3},{posicion:6,clase:"pos6",align:"right",n:"centro derecha",diametro:3},{posicion:7,clase:"pos7",align:"right",n:"inferior derecha",diametro:3}]};var e=!0,f={largo:100,ancho:50,color:angular.copy(a.config.colores[0])};a.mesada=angular.copy(f),a.pedido={mesadas:[],cliente:{mail:"",tel:"",nota:"",pref:"mail"}},a.addMesada=function(){a.mesada=angular.copy(f),e=!0,c.go("app.dimensiones",{m:"1"})},a.modMesada=function(b,d){a.mesada=b,c.go("app.dimensiones",{m:"1"})},a.generarPedido=function(){e?(a.pedido.mesadas.push(a.mesada),e=!1,c.go("app.enviar")):c.go("app.enviar")},a.color=a.config.colores[0],a.elegirColor=function(b){a.mesada.color=angular.copy(b)},a.elegirEscalla=function(b){a.mesada.escalla=angular.copy(b)},a.elegirPileta=function(b){a.mesada.pileta=angular.copy(b)},a.activarEscalla=function(b){1===b?a.mesada.escalla=a.config.escalla[0]:delete a.mesada.escalla},a.quitarPileta=function(b){delete a.mesada.orificio,"q"===b?(a.activarPileta=!1,delete a.mesada.pileta):"c"===b&&delete a.mesada.pileta},a.aM=function(a){return a/100},a.aCM=function(a){return a/100},d(),a.validar=function(c){b(function(){var b=angular.element(mesadaForm.largo).val(),d=angular.element(mesadaForm.ancho).val(),e=angular.element(mesadaForm.top).val(),f=angular.element(mesadaForm.lado).val();"largo"===c||isNaN(parseFloat(a.mesada.largo))?b>a.config.largoMax?a.mesada.largo=a.config.largoMax:b<a.config.largoMin&&(a.mesada.largo=a.config.largoMin):"ancho"===c||isNaN(parseFloat(a.mesada.ancho))?d>a.config.anchoMax?a.mesada.ancho=a.config.anchoMax:d<a.config.anchoMin&&(a.mesada.ancho=a.config.anchoMin):"top"===c||isNaN(parseFloat(a.mesada.pileta.top))?e>a.config.topMax?a.mesada.pileta.top=a.config.topMax:e<a.config.topMin&&(a.mesada.pileta.top=a.config.topMin):("lado"===c||isNaN(parseFloat(a.mesada.pileta.lado)))&&(f>a.config.ladoMax?a.mesada.pileta.lado=a.config.ladoMax:f<a.config.ladoMin&&(a.mesada.pileta.lado=a.config.ladoMin))})}}]),angular.module("hormilApp").directive("visor",["$window",function(a){return{restrict:"E",replace:!0,templateUrl:"views/tpl.visor.html",scope:{cfg:"=",mesada:"="},link:function(b,c,d){b.containerWidth=c[0].clientWidth,angular.element(a).bind("resize",function(){b.containerWidth=c[0].clientWidth,b.$apply()}),b.CMaPx=function(a){return a*b.containerWidth/b.cfg.largoMax},b.alinearPileta=function(){var a={};return"left"===b.mesada.pileta.align?a.left=0:"right"===b.mesada.pileta.align?a.right=0:(a.position="relative",a.display="table",a.marginLeft="auto",a.marginRight="auto"),a.top=0,a},b.calcMargen=function(a){var c={};return"lateral"===a?c.padding="0 "+b.CMaPx(b.mesada.pileta.lado)/2+"px":c.padding=b.CMaPx(b.mesada.pileta.top)/2+"px 0",c}}}}]),angular.module("hormilApp").directive("resumen",function(){return{restrict:"E",replace:!0,templateUrl:"views/tpl.resumen.html",scope:{mesada:"="},link:function(a,b,c){a.piletaLength=function(a){return Object.keys(a).length};var d={pileta:{name:"Tipo",mat:"Material",prof:"Profundidad",align:"Alineación",top:"Margen superior",lado:"Margen",right:"derecha",left:"izquierda",center:"centro"},orificio:{n:"Posición",diametro:"Diámetro"}};a.traduceKey=function(a,b){var c=d[a][b];return c?c:b},a.typeOf=function(a){return typeof a}}}}),angular.module("hormilApp").factory("cacheService",["$cacheFactory",function(a){var b=a("app");return b}]);