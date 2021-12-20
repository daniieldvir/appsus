import { mailService } from "../services/mail-servies.js";
import titleDisplay from "../mail-cmps/titleForDisplay.cmp.js";
import { eventBus } from "../../../services/event-bus-service.js";

export default {
  name: "mail-Details",
  template: `
  <section v-if="this.email" class="mail-Details flex col">
    <button class="close-details-btn" @click.nativ="goBack">X</button>
    <div class="flex align-center space-between">
      <div class="flex align-center">
      <i class="material-icons">account_circle</i>
      <titleDisplay :title="email.subject"/>
      </div>
      <span>{{formateTime}}</span>
       </div>
      <div class="email-from flex ">
      <strong>{{email.from}} </strong>
      <span>hh@example.com</span> 
      </div>
      <span class="seperator">to:{{email.to}}</span>
      <p class="email-body">{{email.body}}</p> 
      <button class="close-btn-lg" @click.nativ="goBack">Go Back</button>
  </section>
  `,
  data() {
    return {
      email: null,
    };
  },
  created() {
    const emailId = this.$route.params.mailId;
    mailService.getById(emailId).then((email) => {
      this.email = email;
      this.markAsRead();
    });
  },

  watch: {
    "$route.params.mailId": {
      handler() {
        const emailId = this.$route.params.mailId;
        mailService.getById(emailId).then((email) => {
          this.email = email;
          this.markAsRead();
        });
      },
      immediate: true,
    },
  },
  methods: {
    goBack() {
      this.$router.push("/mail");
    },

    markAsRead() {
      if (this.email && !this.email.isRead) {
        this.email.isRead = true;
        eventBus.$emit("emailRead", this.email.id);
      }
    },
  },

  computed: {
    formateTime() {
      return this.email.sentAt.substring(0, 21);
    },
  },

  components: {
    titleDisplay,
  },
};
