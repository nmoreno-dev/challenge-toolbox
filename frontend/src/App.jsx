import React, { useState } from 'react';
import MainTable from './components/MainTable';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import { useFileData, useFileList } from './hooks/files.hook';

function App() {
  const [selectedFileName, setSelectedFileName] = useState(null);

  const { list, isLoading: isFileListLoading, error: listError } = useFileList();
  const {
    data: filesData,
    isLoading: isFileDataLoading,
    error: filesDataError,
  } = useFileData(selectedFileName);

  return (
    <div className="background">
      <div className="main-card">
        <span className="header">
          <span>File selected:</span>
          {isFileDataLoading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <Dropdown>
              <Dropdown.Toggle
                variant={!!listError ? 'danger' : 'success'}
                id="dropdown-basic"
                disabled={!!listError}
              >
                {!!listError ? 'Cannot get fle list' : selectedFileName || 'All Files'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey={0} onClick={(e) => setSelectedFileName(null)}>
                  All Files
                </Dropdown.Item>
                {list.map((item, i) => (
                  <Dropdown.Item
                    key={i}
                    eventKey={i + 1}
                    onClick={(e) => setSelectedFileName(e.target.innerText)}
                  >
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </span>
        <div className="table-container">
          {!!filesDataError ? (
            <div className="error-container">
              <span className="warin-emoji">⚠️</span>
              <h1>Oh No! An error occurred while getting file data!</h1>
              <p>Try selecting other file.</p>
            </div>
          ) : (
            filesData && <MainTable files={filesData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
