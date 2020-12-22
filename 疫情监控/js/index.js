/**
 * 向腾讯发送请求，获取疫情数据
 */
$(document).ready(function (){

    function getData(){
        $.ajax({
            url:'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5',
            dataType:'jsonp',
            success:function(res){
                // console.log(res.data)
                var data = JSON.parse(res.data)
               
                var box1 =  `<p class="info">${ data.chinaTotal.confirm }</p>`
                $(box1).appendTo('.infoconfirm');
                var box2 =  `<p class="info">${ data.chinaTotal.heal }</p>`
                $(box2).appendTo('.infoheal');
                var box3 =  `<p class="info">${ data.chinaTotal.dead }</p>`
                $(box3).appendTo('.infodead');
                var box4 =  `<p class="info">${ data.chinaTotal.nowConfirm }</p>`
                $(box4).appendTo('.infonowConfirm');
                var box5 =  `<p class="info">${ data.chinaTotal.importedCase }</p>`
                $(box5).appendTo('.infoimportedCase');
                var box6 =  `<p class="info">${ data.chinaTotal.noInfect }</p>`
                $(box6).appendTo('.infonoInfect');
                
                centerDown(data)
                rightUp(data.areaTree[0].children)
                rightDown(data.areaTree[0].children)
                
            }
        });
        $.ajax({
            url:'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,cityStatis,nowConfirmStatis,provinceCompare',
            dataType:'json',
            success:function(res){
                // console.log(res.data.chinaDayList)
                console.log(res.data.chinaDayAddList)
                total(res.data.chinaDayList)
                allAdd(res.data.chinaDayAddList)
            }
        })
    }
    
    getData();

    // echarts地图
    function centerDown(data){
        var myEcharts = echarts.init(document.getElementById('centerBox-down'));
        option = {
            // title: {
            //     text: '中国疫情图',
            //     left: 'center',
            //     textStyle:{
            //         color:'red'
            //     }
            // },
            tooltip: {
                trigger: 'item',
                // color:'red'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['中国疫情图'],
                // textStyle:{
                //     color:'red',
                // },
                // color:'red'
            },
            visualMap: {
                type: 'piecewise',
                pieces: [
                    {min: 1000, max: 1000000, label: '>1000人', color: '#4e160f'},
                    {min: 500, max: 999, label: '500-999人', color: '#6b0700'},
                    {min: 100, max: 499, label: '100-499人', color: '#974236'},
                    {min: 10, max: 99, label: '10-99人', color: '#ee7263'},
                    {min: 1, max: 9, label: '1-9人', color: '#f5cdcd'},
                ],
                // color: ['#E0022B', '#E09107', '#A3E00B'],
                // outOfRange: {
                    // color: 'red',
                    // symbolSize: [30, 100]
                // }
                textStyle:{
                    color:'white'
                }
            },
            roamController: {
                show: true,
                left: 'right',
                mapTypeControl: {
                    'china': true
                }
            },
            series: [
                {
                    name: '确诊数',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        show: true,
                        color: '#ffffff'
                    },
                    data: [
                        {
                        name: '北京',
                        value: 212
                        }, {
                        name: '天津',
                        value: 60
                        }, {
                        name: '上海',
                        value: 208
                        }, {
                        name: '重庆',
                        value: 337
                        }, {
                        name: '河北',
                        value: 126
                        }, {
                        name: '河南',
                        value: 675
                        }, {
                        name: '云南',
                        value: 117
                        }, {
                        name: '辽宁',
                        value: 74
                        }, {
                        name: '黑龙江',
                        value: 155
                        }, {
                        name: '湖南',
                        value: 593
                        }, {
                        name: '安徽',
                        value: 480
                        }, {
                        name: '山东',
                        value: 270
                        }, {
                        name: '新疆',
                        value: 29
                        }, {
                        name: '江苏',
                        value: 308
                        }, {
                        name: '浙江',
                        value: 829
                        }, {
                        name: '江西',
                        value: 476
                        }, {
                        name: '湖北',
                        value: 13522
                        }, {
                        name: '广西',
                        value: 139
                        }, {
                        name: '甘肃',
                        value: 55
                        }, {
                        name: '山西',
                        value: 74
                        }, {
                        name: '内蒙古',
                        value: 34
                        }, {
                        name: '陕西',
                        value: 142
                        }, {
                        name: '吉林',
                        value: 42
                        }, {
                        name: '福建',
                        value: 179
                        }, {
                        name: '贵州',
                        value: 56
                        }, {
                        name: '广东',
                        value: 797
                        }, {
                        name: '青海',
                        value: 15
                        }, {
                        name: '西藏',
                        value: 1
                        }, {
                        name: '四川',
                        value: 282
                        }, {
                        name: '宁夏',
                        value: 34
                        }, {
                        name: '海南',
                        value: 79
                        }, {
                        name: '台湾',
                        value: 10
                        }, {
                        name: '香港',
                        value: 15
                        }, {
                        name: '澳门',
                        value: 9
                        }
                    ],
                    itemStyle:{
                        color:'red', 
                    },
                }
            ]
        };
        myEcharts.setOption(option)

    }

    // top10
    function rightUp(data) {
        var dataCity=[]
        var dataValue=[]
        var rightBoxUp = echarts.init(document.getElementById('rightBox-up'));
        var option = {
            title: {
                text: '全国确诊前十省市',
                textStyle:{
                    color:'white',
                }
            },
            tooltip: {},
            // legend: {
            //     data:['销量']
            // },
            xAxis: {
                data: dataCity,
                nameTextStyle:'#ffffff'
            },
            yAxis: {
                axisLine:{
                    lineStyle:{
                        color:'#ffffff',
                    }
                }
            },
            series: [{
                name: '销量',
                type: 'bar',
                data: dataValue,
                color:'#3398db'
            }]
        };

        var allConfirm=[]
        for(var i of data){
            // console.log(i.total.confirm);
            allConfirm.push({
                name:i.name,
                value:i.total.confirm
            })
        }
        // console.log(allConfirm);
        allConfirm.sort(function (a,b) {
            return b.value-a.value;
        });
        allConfirm.length=10;
        // console.log(allConfirm);
        
        for(var i of allConfirm){
            // console.log(i.value);
            dataCity.push(i.name)
            dataValue.push(i.value)
        }

        rightBoxUp.setOption(option)

    }
    // 境外输入前五省市
    function rightDown(data) {
        // console.log(data.areaTree[0].children[5].today.tip.replace(/[^0-9]/ig,""));
        var TopFiveValue = []; //前五城市的境外输入数
        var TopFiveName = []; //前五的城市名
        var allCity = []; //暂存前五的空数组
        var rightBoxDown = echarts.init(document.getElementById('rightBox-down'));
        option = {
            title: {
                text: '境外输入前五省市',
                left: 'center',
                textStyle:{
                    color:'white'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: TopFiveName,
                textStyle:{
                    color:'white',
                }
            },
            series: [
                {
                    name: '境外输入',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: allCity,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label:{
                        color:'white'
                    }
                }
            ]
        };

        
        for(var i in data){
            
            var num=data[i].today.tip.replace(/[^0-9]/ig,"")
            // console.log(data[i].name);
            
            if(num!==''){
                //获取所有含有境外输入的城市的
                allCity.push({
                    name:data[i].name,
                    value:num
                })
                //将所有含有境外输入的城市倒序排序
                allCity.sort(function (a,b) {
                    return b.value-a.value;
                });
            }
        }
        // 获得前五
        allCity.length=5;
        for(var i of allCity){
            TopFiveValue.push(i.value)
            TopFiveName.push(i.name)
        }
        // console.log(TopFiveName);
        // console.log(TopFiveValue);
        // console.log(allCity);

        rightBoxDown.setOption(option)
    }

    // 左边顶部时间
    time()
    setInterval(function(){
        time()
    },1000);
    function time(){
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth()+1;
        var date = d.getDate();
        var today = d.getDay();
        var hour = d.getHours()
        var min = d.getMinutes()
        var sec = d.getSeconds()
        var strTime;

        if(month<10){
            month = '0'+month
        }
        if(hour<10){
            hour = '0'+hour;
        }
        if(min<10){
            min = '0'+min;
        }
        if(sec<10){
            sec = '0'+sec;
        }

        strTime = `${year}年${month}月${date}日 ${hour}:${min}:${sec}`;
        
        // console.log(strTime);
        $('.time').text(strTime)
    }
    
    // 全国累计趋势
    function total(data) {
        var showDate=[]; //显示12位日期
        var date=[]; //日期
        var dead=[]; //死亡
        var confirm=[]; //确诊
        var heal=[]; //治愈

        var leftBoxUp = echarts.init(document.getElementById('total'));
        option = {
            title: {
                text: '全国累计趋势',
                textStyle:{
                    color:'white'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['累计确诊','累计治愈', '累计死亡'],
                right:0,
                textStyle:{
                    color:'white'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            // toolbox: {
            //     feature: {
            //         saveAsImage: {}
            //     }
            // },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '累计确诊',
                    type: 'line',
                    // stack: '总量',
                    data: confirm,
                    itemStyle:{
                        color:'#dd6b66'
                    }
                },
                {
                    name: '累计治愈',
                    type: 'line',
                    // stack: '总量',
                    data: heal,
                    itemStyle:{
                        color:'#759aa0'
                    }
                },
                {
                    name: '累计死亡',
                    type: 'line',
                    // stack: '总量',
                    data: dead,
                    itemStyle:{
                        color:'#e0d76d'
                    }
                },
            ]
        };
        for(var i of data){
            date.push(i.date)
            dead.push(i.dead)
            confirm.push(i.confirm)
            heal.push(i.heal)
        }
        leftBoxUp.setOption(option)

    }

    // 全国新增趋势
    function allAdd(data) {
        var confirm=[];
        var suspect=[];
        var importedCase=[];
        var date=[];
        


        var leftBoxDown = echarts.init(document.getElementById('leftBox-down'));
        option = {
            title: {
                text: '全国新增趋势',
                textStyle:{
                    color:'white'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['新增确诊', '新增疑似', '新增境外输入'],
                right:0,
                textStyle:{
                    color:'white'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            // toolbox: {
            //     feature: {
            //         saveAsImage: {}
            //     }
            // },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date
            },
            yAxis: {
                type: 'value',
                axisLine:{
                    lineStyle:{
                        color:'rgb(125, 125, 125)'
                    }
                }
            },
            series: [
                {
                    name: '新增确诊',
                    type: 'line',
                    // stack: '总量',
                    data: confirm,
                    itemStyle:{
                        color:'#dd6b66'
                    }
                },
                {
                    name: '新增疑似',
                    type: 'line',
                    // stack: '总量',
                    data: suspect,
                    itemStyle:{
                        color:'#759aa0'
                    }
                },
                {
                    name: '新增境外输入',
                    type: 'line',
                    // stack: '总量',
                    data: importedCase,
                    itemStyle:{
                        color:'#e0d76d'
                    }
                },
            ]
        };

        for(var i of data){
            confirm.push(i.confirm)
            suspect.push(i.suspect)
            importedCase.push(i.importedCase)
            date.push(i.date)
        }
        console.log(confirm);
        console.log(suspect);
        console.log(date);

        leftBoxDown.setOption(option)

    }






});


