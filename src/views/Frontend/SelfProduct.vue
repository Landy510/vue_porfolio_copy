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
                    <router-link to="/lecture/Lecture_Product" class="text-muted">課程</router-link>
                </li>
                <li class="breadcrumb-item active text-dark" aria-current="page">{{ lecture.title }}</li>
            </ol>
        </nav>
        <div class="container mb-4">
            <div class="row">
                <div class="col-md-6">
                    <img :src="lecture.imageUrl" class="img-fluid" :alt="`${lecture.title}課程圖片`">
                </div>
                <div class="col-md-4">
                    <h2>{{ lecture.title }}</h2>
                    <small>{{ lecture.description }}</small>
                    <div class="d-flex justify-content-between align-items-end mb-4">
                        <small class="card-text text-muted">原本售價 NT<del>{{ lecture.origin_price| currency }}</del></small>
                        <strong class="card-text text-muted ml-auto">現在售價 NT<span class="h4 text-danger">{{ lecture.price| currency }}</span></strong>
                    </div>
                    <h5>數量</h5>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <button type="button" class="btn btn-grey border border-dark rounded-0" @click="CalQty(1)">+</button>
                        </div>
                        <input type="text" class="form-control text-center qty" placeholder="0" aria-label="1" aria-describedby="basic-addon1" v-model="qty">
                        <div class="input-group-append">
                            <button type="button" class="btn btn-grey border border-dark rounded-0" @click="CalQty(-1)">-</button>
                        </div>
                    </div>
                    <button type="button" class="btn btn-warning btn-lg w-100 rounded-0" @click="addToCart(lecture)"><font-awesome-icon :icon="['fas', 'cart-arrow-down']" class="mr-2" />加入購物車</button>
                </div>
            </div>
        </div>
        <div class="container-fluid bg-light py-5">
            <div class="container">
                <div class="row">
                <div class="col-md-6">
                    <h3>運動的好處多多</h3>
                    <h5>很多人都希望單靠節食的方式來維持自己的身材。但其實，利用運動有效的提高自身的TDEE，飯而能讓你吃的更多，瘦得更健康。以下是運動的幾點好處:</h5>
                    <ul class="list-group">
                        <li class="list-group-item border-0 bg-transparent px-0 h5">可以有效的強化你的肌肉</li>
                        <li class="list-group-item border-0 bg-transparent px-0 h5">減緩老年癡呆</li>
                        <li class="list-group-item border-0 bg-transparent px-0 h5">提升記憶力</li>
                        <li class="list-group-item border-0 bg-transparent px-0 h5">減輕壓力</li>
                    </ul>
                </div>
                <div class="col-md-6 h-100">
                    <img src="https://upload.cc/i1/2021/02/07/jnkI6B.jpg" class="img-fluid advance_image" alt="Berserker Fitness運動好處">
                </div>
                </div>
            </div> 
        </div>

        <div class="container-fluid py-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 h-100">
                        <img src="https://upload.cc/i1/2021/02/07/Oj078N.jpg" class="img-fluid advance_image" alt="Berserker Fitness師資優異">
                    </div>
                    <div class="col-md-6">
                        <h3>最專業的師資</h3>
                        <h5>在Berserker Fitness中，我們擁有最專業的師資，來輔導您，讓你可以學到最正確的健身知識，以下是您一定要來Berserker的原因:</h5>
                        <ul class="list-group">
                            <li class="list-group-item border-0 bg-transparent px-0 h5">最正確的運動姿勢</li>
                            <li class="list-group-item border-0 bg-transparent px-0 h5">你的進步你看的到</li>
                            <li class="list-group-item border-0 bg-transparent px-0 h5">幫助您飲食控制</li>
                            <li class="list-group-item border-0 bg-transparent px-0 h5">和同儕一起進步</li>
                        </ul>
                    </div>
                
                </div>
            </div> 
        </div>

        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h3>關聯的課程</h3>
                    <carousel :autoplay="true" :loop="true" :paginationEnabled="false" :perPageCustom="[[320, 1], [560, 2], [1024, 4]]">
                        <slide v-for="(item, index) in sameCategoryFilter" :key="index">
                        <div class="card h-100 border-0 mr-2">
                            <div class="card_image h-50">
                                <img class="card-img-top" :src="item.imageUrl" :alt="`${item.title}課程圖片`">
                            </div>
                            
                            <div class="card-body">
                            <h5 class="card-title">{{ item.title }}</h5>
                            <p class="card-text">{{ item.description }}</p>
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
import $ from 'jquery';
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Carousel, Slide } from 'vue-carousel';
  export default {
    data(){
         return{
            orderId:'',
            products:[],
            lecture:{},
            carts:[],
            carData:JSON.parse(localStorage.getItem('carData')) || [],
            qty:0,
            isLoading:false,
            product_length:0
        }
    },
    methods:{
        getProduct(id){
            const vm = this;
            vm.isLoading = true;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
            vm.$http.get(api).then((response)=>{
                if(response.data.success){
                    vm.lecture = response.data.product;
                    vm.isLoading = false;
                    this.getRelateProducts();
                }
            })
        },
        getList(){
          const vm = this;
          vm.isLoading = true;
          const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
          vm.$http.get(url).then((response) => {
            if (response.data.data.carts) {
              vm.carts = response.data.data.carts;
              localStorage.setItem('cartData', JSON.stringify(vm.carts));
              vm.cartData = JSON.parse(localStorage.getItem('cartData')) || [];
              vm.product_length = response.data.data.carts.length;
            }
            vm.isLoading = false;
          });
        },
        getRelateProducts(){
            const vm =this;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
            vm.$http.get(api).then((response)=>{
                if(response.data.success){
                  vm.products = response.data.products;
                }
            })
        },
        CalQty(qty = 0){
          let num = this.qty;
          num += qty;
          if(num<0)return;
          this.qty += qty;
        },
        addToCart(data){
          const vm = this;
          if(vm.qty===0)return;
          const cartID = [];
          vm.cartData = JSON.parse(localStorage.getItem('cartData')) || [];
          vm.cartData.forEach((item, index) => {
            cartID.push(item.product_id);
          })
          if(cartID.indexOf(data.id) === -1) {
            let cartContent = {
              product_id: data.id,
              qty: vm.qty, 
              name: data.title,
              origin_price: data.origin_price,
              price: data.price,
            }
            vm.cartData.push(cartContent);
            localStorage.setItem('cartData', JSON.stringify(vm.cartData));
            $('#productModal').modal('hide');
          } else {
            let cache = {};   
            vm.cartData.forEach((item, index) => {
              if(item.product_id === data.id) {
                let number = item.qty + vm.qty;
                cache = {
                  product_id: data.id,
                  qty: number,
                  name: data.title,
                  origin_price: data.origin_price,
                  price: data.price,
                };
                vm.cartData.splice(index, 1);
              }
            })
            vm.cartData.push(cache);
            localStorage.setItem('cartData', JSON.stringify(vm.cartData));
            $('#productModal').modal('hide');
          }
          vm.$bus.$emit('messsage:push', '已加入購物車', 'success');
          vm.postCart();
        },
        postCart() {
          const vm = this;
          vm.isLoading = true;
          const cacheID = [];
          vm.axios.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`)
            .then((res) => {
              const cacheData = res.data.data.carts;
              cacheData.forEach((item) => {
                cacheID.push(item.id);
              });
            }).then(() => {
              cacheID.forEach((item) => {
                vm.axios.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item}`).then(() => {
                  console.log('購物車已經清空');
                });
              });
            }).then(() => {
              vm.cartData.forEach((item) => {
                const cache = {
                  product_id: item.product_id,
                  qty: item.qty,
                };
                vm.axios.post(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`, { data: cache })
                  .then(() => {
                    vm.cartData = [];
                    localStorage.removeItem('cartData');
                    vm.isLoading = false;
                    vm.getList();
                  });
              });
            });
        },
        CounterCoupute(cart_total_length){
            this.product_length = cart_total_length;
        }
    },
    created(){
        this.orderId = this.$route.params.LectureId;
        this.getProduct(this.orderId);
    },
    components:{
        Navbar,
        Carousel, 
        Slide,
        Footer,
    },
    computed: {
        sameCategoryFilter: function() {
          const vm = this;
          return vm.products.filter((item) => item.category === vm.lecture.category && item.title!==vm.lecture.title)
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
}
.card:hover img{
  transition:all .5s;
  transform:scale(1.2);
}
@media(max-width:680px){
  .advance_image{
    border-radius:0px;
  }
}
</style>