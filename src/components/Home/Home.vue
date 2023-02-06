<template>
  <main id="home">
    <Nav @render="render" />
    <Content :render="fun" />
    <Footer />
  </main>
</template>

<script>
import Nav from "./Nav";
import Content from "./Content";
import Footer from "./Footer";
export default {
  name: "Home",
  data() {
    return {
      fun: ""
    }
  },
  components: {
    Nav,
    Content,
    Footer,
  },
  methods: {
    render(fun) {
      this.fun = fun
    }
  }
};
</script>