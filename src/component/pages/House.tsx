/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axiosConfig from "../../helper/authApi";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

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
  TextField,
  Grid
} from "@mui/material";
import { ChangeUserSession } from "../../helper/localhelper";
import { Houses } from "../../interface/Category";
// import { House } from "@mui/icons-material";
// import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
type houseState = {
  columnArr: string[] | null;
  rows: any[] | null;
};
type dialogState = {
  title: string | null;
  open: boolean;
  type: string;
};
const House = () => {
  const [modalData, setModalData] = useState<dialogState>({
    title: "Category",
    open: false,
    type: "post"
  });
  const dispatch = useDispatch();
  const [houseObj, setCurrObj] = useState<Houses>({});
  const [houseArr, setCategory] = useState<houseState | null>(null);

  const fetchHouses = async () => {
    try {
      const response = await axiosConfig.get("/property");
      const rows = response?.data?.data as Houses[] | null;
      const allKeys = rows
        ? [...new Set(rows.flatMap((obj) => Object.keys(obj)))]
        : null;
      // console.log(rows, allKeys);

      setCategory((e) => ({
        ...e,
        rows: rows,
        columnArr: allKeys
      }));

      console.log(houseArr, "categoryArr");
    } catch (error) {
      console.log(error);
      //   ChangeUserSession(dispatch, true);
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
      title: "Add New House/Property",
      type: "post"
    });
    setCurrObj({});
  };
  const handleedit = (itemId: any) => {
    setCurrObj({ ...itemId });
    setModalData({
      ...modalData,
      open: true,
      title: "Edit House/Property",
      type: "put"
    });
  };
  const handleDelete = (itemId: any) => {
    querydata("delete", itemId);
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
  const querydata = async (type: string, obj: Houses) => {
    try {
      let response;
      const data = {
        housename: obj.housename,
        description: obj.description,
        price: obj.price,
        aggreementDate: obj.aggreementDate,
        deposit: obj.deposit,
        status: obj.status,
        remarks: obj.remarks
      };
      if (type == "post") {
        response = await axiosConfig.post("/property", obj);
      } else if (type == "put") {
        response = await axiosConfig.put("/property", data, {
          params: {
            _id: obj._id
          }
        });
      } else {
        response = await axiosConfig.delete("/property", {
          params: { _id: obj._id }
        });
      }
      fetchHouses();
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
    fetchHouses();
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
            if (houseObj._id) {
              querydata("put", houseObj);
            } else {
              querydata("post", houseObj);
            }
            // btndata.onclick()
          }
        }}
      >
        <DialogTitle>{modalData.title}</DialogTitle>
        <DialogContent>
          <Grid
            container
            columns={{ xs: 12, md: 12 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            // style={{ margin: "10px" }}
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={6}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                autoFocus
                required
                error
                margin="dense"
                name="housename"
                label="Enter House Description"
                type="text"
                fullWidth
                value={houseObj?.description}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const description = e.target.value;
                  setCurrObj((x) => ({ ...x, description: description }));
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                autoFocus
                required
                error
                margin="dense"
                name="housename"
                label="Enter House Name"
                type="text"
                fullWidth
                value={houseObj?.housename}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const newName = e.target.value;
                  setCurrObj((x) => ({ ...x, housename: newName }));
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                autoFocus
                required
                error
                margin="dense"
                name="housename"
                label="Enter House Price"
                type="number"
                fullWidth
                value={houseObj?.price}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setCurrObj({ ...houseObj, price: parseFloat(value) });
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  value={
                    houseObj?.aggreementDate
                      ? houseObj?.aggreementDate
                      : moment()
                  }
                  onChange={(e: any) => {
                    const value = e;
                    setCurrObj({
                      ...houseObj,
                      aggreementDate: value
                    });
                  }}
                  label="Basic date picker"
                />
              </LocalizationProvider>
              {/* <TextField
                autoFocus
                required
                error
                margin="dense"
                name="housename"
                label="Enter Aggreement-Date"
                type="date"
                fullWidth
                value={houseObj?.aggreementDate}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setCurrObj({ ...houseObj, aggreementDate: value });
                }}
              /> */}
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                autoFocus
                required
                margin="dense"
                name="housename"
                label="Enter House Deposit"
                type="number"
                fullWidth
                value={houseObj?.deposit}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setCurrObj({ ...houseObj, deposit: parseFloat(value) });
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                autoFocus
                required
                margin="dense"
                name="housename"
                label="Enter Remark"
                type="text"
                fullWidth
                value={houseObj?.remarks}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setCurrObj({ ...houseObj, remarks: value });
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                autoFocus
                required
                margin="dense"
                name="housename"
                label="Enter House Status"
                type="text"
                fullWidth
                value={houseObj?.status}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setCurrObj({ ...houseObj, status: value });
                }}
              />
            </Grid>
          </Grid>
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
            columns={houseArr?.columnArr}
            rows={houseArr?.rows}
            action={ActionBtn}
          />
        }
      ></CardLayout>
    </div>
  );
};

export default House;
