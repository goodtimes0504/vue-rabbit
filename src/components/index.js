//把components中的所欲哦组件都进行全局话注册
//通过插件的方式
//先导入所有组件
import ImageView from "./ImageView/index.vue"
import Sku from "./XtxSku/index.vue"
export const componentPlugin = {
  install(app) {
    //app.component("组件名",组件对象)
    app.component("XtxImageView", ImageView)
    app.component("XtxSku", Sku)
  },
}
