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

    }
  },
  components: {
    alert
  }
}
</script>
