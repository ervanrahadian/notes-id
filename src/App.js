import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addData,
  deleteData,
  editData,
  getData,
  resizeAddBox,
  resizeEditBox,
  updateStatusData,
} from "./utils";
import "./App.css";

library.add(fas);

function App() {
  const [data, setData] = useState(getData());
  const [addedData, setAddedData] = useState({
    note: "",
    isResize: false,
  });

  return (
    <>
      <div className="nav margin-bottom-20">
        <h1 className="white">
          <FontAwesomeIcon icon="fa-solid fa-list-check" /> Notes.id
        </h1>
      </div>

      <div className="body margin-bottom-20">
        <div className="center-block">
          <div
            className="blue resize-box right-flex"
            onClick={() => resizeAddBox(addedData, setAddedData)}
          >
            {addedData.isResize ? (
              <FontAwesomeIcon icon="fa-solid fa-compress" />
            ) : (
              <FontAwesomeIcon icon="fa-solid fa-expand" />
            )}
          </div>

          <textarea
            className={`input-text input-text-add ${
              addedData.isResize && "input-text-resize"
            } margin-10`}
            placeholder="Write your note right here"
            value={addedData.note}
            onChange={(e) =>
              setAddedData({ ...addedData, note: e.target.value })
            }
          />

          <button
            className={
              addedData.note === ""
                ? "grey btn btn-add btn-add-inactive margin-10"
                : "blue btn btn-add btn-add-active margin-10"
            }
            disabled={addedData.note === "" ? true : false}
            onClick={() => addData(data, setData, addedData, setAddedData)}
          >
            <FontAwesomeIcon icon="fa-solid fa-plus" /> Add
          </button>
        </div>

        <h2 className="margin-10">Your Notes:</h2>

        {data.length > 0 ? (
          data.map((singleData, index) => (
            <div className="center-block margin-10" key={index}>
              <div
                className={`${
                  singleData.isDone ? "green" : "orange"
                } resize-box right-flex`}
                onClick={() => resizeEditBox(data, setData, index)}
              >
                {singleData.isResize ? (
                  <FontAwesomeIcon icon="fa-solid fa-compress" />
                ) : (
                  <FontAwesomeIcon icon="fa-solid fa-expand" />
                )}
              </div>

              <textarea
                className={`${
                  singleData.isDone
                    ? "input-text input-text-done"
                    : "input-text input-text-ongoing"
                } ${singleData.isResize && "input-text-resize"} margin-10`}
                placeholder="Oops, your note is empty"
                value={singleData.note}
                onChange={(event) =>
                  editData(data, setData, event.target.value, index)
                }
              />

              <div className="center-flex">
                <select
                  className={
                    singleData.isDone
                      ? "green input-select input-select-done margin-10"
                      : "orange input-select input-select-ongoing margin-10"
                  }
                  value={singleData.isDone}
                  onChange={(event) =>
                    updateStatusData(data, setData, event.target.value, index)
                  }
                >
                  <option value={false}>Ongoing</option>
                  <option value={true}>Done</option>
                </select>

                <button
                  className="red btn btn-delete margin-10"
                  onClick={() => deleteData(data, setData, index)}
                >
                  <FontAwesomeIcon icon="fa-solid fa-trash" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="center-block margin-10">
            <h3>Empty, please add your first note</h3>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
