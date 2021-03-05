<template>
  <div>
    <!--<Navbar></Navbar>-->
    <router-view/>
  </div>
</template>

<script>
    import Navbar from './Navbar';
    export default {
        name: 'CustomerOrder',
        data(){
            return{
                
            }
        },
        components:{
            Navbar
        }
    };
</script>
