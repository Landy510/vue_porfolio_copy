<template>
  <div>
    <Navbar :product_num="product_length" v-on:increment="CounterCoupute"></Navbar>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-transparent border border-bottom">
        <li class="breadcrumb-item">
          <router-link to="/" class="text-muted">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/lecture/LectureProduct" class="text-muted">課程</router-link>
        </li>
        <li class="breadcrumb-item active text-dark" aria-current="page">{{ lecture.title }}</li>
      </ol>
    </nav>
    <div class="container mb-5">
      <div class="row">
        <div class="col-lg-6">
          <img :src="lecture.imageUrl" class="img-fluid" :alt="`${lecture.title}課程圖片`">
        </div>
        <div class="col-lg-6">
          <h2>{{ lecture.title }}</h2>
          <div class="mb-2 font-weight-bold">{{ lecture.description }}</div>
          <div v-html="lecture.content"></div>
          <div class="d-flex justify-content-between align-items-end mb-3 mt-4">
            <div class="card-text text-muted medium-text">原本售價 <del>NT{{ lecture.origin_price| currency }}</del></div>
            <strong class="text-muted ml-auto h3 mb-0 text-right">現在售價 NT<span class="h3 text-danger">{{ lecture.price| currency }}</span></strong>
          </div>
          <h5>數量</h5>
          <div class="input-group mb-3">
            <div class="input-group-append">
              <button type="button" class="btn btn-grey border border-dark rounded-0" @click="CalQty(-1)">-</button>
            </div>
            <input type="text" class="form-control text-center qty" placeholder="0" aria-label="1" aria-describedby="basic-addon1" v-model="qty">
            <div class="input-group-prepend">
              <button type="button" class="btn btn-grey border border-dark rounded-0" @click="CalQty(1)">+</button>
            </div>
          </div>
          <button type="button" class="btn btn-warning btn-lg w-100 rounded-0" @click="addToCart(lecture)"><font-awesome-icon :icon="['fas', 'cart-arrow-down']" class="mr-2" />加入購物車</button>
        </div>
      </div>
    </div>
    <div class="container-fluid bg-light py-5 my-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h3 class="text-center">場地器材品質保證</h3>
              <div class="w-100">
                <p class="text-muted medium-text text-center">您在本健身房運動，可以享用到最乾淨與不被打擾的良好運動空間</p>
                <div class="d-flex justify-content-center">
                  <div class="px-auto border border-light border-right-0" style="writing-mode:vertical-rl; letter-spacing:1rem;">
                    <p class="pt-1 mt-3 medium-text">注意事項</p>
                  </div>
                  <ul class="list-group rounded-0 px-2">
                    <li class="list-group-item border-0 appendix_list p-0 mt-3 pl-3 text-muted bg-light">本公司的器材的槓鈴都是使用ABCD公司出產的專業槓鈴，機械器材的部分都是使用XDOP公司所出產的全新器材</li>
                    <li class="list-group-item border-0 appendix_list p-0 mt-3 pl-3 text-muted bg-light">健身房內的器材都會定期在2小時左右，有專人去做清潔，讓您不會有會有器材不夠乾淨而不敢使用的疑慮</li>
                    <li class="list-group-item border-0 appendix_list p-0 mt-3 pl-3 text-muted bg-light">健身房內都有提供乾淨的廁所與淋浴間，讓您在訓練完之後，都有個舒適的盥洗空間，讓您香香的回家</li>
                    <li class="list-group-item border-0 appendix_list p-0 mt-3 pl-3 text-muted bg-light">店內的飲水機都有在做定期的清理與更換濾心，讓您不用擔心飲用水是否有不夠乾淨的疑慮</li>
                  </ul>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid py-5 my-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h3 class="text-center">意外保證</h3>
              <div class="w-100">
                <p class="text-muted medium-text text-center">若您在本健身房使用器材 或是 在上教練課時，身體不堪負荷而受傷的話，本公司會給您下列保證</p>
                <div class="d-flex justify-content-center">
                  <div class="px-auto" style="writing-mode:vertical-rl; letter-spacing:1rem;">
                    <p class="pt-1 mt-3 medium-text">注意事項</p>
                  </div>
                  <ul class="list-group rounded-0 px-2">
                    <li class="list-group-item border-0 appendix_list p-0 mt-3 pl-3 text-muted">先請您停下手邊的運動，並退至安全區，並立即告知巡場教練您所受傷的地方，我們會第一時間給您做處理</li>
                    <li class="list-group-item border-0 appendix_list p-0 mt-3 pl-3 text-muted">本公司都有對每個器材保專業的責任險，在釐清完責任歸屬後，該賠償的顧客的部分，絕對不會讓您委屈</li>
                  </ul>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-5">
      <div class="row">
        <div class="col-12">
          <h3>關聯的課程</h3>
          <carousel :autoplay="true" :loop="true" :paginationEnabled="false" :perPageCustom="[[320, 1], [560, 2], [1024, 3]]">
            <slide v-for="(item, index) in sameCategoryFilter" :key="index">
            <div class="card h-100 border-0 mr-3 pb-2">
              <div class="card_image">
                <img class="card-img-top rounded-0 card_imag_image" :src="item.imageUrl" :alt="`${item.title}課程圖片`">
              </div>
              <div class="card-body p-0">
                <h5 class="card-title">{{ item.title }}</h5>
                <div class="d-flex justify-content-between align-items-end">
                  <del class="text-muted">原價{{ item.origin_price }}元</del>
                  <strong class="h5 mb-0">現在只要<span class="text-danger">{{ item.price }}</span>元</strong>
                </div>
                <button type="button" class="btn btn-outline-dark rounded-0 btn-md-lg rounded-0 w-100" @click="getProduct(item.id)">前去課程介紹</button>
              </div>
            </div>
            </slide>
          </carousel>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import $ from 'jquery'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Carousel, Slide } from 'vue-carousel'
export default {
  data () {
    return {
      orderId: '',
      products: [],
      lecture: {},
      carts: [],
      carData: JSON.parse(localStorage.getItem('carData')) || [],
      qty: 1,
      isLoading: false,
      product_length: 0
    }
  },
  methods: {
    getProduct (id) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.lecture = response.data.product
          vm.isLoading = false
          this.getRelateProducts()
        }
      })
    },
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
        }
        vm.isLoading = false
      })
    },
    getRelateProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.products = response.data.products
        }
      })
    },
    CalQty (qty = 0) {
      let num = this.qty
      num += qty
      if (num < 0) return
      this.qty += qty
    },
    addToCart (data) {
      const vm = this
      if (vm.qty === 0) return
      const cartID = []
      vm.cartData = JSON.parse(localStorage.getItem('cartData')) || []
      vm.cartData.forEach((item, index) => {
        cartID.push(item.product_id)
      })
      if (cartID.indexOf(data.id) === -1) {
        const cartContent = {
          product_id: data.id,
          qty: vm.qty,
          name: data.title,
          origin_price: data.origin_price,
          price: data.price
        }
        vm.cartData.push(cartContent)
        localStorage.setItem('cartData', JSON.stringify(vm.cartData))
        $('#productModal').modal('hide')
      } else {
        let cache = {}
        vm.cartData.forEach((item, index) => {
          if (item.product_id === data.id) {
            const number = item.qty + vm.qty
            cache = {
              product_id: data.id,
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
        $('#productModal').modal('hide')
      }
      vm.$bus.$emit('messsage:push', '已加入購物車', 'success')
      vm.postCart()
    },
    postCart () {
      const vm = this
      vm.isLoading = true
      const cacheID = []
      vm.axios.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`)
        .then((res) => {
          const cacheData = res.data.data.carts
          cacheData.forEach((item) => {
            cacheID.push(item.id)
          })
        }).then(() => {
          cacheID.forEach((item) => {
            vm.axios.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item}`).then(() => {
              console.log('購物車已經清空')
            })
          })
        }).then(() => {
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
    CounterCoupute (cartTotalLength) {
      this.product_length = cartTotalLength
    }
  },
  created () {
    this.orderId = this.$route.params.LectureId
    this.getProduct(this.orderId)
  },
  components: {
    Navbar,
    Carousel,
    Slide,
    Footer
  },
  computed: {
    sameCategoryFilter: function () {
      const vm = this
      return vm.products.filter((item) => item.category === vm.lecture.category && item.title !== vm.lecture.title)
    }
  }
}
</script>

<style scoped>
.card{
  border:0px;
  cursor:pointer;
}
.card_image{
  overflow:hidden;
}
.card:hover img{
  transition:all .5s;
  transform:scale(1.2);
}
.medium-text{
  font-size:16px;
}
.appendix_warning{
  transform:rotate(-90deg);
}
.appendix_list:before{
  content:"\203B";
  position: absolute;
  color: #999;
  left: 0;
  top: 4px;
  line-height: 1;
  font-size: 11px;
}
.card_imag_image{
  height:200px;
}
@media(max-width:567px){
  .card_imag_image{
    height:90%;
  }
}
</style>
