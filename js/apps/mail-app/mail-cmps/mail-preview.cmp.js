import { eventBus } from "../../../services/event-bus-service.js";
export default {
  name: "mail-preview",
  props: ["email", "filterBy"],
  template: `
  <section  @mouseover="mouseOver" @mouseout="mouseOut" class="mail-preview pointer" >
      <strong>{{email.from}}</strong>
      <strong>{{shordSubject}}</strong>
      <div class="prev-content">
      <p>{{shortBody}}</p>
      <div v-if="showBtns && filterBy!=='deleted'" class="prev-btns">
        <button @click.stop="read"><i class="material-icons">mark_email_read</i></button>
        <button @click.stop="remove"><i class="material-icons">delete</i></button>
      </div>
      <p v-else>{{shortDate}}</p>
      </div>
  </section>
`,
  data() {
    return {
      showBtns: false,
    };
  },

  methods: {
    mouseOver() {
      this.showBtns = true;
    },

    mouseOut() {
      this.showBtns = false;
    },

    read() {
      eventBus.$emit("emailRead", this.email.id);
    },

    remove() {
      this.email.isRemoved = true;
      eventBus.$emit("removeEmail", this.email.id);
    },
  },

  computed: {
    shortBody() {
      const txt = this.email.body;
      return txt.length > 40 ? txt.substring(0, 40) : txt;
    },

    shordSubject() {
      const txt = this.email.subject;
      return txt.length > 20 ? txt.substring(0, 20) : txt;
    },

    shortDate() {
      const date = this.email.sentAt;
      return date.substring(4, 10);
    },
  },
};
