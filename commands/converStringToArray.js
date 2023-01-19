export const convertStringToArray = (string) => {
  let newArray = string.split("mnm");

  for (let i = 0; i < newArray.length; i++) {
    if (!newArray[i].endsWith("cc") && newArray[i].length < 21) {
      newArray[i] = "";
    }
  }

  newArray = newArray.filter((ele) => ele !== "");
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i + 1]) {
      if (newArray[i].endsWith("cc") && newArray[i + 1].endsWith("cc")) {
        newArray[i] = "";
      }
    }

    if (i === newArray.length - 1) {
      if (newArray[i].endsWith("cc")) {
        newArray[i] = "";
      }
    }
  }

  return newArray.filter((ele) => ele !== "");
};
