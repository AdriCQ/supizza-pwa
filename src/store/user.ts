import { defineStore } from "pinia";
import { ref } from "vue";
import { useStorage } from "@/helpers";
import { useMap, useService } from "@/services";
import type { UserLogin, UserCreate, User, Address } from "@/types";

const $service = useService();
const { getClientAddress } = useMap();

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

  const address = ref<Address[]>([]);

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
   * getAddress
   */
  async function getAddress() {
    if (user.value && user.value._id) {
      const resp = await getClientAddress(user.value._id);
      address.value = resp.data;
    }
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
    address,
    auth_token,
    user,
    // Methods
    getAddress,
    login,
    register,
    save,
    load,
  };
});
