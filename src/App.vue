<template>
  <div id="boz">
    <router-view />
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/index.css";
import "/src/assets/css/Day.less";
import { getItem } from "./assets/js/Storage";
import "@/assets/css/Media.less"
import { _ } from "./assets/js/Def"
export default {
  name: "App",
  async mounted() {
    const { data: { info } } = await this.Fetch.Login.Login({ method: "get" });
    if (info) {
      this.$store.replaceState({
        info,
        boolean: true,
        // direct: this.Fetch.Chat.WebSocket.Direct(info.id)
      });
    }
    const dark = getItem("theme");
    if (dark) {
      _("html")[0].className = "dark";
      this.show = "white";
    }
  },
};
</script>
