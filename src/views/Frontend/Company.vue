<template>
    <div>
        <alert/>
        <router-view/>
    </div>
</template>

<script>
  import Navbar from '../Navbar'
  import alert from '../AlertMessage'
  export default {
    data(){
        return{
            
        }
    },
    components:{
        Navbar,
        alert
    }
  }
</script>