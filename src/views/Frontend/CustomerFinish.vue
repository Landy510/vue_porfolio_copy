<template>
  <div class="wrap">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <Navbar></Navbar>

    <div class="bg_finish bg-cover flex-grow-1 d-flex justify-content-center align-items-center flex-column">
      <div class="paid_content non_paid" :class="{'finish_paid':is_paid}">
        <font-awesome-icon class="paid_progress mr-2":icon="['fas', 'flag']"/>
        <span v-if="!is_paid">訂單搜尋中...</span>
        <span v-else>已完成付款</span>
      </div>
      <router-link to="/">
        <button class="btn btn-warning mt-3">回去逛逛</button>
      </router-link>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '../Navbar'
import Footer from '../Footer'
export default {
  name: 'Customer1',
  data () {
    return {
      isLoading: false,
      orderId: '',
      order: {
        user: {
          email: ''
        }
      },
      is_paid: false
    }
  },
  methods: {
    getList () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.$http.get(api).then((response) => {
        vm.order = response.data.order
        vm.is_paid = response.data.order.is_paid
        vm.isLoading = false
      })
    },
    CounterCoupute (cart_total_length) {
      this.getList()
      this.product_length = cart_total_length
    },
    payOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.isLoading = true
      this.$http.post(api).then((response) => {
        vm.getList()
        vm.isLoading = false
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getList()
  },
  components: {
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
.CheckoutPicture{
  background-image: url(https://upload.cc/i1/2021/03/04/h9Ydmb.jpg);
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
}
.order-title {
  position:relative;
  width:30%;
  text-align:center;
  margin:0 auto 0 auto;
}
.order-title:before {
  content: "";
  display: block;
  height: 40%;
  width: 100%;
  background-color: rgba(236, 230, 64, .6);
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
}
.bg_finish{
  background-color: rgba(0, 0, 0, 0.4);
  background-image: url(https://upload.cc/i1/2020/12/26/5QczGW.jpg);
  background-blend-mode: overlay;
  min-height: 500px;
}
.paid_content{
  font-size:30px;
  padding:5px 20px 5px 20px;
  color: white;
  transition: all .5s;
}
.non_paid{
  color: black;
  background-color:pink;
}
.finish_paid{
  color: white;
  background-color:green;
}
@media(max-width:768px) {
  .order-title {
    width: 40%;
  }
}
@media(max-width:680px){
  .confirm_btn{
    width:100%;
  }
}
@media(max-width:360px){
  .order-title {
    width: 50%;
  }
}
</style>
