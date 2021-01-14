const randInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
const randRange = (max, min) => Math.random() * (max - min) + min

const randVal = (arr) => arr[randInt(0, arr.length - 1)]

export { randVal, randRange, randInt }