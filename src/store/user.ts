import { defineStore } from "pinia";
import { ref } from "vue";
import { useStorage } from "@/helpers";
import { useService } from "@/services";
import type { UserLogin, UserCreate, User } from "@/types";

const $service = useService();

const STORE_KEY = "pinia/useUserStore";

/**
 * storage
 */
const storage = useStorage<{ token?: string; user?: User }>(STORE_KEY);
/**
 * useUserStore
 */
export const useUserStore = defineStore(STORE_KEY, () => {
  /**
   * token
   */
  const auth_token = ref<string>();

  const user = ref<User>();

  /**
   * login
   */
  async function login(params: UserLogin) {
    const resp = await $service.user.login(params);
    const { Token, Usuario } = resp.data;
    auth_token.value = Token;
    user.value = Usuario;
    save();
  }

  /**
   * register
   */
  async function register(params: UserCreate) {
    const resp = await $service.user.register(params);
    const { Token, Usuario } = resp.data;
    auth_token.value = Token;
    user.value = Usuario;
    save();
  }

  /**
   * save
   */
  function save() {
    storage.set({
      token: auth_token.value,
      user: {
        apellidos: user.value?.apellidos as string,
        _id: user.value?._id as string,
        nombres: user.value?.nombres as string,
        telefono: user.value?.telefono as string,
      },
    });
  }

  /**
   * load
   */
  function load() {
    const data = storage.get();
    auth_token.value = data?.token;
    user.value = data?.user;
  }

  return {
    // Data
    auth_token,
    user,
    // Methods
    login,
    register,
    save,
    load,
  };
});
