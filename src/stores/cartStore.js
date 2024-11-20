//封装购物车模块
import { defineStore } from "pinia"
import { ref, computed } from "vue"
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
    //定义action- singleCheck
    const singleCheck = (skuId, selected) => {
      //单选思路 1找到当前项 然后修改checked属性 2.直接使用map或者forEach遍历修改
      //   cartList.value = cartList.value.map((item) => {
      //     if (item.skuId === skuId) {
      //       item.selected = selected
      //     }
      //     return item
      //   })
      //   方法2
      cartList.value.forEach((item) => {
        if (item.skuId === skuId) {
          item.selected = selected
        }
      })
    }
    //定义action- allCheck
    const allCheck = (selected) => {
      //把cartList的每一项的selected都改为传过来的selected
      cartList.value.forEach((item) => {
        item.selected = selected
      })
    }
    //计算属性 总数是所有项的count之和 总价是所有项的count*price之和
    const total = computed(() => {
      return cartList.value.reduce((sum, item) => {
        return sum + item.count
      }, 0)
    })
    const totalPrice = computed(() => {
      return cartList.value.reduce((sum, item) => {
        return sum + item.count * item.price
      }, 0)
    })
    //计算属性 是否全选
    const isAll = computed(() => {
      return cartList.value.every((item) => item.selected)
    })
    return {
      //暴露出去
      cartList,
      addCart,
      delCart,
      total,
      totalPrice,
      singleCheck,
      isAll,
      allCheck,
    }
  },
  {
    persist: true,
  },
)
