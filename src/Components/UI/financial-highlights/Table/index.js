import React from "react";
import { useTable,useExpanded } from "react-table";
import Table from "react-bootstrap/Table";

const FinancialTable = ({ columns, data }) => {

        //  console.log("columns3", columns)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data
      },
      useExpanded );


      return (
        <Table {...getTableProps()}>
          <thead>
            {headerGroups.slice(0,1).map(headerGroup => (
              <tr >
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} >
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()} >{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      );

}

export default FinancialTable;
