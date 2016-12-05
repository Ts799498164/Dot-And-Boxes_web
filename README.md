# Dot-And-Boxes-web
## 棋类博弈项目——点格棋网页实现项目  
***
首先我本想在网上找一下点格棋棋盘来节省页面DOM结构，但使用各大搜索引擎却始终找不到能符合我要求的点格棋棋盘，所以我使用Adobe Fireworks CS6做了一个简易的8 * 8点格棋棋盘（后期打算完善功能，可以通过页面交互选择6 * 6或者3 * 3等棋盘）。棋盘如下：  

![Image text](https://github.com/Ts799498164/Dot-And-Boxes-web-/blob/master/Checkerboard.png)
  
  - - - -
在背景图片插入之后，我考虑实现鼠标点击事件后出现连线这一个交互效果。考虑过动态添加一个height为1个像素的小盒子实现，后来决定通过添加盒子和动态添加盒子的border属性实现这一效果。如下图所示：    
![Image text](https://github.com/Ts799498164/image-folder/blob/master/Checkerboard1.png)   
如图所示，向8 * 8棋盘里添加64个盒子div。我打算通过只添加盒子的左边界和上边界来实现点击连线的功能。这样的好处是避免了繁琐的判断，封装一个简单函数即可。  
- - - -
  
      
使用原生javascript成功实现了点击事件确定鼠标点击点位于棋盘的哪一行哪一列，在控制台中测试成功，如下所示：
![Image text](https://github.com/Ts799498164/image-folder/blob/master/Checkerboard3.png)


### To be continued.



