<template>
  <div>
    <carousel :perPage="1" :paginationEnabled="false" :autoplay="true">
      <slide class="bg-cover intro_image d-flex justify-content-center align-items-center">
        <div class="intro_content">
          <h2 class="display-4 px-2">It Is Time To Transform Your Physics</h2>
        </div>
      </slide>
      <slide class="bg-cover intro_image1 d-flex justify-content-center align-items-center">
        <div class="intro_content">
          <h2 class="display-4 px-2">最專業的器材</h2>
        </div>
      </slide>
      <slide class="bg-cover intro_image2 d-flex justify-content-center align-items-center">
        <div class="intro_content">
          <h2 class="display-4 px-2">邁向你想要的體態</h2>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import $ from 'jquery'
import { Carousel, Slide } from 'vue-carousel'
export default {
  props: ['introImage', 'introImage_1', 'introImage_2'],
  data () {
    return {

    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted () {
    const vm = this
    $('.intro_image').css('background-image', `url(${vm.introImage})`)
    $('.intro_image1').css('background-image', `url(${vm.introImage_1})`)
    $('.intro_image2').css('background-image', `url(${vm.introImage_2})`)
  },
  components: {
    Carousel,
    Slide
  }
}
</script>

<style scoped>
.intro_image{
  height: 650px;
}
.intro_content{
  background:rgba(255,255,255,0.5)
}
@media(max-width:568px){
  .intro_image{
    height:480px;
  }
}
</style>
