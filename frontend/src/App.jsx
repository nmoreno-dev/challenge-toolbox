import React, { useState } from 'react';
import MainTable from './components/MainTable';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import { useFileData, useFileList } from './hooks/files.hook';

function App() {
  const [selectedFileName, setSelectedFileName] = useState(null);

  const { list, isLoading: isFileListLoading, error: listError } = useFileList();
  const { data: filesData, isLoading: isFileDataLoading } = useFileData(selectedFileName);

  return (
    <div>
      <h1>Hello, React!</h1>
      {!isFileListLoading && list && (
        <Container>
          <Container>
            <span>
              <h2>Select a file</h2>
              <Dropdown>
                <Dropdown.Toggle
                  variant={!!listError ? 'danger' : 'success'}
                  id="dropdown-basic"
                  disabled={!!listError}
                >
                  {selectedFileName || 'All Files'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {list.map((item, i) => (
                    <Dropdown.Item
                      key={i}
                      eventKey={i + 1}
                      onClick={(e) => setSelectedFileName(e.target.innerText.split('.')[0])}
                    >
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </Container>
          <Container>
            {isFileDataLoading ? <h1>Loading...</h1> : filesData && <MainTable files={filesData} />}
          </Container>
        </Container>
      )}
    </div>
  );
}

export default App;
