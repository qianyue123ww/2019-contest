//弹出框事件
var dialog = function (level) {
    var mark = document.getElementById('mark'); //遮罩层
    var dialog = document.getElementById('dialog'); //对话框
    var menu = document.getElementById('menu'); //菜单
    mark.style.display = 'block';
    //事件委托
    dialog.addEventListener('click', function (e) {
        var e = e || event;
        if (e.target.tagName == "BUTTON") {
            var id = e.target.id;
            if (id == 'cancel') {
                mark.style.display = 'none';
                return false;
            }
            if (id == 'next') {
                mark.style.display = 'none';
                levels.onload(level);
                menu.children[level].style.background='#e9e9e9';
                menu.children[level].style.color='#333';
                menu.children[level].style['font-weight']='bold';
                return true;
            }
            if (id = 'again') {
                mark.style.display = 'none';
                levels.onload(level - 1);
                menu.children[level-1].style.background='#e9e9e9';
                menu.children[level-1].style.color='#333';
                menu.children[level-1].style['font-weight']='bold';
                return false;
            }
        }
    });

}
