<template>
  <i :style="`right:${right}; top:${top}`">{{ value | More }}</i>
</template>
<script>
export default {
  name: "Badge",
  filters: {
    More(val){
      if (val >= 9){
        return '9+'
      }else{
        return val
      }
    }
  },
  props: {
    value: {},
    right: {
      default: "-7px",
    },
    top: {
      default: "-4px",
    },
  },
};
</script>
<style scoped lang="less">
i {
  position: absolute;
  display: flex;
  min-width: 15px;
  height: 15px;
  color: #fff;
  padding: 0 5px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-radius: 10px;
  background: var(--error);
  font-style: normal;
}
</style>
