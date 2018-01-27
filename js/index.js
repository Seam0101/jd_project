/* 使用对象模块化作功能 */
/* 构造函数 */

/* var Jdobj = function(){} */
function Jdobj() {};
/* 监听回调*/
window.addEventListener('load', function () {
    /* 实例化对象 */
    var jingDongObj = new Jdobj();
    /* 各个功能方法 */
    /* 顶部搜索框渐变 */
    jingDongObj.gradient();
    /* 轮播 */
    jingDongObj.slide();
    /*计时器  */
    jingDongObj.timeCount();
});
/* 共用写到原型 */
Jdobj.prototype = {
    /* 渐变 */
    gradient: function () {
        /* 获取页面高度,根据高度修改透明度 ,封装函数*/
        /* 手动调用 */
        opacity();
        /* 添加事件 */
        window.addEventListener('scroll', opacity);

        function opacity() {
            /* 页面上下滚动条高度,前IE后者兼容chrome */
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            /* 轮播图高度 */
            var slideHeight = document.querySelector('#slide').offsetHeight;
            /* 判断:如果在轮播图范围,头部背景发生透明渐变 */
            var header = document.querySelector('#header')

            if (scrollTop < slideHeight) {
                var opa = scrollTop / slideHeight * 0.8;
                console.log(opa);
                header.style.backgroundColor = 'rgba(255,0,0,' + opa + ')';
            } else {
                header.style.backgroundColor = 'rgba(255,0,0,0.8)';
            }
        }
    },
    // 轮播图
    slide: function () {

    },

    // 计时器
    timeCount: function () {
        /*比如秒杀时间是22点整 ,获得差距事件分别将各个位数放入对应的span */
        var timeSpan = document.querySelectorAll('.seckill .seckill-count span');
        //1.获得未来秒杀时间点(转化成秒) 注意:一月是0;getTime 是毫秒
        var seckillTime = new Date(2018, 0, 24, 22, 0, 0).getTime() / 1000;
        console.log(seckillTime);
        //2.获得当前时间点
        var currentTime = new Date().getTime() / 1000;
        // console.log(currentTime);
        //3.计算得时间差
        var time = seckillTime - currentTime;
        //4.封装函数:时间减少/计算各位并放入span;
        //
        function counttime() {
            time--;
            //判断:如果时间为负数或0 停止计时器,时间变成0
            if (time <= 0) {
                clearInterval(timeID);
                time = 0;
            }
            //计算转换成秒,分,时
            var hour = Math.floor(time / 3600);
            var min = (Math.floor(time / 60)) % 60;
            var second = Math.floor(time % 60);
            //计算各个位上的数字,并放入对应的span
            timeSpan[0].innerHTML = Math.floor(hour / 10);
            timeSpan[1].innerHTML = hour % 10;

            timeSpan[3].innerHTML = Math.floor(min / 10);
            timeSpan[4].innerHTML = min % 10;

            timeSpan[6].innerHTML = Math.floor(second / 10);
            timeSpan[7].innerHTML = second % 10;


        }
        //5将函数放入计时器,每一秒执行
        var timeID = setInterval(counttime, 1000);

    }
}