<template>
  <div class="login-box">
    <div class="nav">
      <Logo />
    </div>
    <div class="main-box">
      <div class="content">
        <div class="left">
          <img src="~@/assets/img/placeholder-img.4a8e3629.png" alt="" />
        </div>
        <Login v-show="show == 'Login'" @hide="hide" title="欢迎回来" :hide="true" show_="Login" name="登录" />
        <div class="right password" v-show="show == 'Password'">
          <div>
            <i v-html="Icon.Login.password" @click="show = 'Login'" />
            <h3>密码登录</h3>
          </div>
          <div>
            <input type="text" placeholder="邮箱" @keydown.enter="Login()" v-model.trim="email"
              :class="{ alert: Warning.email }" />
            <span v-if="Warning.email">
              <i v-html="Icon.Login.email" />
              请输入正确邮箱账号
            </span>
            <input type="password" placeholder="密码" @keydown.enter="Login()" v-model.trim="password"
              :class="{ alert: Warning.password }" />
            <span v-if="Warning.password">
              <i v-html="Icon.Login.email" />
              请输入正确密码
            </span>
          </div>
          <button @click="Login()">登录</button>
          <div><span>忘记密码</span></div>
        </div>
        <Login v-show="show == 'Register'" @hide="hide" title="注册账号" show_="Register" name="注册" />
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo.vue";
import Login from "./LoginS.vue";
import Regular from "../assets/js/regular";
export default {
  data() {
    return {
      show: "Login",
      email: "",
      password: "",
      Warning: {
        email: false,
        password: false,
      },
    };
  },
  components: {
    Logo,
    Login,
  },
  mounted() {
    document.title = "登录";
  },
  methods: {
    hide(data) {
      this.show = data;
    },
    async Login() {
      const Email = !Regular.Email().test(this.email);
      const { Warning } = this;
      // 判断是否满足登录要求
      Email ? (Warning.email = true) : (Warning.email = false);
      !this.password ? (Warning.password = true) : (Warning.password = false);
      if (!Email && this.password) {
        const res = await this.Fetch.Login.Login({
          method: "post",
          data: {
            email: this.email,
            password: this.password,
          }
        });
        this.Def.Home.Message({
          res: res.data,
          fun: () => {
            location.href = "/"
          }
        })
      }
    },
  },
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
  background: #ebebeb;
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
    border: solid var(--main-color) 2px;
  }
}

.button {
  outline: none;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.login-box {
  background: var(--tint-color);
  min-height: 100vh;

  .nav {
    height: 100px;
    padding: 30px 2rem;
  }

  .main-box {
    display: flex;
    height: calc(100vh - 200px);
    align-items: center;
  }

  .content {
    width: 1100px;
    height: 450px;
    display: flex;
    margin: 20px auto;
    justify-content: space-between;

    .left {
      width: 60%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .right.password {
      width: 30%;
      padding: 2.7rem 0;
      .vertical();

      >div {
        display: flex;
        margin-bottom: 10px;

        i {
          .vertical();
          cursor: pointer;
        }

        h3 {
          margin-left: 7px;
        }

        +div {
          .vertical();

          input {
            width: 100%;
            margin-top: 10px;
            .inputbox();
          }

          .spanRed();
        }
      }

      button {
        height: 40px;
        background: var(--main-color);
        color: #fff;
        .button();

        +div {
          width: 100%;
          margin-top: 20px;
          text-align: center;
          display: block;

          span {
            .span();
          }
        }
      }
    }
  }
}

.alert {
  border: solid var(--error) 2px !important;
}
</style>
