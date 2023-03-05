<template>
  <div id="course">
    <HomeNav />
    <Nav />
    <router-view />
  </div>
</template>

<script>
import HomeNav from "../Home/Nav";
import Nav from "../Course/Nav";
export default {
  name: "Course",
  mounted() {
    document.title = "课程";
  },
  components: {
    HomeNav,
    Nav,
  },
};
</script>

<style lang="less">
body {
  background: #f5f5f5 !important;
}
html.dark body{
  background: var(--tint-color) !important;
}
.course-right-box {
  margin: 0 20px 0 220px;
  padding: 20px 0;

  .course-top-title {
    background: var(--tint-color);
    height: 120px;
    padding: 20px;
    box-shadow: 0 1px 12px 0 rgba(1, 39, 78, 0.12);
    display: flex;
    flex-direction: column;

    >div {
      height: 70%;
      display: flex;
      flex-direction: column-reverse;

      ul {
        display: flex;
        list-style: none;

        li {
          margin-left: 15px;

          &:first-child {
            margin-left: 0;
          }

          a {
            text-decoration: none;
          }
        }
      }
    }
  }

  .course-top-type {
    display: flex;
    background: var(--tint-color);
    flex-direction: column;
    padding: 10px 20px 20px;
    box-shadow: 0 1px 12px 0 rgba(1, 39, 78, 0.12);
    margin-top: 20px;
    grid-gap: 10px;

    h4 {
      width: 100%;
      line-height: 40px;
      border-bottom: solid 1px var(--tint-solid);
      padding-bottom: 10px;
    }

    .box {
      width: 100%;
      display: grid;
      justify-content: space-between;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;
    }

    div {
      a {
        display: flex;
        text-decoration: none;
        background: var(--topic-hover);
        border: solid 1px var(--tint-solid);
        padding: 10px;
        border-radius: 8px;
        transition: all 0.2s;
        font-weight: 700;
        position: relative;
        cursor: pointer;

        &:hover {
          background: #e4e3e3;
        }

        div {
          width: 100%;
          display: flex;
        }

        svg {
          width: 40px;
          height: 100%;
        }

        p {
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          span {
            display: inline-block;
            line-height: 20px;
            margin-left: 10px;

            &:nth-child(2) {
              color: #8a8b99;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
</style>