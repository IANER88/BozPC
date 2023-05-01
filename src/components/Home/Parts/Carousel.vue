<template>
  <div class="carousel-box">
    <el-carousel>
      <el-carousel-item v-for="(item, index) in carousel" :key="index">
        <el-image :src="item.img">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "Carousel",
  data() {
    return {};
  },
  mounted() {
    // setTimeout(() => {
    //   this.Def.Home.Carousel();
    // }, 100);
  },
  props: {
    carousel: [],
  },
};
</script>
<style scoped lang="less">
.carousel-box {
  width: 43.52%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;

  /deep/.el-carousel__item {
    .el-image {
      width: 100%;
      height: 100%;
    }
  }

  .carousel-main-box {
    width: 100%;
    height: 309px;
    display: flex;

    // transition: transform 0.4s ease-in-out;
    .carousel-banner-box {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .carouse-indicator {
    width: 100%;
    height: calc(100% - 309px);
    background: #44bc85;
    display: flex;
    justify-content: space-between;
    padding: 10px;

    .main-content {
    }

    .main-indicator {
      width: 68px;
      height: 28px;
      display: flex;
      justify-content: space-between;

      button {
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 0.1);
        cursor: pointer;

        /deep/svg {
          width: 12px;
          height: 12px;
          color: #fff;
        }
      }
    }
  }
}
</style>
