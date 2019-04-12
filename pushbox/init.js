//画布
var Canvas = function () {
}
//初始化画布
Canvas.prototype.init = function (mapArr) {
    this.mapArr=mapArr;
    var floor = new Image();
    var box = new Image();
    var player = new Image();
    var ball = new Image();
    var wall = new Image();
    floor.src = "img/floor.png";
    wall.src = "img/wall.png";
    box.src = "img/box.png";
    player.src = "img/player.png";
    ball.src = "img/ball.png";
    //图片加载完成渲染各个元素

    floor.onload = draw(floor,0);
    wall.onload = draw(wall,1);
    player.onload = draw(player,2);
    ball.onload = draw(ball,3);
    box.onload = draw(box,4);
    
    var self=this;//保存自身引用
    //遍历寻找各类对象的位置
    function draw(obj,num ) {
        return function () {
            for (var i = 0; i < self.mapArr.length; i++) { //i对应行数，y轴
                for (var j = 0; j < self.mapArr[i].length; j++) { //j对应列数,x轴
                    if (self.mapArr[i][j] == num) {
                        cxt.drawImage(obj, j * 50, i * 50);
                    }
                }
            }
        }
    }
    //返回各个元素的图片集，用于后面玩家移动元素重新渲染
    return {
        player: player,
        floor: floor,
        wall: wall,
        ball: ball,
        box: box
    }
}

//清除画布
Canvas.prototype.clear = function () {
    cxt.clearRect(0, 0, 500,500);
}
var c = document.getElementById('mycanvas');
var cxt = c.getContext("2d");
//创建画布对象
var canvas = new Canvas();
//画布初始化
//var pic = canvas.init(levels.map[0]);
var map1=[];
map1=deepcopy(levels.map[0],map1);//深拷贝第一层地图数据
var pic=canvas.init(map1);

function deepcopy(map, mapArr) {
    var arr = mapArr || [];
    for (var i in map) {
        if (typeof map[i] === 'object') { //判断是否是对象 
            arr[i] = map[i].constructor === Array ? [] : {};
            deepcopy(map[i], arr[i]);
        } else { //如果不是对象，可以直接赋值
            arr[i] = map[i];
        }
    }
    return arr; //返回复制好的新地图
}
