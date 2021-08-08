<template>
  <MobileNav v-if="mobileView"/>
  <Navbar v-if="!mobileView"/>
  <div class="content">
    <router-view/>
  </div>
  <Footer />
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import MobileNav from './components/MobileNav.vue'
export default {
  data: () => {
    return {
      mobileView: true,
      showNav: false
    };
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 650;
    }
  },
  components: { Navbar, MobileNav, Footer },
  created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
  }
}
</script>

<style>
  .content {
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 20px;
  }
</style>