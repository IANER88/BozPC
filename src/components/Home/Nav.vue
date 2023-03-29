<template>
  <nav class="base">
    <div :class="{ navs: true, top: hide }">
      <div class="info">
        <Logo title="Bozhan" />
        <div class="nav">
          <ul>
            <li><a href="/course">教程</a></li>
            <li><a href="">开源</a></li>
            <li><a href="knowledge">知识库</a></li>
            <li><a href="">学语言</a></li>
            <li><a href="">工具</a></li>
            <li>
              <a href="/download"> <i v-html="Icon.Home.download" />移动端 </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="search" v-if="boolean">
        <div :class="{ form: true, focus: focus }">
          <input
            type="text"
            placeholder="输入想搜的..."
            @focus="Focus()"
            @blur="blur && Blur()"
            v-model="searchBox.search"
            @keyup.enter="Search(searchBox.search)"
          />
          <button @click.stop="Search(searchBox.search)">搜索</button>
        </div>
        <div :class="{ 'search-panel': true, active: hide }">
          <div
            class="history-box"
            v-show="!searchBox.search || !searchBox.results.length"
          >
            <!-- 历史搜索 -->
            <div class="search-history" v-show="searchHistory.topic.length">
              <div class="title">
                <h4>搜索历史</h4>
                <span @click.stop="empty()">清空</span>
              </div>
              <div class="box">
                <div
                  class="item"
                  v-for="(item, index) of searchHistory.topic"
                  :key="index"
                >
                  <span @click.stop="Search(item)">{{ item }}</span>
                  <i v-html="Icon.Home.del" @click.stop="del(item)" />
                </div>
              </div>
            </div>
            <!-- 热搜 -->
            <div class="top-search">
              <div class="top-serch-header">
                <h5>Bozhan热搜</h5>
              </div>
              <div class="top-serch-box">
                <div
                  class="top-serch-main"
                  v-for="(item, index) of TopSerch"
                  :key="index"
                >
                  <div class="topic" v-for="haver of item" :key="haver.id">
                    <div
                      class="topic-main-box"
                      @click.stop="Search(haver.topic)"
                    >
                      <i :class="`item-${haver.int}`">{{ haver.int }}</i>
                      <p>{{ haver.topic }}</p>
                    </div>
                    <span class="new" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="trie-box"
            v-show="searchBox.search && searchBox.results.length"
          >
            <div
              class="topic"
              v-for="(item, index) of searchBox.results"
              :key="index"
              v-html="item.xinde ? item.xinde : item.text"
              @click="Search(item.text)"
            />
          </div>
        </div>
      </div>
      <div :class="{ create: true, noLogin: !$store.state.info.name }">
        <div class="popover" v-if="$store.state.info.name">
          <a :href="`/space/${$store.state.info.alias}`" class="avatar">
            <img
              :src="$store.state.info.avatar"
              :class="{ onhover: popover }"
            />
          </a>
          <transition name="el-fade-in-linear">
            <div class="popover-box" v-show="popover">
              <div class="avatar-box">
                <h3>{{ $store.state.info.name }}</h3>
              </div>
              <div class="item-box">
                <a :href="Link('follower')">
                  <h4>{{ $store.state.info.follower }}</h4>
                  <span>关注</span>
                </a>
                <a :href="Link('fan')">
                  <h4>{{ $store.state.info.fan }}</h4>
                  <span>粉丝</span>
                </a>
                <a :href="Link('dynamic')">
                  <h4>{{ $store.state.info.dynamic }}</h4>
                  <span>动态</span>
                </a>
              </div>
              <div class="links-item">
                <a :href="Link(item.path)" v-for="item of link" :key="item.id">
                  <div class="left">
                    <i v-html="item.svgImg" />
                    <span>{{ item.title }}</span>
                  </div>
                  <i>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 9 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="link-icon--right"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.50588 3.40623C7.40825 3.3086 7.24996 3.3086 7.15232 3.40623L4.41244 6.14612L1.67255 3.40623C1.57491 3.3086 1.41662 3.3086 1.31899 3.40623C1.22136 3.50386 1.22136 3.66215 1.31899 3.75978L4.11781 6.5586C4.28053 6.72132 4.54434 6.72132 4.70706 6.5586L7.50588 3.75978C7.60351 3.66215 7.60351 3.50386 7.50588 3.40623Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M7.15232 3.40623L7.50588 3.75978L7.50588 3.75978L7.15232 3.40623ZM7.50588 3.40623L7.15232 3.75978L7.15233 3.75978L7.50588 3.40623ZM4.41244 6.14612L4.05888 6.49967C4.15265 6.59344 4.27983 6.64612 4.41244 6.64612C4.54504 6.64612 4.67222 6.59344 4.76599 6.49967L4.41244 6.14612ZM1.67255 3.40623L2.0261 3.05268L2.0261 3.05268L1.67255 3.40623ZM1.31899 3.40623L0.965439 3.05268L0.965439 3.05268L1.31899 3.40623ZM1.31899 3.75978L1.67255 3.40623V3.40623L1.31899 3.75978ZM4.11781 6.5586L3.76425 6.91215L4.11781 6.5586ZM4.70706 6.5586L4.35351 6.20505L4.70706 6.5586ZM7.50588 3.75978L7.15233 3.40623L7.15232 3.40623L7.50588 3.75978ZM7.50588 3.75978C7.40825 3.85742 7.24996 3.85742 7.15232 3.75978L7.85943 3.05268C7.56654 2.75978 7.09166 2.75978 6.79877 3.05268L7.50588 3.75978ZM4.76599 6.49967L7.50588 3.75978L6.79877 3.05268L4.05888 5.79257L4.76599 6.49967ZM1.31899 3.75978L4.05888 6.49967L4.76599 5.79257L2.0261 3.05268L1.31899 3.75978ZM1.67254 3.75979C1.57491 3.85742 1.41662 3.85742 1.31899 3.75979L2.0261 3.05268C1.73321 2.75978 1.25833 2.75978 0.965439 3.05268L1.67254 3.75979ZM1.67255 3.40623C1.77018 3.50386 1.77018 3.66215 1.67255 3.75978L0.965439 3.05268C0.672546 3.34557 0.672546 3.82044 0.965439 4.11334L1.67255 3.40623ZM4.47136 6.20505L1.67255 3.40623L0.965439 4.11334L3.76425 6.91215L4.47136 6.20505ZM4.35351 6.20505C4.38605 6.1725 4.43882 6.1725 4.47136 6.20505L3.76425 6.91215C4.12223 7.27013 4.70264 7.27013 5.06062 6.91215L4.35351 6.20505ZM7.15232 3.40623L4.35351 6.20505L5.06062 6.91215L7.85943 4.11334L7.15232 3.40623ZM7.15233 3.75978C7.05469 3.66215 7.05469 3.50386 7.15233 3.40623L7.85943 4.11334C8.15233 3.82045 8.15233 3.34557 7.85943 3.05268L7.15233 3.75978Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </i>
                </a>
              </div>
              <div class="logout-box" @click="Log()">
                <i>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="link-icon"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.6137 9.30115C17.6932 9.10837 17.6932 8.89282 17.6137 8.70004C17.5743 8.60393 17.5165 8.51726 17.4443 8.44504L15.2221 6.22282C14.9148 5.9156 14.4176 5.91615 14.111 6.22282C13.8043 6.52948 13.8037 7.02671 14.111 7.33393L14.9921 8.21504L7.99985 8.21504C7.56596 8.21448 7.21429 8.56615 7.21429 9.00059C7.21429 9.21726 7.30207 9.41393 7.44429 9.55615C7.58651 9.69837 7.78318 9.78615 7.99985 9.78615L14.9921 9.78615L14.111 10.6673C13.8043 10.9739 13.8037 11.4712 14.111 11.7784C14.4182 12.0856 14.9154 12.085 15.2221 11.7784L17.4443 9.55615C17.5165 9.48393 17.5743 9.39726 17.6137 9.30115"
                      fill="var(--text2)"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.8889 5.11111C9.74127 2.96349 6.25873 2.96349 4.11111 5.11111C1.96349 7.25873 1.96349 10.7413 4.11111 12.8889C6.25873 15.0365 9.74127 15.0365 11.8889 12.8889C12.1957 12.5821 12.6932 12.5821 13 12.8889C13.3068 13.1957 13.3068 13.6932 13 14C10.2387 16.7613 5.76127 16.7613 3 14C0.238731 11.2387 0.23873 6.76127 3 4C5.76127 1.23873 10.2387 1.23873 13 4C13.3068 4.30683 13.3068 4.80429 13 5.11111C12.6932 5.41794 12.1957 5.41794 11.8889 5.11111Z"
                      fill="var(--text2)"
                    ></path>
                  </svg>
                </i>
                <span>退出登录</span>
              </div>
            </div>
          </transition>
        </div>
        <div class="create-box">
          <ul>
            <li v-if="!$store.state.info.name">
              <a href="/login">登录/注册</a>
            </li>
            <li class="message-box">
              <a href="/message/reply">消息</a>
              <Badge :value="Count" v-if="Count !== 0 && Count" />
              <transition name="el-fade-in">
                <div class="v-popover" v-show="boxBoole.message">
                  <main class="main-box">
                    <div class="item" v-for="(item, index) of box" :key="index">
                      <a :href="item.path">{{ item.message }}</a>
                      <Badge
                        right="27px"
                        top="10px"
                        v-if="item.count !== 0"
                        :value="item.count"
                      />
                    </div>
                  </main>
                </div>
              </transition>
            </li>
            <Popover
              className="dynamic-box"
              :bool="true"
              :info="dynamic"
              :href="`/space/${$store.state.info.alias}/dynamic`"
              name="动态"
              description="暂无动态!"
            />
            <Collect />
            <Popover
              className="history"
              :info="history"
              :href="`/space/${$store.state.info.alias}/history`"
              name="历史"
              description="暂无浏览足迹!"
            />
            <li>
              <a href="/platform">创作中心</a>
            </li>
            <Root />
          </ul>
          <button @click.stop="href()" type="_blank">创作</button>
        </div>
      </div>
    </div>
    <slot />
  </nav>
</template>

<script>
import Root from "../Root";
import Badge from "./Parts/Badge";
import LocaL from "@/assets/js/Storage";
import Popover from "./Parts/Popover";
import Collect from "./Parts/Collect";
import Logo from "../Logo";
import { _ } from "@/assets/js/Def";
export default {
  data() {
    return {
      show: "black",
      nav: [
        {
          name: "教程",
          path: "/course/type",
        },
        {
          name: "开源",
          path: "",
        },
        {
          name: "知识库",
          path: "knowledge",
        },
        {
          name: "学语言",
          path: "",
        },
        {
          name: "工具",
          path: "",
        },
        {
          path: "/chat",
          name: "移动端",
        },
      ],
      box: [
        {
          path: "/message/reply",
          type: "comment",
          message: "回复我的",
        },
        {
          path: "/message/ait",
          type: "ait",
          message: "@我的",
        },
        {
          path: "/message/like",
          type: "like",
          message: "收到的赞",
        },
        {
          path: "/message/system",
          type: "system",
          message: "系统消息",
        },
        {
          path: "/message/mymessage",
          type: "message",
          message: "我的消息",
        },
      ],
      link: [
        {
          title: "个人中心",
          path: "article",
          svgImg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="link-icon"><rect opacity="0.01" width="18" height="18" fill="white"></rect><path d="M12.1146 9.48983C13.2763 8.63331 14.0299 7.2548 14.0299 5.7035C14.0299 3.11005 11.9198 1 9.32636 1C6.73291 1 4.62286 3.11005 4.62286 5.7035C4.62286 7.2548 5.37829 8.63331 6.53808 9.48983C3.87662 10.589 2 13.2118 2 16.2648C2 16.671 2.32901 17 2.73521 17C3.14141 17 3.47042 16.671 3.47042 16.2648C3.47042 13.0335 6.09879 10.407 9.3282 10.407C12.5576 10.407 15.186 13.0354 15.186 16.2648C15.186 16.671 15.515 17 15.9212 17C16.3274 17 16.6564 16.671 16.6564 16.2648C16.6546 13.2118 14.7761 10.589 12.1146 9.48983ZM6.09144 5.7035C6.09144 3.91878 7.54348 2.46858 9.32636 2.46858C11.1092 2.46858 12.5613 3.92062 12.5613 5.7035C12.5613 7.48639 11.1092 8.93843 9.32636 8.93843C7.54348 8.93843 6.09144 7.48639 6.09144 5.7035Z" fill="var(--text2)"></path></svg>`,
        },
        {
          title: "文章管理",
          path: "article",
          svgImg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="link-icon"><rect opacity="0.01" width="18" height="18" fill="#C4C4C4"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M3.375 1.875H10.875C12.739 1.875 14.25 3.38604 14.25 5.25V7.875V8.625C14.25 9.03921 14.5858 9.375 15 9.375C15.4142 9.375 15.75 9.03921 15.75 8.625V7.875V5.25C15.75 2.55761 13.5674 0.375 10.875 0.375H3.375C2.33947 0.375 1.5 1.21447 1.5 2.25V15C1.5 16.0355 2.33947 16.875 3.375 16.875H6.75H7.5C7.91421 16.875 8.25 16.5392 8.25 16.125C8.25 15.7108 7.91421 15.375 7.5 15.375H6.75H3.375C3.16789 15.375 3 15.2071 3 15V2.25C3 2.04289 3.16789 1.875 3.375 1.875ZM10.4 8.51962C10.8 8.28868 10.8 7.71132 10.4 7.48038L7.7 5.92154C7.3 5.6906 6.8 5.97927 6.8 6.44115V9.55885C6.8 10.0207 7.3 10.3094 7.7 10.0785L10.4 8.51962ZM15.518 14.2511L14.3215 16.3234H11.9285L10.7321 14.2511L11.9285 12.1787H14.3215L15.518 14.2511ZM16.817 13.5011C17.0849 13.9652 17.0849 14.537 16.817 15.0011L15.6205 17.0734C15.3526 17.5375 14.8574 17.8234 14.3215 17.8234H11.9285C11.3926 17.8234 10.8974 17.5375 10.6295 17.0734L9.43302 15.0011C9.16507 14.537 9.16507 13.9652 9.43302 13.5011L10.6295 11.4287C10.8974 10.9646 11.3926 10.6787 11.9285 10.6787H14.3215C14.8574 10.6787 15.3526 10.9646 15.6205 11.4287L16.817 13.5011ZM13.125 13.3125C12.6072 13.3125 12.1875 13.7322 12.1875 14.25C12.1875 14.7678 12.6072 15.1875 13.125 15.1875C13.6428 15.1875 14.0625 14.7678 14.0625 14.25C14.0625 13.7322 13.6428 13.3125 13.125 13.3125Z" fill="var(--text2)"></path></svg>`,
        },
        {
          title: "知识库管理",
          path: "knowledge",
          svgImg: `<svg t="1642071199085" class="icon" viewBox="0 0 1171 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5514" width="32" height="32"><path d="M1121.034 947.942c0 0-142.543-24.912-274.03-24.912-130.08 0-249.119 24.912-249.119 24.912-4.327 0-8.453-0.725-12.456-1.761-4.003 1.036-8.129 1.761-12.456 1.761 0 0-142.543-24.912-274.03-24.912-130.08 0-249.119 24.912-249.119 24.912-27.518 0-49.824-22.306-49.824-49.824L0 175.674c0 33.215 29.565-99.647 309.892-99.647 157.587 0 236.431 40.771 275.57 71.502 38.97-30.731 117.131-71.502 272.491-71.502 284.344 0 312.905 132.862 312.905 99.647l0 722.444C1170.858 925.636 1148.552 947.942 1121.034 947.942zM548.061 225.498c0 0-49.824-74.736-249.119-74.736-166.081 0-224.207 74.736-224.207 74.736l0 622.797c0 27.518 22.306 24.912 49.824 24.912 0 0 85.433-24.912 174.384-24.912 97.495 0 199.295 24.912 199.295 24.912 27.518 0 49.824 2.606 49.824-24.912L548.062 225.498zM1096.122 225.498c0 0-27.802-41.543-124.559-62.676l0 386.53-99.647-74.736-99.647 74.736L772.269 156.537c-109.032 17.411-149.471 68.961-149.471 68.961l0 622.797c0 27.518 22.306 24.912 49.824 24.912 0 0 85.433-24.912 174.383-24.912 97.495 0 199.295 24.912 199.295 24.912 27.518 0 49.824 2.606 49.824-24.912L1096.124 225.498zM423.502 673.911 199.295 673.911c-13.759 0-24.912-11.153-24.912-24.912l0-24.912c0-13.759 11.153-24.912 24.912-24.912l224.207 0c13.759 0 24.912 11.153 24.912 24.912L448.414 649C448.414 662.758 437.261 673.911 423.502 673.911zM423.502 449.705 199.295 449.705c-13.759 0-24.912-11.153-24.912-24.912l0-24.912c0-13.759 11.153-24.912 24.912-24.912l224.207 0c13.759 0 24.912 11.153 24.912 24.912l0 24.912C448.414 438.552 437.261 449.705 423.502 449.705z" p-id="5515"></path></svg>`,
        },
        {
          title: "我的订单",
          svgImg: `<svg t="1664006472544" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2561" width="32" height="32"><path d="M773.22449 52.244898H271.673469A114.938776 114.938776 0 0 0 156.734694 167.183673v668.734694a114.938776 114.938776 0 0 0 114.938775 114.938776h501.551021a114.938776 114.938776 0 0 0 114.938775-114.938776V167.183673A114.938776 114.938776 0 0 0 773.22449 52.244898z m-501.551021 62.693878h501.551021A52.244898 52.244898 0 0 1 825.469388 167.183673v668.734694a52.244898 52.244898 0 0 1-52.244898 52.244898H271.673469a52.244898 52.244898 0 0 1-52.244898-52.244898V167.183673A52.244898 52.244898 0 0 1 271.673469 114.938776z" fill="#666666" p-id="2562"></path><path d="M689.632653 271.673469a31.346939 31.346939 0 0 1 3.009306 62.547592L689.632653 334.367347H355.265306a31.346939 31.346939 0 0 1-3.009306-62.547592L355.265306 271.673469h334.367347zM689.632653 459.755102a31.346939 31.346939 0 0 1 3.009306 62.547592L689.632653 522.44898H355.265306a31.346939 31.346939 0 0 1-3.009306-62.547592L355.265306 459.755102h334.367347zM564.244898 647.836735a31.346939 31.346939 0 0 1 3.009306 62.547592L564.244898 710.530612H355.265306a31.346939 31.346939 0 0 1-3.009306-62.547592L355.265306 647.836735h208.979592z" fill="#666666" p-id="2563"></path></svg>`,
        },
      ],
      Count: "",
      info: [],
      boxBoole: {
        message: false,
      },
      popover: false,
      ver: false,
      searchBox: {
        search: "",
        results: [],
      },
      TopSerch: [],
      searchHistory: JSON.parse(LocaL.get("search")) || { topic: [] },
      dynamic: [],
      history: [],
      focus: false,
      blur: true,
      visible: false,
      time: "",
      infoTime: "",
    };
  },
  props: {
    hide: {
      default: false,
    },
    boolean: {
      default: true,
    },
  },
  async mounted() {
    const search = await this.Fetch.Home.Search({ method: "put" });
    this.TopSerch = search.data.search;
    setTimeout(async () => {
      if (this.$store.state.info.name) {
        this.render();
        this.$emit("render", this.render);
        const func = this.Def.Home.Hover({
          dom: ".message-box",
          enter: () => {
            this.boxBoole.message = true;
          },
          leave: () => {
            this.boxBoole.message = false;
          },
        }).Hover({
          dom: ".popover",
          enter: () => {
            this.popover = true;
          },
          leave: () => {
            this.popover = false;
          },
        });
        if (this.boolean) {
          func.Hover({
            dom: ".search-panel",
            enter: () => {
              this.blur = false;
            },
            leave: () => {
              this.blur = true;
            },
          });
        }
      }
    }, 100);
  },
  components: { Root, Logo, Badge, Popover, Collect },
  methods: {
    href() {
      window.location = `/release/add`;
    },
    async Log() {
      const { data } = await this.Fetch.Login.Login({ method: "put" });
      this.Def.Home.Message({
        res: data,
        fun: () => {
          location.reload();
        },
      });
    },
    Focus() {
      this.focus = true;
    },
    Blur() {
      this.focus = false;
    },
    Search(text) {
      location.href = `/search?q=${text}`;
    },
    del(text) {
      this.searchHistory.topic = this.searchHistory.topic.filter(
        (item) => item !== text
      );
      LocaL.del("search");
      LocaL.set({ name: "search", text: JSON.stringify(this.searchHistory) });
    },
    empty() {
      this.searchHistory = { topic: [] };
      LocaL.del("search");
    },
    async render() {
      const [res, dynamic, history] = await Promise.all([
        this.Fetch.Home.Notify({ type: 0 }),
        this.Fetch.Home.Dynamic({}),
        this.Fetch.Home.History({ number: 1 }),
      ]);
      this.Count = res.data.count;
      this.dynamic = dynamic.data.info;
      this.history = history.data.history;
      this.box.map((item) => {
        item.count = res.data[item.type];
      });
    },
    Link(name) {
      return `/space/${this.$store.state.info.alias}/${name}`;
    },
  },
  watch: {
    "searchBox.search": {
      handler(news) {
        this.searchBox.results = [];
        if (this.searchBox.search.trim()) {
          clearTimeout(this.time);
          this.time = setTimeout(async () => {
            const rej = await this.Fetch.Home.Trie({ q: news.trim() });
            this.searchBox.results = this.Def.Home.Trie(rej.data);
          }, 500);
        }
      },
    },
  },
};
</script>

<style lang="less">
.base {
  height: 60px;
  background: var(--tint-color);
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
  padding: 10px 30px;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 1000;

  &.visible {
    overflow: visible;
  }

  .top {
    top: -55px !important;
  }

  .info {
    width: 32.8%;
    display: flex;
    gap: 15px;
  }

  .navs {
    height: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    transition: all 0.2s;
    top: 0;
  }

  .nav {
    width: 74%;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;

    ul {
      width: 97%;
      margin: 0;
      display: flex;
      padding: 0;
      justify-content: space-between;

      li {
        list-style: none;

        a {
          text-decoration: none;
          display: flex;
          color: var(--color);
          align-items: center;
          gap: 5px;
          i {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }

  .search {
    width: 34.25%;
    padding: 0 30px;
    position: relative;

    .form {
      padding: 4px;
      display: flex;
      justify-content: flex-end;
      height: 100%;

      input {
        width: 90%;
        background: var(--tint-background);
        border-radius: 5px 0px 0px 5px;
        text-indent: 0.5rem;
        border: 0;
        color: var(--color);
        outline: none;
        transition: 1s;
      }

      &.focus {
        box-shadow: 0 0 30px rgb(0 0 0 / 10%);
        border-radius: 5px 5px 0 0;
        border: solid 1px var(--tint-two-background);
        border-bottom: none;

        + div {
          display: flex;
        }

        // &:has(:focus) {
        //   box-shadow: 0 0 30px rgb(0 0 0 / 10%);
        //   border-radius: 5px 5px 0 0;
        //   border: solid 1px var(--tint-two-background);
        //   border-bottom: none;

        //   +div {
        //     display: flex;
        //   }
      }

      button {
        width: 10%;
        background: var(--main-color);
        border: none;
        color: #fff;
        cursor: pointer;
        border-radius: 0px 5px 5px 0px;
      }
    }

    .search-panel {
      width: 88%;
      max-height: 612px;
      background: var(--tint-color);
      position: absolute;
      border: solid 1px var(--tint-two-background);
      border-top: none;
      border-radius: 0px 0px 5px 5px;
      flex-direction: column;
      display: none;
      padding: 13px 16px;

      &.active {
        display: none;
      }

      .history-box {
        display: flex;
        flex-direction: column;

        .search-history {
          .title {
            display: flex;
            justify-content: space-between;

            span {
              font-size: 12px;
              color: #9499a0;
              cursor: pointer;

              &:hover {
                color: var(--main-color);
              }
            }
          }

          .box {
            margin-top: 10px;

            .item {
              background: var(--item-background);
              padding: 7px 10px 8px;
              position: relative;
              width: auto;
              font-size: 12px;
              line-height: 15px;
              border-radius: 4px;
              height: 30px;
              float: left;
              margin: 0 10px 10px 0;
              cursor: pointer;

              &:hover {
                color: var(--main-color);

                i {
                  display: block;
                }
              }
            }

            i {
              position: absolute;
              top: -3px;
              right: -7px;
              display: none;

              svg {
                fill: #ccc;
                cursor: pointer;
              }
            }
          }
        }

        .top-search {
          display: flex;
          gap: 10px;
          flex-direction: column;
        }

        .top-serch-box {
          display: flex;
          justify-content: space-between;

          .top-serch-main {
            width: calc(98% / 2);
            display: flex;
            flex-direction: column;

            .topic {
              display: flex;
              align-items: center;
              height: 38px;
              padding: 4px;
              cursor: pointer;
              border-radius: 4px;
              justify-content: space-between;

              .topic-main-box {
                display: flex;
                align-items: center;
              }

              i {
                font-style: normal;
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                color: var(--tint-two-background);
                margin-right: 7px;
              }

              p {
                font-size: 14px;
                margin-right: 6px;
                white-space: nowrap;
                overflow: hidden;
                color: var(--color);
                text-overflow: ellipsis;
                letter-spacing: 0;
              }

              span {
                display: flex;
                width: 23px;
                height: 18px;
                background: #fa8f58;
                padding: 2px;
                font-size: 4px;
                border-radius: 3px;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;

                &.new::before {
                  content: "热";
                  position: absolute;
                }
              }

              &:hover {
                background: var(--topic-hover);

                i {
                  color: #c2c2c2;
                }
              }
            }

            .item-1,
            .item-2,
            .item-3,
            .item-4 {
              color: var(--color) !important;
            }
          }
        }
      }

      .trie-box {
        display: flex;
        flex-direction: column;
        height: auto;

        .topic {
          font-size: 14px;
          height: 35px;
          cursor: pointer;
          padding: 0 10px;
          border-radius: 5px;
          display: flex;
          align-items: center;

          &:hover {
            background: var(--search-hover);
          }

          em {
            color: var(--main-color);
            font-style: normal;
          }
        }
      }
    }
  }

  .popover {
    width: 40px;
    height: 40px;
    transition: all 0.2s;
    position: relative;

    .avatar {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      text-decoration: none;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        z-index: 1;
        top: 0;
        position: absolute;
        transition: all 0.3s ease;
      }
    }

    .onhover {
      width: 70px !important;
      height: 70px !important;
      top: 15px !important;
    }

    .popover-box {
      width: 300px;
      height: 370px;
      background: var(--tint-color);
      border: 1px solid var(--tint-solid);
      box-shadow: 0 0 30px rgb(0 0 0 / 10%);
      position: absolute;
      top: 55px;
      right: -132px;
      border-radius: 8px;
      padding: 20px;
      display: flex;
      flex-direction: column;

      .avatar-box {
        height: 20%;
        display: flex;
        justify-content: center;
        flex-direction: column;

        h3 {
          width: 100%;
          display: flex;
          justify-content: center;
        }
      }

      .item-box {
        height: 50px;
        display: flex;
        justify-content: space-around;

        a {
          text-decoration: none;
          display: flex;
          flex-direction: column;

          h4 {
            display: flex;
            justify-content: center;
            height: 20px;
            color: initial;
          }

          span {
            font-size: 13px;
            color: var(--tint-with-color);
            font-weight: 700;
          }

          &:hover {
            h4 {
              color: var(--main-color);
            }

            span {
              color: var(--main-color);
            }
          }
        }
      }

      .links-item {
        display: flex;
        flex-direction: column;
        height: 55%;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: solid #e7e7e7 1px;

        a {
          height: 50px;
          padding: 0 20px;
          text-decoration: none;
          color: inherit;
          font-size: 14px;
          font-weight: 500;
          border-radius: 8px;
          align-items: center;
          display: flex;
          justify-content: space-between;

          .left {
            gap: 10px;
            display: flex;

            i {
              display: flex;
              flex-direction: column;
              justify-content: center;

              svg {
                fill: #515151;
                width: 18px;
                height: 18px;
              }
            }
          }

          > i {
            svg {
              transform: rotate(-90deg);
            }
          }

          &:hover {
            background: var(--tint-two-background);
          }
        }
      }

      .logout-box {
        height: 40px;
        padding: 0 20px;
        cursor: pointer;
        border-radius: 8px;
        display: flex;
        align-items: center;
        margin-top: 5px;
        gap: 10px;

        i {
          display: flex;
          flex-direction: column;
          justify-content: center;

          svg {
            width: 18px;
            height: 18px;
            fill: #515151;
          }
        }

        &:hover {
          background: var(--tint-solid);
        }
      }
    }
  }

  .noLogin {
    ul {
      width: 78% !important;
    }

    .create-box {
      width: 100% !important;
    }
  }

  .create {
    width: 32.8%;
    display: flex;
    justify-content: space-between;

    .create-box {
      width: 86%;
      display: flex;
      padding: 4px 0px;
      justify-content: space-between;

      ul {
        width: 76%;
        align-items: center;
        display: flex;
        justify-content: space-between;

        li {
          list-style: none;
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;

          &:last-child {
            width: 20px;
            height: 100%;
            display: flex;
            cursor: pointer;

            i {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;

              svg {
                width: 20px;
                height: 20px;
              }
            }
          }

          a {
            text-decoration: none;
            color: var(--color);
          }
        }

        @keyframes displays {
          from {
            transform: translateY(-2%);
          }
        }

        .v-popover {
          position: absolute;
          flex-direction: column;
          top: 33px;
          padding-top: 15px;
          transition: all 0.3s;
          animation: displays 0.3s;

          main.main-box {
            border-radius: 8px;
            box-shadow: 0 0 30px rgb(0 0 0 / 10%);
            border: 1px solid var(--tint-two-background);
            background: var(--tint-color);
            padding: 20px 0;
          }
        }

        .message-box {
          .v-popover {
            width: 142px;
            left: -122%;

            .item {
              position: relative;

              a {
                font-size: 15px;
                padding: 0 20px;

                height: 35px;
                display: flex;
                align-items: center;

                &:hover {
                  background: var(--topic-hover);
                  color: var(--main-color);
                }
              }
            }
          }
        }
      }

      button {
        width: 80px;
        height: 100%;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background: var(--main-color);
        color: #fff;
      }
    }
  }
}
</style>
