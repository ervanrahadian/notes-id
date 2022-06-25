export const getData = () => {
  if (localStorage.hasOwnProperty("data")) {
    return JSON.parse(localStorage.getItem("data"));
  } else {
    return [];
  }
};

export const addData = (data, setData, note, setNote) => {
  let newData = [...data];

  newData = [{ note: note, isDone: false }, ...newData];

  localStorage.setItem("data", JSON.stringify(newData));

  setData(newData);

  setNote("");
};

export const editData = (data, setData, event, index) => {
  let newData = [...data];

  newData[index].note = event;

  localStorage.setItem("data", JSON.stringify(newData));

  setData(newData);
};

// export const updateStatusData = (data, setData, index) => {
//   let newData = [...data];

//   if (newData[index].isDone) {
//     newData[index].isDone = false;
//   } else {
//     newData[index].isDone = true;
//   }

//   localStorage.setItem("data", JSON.stringify(newData));

//   setData(newData);
// };

export const updateStatusData = (data, setData, event, index) => {
  let newData = [...data];

  if (event === "true" || event === true) {
    newData[index].isDone = true;
  } else {
    newData[index].isDone = false;
  }

  localStorage.setItem("data", JSON.stringify(newData));

  setData(newData);
};

export const deleteData = (data, setData, index) => {
  let newData = [...data];

  newData.splice(index, 1);

  localStorage.setItem("data", JSON.stringify(newData));

  setData(newData);
};
