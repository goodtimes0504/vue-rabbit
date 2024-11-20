//封装购物车模块
import { defineStore } from "pinia"
import { ref, computed, nextTick } from "vue"
import { useUserStore } from "./userStore"
import { insertCartApi, findNewCartListApi, delCartApi } from "@/apis/cart"
export const useCartStore = defineStore(
  "cart",
  () => {
    //定义state -userStore
    const userStore = useUserStore()
    const isLogin = computed(() => {
      return !!userStore.userInfo.token
    })
    //定义state -cartList
    const cartList = ref([])
    //定义action -addCart
    const addCart = async (goods) => {
      if (isLogin.value) {
        //登陆后的加入购物车的逻辑 调用加入购物车接口 然后从云端拉取最新的购物车列表 覆盖本地的购物车列表
        const { skuId, count } = goods
        await insertCartApi({ skuId, count })
        //重新获取购物车列表
        //这里有bug 有可能会获取不到最新的购物车列表 所以需要使用nextTick 等待后端更新完毕再获取最新的购物车列表才可以
        //bug原理是 删除请求成功了 但是后端还没有更新完毕 所以不加nextTick获取到的数据可能是未更新的 所以这里使用nextTick 等待后端更新完毕再获取最新的购物车列表才可以
        nextTick(async () => {
          updateNewList()
        })
      } else {
        //未登录的加入购物车的逻辑
        //添加购物车操作 已经添加过的话count+1 没添加过的话 push进去
        //思路是匹配传过来的商品对象中的skuId 是否在cartList购物车列表中存在
        const item = cartList.value.find((item) => item.skuId === goods.skuId)
        if (item) {
          item.count += goods.count
        } else {
          cartList.value.push(goods)
        }
      }
    }
    //定义action-delCart
    const delCart = async (skuId) => {
      if (isLogin.value) {
        //登陆后的删除购物车的逻辑 调用删除购物车接口 然后从云端拉取最新的购物车列表 覆盖本地的购物车列表
        await delCartApi([skuId])
        //重新获取购物车列表
        nextTick(async () => {
          updateNewList()
        })
      } else {
        //删除购物车思路 1找到删除项的下标值 然后splice(index,1)删除 2.直接使用filter过滤掉
        cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
      }
    }
    //封装一个获取最新购物车列表的action
    const updateNewList = async () => {
      const res = await findNewCartListApi()
      cartList.value = res.result
    }
    //清除购物车
    const clearCart = async () => {
      cartList.value = []
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
    //计算属性 已选择的数量和总价
    const selectedCount = computed(() => {
      return cartList.value.reduce((sum, item) => {
        return sum + (item.selected ? item.count : 0)
      }, 0)
    })
    const selectedPrice = computed(() => {
      return cartList.value.reduce((sum, item) => {
        return sum + (item.selected ? item.count * item.price : 0)
      }, 0)
      //上面一定要记得写上第二个参数 0！！！！！！不然 sum是undefined 会报错
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
      selectedCount,
      selectedPrice,
      clearCart,
    }
  },
  {
    persist: true,
  },
)
