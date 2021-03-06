<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <Navbar :product_num="product_length" v-on:increment="CounterCoupute"></Navbar>
    <Alert/>
    <div class="container my-5">
        <div class="d-none d-lg-flex mb-5">
          <div class="h3 alert alert-primary bg-warning progress_bar mx-auto border-0 text-center d-flex justify-content-center align-items-center">
            <p class="m-0 text-dark font-weight-bold">購物車內容</p>
          </div>
          <div class="h3 alert alert-primary non_progress_bar border border-dark border-right-0 border-left-0 mx-auto text-center d-flex justify-content-center align-items-center rounded-0">
            <p class="m-0 text-muted">填寫資料</p>
          </div>
          <div class="h3 alert alert-primary non_progress_bar mx-auto border border-dark border-right-0 border-left-0 d-flex justify-content-center align-items-center">
            <p class="m-0 text-muted">訂單確認</p>
          </div>
        </div>
        <div class="d-flex d-lg-none h3 alert alert-primary bg-warning progress_bar mx-auto border-0 text-center justify-content-center align-items-center mb-5">
          <p class="m-0 text-dark font-weight-bold">購物車內容</p>
        </div>
        <div class="row">
          <div class="col-lg-9">
            <h2 class="text-center bg-warning py-2">購物車內容</h2>
            <table class="table mt-4">
                <thead>
                    <th class="border-bottom-0" width="10"></th>
                    <th class="d-none d-md-block border-bottom-0" >商品圖片</th>
                    <th class="border-bottom-0 table_product" >商品名稱</th>
                    <th class="border-bottom-0" >金額</th>
                </thead>
                <tbody>
                  <tr v-for="(item, key) in carts" :key="key">
                    <td>
                      <button type="button" class="btn btn-outline-danger rounded-0" @click="delProduct(item.id)">
                        <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                      </button>
                    </td>
                    <td class="d-none d-md-block">
                      <img :src="item.product.imageUrl" width="70px" height="70px" :alt="item.product.title商品">
                    </td>
                      <td class="h5">
                        <div class="d-flex justify-content-between">
                          <span>{{ item.product.title }}</span>
                          <div class="input-group w-50 d-none d-sm-flex">
                            <div class="input-group-prepend">
                              <button type="button" class="btn btn-grey border border-dark rounded-0" @click="addToCart(item, -1)">-</button>
                            </div>
                            <input type="text" class="form-control text-center qty" placeholder="0" aria-label="1" aria-describedby="basic-addon1" v-model="item.qty">
                            <div class="input-group-append">
                              <button type="button" class="btn btn-grey border border-dark rounded-0" @click="addToCart(item, 1)">+</button>
                            </div>
                          </div>
                        </div>
                        <span class="text-muted h5">{{item.product.price| currency }}
                        </span>

                        <div class="input-group d-flex d-sm-none">
                          <div class="input-group-prepend">
                            <button type="button" class="btn btn-grey border border-dark rounded-0" @click="addToCart(item, -1)">-</button>
                          </div>
                          <input type="text" class="form-control text-center qty" placeholder="0" aria-label="1" aria-describedby="basic-addon1" v-model="item.qty">
                          <div class="input-group-append">
                            <button type="button" class="btn btn-grey border border-dark rounded-0" @click="addToCart(item, 1)">+</button>
                          </div>
                        </div>
                      </td>
                      <td class="h5 text-right">
                        {{ item.qty*item.product.price| currency }}
                    </td>
                  </tr>
                </tbody>
            </table>
          </div>
          <div class="col-lg-3">
            <h2 class="bg-light py-2 text-center">應付金額</h2>
            <div class="d-flex justify-content-between">
              <div class="h5">小計</div>
              <div class="h5">{{ total| currency }}</div>
            </div>
            <div class="d-flex justify-content-between border-bottom border-dark mb-2">
              <div class="h5 mb-1">運費</div>
              <div class="h5 mb-1">{{ 0| currency }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div class="h5 text-danger">總計</div>
              <div class="h5 text-danger">{{ total| currency }}</div>
            </div>
            <div class="d-flex justify-content-between" v-if="final_total!==total && hasCoupon">
              <div class="h5 text-success">折扣價</div>
              <div class="h5 text-success">{{ final_total| currency }}</div>
            </div>

            <div class="input-group mb-3 mt-3">
              <input type="text" class="form-control border border-warning rounded-0" v-model="coupon_code" placeholder="輸入1234折扣碼" aria-label="Recipient's username" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button class="btn btn-warning rounded-0" type="button" @click="addCouponCode">套用優惠券</button>
              </div>
            </div>
            <router-link to="customer2">
              <button type="button" class="btn btn-warning btn-lg w-100 rounded-0">確認訂單</button>
            </router-link>
          </div>
        </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import $ from 'jquery'
import Alert from '../AlertMessage'
import Navbar from '../Navbar'
import Footer from '../Footer'
export default {
  name: 'Customer1',
  data () {
    return {
      isLoading: false,
      carts: [],
      carData: JSON.parse(localStorage.getItem('carData')) || [],
      total: 0,
      final_total: 0,
      coupon_code: '',
      product_length: 0,
      hasCoupon: false
    }
  },
  methods: {
    getList () {
      const vm = this
      vm.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$http.get(url).then((response) => {
        if (response.data.data.carts) {
          vm.carts = response.data.data.carts
          localStorage.setItem('cartData', JSON.stringify(vm.carts))
          vm.cartData = JSON.parse(localStorage.getItem('cartData')) || []
          vm.product_length = response.data.data.carts.length
          vm.total = response.data.data.total
          vm.final_total = response.data.data.final_total
        }
        vm.isLoading = false
      })
    },
    delProduct (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.isLoading = false
          vm.$bus.$emit('messsage:push', response.data.message, 'danger')
        } else {
          vm.isLoading = false
          vm.$bus.$emit('messsage:push', response.data.message, 'danger')
        }
        vm.getList()
      })
    },
    addCouponCode () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      this.$http.post(api, { data: coupon }).then((response) => {
        if (response.data.success) {
          vm.hasCoupon = response.data.success
          vm.$bus.$emit('messsage:push', response.data.message, 'success')
          this.getList()
          vm.isLoading = false
        } else {
          vm.hasCoupon = response.data.success
          vm.$bus.$emit('messsage:push', response.data.message, 'danger')
          this.getList()
          vm.isLoading = false
        }
      })
      vm.coupon_code = ''
    },
    CounterCoupute (cartTotalLength) {
      this.getList()
      this.product_length = cartTotalLength
    },
    CalQty (data, cal, num) {
      if (cal) {
        data.qty += num
      } else {
        data.qty -= num
      }
    },
    postCart () {
      const vm = this
      vm.isLoading = true
      const cacheID = []
      vm.axios.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`)
        .then((res) => {
          console.log('第一關')
          const cacheData = res.data.data.carts
          cacheData.forEach((item) => {
            cacheID.push(item.id)
          })
        }).then(() => {
          cacheID.forEach((item) => {
            vm.axios.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item}`).then(() => {
              console.log('第二關-購物車已經清空')
            })
          })
        }).then(() => {
          console.log('第三關')
          vm.cartData.forEach((item) => {
            const cache = {
              product_id: item.product_id,
              qty: item.qty
            }
            vm.axios.post(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`, { data: cache })
              .then(() => {
                vm.cartData = []
                localStorage.removeItem('cartData')
                vm.isLoading = false
                vm.getList()
              })
          })
        })
    },
    addToCart (data, num) {
      data.qty += num
      const vm = this
      const cartID = []
      vm.cartData = JSON.parse(localStorage.getItem('cartData')) || []
      vm.cartData.forEach((item, index) => {
        cartID.push(item.product_id)
      })
      if (cartID.indexOf(data.product_id) === -1) {
        console.log('沒有這項產品')
        const cartContent = {
          product_id: data.id,
          qty: data.qty,
          name: data.title,
          origin_price: data.origin_price,
          price: data.price
        }
        vm.cartData.push(cartContent)
        localStorage.setItem('cartData', JSON.stringify(vm.cartData))
        $('#productModal').modal('hide')
      } else {
        console.log('有這項產品')
        let cache = {}
        vm.cartData.forEach((item, index) => {
          if (item.product_id === data.product_id) {
            const number = item.qty + num
            console.log('數量', number)
            cache = {
              product_id: data.product_id,
              qty: number,
              name: data.title,
              origin_price: data.origin_price,
              price: data.price
            }
            vm.cartData.splice(index, 1)
          }
        })
        vm.cartData.push(cache)
        localStorage.setItem('cartData', JSON.stringify(vm.cartData))
      }
      vm.$bus.$emit('messsage:push', '已加入購物車', 'success')
      vm.postCart()
    }
  },
  created () {
    this.getList()
  },
  components: {
    Alert,
    Navbar,
    Footer
  }
}
</script>

<style scoped lang="scss">
.non_progress_bar{
  width: 200px;
  height: 50px;
  background: #fff;
}
.non_progress_bar:before{
  position: absolute;
  background-color: #fff;
  left: -25px;
  top: 0;
  width:50px;
  height:49px;
  content:" ";
  border-radius:49%;
  z-index:-1;
  border:1px solid black;
}
.non_progress_bar:after{
  position: absolute;
  background-color: #fff;
  right: -25px;
  top: 0;
  width:50px;
  height:49px;
  content:" ";
  border-radius:50%;
  z-index:-1;
  border:1px solid black;
}
.progress_bar{
  width: 200px;
  height: 50px;
  z-index: 1;
}
.progress_bar:before{
  position: absolute;
  background-color: yellow;
  left: -25px;
  top: 0;
  width:50px;
  height:50px;
  content:" ";
  border-radius:50%;
  z-index:-1;
}
.progress_bar:after{
  position: absolute;
  background-color: yellow;
  right: -25px;
  top: 0;
  width:50px;
  height:50px;
  content:" ";
  border-radius:50%;
  z-index:-1;
}
.table_product{
  width:300px;
}
@media(max-width:568px){
  .table_product{
    width:200px;
  }
}
</style>
