import api from ".";

export default {
  async login(username, password) {
    try {
      const response = api.post("/auth/login", {
        username,
        password,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      throw error;
    }
  },

  async register(data) {
    try {
      const response = await api.post("/auth/register", data);

      return response;
    } catch (error) {
      throw error;
    }
  },
};
