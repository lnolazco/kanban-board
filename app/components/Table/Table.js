import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ headers, data }) => (
  <table className="table">
    <thead className="table__head">
      <tr>
        {
          headers.map(header => (
            <th key={header}>{header}</th>
          ))
        }
      </tr>
    </thead>
    <tbody className="table__body">
      {data}
    </tbody>
  </table>
);

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Table;
