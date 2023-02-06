<template>
  <el-dropdown trigger="click">
    <slot />
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="copyLink()">
        <i v-html="Icon.Home.link" />
        <span>复制链接</span>
      </el-dropdown-item>
      <el-dropdown-item>
        <i v-html="Icon.Home.weibo" />
        <span>新浪微博</span>
      </el-dropdown-item>
      <el-dropdown-item class="qrcode">
        <div class="box">
          <i v-html="Icon.Home.weixin" />
          <span>微信扫一扫</span>
        </div>
        <img src="@/assets/img/4.png" alt="" />
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import { Revert } from "@/assets/js/Def";
export default {
  name: "Share",
  props: ["title", "info"],
  methods: {
    async copyLink() {
      const title = (url = location) => {
        return `${this.title} - Boz ${url}`
      }
      let res;
      if (this.info) {
        const { author: { name }, id } = this.info
        res = await navigator.clipboard.writeText(title(`${location}/article/${name}/${id}`))
      } else {
        res = await navigator.clipboard.writeText(Revert(title()));
      }
      if (!res) {
        this.$message({
          type: "success",
          message: "复制成功",
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.share {
  color: var(--color);

  &:hover {
    color: var(--main-color);

    svg {
      fill: var(--main-color);
    }
  }
}

/deep/.el-dropdown-menu__item {
  display: flex;
  align-items: center;

  i {
    display: flex;
    align-items: center;
  }

  &:not(.qrcode) {
    &:hover {
      color: #76839b;
      background: #f6f6f6 !important;
    }
  }

  &.qrcode {
    flex-direction: column;

    .box {
      display: flex;
      align-items: center;
    }

    img {
      width: 94px;
      height: 94px;
    }

    &:hover {
      background: none;
      color: initial;
    }
  }
}
</style>
