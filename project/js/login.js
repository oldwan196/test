$(function(){
    var show_num = [];
    draw(show_num);

    $("#canvas").on('click',function(){
        draw(show_num);
    })
    $(".btn").on('click',function(){
        var val = $(".input-val").val().toLowerCase();
        var num = show_num.join("");
        var uname = $("#username").val();
        var upass = $("#password").val();
        // var username = localStorage.getItem("username");
        // var password = localStorage.getItem("password");
        // console.log(username);
        // console.log(password);
        if(uname==''){
            alert('请输入用户名！');
        }else if(upass==''){
            alert('请输入密码！');
        }else if(val==''){
            alert('请输入验证码！');
        }else if(val!=num){
            alert('验证码错误！请重新输入！');
        }
        if(val == num){

            if(window.localStorage.users){
                var users = JSON.parse(window.localStorage.users);
            }else{
                users = []; 
            }
            var username = $("#username").val();
            var password = $("#password").val();
            // var phone = $("#phone").val();
            var flag = false;
            var index = 0;
            //遍历数组进行匹配        
            for(var i =0;i<users.length;i++){            
                //判断是否有相同账号            
                if(username==users[i].username){//有这个账号                
                    flag = true;                
                    index = i;        
                }
            }if(flag){
                if(password == users[index].password){
                    alert('登录成功！');
                    var yonghu = $("#username");
                    localStorage.name = yonghu.val(); //登录成功将登录的用户名存入localStorage.name
                    // console.log(localStorage.name);
                    location.href="./home.html"
                }else{
                    alert("密码错误"); 
                }
            }else{
                alert('用户名或密码不正确！');
                // draw(show_num);
            }
        }
    })
})

//生成并渲染出验证码图形
function draw(show_num) {
    var canvas_width=$('#canvas').width();
    var canvas_height=$('#canvas').height();
    var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
    var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    var aCode = sCode.split(",");
    var aLength = aCode.length;//获取到数组的长度
    
    for (var i = 0; i < 4; i++) {  //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
        var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
        // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        var deg = Math.random() - 0.5; //产生一个随机弧度
        var txt = aCode[j];//得到随机的一个内容
        show_num[i] = txt.toLowerCase();
        var x = 10 + i * 20;//文字在canvas上的x坐标
        var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = randomColor();
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
        context.strokeStyle = randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
        context.strokeStyle = randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
    }
}

//得到随机的颜色值
function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
};

// 验证表单
// var uname = localStorage.getItem("username");

function login (){
    var uname = $("#username").val();
    // var ;
    if(uname==localStorage.getItem("username")){
        
        console.log(uname)
    }else{
        // $('#test2').on('click', function(){
        //     layer.open({
        //         type: 1,
        //         area: ['600px', '360px'],
        //         shadeClose: true, //点击遮罩关闭
        //         content: '\<\div style="padding:20px;">用户名或密码错误\<\/div>'
        //     });
        // });
    }


}


