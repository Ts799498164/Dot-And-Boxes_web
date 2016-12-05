
window.onload=function(){
     var main_body = document.getElementById("main_body");
     main_body.addEventListener('click',function(event){
          getDots(event.clientX,event.clientY);
     },false);
     
};

var getDots = function(clientX,clientY){
     var main_body = document.getElementById("main_body");
     var offset_Top = main_body.offsetTop+20,
         offset_Left = main_body.offsetLeft+20,
         dotX_array = [],     //x参考系
         dotY_array = [];     //y参考系
     for(var i = 0; i < 8; i++){
          dotX_array.push(offset_Top);
          offset_Top += 50 ;
     }
     for(i = 0; i < 8; i++){
          dotY_array.push(offset_Left);
          offset_Left += 50 ;
     }
     var x_line = getDot(clientY,dotX_array),     //行号数
         y_line = getDot(clientX,dotY_array);     //列号数
     if(typeof x_line == "number" && typeof y_line!= "number"){
          //位于行上
          console.log("hang"+x_line);
     }
     if(typeof y_line == "number"&&typeof x_line!= "number"){
          //位于列上
          console.log("lie"+y_line);
     }
     
     
};

var getDot = function(clientNumber,dotArray){
     for(var i=0,j=dotArray.length;i<j;i++){
          if(Math.abs(clientNumber-dotArray[i])<10){
               return i+1;
          }
     }
     return false;  //判断鼠标点击点是否为XY上
};
