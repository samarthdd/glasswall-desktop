import React          from 'react';
import * as Utils     from '../../utils/utils'
import                 './FileAnalysis.css';

function original_extension(file_name:string) {
    return file_name?.split('.').pop()
}

type Attributes ={
  file_name           : string;
  file_size           : number;
  file_mime           : string| undefined;
  file_type           : string| undefined;
  original_file_size  : number;
  file_version        : string| undefined;
}



function FileAttributes({file_name, file_size, file_mime, file_type, original_file_size, file_version}:Attributes) {
  return(
    <div className="file-attributes table-container">
      <h1 className="table-header">File Attributes</h1>
      <table>
        <tbody className="table-body">
          <tr>
            <td><b>File Name: </b></td>
            <td>{file_name}</td>
          </tr>
          <tr>
            <td><b>File Size (Original): </b></td>
            <td>{Utils.file_size_as_string(original_file_size)} </td>
          </tr>
          <tr>
              <td><b>File Size (Rebuild): </b></td>
              <td>{Utils.file_size_as_string(file_size)}</td>
          </tr>
          <tr>
              <td><b>File Mime Type: </b></td>
              <td>{file_mime}</td>
            </tr>
            <tr>
                <td><b>File Extension (Original): </b></td>
                <td>{original_extension(file_name)}</td>
            </tr>
            <tr>
                <td><b>File Extension (Rebuild): </b></td>
                <td>{file_type}</td>
            </tr>
          <tr>
            <td><b>File Version: </b></td>
            <td>{file_version}</td>
          </tr>
        </tbody>
      </table>
    </div>)
}

export default FileAttributes;
