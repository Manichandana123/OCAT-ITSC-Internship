import React, { useEffect, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRowSelect, useSortBy, useTable } from 'react-table';

import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);
  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, []);

  const data = useMemo(() => assessments, [ assessments ]);

  const columns = useMemo(() => [
    {
      Header: `Assessment ID`,
      accessor: `id`,
    },
    {
      Header: `Name`,
      accessor: `catName`,
    },
    {
      Header: `InstrumentType`,
      accessor: `instrumentType`,
    },
    {
      Header: `Score`,
      accessor: `score`,
    },
    {
      Header: `Risk Level`,
      accessor: `riskLevel`,
    },
    {
      Header: `Created At`,
      accessor: `createdAt`,
    },
    {
      Header: `Updated At`,
      accessor: `updatedAt`,
    },
  ], []);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data }, useSortBy, useRowSelect);

  return (
    <div>
      <h1>Assessment List</h1>
      <table {...getTableProps()} className="table table-striped">
        <thead>
          {headerGroups.map((headerGroup) =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) =>
                <th {...column.getHeaderProps()}>
                  {column.render(`Header`)}
                </th>)}
            </tr>)}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) =>
                  <td {...cell.getCellProps()}>{cell.render(`Cell`)}</td>)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

};
