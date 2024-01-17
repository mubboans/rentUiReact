/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axiosConfig from "../../helper/authApi";
import { Category } from "../../interface/Category";
import { ShowToast } from "../../helper/ToastHelper";
import { useDispatch } from "react-redux";
import TableHelper from "./TableHelper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
type categoryState = {
  columnArr: string[] | null;
  rows: any[] | null;
};
const HouseType = () => {
  //     const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);

  //   const handleClose = () => {
  //     setEditModalOpen(() =>(isEditModalOpen = !isEditModalOpen));
  // }
  const dispatch = useDispatch();

  const [categoryArr, setCategory] = useState<categoryState | null>(null);
  // const [selectedCategory,setSelectedCategory] = useState<string | null>(null);
  const fetchHouseCategory = async () => {
    try {
      const response = await axiosConfig.get("/category");
      const rows = response?.data?.data as Category[] | null;
      const allKeys = rows
        ? [...new Set(rows.flatMap((obj) => Object.keys(obj)))]
        : null;
      console.log(rows, allKeys);

      setCategory((e) => ({
        ...e,
        rows: rows,
        columnArr: allKeys
      }));

      console.log(categoryArr, "categoryArr");
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ShowToast(dispatch, error?.response?.data?.message, "error");
    }
  };
  const handleedit = (itemId: string) => {
    // Handle delete action for the specific item
    console.log(`Edit item with ID ${itemId}`);
  };
  const handleDelete = (itemId: string) => {
    // Handle delete action for the specific item
    console.log(`Delete item with ID ${itemId}`);
  };
  const ActionBtn = [
    {
      icons: <EditIcon />,
      onclick: handleedit,
      title: "Edit"
    },
    { icons: <DeleteOutlineIcon />, onclick: handleDelete }
  ];
  useEffect(() => {
    fetchHouseCategory();
  }, []);
  //   const ShowModal = (btndata) => {
  //     <Dialog
  //           open={isEditModalOpen}
  //     onClose={handleClose}
  //     PaperProps={{
  //       component: 'form',
  //       onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
  //         event.preventDefault();
  //         // btndata.onclick()

  //         handleClose();
  //       },
  //     }}
  //   >
  //       <DialogTitle>{btndata.title}</DialogTitle>
  //     <DialogContent>
  //       {/* <DialogContentText>
  //         To subscribe to this website, please enter your email address here. We
  //         will send updates occasionally.
  //       </DialogContentText> */}

  //     </DialogContent>
  //     <DialogActions>
  //       <Button onClick={handleClose}>Close</Button>
  //       <Button type="submit">{btndata.title}</Button>
  //     </DialogActions>
  //   </Dialog>
  // }
  return (
    <div>
      {/* <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">House Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl> */}
      <TableHelper
        columns={categoryArr?.columnArr}
        rows={categoryArr?.rows}
        action={ActionBtn}
      />
    </div>
  );
};

export default HouseType;
