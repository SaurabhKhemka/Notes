
import React, { useState } from "react";
import "./index.css";

function NotesApp() {

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [selectedStatus, setselectedStatus] = useState('');
  const [noteListArray, setNoteListArray] = useState([]);

  const addNote = () => {
    if (title && status) {
      noteListArray.unshift({
        title: title,
        status: status,
        priority: status.toLowerCase() === 'active' ? 0 : (status.toLowerCase() === 'completed' ? 1 : 2)
      });
      noteListArray.sort(function (a, b) {
        return a.priority - b.priority;
      });
      setNoteListArray(noteListArray);
      setTitle('');
      setStatus('');
      setselectedStatus('');
    }
  }

  return (
    <div className="layout-column align-items-center justify-content-start">
      <section className="layout-row align-items-center justify-content-center mt-30">
        <input data-testid="input-note-name" type="text" className="large mx-8"
          placeholder="Note Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input data-testid="input-note-status" type="text" className="large mx-8"
          placeholder="Note Status" value={status} onChange={e => setStatus(e.target.value)} />
        <button className="" data-testid="submit-button" onClick={addNote}>Add Note</button>
      </section>

      <div className="mt-50">
        <ul className="tabs">

          <li className={"tab-item slide-up-fade-in " + (selectedStatus === '' ? 'active' : '')} onClick={() => setselectedStatus('')}>All</li>

          <li className={"tab-item slide-up-fade-in " + (selectedStatus === 'active' ? 'active' : '')} data-testid="activeButton" onClick={() => setselectedStatus('active')}>Active</li>

          <li className={"tab-item slide-up-fade-in " + (selectedStatus === 'completed' ? 'active' : '')} data-testid="completedButton" onClick={() => setselectedStatus('completed')}>Completed</li>
        </ul>
      </div >
      <div className="card w-40 pt-30 pb-8">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody data-testid="noteList">
            {
              noteListArray.length > 0 &&
              noteListArray.map((note, index) =>
                (
                  selectedStatus ?
                    (
                      note.status === selectedStatus &&
                      <tr key={index}>
                        <td>{note.title}</td>
                        <td>{note.status}</td>
                      </tr>
                    ) :
                    (
                      <tr key={index}>
                        <td>{note.title}</td>
                        <td>{note.status}</td>
                      </tr>
                    )
                )
              )
            }
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default NotesApp;  
