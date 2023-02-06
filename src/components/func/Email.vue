<template>
  <transition name="el-fade-in-linear">
    <main id="email-box" class="full-box" @click.self="close()">
      <div class="email-main-box" @click.stop>
        <header>
          <span>更改邮箱账号</span>
          <i class="el-icon-close" />
        </header>
        <div class="email-contentt-box">
          <div class="email-select-box">
            <el-input placeholder="新的邮箱账号" v-model="email" :class="{ error: init.email }" />
          </div>
          <div class="email-code-box">
            <div class="code-box">
              <el-input v-model="enroll" placeholder="6位邮箱验证码" :class="{ error: init.make }" />
            </div>
            <div class="button-box">
              <el-button @click="Enroll()" :disabled="init.name">{{ init.title }}</el-button>
            </div>
          </div>
        </div>
        <div class="email-buttom-box">
          <el-button size="small" @click="close()">取消</el-button>
          <el-button size="small" type="primary" @click="Submit()">确认</el-button>
        </div>
      </div>
    </main>
  </transition>
</template>
<script>
import Def from '@/assets/js/Def'
export default {
  name: 'Email',
  data() {
    return {
      email: "",
      enroll: "",
      boolean: true,
      init: {
        email: false,
        make: false,
        title: "获取验证码",
        name: false
      }
    }
  },
  mounted() {
    Def.scroll()
  },
  methods: {
    async Submit() {
      this.init.make = !this.enroll ? true : false
      this.init.email = !this.email ? true : false
      if (this.email && this.enroll) {
        const { data } = await this.Fetch.Space.Manage({
          method: "patch",
          data: {
            effect: "更改邮箱",
            email: this.email,
            enroll:this.enroll
          }
        })
        this.Def.Home.Message({
          res: data,
          fun: () => {
            this.close()
          }
        })
      }
    },
    Enroll() {
      this.init.email = !this.email ? true : false
      if (this.email) {
        this.Def.Enroll({
          email: this.email,
          effect: "更改邮箱",
          init: this.init
        })
      }
    },
    close() {
      this.Def.Remove("main#email-box").scroll()
    }
  }
}
</script>
<style scoped lang="less">
#email-box {

  .email-main-box {
    background: var(--tint-color);
    width: 520px;
    height: 285px;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    header {
      display: flex;
      justify-content: space-between;

      i {
        font-size: 18px;
        cursor: pointer;
      }
    }

    .email-contentt-box {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .email-select-box {
        width: 328.4px;
      }

      .email-code-box {
        display: flex;
        gap: 10px;
      }
    }

    .email-buttom-box {
      width: 100%;
      padding-top: 10px;
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid var(--tint-solid);
    }
  }
}
</style>