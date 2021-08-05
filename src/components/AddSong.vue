<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Logs</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add Maintenance Log</h4>
      <input type="text" placeholder="Log Title" required v-model="title">
      <input type="text" placeholder="Log Details" required v-model="details">
      <input type="date" class="date" required v-model="date">
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '../composables/useDocument'
export default {
  props: ['playlist'],
  setup(props) {
    const title = ref('')
    const details = ref('')
    const date = ref('')
    const showForm = ref(false)
    const { updateDoc } = useDocument('playlists', props.playlist.id)
    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        details: details.value,
        date: date.value,
        id: Math.floor(Math.random() * 1000000)
      }
      const res = await updateDoc({
        songs: [...props.playlist.songs, newSong]
      })
      title.value = ''
      details.value = ''
      date.value = ''
    }
    return { title, details, date, showForm, handleSubmit }
  }
}
</script>

<style scoped>
  .add-song {
    text-align: center;
    margin-top: 40px;
  }
  form {
    max-width: 100%;
    text-align: left;
  }
</style>