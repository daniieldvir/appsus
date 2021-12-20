export default {
  name: "note-map",
  props: ["note"],
  template: `
           <section class="note-display" :style="{color: txtColor, backgroundColor: bcgColor}">
              
               <div class="note-options">
                <button title="Pin note" @click="tooglePin" :class="{'pinned': note.isPinned}"><i class="fas fa-thumbtack fa-lg edit-btn"></i></button>
                <button title="Edit note" @click="editNoteInfo"><i class="fas fa-edit fa-lg edit-btn"></i></i></button>
                <button title="Change text color" @click="openTxtColor">
                  <input ref="txtColor" type="color" hidden v-model="txtColor" @change="changeTxtColor"><i class="fas fa-paint-brush fa-lg edit-btn"></i></button>
                  
                <button title="Change color" @click="openBcgColor">
                  <input ref="fillColor" type="color" hidden v-model="bcgColor" @change="changeBcgColor"><i class="fas fa-palette fa-lg edit-btn"></i></button>
                <button title="Delete note" @click="deleteNote"><i class="fas fa-trash-alt fa-lg edit-btn"></i></button>
                <button title="Duplicate note" @click="noteDuplicate"><i class="fas fa-copy fa-lg edit-btn"></i></i></button>

            </div>
            <div class="note-header">
               {{note.info.titleTxt}}
              </div>
            <iframe width="100%" height="150px" ref="map" :src="src"></iframe>
          </section>`,

  data() {
    return {
      txtColor: this.note.style.txtColor,
      bcgColor: this.note.style.bcgColor,
    };
  },
  methods: {
    tooglePin() {
      this.$emit("tooglePin", this.note.id);
      // console.log(this.note.id);
    },
    editNoteInfo() {
      this.$emit("editNoteInfo", this.note);
      // console.log(this.note);
    },
    openTxtColor() {
      this.$refs.txtColor.click();
    },
    openBcgColor() {
      this.$refs.fillColor.click();
    },
    changeBcgColor() {
      this.$emit("changeBcgColor", this.bcgColor, this.note.id);
    },
    changeTxtColor() {
      this.$emit("changeTxtColor", this.txtColor, this.note.id);
    },
    deleteNote() {
      this.$emit("deleteNote", this.note.id);
    },
    noteDuplicate() {
      this.$emit("noteDuplicate", this.note);
    },
  },
  computed: {
    src() {
      return (
        "https://www.google.com/maps/embed/v1/place?q=" +
        this.note.info.location +
        "&key=AIzaSyBt1Hk9ABAS1VJuCb5MmbqqWZs-15yoLHc"
      );
    },
  },
};
