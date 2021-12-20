import { eventBus } from "../../../services/event-bus-service.js";
import { mailService } from "../services/mail-servies.js";

export default {
  template: `
    <section v-if="shouldShow" class="email-compose flex col">
      <div class="top-bar flex row align-center">
        <button class="title-btn" @click="setExpand">New Message</button>
        <button class="close-compose-btn" @click="close">X</button>
      </div>
      <form @submit.prevent="onSend" class="flex col space-between">
        <div class="flex row recipient-container">
          <span class="recipient-lbl" v-if="isRecipientClicked">To</span>
          <input @click="saveToDrafts" v:model="to" v-on:click="onFormClick(true,'to')"  :placeholder="to" class=" recipient-form seperator">
        </div>
        <input @click="saveToDrafts" v-model="emptyEmail.subject"  v-on:click="onFormClick(false)" placeholder="Subject" class="subject-form seperator">
        <textarea @click="saveToDrafts" v-model="emptyEmail.body" v-on:click="onFormClick(false)" class= "compose-body seperator"></textarea>
            <button type="submit" class="send-button">Send</button>
        </form>
    </section>
    `,
  data() {
    return {
      emptyEmail: {
        subject: "",
        body: "",
        isRead: false,
        isStarred: false,
        isRemoved: false,
        isDraft: false,
        sentAt: "",
        from: "me",
        to: "",
      },
      shouldShow: false,
      isRecipientClicked: false,
      expand: true,
      interval: null,
    };
  },
  created() {
    eventBus.$on("showCompose", this.show);
    this.to = "Recipients";
  },

  methods: {
    show() {
      this.shouldShow = true;
      document.body.classList.add("modal-open");
    },

    close() {
      document.body.classList.remove("modal-open");
      this.resetEmpty();
      this.shouldShow = false;
      clearInterval(this.interval);
    },

    onFormClick(val, form) {
      this.isRecipientClicked = val;
      if (form == "to") {
        this.to = this.to == "Recipients" ? "" : this.to;
      } else {
        this.to = this.to ? this.to : "Recipients";
      }
    },

    onSend() {
      this.emptyEmail.sentAt = new Date().toString();
      mailService.save(this.emptyEmail).then(() => {
        eventBus.$emit("emailSent");
      });
      this.close();
      this.resetEmpty();
    },

    saveToDrafts() {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.emptyEmail.isDraft = true;
        mailService.save(this.emptyEmail).then(() => {
          eventBus.$emit("emailSent");
          const msg = {
            txt: "Saved to Drafts",
            type: "success",
          };
          eventBus.$emit("showMsg", msg);
        });
      }, 5000);
    },

    setExpand() {
      this.expand = !this.expand;
    },

    resetEmpty() {
      this.emptyEmail = {
        subject: "",
        body: "",
        isRead: false,
        isStarred: false,
        isRemoved: false,
        sentAt: "",
        from: "me",
        to: "",
      };
    },
  },
};
