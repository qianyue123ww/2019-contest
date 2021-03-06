//0是地板，1是墙，2是人，3是目标点，4是箱子，第一张图用于测试
var levels = {
    map: [
        [ //第一关
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 3, 4, 0, 1, 1, 1],
            [1, 1, 1, 3, 4, 0, 1, 1, 1],
            [1, 1, 1, 3, 4, 0, 1, 1, 1],
            [1, 1, 1, 3, 4, 0, 1, 1, 1],
            [1, 1, 1, 0, 2, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],

        [ //第二关
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 3, 1, 3, 1, 1, 1],
            [1, 1, 1, 4, 4, 2, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [ //第三关
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 3, 1, 1, 1, 1],
            [1, 1, 3, 4, 4, 2, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [ //第四关
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 3, 1, 1, 1],
            [1, 1, 0, 4, 4, 3, 1, 1],
            [1, 1, 1, 0, 2, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [ //第五关
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 2, 0, 1, 1, 1],
            [1, 1, 3, 4, 4, 1, 1, 1],
            [1, 1, 1, 0, 0, 3, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [ //第六关
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 3, 0, 0, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 3, 4, 0, 0, 1, 1],
            [1, 1, 1, 1, 4, 0, 0, 1, 1],
            [1, 1, 1, 1, 0, 2, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [ //第七关
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 3, 3, 1, 1, 1],
            [1, 1, 1, 0, 4, 2, 1, 1],
            [1, 1, 1, 0, 4, 0, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [ //第八关
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1],
            [1, 1, 3, 4, 4, 3, 1, 1],
            [1, 1, 1, 0, 2, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [ //第九关
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 3, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 4, 0, 1, 1],
            [1, 1, 0, 0, 4, 0, 2, 1],
            [1, 1, 1, 1, 3, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [ //第十关
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 2, 3, 3, 1],
            [1, 1, 0, 4, 4, 1, 1],
            [1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ],
        [ //第十一关
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1],
            [1, 1, 0, 3, 4, 0, 1],
            [1, 1, 2, 1, 1, 3, 1],
            [1, 1, 0, 4, 3, 4, 1],
            [1, 1, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ],
        [ //第十二关
            [1, 1, 1, 1, 1, 1],
            [1, 2, 1, 3, 1, 1],
            [1, 4, 0, 0, 1, 1],
            [1, 3, 4, 0, 1, 1],
            [1, 3, 4, 0, 1, 1],
            [1, 3, 4, 0, 1, 1],
            [1, 3, 4, 0, 1, 1],
            [1, 1, 1, 1, 1, 1],
        ],
        [ //第十三关
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 2, 0, 0, 1],
            [1, 1, 0, 0, 4, 4, 4, 0, 1],
            [1, 1, 0, 1, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 3, 3, 3, 1, 1],
            [1, 0, 0, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],

        ],
        [ //第十四关
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 0, 1, 1],
            [1, 1, 3, 4, 0, 0, 1, 1],
            [1, 1, 0, 4, 4, 3, 1, 1],
            [1, 1, 2, 4, 3, 1, 1, 1],
            [1, 1, 0, 3, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],

        ],
        [ //第十五关
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 0, 1, 1],
            [1, 1, 3, 4, 0, 0, 1, 1],
            [1, 1, 0, 4, 4, 3, 1, 1],
            [1, 1, 2, 4, 3, 1, 1, 1],
            [1, 1, 0, 3, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],

        ],
        [ //第十六关
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 2, 1, 1],
            [1, 0, 3, 0, 4, 0, 1, 1],
            [1, 0, 4, 0, 3, 0, 1, 1],
            [1, 0, 3, 0, 4, 0, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],

        ],
        [ //第十七关
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 2, 0, 0, 0, 0, 1, 1],
            [1, 1, 4, 4, 4, 4, 4, 1, 1],
            [1, 1, 3, 3, 3, 3, 3, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [ //第十八关
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 3, 1, 1, 3, 1, 1],
            [1, 1, 0, 4, 2, 4, 0, 1, 1],
            [1, 1, 0, 0, 4, 0, 3, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [ //第十九关
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 3, 1, 1, 1, 1, 1],
            [1, 3, 2, 0, 0, 0, 1, 1, 1],
            [1, 1, 4, 4, 1, 0, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [ //第二十关
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 4, 0, 2, 0, 0, 1],
            [1, 1, 4, 4, 1, 1, 4, 0, 1],
            [1, 1, 0, 4, 3, 1, 0, 0, 1],
            [1, 1, 3, 3, 3, 0, 3, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
    ],
    //初始化关卡选择画面
    init: function () {
        var menu = document.getElementById('menu');
        var html = "";
        for (var i = 0; i < this.map.length; i++) {
            html += `<button data-num=${i} >${i+1}</button>`;
            // console.log(html);
        }
        menu.innerHTML = html;
        menu.children[0].style.background='#e9e9e9';
        menu.children[0].style.color='#333';
        menu.children[0].style['font-weight']='bold';
       

        //事件委托
        var select = document.getElementById('menu');
        select.addEventListener('click', function (e) {
            var e = e || event; //兼容IE
            if (e.target.tagName == 'BUTTON') {
                alert("你确定放弃这次游戏吗？");
                // var mapArr = levels.map[level]; //地图数据
                level = e.target.getAttribute('data-num'); //获取层数
                levels.onload(level);
                //logo颜色改变
                e.target.style.background='#e9e9e9';
                e.target.style.color='#333';
                e.target.style['font-weight']='bold';
                
                return false;
            }
        }, false);

    },
    //加载某一关卡
    onload: function (level) {
        //要复制地图数据（深拷贝/递归）
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
        var map = levels.map[level]; //原地图
        var mapArr = []; //新数组地图，用来存放复制来的
        mapArr = deepcopy(map, mapArr);
        // 清空画布
        canvas.clear();
        //重新渲染画布
        canvas.init(mapArr);
        //玩家可以开始游戏
        startgame(mapArr, level);
        //菜单颜色
        var select = document.getElementById('menu');
        for(var i=0;i<select.children.length;i++){ 
            select.children[i].style.background="";
            select.children[i].style.color="";
        }
    }
}
//初始化关卡菜单
levels.init();