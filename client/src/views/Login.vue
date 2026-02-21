<template>
  <div class="bg-white w-[340px] min:h-[400px]  border  border-slate-400 shadow-md">

    <div class="w-full flex items-center justify-center  ">
      <router-link to='/' class="text-center flex-1 font-bold bg-primary text-white py-2">login</router-link>
      <router-link to='/create-account' class="text-center flex-1 font-bold text-slate-600 py-2">create
        account</router-link>
    </div>

    <form v-motion-fade class="" @submit.prevent="login">
      <div class="mt-4 mb-6 py-2 px-4 ">
        <h4 class="font-bold text-center text-slate-800" style="font-size: 22px;">Welcome</h4>
        <h4 class="font-light text-center text-slate-800" style="font-size: 14px;">please login</h4>
        <div class="flex items-center justify-center">
          <span v-motion-fade v-if="errorMessage"
            class="flex-1 bg-red-100 border border-red-300-300 p-2 text-red-800 shadow-inner mt-2">{{ errorMessage
            }}</span>
          <span v-motion-fade v-else-if="successMessage"
            class="flex-1 mt-2 bg-green-100 border border-green-300-300 p-2 text-green-800 shadow-inner">{{
              successMessage
            }}</span>
        </div>
      </div>

      <!-- <div class="border border-dashed w-full border-gray-300"></div> -->

      <div class="mt-2 px-4 ">

        <label>username
          <input type="text" placeholder="Username" v-model="username" name="username"
            class="border border-gray-400 px-4 py-1.5 w-full shadow-inner outline-none mb-3" />
        </label>

        <label>
          password
          <input type="password" placeholder="Password" v-model="password" name="password"
            class="border border-gray-400 px-4 py-1.5 w-full shadow-inner outline-none" />
        </label>

        <div class="flex flex-col gap-4">

          <button :disabled="isLoading"
            class="w-full px-3 py-4 text-white mt-5 flex items-center justify-center cursor-pointer hover:shadow-md inset-shadow-xs inset-shadow-white/50  enter-btn">
            <vue-spinner v-if="isLoading" size="20"></vue-spinner>
            <span v-else class="font-bold tracking-wider">login</span>
          </button>


          <router-link class="text-center ">
            <span>
              forgot password?
            </span>
          </router-link>

        </div>

        <!-- <router-link to="/register">
        <button
          class="text-[#29487d] w-full p-3 mt-2 shadow-inner border border-gray-200 cursor-pointer hover:scale-105 duration-200 transition-all ease-in">
          <span class="font-bold">register</span>
        </button>
      </router-link> -->
      </div>


      <!-- tips -->
      <div>


        <div
          class="border-t border-b border-gray-400 inset-shadow-sm inset-shadow-gray-200 mt-6  py-2 flex items-center justify-center">
          <span class="font-bold">tips</span>
        </div>

        <div class="p-4 bg-amber-100/40">
          <ul class="list-disc space-y-2 list-inside marker:text-amber-800/60 marker:font-bold marker:text-lg">
            <li>
              <span>Use the email and password you registered with.</span>
            </li>

            <li>
              <span>Forgot your password? You can reset it anytime.</span>
            </li>

            <li>
              <span>For your security, never share your password.</span>
            </li>
          </ul>

        </div>

      </div>


    </form>
  </div>

</template>

<style scoped>
form {

  background: #f0f0f0;
  background: linear-gradient(0deg, rgba(240, 240, 240, 1) 0%, rgba(255, 255, 255, 1) 100%);
}

.enter-btn {
  /* background-color: #29487d; */
  background: linear-gradient(rgb(98, 122, 173), rgb(89, 114, 168));
  transition: all 0.3s ease;
}

.primary-color {
  color: linear-gradient(rgb(98, 122, 173), rgb(89, 114, 168));
}

.enter-btn:hover {
  scale: 1.02;
}

input {
  animation: default 0.3s forwards;
}

/* input:focus {
  animation: lift 0.3s forwards;
} */

form {
  animation: stretch 0.5s;
}

@keyframes stretch {
  from {
    width: 800px;
  }

  to {
    width: 340px;
  }
}

@keyframes lift {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-4px);
  }
}

@keyframes default {
  from {
    transform: translateY(-4px);
  }

  to {
    transform: translateY(0);
  }
}
</style>

<script>
import { VueSpinner } from "vue3-spinners";
import authApi from "@/utils/api/auth.api";

export default {
  name: "LoginView",
  components: {
    VueSpinner,
  },
  data() {
    return {
      username: "",
      password: "",
      isLoading: false,
      errorMessage: null,
    };
  },

  computed: {
    successMessage() {
      return this.$route.query.message;
    },
  },

  methods: {
    submitHandler() {
      if (!this.username.trim()) return;
      localStorage.setItem("username", this.username.trim());
      this.$router.push("/chat");
    },

    async login() {
      try {
        this.isLoading = true;
        await authApi.login(this.username, this.password);
        this.$router.push("/chat");
      } catch (error) {
        console.error(error);
        this.errorMessage = error.response.data.message || "Something went wrong.";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
