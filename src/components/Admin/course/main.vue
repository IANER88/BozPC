<template>
  <main id="main-box">
    <header class="button">
      <button @click="add()">添加课程</button>
      <button>修改课程</button>
      <button>删除课程</button>
    </header>
    <div class="box" v-for="item of info" :key="item.id">
      <h4>{{ item.name }}</h4>
      <div class="content">
        <div v-for="hove of item.box" :key="hove.id" @click.right.prevent="Floating(hove.id)">
          <div class="main-box" @click.stop="Link(hove.id)">
            <i v-html="hove.svgImg" />
            <p>
              <span>{{ hove.name }}</span>
              <span>{{ hove.introduce }}</span>
            </p>
          </div>
          <div class="floating-box" v-show="index === hove.id">
            <div @click="del(hove)">删除课程</div>
            <div @click="updata(hove)">修改课程</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  name: "course",
  data() {
    return {
      info: [],
      index: "",
      method: "post",
    };
  },
  async mounted() {
    this.Render()
  },
  methods: {
    Link(id) {
      this.$router.push({
        path: "/admin/course/manage",
        query: {
          id,
        }
      })
    },
    async Render() {
      const { data: { course } } = await this.Fetch.Admin.course.Course({})
      this.info = course
    },
    Floating(id) {
      this.index = id
    },
    add() {
      this.Def.Home.Operate({ options: this.info, ensure: this.ensure })
    },
    async ensure(obj) {
      const { data } = await this.Fetch.Admin.course.Course({
        method: this.method,
        data: obj,
      })
      this.Def.Home.Message({
        res: data,
        message: this.$message,
        fun: () => {
          this.Render()
          // 清空属性值
          Object.keys(obj).forEach(key => (obj[key] = ''));
        }
      })
      return obj
    },
    del(item) {
      this.$confirm(`确认删除 ${item.name} 吗?`, "提示", {
        type: "warning",
      }).then(async _ => {
        const { data } = await this.Fetch.Admin.course.Course({
          method: "delete",
          data: {
            id: item.id,
          }
        })
        this.Def.Home.Message({
          res: data,
          message: this.$message,
          fun: () => {
            this.Render()
          }
        })
      })
    },
    updata(item) {
      this.index = -1
      this.method = "patch"
      this.Def.Home.Operate({
        options: this.info,
        ensure: this.ensure,
        info: item
      })
    }
  }
};
</script>
<style scoped lang="less">
.box {
  padding: 20px;
  display: flex;
  grid-gap: 10px;
  flex-direction: column;
  background: var(--tint-color);

  h4 {
    border-bottom: solid 1px lavender;
    padding-bottom: 20px;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;

    >div {
      position: relative;

      .main-box {
        color: #515151;
        background: #f1f0f0;
        border: solid #f5f5f7 1px;
        padding: 10px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        cursor: pointer;
        grid-gap: 10px;
        height: 100%;
      }

      i {
        display: flex;
        align-items: center;
      }

      /deep/svg {
        width: 40px;
        height: 100%;
      }


      p {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-weight: 700;

        span {
          &:last-child {
            font-size: 10px;
            color: #8a8b99;
          }
        }
      }
    }
  }

  @keyframes disp {
    from {
      opacity: 0;
      transform: rotate3d(-2%);
    }
  }

  .floating-box {
    width: 120px;
    border-radius: 5px;
    position: absolute;
    box-shadow: 0 0 30px rgb(0 0 0 / 10%);
    border: 1px solid var(--tint-two-background);
    background: var(--tint-color);
    padding: 20px 0;
    z-index: 10;
    animation: disp .3s;
    flex-direction: column;
    left: 176px;
    top: -96px;

    >div {
      height: 35px;
      padding: 0 20px;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        background: var(--topic-hover);
        color: var(--main-color);
      }
    }
  }
}
</style>
