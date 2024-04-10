import React from 'react';
import Table from 'react-bootstrap/Table';

const MainTable = ({ files }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {files.map((fileData, i) =>
          fileData.lines.map((line, j) => (
            <tr key={i + '' + j + ''}>
              <td>{fileData.file}</td>
              <td>{line.text}</td>
              <td>{line.number}</td>
              <td>{line.hex}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default MainTable;
