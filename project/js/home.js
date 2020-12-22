$(document).ready(function(){
    // console.log($(window).width());
    $(window).resize(function(){	
        if($(window).width()<960){
            $('.layui-bg-black').css('transform','translateX(-200px)');
            $('.l-body').css('transform','translateX(-200px)');
            $('.layui-logo').css('transform','translateX(-40px)');
        }else if($(window).width()>960){
            $('.layui-bg-black').css('transform','translateX(0)');
            $('.l-body').css('transform','translateX(0)');
            $('.layui-logo').css('transform','translateX(0)');
        }
    });

    var username = localStorage.getItem("name");
    // var username = localStorage.getItem("name");
    $(".self").append(username);
    
    // 退出
    $("#out").click(function(){
        $(".self").empty()
        location.replace("./login.html");
        // console.log($(".self").innerText);
        // console.log($(".self").text())
        // console.log(username)
    })
    //搜索用户
    $('.searchBtn').click(function(){
        
        var suserm=$('.searchInp').val()
        // console.log(suserm)
        var users = JSON.parse(localStorage.getItem("users"));
        if(suserm==''){
            alert('请输入要搜索的用户名')
            return;
        }
        for(var i=0;i<users.length;i++){
            if(suserm==users[i].username){
                
                $('.admin').empty()
                $('<tr class="del-tr"><td>'+users[i].id+
                    '</td><td>'+users[i].username+
                    '</td><td>'+users[i].password+
                    '</td><td>'+users[i].phone+
                    '</td><td>'+ 
                    '<button class="layui-btn layui-btn-normal layui-btn-sm modify">修改</button>'+
                    '<button class="layui-btn layui-btn-danger layui-btn-sm del">删除</button>'+
                '</td></tr>').appendTo(".admin")

            }
        }

    })

    //搜索图书
    $('#searchBtn').click(function(){
        var suserm=$('.searchInp').val() //搜索框的值
        var guessLikes = JSON.parse(localStorage.getItem("guessLikes"));
        if(suserm==''){
            alert('请输入要搜索的书名')
            return;
        }
        for(var i=0;i<guessLikes.length;i++){
            // console.log(guessLikes[i].title)
          
            if(suserm==guessLikes[i].title){
                $('.guessLikesNews').empty()
                $('<tr class="del-tr">'+
                '<td>'+guessLikes[i].title+'</td>'+
                '<td>'+guessLikes[i].author+'</td>'+
                '<td>'+guessLikes[i].publishDate+'</td>'+
                '<td>'+guessLikes[i].publishing+'</td>'+
                '<td>'+guessLikes[i].desc+'</td>'+
                '<td><img src="'+'imgs'+'/guessLikes'+'\/' +guessLikes[i].img+'"'+'>'+'</td>'+
            '</tr>').appendTo(".guessLikesNews")
            }
        }

    })

    //  显示默认管理员用户
    var admin = JSON.parse(localStorage.getItem("users"));
    
    $('<tr>'+
    '<th>用户ID</th>'+
    '<th>用户名</th>'+
    '<th>密码</th>'+
    '<th>手机号</th>'+
    '<th>操作</th>'+
    '</tr>').appendTo(".addTr")

    for(var i=0;i<admin.length;i++){
        // console.log(admin[i]);
        // for(var j in admin[i]){
        //     console.log(admin[i][j]);
        // }
        $('<tr class="del-tr"><td>'+admin[i].id+
        '</td><td>'+admin[i].username+
        '</td><td>'+admin[i].password+
        '</td><td>'+admin[i].phone+
        '</td><td>'+ 
        '<button class="layui-btn layui-btn-normal layui-btn-sm modify">修改</button>'+
        '<button class="layui-btn layui-btn-danger layui-btn-sm del">删除</button>'+
        '</td></tr>').appendTo(".admin")
    }

    //修改用户功能
    $('.modify').click(function(){

        var users=JSON.parse(localStorage.getItem("users"));
        // var username = $('#username').val();
        // var password = $('#password').val();
        // var phone = $('#phone').val();
        var pageId = $(this).parents("tr").children().eq(0).text()*1; //页面所显示的用户名
        var pageName = $(this).parents("tr").children().eq(1).text(); //页面所显示的用户名
        var pagePass = $(this).parents("tr").children().eq(2).text(); //页面所显示的密码
        var pagePhone = $(this).parents("tr").children().eq(3).text(); //页面所显示的手机
        // console.log(pageId)
        // console.log(pageName)
        if(pageName == 'admin'){
            alert("管理员用户禁止修改")
            return;
        }

        layui.use('layer', function(){
            var layer = layui.layer;
            layer.open({
                type: 1, 
                content: 
                    '<form class="layui-form" action="" style="margin-top:30px; padding: 0 10px 0 30px">'+
                            '<div class="layui-form-item">'+
                                '<label class="layui-form-label" style="text-align-last: justify; position: relative;top: -4px;">用户名</label>'+
                                '<div class="layui-input-block">'+
                                '<input type="text" '+
                                    'name="title" '+
                                    'required'+
                                    'lay-verify="required" '+
                                    'placeholder="请输入用户名" '+
                                    'autocomplete="off" '+
                                    'class="layui-input"'+
                                    'style="width:87%"'+
                                    'id="username">'+
                                '</div>'+
                            '</div>'+
                            '<div class="layui-form-item">'+
                                '<label class="layui-form-label"'+
                                    'style="text-align-last: justify; position: relative;top: -4px;">密码'+
                                '</label>'+
                                '<div class="layui-input-inline" style="width: 350px; margin-right:0;">'+
                                '<input type="password" '+
                                    'name="password" '+
                                    'required lay-verify="required" '+
                                    'placeholder="请输入密码" '+
                                    'autocomplete="off" '+
                                    'class="layui-input"'+
                                    'style="width:87%"'+
                                    'id="password">'+
                                '</div>'+
                            '</div>'+
                            '<div class="layui-form-item">'+
                                '<label class="layui-form-label"'+
                                    'style="text-align-last: justify; position: relative;top: -4px;">手机号'+
                                '</label>'+
                                '<div class="layui-input-inline" style="width: 350px; margin-right:0;">'+
                                '<input type="text" '+
                                    'name="phone" '+
                                    'required lay-verify="required" '+
                                    'placeholder="请输入手机号" '+
                                    'autocomplete="off" '+
                                    'class="layui-input"'+
                                    'style="width:87%"'+
                                    'id="phone">'+
                                '</div>'+
                            '</div>'+
                        '</form>',
                 //这里content是一个普通的String
                area: ['500px', '300px'],
                btn: ['修改', '取消'],
                success: function(layero, index){
                    $('#username').val(pageName)
                    $('#password').val(pagePass)
                    $('#phone').val(pagePhone)
                },
                yes: function(index, layero){
                    var users=JSON.parse(localStorage.getItem("users"));
                    var newUsername = $('#username').val();
                    var newPassword = $('#password').val();
                    var newPhone = $('#phone').val();
                    var users = JSON.parse(localStorage.getItem("users"));//获取localStorage数据为数组
                    for(var i = 0;i<users.length;i++){
                        
                        if(newUsername == users[i].username){// 判断用户名是否相同
                            alert("用户名已存在");
                            return;
                            
                        }else if(users[i].phone == newPhone){
                            alert("手机号已存在");
                            return;
                        }
                    }
                    // var pageId = tds[0].innerHTML*1;//表格中的点击后对应的行的id
                    // console.log(pageId);
                    var arrs=[];//存储全部的users对象的id
                    $.each(users,function(i,k){
                        // console.log(k.id);//全部对象的id值
                        arrs.push(k.id);
                    });

                    // 新值覆盖旧值
                    users[arrs.indexOf(pageId)].username = newUsername;
                    users[arrs.indexOf(pageId)].password = newPassword;
                    users[arrs.indexOf(pageId)].phone = newPhone;      
                    // console.log(users[arrs.indexOf(pageId)].username)
                    localStorage.setItem("users",JSON.stringify(users));
                    location.reload();

                },
                btn2: function(index, layero){
                    //按钮【按钮二】的回调
                    // console.log(2);
                    // return false;
                },
                cancel: function(){ 
                    //右上角关闭回调
                    // console.log(4)
                    //return false 开启该代码可禁止点击该按钮关闭
                }
            });
            
        });
    })
    
    // 删除用户功能
    $('.del').click(function(){
        var username = $(this).parents("tr").children().eq(1).text() //页面所显示的用户名

        var userInfo = JSON.parse(localStorage.getItem("users"));//获取localStorage数据为数组
        if(username == "admin"){
            alert("管理员不能删除");
        }else{
            for(var i = 0;i<userInfo.length;i++){
                
                if(userInfo[i].username == username){// 判断用户名相同时再操作
                    
                    userInfo.splice(i,1)  //删除数组中索引为i的用户信息
    
                    $("tbody tr").eq(i).remove(); //删除数据存在的标签，eq(i)为localStorage的索引
                    
                }
            }
        }
        localStorage.setItem("users",JSON.stringify(userInfo)) //将新的数组重新存入localStorage
    })

    //删除全部
    $('.del-all').click(function(){
        var userInfo = JSON.parse(localStorage.getItem("users"));//获取localStorage数据为数组
        // console.log($("tbody tr").eq(i));
        // console.log($("tbody tr").eq(0).nextAll());
        userInfo.splice(1)          //删除数组中第一位后所有用户信息
        $("tbody tr").eq(0).nextAll().remove(); //删除数据存在的标签，eq(i)为localStorage的索引
        localStorage.setItem("users",JSON.stringify(userInfo)) //将新的数组重新存入localStorage

    })

    //添加用户
    $('#add-user').click(function(){
        //使用layer，加载layer模块
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.open({
                type: 1, 
                content: 
                    '<form class="layui-form" action="" style="margin-top:30px; padding: 0 10px 0 30px">'+
                            '<div class="layui-form-item">'+
                                '<label class="layui-form-label" style="text-align-last: justify; position: relative;top: -4px;">用户名</label>'+
                                '<div class="layui-input-block">'+
                                '<input type="text" '+
                                    'name="title" '+
                                    'required'+
                                    'lay-verify="required" '+
                                    'placeholder="请输入用户名" '+
                                    'autocomplete="off" '+
                                    'class="layui-input"'+
                                    'style="width:87%"'+
                                    'id="username">'+
                                '</div>'+
                            '</div>'+
                            '<div class="layui-form-item">'+
                                '<label class="layui-form-label"'+
                                    'style="text-align-last: justify; position: relative;top: -4px;">密码'+
                                '</label>'+
                                '<div class="layui-input-inline" style="width: 350px; margin-right:0;">'+
                                '<input type="password" '+
                                    'name="password" '+
                                    'required lay-verify="required" '+
                                    'placeholder="请输入密码" '+
                                    'autocomplete="off" '+
                                    'class="layui-input"'+
                                    'style="width:87%"'+
                                    'id="password">'+
                                '</div>'+
                            '</div>'+
                            '<div class="layui-form-item">'+
                                '<label class="layui-form-label"'+
                                    'style="text-align-last: justify; position: relative;top: -4px;">手机号'+
                                '</label>'+
                                '<div class="layui-input-inline" style="width: 350px; margin-right:0;">'+
                                '<input type="text" '+
                                    'name="phone" '+
                                    'required lay-verify="required" '+
                                    'placeholder="请输入手机号" '+
                                    'autocomplete="off" '+
                                    'class="layui-input"'+
                                    'style="width:87%"'+
                                    'id="phone">'+
                                '</div>'+
                            '</div>'+
                        '</form>',
                 //这里content是一个普通的String
                area: ['500px', '300px'],
                btn: ['新增', '取消'],
                yes: function(index, layero){
                    var users=JSON.parse(localStorage.getItem("users"));
                    var username = $('#username').val();
                    var password = $('#password').val();
                    var phone = $('#phone').val();
                    
                    for(var i = 0;i<users.length;i++){
                        if(username == users[i].username){
                            alert('用户名已存在');
                            return;
                        }
                    }
                   
                   
                    // console.log(a)
                    
                    var newId;
                    var obj = {
                        id:users.length+1,
                        username:username,
                        password:password,
                        phone:phone
                    };
                    users.push(obj);
                    localStorage.setItem("users",JSON.stringify(users))
                    location.reload();

                },
                btn2: function(index, layero){
                    //按钮【按钮二】的回调
                    // console.log(2);
                    // return false;
                },
                cancel: function(){ 
                    //右上角关闭回调
                    // console.log(4)
                    //return false 开启该代码可禁止点击该按钮关闭
                }
            });
        });    
    })

    $('.yhgl').click(function(){
        $('.search').css('textAlign','left');
        $('#test1').css('display','none');
        $('.userGl').text('用户管理')
        $('.back').text('后台用户')
        location.reload()
    })
    //图书管理
    $('.book').click(function(){
        // $('#test1').css('display','none');
        $('.userGl').text('图书管理')
        $('.back').text('')
        $('#add-user').css('display','none')
        // $('#add-user').css('margin-left','0')
        $('.addNewBook').css('display','inline-block')
    })
    // $('.addBook').click(function(){
    //     $('.search').css('textAlign','left');
    //     $('.userGl').text('图书管理')
    //     $('.back').text('图书添加')
    // })

    //图书添加
    $('.addBook').click(function(){
        $('.search').css('textAlign','left');
        $('.userGl').text('图书管理')
        $('.back').text('图书添加')
        $('#test1').css('display','none');
        $('#add-user').removeAttr('id')
        $('.addTr').empty();
        $('.content').css('display','block');
        $('.mid-top').css('display','block');
        $('.hotBookShow').css('display','none');
        $('.swiper-search').css('display','none');
        $('<tr>'+
            '<th>图书编号</th>'+
            '<th>图书名称</th>'+
            '<th>作者</th>'+
            '<th>出版社</th>'+
            '<th>图片</th>'+
            '<th>操作</th>'+
        '</tr>').appendTo(".addTr");
        $('.admin').empty();
        var def = JSON.parse(localStorage.getItem("addBooks"));
        // console.log(def)
        for(var i=0;i<def.length;i++){
            // console.log(admin[i]);
            // for(var j in admin[i]){
            //     console.log(admin[i][j]);
            // }
            $('<tr class="del-tr"><td>'+def[i].id+1+'</td>'+
                '<td>'+def[i].title+'</td>'+
                '<td>'+def[i].author+'</td>'+
                '<td>'+def[i].publishing+'</td>'+
                '<td><img src="'+'imgs'+'/guessLikes'+'\/' + def[i].img+'"'+'>'+'</td>'+
                '<td>'+'<button class="layui-btn layui-btn-normal layui-btn-sm modBook">修改</button>'+
                        '<button class="layui-btn layui-btn-danger layui-btn-sm delBook">删除</button>'+
                '</td>'+
            '</tr>').appendTo(".admin")
        }
        
    })
    //删除图书
    $('.admin').on("click",".delBook",function(){ 
        var title = $(this).parents("tr").children().eq(1).text() //页面所显示的用户名
        
        var addBooks = JSON.parse(localStorage.getItem("addBooks"));//获取localStorage数据为数组
        console.log(addBooks.length);

        for(var i = 0;i<addBooks.length;i++){
            
            console.log(addBooks[i].title )
            if(addBooks[i].title == title){// 判断用户名相同时再操作
                // addBooks.splice(i,1)  //删除数组中索引为i的用户信息

                // $("tbody tr").eq(i).remove(); //删除数据存在的标签，eq(i)为localStorage的索引
                
            }
        }

        localStorage.setItem("addBooks",JSON.stringify(addBooks)) //将新的数组重新存入localStorage

    })

    //删除全部图书
    $('.delAllBook').click(function(){
        console.log(123);
        $('.admin').remove()
        var addBooks = JSON.parse(localStorage.getItem("addBooks"));//获取localStorage数据为数组
        // addBooks = [];
        // localStorage.removeItem('addBooks')
        localStorage.setItem("addBooks",JSON.stringify(addBooks)) //将新的数组重新存入localStorage
    })


    // $('.delBook').click(function(){
    //     console.log(1)
    // })
    // $('.modBook').click(function(){
    //     console.log(2)
    // })

    //新增图书弹出框
    // $('#photo').change(function(){

    // })
    
    $('.addNewBook').click(function(){
        
        //使用layer，加载layer模块
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.open({
                type: 1, 
                content: 
                    '<form class="layui-form" action="" style="margin-top:30px;'+
                            'padding: 0 10px 0 30px" enctype="multipart/form-data">'+
                            '<div class="layui-form-item">'+
                                '<label class="layui-form-label" '+
                                'style="text-align-last: justify; position: relative;top: -4px;">'+
                                '图书名称</label>'+
                                '<div class="layui-input-block">'+
                                '<input type="text" '+
                                    'name="title" '+
                                    'required'+
                                    'lay-verify="required" '+
                                    'placeholder="请输入用图书名称" '+
                                    'autocomplete="off" '+
                                    'class="layui-input"'+
                                    'style="width:87%"'+
                                    'id="bookName">'+
                                '</div>'+
                            '</div>'+
                            '<div class="layui-form-item">'+
                                '<label class="layui-form-label"'+
                                    'style="text-align-last: justify; position: relative;top: -4px;">图书作者'+
                                '</label>'+
                                '<div class="layui-input-inline" style="width: 350px; margin-right:0;">'+
                                '<input type="text" '+
                                    'name="" '+
                                    'required lay-verify="required" '+
                                    'placeholder="请输入图书作者" '+
                                    'autocomplete="off" '+
                                    'class="layui-input"'+
                                    'style="width:87%"'+
                                    'id="bookAuthor">'+
                                '</div>'+
                            '</div>'+
                            '<div class="layui-form-item">'+
                                '<label class="layui-form-label"'+
                                    'style="text-align-last: justify; position: relative;top: -4px;">图书出版社'+
                                '</label>'+
                                '<div class="layui-input-inline" style="width: 350px; margin-right:0;">'+
                                '<input type="text" '+
                                    'name="phone" '+
                                    'required lay-verify="required" '+
                                    'placeholder="请输入出版社" '+
                                    'autocomplete="off" '+
                                    'class="layui-input"'+
                                    'style="width:87%"'+
                                    'id="publishing">'+
                                '</div>'+
                            '</div>'+
                            '<div class="layui-form-item">'+
                                '<label class="layui-form-label" accept="image/png, image/jpeg, image/gif, image/jpg"'+
                                    'style="text-align-last: justify; position: relative;top: -4px;">上传图片'+
                                '</label>'+
                                '<div class="layui-input-inline" style="width: 350px; margin-right:0;">'+
                                '<input type="file" '+
                                    'name="file" '+
                                    'required lay-verify="required" '+
                                    'autocomplete="off" '+
                                    'class="layui-input"'+
                                    // 'style="width:87%"'+
                                    'id="photo">'+
                                    // '<img src="" id="show" width="100">'+
                                    '<label for="photo" class="choose" onchange="upLoad(this)">选择图片</label>'+
                                    '<div class="showimg">'+
                                    '<img id="imgshow" src="" alt="">'+
                                    '<p id="imgname"></p>'+
                                    '</div>'+

                            '</div>'+
                            '</div>'+
                        '</form>',
                 //这里content是一个普通的String
                area: ['500px', '460px'],
                btn: ['新增', '取消'],
                yes: function(index, layero){
                    var addBook=JSON.parse(localStorage.getItem("addBooks"));
                    var bookName=$('#bookName').val()
                    var bookAuthor=$('#bookAuthor').val()
                    var publishing=$('#publishing').val()
                    var img = $('#imgname').text()
                    $('<tr class="del-tr"><td>'+1+'</td>'+
                        '<td>'+bookName+'</td>'+
                        '<td>'+bookAuthor+'</td>'+
                        '<td>'+publishing+'</td>'+
                        '<td><img src="'+'imgs'+'/guessLikes'+'\/' + img+'"'+'>'+'</td>'+
                        '<td>'+'<button class="layui-btn layui-btn-normal layui-btn-sm modBook">修改</button>'+
                                '<button class="layui-btn layui-btn-danger layui-btn-sm delBook">删除</button>'+
                        '</td>'+
                    '</tr>').appendTo(".admin")

                    var obj = {
                        id:addBooks.length+1,
                        bookName:bookName,
                        publishing:publishing,
                        img:img
                    };
                    addBooks.push(obj);

                    localStorage.setItem("addBooks",JSON.stringify(addBooks))

                },
                success: function(layero, index){
                   //在input file内容改变的时候触发事件
                    $('#photo').change(function(){
                        //获取input file的files文件数组;
                        //$('#filed')获取的是jQuery对象，.get(0)转为原生对象;
                        var file = $('#photo').get(0).files[0];
                        //创建用来读取此文件的对象
                        var reader = new FileReader();
                        //使用该对象读取file文件
                        reader.readAsDataURL(file);
                        //读取文件成功后执行的方法函数
                        reader.onload=function(e){
                        //读取成功后返回的一个参数e
                            // console.log(e.target.result);
                        //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
                            $('#imgshow').get(0).src = e.target.result;
                            $('#imgname').text(file.name);
                        }
                    })
                },
                btn2: function(index, layero){
                    //按钮【按钮二】的回调
                    // console.log(2);
                    // return false;
                },
                cancel: function(){ 
                    //右上角关闭回调
                    // console.log(4)
                    //return false 开启该代码可禁止点击该按钮关闭
                }
            });
        });
    })

    // 图书查询
    $('.searchBook').click(function(){
        $('.search').css('textAlign','center');
        $('#searchBtn').removeClass('searchBtn');
        $('#test1').css('display','none');
        $('.guessLikesHead').empty();
        $('.swiper-wrapper').empty();
        $('.guessLikesNews').empty();
        $('.userGl').text('图书管理')
        $('.back').text('图书查询')
        $('#add-user').removeAttr('id')
        $('.content').css('display','none');
        $('.swiper-search').css('display','block');
        $('.mid-top').css('display','block');
        $('.hotBookShow').css('display','none');
       
        var slides = JSON.parse(localStorage.getItem("slides"));

        for(var i = 0;i < slides.length;i++){
            // console.log(slides[i])
            
            $('<div class="swiper-slide">'+
                    '<img src="imgs/slides/'+slides[i]+'">'+
                '</div>').appendTo(".swiper-wrapper");
            var mySwiper = new Swiper ('.swiper-container', {
                loop: true, // 循环模式选项
                autoplay:{
                    disableOnInteraction: false,
                },
                // effect : 'coverflow',
                // slidesPerView: 3,
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true,
                    clickable :true,
                },
            })
            
        }
        var guessLikes = JSON.parse(localStorage.getItem("guessLikes"));
        $('<tr>'+
            '<th>名称</th>'+
            '<th>作者</th>'+
            '<th>出版时间</th>'+
            '<th>出版社</th>'+
            '<th class="jianjie">简介</th>'+
            '<th>图片</th>'+
        '</tr>').appendTo(".guessLikesHead");
        for(var i = 0;i<guessLikes.length;i++){
            $('<tr class="del-tr">'+
                '<td>'+guessLikes[i].title+'</td>'+
                '<td>'+guessLikes[i].author+'</td>'+
                '<td>'+guessLikes[i].publishDate+'</td>'+
                '<td>'+guessLikes[i].publishing+'</td>'+
                '<td><p class="jdesc">'+guessLikes[i].desc+'</p></td>'+
                '<td><img src="'+'imgs'+'/guessLikes'+'\/' +guessLikes[i].img+'"'+'>'+'</td>'+
            '</tr>').appendTo(".guessLikesNews")
        }
            


    })

    // 热销书展示
    $('.hotBook').click(function(){
        $('.hotBookShow').css('display','block');
        $('#test1').css('display','block');
        $('.userGl').text('图书管理');
        $('.back').text('热销书展示');
        $('.mid-top').css('display','none');
        $('.content').css('display','none');
        $('.swiper-search').css('display','none');
        
        var books = JSON.parse(localStorage.getItem("books"));


        layui.use('laypage', function(){
            var laypage = layui.laypage;
            var books=JSON.parse(localStorage.getItem("books"));  

            laypage.render({
                elem: 'test1',
                limit:6,
                count:12,
                jump: function(obj){
                //模拟渲染
                    document.getElementById('hotBookShow').innerHTML = function(){
                        var arr = []
                        ,thisData = books.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
                        layui.each(thisData, function(index, item){
                            //折扣价
                            var count = ((item.newPrice/item.oldPrice)*100/10).toFixed(1)
                            arr.push('<div class="showBook showBook'+[i]+'">'+
                                    '<p><img class="hotImg" src="imgs/books/'+ item.img +'"></p>'+
                                    '<p class="desc">'+ item.desc +'</p>'+
                                    '<p class="price">'+
                                        '<span class="newPrice">'+'团购价'+ item.newPrice +'</span>'+
                                        '<span class="oldPrice">'+ item.oldPrice +'</span>'+
                                        '<span class="discount">'+ count +'折</span>'+
                                    '</p>'+
                                '</div>');
                        });
                            return arr.join('');
                    }();
                }
            });
        })
    });


});



