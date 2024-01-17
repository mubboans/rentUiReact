// import { useMemo } from "react";
// import { TableProps } from "../../interface/users";
// import { useTable } from "react-table";
// const Table = ({ columnArr, dataArray }: TableProps) => {
//   const columns = useMemo(() => columnArr, []);
//   const data = useMemo(() => dataArray, []);
//   const TableInstance = useTable({
//     columns,
//     data
//   });
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     TableInstance;
//   return (
//     <table {...getTableProps()}>
//       <thead>
//         <tr>
//           <th></th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th></th>
//         </tr>
//       </tbody>
//     </table>
//   );
// };

import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  tableCellClasses,
  IconButton
  // Button,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogContentText,
  // DialogTitle,
  // TextField
} from "@mui/material";

// export default Table;

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
// import { useState } from "react";
type tableProps = {
  rows: string[] | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any[] | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any[] | null | undefined;
};
const TableHelper = ({ rows, columns, action }: tableProps) => {
  //   const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  //   const [selectedItem, setSelectedItem] = useState(null);
  //   const [fieldValues,setfieldValues] =  useState(null);
  //   const handleClose = () => {
  //     setEditModalOpen(() => isEditModalOpen = !isEditModalOpen);
  // }
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0
    }
  }));
  // const showModal = (open:boolean,btndata,data) => {

  // }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns &&
              columns.map((column) => (
                <StyledTableCell key={column} align="center">
                  {column.toUpperCase()}
                </StyledTableCell>
              ))}
            {action && action.length > 0 && (
              <StyledTableCell align="center">Action</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row, index) => (
              <StyledTableRow key={index}>
                {columns &&
                  columns.map((column) => (
                    <StyledTableCell
                      align="center"
                      key={column}
                      component="th"
                      scope="row"
                    >
                      {row[column]}
                    </StyledTableCell>
                  ))}

                {action && action.length > 0 && (
                  <StyledTableCell align="center">
                    {action.map((d, index) => (
                      <IconButton key={index} onClick={() => d.onclick(row)}>
                        {d.icons}
                      </IconButton>
                    ))}
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          {/* <StyledTableCell align="right">{row.calories}</StyledTableCell>
        <StyledTableCell align="right">{row.fat}</StyledTableCell>
        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
        <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableHelper;
