import { useStorage } from "@/helpers";
import { defineStore } from "pinia";
import { ref } from "vue";

const STORE_KEY = "pinia/useUserStore";
/**
 * storage
 */
const storage = useStorage<{ token?: string }>(STORE_KEY);
/**
 * useUserStore
 */
export const useUserStore = defineStore(STORE_KEY, () => {
  /**
   * token
   */
  const auth_token = ref<string>();

  /**
   * login
   */
  async function login() {}

  /**
   * register
   */
  async function register() {}

  /**
   * save
   */
  function save() {
    storage.set({
      token: auth_token.value,
    });
  }

  /**
   * load
   */
  function load() {
    const data = storage.get();
    auth_token.value = data?.token;
  }

  return {
    // Data
    auth_token,
    // Methods
    login,
    register,
    save,
    load,
  };
});
