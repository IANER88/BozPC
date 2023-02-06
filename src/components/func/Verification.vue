<template>
  <transition name="el-fade-in-linear">
    <main id="verification-box" class="full-box" v-if="boolean" @click.self="close()">
      <div class="verification-main-box" @click.stop>
        <header>
          <span>身份验证</span>
          <i class="el-icon-close" @click="close()" />
        </header>
        <div class="verification-contentt-box">
          <p>为了你的账户安全，请验证身份，验证成功后进行下一步操作。</p>
          <div class="verification-select-box">
            <el-input placeholder="请输入内容" :value="store.state.info.email" :disabled="true" />
          </div>
          <div class="verification-code-box">
            <div class="code-box">
              <el-input v-model="enroll" placeholder="6位邮箱验证码" :class="{ error }" />
            </div>
            <div class="button-box">
              <el-button @click="Enroll()" :disabled="init.name">{{ init.title }}</el-button>
            </div>
          </div>
        </div>
        <div class="verification-buttom-box">
          <el-button size="small" @click="close()">取消</el-button>
          <el-button size="small" type="primary" @click="Submit()">验证</el-button>
        </div>
      </div>
    </main>
  </transition>
</template>
<script>
import store from '@/assets/js/Store'
export default {
  name: 'Verification',
  data() {
    return {
      boolean: true,
      enroll: "",
      error: false,
      store,
      init: {
        title: "获取验证码",
        name: false
      }
    }
  },
  mounted() {
    this.Def.scroll()
  },
  methods: {
    async Submit() {
      this.error = !this.enroll ? true : false
      if (this.enroll) {
        const { data } = await this.Fetch.Space.Manage({
          method: "post",
          data: {
            effect: "身份验证",
            enroll: this.enroll
          }
        })
        this.Def.Home.Message({
          res: data,
          fun: () => {
            this.close()
            switch (this._data.obj.title) {
              case "邮箱":
                this.Def.Space.Email(this._data.obj)
                break
              case "密码":
                this.Def.Space.Password({ })
                break
              case "个人路径":
                break
            }
          }
        })
      }
    },
    Enroll() {
      this.Def.Enroll({
        init: this.init,
        effect: "身份验证",
        boolean: false
      })
    },
    close() {
      this.boolean = false
      this.Def.scroll()
    }
  }
}
</script>
<style scoped lang="less">
#verification-box {
  .verification-main-box {
    background: var(--tint-color);
    width: 520px;
    height: 373px;
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

    .verification-contentt-box {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .verification-select-box {
        width: 328.4px;
      }

      .verification-code-box {
        display: flex;
        gap: 10px;
      }
    }

    .verification-buttom-box {
      width: 100%;
      padding-top: 10px;
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid var(--tint-solid);
    }
  }
}
</style>