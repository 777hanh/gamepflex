import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    isLoading: false,
    dataLoaded: false,
  }),

  actions: {
    startLoading() {
      this.isLoading = true;
    },

    stopLoading() {
      this.isLoading = false;
    },

    setDataLoaded(status) {
      this.dataLoaded = status;
    },

    async fetchInitialData() {
      try {
        this.startLoading();
        // Giả lập API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Sau khi có dữ liệu
        this.setDataLoaded(true);
        this.stopLoading();
        return true;
      } catch (error) {
        console.error("Error fetching initial data:", error);
        this.stopLoading();
        return false;
      }
    },
  },
});
