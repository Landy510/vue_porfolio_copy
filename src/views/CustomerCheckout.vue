<template>
  <div>
    <div class="vld-parent">
        <loading :active.sync="isLoading"></loading>
    </div>
    <Navbar></Navbar>
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
                <div class="rounded-circle d-flex justify-content-center align-items-center h3 alert alert-primary mb-1 " style="width:100px;height:100px;">Step3</div>
                <div class="text-center font-weight-bold">訂單確認</div>
            </div>
        </div>
        <div class="d-flex d-md-none justify-content-center mt-4">
            <div>
                <div class="rounded-circle d-flex justify-content-center align-items-center h3 alert alert-primary mb-1" style="width:100px;height:100px;">Step3</div>
                <div class="text-center font-weight-bold">訂單確認</div>
            </div>
        </div>
        <h2 class="text-center bg-warning py-2 cart_content_btn" >訂單內容
        </h2>

        <div>
            <div class="vld-parent">
                <loading :active.sync="isLoading"></loading>
            </div>
            <div class="my-5 row justify-content-center">
                <form class="col-md-6" @submit.prevent="payOrder">
                    <table class="table">
                    <thead>
                        <th>課程</th>
                        <th>數量</th>
                        <th>單價</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in order.products" :key="item.id">
                        <td class="align-middle">{{ item.product.title }}</td>
                        <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                        <td class="align-middle text-right">{{ item.final_total| currency }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colspan="2" class="text-right">總計</td>
                        <td class="text-right">{{ order.total| currency }}</td>
                        </tr>
                    </tfoot>
                    </table>

                    <table class="table">
                    <tbody>
                        <tr>
                        <th width="100">Email</th>
                        <td>{{ order.user.email }}</td>
                        </tr>
                        <tr>
                        <th>姓名</th>
                        <td>{{ order.user.name }}</td>
                        </tr>
                        <tr>
                        <th>收件人電話</th>
                        <td>{{ order.user.tel }}</td>
                        </tr>
                        <tr>
                        <th>收件人地址</th>
                        <td>{{ order.user.address }}</td>
                        </tr>
                        <tr>
                        <th>付款狀態</th>
                        <td>
                            <span v-if="!order.is_paid">尚未付款</span>
                            <span v-else class="text-success">付款完成</span>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    <div class="text-right" v-if="order.is_paid === false">
                        <button class="btn btn-danger" type="button" @click="payOrder">確認付款去</button>
                    </div>
                    <div class="text-right" v-if="order.is_paid === true">
                        <router-link to="/">
                            <button type="button" class="btn btn-warning">繼續選購</button>
                        </router-link>
                    </div>
                </form>
                </div>
        </div>
    </div>
  </div>
</template>

<script>
    import Alert from './AlertMessage';
    import Navbar from './Navbar';
    export default {
        name: 'Customer1',
        data(){
            return{
               isLoading:false, 
               orderId:'',
               order:{
                   user:{
                       email:''
                   }
               },
            }
        },
        methods:{
            getList(){
                const vm = this;
                const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
                vm.$http.get(api).then((response) => {
                    vm.order = response.data.order;  
                })
            },
            CounterCoupute(cart_total_length){
                this.getList();
                this.product_length = cart_total_length;
            },
            payOrder(){
                const vm = this;
                const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
                vm.isLoading = true;
                this.$http.post(api).then((response) => {
                    vm.getList(); 
                    vm.isLoading = false;
                })
            }
        },
        created(){
            
            this.orderId = this.$route.params.orderId;
            console.log(this.orderId);
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