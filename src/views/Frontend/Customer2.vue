<template>
  <div>
    <div class="vld-parent">
        <loading :active.sync="isLoading"></loading>
    </div>
    <Navbar :product_num="product_length" v-on:increment="CounterCoupute"></Navbar>
    <Alert/>
    <div class="container mb-3">
        <div class="justify-content-center align-items-center d-none d-md-flex mt-4 mb-4">
            <div>
                <div class="rounded-circle d-flex justify-content-center align-items-center h3 alert alert-primary mb-1" style="width:100px;height:100px;">Step1</div>
                <div class="text-center font-weight-bold">購物車</div>
            </div>
            <div style="width:200px;height:1px;border:0.01px solid black;"></div>
            <div>
                <div class="rounded-circle d-flex justify-content-center align-items-center h3 alert alert-primary mb-1" style="width:100px;height:100px;">Step2</div>
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
                <div class="rounded-circle d-flex justify-content-center align-items-center h3 alert alert-primary mb-1" style="width:100px;height:100px;">Step2</div>
                <div class="text-center font-weight-bold">填寫資料</div>
            </div>
        </div>
        <div class="row">
          <div class="col-lg-8 mb-2">
            <h2 class="bg-warning py-2 text-center">收件人資料</h2>
            <h5>星號(*)部分必填</h5>
            <div>
              <validation-observer v-slot="{ invalid, handleSubmit }">
                <form @submit.prevent="handleSubmit(submitForm)">
                  <validation-provider rules="required" v-slot="{ errors, classes }">
                    <div class="form-group">
                      <label for="username">收件人姓名<span class="text-danger ml-1 font-weight-bold">*</span></label>
                      <input id="username" type="text" name="姓名"
                        class="form-control" v-model="form.user.name" :class="classes" placeholder="輸入姓名" >
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <validation-provider rules="required|email" v-slot="{ errors, classes }">
                    <div class="form-group">
                      <label for="email">Email<span class="text-danger ml-1 font-weight-bold">*</span></label>
                      <input id="email" type="email" name="email"
                        class="form-control" v-model="form.user.email" :class="classes" placeholder="請輸入信箱">
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <validation-provider rules="required" v-slot="{ errors, classes }">
                    <div class="form-group">
                      <label for="useraddress">收件人地址<span class="text-danger ml-1 font-weight-bold">*</span></label>
                      <input id="useraddress" type="text" name="地址"
                        class="form-control" v-model="form.user.address" :class="classes" placeholder="請輸入地址" >
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <validation-provider rules="required" v-slot="{ errors, classes }">
                    <div class="form-group">
                      <label for="usertel">收件人電話<span class="text-danger ml-1 font-weight-bold">*</span></label>
                      <input id="usertel" type="tel" name="電話"
                        class="form-control" v-model="form.user.tel" :class="classes" placeholder="請輸入電話" >
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                    </div>
                  </validation-provider>
                  <validation-provider v-slot="{ errors, classes }">
                    <div class="form-group">
                      <label for="comment">留言</label>
                      <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                    </div>
                  </validation-provider>
                  <div class="text-right">
                    <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
          <div class="col-lg-4">
            <h2 class="text-center bg-light py-2 cart_content_btn" @click="openCartContent">購物車內容
              <font-awesome-icon v-if="carts.length!==0" :icon="['fas','chevron-down']" size="1x" class="arrow"></font-awesome-icon>
            </h2>
            <div v-if="carts.length!==0" class="cart_content">
              <div v-for="(item, index) in carts" :key="index">
                <div class="d-flex">
                  <img :src="item.product.imageUrl" width="150px" height="100px" :alt="item.product.title商品">
                  <div class="ml-3">
                    <div class="d-flex mb-2 font-weight-bold">
                      <div class="mr-3">課程名稱</div>
                      <div>{{ item.product.title }}</div>
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
      vm.$http.get(api).then((response) => {
        vm.carts = response.data.data.carts
        vm.total = response.data.data.total
        vm.final_total = response.data.data.final_total
        console.log('最終的結果', vm.total)
        console.log('最終的結果', vm.final_total)
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
    CounterCoupute (cart_total_length) {
      this.getList()
      this.product_length = cart_total_length
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
    Footer
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
@media(max-width:680px){
  .confirm_btn{
    width:100%;
  }
}
</style>
