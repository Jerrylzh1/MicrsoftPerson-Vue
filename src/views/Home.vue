<template>
    <div>
        <el-container>
            <el-header class="HeaderColor">
                <div class="title">
                    微人事
                </div>
                <el-dropdown class="userInfo" @command="commandHandle" trigger="click">
  <span class="el-dropdown-link">
    {{user.name}}<i><img :src="user.userface"></i>
  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </el-header>
            <el-container>
                <!--侧边菜单导航栏-->
                <el-aside width="200px">
                    <el-menu
                            class="el-menu-vertical-demo"
                             router unique-opened>
                        <!--菜单导航需要进行:index的绑定-->
                        <el-submenu :index="index+''" v-for="(item,index) in routes" :key="index" >
                            <template slot="title" v-if="!item.hidden">
                                <!--导航列表的图标-->
                                <i :class="item.iconCls"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">{{child.name}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
                        欢迎来到微人事！！！
                    </div>
                    <router-view class="RouterViewClass"/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return {
                user:JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        computed:{
          routes(){
              console.log("菜单列表："+this.$store.state.routes);
              return this.$store.state.routes;
          }
        },
        methods:{
            // showInfo(){
            //   this.getRequest("/api/system/menu").then(resp=>{
            //     console.log(resp.data);
            //   })
            // },
            //进行选择菜单跳转路径
            // findMenu(index){
            //     // console.log(index),
            //     // console.log(indexPath)
            //     this.$router.push(index)
            // },
            commandHandle(cmd){
                if (cmd==='logout'){
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout");
                        window.sessionStorage.removeItem("user");
                        //登出的时候进行清空store状态
                        this.$store.commit('initRoutes', []);
                        this.$router.replace("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消注销'
                        });
                    });
                    }
                if (cmd==='setting'){
                    alert("设置")
                }
                if (cmd==='userInfo'){
                    alert("用户信息")
                }
            }
        }
    }
</script>

<style>
    .RouterViewClass{
        margin-top: 20px;
    }
    .homeWelcome{
        text-align: center;
        font-size: 30px;
        font-family: 华文楷体;
        color: #3facff;
        padding-top: 50px;
    }
    .HeaderColor{
        background-color: #452aff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 15px;
        box-sizing: border-box;
    }
    .HeaderColor .title{
        font-size: 30px;
        font-family: 华文楷体;
        color: #ffffff;
    }
    .HeaderColor .userInfo{
        cursor: pointer;
    }
    .el-dropdown-link img{
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }
    .el-dropdown-link{
        display: flex;
        align-items: center;
    }

</style>
