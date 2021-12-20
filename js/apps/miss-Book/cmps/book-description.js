
export default {
    props: ['description'],
    template: `
         <section>
            <p>Description: {{descriptionText}}</p>
            <button v-if="!isFullLength" @click="isReadMore = true">Read More</button>
         </section>   
    `,
    data() {
        return {
            isReadMore: false
            
        }
    },
    computed: {
        descriptionText() {
            var text = this.description
            if (text.length > 100 && !this.isReadMore) return text.slice(0,100) + "..." 
            else return text
        },
        isFullLength() {
            return this.description.length < 100
        }
    },
}