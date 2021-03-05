<template>
  <div>
    <div class="vld-parent">
        <loading :active.sync="isLoading"></loading>
    </div>
    <Navbar :product_num="product_length" v-on:increment="CounterCoupute" ></Navbar>
    <banner :introImage="image_website" :introImage_1="image_website1" :introImage_2="image_website2"></banner>
    <alert/>
    <div class="container main-content my-3">
      <div class="row my-5">
        <div class="col-12 text-center">
          <small class="text-muted">教練推薦課程</small>
          <p class="h2 mb-4 font-weight-normal">Recommended</p>
          <carousel :autoplay="true" :loop="true" :paginationEnabled="false" :perPageCustom="[[320, 1], [560, 2], [1024, 4]]">
            <slide v-for="(item, index) in aerobicArray" :key="index">
              <div class="card h-100 border-0 mr-2">
                <img class="card-img-top h-50" :src="item.imageUrl" :alt="`${item.title}課程`">
                <div class="card-body">
                  <h5 class="card-title">{{ item.title }}</h5>
                  <button class="btn btn-outline-dark rounded-0 btn-md-lg rounded-0 w-100" type="button" @click="getProduct(item.id)">前去課程介紹</button>
                </div>
              </div>
            </slide>
          </carousel>
        </div>
      </div>
      <div class="row flex-column mb-5">
        <div class="col-12 text-center">
          <small class="text-muted">課程選擇</small>
          <p class="h2 mb-4 font-weight-normal">Lecture</p>
          <div class="list-group flex-row lecture_option mx-auto mb-3" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active border-0 text-dark rounded-0" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">All</a>
            <a class="list-group-item list-group-item-action border-0 text-dark rounded-0" id="list-Workout-list" data-toggle="list" href="#list-Workout" role="tab" aria-controls="Workout">Workout</a>
            <a class="list-group-item list-group-item-action border-0 text-dark rounded-0" id="list-women-list" data-toggle="list" href="#list-women" role="tab" aria-controls="profile">Aerobic</a>
          </div>
          <div class="tab-content mb-3" id="nav-tabContent">
            <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
              <div class="row">
                <div class="col-sm-6 col-lg-4 mb-2 " v-for="(item) in products" :key="item.id">
                  <div class="card h-100 border-0">
                    <img class="card-img-top h-60" :src="item.imageUrl" :alt="`${item.title}課程`">
                    <div class="card-body p-0">
                      <p class="card-text mb-0 h5">{{ item.title }}</p>
                      <div class="d-flex justify-content-between align-items-end">
                        <small class="card-text text-muted small-text" v-if="item.origin_price!==item.price">原本售價<del>{{ item.origin_price| currency }}</del></small>
                        <strong class="card-text text-muted ml-auto">現在售價 <span class="h4 text-danger">{{ item.price | currency }}</span></strong>
                      </div>
                      <button type="button" class="btn btn-outline-dark rounded-0 btn-md-lg rounded-0 w-100" @click="getDetail(item.id)"><font-awesome-icon :icon="['fas', 'cart-arrow-down']" class="mr-2" />加入購物車</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="list-Workout" role="tabpanel" aria-labelledby="list-Workout-list">
                <div class="row">
                  <div class="col-sm-6 col-md-4 mb-2" v-for="(item, index) in workoutArray" :key="index">
                    <div class="card h-100 border-0">
                      <img class="card-img-top h-60" :src="item.imageUrl" :alt="`${item.title}課程`">
                      <div class="card-body p-0">
                        <p class="card-text mb-0 h5">{{ item.title }}</p>
                        <div class="d-flex justify-content-between align-items-end">
                          <small class="card-text text-muted small-text" v-if="item.origin_price!==item.price">原本售價<del>{{ item.origin_price }}</del></small>
                          <strong class="card-text text-muted ml-auto">現在售價 <span class="h4 text-danger">{{ item.price }}</span></strong>
                        </div>
                        <button type="button" class="btn btn-outline-dark rounded-0 btn-md-lg rounded-0 w-100" @click="getDetail(item.id)"><font-awesome-icon :icon="['fas', 'cart-arrow-down']" class="mr-2" />加入購物車</button>
                      </div>

                    </div>
                  </div>
                </div>
            </div>
            <div class="tab-pane fade" id="list-women" role="tabpanel" aria-labelledby="list-women-list">
                <div class="row">
                  <div class="col-sm-6 col-md-4 mb-2" v-for="(item, index) in aerobicArray" :key="index">
                    <div class="card h-100 border-0">
                      <img class="card-img-top h-60" :src="item.imageUrl" :alt="`${item.title}課程`">
                      <div class="card-body p-0">
                        <p class="card-text mb-0 h5">{{ item.title }}</p>
                        <div class="d-flex justify-content-between align-items-end">
                          <small class="card-text text-muted small-text" v-if="item.origin_price!==item.price">原本售價<del>{{ item.origin_price }}</del></small>
                          <strong class="card-text text-muted ml-auto">現在售價 <span class="h4 text-danger">{{ item.price }}</span></strong>
                        </div>
                        <button type="button" class="btn btn-outline-dark rounded-0 btn-md-lg rounded-0 w-100" @click="getDetail(item.id)"><font-awesome-icon :icon="['fas', 'cart-arrow-down']" class="mr-2" />加入購物車</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <router-link class="btn btn-outline-dark btn-lg d-block rounded-0 mt-3 goTolecture_btn" to="/lecture/LectureProduct">前往課程頁一覽</router-link>
        </div>
      </div>
      <div class="row text-center">
        <div class="col-12">
          <small class="text-muted small-text">大家都怎麼推薦</small>
          <p class="h2 mb-4 font-weight-normal">How is Everyone feeling</p>
          <div class="row">
            <div class="col-md-4">
              <div class="card h-100 border-0 text-justify">
                <img class="card-img-top mx-auto" src="https://randomuser.me/api/portraits/women/10.jpg" alt="`客戶評價頭像`" style="width:100px; height:100px; border-radius:50%;">
                <div class="card-body">
                  <p class="card-text mb-0 text-center font-weight-bold">來自深淵的女子</p>
                  <small class="card-text text-muted">Berserker Fitness真的解救了我多年來苦惱的肉肉，看著肉肉越來越少，褲子越來越鬆，我的身心靈彷彿就得到了淨化，
                  強烈推薦你/妳來Berserker體驗練到腿軟的滋味。</small>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card h-100 border-0 text-justify">
                <img class="card-img-top mx-auto" src="https://randomuser.me/api/portraits/men/3.jpg" alt="客戶評價頭像" style="width:100px; height:100px; border-radius:50%;">
                <div class="card-body">
                  <p class="card-text mb-0 text-center font-weight-bold">基隆的嗨先生</p>
                  <small class="card-text text-muted">Berserker Fitness無話可說無可救藥的<strong class="h2">就是讚!!!</strong></small>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card h-100 border-0 text-justify">
                <img class="card-img-top mx-auto" src="https://randomuser.me/api/portraits/men/90.jpg" alt="客戶評價頭像" style="width:100px; height:100px; border-radius:50%;">
                <div class="card-body">
                  <p class="card-text mb-0 text-center font-weight-bold">來自日本的小林先生</p>
                  <small class="card-text text-muted"><strong class="h2">紅豆泥!!!</strong>你/妳還沒有加入Berserker Fitness的健身房，妳是不是阿搭麻
                  控估力</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header text-dark">
              <h3 class="modal-title" id="exampleModalLabel">
              <span class="font-weight-bold">{{ product_detail.title }}</span>
              </h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            <div class="card border-0">
              <img class="card-img-top rounded-0" :src= "product_detail.imageUrl" :alt="`${product_detail.title}課程圖片`">
              <div class="card-body">
                <h5 class="font-weight-bold">本課程好處</h5>
                <div v-html="product_detail.content"></div>
                <h5 class="font-weight-bold mt-2">課程訓練的安排</h5>
                <div v-html="product_detail.description"></div>
                <div class="d-flex justify-content-between align-items-end">
                  <del class="origin_price_text">原價{{ product_detail.origin_price }}元</del>
                  <strong class="special_price_text">現在只要<span class="text-danger">{{ product_detail.price }}</span>元</strong>
                </div>
                <div class="form-group mt-3">
                  <div class="form-group">
                    <select class="form-control form-control-lg rounded-0" aria-label="Default select example" v-model="lecturenum">
                      <option value='' disabled>請選擇數量</option>
                      <option :value="num" v-for="num in 10" :key="num">選購{{ num }} {{ product_detail.unit }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
              <span class="h4 text-muted">小計 {{ product_detail.price*lecturenum }} 元</span>
              <button type="button" class="btn btn-primary" @click="addToCart(product_detail, lecturenum)">加到購物車</button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './Navbar'
import banner from './Introbanner'
import alert from './AlertMessage'
import Footer from './Footer'
import $ from 'jquery'
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'Home',
  data () {
    return {
      lecturenum: '',
      products: [],
      product_detail: [],
      searchText: '',
      categories: [],
      isLoading: false,
      status: {
        loadingItem: ''
      },
      carts: [],
      cartData: JSON.parse(localStorage.getItem('carData')) || [], // 取出localStorage資料
      product_length: 0,
      image_website: 'https://upload.cc/i1/2021/02/04/XVGje1.jpg',
      image_website1: 'https://upload.cc/i1/2021/02/18/cyrh8S.jpg',
      image_website2: 'https://upload.cc/i1/2020/12/26/5QczGW.jpg'
    }
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.products = response.data.products
          console.log('首頁資料', vm.products)
        }
        vm.isLoading = false
      })
    },
    getProduct (id) {
      this.$router.push(`/lecture/${id}`)
    },
    getDetail (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.status.loadingItem = id
      vm.$http.get(api).then((response) => {
        $('#productModal').modal('show')
        vm.product_detail = response.data.product
        vm.status.loadingItem = ''
      })
    },
    addToCart (data, qty = 1) {
      const vm = this
      const cartID = []
      vm.cartData = JSON.parse(localStorage.getItem('cartData')) || []
      vm.cartData.forEach((item, index) => {
        cartID.push(item.product_id)
      })
      if (cartID.indexOf(data.id) === -1) {
        console.log('沒有這份資料')
        const cartContent = {
          product_id: data.id,
          qty: qty,
          name: data.title,
          origin_price: data.origin_price,
          price: data.price
        }
        vm.cartData.push(cartContent)
        localStorage.setItem('cartData', JSON.stringify(vm.cartData))
        $('#productModal').modal('hide')
      } else {
        console.log('有這份資料')
        let cache = {}
        vm.cartData.forEach((item, index) => {
          if (item.product_id === data.id) {
            const number = item.qty + qty
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
      vm.lecturenum = ''
      vm.postCart()
    },
    getCart () {
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
                vm.getCart()
              })
          })
        })
    },
    activeCart () {
      $('.cart_list_cover').fadeToggle()
    },
    CounterCoupute (cartTotalLength) {
      this.product_length = cartTotalLength
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  },
  components: {
    alert,
    banner,
    Navbar,
    Carousel,
    Slide,
    Footer
  },
  computed: {
    workoutArray: function () {
      return this.products.filter((item) => item.category === '重訓')
    },
    aerobicArray: function () {
      return this.products.filter((item) => item.category === '有氧')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Lecture:hover{
  cursor:pointer;
  box-shadow:3px 3px grey;
  transition: all .5s;
}
.list-group-item.active{
  background:rgba(228, 225, 225, 0.5);
  font-weight:600;
}
.lecture_option{
  width:50%;
}
.Recommended_class_frame{
  overflow:hidden;
}
.Recommended_class{
  transform:translateX(0px);
  transition:all .5s;
}
.Recommended_class{
  .card-footer{
    .btn{
      width:60%;
      font-size:10px;
      color:grey;
    }
    .btn:hover{
      color:white;
    }
  }
}
.swiper-container2{
  height:100%;
}
.small-text{
  font-size: 14px;
}
.goTolecture_btn{
  width: 60%;
  margin:0 auto 0 auto;
}
.special_price_text{
  font-size: 1.5rem;
}
.origin_price_text{
  font-size: 1rem;
}
@media(max-width:768px){
  .Recommended_class{
  .card-footer{
    .btn{
      width:100%;
    }
  }
}
}
@media(max-width:680px){
  .lecture_option{
    width:100%;
  }
  .goTolecture_btn{
    width:100%;
  }
}
@media(max-width:380px){
  .special_price_text{
    font-size:1.2rem;
  }
}
</style>
