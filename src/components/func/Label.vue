<template>
  <div class="label-box">
    <span>{{ title }}</span>
    <div class="label-button-box">
      <el-tag v-for="(item, index) of font" :key="index">
        {{ item.name }}<i class="el-icon-close" @click="Label(item)" />
      </el-tag>
      <button @click="label.show = !label.show">
        <i class="el-icon-plus" />
        添加{{ title }}
      </button>
    </div>
    <div class="label-main-box" v-show="label.show">
      <el-autocomplete v-model="search" :fetch-suggestions="Search" placeholder="请输入内容" @select="Label" />
      <div class="label-bottom">
        <div class="label-left">
          <div v-for="(item, index) in info" :key="index" class="item" @click="Event(item.id)">
            {{ item.name }}
          </div>
        </div>
        <div class="label-right">
          <div class="label-content">
            <span>添加标签</span>
            <div class="label-main-content">
              <div v-for="(item, index) in huang" :key="index" class="item"
                :class="{ activa: label.info.includes(item.id) }" @click="Label(item)">
                {{ item.name }}
              </div>
            </div>
          </div>
          <p v-if="font.length >= 5">最多添加5个标签</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Label',
  data() {
    return {
      huang: [],
      info: "",
      label: {
        info: [],
        show: false,
        add: [],
        remove: []
      },
      search: "",
      teuple: [],
      font: this.box
    }
  },
  async mounted() {
    const res = await this.Fetch.Release.Tag({});
    this.info = res.data;
    this.font = this.box
    this.Xuan(true)
  },
  props: {
    box: {

    },
    title: {
      default: "标签"
    }
  },
  methods: {
    Xuan(boolean = false) {
      if (this.font.length === 0) { this.label.info = []; return };
      for (const h of this.font) {
        if (!this.label.info.includes(h.id)) {
          this.label.info.push(h.id)
          boolean && this.teuple.push(h.id)
        } else {
          this.label.info = this.label.info.filter(item => item === h.id)
        }
      }
    },
    Label(item) {
      if (this.label.info.includes(item.id)) {
        this.font = this.font.filter(hove => hove.id != item.id);
        this.Xuan()
        if (this.teuple.includes(item.id)) {
          this.label.remove.push(item.id)
        } else {
          this.label.add = this.label.add.filter(hove => hove !== item.id)
        }
      } else {
        if (this.font.length <= 4 && !this.label.info.includes(item.id)) {
          this.font.push(item)
          this.Xuan()
        }
        if (!this.teuple.includes(item.id)) {
          this.label.add.push(item.id)
        } else {
          this.label.remove = this.label.remove.filter(hove => hove !== item.id)
        }
      }
      this.label.box = this.box
      this.$emit("fun", {
        label: this.label
      })
    },
    Event(id) {
      this.info.forEach((item) => {
        if (id === item.id) {
          this.huang = item.tag;
        }
      });
    },
    async Search(search, cd) {
      if (search.trim()) {
        const res = await this.Fetch.Release.Tag({
          search,
          method: "put"
        })
        // 处理数据
        cd(res.data.info.map(item => {
          item.value = item.name
          return item
        }))
      }
    }
  },
  watch: {
    font(news, olds) {
      this.$emit("fun:box", news)
    }
  }
}
</script>
<style scoped lang="less">
/deep/.el-input{
  width: 100% !important;
}
.label-box {
  display: flex;
  margin-bottom: 20px;
  position: relative;

  .label-button-box {
    display: flex;
    gap: 5px;

    /deep/.el-tag {
      display: flex;
      align-items: center;

      i {
        display: flex;
        height: 100%;
        align-items: center;
        position: relative;
        top: 2px;
      }
    }
  }

  button {
    width: 100px;
    padding: 5px;
    border: 1px solid var(--tint-solid);
    background: none;
    cursor: pointer;
  }

  .label-main-box {
    display: flex;
    flex-direction: column;
    width: 563px;
    height: 355px;
    background: #fff;
    position: absolute;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #e3e3e3;
    top: -328px;
    left: 0;
    padding: 20px;
    display: flex;

    h4 {
      border-bottom: 1px solid #e8e8ee;
      padding: 10px 0;
      text-align: center;
    }

    input {
      height: 35px;
      padding: 15px 10px;
      border: 1px solid #e8e8ee;
      outline: none;
      border-radius: 3px;
    }

    .label-bottom {
      padding-top: 20px;
      display: flex;
      height: 310px;
      overflow: hidden;

      .label-left {
        display: flex;
        height: 225px;
        flex-direction: column;
        width: 161px;
        overflow-x: auto;

        &::-webkit-scrollbar {
          /*高宽分别对应横竖滚动条的尺寸*/
          width: 4px;
          height: 40px;
          border-radius: 30px;
          background-color: #eaecef;
        }

        &::-webkit-scrollbar-thumb {
          background: #e8eaeb;
        }

        .item {
          color: #777888;
          padding: 0 16px;
          line-height: 30px;
          margin: 3px 0;
          font-size: 14px;
          cursor: pointer;

          &:hover {
            color: #409eff;
          }
        }
      }

      .label-right {
        width: 402px;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        span {
          width: auto;
          font-size: 14px;
          color: #222226;
        }

        .label-content {
          height: 87%;
          display: flex;
          gap: 10px;
          flex-direction: column;

          .label-main-content {
            overflow-x: auto;
            height: 100%;

            &::-webkit-scrollbar {
              /*高宽分别对应横竖滚动条的尺寸*/
              width: 0;
            }

            &::-webkit-scrollbar-thumb {
              background: none;
            }
          }

          .item {
            color: #507999;
            background: #ebf2f7;
            height: 24px;
            font-size: 13px;
            padding: 5px 10px;
            border-radius: 3px;
            text-align: center;
            line-height: 15px;
            float: left;
            margin: 0 15px 10px 0;
            cursor: pointer;
          }

          .activa {
            color: #fff;
            background: #507999;
          }
        }

        p {
          font-size: 10px;
          color: #e70b0b;
          text-align: right;
          padding: 2px;
        }
      }
    }
  }
}
</style>