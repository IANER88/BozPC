<template>
  <main id="main-box">
    <div class="top-button">
      <button class="shuffling" @click="drawer = true">轮播</button>
      <button class="hot">热点话题</button>
      <button class="top-search">热门搜索</button>
      <button class="frame">框架推荐</button>
      <button class="recommend">文章推荐</button>
    </div>
    <div class="home-box">
      <div class="home-main-box">
        <div>
          <h4>热门搜索可视化</h4>
        </div>
      </div>
      <div class="home-other-box"></div>
    </div>
    <el-drawer title="管理轮播图片" :visible.sync="drawer">
      <div class="header-box">
        <div v-for="(item, index) of shuffling" class="image-box" :key="index">
          <img :src="item.img" alt="">
          <span>
            <i class="el-icon-delete" @click="DelImage(item.id)"></i>
          </span>
        </div>
      </div>
      <div class="content-box">
        <el-button type="primary" @click="upload()" round>上传新的替换</el-button>
        <input ref="file" type="file" multiple name="file" @change="input" accept=".png,.jpg,.jpeg">
        <p>轮播图最多八张图片</p>
      </div>
    </el-drawer>
  </main>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      shuffling: [],
      drawer: false,
    };
  },
  async mounted() {
    const res = await this.Fetch.Home.Home();
    this.shuffling = res.data.slideshow;
  },
  methods: {
    async input(e) {
      const file = e.target.files
      const list = []
      Object.keys(file).map((i) => {
        if (file[i].type.indexOf("image") === 0) {
          list.push(file[i])
        } else {
          this.$message({
            type: "error",
            message: "请上传图片格式!"
          })
        }
      })
      const form = new FormData()
      form.append("home-image", file[0])
      const res = await this.Fetch.Admin.home.image(form)
      console.log(res);
    },
    upload() {
      this.$refs.file.click()
    },
    DelImage(id) {
      console.log(1);
    },
  }
};
</script>
<style scoped lang="less">
#main-box {
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
}

.top-button {
  display: flex;
  height: 120px;
  grid-gap: 10px;
  background: var(--tint-color);
  padding: 20px;
  border: solid 1px var(--tint-solid);

  button {
    border: none;
    border-radius: 8px;
    flex: 1;
    font-size: 20px;
    cursor: pointer;
    color: #fff;

    &.shuffling {
      background: linear-gradient(to top right, #ffd03e, #f6c344);
    }

    &.hot {
      background: linear-gradient(to top right, #6cce7c, #6cce7c);
    }

    &.top-search {
      background: linear-gradient(to top right, #ff8b7e, #ff766e);
    }

    &.frame {
      background: linear-gradient(to top right, #cb92ff, #ba77f7);
    }

    &.recommend {
      background: linear-gradient(to top right, #52bbfe, #409cff);
    }
  }
}

.home-box {
  display: flex;
  background: var(--tint-color);
  padding: 20px;

  .home-main-box {
    width: 70%;
  }
}

/deep/.el-drawer__wrapper {
  .el-drawer {
    width: 50% !important;
  }

  .el-drawer__header {
    padding: 20px;
    margin-bottom: 0;

    >span {
      color: var(--main-color);
      font-weight: bold;
    }
  }

  .el-drawer__body {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    .header-box {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 16px;
      justify-content: space-between;

      .image-box {
        width: 170px;
        height: 100px;
        cursor: pointer;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }

        span {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;

          i {
            font-size: 22px;
            color: #fff;
            cursor: pointer;
            display: none;
          }

          &:hover {
            background: rgba(#000, 0.6);

            i {
              display: block;
            }
          }
        }
      }
    }

    .content-box {
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 20px 0;
      border-top: 1px solid var(--tint-solid);
      grid-gap: 10px;
      align-items: center;

      input {
        display: none;
      }

      .el-button.is-round {
        width: 132px;
      }

      p {
        font-size: 13px;
        color: #606266;
      }
    }
  }
}
</style>
