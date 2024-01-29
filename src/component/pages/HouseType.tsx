/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axiosConfig from "../../helper/authApi";
import { Category } from "../../interface/Category";
import { ShowToast } from "../../helper/ToastHelper";
import { useDispatch } from "react-redux";
import TableHelper from "./TableHelper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CardLayout from "./CardLayout";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
// import { ChangeUserSession } from "../../helper/localhelper";
// import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
type categoryState = {
  columnArr: string[] | null;
  rows: any[] | null;
};
type dialogState = {
  title: string | null;
  open: boolean;
  type: string;
};
const HouseType = () => {
  const [modalData, setModalData] = useState<dialogState>({
    title: "Category",
    open: false,
    type: "post"
  });
  const dispatch = useDispatch();
  const [currObj, setCurrObj] = useState<Category>({});
  const [categoryArr, setCategory] = useState<categoryState | null>(null);

  const fetchHouseCategory = async () => {
    try {
      const response = await axiosConfig.get("/category");
      const rows = response?.data?.data as Category[] | null;
      const allKeys = rows
        ? [...new Set(rows.flatMap((obj) => Object.keys(obj)))]
        : null;
      // console.log(rows, allKeys);

      setCategory((e) => ({
        ...e,
        rows: rows,
        columnArr: allKeys
      }));

      console.log(categoryArr, "categoryArr");
    } catch (error) {
      console.log(error);
      // ChangeUserSession(dispatch, true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ShowToast(dispatch, error?.response?.data?.message, "error");
    }
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    setModalData({
      ...modalData,
      open: true,
      title: "Add New Category",
      type: "post"
    });
    setCurrObj({});
  };
  const handleedit = (itemId: any) => {
    setCurrObj({ ...itemId });
    setModalData({
      ...modalData,
      open: true,
      title: "Edit Category",
      type: "put"
    });
    // Handle delete action for the specific item
    console.log(`Edit item with ID `, itemId);
  };
  const handleDelete = (itemId: any) => {
    // Handle delete action for the specific item
    querydata("delete", itemId);
    console.log(`Delete item with ID`, itemId);
  };
  const handleClose = () => {
    setModalData({
      ...modalData,
      open: false,
      title: modalData.title,
      type: "post"
    });
  };
  // const AddNew = async () => {
  //   const response = await axiosConfig.post("/category", currObj);
  //   fetchHouseCategory();
  //   setModalData({ ...modalData, open: false, title: "Cateogory",type:"post" });
  // };
  const querydata = async (type: string, obj: Category) => {
    try {
      let response;
      const data = {
        categoryname: obj.categoryname
      };
      if (type == "post") {
        response = await axiosConfig.post("/category", obj);
      } else if (type == "put") {
        response = await axiosConfig.put("/category", data, {
          params: {
            _id: obj._id
          }
        });
      } else {
        response = await axiosConfig.delete("/category", {
          params: { _id: obj._id }
        });
      }
      fetchHouseCategory();
      setModalData({
        ...modalData,
        open: false,
        title: modalData.title,
        type: "post"
      });
      ShowToast(dispatch, response?.data?.message, "success");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ShowToast(dispatch, error?.response?.data?.message, "error");
    }
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

  // }
  return (
    <div>
      <Dialog
        open={modalData?.open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (currObj._id) {
              querydata("put", currObj);
            } else {
              querydata("post", currObj);
            }
            // btndata.onclick()
          }
        }}
      >
        <DialogTitle>{modalData.title}</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Enter Category"
            value={currObj?.categoryname}
            variant="outlined"
            required
            fullWidth
            type="text"
            margin="dense"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newName = e.target.value;
              setCurrObj((x) => ({ ...x, categoryname: newName }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>

      <CardLayout
        title={"House Category"}
        onSubmit={onSubmit}
        tableComponent={
          <TableHelper
            columns={categoryArr?.columnArr}
            rows={categoryArr?.rows}
            action={ActionBtn}
          />
        }
      ></CardLayout>
    </div>
  );
};

export default HouseType;
