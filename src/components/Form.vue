<template>
  <b-form>
    <input type="text" value="" v-model.trim="msg" />
    <div v-for="value in allValues" :key="value.id">
      {{ value }}
    </div>
  </b-form>
</template>

<script>
export default {
  name: "exampleForm",
  props: {
    defaultMsg: String
  },
  methods: {},
  data: function(props) {
    return {
      msg: props.defaultMsg,
      allValues: [props.defaultMsg]
    };
  },
  watch: {
    msg: function() {
      this.allValues = [...this.allValues, this.msg];
    }
  }
};
</script>
