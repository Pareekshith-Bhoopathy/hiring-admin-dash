import React from 'react';

interface Column {
  header: string;
  accessor: string;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="p-2 text-left text-sm font-semibold text-gray-600">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200">
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="p-2 text-sm"
                  data-label={column.header}
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable;