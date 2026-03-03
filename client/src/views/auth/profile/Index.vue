<template>
  <loading-overlay :loading="isLoading"></loading-overlay>

  <main
    class="flex flex-col w-full sm:w-2xl md:w-3xl lg:w-7xl mx-auto bg-[#e9ebee] min-h-screen border-x border-gray-400">

    <header-component></header-component>

    <div class="relative bg-white border-b border-gray-400">
      <div class="h-[200px] overflow-hidden bg-gray-300">
        <img src="https://via.placeholder.com/1200x400" class="w-full h-full object-cover" alt="banner" />
        <button class="absolute top-4 right-4 bg-black/50 p-1 rounded text-white"><ph-pencil-simple /></button>
      </div>

      <div class="flex px-4 pb-4 -mt-16 items-end gap-4 relative z-10">
        <div class="relative">
          <img
            :src="user?.profile?.profilePicture ? `http://localhost:8080${user.profile.profilePicture}` : '/def_pfp_6.jpg'"
            class="w-[160px] h-[160px] border-4 border-white shadow-sm object-cover" />
          <div
            class="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-1 flex items-center justify-center gap-1">
            <span class="w-2 h-2 bg-green-500 rounded-full"></span> ONLINE
          </div>
        </div>

        <div class="mb-4">
          <h1 class="text-2xl font-bold text-black drop-shadow-md">{{ user?.username }} ({{ user?.display_name ||
            'qweqwe' }}) <span class="text-lg font-normal opacity-80">her/he</span></h1>
        </div>
      </div>
    </div>

    <div class="bg-white border-b border-gray-300 p-4 flex items-center gap-4">
      <ph-quotes :size="32" weight="fill" class="text-gray-300" />
      <span class="italic text-gray-600">"123123"</span>
      <button class="text-blue-600 text-xs hover:underline">(edit)</button>
    </div>

    <div class="flex flex-row gap-4 p-4">

      <div class="w-1/3 flex flex-col gap-3">
        <section class="bg-white border border-[#bdc7d8]">
          <div class="bg-[#4e69a2] text-white px-2 py-1 font-bold text-sm">basic information</div>
          <div class="p-3 text-sm flex flex-col gap-2">
            <div class="flex gap-2 items-center text-gray-700">
              <ph-user-focus /> joined {{ new Date(user?.createdAt).toLocaleDateString('en-US', {
                month: 'long', year:
                  'numeric'
              }) }}
            </div>
          </div>
        </section>

        <section class="bg-white border border-[#bdc7d8]">
          <div class="bg-[#4e69a2] text-white px-2 py-1 font-bold text-sm flex justify-between">
            personal details <ph-caret-up />
          </div>
        </section>

        <section class="bg-white border border-[#bdc7d8]">
          <div class="bg-[#4e69a2] text-white px-2 py-1 font-bold text-sm flex justify-between">
            preferences <ph-caret-up />
          </div>
        </section>
      </div>

      <div class="w-2/3 flex flex-col gap-4">

        <div class="bg-white border border-[#bdc7d8]">
          <div class="flex border-b border-gray-200 bg-gray-50">
            <button
              class="px-4 py-2 text-xs font-bold border-r border-gray-200 flex items-center gap-1 text-[#4b4f56]"><ph-pencil-line />
              post</button>
            <button
              class="px-4 py-2 text-xs font-bold border-r border-gray-200 flex items-center gap-1 text-[#4b4f56]"><ph-image />
              photo</button>
            <button
              class="px-4 py-2 text-xs font-bold border-r border-gray-200 flex items-center gap-1 text-[#4b4f56]"><ph-link />
              link</button>
          </div>
          <div class="p-3">
            <textarea v-model="postDescription" placeholder="express yourself..."
              class="w-full min-h-[80px] outline-none text-sm resize-none"></textarea>
          </div>
          <div class="p-2 border-t border-gray-100 flex justify-between items-center bg-gray-50">
            <div class="flex gap-2 text-gray-400">
              <ph-smiley :size="20" /> <ph-paperclip :size="20" />
            </div>
            <button @click="submitPost"
              class="bg-[#4267b2] text-white font-bold px-6 py-1 text-sm rounded-sm hover:bg-[#365899]">post</button>
          </div>
        </div>

        <div v-for="post in posts" :key="post.id" class="bg-white border border-[#bdc7d8] p-3">
          <div class="flex gap-3">
            <img
              :src="user?.profile?.profilePicture ? `http://localhost:8080${user.profile.profilePicture}` : '/def_pfp_6.jpg'"
              class="w-10 h-10 object-cover" />
            <div class="flex flex-col">
              <a href="#" class="text-[#365899] font-bold text-sm hover:underline">{{ user?.username }}</a>
              <span class="text-[11px] text-gray-500">19/02/2026</span>
            </div>
          </div>
          <div class="py-3 text-sm text-gray-800">
            {{ post.description }}
          </div>
          <div class="border-t border-gray-100 pt-2 flex items-center gap-4 text-[#606770] text-xs font-bold">
            <button class="flex items-center gap-1 hover:underline"><ph-heart /> like (4)</button>
            <button class="flex items-center gap-1 hover:underline"><ph-chat-centered-text /> comment</button>
          </div>
        </div>

        <div class="flex justify-center gap-2 py-4">
          <button @click="page--" :disabled="page === 1"
            class="px-3 py-1 bg-white border border-gray-300 text-sm disabled:opacity-50">Prev</button>
          <span class="text-sm self-center">Page {{ page }} / {{ lastPage }}</span>
          <button @click="page++" :disabled="page === lastPage"
            class="px-3 py-1 bg-white border border-gray-300 text-sm disabled:opacity-50">Next</button>
        </div>

      </div>
    </div>
  </main>
</template>
<style scoped>
.post-btn {
  background: linear-gradient(to bottom, #4e69a2, #3b5998);
  transition: 0.2s ease all;
}

.post-btn:hover {
  opacity: 0.8;
}
</style>

<script lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import UserInformation from "@/components/UserInformationAside.vue";
import { PhThumbsUp, PhThumbsDown } from "@phosphor-icons/vue";
import api from "@/utils/api";
import { useStore } from "@/store";
import LoadingOverlay from "@/components/LoadingOverlay.vue";


interface Post {
  id: number;
  title?: string;
  description: string;
}

interface Profile {
  profilePicture: string;
}

interface User {
  id: number;
  username: string;
  createdAt: string;
  profile: Profile;
}


export default {
  components: {
    HeaderComponent,
    UserInformation,
    PhThumbsUp,
    PhThumbsDown,
    LoadingOverlay
  },

  data() {
    return {
      user: null as User,
      postDescription: '',
      posts: [] as Post[],
      limit: 5,
      lastPage: 1,
      page: 1,
      isLoading: false
    };
  },

  methods: {
    async submitPost() {
      try {
        const response = await api.post('/posts', { description: this.postDescription })
        console.log(response)

        await this.fetchPosts();
      } catch (error) {
        console.log(error)
      }
    },

    async fetchPosts() {
      try {
        this.isLoading = true
        const response = await api.get('/posts', {
          params: {
            page: this.page,
            limit: this.limit
          }
        })

        this.posts = response.data.posts
        this.lastPage = response.data.meta.lastPage

      } catch (error) {
        console.log(error)
      } finally {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000)

      }
    }
  },

  computed: {
    store() {
      return useStore();
    },
  },

  watch: {
    async page() {
      await this.fetchPosts();
    }
  },

  async mounted() {
    this.user = this.store.getUser;
    await this.fetchPosts()
  },
};
</script>
