<template>
  <div class="account-major-box">
    <div class="name">
      <span>昵称</span>
      <el-input v-model="info.name" />
    </div>
    <div class="introduction">
      <span>简介</span>
      <el-input type="textarea" autosize show-word-limit v-model="info.introduce" maxlength="255" />
    </div>
    <div class="address">
      <span>住址</span>
      <el-input v-model="info.address" />
    </div>
    <div class="field" v-if="tag">
      <Label @fun="fun" :box.sync="teuple" title="领域" />
    </div>
    <div class="avatar">
      <span>头像</span>
      <div class="avatar-main-box">
        <div class="avatar-box" @click="File()">
          <img :src="info.avatar" alt="" />
          <i class="el-icon-upload2" />
        </div>
        <el-button size="mini" @click="File()">
          <i class="el-icon-upload2" />
          上传图片
        </el-button>
        <input type="file" ref="file" @change="upload" accept=".jpg,.png">
      </div>
    </div>
    <div class="submit" v-if="day">
      <el-button size="medium" plain @click.stop="Submit()">更新信息</el-button>
    </div>
  </div>
</template>
<script>
import Label from "@/components/func/Label.vue"
export default {
  name: 'Info',
  data() {
    return {
      filed: {
        add: [],
        remove: [],
        box: []
      },
    }
  },
  props: {
    info: {
      name: "",
      introduce: "",
      address: "",
      avatar: "",
      label: {}
    },
    boolean: {

    },
    day: {
      default: true,
    },
    tag: {
      default: true,
    },
    teuple: {

    }
  },
  components: { Label },
  methods: {
    upload(e) {
      this.Def.UPLOAD({
        type: "avatar",
        file: e.target.files[0],
        fun: (res) => {
          console.log(res);
          this.info.avatar = res.data.url
        }
      })
    },
    fun(data) {
      const { label } = data
      this.filed = label
    },
    File() {
      this.$refs['file'].click()
    },
    async Submit() {
      const { data } = await this.Fetch.Account({
        method: "patch",
        alias: this.$route.params.name,
        data: {
          info: this.info,
          time: new Date().toLocaleString(),
          filed: {
            add: this.filed.add,
            remove: this.filed.remove,
            box: this.filed.box,
          }
        },
      })
      this.Def.Home.Message({
        res: data,
        fun: () => {
          this.boolean()
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.account-major-box {
  >div {
    padding: 10px;
  }

  [type="file"] {
    display: none;
  }

  >div:not(.account-title-box) {
    display: flex;
    flex-direction: column;
    gap: 10px;

    /deep/.el-input,
    /deep/.el-textarea {
      width: 40%;
    }
  }

  .field {

    .label-box {
      flex-direction: column;
      gap: 10px;
      margin-bottom: 0;
    }
  }

  .avatar {
    .avatar-main-box {
      display: flex;
      gap: 10px;

      .avatar-box {
        position: relative;
        border-radius: 50%;
        overflow: hidden;
        width: 56px;
        height: 56px;
        cursor: pointer;
        border: 1px dotted none;

        &:hover {
          i {
            display: flex;
            background: rgba(0, 0, 0, .6);
          }

          border: 1px dotted var(--main-color);
        }

        i {
          display: none;
          align-items: center;
          height: 100%;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          justify-content: center;
          position: absolute;
          color: #fff;
        }
      }

      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
      }

      /deep/.el-button {
        height: 100%;
        align-self: flex-end;
      }
    }
  }

  .submit {
    /deep/.el-button {
      width: 100px;
    }
  }
}
</style>