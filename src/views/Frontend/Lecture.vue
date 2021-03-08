<template>
  <div>
    <alert/>
    <router-view/>
  </div>
</template>

<script>
import alert from '../AlertMessage'
export default {
  data () {
    return {
      itemId: ''
    }
  },
  components: {
    alert
  }
}
</script>
