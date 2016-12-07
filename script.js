
window.onload=function(){
     var main_body = document.getElementById("main_body"),
         playDom1 = document.getElementById("play1"),
         playDom2 = document.getElementById("play2"),
         win = document.getElementById("win"),
         dotsArray = [],
         play=0,
         play1=0,
         play2=0,
         i,j=0,
         box,dot;
     main_body.addEventListener('click',function(event){
          var color = (play%2==0) ? '#ff8c00' : '#4593fd';
          dot = getDots(event.clientX,event.clientY);
          if(dot>0&&!isInArray(dot,dotsArray)){
               var oneBit = dot%10,
                   lie = (dot-oneBit)/10%10,
                   hang = (dot-oneBit-10*lie)/100;
               box = document.getElementById(hang*10+lie);
               dotsArray.push(dot);
               if(oneBit==1){
                    box.style.borderTop = "2px solid  "+color;
               }else{
                    box.style.borderLeft = "2px solid  "+color;
               }
               i=isSurround(dotsArray,play);
               if(!i){
                    play++;
               }else{
                    if(play%2==0){
                         play1+=i;  
                    }else{
                         play2+=i;    
                    }
                    playDom1.innerHTML = play1+'个';
                    playDom2.innerHTML = play2+'个';
                    if((play1>=25&&j==0)||(play2>=25&&j==0)){
                         j++;
                         i = (play1>=25)?1:2;
                         win.getElementsByTagName('p')[0].innerHTML="获胜者：选手"+i;
                         win.style.display="block";
                         win.addEventListener('click',function(event){
                              if(event.target.id=='confirm'){
                                   win.style.display="none";
                              }
                              if(event.target.id=='reset'){
                                   document.location.reload();
                              }    
                         },false);
                    }
               };    
          }
     },false);



};
/*获取点击点*/
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
     if(typeof x_line == "number"){
          //位于行上
          for(i=0,j=dotY_array.length-1;i<j;i++){
               if(clientX-dotY_array[i]>0&&clientX-dotY_array[i]<48){
                    return x_line*100+(i+1)*10+1; 
                    //百位表示行数，十位表示列数，个位1表示要在上边界作用
               }
          }  
     }
     if(typeof y_line == "number"){
          //位于列上
          for(i=0,j=dotX_array.length-1;i<j;i++){
               if(clientY-dotX_array[i]>0&&clientY-dotX_array[i]<48){
                    return (i+1)*100+y_line*10+2;
                    //百位表示行数，十位表示列数，个位2表示要在左边界作用
               }
          }     
     }
     return -1; 
};
/*在已经点击到列上或行上后获取位于i+1个点和i+2个点之间*/
var getDot = function(clientNumber,dotArray){
     for(var i=0,j=dotArray.length;i<j;i++){
          if(Math.abs(clientNumber-dotArray[i])<16){
               return i+1;
          }
     }
     return false;  
};
/*判断是否在数组里*/
var isInArray = function(dot,arr){
     for(var i=0,j=arr.length;i<j;i++){
          if(arr[i]==dot){
               return true;
          }
     }
     return false;    
};
/*判断是否可以形成全包围，如果能，则计数形成几个，返回数值*/
var isSurround = function(arr,play){
     var dot = arr[arr.length-1],
         oneBit = dot%10,
         lie = (dot-oneBit)/10%10,
         hang = (dot-oneBit-10*lie)/100,
         i=0;
     var color = (play%2==0) ? '#f5b481' : '#47eeee';
     if(oneBit==1){ 
          if( isInArray((hang-1)*100+lie*10+1,arr)&&isInArray((hang-1)*100+lie*10+2,arr)&&isInArray((hang-1)*100+(lie+1)*10+2,arr)){
               document.getElementById((hang-1)*10+lie).style.background=color;
               i++;
          }
          if(isInArray((hang+1)*100+lie*10+1,arr)&&isInArray(hang*100+lie*10+2,arr)&&isInArray(hang*100+(lie+1)*10+2,arr)){
               document.getElementById(hang*10+lie).style.background=color;
               i++;
          }   
     }else{
          if( isInArray(hang*100+(lie-1)*10+1,arr)&&isInArray(hang*100+(lie-1)*10+2,arr)&&isInArray((hang+1)*100+(lie-1)*10+1,arr)){
               document.getElementById(hang*10+lie-1).style.background=color;
               i++;
          }
          if(isInArray(hang*100+lie*10+1,arr)&&isInArray(hang*100+(lie+1)*10+2,arr)&&isInArray((hang+1)*100+lie*10+1,arr)){
               document.getElementById(hang*10+lie).style.background=color;
               i++;
          } 
     }
    return i;
}
