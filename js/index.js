/*
* @Author: leesipeng
* @Date:   2017-02-24 11:48:02
* @Last Modified by:   leesipeng
* @Last Modified time: 2017-02-24 18:43:19
*/

'use strict';

// $(function() {
//     // 获取需要的元素
//     var center = $('#con_center');
//     var point = $('#center_point');
//     var leftColor = $('#con_left_color');
//     var rNum = $('#rNum');
//     var gNum = $('#gNum');
//     var bNum = $('#bNum');
//     var hNum = $('#hNum');
//     var sNum = $('#sNum');
//     var lNum = $('#lNum');

//     // 鼠标按下事件
//     center.on('mousedown',function(e) {

//         // 把鼠标点击的位置赋值给标志条

//         point.css('top',(e.offsetY - point.height()/2));

//         getRgb(center.height(),(e.offsetY - point.height()/2));

//         // 鼠标拖动事件 重新计算标志条位置
//         center.on('mousemove',function(e) {

//             point.css('top',(e.offsetY - point.height()/2));
//             getRgb(center.height(),(e.offsetY - point.height()/2))

//         })

//         // 鼠标弹起时清除鼠标拖动事件
//         center.on('mouseup',function() {
//             center.off('mousemove');
//             center.off('mouseup');
//         })

//     });

//     /**
//      * 通过标志点位置计算颜色值函数--rgb
//      * @param  {[type]} height [色块总高度]
//      * @param  {[type]} top    [标志点top值]
//      * @return {[type]}        [description]
//      */
//     function getRgb(height,top) {
//         console.log(height+'---'+top)
//         // 应该6个颜色块 每块1/6(height)
//         var perBlock = height / 6;
//         if(top >= 0 && top <= perBlock){
//             // var value = parseInt(255/(height/6)*top);
//             // console.log(parseInt(255/(height/6)*top)+'--1')

//             rNum.val(parseInt(255/(height/6)*top));
//             // console.log(rNum.val())

//             leftColor.css('background-image','linear-gradient(to right, rgb(255,0,0), rgb(255,0,'+parseInt(255/(height/6)*top)+'))');
//         }else if(top > perBlock && top < perBlock*2) {

//             // console.log(parseInt(255/(height/6)*top)+'-2')

//             leftColor.css(
//                 'background-image',
//                 'linear-gradient(to right, rgb(255,0,255), rgb('+parseInt(255-(255/(height/6)*top-255))+',0,255))'
//                 );
//         }else if(top > perBlock*2 && top < perBlock*3) {

//             leftColor.css(
//                 'background-image',
//                 'linear-gradient(to right, rgb(0,0,255), rgb(0,'+parseInt(255/(height/6)*top-255*2)+',255))'
//                 );
//         }else if(top > perBlock*3 && top < perBlock*4) {

//             leftColor.css(
//                 'background-image',
//                 'linear-gradient(to right, rgb(0,255,255), rgb(0,255,'+parseInt(255-(255/(height/6)*top-255*3))+'))'
//                 );
//         }else if(top > perBlock*4 && top < perBlock*5) {

//             leftColor.css(
//                 'background-image',
//                 'linear-gradient(to right, rgb(0,255,0), rgb('+parseInt(255/(height/6)*top-255*4)+',255,0)'
//                 );
//         }else if(top > perBlock*5 && top < perBlock*6) {

//             leftColor.css(
//                 'background-image',
//                 'linear-gradient(to right, rgb(255,255,0), rgb(255,'+parseInt(255-(255/(height/6)*top-255*5))+',0)'
//                 );
//         }
//     }
// })


(function(angular) {

    angular.module('app',[])
        .controller('colorController',['$scope','$window','$document',function($scope,$window,$document) {
            $scope.rNum = 255;
            $scope.gNum = 0;
            $scope.bNum = 0;

            $scope.$watch('bNum',function() {
                if($scope.rNum <= 255 && $scope.gNum >= 0) {
                    $scope.setTop = {
                        'top':$scope.bNum*400/6/255+'px'
                        // 'top':$scope.rNum+'px'
                    }
                }
            })
            $scope.$watch('rNum',function() {
                if($scope.bNum == 255 && $scope.gNum == 0) {
                    $scope.setTop = {
                        'top':(255-$scope.rNum)*400/6/255+400/6+'px'
                        // 'top':$scope.rNum+'px'
                    }
                }
            })
            $scope.$watch('gNum',function() {
                if($scope.bNum == 255 && $scope.rNum == 0) {
                    $scope.setTop = {
                        'top':$scope.gNum*400/6/255+400/6*2+'px'
                        // 'top':$scope.rNum+'px'
                    }
                }
            })
            $scope.$watch('bNum',function() {
                if($scope.gNum == 255 && $scope.rNum == 0) {
                    $scope.setTop = {
                        'top':(255-$scope.bNum)*400/6/255+400/6*3+'px'
                        // 'top':$scope.rNum+'px'
                    }
                }
            })
            $scope.$watch('rNum',function() {
                if($scope.gNum == 255 && $scope.bNum == 0) {
                    $scope.setTop = {
                        'top':$scope.rNum*400/6/255+400/6*4+'px'
                        // 'top':$scope.rNum+'px'
                    }
                }
            })
            $scope.$watch('gNum',function() {
                if($scope.rNum == 255 && $scope.bNum == 0) {
                    $scope.setTop = {
                        'top':(255-$scope.gNum)*400/6/255+400/6*5+'px'
                        // 'top':$scope.rNum+'px'
                    }
                }
            })

            $scope.getRgb = function(event) {


                if(event.target.id !== 'con_center'){
                    return false;
                }
                $scope.setTop = {
                    'top':event.offsetY+'px'
                    // 'top':$scope.rNum+'px'
                }

                var top = event.offsetY;
                var perBlock = event.target.offsetHeight / 6;

                console.log(top)
                // console.log(perBlock)
                if(top >= 0 && top <= perBlock){

                    $scope.rNum = 255;
                    $scope.gNum = 0;
                    $scope.bNum = parseInt(255/perBlock*top);
                    $scope.setColor = {
                        'background-image':
                        'linear-gradient(to right, rgb(255,0,0), rgb(255,0,'+$scope.bNum+'))'
                    }



                }else if(top > perBlock && top < perBlock*2) {


                    $scope.rNum = parseInt(255-(255/perBlock*top-255));
                    $scope.gNum = 0;
                    $scope.bNum = 255;
                    $scope.setColor = {
                        'background-image':
                        'linear-gradient(to right, rgb(255,0,255), rgb('+$scope.rNum+',0,255))'
                        }
                }else if(top > perBlock*2 && top < perBlock*3) {

                    $scope.rNum = 0;
                    $scope.gNum = parseInt(255/perBlock*top-255*2);
                    $scope.bNum = 255;
                    $scope.setColor = {
                        'background-image':
                        'linear-gradient(to right, rgb(0,0,255), rgb(0,'+$scope.gNum+',255))'
                        };
                }else if(top > perBlock*3 && top < perBlock*4) {

                    $scope.rNum = 0;
                    $scope.gNum = 255;
                    $scope.bNum = parseInt(255-(255/perBlock*top-255*3));
                    $scope.setColor = {
                        'background-image':
                        'linear-gradient(to right, rgb(0,255,255), rgb(0,255,'+$scope.bNum+'))'
                        };
                }else if(top > perBlock*4 && top < perBlock*5) {

                    $scope.rNum = parseInt(255/perBlock*top-255*4);
                    $scope.gNum = 255;
                    $scope.bNum = 0;
                    $scope.setColor = {
                        'background-image':
                        'linear-gradient(to right, rgb(0,255,0), rgb('+$scope.rNum+',255,0)'
                        };
                }else if(top > perBlock*5 && top < perBlock*6) {
                    $scope.rNum = 255;
                    $scope.gNum = parseInt(255-(255/perBlock*top-255*5));
                    $scope.bNum = 0;
                    $scope.setColor = {
                        'background-image':
                        'linear-gradient(to right, rgb(255,255,0), rgb(255,'+$scope.gNum+',0)'
                        };
                }

            }

        }])
})(angular);

