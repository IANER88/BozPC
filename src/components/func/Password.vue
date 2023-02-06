<template>
  <transition name="el-fade-in-linear">
    <main id="password-box" class="full-box">
      <div class="password-main-box" @click.stop>
        <header>
          <span>设置密码</span>
          <i class="el-icon-close" />
        </header>
        <div class="password-content-box">
          <el-input v-model.trim="info.olds" :class="{ error: error.olds }" type="password" placeholder="输入密码" />
          <p>{{ error.span }}</p>
          <el-input v-model.trim="info.news" :class="{ error: error.news }" type="password" placeholder="再次输入密码" />
        </div>
        <div class="password-bottom-box">
          <el-button type="primary" size="small" @click="submit()">设置密码</el-button>
        </div>
      </div>
    </main>
  </transition>
</template>
<script>
import Regular from '@/assets/js/regular'
export default {
  name: 'Password',
  data() {
    return {
      info: {
        olds: "",
        news: ""
      },
      error: {
        olds: false,
        news: false,
        span: ""
      }
    }
  },
  mounted() {
    this.Def.scroll()
  },
  methods: {
    async submit() {
      this.error.olds = !this.info.olds ? true : false
      this.error.news = !this.info.news ? true : false
      const { olds, news } = this.info
      if (olds && news) {
        const Reg = Regular.Password
        if (!Reg.test(olds) && !Reg.test(news)) {
          this.error = {
            span: "密码必须包含大小写字母和数字，最少8个字符",
            olds: true,
            news: true
          }
        } else if (olds !== news) {
          this.error = {
            span: "两次密码不一致",
            olds: true,
            news: true
          }
        } else {
          this.error = {
            span: "",
            olds: false,
            news: false
          }
          const { data } = await this.Fetch.Space.Manage({
            method: "put",
            data:{
              password: this.info.news,
            }
          })
          this.Def.Home.Message({
            res: data,
            fun: () => {
              this.Def.Remove("main#password-box").scroll()
            }
          })
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.password-main-box {
  width: 520px;
  height: 285px;
  flex-direction: column;
  justify-content: space-between;

  header {
    width: 100%;
    display: flex;
    justify-content: space-between;

    i {
      font-size: 18px;
      cursor: pointer;
    }
  }

  .password-content-box {
    display: flex;
    flex-direction: column;

    p {
      height: 30px;
      color: var(--error);
      line-height: 30px;
      font-size: 13px;
    }

    /deep/.el-input {
      width: 60%;
    }
  }
}
</style>