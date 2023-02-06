<template>
  <transition name="el-fade-in-linear">
    <div class="full-box" v-show="full" @click.self="Ensure('full')">
      <main class="full-main-box">
        <header>
          <span>设置</span>
          <i class="el-icon-close" @click.stop="Ensure('full')" />
        </header>
        <div class="main-box" @click.stop>
          <div class="title-box">
            <span>标题</span>
            <el-input v-model="menu.title" placeholder="请输入内容" />
          </div>
          <div class="abstract-box">
            <span>摘要</span>
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3 }" resize="none" v-model="menu.abridged" />
          </div>
          <div class="cove">
            <span>封面</span>
            <div class="cove-main-box">
              <div class="cove-box" :class="{ yes: menu.image }" @click="Active()">
                <img :src="menu.image" alt="" v-show="menu.image">
                <img src="../../assets/img/covepng.png" alt="" v-show="!menu.image">
                <span>
                  <i class="el-icon-delete" @click.stop="DelImage()" />
                </span>
              </div>
              <el-button plain size="mini" @click.stop="Active()">
                <i class="el-icon-upload2" />
                上传图片
              </el-button>
              <input type="file" ref="file" @change="upload">
            </div>
          </div>
          <div class="path-box">
            <span>路径</span>
            <el-input v-model="menu.id" :disabled="true">
              <template slot="prepend">/article/{{ $store.state.info.alias }}/</template>
            </el-input>
          </div>
          <div class="path-box">
            <span>设置可见</span>
            <el-radio-group v-model="menu.state">
              <el-radio :label="0">全部可见</el-radio>
              <el-radio :label="1">仅我可见</el-radio>
              <el-radio :label="2">粉丝可见</el-radio>
            </el-radio-group>
          </div>
          <Label @fun="fun" :box.sync="teuple" />
        </div>
      </main>
    </div>
  </transition>
</template>
<script>
import Label from '../func/Label';
export default {
  name: "System",
  data() {
    return {
      box: []
    }
  },
  components: { Label },
  props: {
    Ensure: {
      default: ""
    },
    full: {
      default: false
    },
    menu: {},
    teuple: {}
  },
  methods: {
    Active() {
      this.$refs["file"].click();
    },
    fun(data) {
      const { label } = data
      this.$emit("fun", label)
    },
    async upload(e) {
      const files = e.target.files;
      this.Def.UPLOAD({
        file: files[0],
        fun: (res) => {
          this.menu.image = res.data.url
          this.$forceUpdate()
        }
      })
    },
    DelImage() {
      this.menu.image = ''
      this.$forceUpdate()
    },
  }
}
</script>
<style scoped lang="less">
.full-box {
  .full-main-box {
    width: 60%;
    height: 642px;
    background: var(--tint-color);
    border-radius: 5px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    header {
      display: flex;
      font-size: 17px;
      justify-content: space-between;

      i {
        cursor: pointer;
      }
    }

    .main-box {
      display: flex;
      flex-direction: column;
      gap: 10px;

      >div {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      [type="file"] {
        display: none;
      }

      .cove {
        .cove-main-box {
          display: flex;
          gap: 10px;

          /deep/.el-button {
            height: 23%;
            align-self: flex-end;
          }

          .cove-box {
            width: 200px;
            height: 120px;
            background: var(--topic-hover);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            cursor: pointer;
            position: relative;
            overflow: hidden;

            &.yes {
              img {
                width: 100%;
                height: 100%;
              }

              &:hover {
                span {
                  display: flex;
                }
              }
            }

            span {
              display: none;
              position: absolute;
              background: rgba(0, 0, 0, 0.5);
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              align-items: center;
              justify-content: center;

              i {
                color: #fff;
                font-size: 20px;
              }
            }

            img {
              width: 90px;
              height: 90px;
            }

            &:hover {
              border: 1px dashed var(--main-color);
            }
          }

        }
      }
    }
  }
}
</style>