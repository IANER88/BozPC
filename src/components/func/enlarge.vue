<template>
  <div class="enlarge-box" @click.self="cacel()" v-if="boolean">
    <div class="box" :style="{ width: `${width}%`, height: `${height}%` }">
      <img :src="image[self]" alt="" draggable="true">
    </div>
    <div class="bottom">
      <div class="change">
        <div class="upper" @click.stop="upper()">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px"
            viewBox="0 0 20 20" version="1.1">
            <g id="left-circle" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="left" fill-rule="nonzero">
                <rect id="矩形" fill="#000000" opacity="0" x="0" y="0" width="20" height="20" />
                <path
                  d="M14.140625,4.26367188 L14.140625,2.75390625 C14.140625,2.62304688 13.9902344,2.55078125 13.8886719,2.63085937 L5.08398438,9.5078125 C4.76367188,9.7578125 4.76367188,10.2402344 5.08398438,10.4902344 L13.8886719,17.3671875 C13.9921875,17.4472656 14.140625,17.375 14.140625,17.2441406 L14.140625,15.734375 C14.140625,15.6386719 14.0957031,15.546875 14.0214844,15.4882813 L6.99023438,10 L14.0214844,4.50976563 C14.0957031,4.45117188 14.140625,4.359375 14.140625,4.26367188 Z"
                  id="路径" fill="#FFFFFF" />
              </g>
            </g>
          </svg>
        </div>
        <div class="number">
          <span>{{ self + 1 }}</span>
          <span>/</span>
          <span>{{ image.length }}</span>
        </div>
        <div class="nexl" @click.stop="nexl()">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px"
            viewBox="0 0 20 20" version="1.1">
            <g id="right-circle" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="right" fill-rule="nonzero">
                <rect id="矩形" fill="#000000" opacity="0" x="0" y="0" width="20" height="20" />
                <path
                  d="M14.9550781,9.5078125 L6.15039062,2.63085937 C6.046875,2.55078125 5.8984375,2.62304687 5.8984375,2.75390625 L5.8984375,4.26367188 C5.8984375,4.359375 5.94335938,4.45117188 6.01757812,4.50976562 L13.0488281,10 L6.01757812,15.4902344 C5.94140625,15.5488281 5.8984375,15.640625 5.8984375,15.7363281 L5.8984375,17.2460938 C5.8984375,17.3769531 6.04882812,17.4492188 6.15039062,17.3691406 L14.9550781,10.4921875 C15.2753906,10.2421875 15.2753906,9.7578125 14.9550781,9.5078125 Z"
                  id="路径" fill="#FFFFFF" />
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div class="zoo">
        <div class="magnify" @click.stop="minus()">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px"
            viewBox="0 0 20 20" version="1.1">
            <g id="zoom-out" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g fill-rule="nonzero">
                <rect id="矩形" fill="#000000" opacity="0" x="0" y="0" width="20" height="20" />
                <path
                  d="M12.4414063,8.65234375 L6.34765625,8.65234375 C6.26171875,8.65234375 6.19140625,8.72265625 6.19140625,8.80859375 L6.19140625,9.98046875 C6.19140625,10.0664063 6.26171875,10.1367188 6.34765625,10.1367188 L12.4414063,10.1367188 C12.5273437,10.1367188 12.5976563,10.0664063 12.5976563,9.98046875 L12.5976563,8.80859375 C12.5976563,8.72265625 12.5273437,8.65234375 12.4414063,8.65234375 Z M17.9882813,16.9335938 L15.1367188,14.0820313 C17.5214844,11.1738281 17.3554688,6.86523438 14.6289063,4.140625 C11.7382813,1.24804688 7.04296875,1.24804688 4.140625,4.140625 C1.24804688,7.04296875 1.24804688,11.7382813 4.140625,14.6289063 C6.86523438,17.3554688 11.1738281,17.5214844 14.0820313,15.1367188 L16.9335938,17.9882813 C16.9960938,18.0429688 17.0957031,18.0429688 17.1484375,17.9882813 L17.9882813,17.1484375 C18.0429688,17.0957031 18.0429688,16.9960938 17.9882813,16.9335938 Z M13.59375,13.59375 C11.2734375,15.9121094 7.515625,15.9121094 5.1953125,13.59375 C2.87695313,11.2734375 2.87695313,7.515625 5.1953125,5.1953125 C7.515625,2.87695313 11.2734375,2.87695313 13.59375,5.1953125 C15.9121094,7.515625 15.9121094,11.2734375 13.59375,13.59375 Z"
                  id="形状" fill="#FFFFFF" />
              </g>
            </g>
          </svg>
        </div>
        <div class="narrow" @click.stop="magnify()">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px"
            viewBox="0 0 20 20" version="1.1">
            <g id="zoom-in" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g fill-rule="nonzero">
                <rect id="矩形" fill="#000000" opacity="0" x="0" y="0" width="20" height="20" />
                <path
                  d="M12.4414063,8.65234375 L10.1367188,8.65234375 L10.1367188,6.03515625 C10.1367188,5.94921875 10.0664063,5.87890625 9.98046875,5.87890625 L8.80859375,5.87890625 C8.72265625,5.87890625 8.65234375,5.94921875 8.65234375,6.03515625 L8.65234375,8.65234375 L6.34765625,8.65234375 C6.26171875,8.65234375 6.19140625,8.72265625 6.19140625,8.80859375 L6.19140625,9.98046875 C6.19140625,10.0664063 6.26171875,10.1367188 6.34765625,10.1367188 L8.65234375,10.1367188 L8.65234375,12.7539063 C8.65234375,12.8398437 8.72265625,12.9101563 8.80859375,12.9101563 L9.98046875,12.9101563 C10.0664063,12.9101563 10.1367188,12.8398437 10.1367188,12.7539063 L10.1367188,10.1367188 L12.4414063,10.1367188 C12.5273437,10.1367188 12.5976563,10.0664063 12.5976563,9.98046875 L12.5976563,8.80859375 C12.5976563,8.72265625 12.5273437,8.65234375 12.4414063,8.65234375 Z M17.9882813,16.9335938 L15.1367188,14.0820313 C17.5214844,11.1738281 17.3554688,6.86523438 14.6289063,4.140625 C11.7382813,1.24804688 7.04296875,1.24804688 4.140625,4.140625 C1.24804688,7.04296875 1.24804688,11.7382813 4.140625,14.6289063 C6.86523438,17.3554688 11.1738281,17.5214844 14.0820313,15.1367188 L16.9335938,17.9882813 C16.9960938,18.0429688 17.0957031,18.0429688 17.1484375,17.9882813 L17.9882813,17.1484375 C18.0429688,17.0957031 18.0429688,16.9960938 17.9882813,16.9335938 Z M13.59375,13.59375 C11.2734375,15.9121094 7.515625,15.9121094 5.1953125,13.59375 C2.87695313,11.2734375 2.87695313,7.515625 5.1953125,5.1953125 C7.515625,2.87695313 11.2734375,2.87695313 13.59375,5.1953125 C15.9121094,7.515625 15.9121094,11.2734375 13.59375,13.59375 Z"
                  id="形状" fill="#FFFFFF" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div class="cacel" @click.stop="cacel()">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="48px"
        viewBox="0 0 48 48" version="1.1">
        <g id="close-hover" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <rect id="矩形" fill="#8C8C8C" opacity="0.5" x="0" y="0" width="48" height="48" rx="4" />
          <rect id="矩形" x="10" y="10" width="28" height="28" />
          <rect id="矩形" fill="#FFFFFF"
            transform="translate(24.049858, 24.059517) rotate(45.000000) translate(-24.049858, -24.059517) "
            x="22.956108" y="9.51264205" width="2.1875" height="29.09375" rx="1.09375" />
          <rect id="矩形" fill="#FFFFFF"
            transform="translate(24.049858, 24.059517) scale(-1, 1) rotate(45.000000) translate(-24.049858, -24.059517) "
            x="22.956108" y="9.51264205" width="2.1875" height="29.09375" rx="1.09375" />
        </g>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Enlarge',
  data() {
    return {
      image: [{
        src: ""
      }],
      width: 70,
      height: 80,
      self: "",
      boolean: true,
    }
  },
  mounted() {
    this.Def.scroll()
  },
  methods: {
    cacel() {
      this.Def.scroll().Remove(".enlarge-box")
    },
    magnify() {
      this.width += 10
      this.height += 10
    },
    minus() {
      if (this.width > 30) {
        this.width -= 10
        this.height -= 10
      }
    },
    upper() {
      // 如果为第一张就返回最后一张
      if (this.self === 0) {
        this.self = this.image.length - 1
      } else {
        this.self--
      }
    },
    nexl() {
      // 如果为第最后一张就返回第一一张
      if (this.self + 1 === this.image.length) {
        this.self = 0
      } else {
        this.self++
      }
    },
  }
}
</script>
<style scoped lang="less">
@keyframes display {
  to {
    opacity: 1;
  }

  from {
    opacity: 0;
  }
}

.enlarge-box {
  position: fixed;
  background: rgba(0, 0, 0, .8);
  height: 100vh;
  bottom: 0;
  display: flex;
  left: 0;
  right: 0;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  animation: display .3s;

  &:hover {
    cursor: zoom-out;
  }

  .box {
    transition: all .2s;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .cacel {
    top: 50px;
    position: fixed;
    right: 50px;
    cursor: pointer;
  }

  .bottom {
    height: 50px;
    position: fixed;
    background: rgba(0, 0, 0, .9);
    border-radius: 5px;
    bottom: 20px;
    display: flex;
    align-items: center;
    padding: 15px;
    box-sizing: border-box;

    .change,
    .zoo {
      display: flex;
      gap: 5px;
    }

    .number {
      display: flex;
      justify-content: center;
      gap: 5px;
      align-items: center;
      color: #d9d9d9;
    }

    .change::after {
      content: '';
      height: 100%;
      display: flex;
      width: 1px;
      background: #d9d9d9;
    }

    /deep/svg,
    /deep/path {
      fill: #d9d9d9;
    }

    .nexl,
    .upper,
    .zoo>div {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #333;
      cursor: pointer;
    }
  }
}
</style>