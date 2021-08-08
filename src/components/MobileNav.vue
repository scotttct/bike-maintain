<template>
  <div class="mobile-nav">
    <nav>
      <img src="@/assets/logo.png"/>
      <h1><router-link :to="{ name: 'Home' }">T-Bike-Maintain</router-link></h1>
          <div class="links">
            <div v-if="user">
              <router-link class="list" :to="{ name: 'CreatePlaylist' }">Add Bike</router-link>
              <router-link class="list" :to="{ name: 'UserPlaylists' }">My Bikes</router-link>
              <!-- <span>Hey! {{ user.displayName }}</span> -->
              <button class="btn1" @click="handleClick">Logout</button>
            </div>
            <div v-else>
              <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
              <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
            </div>
          </div>
        </nav>
      </div>
</template>

<script>

import getUser from '../composables/getUser'
import useLogout from '../composables/useLogout'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const { user } = getUser()
    const { logout } = useLogout()
    const router = useRouter()
    const handleClick = async () => {
      await logout()
      console.log('logged out')
      router.push({ name: 'Login' })
    }
    return { handleClick, user }
  }
}
</script>

<style scoped>
  .mobile-nav {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: rgb(129, 211, 197);
  }
  nav {
    display: flex;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
    
  }
  nav img {
    max-height: 40px;
  }
  nav h1 {
    margin-left: 20px;
    font-size: .8em;
    
  }
  nav .links {
    margin-left: auto;
    
  }
  nav .links a, button {
    margin-left: 10px;
    font-size: 10px;
    margin-top: 0;
  }
    span {
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
  }

</style>