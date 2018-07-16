<template>
  <div class="container">
    <div class="item item-border flex-basis-600">
      <VideoPlayer :question="question"/>
    </div>
    <div class="item item-border flex-basis-600">
      <div class="container column">
        <div class="item flex-basis-200">
          <div class="container row justify-content-around">
            <div class="item answer"
                 v-for="aswr in question.answers"
                 :draggable="!aswr.selected"
                 @dragstart="setToDrop(aswr)"
                 :class="{
                   right: (aswr.selected && aswr.correct),
                   wrong: (aswr.selected && !aswr.correct),
                   selected: aswr.selected
                 }">
              {{ aswr.text }}
            </div>
          </div>
        </div>
        <div class="item flex-grow-1">
          <div class="container row justify-content-around">
            <div class="item category"
                 v-for="cat in question.categories"
                 @dragover="$event.preventDefault()"
                 @drop="droped(cat)">
              <b>{{ cat.type }}</b>
              <p v-for="aswr in cat.answers">{{ aswr }}</p>
            </div>
          </div>
        </div>
        <div class="item align-self-end">
          <button class="btn btn-round" @click.prevent="setCurrent(exercise.questions)" v-if="!ended" :disabled="!question.answered">Next</button>
          <button class="btn btn-round" @click.prevent="finish()" v-else>Finish!</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VideoPlayer from '../VideoPlayer'

export default {
  name: "dragndrop",
  data () {
    return {
      question: {
        answers: [],
        categories: []
      },
      ended: false,
      video: null,
      toDrag: null,
      dropped: 0
    }
  },
  methods: {
    setCurrent (questions) {
      for (const index in questions) {
        if (!questions[index].answered) {
          this.question = questions[index]
          this.dropped = 0
          break
        } else {
          if (parseInt(index) === (questions.length - 1)) {
            this.question = questions[index]
            this.ended = true
            break
          }
        }
      }
      this.video = this.question.video
    },
    setToDrop (answer) {
      this.toDrag = answer
    },
    droped (category) {
      this.dropped++
      this.toDrag.selected = true
      if (category.type === this.toDrag.category) this.toDrag.correct = true
      else this.toDrag.correct = false
      category.answers.push(this.toDrag.text)
      this.toDrag = null
      if (this.dropped == parseInt(this.question.answers.length)) {
        this.question.answered = true
      }
      console.log(this.dropped, this.question.answers.length);
    },
    finish () {
      alert('Finished!')
    }
  },
  props: {
    exercise : Object
  },
  components: {
    VideoPlayer
  },
  watch: {
    'exercise.questions': function (questions) {
      this.setCurrent(questions)
      this.ended = false
    },
    'exercise': function (exercise) {
      console.log(exercise)
    }
  },
  mounted () {
    this.setCurrent(this.exercise.questions)
    console.log(this.ended);
  }
}
</script>
<style lang="scss" scoped>

.answer {
  border: 1px solid #ddd;
  background-color: #ff9c00;
  border-radius: 20px;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    cursor: -webkit-grab;
    cursor: grab;
  }
  &:active {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
}

.category {
  border: 1px solid #ddd;
  background-color: #ddd;
  border-radius: 20px;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
  &:focus {
    border-color: #ff9c00;
  }
}

.right {
  background-color: green;
}

.wrong {
  background-color: red;
}

.selected {
  font-weight: bold;
  cursor: not-allowed !important;
}
</style>
