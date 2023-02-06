<template>
  <div class="manage-major-box">
    <div class="manage-email-box">
      <div class="manage-left-box">
        <i :class="Mixin(info.email)" />
        <div class="left-main-box">
          <span>邮箱</span>
          <p>{{ info.email }}</p>
        </div>
      </div>
      <div class="manage-right-box" @click="SET({ name: init.email, title: '邮箱' })">
        {{ init.email = info.email ? "更改" : "设置" }}
      </div>
    </div>
    <div class="manage-password-box">
      <div class="manage-left-box">
        <i :class="Mixin(info.password)" />
        <div class="left-main-box">
          <span>账户密码</span>
          <p v-if="info.password">已设置，可以通过密码快速登录</p>
          <p v-else>未设置，当前可以通过邮箱验证码快速登录</p>
        </div>
      </div>
      <div class="manage-right-box" @click="SET({ name: init.password, title: '密码' })">
        {{ init.password = info.password ? "更改" : "设置" }}
      </div>
    </div>
    <div class="manage-path-box">
      <div class="manage-left-box">
        <div class="left-main-box">
          <span>个人路径</span>
          <p>http://{{ host }}/space/{{ info.path }}/</p>
        </div>
      </div>
      <div class="manage-right-box" @click="Way()">
        {{ init.space = info.space ? "更改" : "设置" }}
      </div>
    </div>
    <div class="manage-third-box">
      <div class="manage-left-box">
        <div class="left-main-box">
          <span>绑定第三方账户</span>
          <p>绑定后通过第三方应用快速扫码登录</p>
        </div>
      </div>
      <div class="manage-right-box">
        <div class="manage-qq-box">
          <i v-html="Icon.Space.QQ" />
          <span>绑定QQ</span>
        </div>
        <div class="manage-wchat-box">
          <i v-html="Icon.Space.Wchat" />
          <span>绑定微信</span>
        </div>
        <div class="manage-zifubao-box">
          <i v-html="Icon.Space.Zifubao" />
          <span>绑定支付宝</span>
        </div>
        <div class="manage-dindin-box">
          <i v-html="Icon.Space.DinDin" />
          <span>绑定钉钉</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Manage",
  data() {
    return {
      info: {},
      init: {
        password: "",
        email: ""
      },
      host: location.host
    }
  },
  async mounted() {
    const { data } = await this.Fetch.Space.Manage({})
    this.info = data
  },
  props: ["boolean"],
  methods: {
    Mixin(name) {
      return name ? 'el-icon-success' : 'el-icon-warning'
    },
    SET(obj) {
      this.boolean()
      this.Def.Space.Verification(obj)
    },
    Way() {
      this.boolean()
      this.Def.Space.OldWay()
    }
  },

}
</script>
<style scoped lang="less">
.manage-major-box {
  display: flex;
  gap: 10px;
  flex-direction: column;

  >div {
    margin: 0 10px;
    height: 97px;
    border: 1px solid var(--tint-solid);
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 20px;
    display: flex;
    justify-content: space-between;

    i {
      font-size: 24px;
    }

    .el-icon-success {
      color: #52c41a;
    }

    .el-icon-warning {
      color: #faad14;
    }

    .manage-left-box {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .manage-right-box {
      cursor: pointer;
    }

    .left-main-box {
      display: flex;
      flex-direction: column;
      gap: 5px;

      p {
        font-size: 14px;
        color: var(--account-tint-color)
      }
    }

    &:first-child {
      margin-top: 10px;
    }
  }

  .manage-third-box {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    gap: 10px;

    .manage-right-box {
      display: flex;
      gap: 30px;

      >div {
        display: flex;
        align-items: center;
        gap: 5px;

        i {
          display: flex;
          align-items: center;
        }

        /deep/svg {
          width: 25px;
          height: 25px;
        }

        span {
          font-size: 14px;
        }
      }
    }
  }
}
</style>