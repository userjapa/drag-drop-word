export default {
  setExercise (state, exercise) {
    state.exercise = exercise
  },
  addQuestion (state, question) {
    state.exercise.questions.push(question)
  },
  setToUpdate (state, id) {
    state.toUpdate = id
  },
  update (state, question) {
    state.exercise.questions[state.toUpdate] = question
  }
}
