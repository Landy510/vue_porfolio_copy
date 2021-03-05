<template>
  <div>
    <div class="vld-parent">
        <loading :active.sync="isLoading"></loading>
    </div>
    <Navbar :product_num="product_length" v-on:increment="CounterCoupute"></Navbar>
    <Alert/>
    <div class="container">
        <div class="justify-content-center align-items-center d-none d-md-flex mt-4 mb-4">
            <div>
                <div class="rounded-circle d-flex justify-content-center align-items-center h3 alert alert-primary mb-1" style="width:100px;height:100px;">Step1</div>
                <div class="text-center font-weight-bold">購物車</div>
            </div>
            <div style="width:200px;height:1px;border:0.01px solid black;"></div>
            <div>
                <div class="rounded-circle d-flex justify-content-center align-items-center h3 alert alert-light mb-1 border-dark" style="width:100px;height:100px;">Step2</div>
                <div class="text-center font-weight-bold">填寫資料</div>
            </div>
            <div style="width:200px;height:1px;border:0.01px solid black;"></div>
            <div>
                <div class="rounded-circle d-flex justify-content-center align-items-center h3 alert alert-light mb-1 border-dark" style="width:100px;height:100px;">Step3</div>
                <div class="text-center font-weight-bold">訂單確認</div>
            </div>
        </div>
        <div class="d-flex d-md-none justify-content-center mt-4">
            <div>
                <div class="rounded-circle d-flex justify-content-center align-items-center h3 alert alert-primary mb-1" style="width:100px;height:100px;">Step1</div>
                <div class="text-center font-weight-bold">購物車</div>
            </div>
        </div>
        <h2 class="text-center bg-warning py-2">購物車內容</h2>

        <div v-if="carts.length!==0">
            <table class="table mt-4">
                <thead>
                    <th class=" border-bottom-0" width="10"></th>
                    <th class="d-none d-md-block border-bottom-0" >商品圖片</th>
                    <th class=" border-bottom-0" >商品名稱</th>
                    <th width="100" class=" border-bottom-0" >數量</th>
                    <th class=" border-bottom-0" >金額</th>

                </thead>
                <tbody>
                    <tr v-for="(item, key) in carts" :key="key">
                        <td>
                            <button type="button" class="btn btn-outline-danger" @click="delProduct(item.id)">

                                <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                            </button>
                        </td>
                        <td class="d-none d-md-block">
                            <img :src="item.product.imageUrl" width="70px" height="70px" :alt="item.product.title商品">
                        </td>
                        <td class="h5">{{ item.product.title }}</td>
                        <td class="h5">
                        {{ item.qty }} /{{ item.product.unit }}
                        </td>

                        <td class="h5">
                            {{ item.qty*item.product.price| currency }}
                        </td>

                    </tr>

                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="5" class="text-right h5">小計: <span>{{ total| currency }}</span></td>
                    </tr>
                    <tr>
                        <td colspan="5" class="text-right h5 border-0">運費: <span>0</span></td>
                    </tr>
                    <tr>
                        <td colspan="5" class="text-right h5 text-danger">總計: <span class="h2">{{ total| currency }}</span></td>
                    </tr>
                    <tr>
                        <td colspan="5" class="text-right h5 text-success" v-if="final_total!==total && hasCoupon">折扣價: <span class="h2">{{ final_total| currency }}</span></td>
                    </tr>
                </tfoot>
            </table>

            <div class="input-group mb-3">
                <input type="text" class="form-control border border-success" v-model="coupon_code" placeholder="輸入1234折扣碼，即可享有折扣" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-success" type="button" @click="addCouponCode">套用優惠券</button>
                </div>
            </div>
            <router-link to="customer2">
                <button type="button" class="btn btn-warning btn-lg ml-auto d-block mb-3 confirm_btn">確認訂單，前往下一步</button>
            </router-link>
        </div>
        <div v-else>
            <h2 class="text-center">購物車裡面沒有商品喔~~</h2>
        </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';
import Alert from './AlertMessage'
import Navbar from './Navbar'
export default {
  name: 'Customer1',
  data () {
    return {
      isLoading: false,
      carts: [],
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
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$http.get(api).then((response) => {
        console.log('Customer1', response)
        vm.carts = response.data.data.carts
        vm.total = response.data.data.total
        vm.final_total = response.data.data.final_total
        vm.product_length = response.data.data.carts.length
        vm.isLoading = false
      })
    },
    delProduct (id) {
      console.log(id)
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      this.$http.delete(api).then((response) => {
        console.log(response)
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
        console.log('優惠券', response.data.success)
        vm.hasCoupon = response.data.success
        this.getList()
        vm.isLoading = false
      })
    },
    CounterCoupute (cart_total_length) {
      this.getList()
      this.product_length = cart_total_length
    }
  },
  created () {
    this.getList()
  },
  components: {
    Alert,
    Navbar
  }
}
</script>

<style scoped>
.confirm_btn{
  width:50%;
}
@media(max-width:680px){
  .confirm_btn{
    width:100%;
  }
}
</style>
