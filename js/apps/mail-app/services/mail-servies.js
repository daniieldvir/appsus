import { storageService } from "../../../services/async-storage-service.js";
import { utilService } from "../../../services/util-service.js";

export const mailService = {
  query,
  removedQuery,
  getById,
  remove,
  save,
  saveToRemoved,
  getEmpyEmail,
};

const EMAILS_KEY = "emails";
let gEmails;

const REMOVED_KEY = "removedEmails";
let gRemoved = [];

_createEmails();

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
};

function query() {
  return storageService.query(EMAILS_KEY);
}

function removedQuery() {
  return storageService.query(REMOVED_KEY);
}

function getById(emailId) {
  return storageService.get(EMAILS_KEY, emailId);
}

function save(email) {
  if (email.id) return storageService.put(EMAILS_KEY, email);
  else return storageService.post(EMAILS_KEY, email);
}

function remove(emailId) {
  return storageService.remove(EMAILS_KEY, emailId);
}

function saveToRemoved(email) {
  gRemoved.push(email);
  utilService.saveToStorage(REMOVED_KEY, gRemoved);
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAILS_KEY);
  if (!emails || !emails.length) {
    emails = [
      _createEmail(
        "Package dispached!",
        "Dear shopper, we're happay to inform you that your delivery is on its way!",
        "Aliexpress",
        "to: me"
      ),
      _createEmail(
        "So Long & Thanks For All The Fish",
        `So long and thanks for all the fish
          So sad that it should come to this
          We tried to warn you all that your dead
          You may not share our intellect
          Which might explain your disrespect
          For all the natural wonders that
          Grow around you
          So long, so long and thanks
          For all the fish`,
        "Dolphins.inc",
        "me"
      ),
      _createEmail(
        "Wikipedia aout Lorem",
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.",
        "Anonymous Stalker",
        "me"
      ),
      _createEmail(
        "URL query params in Vue",
        `I am trying to set query params with Vue-router when changing input fields, I don't want to navigate to some other page but just want to modify url query params on the same page, I am doing like this:

      this.$router.replace({ query: { q1: "q1" } })

      But this also refreshes the page and sets the y position to 0, ie scrolls 
      to the top of the page. Is this the correct way to set the URL query params 
      or is there a better way to do it.`,
        "me",
        "support@Vue.com"
      ),

      _createEmail(
        "Refund Rejected",
        `Dear shopper, unofortunately your
       request for a refund regarding package #$Tfdsf8jwfj "Vue for Dummies" has been rejected`,
        "next.uk",
        "me"
      ),

      _createEmail(
        "Testing",
        `This an email designed to test sending an email to myself`,
        "me",
        "me"
      ),

      _createEmail(
        "Refund Request",
        `Hi,
        I've recently purchased the book "Vue for Dummies" which has yet to arrive.
        I would like to cancel the order, 
        seeing as I am no dummy this book is unsuitable for my needs.
        Please cancel the order and gimmi a refund.
        
        Yours truly, 
        me`,
        "me",
        "next.uk"
      ),
    ];
  }
  gEmails = emails;
  utilService.saveToStorage(EMAILS_KEY, gEmails);
}

function getEmpyEmail() {
  return {
    subject: "",
    body: "",
    isRead: false,
    isStarred: false,
    isRemoved: false,
    isSelected: false,
    sentAt: "",
    from: "me",
    to: "",
  };
}

function _createEmail(subject, body, from, to) {
  const email = {
    id: utilService.makeId(),
    subject,
    body,
    isRead: false,
    isStarred: false,
    isRemoved: false,
    isSelected: false,
    sentAt: new Date().toString(),
    from,
    to,
  };
  return email;
}
