<template>
  <div class="box">
    <div class="boz">
      <h1>404</h1>
    </div>
    <div class="item">
      <!-- <h1>页面被外星人劫走了!</h1> -->
      <h1>未开发页面!</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: 5,
    };
  },
  mounted() {
    document.title = "404"
  }
};
</script>

<style lang="less" scoped>
.box {
  width: 60%;
  height: 60vh;
  display: flex;
  margin: 150px auto;
  justify-content: space-between;

  .boz {
    width: 400px;
    height: 400px;
    background: #409eff;
    border-radius: 10px;
    position: relative;

    h1 {
      color: #fff;
      font-weight: 700;
      font-size: 160px;
      font-style: italic;
      position: absolute;
      top: 90px;
      left: 35px;
    }
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 110px 0;

    h1 {
      font-size: 45px;
    }

    h2 {
      font-size: 40px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>