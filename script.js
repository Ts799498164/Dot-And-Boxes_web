/**
 * @author tanshen
 * @Tel 18538688990
 * 2017/02/10
 */

window.onload = function() {
    var main_body = document.getElementById("main_body"),
        playDom1 = document.getElementById("play1"),
        playDom2 = document.getElementById("play2"),
        win = document.getElementById("win"),
        go_back = document.getElementById("go_back"),
        reset_bar = document.getElementById("reset_bar"),
        hideLog = document.getElementById("hideLog"),
        tips = document.getElementById("tips"),
        dotsArray = [],
        play = 0,
        play1 = 0,
        play2 = 0,
        getPlay = 0,
        i = 0,
        j = 0,
        z = 0,
        h = 0,
        box, box1, dot, timer, flag = false,
        count = 3,
        color1 = '#4593fd',
        color = '#ff8c00',
        leftPosition = 0;
        addEvent(hideLog,'mouseenter',function(){
          clearInterval(timer);
          timer = setInterval(function(){
            if(leftPosition<412){
              leftPosition += 4;
            }else{
              clearInterval(timer);
            }
            hideLog.style.left = leftPosition+'px';
          },1);
        })
        addEvent(hideLog,'mouseleave',function(){
          clearInterval(timer);
          timer = setInterval(function(){
            if(leftPosition>2){
              leftPosition -= 4;
            }else{
              clearInterval(timer);
            }
            hideLog.style.left = leftPosition+'px';
          },1);
        })
        addEvent(go_back,'click',function(){
          if (count > 0) {
              if (dotsArray.length > 0) {
                  var lastDot = dotsArray.pop(),
                      oneBit1 = lastDot % 10,
                      lie1 = (lastDot - oneBit1) / 10 % 10,
                      hang1 = (lastDot - oneBit1 - 10 * lie1) / 100,
                      box1 = document.getElementById(hang1 * 10 + lie1),
                      getPlay = 0;
                  if (oneBit1 == 1) {
                      if (box1.style.borderTop == "2px solid rgb(255, 140, 0)") {
                          getPlay1 = 1;
                      } else if (box1.style.borderTop == "2px solid rgb(69, 147, 253)") {
                          getPlay1 = 2;
                      }
                  } else {
                      if (box1.style.borderLeft == "2px solid rgb(255, 140, 0)") {
                          getPlay1 = 1;
                      } else if (box1.style.borderLeft == "2px solid rgb(69, 147, 253)") {
                          getPlay1 = 2;
                      }
                  }
                  dotsArray.push(lastDot);
                  if (getPlay1 == 1) {
                      play1 -= goBack(dotsArray) + 1;
                  } else {
                      play2 -= goBack(dotsArray);
                      play1 -= goBack(dotsArray);
                  }
                  playDom1.innerHTML = play1 + '个';
                  playDom2.innerHTML = play2 + '个';
                  count--;
                  go_back.innerHTML = "悔棋(剩余" + count + "次)";
                  if(count==0){
                    go_back.style.border = '2px solid #CCC';
                  }
              }
          }
        });
        addEvent(reset_bar,'click',function(){
          document.location.reload();
        });
        addEvent(main_body,'click',function(event){
          event = event || window.event;
          /*人下*/
          if (play == 0) {
              dot = getDots(event.clientX, event.clientY);
              if (dot > 0 && !isInArray(dot, dotsArray) && z == 0) {
                  var oneBit = dot % 10,
                      lie = (dot - oneBit) / 10 % 10,
                      hang = (dot - oneBit - 10 * lie) / 100;
                  box = document.getElementById(hang * 10 + lie);
                  dotsArray.push(dot);
                  if (oneBit == 1) {
                      box.style.borderTop = "2px solid  " + color;
                  } else {
                      box.style.borderLeft = "2px solid  " + color;
                  }
                  i = isSurround(dotsArray, play);
                  if (!i) {
                      play = 1;
                  } else {
                      play1 += i;
                  }
              };
          }
          /*机器下*/
          while (play == 1) {
              var i1 = autoChoose();
              i = isSurround(dotsArray, play);
              if (i && i1) {
                  play2 += i;
              } else {
                  play = 0;
              }
          }
          playDom1.innerHTML = play1 + '个';
          playDom2.innerHTML = play2 + '个';
          if (play1 + play2 ==49) {
              if(play1>play2){
                win.getElementsByTagName('p')[0].innerHTML = "你赢了";
              }else if(play1<play2){
                win.getElementsByTagName('p')[0].innerHTML = "你输了";
              }else{
                win.getElementsByTagName('p')[0].innerHTML = "平局";
              }
              
              win.style.display = "block";
              win.addEventListener('click', function(event) {
                  if (event.target.id == 'confirm') {
                      win.style.display = "none";
                  }
                  if (event.target.id == 'reset') {
                      document.location.reload();
                  }
              }, false);
          }
        });
    /*机器选择着点*/
    function autoChoose() {
        for (var x1 = 0; x1 < dotsArray.length; x1++) {
            var z1 = dotsArray[x1],
                oneBit1 = z1 % 10,
                lie1 = (z1 - oneBit1) / 10 % 10,
                hang1 = (z1 - oneBit1 - 10 * lie1) / 100;
            if (oneBit1 == 1) {
                if (isInArray(((hang1 - 1) * 100 + lie1 * 10 + 2), dotsArray)) { /*上面的矩阵是否可以围成*/
                    if (isInArray(((hang1 - 1) * 100 + lie1 * 10 + 1), dotsArray) && !isInArray(((hang1 - 1) * 100 + (lie1 + 1) * 10 + 2), dotsArray)) {
                        dotsArray.push((hang1 - 1) * 100 + (lie1 + 1) * 10 + 2);
                        box1 = document.getElementById((hang1 - 1) * 10 + lie1 + 1);
                        box1.style.borderLeft = "2px solid  " + color1;
                        return 1;
                    } else if (isInArray(((hang1 - 1) * 100 + (lie1 + 1) * 10 + 2), dotsArray) && !isInArray(((hang1 - 1) * 100 + lie1 * 10 + 1), dotsArray)) {
                        dotsArray.push((hang1 - 1) * 100 + lie1 * 10 + 1);
                        box1 = document.getElementById((hang1 - 1) * 10 + lie1);
                        box1.style.borderTop = "2px solid  " + color1;
                        return 1;
                    }
                } else if (isInArray(((hang1 - 1) * 100 + (lie1 + 1) * 10 + 2), dotsArray) && isInArray(((hang1 - 1) * 100 + lie1 * 10 + 1), dotsArray)) {
                    dotsArray.push((hang1 - 1) * 100 + lie1 * 10 + 2);
                    box1 = document.getElementById((hang1 - 1) * 10 + lie1);
                    box1.style.borderLeft = "2px solid  " + color1;
                    return 1;
                }
                if (isInArray((hang1 * 100 + lie1 * 10 + 2), dotsArray)) { /*下面的矩阵是否可以围成*/
                    if (isInArray(((hang1 + 1) * 100 + lie1 * 10 + 1), dotsArray) && !isInArray((hang1 * 100 + (lie1 + 1) * 10 + 2), dotsArray)) {
                        dotsArray.push(hang1 * 100 + (lie1 + 1) * 10 + 2);
                        box1 = document.getElementById(hang1 * 10 + lie1 + 1);
                        box1.style.borderLeft = "2px solid  " + color1;
                        return 1;
                    } else if (isInArray((hang1 * 100 + (lie1 + 1) * 10 + 2), dotsArray) && !isInArray(((hang1 + 1) * 100 + lie1 * 10 + 1), dotsArray)) {
                        dotsArray.push((hang1 + 1) * 100 + lie1 * 10 + 1);
                        box1 = document.getElementById((hang1 + 1) * 10 + lie1);
                        box1.style.borderTop = "2px solid  " + color1;
                        return 1;
                    }
                }
            }
        }
        /*没有可以围成死格的情况1:有饱和度为0的格*/
        for (x1 = 1; x1 < 8; x1++) {
            for (var y1 = 1; y1 < 8; y1++) {
                if (!isInArray((x1 * 100 + y1 * 10 + 1), dotsArray)) {
                    if (!isInArray((x1 * 100 + y1 * 10 + 2), dotsArray)) {
                        if (!isInArray(((x1 + 1) * 100 + y1 * 10 + 1), dotsArray)) {
                            if (!isInArray((x1 * 100 + (y1 + 1) * 10 + 2), dotsArray)) {
                                var t = 0,
                                    t1 = 0,
                                    t2 = 0,
                                    t3 = 0,
                                    t4 = 0,
                                    dot1 = x1 * 100 + y1 * 10 + 1,
                                    dot2 = x1 * 100 + y1 * 10 + 2,
                                    dot3 = (x1 + 1) * 100 + y1 * 10 + 1,
                                    dot4 = x1 * 100 + (y1 + 1) * 10 + 2;
                                var dotA = autoInsert(dot1, dotsArray),
                                    dotB = autoInsert(dot2, dotsArray),
                                    dotC = autoInsert(dot3, dotsArray),
                                    dotD = autoInsert(dot4, dotsArray);
                                if (dotA == Math.min(dotA, dotB, dotC, dotD)) {
                                    var dot11 = (x1 - 1) * 100 + y1 * 10 + 2,
                                        dot12 = (x1 - 1) * 100 + y1 * 10 + 1,
                                        dot13 = (x1 - 1) * 100 + (y1 + 1) * 10 + 2;
                                    var s = autoDes(dot1, dot11, dot12, dot13, dotsArray);
                                    if (!s) {
                                        t1 = 1;
                                    }
                                }
                                if (dotB == Math.min(dotA, dotB, dotC, dotD)) {
                                    var dot21 = x1 * 100 + (y1 - 1) * 10 + 1,
                                        dot22 = x1 * 100 + (y1 - 1) * 10 + 2,
                                        dot23 = (x1 + 1) * 100 + (y1 - 1) * 10 + 1;
                                    var s = autoDes(dot2, dot21, dot22, dot23, dotsArray);
                                    if (!s) {
                                        t2 = 1;
                                    }
                                }
                                if (dotC == Math.min(dotA, dotB, dotC, dotD)) {
                                    var dot31 = (x1 + 1) * 100 + y1 * 10 + 2,
                                        dot32 = (x1 + 2) * 100 + y1 * 10 + 1,
                                        dot33 = (x1 + 1) * 100 + (y1 + 1) * 10 + 2;
                                    var s = autoDes(dot3, dot31, dot32, dot33, dotsArray);
                                    if (!s) {
                                        t3 = 1;
                                    }
                                }
                                if (dotD == Math.min(dotA, dotB, dotC, dotD)) {
                                    var dot41 = x1 * 100 + (y1 + 1) * 10 + 1,
                                        dot42 = x1 * 100 + (y1 + 2) * 10 + 2,
                                        dot43 = (x1 + 1) * 100 + (y1 + 1) * 10 + 1;
                                    var s = autoDes(dot4, dot41, dot42, dot43, dotsArray);
                                    if (!s) {
                                        t4 = 1;
                                    }
                                }
                                if (t1 == 1 && t2 != 1 && t3 != 1 && t4 != 1) {
                                    t = 1;
                                }
                                if (t1 != 1 && t2 == 1 && t3 != 1 && t4 != 1) {
                                    t = 2;
                                }
                                if (t1 != 1 && t2 != 1 && t3 == 1 && t4 != 1) {
                                    t = 3;
                                }
                                if (t1 != 1 && t2 != 1 && t3 != 1 && t4 == 1) {
                                    t = 4;
                                }
                                if (t1 == 1 && t2 == 1 && t3 != 1 && t4 != 1) {
                                    t = Math.floor(Math.random() * 2 + 1);
                                }
                                if (t1 == 1 && t2 != 1 && t3 == 1 && t4 != 1) {
                                    t = Math.floor(Math.random() * 2 + 1);
                                    if (t == 2) {
                                        t = 3;
                                    }
                                }
                                if (t1 == 1 && t2 != 1 && t3 != 1 && t4 == 1) {
                                    t = Math.floor(Math.random() * 2 + 1);
                                    if (t == 2) {
                                        t = 4;
                                    }
                                }
                                if (t1 != 1 && t2 == 1 && t3 == 1 && t4 != 1) {
                                    t = Math.floor(Math.random() * 2 + 2);
                                }
                                if (t1 != 1 && t2 == 1 && t3 != 1 && t4 == 1) {
                                    t = Math.floor(Math.random() * 2 + 2);
                                    if (t == 3) {
                                        t = 4;
                                    }
                                }
                                if (t1 != 1 && t2 != 1 && t3 == 1 && t4 == 1) {
                                    t = Math.floor(Math.random() * 2 + 3);
                                }
                                if (t1 == 1 && t2 == 1 && t3 == 1 && t4 != 1) {
                                    t = Math.floor(Math.random() * 3 + 1);
                                }
                                if (t1 == 1 && t2 == 1 && t3 != 1 && t4 == 1) {
                                    t = Math.floor(Math.random() * 3 + 1);
                                    if (t == 3) {
                                        t = 4;
                                    }
                                }
                                if (t1 == 1 && t2 != 1 && t3 == 1 && t4 == 1) {
                                    t = Math.floor(Math.random() * 3 + 2);
                                    if (t == 2) {
                                        t = 1;
                                    }
                                }
                                if (t1 != 1 && t2 == 1 && t3 == 1 && t4 == 1) {
                                    t = Math.floor(Math.random() * 3 + 2);
                                }
                                if (t1 == 1 && t2 == 1 && t3 == 1 && t4 == 1) {
                                    t = Math.floor(Math.random() * 4 + 1);
                                }
                                if (t4 != 1 && t2 != 1 && t3 != 1 && t1 != 1) {
                                    continue;
                                }
                                switch (t) {
                                    case 1:
                                        box1 = document.getElementById((x1) * 10 + y1);
                                        box1.style.borderTop = "2px solid  " + color1;
                                        dotsArray.push(dot1);
                                        autoInsert(dot1, dotsArray);
                                        break;
                                    case 2:
                                        box1 = document.getElementById((x1) * 10 + y1);
                                        box1.style.borderLeft = "2px solid  " + color1;
                                        dotsArray.push(dot2);
                                        autoInsert(dot2, dotsArray);
                                        break;
                                    case 3:
                                        box1 = document.getElementById((x1 + 1) * 10 + y1);
                                        box1.style.borderTop = "2px solid  " + color1;
                                        dotsArray.push(dot3);
                                        autoInsert(dot3, dotsArray);
                                        break;
                                    case 4:
                                        box1 = document.getElementById((x1) * 10 + y1 + 1);
                                        box1.style.borderLeft = "2px solid  " + color1;
                                        dotsArray.push(dot4);
                                        autoInsert(dot4, dotsArray);
                                        break;
                                }
                                return 0;
                            }
                        }
                    }
                }
            }
        }
        /*没有可以围成死格的情况2:没有饱和度为0的格，但有饱和度为1的格*/
        for (x1 = 1; x1 < 8; x1++) {
            for (y1 = 1; y1 < 8; y1++) {
                if (isInArray((x1 * 100 + y1 * 10 + 1), dotsArray) && !isInArray((x1 * 100 + y1 * 10 + 2), dotsArray) && !isInArray(((x1 + 1) * 100 + y1 * 10 + 1), dotsArray) && !isInArray((x1 * 100 + (y1 + 1) * 10 + 2), dotsArray)) {
                    var t = 0,
                        t2 = 0,
                        t3 = 0,
                        t4 = 0,
                        dot2 = x1 * 100 + y1 * 10 + 2,
                        dot3 = (x1 + 1) * 100 + y1 * 10 + 1,
                        dot4 = x1 * 100 + (y1 + 1) * 10 + 2;
                    var dotB = autoInsert(dot2, dotsArray),
                        dotC = autoInsert(dot3, dotsArray),
                        dotD = autoInsert(dot4, dotsArray);
                    if (dotB == Math.min(dotB, dotC, dotD) && y1 > 1) {
                        var dot21 = x1 * 100 + (y1 - 1) * 10 + 1,
                            dot22 = x1 * 100 + (y1 - 1) * 10 + 2,
                            dot23 = (x1 + 1) * 100 + (y1 - 1) * 10 + 1;
                        var s = autoDes(dot2, dot21, dot22, dot23, dotsArray);
                        if (!s) {
                            t2 = 1;
                        }
                    }
                    if (dotC == Math.min(dotB, dotC, dotD)) {
                        var dot31 = (x1 + 1) * 100 + y1 * 10 + 2,
                            dot32 = (x1 + 2) * 100 + y1 * 10 + 1,
                            dot33 = (x1 + 1) * 100 + (y1 + 1) * 10 + 2;
                        var s = autoDes(dot3, dot31, dot32, dot33, dotsArray);
                        if (!s) {
                            t3 = 1;
                        }
                    }
                    if (dotD == Math.min(dotB, dotC, dotD)) {
                        var dot41 = x1 * 100 + (y1 + 1) * 10 + 1,
                            dot42 = x1 * 100 + (y1 + 2) * 10 + 2,
                            dot43 = (x1 + 1) * 100 + (y1 + 1) * 10 + 1;
                        var s = autoDes(dot4, dot41, dot42, dot43, dotsArray);
                        if (!s) {
                            t4 = 1;
                        }
                    }
                    if (t2 == 1 && t3 != 1 && t4 != 1) {
                        t = 2;
                    }
                    if (t2 != 1 && t3 == 1 && t4 != 1) {
                        t = 3;
                    }
                    if (t2 != 1 && t3 != 1 && t4 == 1) {
                        t = 4;
                    }
                    if (t2 == 1 && t3 == 1 && t4 != 1) {
                        t = Math.floor(Math.random() * 2 + 2);
                    }
                    if (t2 == 1 && t3 != 1 && t4 == 1) {
                        t = Math.floor(Math.random() * 2 + 2);
                        if (t == 3) {
                            t = 4;
                        }
                    }
                    if (t2 != 1 && t3 == 1 && t4 == 1) {
                        t = Math.floor(Math.random() * 2 + 3);
                    }
                    if (t2 == 1 && t3 == 1 && t4 == 1) {
                        t = Math.floor(Math.random() * 3 + 2);
                    }
                    if (t4 != 1 && t2 != 1 && t3 != 1) {
                        continue;
                    }
                    switch (t) {
                        case 2:
                            box1 = document.getElementById((x1) * 10 + y1);
                            box1.style.borderLeft = "2px solid  " + color1;
                            dotsArray.push(dot2);
                            autoInsert(dot2, dotsArray);
                            break;
                        case 3:
                            box1 = document.getElementById((x1 + 1) * 10 + y1);
                            box1.style.borderTop = "2px solid  " + color1;
                            dotsArray.push(dot3);
                            autoInsert(dot3, dotsArray);
                            break;
                        case 4:
                            box1 = document.getElementById((x1) * 10 + y1 + 1);
                            box1.style.borderLeft = "2px solid  " + color1;
                            dotsArray.push(dot4);
                            autoInsert(dot4, dotsArray);
                            break;
                    }
                    return 0;
                }
                if (!isInArray((x1 * 100 + y1 * 10 + 1), dotsArray) && isInArray((x1 * 100 + y1 * 10 + 2), dotsArray) && !isInArray(((x1 + 1) * 100 + y1 * 10 + 1), dotsArray) && !isInArray((x1 * 100 + (y1 + 1) * 10 + 2), dotsArray)) {
                    var t = 0,
                        t1 = 0,
                        t3 = 0,
                        t4 = 0,
                        dot1 = x1 * 100 + y1 * 10 + 1,
                        dot3 = (x1 + 1) * 100 + y1 * 10 + 1,
                        dot4 = x1 * 100 + (y1 + 1) * 10 + 2;
                    var dotA = autoInsert(dot1, dotsArray),
                        dotC = autoInsert(dot3, dotsArray),
                        dotD = autoInsert(dot4, dotsArray);
                    if (dotA == Math.min(dotA, dotC, dotD)) {
                        var dot11 = (x1 - 1) * 100 + y1 * 10 + 2,
                            dot12 = (x1 - 1) * 100 + y1 * 10 + 1,
                            dot13 = (x1 - 1) * 100 + (y1 + 1) * 10 + 2;
                        var s = autoDes(dot1, dot11, dot12, dot13, dotsArray);
                        if (!s) {
                            t1 = 1;
                        }
                    }
                    if (dotC == Math.min(dotA, dotC, dotD)) {
                        var dot31 = (x1 + 1) * 100 + y1 * 10 + 2,
                            dot32 = (x1 + 2) * 100 + y1 * 10 + 1,
                            dot33 = (x1 + 1) * 100 + (y1 + 1) * 10 + 2;
                        var s = autoDes(dot3, dot31, dot32, dot33, dotsArray);
                        if (!s) {
                            t3 = 1;
                        }
                    }
                    if (dotD == Math.min(dotA, dotC, dotD)) {
                        var dot41 = x1 * 100 + (y1 + 1) * 10 + 1,
                            dot42 = x1 * 100 + (y1 + 2) * 10 + 2,
                            dot43 = (x1 + 1) * 100 + (y1 + 1) * 10 + 1;
                        var s = autoDes(dot4, dot41, dot42, dot43, dotsArray);
                        if (!s) {
                            t4 = 1;
                        }
                    }
                    if (t1 == 1 && t3 != 1 && t4 != 1) {
                        t = 1;
                    }
                    if (t1 != 1 && t3 == 1 && t4 != 1) {
                        t = 3;
                    }
                    if (t1 != 1 && t3 != 1 && t4 == 1) {
                        t = 4;
                    }
                    if (t1 == 1 && t3 == 1 && t4 != 1) {
                        t = Math.floor(Math.random() * 2 + 1);
                        if (t == 2) {
                            t = 3;
                        }
                    }
                    if (t1 == 1 && t3 != 1 && t4 == 1) {
                        t = Math.floor(Math.random() * 2 + 1);
                        if (t == 2) {
                            t = 4;
                        }
                    }
                    if (t1 != 1 && t3 == 1 && t4 == 1) {
                        t = Math.floor(Math.random() * 2 + 3);
                    }
                    if (t1 == 1 && t3 == 1 && t4 == 1) {
                        t = Math.floor(Math.random() * 3 + 2);
                        if (t == 2) {
                            t = 1;
                        }
                    }
                    if (t1 != 1 && t3 != 1 && t4 != 1) {
                        continue;
                    }
                    switch (t) {
                        case 1:
                            box1 = document.getElementById((x1) * 10 + y1);
                            box1.style.borderTop = "2px solid  " + color1;
                            dotsArray.push(dot1);
                            autoInsert(dot1, dotsArray);
                            break;
                        case 3:
                            box1 = document.getElementById((x1 + 1) * 10 + y1);
                            box1.style.borderTop = "2px solid  " + color1;
                            dotsArray.push(dot3);
                            autoInsert(dot3, dotsArray);
                            break;
                        case 4:
                            box1 = document.getElementById((x1) * 10 + y1 + 1);
                            box1.style.borderLeft = "2px solid  " + color1;
                            dotsArray.push(dot4);
                            autoInsert(dot4, dotsArray);
                            break;
                    }
                    return 0;
                }
                if (!isInArray((x1 * 100 + y1 * 10 + 1), dotsArray) && !isInArray((x1 * 100 + y1 * 10 + 2), dotsArray) && isInArray(((x1 + 1) * 100 + y1 * 10 + 1), dotsArray) && !isInArray((x1 * 100 + (y1 + 1) * 10 + 2), dotsArray)) {
                    var t = 0,
                        t1 = 0,
                        t2 = 0,
                        t4 = 0,
                        dot1 = x1 * 100 + y1 * 10 + 1,
                        dot2 = x1 * 100 + y1 * 10 + 2,
                        dot4 = x1 * 100 + (y1 + 1) * 10 + 2;
                    var dotA = autoInsert(dot1, dotsArray),
                        dotB = autoInsert(dot2, dotsArray),
                        dotD = autoInsert(dot4, dotsArray);
                    if (dotA == Math.min(dotA, dotB, dotD)) {
                        var dot11 = (x1 - 1) * 100 + y1 * 10 + 2,
                            dot12 = (x1 - 1) * 100 + y1 * 10 + 1,
                            dot13 = (x1 - 1) * 100 + (y1 + 1) * 10 + 2;
                        var s = autoDes(dot1, dot11, dot12, dot13, dotsArray);
                        if (!s) {
                            t1 = 1;
                        }
                    }
                    if (dotB == Math.min(dotA, dotB, dotD)) {
                        var dot21 = x1 * 100 + (y1 - 1) * 10 + 1,
                            dot22 = x1 * 100 + (y1 - 1) * 10 + 2,
                            dot23 = (x1 + 1) * 100 + (y1 - 1) * 10 + 1;
                        var s = autoDes(dot2, dot21, dot22, dot23, dotsArray);
                        if (!s) {
                            t2 = 1;
                        }
                    }
                    if (dotD == Math.min(dotA, dotB, dotD)) {
                        var dot41 = x1 * 100 + (y1 + 1) * 10 + 1,
                            dot42 = x1 * 100 + (y1 + 2) * 10 + 2,
                            dot43 = (x1 + 1) * 100 + (y1 + 1) * 10 + 1;
                        var s = autoDes(dot4, dot41, dot42, dot43, dotsArray);
                        if (!s) {
                            t4 = 1;
                        }
                    }
                    if (t1 == 1 && t2 != 1 && t4 != 1) {
                        t = 1;
                    }
                    if (t1 != 1 && t2 == 1 && t4 != 1) {
                        t = 2;
                    }
                    if (t1 != 1 && t2 != 1 && t4 == 1) {
                        t = 4;
                    }
                    if (t1 == 1 && t2 == 1 && t4 != 1) {
                        t = Math.floor(Math.random() * 2 + 1);
                    }
                    if (t1 == 1 && t2 != 1 && t4 == 1) {
                        t = Math.floor(Math.random() * 2 + 1);
                        if (t == 2) {
                            t = 4;
                        }
                    }
                    if (t1 != 1 && t2 == 1 && t4 == 1) {
                        t = Math.floor(Math.random() * 2 + 2);
                        if (t == 3) {
                            t = 2;
                        }
                    }
                    if (t1 == 1 && t2 == 1 && t4 == 1) {
                        t = Math.floor(Math.random() * 3 + 1);
                        if (t == 3) {
                            t = 4;
                        }
                    }
                    if (t1 != 1 && t2 != 1 && t4 != 1) {
                        continue;
                    }
                    switch (t) {
                        case 1:
                            box1 = document.getElementById((x1) * 10 + y1);
                            box1.style.borderTop = "2px solid  " + color1;
                            dotsArray.push(dot1);
                            autoInsert(dot1, dotsArray);
                            break;
                        case 2:
                            box1 = document.getElementById((x1) * 10 + y1);
                            box1.style.borderLeft = "2px solid  " + color1;
                            dotsArray.push(dot2);
                            autoInsert(dot2, dotsArray);
                            break;
                        case 4:
                            box1 = document.getElementById((x1) * 10 + y1 + 1);
                            box1.style.borderLeft = "2px solid  " + color1;
                            dotsArray.push(dot4);
                            autoInsert(dot4, dotsArray);
                            break;
                    }
                    return 0;
                }
                if (!isInArray((x1 * 100 + y1 * 10 + 1), dotsArray) && !isInArray((x1 * 100 + y1 * 10 + 2), dotsArray) && !isInArray(((x1 + 1) * 100 + y1 * 10 + 1), dotsArray) && isInArray((x1 * 100 + (y1 + 1) * 10 + 2), dotsArray)) {
                    var t = 0,
                        t1 = 0,
                        t2 = 0,
                        t3 = 0,
                        dot1 = x1 * 100 + y1 * 10 + 1,
                        dot2 = x1 * 100 + y1 * 10 + 2,
                        dot3 = (x1 + 1) * 100 + y1 * 10 + 1;
                    var dotA = autoInsert(dot1, dotsArray),
                        dotB = autoInsert(dot2, dotsArray),
                        dotC = autoInsert(dot3, dotsArray);
                    if (dotA == Math.min(dotA, dotB, dotC)) {
                        var dot11 = (x1 - 1) * 100 + y1 * 10 + 2,
                            dot12 = (x1 - 1) * 100 + y1 * 10 + 1,
                            dot13 = (x1 - 1) * 100 + (y1 + 1) * 10 + 2;
                        var s = autoDes(dot1, dot11, dot12, dot13, dotsArray);
                        if (!s) {
                            t1 = 1;
                        }
                    }
                    if (dotB == Math.min(dotA, dotB, dotC)) {
                        var dot21 = x1 * 100 + (y1 - 1) * 10 + 1,
                            dot22 = x1 * 100 + (y1 - 1) * 10 + 2,
                            dot23 = (x1 + 1) * 100 + (y1 - 1) * 10 + 1;
                        var s = autoDes(dot2, dot21, dot22, dot23, dotsArray);
                        if (!s) {
                            t2 = 1;
                        }
                    }
                    if (dotC == Math.min(dotA, dotB, dotC)) {
                        var dot31 = (x1 + 1) * 100 + y1 * 10 + 2,
                            dot32 = (x1 + 2) * 100 + y1 * 10 + 1,
                            dot33 = (x1 + 1) * 100 + (y1 + 1) * 10 + 2;
                        var s = autoDes(dot3, dot31, dot32, dot33, dotsArray);
                        if (!s) {
                            t3 = 1;
                        }
                    }
                    if (t1 == 1 && t2 != 1 && t3 != 1) {
                        t = 1;
                    }
                    if (t1 != 1 && t2 == 1 && t3 != 1) {
                        t = 2;
                    }
                    if (t1 != 1 && t2 != 1 && t3 == 1) {
                        t = 3;
                    }
                    if (t1 == 1 && t2 == 1 && t3 != 1) {
                        t = Math.floor(Math.random() * 2 + 1);
                    }
                    if (t1 == 1 && t2 != 1 && t3 == 1) {
                        t = Math.floor(Math.random() * 2 + 1);
                        if (t == 2) {
                            t = 3;
                        }
                    }
                    if (t1 != 1 && t2 == 1 && t3 == 1) {
                        t = Math.floor(Math.random() * 2 + 2);
                    }
                    if (t1 == 1 && t2 == 1 && t3 == 1) {
                        t = Math.floor(Math.random() * 3 + 1);
                    }
                    if (t1 != 1 && t2 != 1 && t3 != 1) {
                        continue;
                    }
                    switch (t) {
                        case 1:
                            box1 = document.getElementById((x1) * 10 + y1);
                            box1.style.borderTop = "2px solid  " + color1;
                            dotsArray.push(dot1);
                            autoInsert(dot1, dotsArray);
                            break;
                        case 2:
                            box1 = document.getElementById((x1) * 10 + y1);
                            box1.style.borderLeft = "2px solid  " + color1;
                            dotsArray.push(dot2);
                            autoInsert(dot2, dotsArray);
                            break;
                        case 3:
                            box1 = document.getElementById((x1 + 1) * 10 + y1);
                            box1.style.borderTop = "2px solid  " + color1;
                            dotsArray.push(dot3);
                            autoInsert(dot3, dotsArray);
                            break;
                    }
                    return 0;
                }
            }
        }
        /*没有可以围成死格的情况3:没有饱和度为0和1的格，但有饱和度为2的格*/
        var i_count = 400;
        while (i_count > 0) {
            var x1 = Math.floor(Math.random() * 7 + 1),
                y1 = Math.floor(Math.random() * 7 + 1);
            if (!isInArray((x1 * 100 + y1 * 10 + 1), dotsArray)) {
                dotsArray.push(x1 * 100 + y1 * 10 + 1);
                box1 = document.getElementById((x1) * 10 + y1);
                box1.style.borderTop = "2px solid  " + color1;
                return 0;
            }
            if (!isInArray((x1 * 100 + y1 * 10 + 2), dotsArray)) {
                dotsArray.push(x1 * 100 + y1 * 10 + 2);
                box1 = document.getElementById((x1) * 10 + y1);
                box1.style.borderLeft = "2px solid  " + color1;
                return 0;
            }
            if (!isInArray(((x1 + 1) * 100 + y1 * 10 + 1), dotsArray)) {
                dotsArray.push((x1 + 1) * 100 + y1 * 10 + 1);
                box1 = document.getElementById((x1 + 1) * 10 + y1);
                box1.style.borderTop = "2px solid  " + color1;
                return 0;
            }
            if (!isInArray((x1 * 100 + (y1 + 1) * 10 + 2), dotsArray)) {
                dotsArray.push(x1 * 100 + (y1 + 1) * 10 + 2);
                box1 = document.getElementById(x1 * 10 + y1 + 1);
                box1.style.borderLeft = "2px solid  " + color1;
                return 0;
            }
            i_count--;
        }
        for (var x1 = 1; x1 < 8; x1++) {
            for (var y1 = 1; y1 < 8; y1++) {
                if (!isInArray((x1 * 100 + y1 * 10 + 1), dotsArray)) {
                    dotsArray.push(x1 * 100 + y1 * 10 + 1);
                    box1 = document.getElementById((x1) * 10 + y1);
                    box1.style.borderTop = "2px solid  " + color1;
                    return 0;
                }
                if (!isInArray((x1 * 100 + y1 * 10 + 2), dotsArray)) {
                    dotsArray.push(x1 * 100 + y1 * 10 + 2);
                    box1 = document.getElementById((x1) * 10 + y1);
                    box1.style.borderLeft = "2px solid  " + color1;
                    return 0;
                }
                if (!isInArray(((x1 + 1) * 100 + y1 * 10 + 1), dotsArray)) {
                    dotsArray.push((x1 + 1) * 100 + y1 * 10 + 1);
                    box1 = document.getElementById((x1 + 1) * 10 + y1);
                    box1.style.borderTop = "2px solid  " + color1;
                    return 0;
                }
                if (!isInArray((x1 * 100 + (y1 + 1) * 10 + 2), dotsArray)) {
                    dotsArray.push(x1 * 100 + (y1 + 1) * 10 + 2);
                    box1 = document.getElementById(x1 * 10 + y1 + 1);
                    box1.style.borderLeft = "2px solid  " + color1;
                    return 0;
                }
            }
        }
        return 0;
    }
};
/*事件兼容性*/
function addEvent(elem,event,fn) {  
    if(elem.addEventListener){  
        elem.addEventListener(event,fn,false);  
    }else if (elem.attachEvent){  
        elem.attachEvent('on'+event,fn);  
    }else{  
        elem['on'+event]=fn;  
    }  
} 

/*获取点击点*/
var getDots = function(clientX, clientY) {
    var main_body = document.getElementById("main_body");
    var offset_Top = main_body.offsetTop + 20,
        offset_Left = main_body.offsetLeft + 20,
        dotX_array = [], //x参考系
        dotY_array = []; //y参考系
    for (var i = 0; i < 8; i++) {
        dotX_array.push(offset_Top);
        offset_Top += 50;
    }
    for (i = 0; i < 8; i++) {
        dotY_array.push(offset_Left);
        offset_Left += 50;
    }
    var x_line = getDot(clientY, dotX_array), //行号数
        y_line = getDot(clientX, dotY_array); //列号数
    if (typeof x_line == "number") {
        //位于行上
        for (i = 0, j = dotY_array.length - 1; i < j; i++) {
            if (clientX - dotY_array[i] > 0 && clientX - dotY_array[i] < 48) {
                return x_line * 100 + (i + 1) * 10 + 1;
                //百位表示行数，十位表示列数，个位1表示要在上边界作用
            }
        }
    }
    if (typeof y_line == "number") {
        //位于列上
        for (i = 0, j = dotX_array.length - 1; i < j; i++) {
            if (clientY - dotX_array[i] > 0 && clientY - dotX_array[i] < 48) {
                return (i + 1) * 100 + y_line * 10 + 2;
                //百位表示行数，十位表示列数，个位2表示要在左边界作用
            }
        }
    }
    return -1;
};
/*在已经点击到列上或行上后获取位于i+1个点和i+2个点之间*/
var getDot = function(clientNumber, dotArray) {
    for (var i = 0, j = dotArray.length; i < j; i++) {
        if (Math.abs(clientNumber - dotArray[i]) < 16) {
            return i + 1;
        }
    }
    return false;
};
/*判断是否在数组里*/
var isInArray = function(dot, arr) {
    for (var i = 0, j = arr.length; i < j; i++) {
        if (arr[i] == dot) {
            return true;
        }
    }
    return false;
};
/*判断是否可以形成全包围，如果能，则计数形成几个，返回数值*/
var isSurround = function(arr, play) {
    var dot = arr[arr.length - 1],
        oneBit = dot % 10,
        lie = (dot - oneBit) / 10 % 10,
        hang = (dot - oneBit - 10 * lie) / 100,
        i = 0;
    var color = (play % 2 == 0) ? '#f5b481' : '#47eeee';
    if (oneBit == 1) {
        if (isInArray((hang - 1) * 100 + lie * 10 + 1, arr) && isInArray((hang - 1) * 100 + lie * 10 + 2, arr) && isInArray((hang - 1) * 100 + (lie + 1) * 10 + 2, arr)) {
            if (play != 3) {
                document.getElementById((hang - 1) * 10 + lie).style.background = color;
            }
            i++;

        }
        if (isInArray((hang + 1) * 100 + lie * 10 + 1, arr) && isInArray(hang * 100 + lie * 10 + 2, arr) && isInArray(hang * 100 + (lie + 1) * 10 + 2, arr)) {
            if (play != 3) {
                document.getElementById(hang * 10 + lie).style.background = color;
            }
            i++;
        }
    } else {
        if (isInArray(hang * 100 + (lie - 1) * 10 + 1, arr) && isInArray(hang * 100 + (lie - 1) * 10 + 2, arr) && isInArray((hang + 1) * 100 + (lie - 1) * 10 + 1, arr)) {
            if (play != 3) {
                document.getElementById(hang * 10 + lie - 1).style.background = color;
            }
            i++;
        }
        if (isInArray(hang * 100 + lie * 10 + 1, arr) && isInArray(hang * 100 + (lie + 1) * 10 + 2, arr) && isInArray((hang + 1) * 100 + lie * 10 + 1, arr)) {
            if (play != 3) {
                document.getElementById(hang * 10 + lie).style.background = color;
            }
            i++;
        }
    }
    return i;
};
/*封装用于判断选择哪个边*/
var autoInsert = function(dot, arr) {
    var oneBit = dot % 10,
        lie = (dot - oneBit) / 10 % 10,
        hang = (dot - oneBit - 10 * lie) / 100,
        i = 0,
        j = 0,
        k = 0,
        l = 0;
    if (oneBit == 1) {
        if (isInArray((hang - 1) * 100 + lie * 10 + 2, arr)) {
            i++;
        }
        if (isInArray((hang - 1) * 100 + lie * 10 + 1, arr)) {
            i++;
        }
        if (isInArray((hang - 1) * 100 + (lie + 1) * 10 + 2, arr)) {
            i++;
        }

        if (isInArray(hang * 100 + lie * 10 + 2, arr)) {
            j++;
        }
        if (isInArray((hang + 1) * 100 + lie * 10 + 1, arr)) {
            j++;
        }
        if (isInArray(hang * 100 + (lie + 1) * 10 + 2, arr)) {
            j++;
        }
    } else if (oneBit == 2) {
        if (isInArray(hang * 100 + (lie - 1) * 10 + 1, arr)) {
            k++;
        }
        if (isInArray(hang * 100 + (lie - 1) * 10 + 2, arr)) {
            k++;
        }
        if (isInArray((hang + 1) * 100 + (lie - 1) * 10 + 1, arr)) {
            k++;
        }

        if (isInArray(hang * 100 + lie * 10 + 1, arr)) {
            l++;
        }
        if (isInArray(hang * 100 + (lie + 1) * 10 + 2, arr)) {
            l++;
        }
        if (isInArray((hang + 1) * 100 + lie * 10 + 1, arr)) {
            l++;
        }
    }
    var min = Math.min(i, j, k, l);
    return min;
};
/*用于判断下一个点能不能使饱和度为3*/
var autoDes = function(newDot, dot1, dot2, dot3, dotsArray) {
    dotsArray.push(newDot);
    dotsArray.push(dot1);
    var push1 = isSurround(dotsArray, 3);
    dotsArray.pop();
    dotsArray.push(dot2);
    var push2 = isSurround(dotsArray, 3);
    dotsArray.pop();
    dotsArray.push(dot3);
    var push3 = isSurround(dotsArray, 3);
    dotsArray.pop();
    dotsArray.pop();
    if (push3 == 0 && push2 == 0 && push1 == 0) {
        return false; /*false表示下的这个点对方不会使围成，是好的结果*/
    } else {
        return true; /*true表示下的这个点对方会使围成一个框，是坏的结果*/
    }
};
/*判断回退状态*/
var goBack = function(dotsArray) {
    var lastDot = dotsArray.pop(),
        oneBit1 = lastDot % 10,
        lie1 = (lastDot - oneBit1) / 10 % 10,
        hang1 = (lastDot - oneBit1 - 10 * lie1) / 100,
        box1 = document.getElementById(hang1 * 10 + lie1),
        getPlay1 = 0;
    if (oneBit1 == 1) {
        if (box1.style.borderTop == "2px solid rgb(255, 140, 0)") {
            getPlay1 = 1;
        } else if (box1.style.borderTop == "2px solid rgb(69, 147, 253)") {
            getPlay1 = 2;
        }
        box1.style.borderTop = "2px solid  transparent";
        box = document.getElementById(hang1 * 10 + lie1);
        box.style.background = "none";
        if (hang1 > 1) {
            box = document.getElementById((hang1 - 1) * 10 + lie1);
            box.style.background = "none";
        }
    } else {
        if (box1.style.borderLeft == "2px solid rgb(255, 140, 0)") {
            getPlay1 = 1;
        } else if (box1.style.borderLeft == "2px solid rgb(69, 147, 253)") {
            getPlay1 = 2;
        }
        box1.style.borderLeft = "2px solid  transparent";
        box = document.getElementById(hang1 * 10 + lie1);
        box.style.background = "none";
        if (lie1 > 1) {
            box = document.getElementById(hang1 * 10 + (lie1 - 1));
            box.style.background = "none";
        }
    }
    if (dotsArray.length > 0) {
        var lastTwoDot = dotsArray.pop(),
            oneBit2 = lastTwoDot % 10,
            lie2 = (lastTwoDot - oneBit2) / 10 % 10,
            hang2 = (lastTwoDot - oneBit2 - 10 * lie2) / 100,
            box2 = document.getElementById(hang2 * 10 + lie2),
            getPlay2 = 3;
        if (oneBit2 == 1) {
            if (box2.style.borderTop == "2px solid rgb(255, 140, 0)") {
                getPlay2 = 1;
            } else if (box2.style.borderTop == "2px solid rgb(69, 147, 253)") {
                getPlay2 = 2;
            }
        } else {
            if (box2.style.borderLeft == "2px solid rgb(255, 140, 0)") {
                getPlay2 = 1;
            } else if (box2.style.borderLeft == "2px solid rgb(69, 147, 253)") {
                getPlay2 = 2;
            }
        }
        dotsArray.push(lastTwoDot);
        if (getPlay2 == getPlay1) {
            return goBack(dotsArray) + 1;
        }
    }
    return 0;
};