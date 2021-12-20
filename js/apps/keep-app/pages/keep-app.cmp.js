import { eventBus } from "../../../services/event-bus-service.js";
import { noteService } from "../services/note-service.cmps.js";
import { storageService } from "../../../services/async-storage-service.js";

import noteAdd from "../cmps/note-add.cmps.js";
import noteFilter from "../cmps/note-filter.cmps.js";
import noteList from "../cmps/note-list.cmps.js";
import { utilService } from "../../../services/util-service.js";

export default {
  name: "note-app",
  template: `
          <section class="note main-layout ">
              <div class="note-app">
              <h1>Welcome To keep</h1>
              
              <note-add @addNote="addNote"></note-add>
              <note-filter @filtered="setFilter"></note-filter>
              
              <section class="notes-containers">
              <note-list :notes="notesToShow" @deleteNote="deleteNotes" @tooglePin="tooglePin" @changeBcgColor="changeBcgColor" @changeTxtColor="changeTxtColor" @noteDuplicate="noteDuplicate"/></note-list>
                 </section>
            </div>
          </section>
              `,
  data() {
    return {
      notes: null,
      filterBy: null,
    };
  },
  created() {
    this.loadNotes();
    eventBus.$on("noteChanged", this.noteChanged);
  },
  methods: {
    loadNotes() {
      noteService.query().then((notes) => {
        // console.log("app notes", notes);
        this.notes = notes;
      });
    },
    tooglePin(noteId) {
      // console.log(noteId);
      noteService.tooglePin(noteId);
      console.log(noteId);
    },
    noteChanged(note) {
      console.log("changed", note);
      noteService.save(note).then((note) => {
        this.loadNotes();
        // console.log("hfhfhf", note);
      });
    },
    changeTxtColor(txtColor, noteId) {
      noteService.changeTxtColor(txtColor, noteId);
    },
    changeBcgColor(bcgColor, noteId) {
      noteService.changeBcgColor(bcgColor, noteId);
    },
    noteDuplicate(note, bcgColor) {
      noteService.noteDuplicate(note, bcgColor);
      this.loadNotes();
    },
    deleteNotes(noteId) {
      noteService
        .deleteNote(noteId)
        .then(() => {
          const msg = {
            txt: "Deleted Successfully",
            type: "success",
          };
          eventBus.$emit("showMsg", msg);
          this.loadNotes();
        })
        .catch((err) => {
          console.log("err", err);
          const msg = {
            txt: "Error. Please try later",
            type: "error",
          };
          eventBus.$emit("showMsg", msg);
        });
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
      // console.log(this.filterBy);
    },
    addNote(note) {
      noteService.addNote(note);
      this.loadNotes();
    },
  },
  computed: {
    notesToShow() {
      if (!this.filterBy) return this.notes;
      const searchStr = this.filterBy.info.toLowerCase();
      let notesToShow;
      // console.log(this.filterBy);
      notesToShow = this.notes.filter((note) => {
        if (this.filterBy.type) {
          return (
            note.type === this.filterBy.type &&
            note.info.titleTxt.toLowerCase().includes(searchStr)
          );
        } else {
          return note.info.titleTxt.toLowerCase().includes(searchStr);
        }
      });
      return notesToShow;
    },
  },

  components: {
    noteAdd,
    noteService,
    noteList,
    noteFilter,
  },
};
