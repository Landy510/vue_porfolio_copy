<template>
  <div>
    <Navbar/>
    <Alert/>
    <div class="container-fluid">
      <div class="row">
        <ul class="list-group">
          <li class="list-group-item border-0 text-muted">
          <font-awesome-icon :icon="['fas', 'users-cog']" />
              管理員頁面
          </li>
          <li class="list-group-item border-0 p-0">
            <router-link class="nav-link text-dark" to="/admin/orderList">
              <font-awesome-icon :icon="['fas', 'box-open']" />
              產品列表
            </router-link>
          </li>
          <li class="list-group-item border-0 p-0">
            <router-link class="nav-link text-dark" to="/admin/products">
              <font-awesome-icon :icon="['fas', 'list-alt']" />
              訂單列表
            </router-link>
          </li>
          <li class="list-group-item border-0 p-0">
            <router-link class="nav-link text-dark" to="/admin/Coupon">
              <font-awesome-icon :icon="['fas', 'ticket-alt']" />
              優惠券
            </router-link>
          </li>
        </ul>
        <div class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../Navbar'
import Alert from '../AlertMessage'
export default {
  data () {
    return {

    }
  },
  created () {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)Berserkertoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = myCookie
  },
  components: {
    Navbar,
    Alert
  }
}
</script>
