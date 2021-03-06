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
          <div class="h3 alert alert-primary bg-warning progress_bar mx-auto border-0 text-center d-flex justify-content-center align-items-center">
            <p class="m-0 text-dark font-weight-bold">填寫資料</p>
          </div>
          <div class="h3 alert alert-primary non_progress_bar border border-dark border-right-0 border-left-0 mx-auto text-center d-flex justify-content-center align-items-center rounded-0">
            <p class="m-0 text-muted">資料確認</p>
          </div>
        </div>
        <div class="d-flex d-lg-none h3 alert alert-primary bg-warning progress_bar mx-auto border-0 text-center justify-content-center align-items-center mb-5">
          <p class="m-0 text-dark font-weight-bold">填寫資料</p>
        </div>
        <div class="row">
          <div class="col-lg-8 mb-2">
            <h2 class="bg-warning py-2 text-center">收件人資料</h2>
            <h5>星號(*)部分必填</h5>
            <div>
              <ValidationObserver v-slot="{ invalid, handleSubmit }">
                <form @submit.prevent="handleSubmit(submitForm)">
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <div class="form-group">
                      <label for="username">收件人姓名<span class="text-danger ml-1 font-weight-bold">*</span></label>
                      <input id="username" type="text" name="姓名"
                        class="form-control rounded-0" v-model="form.user.name" :class="classes" placeholder="輸入姓名" >
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider rules="required|email" v-slot="{ errors, classes }">
                    <div class="form-group">
                      <label for="email">Email<span class="text-danger ml-1 font-weight-bold">*</span></label>
                      <input id="email" type="email" name="email"
                        class="form-control rounded-0" v-model="form.user.email" :class="classes" placeholder="請輸入信箱">
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <div class="form-group">
                      <label for="useraddress">收件人地址<span class="text-danger ml-1 font-weight-bold">*</span></label>
                      <input id="useraddress" type="text" name="地址"
                        class="form-control rounded-0" v-model="form.user.address" :class="classes" placeholder="請輸入地址" >
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider rules="required" v-slot="{ errors, classes }">
                    <div class="form-group">
                      <label for="usertel">收件人電話<span class="text-danger ml-1 font-weight-bold">*</span></label>
                      <input id="usertel" type="tel" name="電話"
                        class="form-control rounded-0" v-model="form.user.tel" :class="classes" placeholder="請輸入電話" >
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider>
                    <div class="form-group">
                      <label for="comment">留言</label>
                      <textarea name="" id="comment" class="form-control rounded-0" cols="30" rows="10" v-model="form.message"></textarea>
                    </div>
                  </ValidationProvider>
                  <div class="text-right">
                    <button class="btn btn-danger rounded-0" :disabled="invalid">送出訂單</button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
          <div class="col-lg-4">
            <h2 class="text-center bg-light py-2 cart_content_btn d-block d-lg-none" @click="openCartContent">購物車內容
              <font-awesome-icon v-if="carts.length!==0" :icon="['fas','chevron-down']" size="1x" class="arrow"></font-awesome-icon>
            </h2>
            <h2 class="text-center bg-light py-2 d-none d-lg-block">購物車內容</h2>
            <div v-if="carts.length!==0" class="cart_content d-none d-lg-block">
              <div v-for="(item, index) in carts" :key="index">
                <div class="d-flex">
                  <img :src="item.product.imageUrl" width="150px" height="100px" :alt="item.product.title商品">
                  <div class="ml-3 w-100">
                    <div class="d-flex mb-2 font-weight-bold">
                      <div>課程名稱</div>
                      <div class="ml-auto text-right">{{ item.product.title }}</div>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                      <div>單價</div>
                      <div class="ml-auto">{{ item.product.price| currency }}</div>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                      <div>數量</div>
                      <div>{{ item.qty }} /{{ item.product.unit }}</div>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                      <div>小計</div>
                      <div>{{ item.qty*item.product.price| currency }} </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between border-top border-dark">
                <div class="h5 mt-2">小計</div>
                <div class="h5 mt-2">{{ total| currency }}</div>
              </div>
              <div class="d-flex justify-content-between">
                <div class="h5 mt-2">運費</div>
                <div class="h5 mt-2">{{ 0| currency }}</div>
              </div>
              <div class="d-flex justify-content-between text-danger">
                <div class="h5 mt-2">總計</div>
                <div class="h5 mt-2">{{ total| currency }}</div>
              </div>

              <div class="d-flex justify-content-between" v-if="final_total!==total">
                <div class="h5 text-success">折扣價</div>
                <div class="h5 text-success">{{ final_total| currency }}</div>
              </div>

            </div>
            <div v-if="carts.length!==0" class="cart_content d-lg-none">
              <table class="table mt-4">
                <thead>
                  <th class="border-bottom-0" width="200">商品名稱</th>
                  <th class="d-none d-md-block border-bottom-0" >商品圖片</th>
                  <th class="border-bottom-0" width="100">數量</th>
                  <th class="border-bottom-0" width="150">金額</th>
                </thead>
                <tbody>
                  <tr v-for="(item, key) in carts" :key="key">
                    <td class="h5">
                      <div class="d-flex justify-content-between">
                        <span>{{ item.product.title }}</span>
                      </div>
                      <span class="text-muted h5">{{item.product.price| currency }}
                      </span>
                    </td>
                    <td class="d-none d-md-block">
                      <img :src="item.product.imageUrl" width="70px" height="70px" :alt="item.product.title商品">
                    </td>
                    <td>{{item.qty}}/{{item.product.unit}}</td>
                    <td class="h5 text-right">
                      {{ item.qty*item.product.price| currency }}
                    </td>
                  </tr>
                  <tr class="table_total_display">
                    <td colspan="3" class="text-right h3">小計</td>
                    <td class="text-right h3 d-none d-md-block">{{ total|currency }}</td>
                  </tr>
                  <tr class="table_total_displaySmall">
                    <td colspan="2" class="text-right h3">小計</td>
                    <td class="text-right h3">{{ total|currency }}</td>
                  </tr>
                  <tr class="table_total_display">
                    <td colspan="3" class="text-right h3 border-top-0 pt-0">運費</td>
                    <td class="text-right h3 d-none d-md-block border-top-0 pt-0">{{ 0|currency }}</td>
                  </tr>
                  <tr class="table_total_displaySmall">
                    <td colspan="2" class="text-right h3 border-top-0 pt-0">運費</td>
                    <td class="text-right h3 border-top-0 pt-0">{{ 0|currency }}</td>
                  </tr>
                  <tr class="table_total_display">
                    <td colspan="3" class="text-right h3 border-top-0 pt-0">總計</td>
                    <td class="text-right h3 d-none d-md-block border-top-0 pt-0 text-danger">{{ total|currency }}</td>
                  </tr>
                  <tr class="table_total_displaySmall">
                    <td colspan="2" class="text-right h3 border-top-0 pt-0">總計</td>
                    <td class="text-right h3 border-top-0 pt-0 text-danger">{{ total|currency }}</td>
                  </tr>
                  <tr class="table_total_display" v-if="final_total!==total">
                    <td colspan="3" class="text-right h3 border-top-0 pt-0">折扣價</td>
                    <td class="text-right h3 d-none d-md-block border-top-0 pt-0 text-success">{{ final_total|currency }}</td>
                  </tr>
                  <tr class="table_total_displaySmall" v-if="final_total!==total">
                    <td colspan="2" class="text-right h3 border-top-0 pt-0">折扣價</td>
                    <td class="text-right h3 border-top-0 pt-0 text-success">{{ final_total|currency }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else>
              <h2 class="text-center">購物車裡面沒有商品喔~~</h2>
            </div>
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
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
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getList () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.carts = response.data.data.carts
        vm.total = response.data.data.total
        vm.final_total = response.data.data.final_total
        vm.isLoading = false
        vm.product_length = response.data.data.carts.length
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
        this.getList()
        vm.isLoading = false
      })
    },
    CounterCoupute (cartTotalLength) {
      this.getList()
      this.product_length = cartTotalLength
    },
    openCartContent () {
      $('.cart_content').slideToggle(1000)
      $('.arrow').toggleClass('active')
    },
    createOrder () {
      const vm = this
      const order = vm.form
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      this.$http.post(api, { data: order }).then((response) => {
        vm.isLoading = false
      })
    },
    submitForm () {
      const vm = this
      const order = vm.form
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      vm.isLoading = true
      this.$http.post(api, { data: order }).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/customerOrder/CustomerCheckout/${response.data.orderId}`) // 跳轉頁面
        }
      })
      vm.isLoading = false
    }
  },
  created () {
    this.getList()
  },
  components: {
    Alert,
    Navbar,
    Footer,
    ValidationProvider,
    ValidationObserver
  }
}
</script>

<style scoped>
.cart_content_btn:hover{
  cursor:pointer;
}
.confirm_btn{
  width:50%;
}
.cart_content{
  display: none;
}
.arrow{
  transform: rotate(0deg);
  transition: all .5s;
}
.arrow.active{
  transform: rotate(180deg);
  transition: all .5s;
}
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
.table_total_display{
  display:table-row;
}
.table_total_displaySmall{
  display:none;
}
@media(max-width:680px){
  .confirm_btn{
    width:100%;
  }
  .table_total_display{
    display:none;
  }
  .table_total_displaySmall{
    display:table-row;
  }
}
</style>
