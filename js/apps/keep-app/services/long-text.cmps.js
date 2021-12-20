export default {
  template: `
    <p>
        {{showText}}
        <span v-if="isLong">... </span>
    </p>
    `,
  props: ["text", "length"],
  data() {
    return {
      isLong: false,
    };
  },
  computed: {
    showText() {
      var text = this.text;
      if (text.length <= parseInt(this.length)) {
        this.isLong = false;
        return text;
      }
      text = text.substr(0, parseInt(this.length));
      this.isLong = true;
      return text;
    },
  },
};
