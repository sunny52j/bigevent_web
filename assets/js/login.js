$(function () {
    //点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //点击去登录的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    //从layui中获取form对象
    var form = layui.form;
    //从layui中获取layer对象
    var layer = layui.layer;
    //通过form.verify()函数定哟校验规则
    form.verify({
        //定义一个叫pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致
        //通过形参拿到的是确认密码框的内容
        repwd: function (value) {
            //还需要拿到密码框中的内容
            var pwd = $('.reg-box [name=password]').val();
            //然后进行一次等于的判断
            if (pwd !== value) {
                //如果判断失败,则return一个提示消息即可
                return '两次密码不一致！';
            }
        }
    })
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //阻止默认提交行为
        e.preventDefault();
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        //发起ajax的post请求
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录');
            // 模拟点击行为
            $('#link_login').click();
        })
    })
    //监听注册表单的提交事件
    $('#form_login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // $.ajax({
        //     url: 'http://api-breakingnews-web.itheima.net/api/login',
        //     method: 'POST',
        //     //快速获取表单中的数据
        //     data: $(this).serialize(),
        //     success：function(res) {
        //         if (res.status !== 0) {
        //             return layer.msg('登录失败！')
        //         }
        //         layer.msg('登录成功！')
        //         //跳转到后台主页
        //         console.log(reg.token);
        //         Location.href='/index.html'
        //     }
        // })
        $.post('/api/login', $(this).serialize(), function (res) {
            if (res.status !== 0) {
                return layer.msg('登录失败！')
            }
            layer.msg('登录成功！');
            //将登录成功的token字符串保存到localstorage中
            localStorage.setItem('token', res.token);
            //跳转到后台主页
            location.href = '/index.html';
        })
    })
})