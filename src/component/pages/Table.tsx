import { useMemo } from "react";
import { TableProps } from "../../interface/users";
import { useTable } from "react-table";
const Table = ({ columnArr, dataArray }: TableProps) => {
  const columns = useMemo(() => columnArr, []);
  const data = useMemo(() => dataArray, []);
  const TableInstance = useTable({
    columns,
    data
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    TableInstance;
  return (
    <table {...getTableProps()}>
      <thead>
        <tr>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th></th>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
