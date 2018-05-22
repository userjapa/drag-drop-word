export default {
  getExercise ({ exercise }) {
    return exercise
  },
  isToUpdate ({ toUpdate }) {
    if (toUpdate === null) return true
    else return false
  }
}
