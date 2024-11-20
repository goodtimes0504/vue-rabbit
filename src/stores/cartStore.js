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
    //定义action-delCart
    const delCart = (skuId) => {
      //删除购物车思路 1找到删除项的下标值 然后splice(index,1)删除 2.直接使用filter过滤掉
      cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
    }
    return {
      cartList,
      addCart,
      delCart,
    }
  },
  {
    persist: true,
  },
)
