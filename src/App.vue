<template>
  <div id="app">
    <button class="btn scrollTop bg-transparent text-dark">
      <font-awesome-icon :icon="['fas','chevron-up']" size="3x"></font-awesome-icon>
      <p>Top</p>
    </button>
    <Loading :active.sync="isLoading"></Loading>
    <router-view/>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'App',
  data () {
    return {
      carts: [],
      isLoading: false
    }
  },
  methods: {
    getCart () {
      const vm = this
      vm.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      this.$http.get(url).then((response) => {
        if (response.data.data.carts) {
          vm.carts = response.data.data.carts
        }
        vm.isLoading = false
      })
    },
    removeCart (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      this.$http.delete(url).then((response) => {
        vm.isLoading = false
        vm.getCart()
      })
    },
    callCart () {
      $('.cart_list').addClass('cartOpen')
      $('.cart_list_cover').addClass('cartOpen')
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss">
@import "./assets/helper/all.css";
.scrollTop{
  display:none;
  position:fixed;
  right:30px;
  bottom:200px;
  z-index:9999;
}
</style>
