<template>

  <div v-motion-fade v-if="data.type == 'chat'">
    <!-- {{ JSON.stringify(data) }} -->
    <div class="flex flex-row flex-wrap gap-4">
      <img :src="data.profilePicture
        ? `http://localhost:8080${data.profilePicture}`
        : '/def_pfp_6.jpg'
        " class="pfp border-2 border-slate-200 hover:scale-110 hover:rotate-12 duration-200" />
      <span
        class=" hover:scale-105 duration-100 flex break-all items-center text-xs bg-blue-50 border border-blue-100 px-2.5 py-0.5 cursor-pointer message-box max-w-[300px]"
        v-html="renderMessage(data.message)">
      </span>
    </div>

    <p :class="[
      'font-semibold text-[#29487d] mt-2',
      { 'text-green-700': data.userId == user?.id },
    ]">
      <small class="mr-2">{{
        data.userId == user?.id ? "You" : data.username
      }}</small>
      <small class="time text-gray-400">{{
        new Date(data.time).toLocaleTimeString([], { timeStyle: "short" })
      }}</small>
    </p>
  </div>
  <div v-else class="text-center ">
    <div class="flex w-full items-center rounded-full ">
      <div class="flex-1 border-b border-gray-300"></div>
      <small class="text-gray-600 leading-8 px-8 py-3"> <span class="text-blue-400 font-semibold">{{
        data.message.split(' ').shift()
      }}</span> {{
            data.message.split(' ').slice(1).join(' ') }}
      </small>
      <!-- <span class="text-black text-lg font-semibold leading-8 px-8 py-3">Notification</span> -->
      <div class="flex-1 border-b border-gray-300"></div>
    </div>
  </div>
</template>
<script>
import { emojis } from '@/utils/emojis';
export default {
  props: ['data', 'user'],

  mounted() {
  },

  methods: {
    renderMessage(raw) {
      let rendered = raw;

      emojis.forEach(({ emoji, path }) => {
        const imgEl = `<img src='${path}' alt='${emoji}' class='message-emoji'/>`;
        rendered = rendered.replaceAll(emoji, imgEl);
      });

      return rendered;
    },
  },
}
</script>

<style scoped>
.pfp {
  max-width: 28px;
  max-height: 28px;
  object-fit: cover;
}

.time {
  font-size: 11px !important;
}
</style>