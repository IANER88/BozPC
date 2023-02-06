<template>
  <footer class="footer-box">
    <div class="footer-cente-box">
      <div class="footer-left-box">
        <div class="left-top">
          <ul>
            <li><a href="">关于我们</a></li>
            <li><a href="">更新日志</a></li>
            <li><a href="">反馈建议</a></li>
            <li><a href="">在线客服</a></li>
            <li><a href="">在线问题</a></li>
            <li><a href="">帮助中心</a></li>
            <li><a href="">侵权投诉</a></li>
          </ul>
        </div>
        <!-- 审查 -->
        <div class="left-cente">@Jayluminj@163.com 杰伊所有</div>
        <div class="left-bottom">桂ICP备2022006380号</div>
      </div>
      <div class="footer-right-box">
        <div class="right-icon">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="less" scoped>
.footer-box {
  width: 100%;
  height: 240px;
  background: #333333;
  margin-top: 40px;
  .footer-cente-box {
    width: 1380px;
    margin: 0 auto;
    display: flex;
    padding: 20px 0;
    justify-content: space-between;
    .footer-left-box {
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .left-top {
        justify-content: space-between;
        ul {
          width: 100%;
          display: flex;
          justify-content: space-between;
          list-style: none;
          a {
            color: #7f7f7f;
            text-decoration: none;
          }
        }
      }
      div {
        height: 25%;
        line-height: 50px;
        color: #7f7f7f;
        display: flex;
      }
    }
    .footer-right-box {
      width: 30%;
      display: flex;
      flex-direction: column;
      div {
        height: 30%;
        display: flex;
        justify-content: space-around;
        span {
          display: inline-block;
          width: 50px;
          height: 50px;
          background: #515151;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>