import { eventBus } from "../../../services/event-bus-service.js";

export default {
  name: "note-add",
  props: ["noteAdd"],
  template: `
  <section class="note-add">
  <div class="text-area">
    <input @click="openInput($event)" type="text" :placeholder="placeholderByType" v-model="noteBody"/>
    <transition name="fade" class="fade-enter-active fade-leave-active fade-enter fade-leave-to">
    <input @click="openInput($event)" type="text" placeholder="Enter title for the note" v-if="isOn" v-model="noteTitle"/>
    </transition>
        </div>
        <div class="control-area">
            <button @click="setType('note-txt')" :class="{'selected-type': noteType === 'note-txt'}" title="Text note"><i class="far fa-comment fa-2x"></i></i></button>
            <button @click="setType('note-img')" :class="{'selected-type': noteType === 'note-img'}" title="Image note"><i class="far fa-image fa-2x"></i></button>
            <button @click="setType('note-video')" :class="{'selected-type': noteType === 'note-video'}" title="Video note"><i class="fab fa-youtube fa-2x"></i></button>
            <button @click="setType('note-todos')" :class="{'selected-type': noteType === 'note-todos'}" title="List note"><i class="fas fa-list fa-2x"></i></button>
            <button @click="setType('note-map')" :class="{'selected-type': noteType === 'note-map'}" title="Map note"><i class="fas fa-map-marked-alt fa-2x"></i></button>
            <button @click="addNote" class="add-btn" title="Add note"><i class="fas fa-plus fa-2x"></i></button>
        </div>
    </section>
        `,
  data() {
    return {
      noteType: "note-txt",
      noteTitle: "",
      noteBody: "",
      note: { type: "", info: {} },
      isOn: false,
    };
  },
  created() {
    window.addEventListener("click", () => (this.isOn = false));
  },
  methods: {
    setType(type) {
      event.stopPropagation();
      this.noteType = type;
      // console.log(this.noteType);
    },
    openInput(event) {
      event.stopPropagation();
      this.isOn = true;
    },
    addNote() {
      if (!this.noteBody || !this.noteTitle) {
        return;
      }

      this.note.type = this.noteType;
      this.note.info.titleTxt = this.noteTitle;

      if (this.note.type === "note-txt") {
        this.note.info.bodyTxt = this.noteBody;
      } else if (this.note.type === "note-todos") {
        var todos = this.noteBody.split(",");
        todos = todos.map((todo) => {
          todo = { todo: todo.trim(), isDone: false };
          return todo;
        });

        // console.log(todos);
        this.note.info.todos = todos;
      } else if (this.note.type === "note-map") {
        this.note.info.location = this.noteBody;
      } else if (this.note.type === "note-img" || "note-video") {
        this.note.info.url = this.noteBody;
      }
      this.$emit("addNote", this.note);
      this.noteTitle = "";
      this.noteBody = "";
      this.note = { type: "", info: {} };
    },
  },
  computed: {
    placeholderByType() {
      switch (this.noteType) {
        case "note-txt":
          return `What's on your mind...`;
        case "note-img":
          return `Enter image URL...`;
        case "note-video":
          return `Enter video URL...`;
        case "note-todos":
          return `Enter comma separated list...`;
        case "note-map":
          return `Enter location...`;
      }
    },
  },
};
