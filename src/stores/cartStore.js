//封装购物车模块
import { defineStore } from "pinia"
import { ref } from "vue"
export const useCartStore = defineStore(
  "cart",
  () => {
    //定义state -cartList
    const cartList = ref([])
    //定义action -addCart
    const addCart = (goods) => {
      //添加购物车操作 已经添加过的话count+1 没添加过的话 push进去
      //思路是匹配传过来的商品对象中的skuId 是否在cartList购物车列表中存在
      const item = cartList.value.find((item) => item.skuId === goods.skuId)
      if (item) {
        item.count += goods.count
      } else {
        cartList.value.push(goods)
      }
    }
    return {
      cartList,
      addCart,
    }
  },
  {
    persist: true,
  },
)
