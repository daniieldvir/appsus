import { eventBus } from "../../services/event-bus-service.js";

export default {
  template: `
    <transition name="fade">
        <div v-if="msg" class="user-msg" :class="msg.type">
            <p>{{msg.txt}}</p>
        </div>
    </transition>
    `,
  data() {
    return {
      msg: null,
    };
  },
  created() {
    eventBus.$on("showMsg", this.showMsg);
  },
  methods: {
    showMsg(msg) {
      this.msg = msg;
      setTimeout(() => {
        this.msg = null;
      }, 3000);
    },
  },
  destroyed() {
    eventBus.$off("showMsg", this.showMsg);
  },
};
