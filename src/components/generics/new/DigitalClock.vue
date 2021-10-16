<template>
    <div class="digital_clock">
      <div class="hour">
        <div class="time">
          <span>{{ hour }}</span>
          <span class="float-right">
            Hour
          </span>
        </div>
      </div>
      <span id="dot">:</span>
      <div class="hour">
        <div class="time">
          <span>{{ minute }}</span>
          <span class="float-right">
            Min
          </span>
        </div>
      </div>
      <span id="dot">:</span>
      <div class="hour">
        <div class="time">
          <span>{{ second }}</span>
          <span class="float-right">
            Sec
          </span>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'DigitalClock',
  data() {
    return {
      hour: '0',
      minute: '0',
      second: '0',
    };
  },
  methods: {
    clock() {
      setInterval(() => {
        const timeKati = new Date().getTime();
        const extract = new Date(timeKati);
        this.hour = extract.getHours();
        this.minute = extract.getMinutes();
        this.second = extract.getSeconds();
      }, 1000);
    },
  },
  mounted() {
    const inc = 1000;
    this.clock();
    setInterval(this.clock, inc);
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.digital_clock {
  min-height: 150px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  margin: 25px;
  background-color: #2e5772;
  border-radius: 10px;

  #dot {
    display: flex;
    align-items: center;
    font-size: 30px;
    font-weight: bolder;
    background-color: #2e5772;
    color: white;
  }

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-items: center;
    align-items: center;
    background-color: $blue;
    color: $white;
    font-size: 32px;

    .time {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
  }
}
</style>
