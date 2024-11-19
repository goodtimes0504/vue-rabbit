//判断是否进入视口
import { useIntersectionObserver } from "@vueuse/core"
//定义懒加载插件
export const lazyPlugin = {
  install(app) {
    //懒加载指令逻辑
    //自定义全局指令
    app.directive("img-lazy", {
      mounted(el, binding) {
        //el:指令绑定的那个元素
        //binding:binding.value 指令等于号后面绑定的表达式的值 图片url
        // console.log(el, binding)
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          //   console.log(isIntersecting)
          if (isIntersecting) {
            el.src = binding.value
            stop()
          }
        })
      },
    })
  },
}
