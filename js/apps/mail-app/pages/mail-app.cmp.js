import { mailService } from "../services/mail-servies.js";
import { eventBus } from "../../../services/event-bus-service.js";
import mailList from "../mail-cmps/mail-list.cmp.js";
import sideFilters from "../mail-cmps/side-filters.cms.js";
import compose from "../pages/compose.cmp.js";
import searchFilter from "../mail-cmps/search-filter.cmp.js";
// import sortEmails from "../../mail-app/mail-cmps/sort-emails.cmp.js";
import actionBtns from "../mail-cmps/action-btns.cmp.js";

export default {
  name: "mail-app",
  template: `
    <section class="mail-app  ">
      <div class="filters-screen" @click="toggleFilters"></div>
      <button class="filters-menu" @click="toggleFilters"><i class="material-icons">more_vert</i></button>
        <button @click="openCompose" class="compose-btn flex "><span>+</span><span>Compose</span></button>
        <searchFilter  @filteredByTxt="setFilter"/>
        <sideFilters  @filtered="setFilter" :filterBy='filterBy' :emails="emailsForDisplay" :read="coutRead"/>
        <actionBtns v-if="isSelectedEmails" @removeSelected="removeSelected" @markReadSelected="markAsRead"/>
        <mailList  @starred="starEmail" @selected="selectEmails" :filterBy='filterBy' :emails="emailsForDisplay"/>
      <compose/>
    </section>
    
`,
  data() {
    return {
      emails: null,
      filterBy: "inbox",
      // sortBy: null,
      isSelectedEmails: false,
      removedEmails: null,
    };
  },
  created() {
    this.loadEmails();
    eventBus.$on("emailRead", this.markAsRead);
    eventBus.$on("removeEmail", this.remove);
    eventBus.$on("emailSent", this.loadEmails);
  },
  methods: {
    loadEmails() {
      mailService.query().then((emails) => {
        this.emails = emails;
      });
      mailService.removedQuery().then((emails) => {
        this.removedEmails = emails;
      });
    },

    setFilter(filterBy) {
      this.filterBy = filterBy;
    },

    selectEmails(email) {
      mailService.save(email).then(this.loadEmails);
      const isSelected = this.emails.some((email) => email.isSelected);
      this.isSelectedEmails = isSelected;
    },

    remove(emailId) {
      mailService.getById(emailId).then((email) => {
        email.isRemoved = true;
        mailService.saveToRemoved(email);
      });
      mailService.remove(emailId).then(this.loadEmails);
      const msg = {
        txt: "Email Deleted",
        type: "success",
      };
      eventBus.$emit("showMsg", msg);
    },

    removeSelected() {
      const selected = this.emails.filter((email) => email.isSelected);
      selected.forEach((email) => {
        this.remove(email.id);
      });
      this.loadEmails();
    },

    starEmail(emailId) {
      if (this.emails) {
        mailService.getById(emailId).then((email) => {
          email.isStarred = !email.isStarred;
          mailService.save(email).then(this.loadEmails);
          const msg = {
            txt: "Email Starred",
            type: "success",
          };
          eventBus.$emit("showMsg", msg);
        });
      }
      this.loadEmails();
    },

    markAsRead(emailId) {
      if (this.emails) {
        mailService.getById(emailId).then((email) => {
          email.isRead = !email.isRead;
          mailService.save(email).then(this.loadEmails);
          const msg = {
            txt: "Marked as read",
            type: "success",
          };
          eventBus.$emit("showMsg", msg);
        });
      }
    },

    openCompose() {
      eventBus.$emit("showCompose");
    },

    toggleFilters() {
      document.body.classList.toggle("filters-open");
    },
  },

  computed: {
    emailsForDisplay() {
      if (this.emails && this.filterBy) {
        let emailsToShow;
        if (this.filterBy === "deleted") {
          emailsToShow = this.removedEmails;
        } else {
          emailsToShow = this.emails.filter((email) => {
            switch (this.filterBy) {
              case "inbox":
                return email.to === "me";
              case "starred":
                return email.isStarred;
              case "sent":
                return email.from === "me";
              case "drafts":
                return email.isDraft;
              case "read":
                return email.isRead;
              case "unread":
                return !email.isRead;
              default:
                return (
                  email.from.toLowerCase().includes(this.filterBy) ||
                  email.subject.toLowerCase().includes(this.filterBy) ||
                  email.body.toLowerCase().includes(this.filterBy)
                );
            }
          });
        }
        return emailsToShow;
      }
      return this.emails;
    },

    coutRead() {
      if (this.emails) {
        const allEmails = this.emails;
        const read = allEmails.filter((email) => {
          return email.isRead;
        });
        const res = ((read.length / allEmails.length) * 100).toFixed(0);

        return res + "%";
      }
    },
  },
  components: {
    mailList,
    sideFilters,
    compose,
    searchFilter,
    actionBtns,
  },
};
