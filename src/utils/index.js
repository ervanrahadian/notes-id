export const getData = () => {
  if (localStorage.hasOwnProperty("data")) {
    return JSON.parse(localStorage.getItem("data"));
  } else {
    return [];
  }
};

export const resizeAddBox = (addedData, setAddedData) => {
  let newData = { ...addedData };

  if (newData.isResize) {
    newData.isResize = false;
  } else {
    newData.isResize = true;
  }

  setAddedData(newData);
};

export const addData = (data, setData, addedData, setAddedData) => {
  let newData = [...data];

  newData = [
    { note: addedData.note, isDone: false, isResize: false },
    ...newData,
  ];

  localStorage.setItem("data", JSON.stringify(newData));

  setData(newData);

  setAddedData({ note: "", isResize: false });
};

export const resizeEditBox = (data, setData, index) => {
  let newData = [...data];

  if (newData[index].isResize) {
    newData[index].isResize = false;
  } else {
    newData[index].isResize = true;
  }

  localStorage.setItem("data", JSON.stringify(newData));

  setData(newData);
};

export const editData = (data, setData, event, index) => {
  let newData = [...data];

  newData[index].note = event;

  localStorage.setItem("data", JSON.stringify(newData));

  setData(newData);
};

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
