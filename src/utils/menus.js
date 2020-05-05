import {getRequest} from "./api";

//初试话菜单
export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/api/system/menu").then(data => {
        if (data) {
            console.log("check："+data);
            let fmtRoutes = formatRoutes(data);
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes', fmtRoutes);
        }
    }).catch(e=>console.log("Promise err"+e))
}
export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,
            component(resolve) {
                if (component.startsWith("Home")) {
                    require(['../views/' + component + '.vue'], resolve);
                } else if (component.startsWith("Emp")) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                } else if (component.startsWith("Per")) {
                    require(['../views/per/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sal")) {
                    require(['../views/sal/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sta")) {
                    require(['../views/sta/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sys")) {
                    require(['../views/sys/' + component + '.vue'], resolve);
                }
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}
// import {getRequest} from "./api";
//
// export const initMenu=(router,store)=>{
//     //说明Vuex状态管理里面存在status 则不再进行请求
//     if (store.state.routes.length > 0){
//         return;
//     }
//     //进行请求菜单数据
//     getRequest("/api/system/menu").then(data=>{
//         if (data){
//             let fmtRoutes=formatRoutes(data)
//             //将返回格式化之后的menu进行加入到routes中
//             router.addRoutes(fmtRoutes)
//             //将菜单数据保存到store状态管理 通过commit进行提交
//             store.commit('initRoutes',fmtRoutes)
//         }
//     })
// }
//
// //进行格式化路由菜单数据
// export const formatRoutes=(routes)=>{
//     let fmtRoutes=[];
//     routes.forEach(router=>{
//         //批量的定义
//         let {
//             path,
//             component,
//             name,
//             meta,
//             iconCls,
//             children
//         }=router;
//         if (children && children instanceof Array){
//             children=formatRoutes(children);
//         }
//         let fmRouter={
//             path:path,
//             name:name,
//             iconCls:iconCls,
//             meta:meta,
//             children:children,
//             component(resolve){
//                 //菜单的views的动态加载  进行和数据库形式的动态样式加载
//                 if (component.startsWith('Emp')){
//                     require(['../views/emp/'+component+'.vue'],resolve);
//                 }else if (component.startsWith('Per')){
//                     require(['../views/per/'+component+'.vue'],resolve);
//                 }
//                 else if (component.startsWith('Sal')){
//                     require(['../views/sal/'+component+'.vue'],resolve);
//                 }
//                 else if (component.startsWith('Sta')){
//                     require(['../views/sta/'+component+'.vue'],resolve);
//                 }
//                 else if (component.startsWith('Sys')){
//                     require(['../views/sys/'+component+'.vue'],resolve);
//                 }
//
//             }
//         }
//         fmtRoutes.push(fmRouter)
//     })
//     return fmtRoutes;
// }


