import mailPreview from "./mail-preview.cmp.js";
import titleDisplay from "./titleForDisplay.cmp.js";

export default {
  name: "mail-list",
  props: ["emails", "filterBy"],
  template: `
  <section class="mail-list">
    <titleDisplay :title="filterBy"/>
    <ul class="clean-list ">
      <li v-for="(email,idx) in emails" :class="{read: email.isRead }" class="flex align-center" :key="email.id">
          <label for="email">
              <input :value=email v-model="checkedEmails" @change="selected(email)" type="checkbox">
           </label>
          <i class="star-btn fas fa-star"  v-if="!email.isRemoved" :class="{starred: email.isStarred}" @click.stop="starred(email.id)"></i>
            <mailPreview :email="email" :filterBy="filterBy" @click.native="emailClicked(email.id)"/>
        </li>
    </ul>
    </section>
`,
  data() {
    return {
      checkedEmails: [],
    };
  },

  methods: {
    emailClicked(emailId) {
      this.$router.push("/mail/" + emailId);
    },

    selected(email) {
      this.$emit("selected", email);
    },

    starred(emailId) {
      this.$emit("starred", emailId);
    },
  },
  components: {
    mailPreview,
    titleDisplay,
  },
};
