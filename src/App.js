import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addData,
  deleteData,
  editData,
  getData,
  updateStatusData,
} from "./utils";
import "./App.css";

library.add(fas);

function App() {
  const [data, setData] = useState(getData());
  const [note, setNote] = useState("");

  return (
    <>
      <div className="nav margin-bottom-20">
        <h1 className="nav-title">
          <FontAwesomeIcon icon="fa-solid fa-list-check" /> Notes.id
        </h1>
      </div>

      <div className="body">
        <div className="center-block">
          <textarea
            className="input-add margin-10"
            placeholder="Write your note right here"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button
            className={
              note === ""
                ? "btn-add-inactive margin-10"
                : "btn-add-active margin-10"
            }
            disabled={note === "" ? true : false}
            onClick={() => addData(data, setData, note, setNote)}
          >
            <FontAwesomeIcon icon="fa-solid fa-plus" /> Add
          </button>
        </div>

        <h2 className="margin-10">Your Notes:</h2>

        {data.length > 0 ? (
          data.map((singleData, index) => (
            <div className="center-block margin-20" key={index}>
              <textarea
                className={
                  singleData.isDone
                    ? "input-done margin-10"
                    : "input-ongoing margin-10"
                }
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
                      ? "input-select-done margin-10"
                      : "input-select-ongoing margin-10"
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
                  className="btn-delete margin-10"
                  onClick={() => deleteData(data, setData, index)}
                >
                  <FontAwesomeIcon icon="fa-solid fa-trash" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h3 className="margin-20">Empty, please add your first note</h3>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
