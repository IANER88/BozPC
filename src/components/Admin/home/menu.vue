<template>
  <div class="menu-box">
    <router-link tag="button" @click.native="Link(item.id)" :to="item.Path" active-class="active">
      <i v-html="item.Icon"></i>
      <span>{{ item.name }}</span>
    </router-link>
    <el-collapse-transition>
      <div class="menu-all" v-show="Index === item.id">
        <router-link tag="button" :to="hove.Path" v-for="(hove, home) of item.list" :key="home"
          active-class="active-box">
          <i v-html="hove.Icon" />
          <span>{{ hove.name }}</span>
        </router-link>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      show: false,
    };
  },
  props: ["item", "Index"],
  methods: {
    Link(id) {
      this.show = true;
      this.$emit("link", id);
    },
  },
};
</script>
<style scoped lang="less">
.menu-box {
  .button {
    width: 100%;
    height: 50px;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    grid-gap: 20px;
    font-size: 16px;
    padding: 0 30px;
    cursor: pointer;
  }

  button {
    .button();

    i {
      display: flex;
      align-items: center;
    }

    /deep/svg {
      width: 20px;
      height: 20px;

      path {
        fill: var(--color);
      }
    }

    &:hover {
      background: #fff;
      color: var(--main-color);

      /deep/svg,
      /deep/path {
        fill: #fff !important;
      }
    }
  }
}
</style>
