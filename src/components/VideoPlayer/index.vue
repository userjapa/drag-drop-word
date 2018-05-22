<template>
  <div id="player" class="view-player">
    <PlyrVideo poster=""
               :videos="[ { src: exercise.video, format: 'mp4' }]"
               ref="video"
               :emit="['timeupdate', 'playing', 'pause']"
               @timeupdate="timeUpdated"
               @playing="play"
               @pause="pause"
               :controls="controls"/>
  </div>
</template>
<script>
import { PlyrVideo } from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

const controls = [
  'restart',
  'play',
  'progress',
  'current-time',
  'duration',
  'volume'
]

export default {
  name: "VideoPlayer",
  data () {
    return {
      controls: [
        'restart',
        'play',
        'progress',
        'current-time',
        'duration',
        'volume'
      ],
      loaded: false,
      isPlaying: false,
      duration: 0,
      currentTime: 0,
      oldTime: null,
      volume: 1,
      ended: false,
      interruption: null,
      answered: false,
      first: true,
    }
  },
  methods: {
    play () {
      if (this.interruption) {
        if (!this.first) {
          if (!this.ended) {
            if (!this.answered) {
              this.pause()
              alert('Answer first!')
              return
            }
          }
        }
      }
      this.isPlaying = true
      console.log(this.isPlaying);
      return this.$refs['video'].$refs['video'].play()
    },
    end () {
      this.ended = true
    },
    answer () {
      this.answered = true
      this.first = true
    },
    setInterruption (time) {
      this.answered = false
      this.interruption = parseFloat(time)
    },
    timeUpdated () {
      if (this.interruption) {
        const time = this.getCurrentTime()
        if (this.oldTime === null) this.oldTime = time
        else this.oldTime = this.currentTime
        this.currentTime = time
        if (this.interruption >= 0) {
          if ((this.interruption >= this.oldTime) && (this.interruption <= this.currentTime)) {
            if (this.first) this.first = false
            this.pause()
          }
        }
      }
    },
    getCurrentTime () {
      return this.$refs['video'].$refs['video'].currentTime
    },
    pause () {
      console.log('paused');
      this.$refs['video'].$refs['video'].pause()
      this.isPlaying = false
      console.log(this.isPlaying);
    },
    getVideo (exercise) {
      setTimeout(() => {
        const source = exercise.video
        if (source && source.indexOf('upload_') >= 0) {
          const splitted = source.split('/')
          const name = splitted.pop()
          this.$store.dispatch('file/get', { name: name, type: 'video' })
            .then(() => {
              const audio = this.$store.getters['file/getFile']
              const objectURL = window.URL.createObjectURL(audio)
              this.$refs['video'].$refs['video'].src = objectURL
              this.$refs['video'].$refs['video'].load()
            })
        } else {
          this.$refs['video'].$refs['video'].src = source
          this.$refs['video'].$refs['video'].load()
        }
      }, 0)
    }
  },
  props: [
    `exercise`
  ],
  components: {
    PlyrVideo
  },
  watch: {
    'exercise.video': function () {
      this.getVideo(this.exercise)
    }
  },
  mounted() {
    this.getVideo(this.exercise)
  }
}
</script>
<style lang="scss" scoped>
.view-player {
  width: 100%;
  height: 100%;
}
</style>
