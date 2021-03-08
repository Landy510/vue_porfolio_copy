<template>
  <div>
    <Navbar :likeArray="likeList" :product_num="product_length" v-on:increment="CounterCoupute"></Navbar>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <banner :introImage="image_website" :introImage_1="image_website1" :introImage_2="image_website2"></banner>
    <div class="h2 text-center Lecture_title py-4 border-bottom">{{ Lecture_title }}</div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 mb-3">
          <div class="list-group d-flex flex-md-row flex-column" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active rounded-0 text-dark text-center" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home" @click.prevent="getCategory('所有課程')">All</a>
            <a class="list-group-item list-group-item-action text-dark text-center" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile" @click.prevent="getCategory('重訓課程')">重訓</a>
            <a class="list-group-item list-group-item-action text-dark text-center" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages" @click.prevent="getCategory('有氧課程')">有氧</a>
            <a class="list-group-item list-group-item-action rounded-0 text-dark text-center" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings" @click.prevent="getCategory('飲食控制')">飲食控制</a>
          </div>
        </div>
        <div class="col-12">
          <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
            <div class="row">
              <div class="col-12">
                <div class="row py-2 Recommended_class_frame">
                  <div class="col-md-6 col-lg-4 Recommended_class mb-4" v-for="(item, index) in products" :key="index">
                    <a href="#" class="lecture_card d-block text-dark" @click.prevent="getSelfProduct(item.id)">
                      <div class="card h-100" >
                        <div class="h-60 card_image">
                          <img class="card-img-top rounded-0 card_imag_image" :src="item.imageUrl" :alt="`${item.title}課程圖片`">
                        </div>
                        <div class="card-body p-0 pb-1">
                          <p class="card-text mb-0 pt-2 px-2 d-flex justify-content-between font-weight-bold h5" >
                            <span>{{ item.title }}</span>
                            <font-awesome-icon class="lecture_heart" :class="{'text-danger':item.like}" :icon="['far','heart']" size="lg" @click="getLike(item)"></font-awesome-icon>
                          </p>
                          <p class="card-text mb-2 px-2 d-flex flex-column align-items-center text-muted" >
                            {{ item.description }}
                          </p>
                          <div class="d-flex justify-content-between align-items-end px-2">
                            <del class="text-muted">原價{{ item.origin_price }}元</del>
                            <strong class="h5 mb-0">現在只要<span class="text-danger">{{ item.price }}</span>元</strong>
                          </div>
                        </div>
                      </div>
                    </a>
                    <button type="button" class="btn btn-outline-dark d-block d-md-none rounded-0 w-100" @click="getSelfProduct(item.id)">前往課程一覽</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
            <div class="row">
              <div class="col-12">
                <div class="row py-2 Recommended_class_frame">
                  <div class="col-md-6 col-lg-4 Recommended_class mb-4" v-for="(item, index) in workoutArray" :key="index">
                    <a href="#" class="lecture_card d-block text-dark" @click.prevent="getSelfProduct(item.id)">
                      <div class="card h-100" >
                        <div class="h-60 card_image">
                          <img class="card-img-top rounded-0 card_imag_image" :src="item.imageUrl" :alt="`${item.title}課程圖片`">
                        </div>
                        <div class="card-body p-0 pb-1">
                          <p class="card-text mb-0 pt-2 px-2 d-flex justify-content-between font-weight-bold h5" >
                            <span>{{ item.title }}</span>
                            <font-awesome-icon class="lecture_heart" :class="{'text-danger':item.like}" :icon="['far','heart']" size="lg" @click="getLike(item)"></font-awesome-icon>
                          </p>
                          <p class="card-text mb-2 px-2 d-flex flex-column align-items-center text-muted" >
                            {{ item.description }}
                          </p>
                          <div class="d-flex justify-content-between align-items-end px-2">
                              <del class="text-muted">原價{{ item.origin_price }}元</del>
                              <strong class="h5 mb-0">現在只要<span class="text-danger">{{ item.price }}</span>元</strong>
                          </div>
                        </div>
                      </div>
                    </a>
                    <button type="button" class="btn btn-outline-dark d-block d-md-none rounded-0 w-100" @click="getSelfProduct(item.id)">前往課程一覽</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
            <div class="row">
              <div class="col-12">
                <div class="row py-2 Recommended_class_frame">
                  <div class="col-md-6 col-lg-4 Recommended_class mb-4" v-for="(item, index) in aerobicArray" :key="index">
                    <a href="#" class="lecture_card d-block text-dark" @click.prevent="getSelfProduct(item.id)">
                      <div class="card h-100" >
                        <div class="h-60 card_image">
                          <img class="card-img-top rounded-0 card_imag_image" :src="item.imageUrl" :alt="`${item.title}課程圖片`">
                        </div>
                        <div class="card-body p-0 pb-1">
                          <p class="card-text mb-0 pt-2 px-2 d-flex justify-content-between font-weight-bold h5" >
                            <span>{{ item.title }}</span>
                            <font-awesome-icon class="lecture_heart" :class="{'text-danger':item.like}" :icon="['far','heart']" size="lg" @click="getLike(item)"></font-awesome-icon>
                          </p>
                          <p class="card-text mb-2 px-2 d-flex flex-column align-items-center text-muted" >
                            {{ item.description }}
                          </p>
                          <div class="d-flex justify-content-between align-items-end px-2">
                              <del class="text-muted">原價{{ item.origin_price }}元</del>
                              <strong class="h5 mb-0">現在只要<span class="text-danger">{{ item.price }}</span>元</strong>
                          </div>
                        </div>
                      </div>
                    </a>
                    <button type="button" class="btn btn-outline-dark d-block d-md-none rounded-0 w-100" @click="getSelfProduct(item.id)">前往課程一覽</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
            <div class="row">
              <div class="col-12">
                <div class="row py-2 Recommended_class_frame">
                  <div class="col-md-6 col-lg-4 Recommended_class mb-4" v-for="(item, index) in dietArray" :key="index">
                    <a href="#" class="lecture_card d-block text-dark" @click.prevent="getSelfProduct(item.id)">
                      <div class="card h-100" >
                        <div class="h-60 card_image">
                          <img class="card-img-top rounded-0 card_imag_image" :src="item.imageUrl" :alt="`${item.title}課程圖片`">
                        </div>
                        <div class="card-body p-0 pb-1">
                          <p class="card-text mb-0 pt-2 px-2 d-flex justify-content-between font-weight-bold h5" >
                            <span>{{ item.title }}</span>
                            <font-awesome-icon class="lecture_heart" :class="{'text-danger':item.like}" :icon="['far','heart']" size="lg" @click="getLike(item)"></font-awesome-icon>
                          </p>
                          <p class="card-text mb-2 px-2 d-flex flex-column align-items-center text-muted" >
                            {{ item.description }}
                          </p>
                          <div class="d-flex justify-content-between align-items-end px-2">
                            <del class="text-muted">原價{{ item.origin_price }}元</del>
                            <strong class="h5 mb-0">現在只要<span class="text-danger">{{ item.price }}</span>元</strong>
                          </div>
                        </div>
                      </div>
                    </a>
                    <button type="button" class="btn btn-outline-dark d-block d-md-none rounded-0 w-100" @click="getSelfProduct(item.id)">前往課程一覽</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '../Navbar'
import banner from '../Introbanner'
import Footer from '../Footer'
export default {
  data () {
    return {
      qty: 0,
      isLoading: false,
      product_length: 0,
      image_website: 'https://upload.cc/i1/2021/02/15/2cfRA4.jpg',
      image_website1: 'https://upload.cc/i1/2021/02/05/s3GHBq.jpg',
      image_website2: 'https://upload.cc/i1/2021/02/22/TI2sLB.jpg',
      products: [],
      Lecture_title: '所有課程',
      like: false,
      likeList: []
    }
  },
  methods: {
    getProduct (page = 1) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.products = response.data.products
          vm.isLoading = false
          vm.products.forEach(item => {
            vm.$set(item, 'like', false)
          })
          vm.getLikeList()
        } else {
          vm.isLoading = false
        }
      })
    },
    getList () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.product_length = response.data.data.carts.length
        vm.isLoading = false
      })
    },
    CalQty (qty = 0) {
      let num = this.qty
      num += qty
      if (num < 0) return
      this.qty += qty
    },
    addToCart (id) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      this.$http.post(api, { data: { product_id: id, qty: vm.qty } }).then((response) => {
        if (response.data.success) {
          vm.isLoading = false
          vm.$bus.$emit('messsage:push', response.data.message, 'success')
          this.getList()
        } else {
          vm.isLoading = false
          vm.$bus.$emit('messsage:push', response.data.message, 'danger')
        }
      })
    },
    CounterCoupute (cartTotalLength) {
      this.product_length = cartTotalLength
    },
    getSelfProduct (id) {
      this.$router.push(`/lecture/${id}`)
    },
    getCategory (str = 'All') {
      const vm = this
      vm.Lecture_title = str
    },
    getLike (item) {
      const vm = this
      item.like = !item.like
      const outputData = localStorage.getItem('LikeData')
      const outputArray = JSON.parse(outputData)
      if (outputArray === null) {
        vm.likeList = []
        const inputArray = []
        inputArray.push(item)
        vm.likeList = inputArray
        const inputData = JSON.stringify(inputArray)
        localStorage.setItem('LikeData', inputData)
        vm.$bus.$emit('messsage:push', '已加入我的最愛清單', 'success')
      } else {
        let hasElement = false
        vm.likeList = []
        if (outputArray.length !== 0) {
          outputArray.filter((obj, index) => {
            if (obj.title === item.title) {
              outputArray.splice(index, 1)
              hasElement = true
              return true
            }
          })
          if (!hasElement) {
            outputArray.push(item)
            vm.$bus.$emit('messsage:push', '已加入我的最愛清單', 'success')
          }
        } else {
          outputArray.push(item)
          vm.$bus.$emit('messsage:push', '已加入我的最愛清單', 'success')
        }
        vm.likeList = outputArray
        const inputArray = outputArray
        const inputData = JSON.stringify(inputArray)
        localStorage.setItem('LikeData', inputData)
      }
    },
    getLikeList () {
      const vm = this
      const outputData = localStorage.getItem('LikeData')
      const outputArray = JSON.parse(outputData)
      vm.likeList = outputArray
    }
  },
  created () {
    this.getProduct()
  },
  components: {
    Navbar,
    banner,
    Footer
  },
  computed: {
    workoutArray: function () {
      return this.products.filter((item) => item.category === '重訓')
    },
    aerobicArray: function () {
      return this.products.filter((item) => item.category === '有氧')
    },
    dietArray: function () {
      return this.products.filter((item) => item.category === '飲食課程')
    }
  }
}
</script>

<style scoped>
.advance_image{
  border-radius:50px;
}
.card{
  border:0px;
  cursor:pointer;
}
.card_image{
  overflow:hidden;
  position:relative;
}
.card_imag_image{
  height:200px;
}
.card img{
  transform:scale(1);
  transition:all .5s;
}
.card:hover img{
  transition:all .5s;
  transform:scale(1.2);
}
.card_btn{
  position:absolute;
  bottom:-40px;
  left:0;
  z-index:3;
  transition:all .5s;
}
.card:hover .card_btn{
  transition:all .5s;
  bottom:0px;
}
.list-group-item{
  border:0px;
  border-right:1px solid grey;
}
.medium-text{
  font-size: 18px;
}
.lecture_card:hover{
  box-shadow: 12px 12px 7px rgba(0, 0, 0, 0.7);
  transition:all .5s;
}
.lecture_heart{
  color: #000;
}
@media(max-width:760px){
  .card_imag_image{
    height:100%;
  }
}
@media(max-width:680px){
  .advance_image{
    border-radius:0px;
  }
  .list-group-item{
    border:0px;
    border-bottom:1px solid grey;
  }
}
</style>
