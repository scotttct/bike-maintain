<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">

    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl">
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Owned by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete Bike</button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">No Bikes have been added yet.</div>
      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="logs">
          <h3>{{ song.title }}</h3>
          <p class="details">{{ song.details }}</p>
          <p>{{ song.date }}</p>
        </div>
        <button v-if="ownership" @click="handleClick(song.id)">delete</button>
      </div>
      <AddSong :playlist="playlist" />
    </div>
    
  </div>
</template>

<script>

import AddSong from '@/components/AddSong.vue'
import useStorage from '@/composables/useStorage'
import useDocument from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
  props: ['id'],
  components: { AddSong },
  setup(props) {
    const { error, document: playlist } = getDocument('playlists', props.id)
    const { user } = getUser()
    const { deleteDoc, updateDoc } = useDocument('playlists', props.id)
    const { deleteImage } = useStorage()
    const router = useRouter()
    const ownership = computed(() => {
      return playlist.value 
        && user.value 
        && user.value.uid == playlist.value.userId
    })
    const handleDelete = async () => {
      await deleteDoc()
      await deleteImage(playlist.value.filePath)
      router.push({ name: 'Home' })
    }
    const handleClick = async (id) => {
      const songs = playlist.value.songs.filter((song) => song.id != id)
      await updateDoc({ songs })
    }
    return { error, playlist, ownership, handleDelete, handleClick }
  }
}
</script>

<style>
  .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 40px;
  }

  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 100px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 75%;
    max-height: 75%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: rgb(13, 146, 139);
  }
  .description {
    text-align: center;
  }
  .single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 10px;
  }
  .details {
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 600px;
  padding: 10px 10px 10px 0 ;
}
 @media screen and (min-width: 40em) {
   .cover {
     padding:180px;
   }
   .cover img {
      min-width: 100%;
      min-height: 100%;
      max-width: 100%;
      max-height: 100%;
   }

 }
</style>