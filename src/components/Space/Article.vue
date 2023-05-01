<template>
  <Live :info="info" :mount="mount">
    <el-dropdown class="top" trigger="click">
      <div class="header-box">
        {{ init.name }}
        <i v-html="Icon.Space.switch" />
      </div>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item of init.box"
          :key="item.id"
          @click.native="SWITCH(item)"
        >
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </Live>
</template>
<script>
import Live from "./Live.vue";
export default {
  name: "Aritcle",
  data() {
    return {
      init: {
        name: "按时间正序",
        index: 1,
        box: [
          {
            id: 1,
            name: "按时间正序",
          },
          {
            id: 2,
            name: "按时间降序",
          },
          {
            id: 3,
            name: "点赞数排序",
          },
        ],
      },
      info: {},
    };
  },
  components: { Live },
  mounted() {
    this.mount(this.init.index);
  },
  methods: {
    SWITCH(item) {
      this.init.name = item.name;
      this.init.index = item.id;
      this.mount(item.id);
    },
    async mount(id) {
      try {
        const { data } = await this.Fetch.Home.Article({
          method: "post",
          name: this.$route.params.name,
          id,
        });
        this.info = data.info;
      } catch {
        location.href = "/404";
      }
    },
  },
};
</script>