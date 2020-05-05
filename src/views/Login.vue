<template>
    <div id="Login">
        <el-form :model="loginForm" ref="loginForm" :rules="rules" class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off"
                          aria-placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off"
                          aria-placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked"></el-checkbox>
            <el-button type="primary" style="width: 100%" @click="submitForm">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: 'admin',
                    password: '123'
                },
                checked: true,
                rules: {
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.postValueRequest('doLogin', this.loginForm).then(resp => {
                            if (resp) {
                                console.log(resp);
                                window.sessionStorage.setItem("user",JSON.stringify(resp.obj));
                                this.$router.replace('/home');
                                // console.log(resp.data)
                                // alert(JSON.stringify(resp))
                            }
                        })
                        //alert('submit!');
                    } else {
                        this.$message.error("请输入所有字段！");
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background-color: white;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 15px auto 15px auto;
        text-align: center;
        color: #505458;
    }
</style>
