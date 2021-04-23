$(function () {
    // 登陆表单和注册表达你的切换
    //单机注册按钮
    // $("#link_reg").on('click', function () {
    //    // alert('1111');
    //     //注册表单显示
    //     $('.reg-box').show();
    //     //登陆表单隐藏
    //     $('.login-box').hide();
    // })

    // //单机注册按钮
    // $("#link_login").on('click', function () {
    //       //注册表单显示
    //       $('.reg-box').hide();
    //       //登陆表单隐藏
    //       $('.login-box').show();
    // });

    $("#link_reg,#link_login").on('click',function () {
        $('.reg-box,.login-box').toggle();
    });


    // 自定义表单校验规则
    layui.form.verify({
        //pwd 规则的名称
        pwd: [
            //密码必须是6-12位的非空字符
            /^[\s]{6,12}$/,
        ],
        repwd: function (value, item) {
            var pwd = $("#form_reg[name=password]").val();
            if (pwd !== value) {
                return '两次密码必须一致'
            }
         }
    })


    //注册功能
    $("#form_reg").on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $("#form_reg [name=username]").val().trim(),
            password: $("#form_reg [name=password]").val().trim(),
        }

        $.ajax({
            method: 'post',
            url: 'http://api-breakinggnews-web.itheima.net/api/reguser',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    //return alert('注册失败');
                    return layui.layer.msg(res.message, { icon:5})
                }
                layui.layer.msg("注册用户成功", { icon: 6 }, function () {
                    $("#link_login").lick();    
                    
                })
            }
           
        })
    })
})

//登陆功能
$('#form_reg').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize()
    $.ajax({
        method: 'post',
        url:'/api/login',
        url: 'http://api-breakingnews-web.itheima.net/api/login',
        data: data,
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message, { icon: 5 });
                
            }
            layui.layer.msg(res.message, { icon: 6 }, function () {
                localStorage.setItem('token',res.token);
                location.href = "/index.html";
            })
        }
    })
});