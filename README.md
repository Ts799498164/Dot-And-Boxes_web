# Dot-And-Boxes-web
## 棋类博弈项目——点格棋网页实现项目  
***
### 首先我本想在网上找一下点格棋棋盘来节省页面DOM结构，但使用各大搜索引擎却始终找不到能符合我要求的点格棋棋盘，所以我使用Adobe Fireworks CS6做了一个简易的8 * 8点格棋棋盘（后期打算完善功能，可以通过页面交互选择6 * 6或者3 * 3等棋盘）。棋盘如下：  
![Image text](https://github.com/Ts799498164/Dot-And-Boxes-web-/blob/master/Checkerboard.png) 
  - - - -
### 在背景图片插入之后，我考虑实现鼠标点击事件后出现连线这一个交互效果。考虑过动态添加一个height为1个像素的小盒子实现，后来决定通过添加盒子和动态添加盒子的border属性实现这一效果。如下图所示：    
![Image text](https://github.com/Ts799498164/image-folder/blob/master/Checkerboard1.png)   
### 如图所示，向8 * 8棋盘里添加64个盒子div。我打算通过只添加盒子的左边界和上边界来实现点击连线的功能。这样的好处是避免了繁琐的判断，封装一个简单函数即可。  
  - - - -     
### 使用原生javascript成功实现了点击事件确定鼠标点击点位于棋盘的哪一行哪一列，在控制台中测试成功，如下所示：
![Image text](https://github.com/Ts799498164/image-folder/blob/master/Checkerboard3.png)  
  - - - -
### 在点击事件确立所点击的点之后，添加线条的过程中出现了一个问题，通过先定义边框这样动态修改边框时就不会发生盒子位置的变化，所以我开始在盒子css写：  
`border ： 2px solid #FFF；`  
### 也就是通过先定义白色边框,然后点击时动态修改颜色，但是我发现白色边框会覆盖背景棋盘，显得非常浅，如下图所示
![Image text](https://github.com/Ts799498164/Dot-And-Boxes_web/blob/master/images/white.png)   
### 发现问题之后，通过查资料，我发现图片透明化就可以避免这个问题，于是我把代码改成这样：
`border ： 2px solid transparent；` 
### 修改之后证实可以解决这个问题，如图所示：
![Image text](https://github.com/Ts799498164/Dot-And-Boxes_web/blob/master/images/transparent.png)   
  - - - - 
### 实现连线之后通过判断语句实现包围添加背景和添加玩家判断语句的js编写，完成了棋盘的大致逻辑：
![Image text](https://github.com/Ts799498164/Dot-And-Boxes_web/blob/master/images/1.png)   
![Image text](https://github.com/Ts799498164/Dot-And-Boxes_web/blob/master/images/2.png)   
  - - - - 
### 优化游戏结束的提醒页面，如下：
![Image text](https://github.com/Ts799498164/Dot-And-Boxes_web/blob/master/images/3.png)   
![Image text](https://github.com/Ts799498164/Dot-And-Boxes_web/blob/master/images/4.png)   
  - - - - 
   
      
       
       
        
        
### To be continued.




