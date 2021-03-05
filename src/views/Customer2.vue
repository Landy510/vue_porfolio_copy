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
        <h2 class="text-center bg-warning py-2 cart_content_btn" @click="openCartContent">購物車內容
            <font-awesome-icon v-if="carts.length!==0" :icon="['fas','chevron-down']" size="1x" class="arrow"></font-awesome-icon>
            
        </h2>
        
        <div v-if="carts.length!==0" class=" cart_content">
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
                            <button class="btn btn-outline-danger" type="button" @click="delProduct(item.id)">
                            
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
                        <td colspan="5" class="text-right h5 text-success" v-if="final_total!==total">折扣價: <span class="h2">{{ final_total| currency }}</span></td>
                    </tr>
                </tfoot>
            </table>

            
        </div>
        <div v-else>
            <h2 class="text-center">購物車裡面沒有商品喔~~</h2>
        </div>
        

        
        <div class="my-5 row justify-content-center"> 
            <validation-observer  class="col-md-6" v-slot="{ invalid, handleSubmit  }">
                <form @submit.prevent="handleSubmit(submitForm)">
                    <validation-provider rules="required" v-slot="{ errors, classes }">
                        <div class="form-group">
                            <label for="username">收件人姓名</label>
                            <input id="username" type="text" name="姓名" 
                                class="form-control" v-model="form.user.name" :class="classes" placeholder="輸入姓名" >
                            <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                        
                    </validation-provider>
                    <validation-provider rules="required|email" v-slot="{ errors, classes }">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input id="email" type="email" name="email" 
                                class="form-control" v-model="form.user.email" :class="classes" placeholder="請輸入信箱">
                            <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>   
                    </validation-provider>
                    <validation-provider rules="required" v-slot="{ errors, classes }">
                        <div class="form-group">
                            <label for="useraddress">收件人地址</label>
                            <input id="useraddress" type="text" name="地址" 
                                class="form-control" v-model="form.user.address" :class="classes" placeholder="請輸入地址" >
                            <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                    </validation-provider>
                    <validation-provider rules="required" v-slot="{ errors, classes }">
                        <div class="form-group">
                            <label for="usertel">收件人電話</label>
                            <input id="usertel" type="tel" name="電話" 
                                class="form-control" v-model="form.user.tel" :class="classes" placeholder="請輸入電話" >
                            <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                    </validation-provider>

                    <validation-provider v-slot="{ errors, classes }">
                        <!-- 輸入框 -->
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
  </div>
</template>

<script>
    import $ from 'jquery';
    import Alert from './AlertMessage';
    import Navbar from './Navbar';
    export default {
        name: 'Customer1',
        data(){
            return{
               isLoading:false, 
               carts:[],
               total:0,
               final_total:0,
               coupon_code:'',
               product_length:0,
               form:{
                    user:{
                        name:'',
                        email:'',
                        tel:'',
                        address:'',
                    },
                    message:''
                }
            }
        },
        methods:{
            getList(){
                    const vm = this;
                    const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
                    vm.$http.get(api).then((response) => {  
                        console.log('Customer1',response);
                        vm.carts = response.data.data.carts;
                        vm.total = response.data.data.total;
                        vm.final_total = response.data.data.final_total;
                        vm.product_length = response.data.data.carts.length;
                        console.log(vm.carts)
                    })
            },
            delProduct(id){
                console.log(id);
                let vm = this;
                const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`; 
                vm.isLoading = true;
                this.$http.delete(api).then((response)=>{
                    console.log(response);
                    if(response.data.success){
                        vm.isLoading = false;
                        vm.$bus.$emit('messsage:push', response.data.message, 'danger');
                    } else {
                        vm.isLoading = false;
                        vm.$bus.$emit('messsage:push', response.data.message, 'danger');
                    }
                    vm.getList();
                })
            },
            addCouponCode(){
                const vm = this;
                vm.isLoading = true;
                const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
                const coupon = {
                    code:vm.coupon_code
                }
                this.$http.post(api, {data:coupon}).then((response) => {  
                    this.getList();  
                    vm.isLoading = false;
                })
            },
            CounterCoupute(cart_total_length){
                this.getList();
                this.product_length = cart_total_length;
            },
            openCartContent(){
                console.log("HelooCart");
                $('.cart_content').slideToggle(1000);
                $('.arrow').toggleClass('active');
            },
            createOrder(){
                const vm = this; 
                const order = vm.form;
                vm.isLoading = true;
                const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
                
                this.$http.post(api,{data:order}).then((response) => {  
                    console.log('訂單已建立', response);
                    vm.isLoading = false;
                })
            },
            submitForm() {
                const vm = this; 
                const order = vm.form;
                const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
                vm.isLoading = true;
                this.$http.post(api,{data:order}).then((response) => {  
                    console.log('response', response);
                    console.log('response1', response.data.success);
                    if(response.data.success){
                        console.log('訂單已建立');
                        vm.$router.push(`/customerOrder/CustomerCheckout/${response.data.orderId}`);  // 跳轉頁面
                    }
                })
                vm.isLoading = false;
            }
        },
        created(){
            this.getList();
        },
        components:{
            Alert,
            Navbar
        }
    };
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