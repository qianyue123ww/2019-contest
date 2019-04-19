function startgame(mapArr, lev) {
    var playerArr = []; //存放玩家的数组
    var boxArr = []; //存放箱子的数组
    var ballArr = []; //存放球的数组
    //0是地板，1是墙，2是人，3是目标点，4是箱子
    //这里需要注意：画布的x轴方向对应地图数组的列数（j）
    //画布的y轴方向对应地图数组的行数（i）
    for (var i = 0; i < mapArr.length; i++) {
        for (var j = 0; j < mapArr[i].length; j++) {
            if (mapArr[i][j] == 2) {
                var temp = new Object();
                temp.x = j;
                temp.y = i;
                playerArr.push(temp); //找到玩家放进数组
            }
            if (mapArr[i][j] == 3) {
                var temp = new Object();
                temp.x = j;
                temp.y = i;
                ballArr.push(temp); //找到球放进数组
            }
            if (mapArr[i][j] == 4) {
                var temp = new Object();
                temp.x = j;
                temp.y = i;
                boxArr.push(temp); //找到箱子放进数组
            }
        }
    }

    //玩家类
    var Player = function (player) {
        //获取玩家的坐标
        this.x = player.x;
        this.y = player.y;
        //判断玩家是否在球上
        this.onBall = false;
        this.walk = 0; //记录步数
        this.onlevel=lev;
    }
    //判断玩家是否获胜
    Player.prototype.iswin = function () {
        var flag = 0;
        for (var i = 0; i < boxArr.length; i++) {
            if (boxArr[i].onBall) {
                flag++;
                if (flag == boxArr.length) {
                    return true;
                }
            }
        }
        return false;
    }
    Player.prototype.countwalk = function () {
        var count = document.getElementById('countwalk');
        count.innerHTML = this.walk;
    }

    //箱子类
    var Box = function (box) {
        //获取箱子的坐标
        this.x = box.x;
        this.y = box.y;
        //判断箱子是否在球上
        this.onBall = false;
    }
    //球类
    var Ball = function (ball) {
        //获取球的坐标
        this.x = ball.x;
        this.y = ball.y;
    }

    //创建玩家的实例对象
    var player = new Player(playerArr[0]);

    //创建球的实例对象
    var ballObj = [];
    for (var i = 0; i < ballArr.length; i++) {
        var ball = new Ball(ballArr[i]);
        ballObj.push(ball);
    }
    //创建箱子的实例对象
    var boxObj = [];
    for (var i = 0; i < boxArr.length; i++) {
        var box = new Box(boxArr[i]);
        boxObj.push(box);
    }
    //该方法用来找玩家推到的那个箱子或球在数组对象中的下标，然后返回这个下标
    function findIndex(obj, arr) {
        for (var i = 0; i < arr.length; i++) {
            var x = arr[i].x;
            var y = arr[i].y;
            if (obj.x == x && obj.y == y) {
                return i;
            }
        }
    }
    var lev = lev; //存放当前地图的层数，用于成功通过后跳转下一层
    document.onkeydown = function (e) {
        var e = e || event //兼容IE
        var side; //玩家按键方向上的第一个物体
        var sideside; //玩家按键方向上的第二个物体
        //按下左键
        if (e.keyCode == 37) {
            player.walk++;
            player.countwalk(); //统计步数
            //这里需要注意：画布的x轴方向对应地图数组的列数（j）
            //画布的y轴方向对应地图数组的行数（i）
            side = mapArr[player.y][player.x - 1]; //玩家旁边的物体
            mapArr[player.y][player.x] = 0; //将玩家初始点变为地板
            if (side == 0) {
                //是地板
                player.x--; //玩家左移一格
                cxt.drawImage(pic.player, (player.x) * 50, player.y * 50); //重绘玩家
                //若玩家在球上的话
                if (player.onBall) {
                    //玩家原来的地方变成球
                    cxt.drawImage(pic.ball, (player.x + 1) * 50, player.y * 50);
                    mapArr[player.y][player.x + 1] = 3;
                    player.onBall = false; //此时玩家状态变成不在球上
                } else {
                    //玩家原来的地方变成地板
                    cxt.drawImage(pic.floor, (player.x + 1) * 50, player.y * 50);
                }
                console.log(player);
                console.log(mapArr);
                console.log(box);
            }
            if (side == 1) {
                //是墙
                return;
            }
            if (side == 3) {
                //是球
                player.x--; //玩家移动
                cxt.drawImage(pic.player, (player.x) * 50, player.y * 50); //重绘玩家
                cxt.drawImage(pic.floor, (player.x + 1) * 50, player.y * 50); //玩家原来的地方画了地板
                if (player.onBall) { //如果玩家本来就在球上
                    cxt.drawImage(pic.ball, (player.x + 1) * 50, player.y * 50); //玩家原来的地方画球
                    mapArr[player.y][player.x + 1] = 3;
                }
                player.onBall = true; //玩家此时状态在球上
                console.log(player);
                console.log(mapArr);
                console.log(box);
            }
            if (side == 4) {
                //是箱子
                sideside = mapArr[player.y][player.x - 2]; //玩家按键方向上的第二个物体是墙或者箱子   
                if (sideside == 1 || sideside == 4) { //如果 箱子/墙<——箱子<——玩家
                    return; //推不动
                } else {
                    //下面情况可以推得动
                    var flag = 0;
                    if (player.onBall) { //如果玩家在球上
                        cxt.drawImage(pic.ball, player.x * 50, player.y * 50); //画球
                        mapArr[player.y][player.x] = 3;
                        flag = 1;
                    }
                    // 如果是 地板<——箱子(在球上和不在球上)<——玩家(在球上和不在球上)
                    if (sideside == 0) {
                        player.x--; //玩家移动
                        var index = findIndex(player, boxArr); //找到玩家旁边的箱子对应箱子数组的下标
                        box = boxArr[index]; //找到那个箱子对象
                        if (box.onBall) {
                            //如果箱子在球上
                            player.onBall = true;
                            box.onBall = false;
                            mapArr[player.y][player.x] = 3;
                        } else { //箱子不在球上
                            if (player.onBall) { //玩家在球上
                                cxt.drawImage(pic.ball, player.x * 50, player.y * 50); //画球
                            }
                            player.onBall = false;
                        }
                        box.x--; //箱子移动
                        mapArr[box.y][box.x] = 4;
                        //重绘画布
                        cxt.drawImage(pic.box, box.x * 50, box.y * 50);
                        cxt.drawImage(pic.player, (player.x) * 50, player.y * 50);
                        cxt.drawImage(pic.floor, (player.x + 1) * 50, player.y * 50);
                        if (flag == 1) {
                            cxt.drawImage(pic.ball, (player.x + 1) * 50, player.y * 50); //画球
                        }
                        return;
                    }
                    if (sideside == 3) {
                        if (!player.onBall) { //如果玩家不在球上
                            cxt.drawImage(pic.floor, player.x * 50, player.y * 50); //画地板
                            mapArr[player.y][player.x] = 0;
                        }
                        player.x--; //玩家移动
                        var index = findIndex(player, boxArr); //找到箱子对应箱子数组的下标
                        box = boxArr[index]; //找到那个箱子对象
                        if (box.onBall) { //箱子在球上
                            player.onBall = true;
                            mapArr[box.y][box.x] = 3;
                        } else { //箱子不在球上
                            player.onBall = false;
                            mapArr[box.y][box.x] = 0;
                        }
                        box.x--; //箱子移动
                        box.onBall = true; //箱子移到前面的球去了
                        //改变数组坐标
                        mapArr[box.y][box.x] = 4;
                        // mapArr[player.y][player.x + 1] = 2;
                        //重绘玩家，箱子
                        cxt.drawImage(pic.player, (player.x) * 50, player.y * 50);
                        cxt.drawImage(pic.box, (box.x) * 50, box.y * 50);
                    }
                }
            }
            console.log(mapArr);
        }
        //按下右键
        if (e.keyCode == 39) {
            player.walk++;
            player.countwalk();
            side = mapArr[player.y][player.x + 1]; //玩家旁边的物体
            mapArr[player.y][player.x] = 0; //将玩家初始点变为地板
            if (side == 0) {
                //是地板
                player.x++;
                cxt.drawImage(pic.player, (player.x) * 50, player.y * 50); //重绘玩家
                //若玩家在球上的话
                if (player.onBall) {
                    //玩家原来的地方变成球
                    cxt.drawImage(pic.ball, (player.x - 1) * 50, player.y * 50);
                    mapArr[player.y][player.x - 1] = 3;
                    player.onBall = false; //此时玩家状态变成不在球上
                } else {
                    //玩家原来的地方变成地板
                    cxt.drawImage(pic.floor, (player.x - 1) * 50, player.y * 50);
                }
            }
            if (side == 1) {
                //是墙
                return;
            }
            if (side == 3) {
                //是球
                player.x++; //玩家移动
                cxt.drawImage(pic.player, (player.x) * 50, player.y * 50); //重绘玩家
                cxt.drawImage(pic.floor, (player.x - 1) * 50, player.y * 50); //玩家原来的地方画了地板
                if (player.onBall) { //如果玩家本来就在球上
                    cxt.drawImage(pic.ball, (player.x - 1) * 50, player.y * 50); //玩家原来的地方画球
                    mapArr[player.y][player.x - 1] = 3;
                }
                player.onBall = true; //玩家此时状态在球上
            }
            if (side == 4) {
                //是箱子
                sideside = mapArr[player.y][player.x + 2]; //玩家按键方向上的第二个物体是墙或者箱子   
                if (sideside == 1 || sideside == 4) {
                    return; //推不动
                } else {
                    //下面情况可以推得动
                    var flag = 0;
                    if (player.onBall) { //如果玩家在球上
                        cxt.drawImage(pic.ball, player.x * 50, player.y * 50); //画球
                        mapArr[player.y][player.x] = 3;
                        flag = 1;

                    }
                    if (sideside == 0) {
                        player.x++; //玩家移动
                        var index = findIndex(player, boxArr); //找到玩家旁边的箱子对应箱子数组的下标
                        box = boxArr[index]; //找到那个箱子对象
                        if (box.onBall) {
                            //如果箱子在球上
                            player.onBall = true;
                            box.onBall = false;
                            mapArr[player.y][player.x] = 3;
                        } else { //箱子不在球上
                            if (player.onBall) { //玩家在球上
                                cxt.drawImage(pic.ball, player.x * 50, player.y * 50); //画球
                            }
                            player.onBall = false;

                        }
                        box.x++; //箱子移动
                        mapArr[box.y][box.x] = 4;
                        cxt.drawImage(pic.box, box.x * 50, box.y * 50);
                        cxt.drawImage(pic.player, (player.x) * 50, player.y * 50);
                        cxt.drawImage(pic.floor, (player.x - 1) * 50, player.y * 50);
                        if (flag == 1) {
                            cxt.drawImage(pic.ball, (player.x - 1) * 50, player.y * 50); //画球
                        }
                        return;
                    }
                    if (sideside == 3) {
                        //玩家不再球上
                        if (!player.onBall) { //如果玩家不在球上
                            cxt.drawImage(pic.floor, player.x * 50, player.y * 50); //画地板
                            mapArr[player.y][player.x] = 0;
                        }
                        player.x++; //玩家移动
                        var index = findIndex(player, boxArr); //找到箱子对应箱子数组的下标
                        box = boxArr[index]; //找到那个箱子对象
                        if (box.onBall) { //箱子在球上
                            player.onBall = true;
                            mapArr[box.y][box.x] = 3;
                        } else { //箱子不在球上
                            player.onBall = false;
                            mapArr[box.y][box.x] = 0;
                        }
                        box.x++; //箱子移动
                        box.onBall = true; //箱子移到前面的球去了

                        //改变数组坐标
                        mapArr[box.y][box.x] = 4;
                        // mapArr[player.y][player.x + 1] = 2;
                        //重绘玩家，箱子
                        cxt.drawImage(pic.player, (player.x) * 50, player.y * 50);
                        cxt.drawImage(pic.box, (box.x) * 50, box.y * 50);
                    }
                }
            }
            console.log(mapArr);
        }
        //按下上键
        if (e.keyCode == 38) {
            player.walk++;
            player.countwalk();
            side = mapArr[player.y - 1][player.x]; //玩家旁边的物体
            mapArr[player.y][player.x] = 0; //将玩家初始点变为地板
            if (side == 0) {
                //是地板
                player.y--;
                cxt.drawImage(pic.player, (player.x) * 50, player.y * 50); //重绘玩家
                //若玩家在球上的话
                if (player.onBall) {
                    //玩家原来的地方变成球
                    cxt.drawImage(pic.ball, (player.x) * 50, (player.y + 1) * 50);
                    mapArr[player.y + 1][player.x] = 3;
                    player.onBall = false; //此时玩家状态变成不在球上
                } else {
                    //玩家原来的地方变成地板
                    cxt.drawImage(pic.floor, (player.x) * 50, (player.y + 1) * 50);
                }
            }
            if (side == 1) {
                //是墙
                return;
            }
            if (side == 3) {
                //是球
                player.y--; //玩家移动
                cxt.drawImage(pic.player, (player.x) * 50, player.y * 50); //重绘玩家
                cxt.drawImage(pic.floor, (player.x) * 50, (player.y + 1) * 50); //玩家原来的地方画了地板
                if (player.onBall) { //如果玩家本来就在球上
                    cxt.drawImage(pic.ball, (player.x) * 50, (player.y + 1) * 50); //玩家原来的地方画球
                    mapArr[player.y + 1][player.x] = 3;
                }
                player.onBall = true; //玩家此时状态在球上
            }
            if (side == 4) {
                //是箱子
                sideside = mapArr[player.y - 2][player.x]; //玩家按键方向上的第二个物体是墙或者箱子   
                if (sideside == 1 || sideside == 4) {
                    return; //推不动
                } else {
                    //下面情况可以推得动
                    var flag = 0;
                    if (player.onBall) { //如果玩家在球上
                        cxt.drawImage(pic.ball, player.x * 50, player.y * 50); //画球
                        mapArr[player.y][player.x] = 3;
                        flag = 1;

                    }
                    if (sideside == 0) {
                        player.y--; //玩家移动
                        var index = findIndex(player, boxArr); //找到玩家旁边的箱子对应箱子数组的下标
                        box = boxArr[index]; //找到那个箱子对象
                        if (box.onBall) {
                            //如果箱子在球上
                            player.onBall = true;
                            box.onBall = false;
                            mapArr[player.y][player.x] = 3;
                        } else { //箱子不在球上
                            if (player.onBall) { //玩家在球上
                                cxt.drawImage(pic.ball, player.x * 50, player.y * 50); //画球
                            }
                            player.onBall = false;
                        }
                        box.y--; //箱子移动
                        mapArr[box.y][box.x] = 4;
                        cxt.drawImage(pic.box, box.x * 50, box.y * 50);
                        cxt.drawImage(pic.player, (player.x) * 50, player.y * 50);
                        cxt.drawImage(pic.floor, (player.x) * 50, (player.y + 1) * 50);
                        if (flag == 1) {
                            cxt.drawImage(pic.ball, (player.x) * 50, (player.y + 1) * 50); //画球
                        }
                        return;
                    }
                    if (sideside == 3) {
                        //玩家不再球上
                        if (!player.onBall) { //如果玩家不在球上
                            cxt.drawImage(pic.floor, player.x * 50, player.y * 50); //画地板
                            mapArr[player.y][player.x] = 0;
                        }
                        player.y--; //玩家移动
                        var index = findIndex(player, boxArr); //找到箱子对应箱子数组的下标
                        box = boxArr[index]; //找到那个箱子对象
                        if (box.onBall) { //箱子在球上
                            player.onBall = true;
                            mapArr[box.y][box.x] = 3;
                            // cxt.drawImage(pic.ball, (ball.x+1) * 50, ball.y * 50);
                        } else { //箱子不在球上
                            player.onBall = false;
                            mapArr[box.y][box.x] = 0;
                        }
                        box.y--; //箱子移动
                        box.onBall = true; //箱子移到前面的球去了
                        //改变数组坐标
                        mapArr[box.y][box.x] = 4;
                        // mapArr[player.y][player.x + 1] = 2;
                        //重绘玩家，箱子
                        cxt.drawImage(pic.player, (player.x) * 50, player.y * 50);
                        cxt.drawImage(pic.box, (box.x) * 50, box.y * 50);
                    }
                }
            }
            console.log(mapArr);
        }
        //按下下键
        if (e.keyCode == 40) {
            player.walk++;
            player.countwalk();
            side = mapArr[player.y + 1][player.x]; //玩家旁边的物体
            mapArr[player.y][player.x] = 0; //将玩家初始点变为地板
            if (side == 0) {
                //是地板
                player.y++;
                cxt.drawImage(pic.player, (player.x) * 50, player.y * 50); //重绘玩家
                //若玩家在球上的话
                if (player.onBall) {
                    //玩家原来的地方变成球
                    cxt.drawImage(pic.ball, (player.x) * 50, (player.y - 1) * 50);
                    mapArr[player.y - 1][player.x] = 3;
                    player.onBall = false; //此时玩家状态变成不在球上
                } else {
                    //玩家原来的地方变成地板
                    cxt.drawImage(pic.floor, (player.x) * 50, (player.y - 1) * 50);
                }
            }
            if (side == 1) {
                //是墙
                return;
            }
            if (side == 3) {
                //是球
                player.y++; //玩家移动
                cxt.drawImage(pic.player, (player.x) * 50, player.y * 50); //重绘玩家
                cxt.drawImage(pic.floor, (player.x) * 50, (player.y - 1) * 50); //玩家原来的地方画了地板
                if (player.onBall) { //如果玩家本来就在球上
                    cxt.drawImage(pic.ball, (player.x) * 50, (player.y - 1) * 50); //玩家原来的地方画球
                    mapArr[player.y - 1][player.x] = 3;
                }
                player.onBall = true; //玩家此时状态在球上
            }
            if (side == 4) {
                //是箱子
                sideside = mapArr[player.y + 2][player.x]; //玩家按键方向上的第二个物体是墙或者箱子   
                if (sideside == 1 || sideside == 4) {
                    return; //推不动
                } else {
                    //下面情况可以推得动
                    var flag = 0;
                    if (player.onBall) { //如果玩家在球上
                        cxt.drawImage(pic.ball, player.x * 50, player.y * 50); //画球
                        mapArr[player.y][player.x] = 3;
                        flag = 1;

                    }
                    if (sideside == 0) {
                        player.y++; //玩家移动
                        var index = findIndex(player, boxArr); //找到玩家旁边的箱子对应箱子数组的下标
                        box = boxArr[index]; //找到那个箱子对象
                        if (box.onBall) {
                            //如果箱子在球上
                            player.onBall = true;
                            box.onBall = false;
                            mapArr[player.y][player.x] = 3;
                        } else { //箱子不在球上
                            if (player.onBall) { //玩家在球上
                                cxt.drawImage(pic.ball, player.x * 50, player.y * 50); //画球
                            }
                            player.onBall = false;

                        }
                        box.y++; //箱子移动
                        mapArr[box.y][box.x] = 4;
                        cxt.drawImage(pic.box, box.x * 50, box.y * 50);
                        cxt.drawImage(pic.player, (player.x) * 50, player.y * 50);
                        cxt.drawImage(pic.floor, (player.x) * 50, (player.y - 1) * 50);
                        if (flag == 1) {
                            cxt.drawImage(pic.ball, (player.x) * 50, (player.y - 1) * 50); //画球
                        }

                        return;
                    }
                    if (sideside == 3) {
                        //玩家不再球上
                        if (!player.onBall) { //如果玩家不在球上
                            cxt.drawImage(pic.floor, player.x * 50, player.y * 50); //画地板
                            mapArr[player.y][player.x] = 0;
                        }
                        player.y++; //玩家移动
                        var index = findIndex(player, boxArr); //找到箱子对应箱子数组的下标
                        box = boxArr[index]; //找到那个箱子对象
                        if (box.onBall) { //箱子在球上
                            player.onBall = true;
                            mapArr[box.y][box.x] = 3;
                            // cxt.drawImage(pic.ball, (ball.x+1) * 50, ball.y * 50);
                        } else { //箱子不在球上
                            player.onBall = false;
                            mapArr[box.y][box.x] = 0;
                        }
                        box.y++; //箱子移动
                        box.onBall = true; //箱子移到前面的球去了

                        //改变数组坐标
                        mapArr[box.y][box.x] = 4;
                        // mapArr[player.y][player.x + 1] = 2;
                        //重绘玩家，箱子
                        cxt.drawImage(pic.player, (player.x) * 50, player.y * 50);
                        cxt.drawImage(pic.box, (box.x) * 50, box.y * 50);
                    }
                }
            }
            console.log(mapArr);
        }
     
        if (player.iswin(boxArr)) {
            setTimeout(function () {
                // alert('恭喜你胜利了！！');
                //跳转下一关卡
                 lev++;
                if (lev < levels.map.length) {
                    // levels.onload(lev);
                    var flag=dialog(lev);
                    if(flag){
                        Player.onlevel=lev;
                    }else{
                        player.onlevel=lev-1;
                    }
                } else {
                    alert("恭喜你！通关啦");
                }
            }, 200);
        }      
    }
     //刷新按钮
        console.log(player.walk);
        var reflush = document.getElementById('reflush');
        reflush.onclick = function () {
            levels.onload(player.onlevel);
            menu.children[lev].style.background='#e9e9e9';
            menu.children[lev].style.color='#333';
            menu.children[lev].style['font-weight']='bold';
            return;
        }
}
level = 0;
startgame(map1, level);