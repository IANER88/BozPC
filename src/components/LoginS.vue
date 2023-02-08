<template>
  <div class="right">
    <h3>{{ title }}</h3>
    <div class="img">
      <div><i v-html="Icon.Login.weixin" />微信登录</div>
      <div>
        <Logo title="" :href="false" />
      </div>
    </div>
    <div class="bordr"><span>或</span></div>
    <div class="input">
      <input type="text" placeholder="输入邮箱号" v-model.trim="login.email" :class="{ alert: Warning.email }" />
      <span v-show="Warning.email">
        <i v-html="Icon.Login.email" />
        请输入正确邮箱账号
      </span>
      <div>
        <input type="text" placeholder="验证码" v-model.trim="login.enroll" />
        <button @click="Enroll()" :disabled="init.name">
          {{ init.title }}
        </button>
      </div>
      <span v-show="Warning.enroll">
        <i v-html="Icon.Login.email" />
        验证码错误请重新输入
      </span>
    </div>
    <button @click="Login()" v-if="show_ == 'Login'">登录</button>
    <button @click="Register()" v-if="show_ == 'Register'">注册</button>
    <div v-show="hide"><span @click="chang">密码登录</span></div>
    <div v-if="show_ == 'Login'">
      <span>还没有账号？</span><span @click="Led">前往注册</span>
    </div>
    <div v-if="show_ == 'Register'">
      <span>已有账号？</span><span @click="Red">前往登录</span>
    </div>
  </div>
</template>

<script>
import Regular from "@/assets/js/regular";
import Logo from "./Logo.vue";
export default {
  data() {
    return {
      show: "Password",
      login: {
        email: "",
        enroll: "",
      },
      init: {
        name: false,
        title: "发送验证码",
      },
      Warning: {
        email: false,
        enroll: false,
      },
      Email: Regular.Email(),
    };
  },
  props: ["title", "hide", "show_", "onclick", "name"],
  methods: {
    chang() {
      this.$emit("hide", this.show);
    },
    Led() {
      this.$emit("hide", "Register");
    },
    Red() {
      this.$emit("hide", "Login");
    },
    isConditions() {
      const EmailS = (test) => this.Email.test(test);
      const Email = EmailS(this.login.email.trim());
      const Enroll = this.login.enroll.trim();
      !Email ? (this.Warning.email = true) : (this.Warning.email = false);
      !Enroll ? (this.Warning.enroll = true) : (this.Warning.enroll = false);
      if (Email && Enroll) return true;
    },
    async Login() {
      if (this.isConditions()) {
        const res = await this.Fetch.Login.Login({
          method: "patch",
          data: {
            email: this.login.email.trim(),
            enroll: this.login.enroll.trim(),
            effect: "登录"
          }
        });
        this.Def.Home.Message({
          res: res.data,
          fun: () => {
            location.href = "/";
          }
        })
      }
    },
    Enroll() {
      this.Def.Enroll({
        warning: {
          fun: () => {
            this.Warning.email = true
          },
          def: () => {
            this.Warning.email = false
          }
        },
        email: this.login.email,
        init: this.init,
        effect: this.show_ === "Login" ? "登录" : "注册",
      });
    },
    async Register() {
      if (this.isConditions()) {
        const { data } = await this.Fetch.Login.Register({
          email: this.login.email.trim(),
          enroll: this.login.enroll.trim(),
          effect: "注册",
        });
        this.Def.Home.Message({
          res: data,
          fun: () => {
            location.href = "/";
          }
        })
      }
    },
  },
  watch: {
    email: {
      deep: true,
      handler() { },
    },
  },
  components: { Logo },
};
</script>

<style lang="less" scoped>
.span {
  color: var(--main-color);
  padding: 5px;
  cursor: pointer;
  font-size: 13px;
  border-radius: 5px;

  &:hover {
    background: #e1e8fc;
  }
}

.spanRed {
  span {
    display: flex;
    font-size: 10px;
    color: var(--error);

    i {
      .vertical();
      margin-right: 5px;
    }
  }
}

.vertical {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.inputbox {
  height: 45px;
  background: var(--option);
  padding: 10px;
  outline: none;
  border: none;
  margin-bottom: 10px;
  border-radius: 6px;
  font-size: 15px;

  &:hover {
    background: #e0e0e0;
  }

  &:focus {
    border: solid var(--main-colors) 2px;
  }
}

.button {
  outline: none;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.right {
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 2rem 0;

  .img {
    display: flex;
    width: 100%;
    height: 40px;
    justify-content: space-between;
    margin: 10px 0;

    >div {
      display: flex;
      justify-content: center;
      border-radius: 6px;

      /deep/svg {
        width: 30px;
        height: 30px;
      }

      i {
        .vertical();
      }

      &:nth-child(1) {
        width: 80%;
        height: 100%;
        line-height: 40px;
        border: solid var(--tint-solid) 1px;
        font-size: 14px;
        cursor: pointer;
        display: flex;
        gap: 10px;
      }

      &:nth-child(2) {
        height: 100%;
        cursor: pointer;
        padding: 5px;
        border: solid var(--tint-solid) 1px;

        img {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          margin: 0 auto;
        }
      }
    }
  }

  .bordr {
    margin: 5px 0;
    height: 1px;
    font-size: 7px;
    background: var(--option);

    span {
      width: 45px;
      height: 10px;
      text-align: center;
      position: relative;
      display: block;
      background: var(--tint-color);
      top: -8px;
      margin: 0 auto;
    }
  }

  .input {
    display: flex;
    flex-direction: column;

    +button {
      height: 40px;
      background: var(--main-color);
      color: #fff;
      margin-top: 10px;

      &:hover {
        background: var(--main-color);
      }

      .button();

      +div {
        margin-top: 20px;
        text-align: center;

        span {
          .span();
        }

        +div {
          margin-top: 15px;
          text-align: center;

          span {
            font-size: 14px;

            &:nth-child(1) {
              color: #adbac7;
            }

            &:nth-child(2) {
              .span();
            }
          }
        }
      }
    }

    .spanRed();

    >input {
      margin: 10px 0;
    }

    input {
      height: 45px;
      background: var(--option);
      padding: 10px;
      outline: none;
      border: none;
      border-radius: 6px;
      font-size: 15px;

      >span {
        .span();
      }

      &:hover {
        background: #32363f;
      }

      &:focus {
        border: solid var(--main-color) 2px;
      }
    }

    >div {
      display: flex;
      height: 45px;
      justify-content: space-between;
      margin: 10px 0;

      input {
        width: 60%;
      }

      button {
        width: 35%;
        height: 100%;
        border: 1px var(--tint-solid) solid !important;
        background: none;
        color: inherit;
        .button();
      }
    }
  }
}

.alert {
  border: solid var(--error) 2px !important;
}
</style>
