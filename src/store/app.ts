import type { Notification } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

const STORE_KEY = "pinia/useAppStore";
/**
 * useAppStore
 */
export const useAppStore = defineStore(STORE_KEY, () => {
  const notifications = ref<Notification[]>([]);
  /**
   * notify
   * @param n
   */
  function notify(n: Notification) {
    notifications.value.push(n);
    setTimeout(() => {
      notifications.value.pop();
    }, 4000);
  }

  /**
   * error
   * @param content
   */
  function error(content: string) {
    notify({ content, type: "negative" });
  }
  /**
   * success
   * @param content
   */
  function success(content: string) {
    notify({ content, type: "positive" });
  }
  /**
   * axiosError
   * @param axiosError
   * @param content
   */
  function axiosError(axiosError: unknown, content = "Ha ocurrido un error") {
    console.log({ axiosError });
    error(content);
  }

  return { notifications, notify, error, success, axiosError };
});
