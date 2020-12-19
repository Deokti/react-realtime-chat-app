import lessTenAddZero from "./less-ten-add-zero";

const timeWhenMessageSent = () => {
  const date = new Date();
  return `${lessTenAddZero(date.getHours())}:${lessTenAddZero(date.getMinutes())}`;
};

export { timeWhenMessageSent };  