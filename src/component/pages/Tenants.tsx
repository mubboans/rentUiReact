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
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
// import { ChangeUserSession } from "../../helper/localhelper";
import { Category, Houses } from "../../interface/Category";
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
const Tenants = () => {
  const [modalData, setModalData] = useState<dialogState>({
    title: "Tenants",
    open: false,
    type: "post"
  });
  const dispatch = useDispatch();
  const [houseObj, setCurrObj] = useState<Houses>({});
  const [houseArr, setHouseArr] = useState<houseState | null>(null);
  const [category, setCategory] = useState<Category | any>([]);
  const fetchHouses = async () => {
    try {
      const response = await axiosConfig.get("/property");
      const categoryData = await axiosConfig.get("/category");
      const data = categoryData?.data?.data as Category[];
      setCategory(data);
      const rows = response?.data?.data as Houses[] | null;
      const allKeys = rows
        ? [...new Set(rows.flatMap((obj) => Object.keys(obj)))]
        : null;
      // console.log(rows, allKeys);
      const d = rows?.map((x) => {
        return {
          ...x,
          categoryname: x?.categoryDetail?.categoryname
            ? x?.categoryDetail?.categoryname
            : "-"
        };
      });
      setHouseArr((e: any) => ({
        ...e,
        rows: d,
        columnArr: [
          "categoryname",
          "createdAt",
          "housename",
          "description",
          "price",
          "aggreementDate",
          "deposit",
          "status",
          "remarks"
        ]
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
      title: "Add New Tenants",
      type: "post"
    });
    setCurrObj({});
  };
  const handleedit = (itemId: any) => {
    console.log(itemId, "itemId edit");

    setCurrObj({ ...itemId });
    setModalData({
      ...modalData,
      open: true,
      title: "Edit Tenants",
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
        // categoryId: obj.categoryId,
        categoryDetail: obj.categoryDetail,
        housename: obj.housename,
        description: obj.description,
        price: obj.price,
        aggreementDate: obj.aggreementDate,
        deposit: obj.deposit,
        status: obj.status,
        remarks: obj.remarks
      };
      if (type == "post") {
        // obj.categoryDetail = obj.categoryId;
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
                required
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
                required
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
                      ? moment(houseObj?.aggreementDate)
                      : moment()
                  }
                  onChange={(e: any) => {
                    const value = e;
                    setCurrObj({
                      ...houseObj,
                      aggreementDate: value
                    });
                  }}
                  label="Select Aggreement-Date"
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

            <Grid
              item
              xs={12}
              md={6}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    houseObj.categoryDetail?._id
                      ? houseObj.categoryDetail?._id
                      : houseObj.categoryDetail
                  }
                  label="Age"
                  onChange={(data) => {
                    console.log(data.target.value, "category change");
                    setCurrObj({
                      ...houseObj,
                      // categoryId: data.target.value,
                      categoryDetail: data.target.value
                    });
                  }}
                >
                  {category &&
                    category.map((x: any) => (
                      <MenuItem key={x._id} value={x._id}>
                        {x.categoryname}
                      </MenuItem>
                    ))}
                  {/* <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>

      <CardLayout
        title={"Tenants"}
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

export default Tenants;
