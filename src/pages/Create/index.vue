<template>
  <div class="container column">
    <div class="item">
      <h2>Create</h2>
    </div>
    <div class="item">
      <div class="container">
        <div class="item">
          <DragNDrop :exercise="copyExercise"/>
        </div>
      </div>
      <div class="container item-border">
        <div class="item flex-basis-600 item-border">
          <div class="container">
            <div class="item flex-basis-100">
              <b>Index</b>
            </div>
            <div class="item flex-basis-100">
              <b>Categories</b>
            </div>
            <div class="item flex-basis-100">
              <b>Answers</b>
            </div>
            <div class="item flex-basis-200">
              <b>Options</b>
            </div>
          </div>
          <div class="container" v-for="(qst, index) in exercise.questions">
            <div class="item flex-basis-100">
              {{ index + 1 }})
            </div>
            <div class="item flex-basis-100">
              {{ qst.categories.length }}
            </div>
            <div class="item flex-basis-100">
              {{ qst.answers.length }}
            </div>
            <div class="item flex-basis-200">
              <button class="btn btn-primary small" :disabled="!$store.getters['isToUpdate']" @click="edit(qst, index)">Edit</button>
              <button class="btn btn-danger small" :disabled="!$store.getters['isToUpdate']" @click.prevent="$delete(exercise.questions, index)">Remove</button>
            </div>
          </div>
        </div>
        <div class="item flex-basis-600 item-border">
          <div class="container column">
            <div class="item align-self-end">
              <button class="btn btn-success"
                      @click="$store.commit('setExercise', exercise)"
                      v-if="$store.getters['isToUpdate']">Save</button>
              <button class="btn btn-primary"
                      @click="update(question)"
                      v-if="!$store.getters['isToUpdate']">Update</button>
              <button class="btn btn-danger"
                      @click="cancel()"
                      v-if="!$store.getters['isToUpdate']">Cancel</button>
            </div>
            <div class="item">
              <div class="container" v-if="$store.getters['isToUpdate']">
                <div class="item flex-basis-75 align-self-center">
                  <label for="exercise_video">Video Source</label>
                </div>
                <div class="item flex-basis-375">
                  <input class="input" id="exercise_video" type="file" @change="videoChanged($event.target.files)">
                </div>
              </div>
              <form v-on:submit.prevent="addCategory(category)">
              <div class="container column">
                <div class="item">
                  <div class="container row no-wrap no-margin-left no-padding">
                    <div class="item flex-basis-100 no-padding">
                      <button class="btn btn-primary add middle" name="button">Add Category</button>
                    </div>
                    <div class="item flex-basis-400 no-padding">
                      <input class="input add middle" id="exercise_category" type="text" v-model="category.type" required>
                    </div>
                  </div>
                </div>
              </div>
              </form>
              <div class="container column">
                <div class="item" v-for="(cat, index) in question.categories">
                  <div class="container no-padding margin-left-50">
                    <div class="item flex-basis-400 no-padding">
                      <input class="input" type="text" v-model="cat.type">
                    </div>
                    <div class="item flex-basis-100 no-padding">
                      <button class="btn btn-danger" @click="$delete(question.categories, index)">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="container">
                <div class="item flex-basis-100 align-self-center">
                  <label for="exercise_answer">Answer</label>
                </div>
                <div class="item flex-basis-400">
                  <input class="input" id="exercise_answer" type="text" v-model="answer.text">
                </div>
              </div>
              <div class="container">
                <div class="item flex-basis-100 align-self-center">
                  <label for="exercise_answer">Answer Category</label>
                </div>
                <div class="item flex-basis-400">
                  <select class="input" id="exercise_answer" v-model="answer.category">
                    <option v-for="(cat, index) in question.categories" :key="`category-${index}`" :value="cat.type">{{ cat.type }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="item">
              <button class="btn btn-primary" name="button" @click="addAnswer(answer)">Add Answer</button>
            </div>
            <div class="item">
              <div class="container column">
                <div class="item" v-for="(aswr, index) in question.answers">
                  <div class="container">
                    <div class="item flex-basis-200">
                      <input class="input" type="text" v-model="aswr.text">
                    </div>
                    <div class="item flex-basis-200">
                      <select class="input" id="exercise_answer" v-model="aswr.category">
                        <option v-for="(cat, index) in question.categories" :key="`category-${index}`" :value="cat.type">{{ cat.type }}</option>
                      </select>
                    </div>
                    <div class="item flex-basis-100">
                      <button class="btn btn-danger" @click="$delete(question.answers, index)">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item" v-if="$store.getters['isToUpdate']">
              <button class="btn btn-success" @click="addQuestions(question)">Add Question</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DragNDrop from '@/components/DragNDrop'

export default {
  name: "Create",
  data () {
    return {
      copyExercise: {},
      question: {
        answers: [
          { text: 'Chocolate', category: 'Junk', selected: false },
          { text: 'Lettuce', category: 'Vegetables', selected: false },
          { text: 'Hamburger', category: 'Meat', selected: false },
          { text: 'Carrot', category: 'Vegetables', selected: false }
        ],
        categories: [
          { type: 'Junk', answers: [] },
          { type: 'Meat', answers: [] },
          { type: 'Vegetables', answers: [] }
        ]
      },
      category: {
        type: ''
      },
      answer: {
        text: '',
        category: '',
        correct: false
      }
    }
  },
  methods: {
    save (exercise) {
      this.$store.commit('setExercise', exercise)
    },
    edit (question, id) {
      this.$store.commit('setToUpdate', id)
      this.question = question
    },
    update (question) {
      this.$store.commit('update', question)
      this.cancel()
    },
    cancel () {
      this.$store.commit('setToUpdate', null)
      this.question = {
        answers: [],
        categories: []
      }
    },
    addCategory (category) {
      this.question.categories.push(category)
      this.category = {
        type: ''
      }
    },
    addAnswer (answer) {
      if (answer.text !== '' && answer.category !== '' ) {
        this.question.answers.push(answer)
        this.answer = {
          text: '',
          category: '',
          correct: false
        }
      }
    },
    addQuestions (question) {
      this.$store.commit('addQuestion', question)
      this.question = {
        hit: false,
        answered: false,
        answers: [],
        categories: []
      }
    },
    videoChanged (files) {
      if (files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.exercise.video = e.target.result
        };
        reader.readAsDataURL(files[0])
        this.video = files[0]
        console.log(this.video);
      } else {
        this.video = null
      }
    }
  },
  computed: {
    exercise () {
      return { ...this.$store.getters['getExercise'] }
    }
  },
  components: {
    DragNDrop
  },
  watch: {
    exercise: function (exercise) {
      this.copyExercise = {...exercise}
    }
  },
  mounted () {
    this.copyExercise = {...this.exercise}
  }
}
</script>
<style lang="scss" scoped>
.btn.add {
    border-radius: 25px 0 0 25px;
    font-size: 14px;
    padding: 10.25px 17px;
    width: 100%;
}
.input.add {
    border-radius: 0 5px 5px 0;
}

.btn.small {
  padding: 10px 9px;
  font-size: 12px;
}
</style>
