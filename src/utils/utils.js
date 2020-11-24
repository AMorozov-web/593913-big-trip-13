import dayjs from "dayjs";
import {RenderPositions} from '../consts/consts';

const getRandomInt = (min = 0, max = 1) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

const getRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const shuffleArr = (arr) => {
  const newArr = arr.slice();

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
};

const getRandomArr = (arr) => {
  const randomArr = [];

  if (arr.length !== 0) {
    const count = getRandomInt(1, arr.length);
    const elements = shuffleArr(arr);

    for (let i = 0; i < count; i++) {
      randomArr.push(elements[i]);
    }
  }

  return randomArr;
};

const capitalizeFirstLetter = (str) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

const getTwoDigits = (number) => {
  return number.toString().length === 1 ? `0${number}` : `${number}`;
};

const calcDuration = (begin, end) => {
  const durationInMinutes = dayjs(end).diff(begin, `minutes`);
  const durationInHours = Math.floor(durationInMinutes / 60);
  const durationInDays = Math.floor(durationInHours / 24);

  if (durationInMinutes < 60) {
    return `${getTwoDigits(durationInMinutes)}M`;
  } else if (durationInMinutes >= 60 && durationInMinutes < 1439) {
    return `${getTwoDigits(durationInHours)}H ${getTwoDigits(+durationInMinutes - durationInHours * 60)}M`;
  } else {
    return `${getTwoDigits(durationInDays)}D ${getTwoDigits(+durationInHours - durationInDays * 24)}H
            ${getTwoDigits(+durationInMinutes - durationInHours * 60)}M`;
  }
};

const render = (container, template, place = RenderPositions.BEFORE_END) => {
  container.insertAdjacentHTML(place, template);
};

export {
  getRandomInt,
  getRandomElement,
  getRandomArr,
  capitalizeFirstLetter,
  calcDuration,
  render,
};
