<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-warning bg-warning">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon">
                    <font-awesome-icon :icon="['fas','bars']" size="lg"></font-awesome-icon>
                </span>
            </button>
            <router-link to="/" class="mx-auto navbar-brand py-0 text-dark font-weight-bold d-flex bg-transparent shadow-none">       
                    <h1 class="h5 m-0">         
                        <img src="../assets/img/protectionshield.svg" width="30" height="30" class="d-inline-block align-top" alt="Berserker Fitness Logo">
                        <span class="ml-1 my-auto Brand_logo">Berserker Fitness</span>
                    </h1>
            </router-link>
            <div class="d-block d-lg-none" style="position:relative">
                <button type="button" class="btn btn-transparent text-dark d-block d-lg-none" data-toggle="modal" data-target="#exampleModalLong" @click="getList">
                    <font-awesome-icon :icon="['fas', 'cart-arrow-down']" />
                </button>
                <span class="badge badge-danger rounded-circle" style="position:absolute;top:0;left:25px" v-if="product_num!==0">{{ product_num }}</span>
            </div>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <router-link to="/" class="nav-link text-dark">首頁</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/lecture/Lecture_Product" class="nav-link text-dark">課程</router-link>              
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link location_search" href="#" title="了解我們">
                            <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
                        </a> 
                    </li>
                    <li class="nav-item active">
                        <router-link to="/login" class="nav-link login_status" title="管理者登入">
                            <font-awesome-icon :icon="['fas', 'users-cog']" />
                        </router-link>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link likeButton" :class="{'text-danger':likeList.length!==0}" href="#" title="我的最愛" data-toggle="dropdown">
                            <font-awesome-icon :icon="['far','heart']" size="lg"></font-awesome-icon>  
                        </a> 
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuReference" style="min-width:400px;">
                            <div class="px-4">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="border-0 px-0">收藏清單</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="likeList.length!==0">
                                        <tr v-for="(item, index) in likeList" :key="index" >
                                          <td width="80">
                                            <a href="#" @click="removeLike(item)">
                                              <i class="fas fa-trash-alt text-danger"></i>
                                            </a>
                                          </td>
                                          <td width="120">{{ item.title }}</td>
                                          <td width="80" class="text-right">
                                            <a class="text-dark" href="#" @click.prevent="addToCart(item)">
                                              <font-awesome-icon :icon="['fas', 'cart-arrow-down']"/>
                                            </a>
                                          </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else class="text-danger">沒有我的最愛清單</tbody>
                                </table>
                            </div>  
                            </div>
                    </li>
                    <li class="nav-item active">
                        <router-link to="/">
                            <a class="nav-link text-dark" href="#" @click="signOut">登出</a>
                        </router-link>
                    </li>
                    
                    <li class="nav-item d-none d-lg-block" style="position:relative">
                        <button type="button" class="btn btn-transparent" data-toggle="modal" data-target="#exampleModalLong" @click="getList">
                            <font-awesome-icon :icon="['fas', 'cart-arrow-down']"/>
                        </button>
                        <span class="badge badge-danger rounded-circle" style="position:absolute;top:0;left:25px" v-if="product_num!==0">{{ product_num }}</span>
                    </li>
                </ul>
            </div>
        </nav>
        <!---->
        <div class="lecture_hide p-4 bg-light">  
            <div class="d-flex">
                    <div class="card rounded-0 border-0 mr-3 bg-light" style="width: 18rem;">
                        <img class="card-img-top" src="https://upload.cc/i1/2021/02/16/XaFwDo.jpg" alt="了解Berserker Fitness圖片">
                        <div class="card-body p-0 text-center mt-3">
                            <font-awesome-icon :icon="['fas', 'caret-right']" /> 
                            <router-link to="/Company/CompanyDetail" class="location_search_btn ml-2">了解Berserker Fitness</router-link> 
                        </div>
                    </div>
                    <div class="card rounded-0 border-0 bg-light" style="width: 18rem;">
                        <img class="card-img-top location_part" src="https://upload.cc/i1/2021/02/16/rcGXwH.jpg" alt="了解Berserker Fitness據點查詢圖片">
                        <div class="card-body p-0 text-center mt-3">
                            <font-awesome-icon :icon="['fas', 'caret-right']" />
                            <router-link to="/Company/LocationInfo" class="location_search_btn ml-2">Berserker Fitness據點查詢</router-link>  
                        </div>
                    </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade modal-right pr-0" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog mr-md-0 mt-0" role="document" >
                <div class="modal-content">
                    <div class="modal-header mr-0 bg-warning sticky-top">
                        <h4 class="modal-title font-weight-bold mx-auto" id="exampleModalLongTitle">購物車</h4>
                        <button type="button" class="close p-0 m-0" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body p-0">
                            <div class="card px-4 border-0" v-for="(item,index) in cart" :key="index">
                                <img class="card-img-top" :src="item.product.imageUrl" :alt="`${item.product.title}課程圖片`">
                                <div class="card-body">
                                    <h3 class="card-title">{{ item.product.title }}</h3>
                                    <h3 class="card-text">{{ item.product.price| currency }} 元</h3> 
                                    <div class="d-flex justify-content-between align-items-end">
                                        <span class="card-text h5">{{ item.qty }} /{{ item.product.unit }}</span>  
                                        <button type="button" class="btn btn-outline-danger" @click="delProduct(item.id)"><font-awesome-icon :icon="['fas', 'trash-alt']"/></button>  
                                    </div>  
                                </div>
                            </div>
                            <div class="bg-light p-4 h3 d-sm-flex justify-content-between mb-0" style="position:sticky; bottom:0;">總金額 {{ total_price| currency }}
                                <router-link to="/customerOrder/customer1">
                                    <button type="button" class="btn btn-warning px-5 w-100" @click="closeModal" :disabled="Status.isUploading">
                                    <font-awesome-icon :icon="['fas', 'spinner']" spin v-if="Status.isUploading"/>
                                    結帳去</button>
                                </router-link>
                            </div>
                    </div>
                </div>
            </div>
            </div>
    </div>
</template>

<script>
import $ from 'jquery';
import CartModal from "./Cart_modal.vue";
export default {
  name: 'Navbar',
  props:{
      'product_num':Number,
      'likeArray': {
          type: Array,
          default:function () {
            return []
          }
      }
  },
  data () {
      return{
          cart:[],
          cartData:JSON.parse(localStorage.getItem('carData')) || [],  // 取出localStorage資料
          total_price:0,
          total_length:0,
          Status:{
              isUploading:false
          },
          counter:0,
          cartLength:0,
          likeList:this.likeArray
      }
  },
  methods:{
      signOut:function(){
        const api = `${process.env.VUE_APP_APIPATH}/logout`; 
        this.$http.post(api).then((response)=>{
            let vm = this;
            $('.login_status').css('color', 'red');
            if(response.data.success){
                vm.$router.push('/login');
            }
        })
      },
      getList(){
        const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        vm.Status.isUploading = true;
        vm.$http.get(api).then((response) => {  
          vm.cart = response.data.data.carts;
          localStorage.setItem('cartData', JSON.stringify(vm.cart));
          vm.cartData = JSON.parse(localStorage.getItem('cartData')) || [];
          if(response.data.success){
            vm.Status.isUploading = false;
            vm.total_price = response.data.data.total;
            vm.total_length = response.data.data.carts.length;
            vm.getcartLength();
          }
        })
      },
      getLike(){
          let vm = this;
          let output_data = localStorage.getItem('LikeData');
          let output_array = JSON.parse(output_data);
          if(output_array===null) return;
          else vm.likeList = output_array;
      },
      addToCart(data){
        const vm = this;
        const cartID = [];
        vm.cartData = JSON.parse(localStorage.getItem('cartData')) || [];
        vm.cartData.forEach((item, index) => {
          cartID.push(item.product_id);
        })
        if(cartID.indexOf(data.id) === -1) {
          console.log('沒有這份資料');
          let cartContent = {
            product_id: data.id,
            qty: 1, 
            name: data.title,
            origin_price: data.origin_price,
            price: data.price,
          }
          vm.cartData.push(cartContent);
          localStorage.setItem('cartData', JSON.stringify(vm.cartData));
        } else {
          console.log('有這份資料');
          let cache = {};   
          vm.cartData.forEach((item, index) => {
            if(item.product_id === data.id) {
              cache = {
                product_id: data.id,
                qty: item.qty+=1,
                name: data.title,
                origin_price: data.origin_price,
                price: data.price,
              };
              vm.cartData.splice(index, 1);
            }
          })
          vm.cartData.push(cache);
          localStorage.setItem('cartData', JSON.stringify(vm.cartData));
        }
        vm.$bus.$emit('messsage:push', '已加入購物車', 'success');
        vm.removeLike(data);
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
      callCart(){
        $('.cart_list').addClass('cartOpen');
        $('.cart_list_cover').addClass('cartOpen');
        this.getList();
      },
      delProduct(id){
        let vm = this;     
        vm.Status.isUploading = true;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`; 
        vm.$http.delete(api).then((response)=>{
          if(response.data.success){
            vm.getList();
            $('#exampleModalLong').modal('hide');
            vm.$bus.$emit('messsage:push', response.data.message, 'danger');
            vm.Status.isUploading = false;
          } else {
            vm.getList();
            $('#exampleModalLong').modal('hide');
            vm.$bus.$emit('messsage:push', response.data.message, 'danger');
            vm.Status.isUploading = false;
          }
        })
      },
      closeModal(){
          $('#exampleModalLong').modal('hide');
      },
      getcartLength(){
          let vm = this;
          vm.cartLength = vm.total_length;
          vm.$emit('increment', Number(vm.cartLength));
      },
      removeLike(item){
          let vm = this;
          let output_data = localStorage.getItem('LikeData');
          let output_array = JSON.parse(output_data);
          if(output_array.length!==0){
            output_array.filter((obj, index) => {
                if(obj.title===item.title){
                    output_array.splice(index, 1);
                }
            })
          }        
          let input_data = JSON.stringify(output_array);
          localStorage.setItem('LikeData', input_data);
          vm.getLike();     
      }
  },
  created: function(){
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`; 
    this.$http.post(api).then((response)=>{
        if(response.data.success){
            $('.login_status').css('color', 'green');
        } else {
            $('.login_status').css('color', 'red');
        }
    })
    this.getList();
    this.getLike();
  },
  mounted(){
      $('.location_search').on('click', function(){
          $('.lecture_hide').slideToggle();
      })
  },
  watch:{
      likeArray: function() {
          this.likeList = this.likeArray; 
      }
  },
  components:{
      CartModal
  }
}
</script>

<style scoped lang="scss">
.text-danger{
  color:black;
}
.lecture_hide{
  display:none;
}
.location_search{
  color:black;
}
.location_search:hover{
  color:red
}
.location_search_btn{
  color:#000;
}
.location_search_btn:hover{
  color:grey;
  transition:all .2s;
}
.location_part{
  height:162px;
}
.likeButton{
  color: black;
}
.modal.fade.modal-right .modal-dialog {
  transform: translate(125%, 0px);
}
.modal.show.modal-right .modal-dialog {
  transform: none;
}
@media(max-width:680px){
  .Brand_logo{
    display:none;
  }
}
@media(max-width:380px){
  .location_part{
    height:87px;
  }
}
</style>

