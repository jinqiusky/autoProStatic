toastLog('你好，Auto.js')

function runFetch() {
    var list = className("android.widget.Button").untilFind()
    if (list.size() > 0) {
        var data = [];
        for (var i = 0; i < list.size(); i++) {
            var btn = list.get(i)
            var str = btn.getText() + '';
            var lastSpaceIndex = str.lastIndexOf(' ');
            var company = str.substring(lastSpaceIndex + 1);
            var remainingStr = str.substring(0, lastSpaceIndex).trim();
            var indexDesc = remainingStr.indexOf("账号描述:");
            var name = remainingStr.substring(0, indexDesc).trim();
            var desc = remainingStr.substring(indexDesc + "账号描述:".length).trim();
            console.log(name + '____' + desc + '_____' + company)
            var obj = {
                name: name,
                desc: desc,
                company: company
            }
            data.push(obj);
        }
        console.log(data)
    }
    http.get("http://app.corp.jia10000.cn/minapp/api?max_id=60", {}, function(res, err) {
        var result = res.body.string()
        var body = JSON.stringify(result, null, 2)
        console.log(body)
    });
}


// 打开微信
setTimeout(() => {
    launchApp("微信");
    enterPage()
}, 1000);

function enterPage() {
    setTimeout(() => {
        toastLog('列表页');
        var widget = id("jha").findOne()
        click(widget.bounds().centerX(), widget.bounds().centerY())
        setTimeout(() => {
            toastLog('搜索页')
            var btn = text("小程序").findOne()
            click(btn.bounds().centerX(), btn.bounds().centerY())
            setTimeout(() => {
                searchFun('伤害')
            }, 2000);
        }, 6000);
    }, 3000);
}


function searchFun(str) {
    id("com.tencent.mm:id/d98").findOne().setText(str)
    setTimeout(() => {

        click(1002, 2338)
        activeHandleUp()
    }, 2000);
}

function activeHandleUp() {
    setTimeout(() => {
        var i = 0;
        var interTimer = setInterval(function() {
            i++;
            var bool = swipe(583, 2024, 564, 773, 300);
            toastLog('滚动次数' + i);
            if (!className("android.webkit.WebView").findOne().scrollForward()) {
                runFetch()
                clearInterval(interTimer)
            }
        }, 1500);
    }, 3000);
}
