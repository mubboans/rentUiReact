/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axiosConfig from "../../helper/authApi";
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
import { User } from "../../interface/users";
import { Tenant, Houses } from "../../interface/Category";
type tenantState = {
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
  const [tenantObj, setTeanantObj] = useState<Tenant>({});
  const [tenantstate, setTenantState] = useState<tenantState | null>(null);
  const [propertyArr, setPropertyArr] = useState<Houses | any>([]);
  const [userArr, setUserArr] = useState<User | any>([]);
  const fetchDetail = async () => {
    try {
      const response = await axiosConfig.get("/tenant");
      const propertyData = await axiosConfig.get("/property");
      const userData = await axiosConfig.get("/tenantuser");
      const data = propertyData?.data?.data as Houses[];
      const UserDropdown = userData?.data?.data as User[];
      setPropertyArr(data);
      setUserArr(UserDropdown);
      const rows = response?.data?.data as Tenant[] | null;
      // const allKeys = rows
      //   ? [...new Set(rows.flatMap((obj) => Object.keys(obj)))]
      //   : null;
      // console.log(rows, allKeys);
      const d = rows?.map((x) => {
        return {
          ...x,
          tenantname: x?.userDetail?.name,
          contact: x?.userDetail?.contact,
          housename: x?.houseDetail?.housename,
          houseprice: x?.houseDetail?.price,
          "property-status": x?.houseDetail?.status
        };
      });
      setTenantState((e: any) => ({
        ...e,
        rows: d,
        columnArr: [
          "tenantname",
          "contact",
          "housename",
          "houseprice",
          "property-status",
          "ouststanding_balance",
          "otherdetail"
        ]
      }));
    } catch (error) {
      console.log(error);
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
    setTeanantObj({});
  };
  const handleedit = (itemId: any) => {
    console.log(itemId, "itemId edit");

    setTeanantObj({ ...itemId });
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
  const querydata = async (type: string, obj: Tenant) => {
    try {
      let response;
      const data = {
        userDetail: obj.userDetail?._id,
        houseDetail: obj.houseDetail?._id,
        ouststanding_balance: obj.ouststanding_balance,
        otherdetail: obj.otherdetail
      };
      if (type == "post") {
        // obj.categoryDetail = obj.categoryId;
        response = await axiosConfig.post("/tenant", obj);
      } else if (type == "put") {
        console.log("data", data);

        response = await axiosConfig.put("/tenant", data, {
          params: {
            _id: obj._id
          }
        });
      } else {
        response = await axiosConfig.delete("/tenant", {
          params: { _id: obj._id }
        });
      }
      fetchDetail();
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
    fetchDetail();
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
            if (tenantObj._id) {
              querydata("put", tenantObj);
            } else {
              querydata("post", tenantObj);
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
                label="Enter Other Detail"
                type="text"
                fullWidth
                value={tenantObj?.otherdetail}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const d = e.target.value;
                  setTeanantObj((x) => ({ ...x, otherdetail: d }));
                }}
              />
            </Grid>
            {/* <Grid
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
                value={tenantObj?.housename}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const newName = e.target.value;
                  setTeanantObj((x) => ({ ...x, housename: newName }));
                }}
              />
            </Grid> */}
            {/* <Grid
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
                value={tenantObj?.price}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setTeanantObj({ ...tenantObj, price: parseFloat(value) });
                }}
              />
            </Grid> */}

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
                label="Enter Ouststanding Balance"
                type="text"
                fullWidth
                value={tenantObj?.ouststanding_balance}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setTeanantObj({
                    ...tenantObj,
                    ouststanding_balance: value
                  });
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
                  Select Property/House
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    tenantObj.houseDetail?._id
                      ? tenantObj.houseDetail?._id
                      : tenantObj.houseDetail
                  }
                  label="House Detail"
                  onChange={(data) => {
                    console.log(data.target.value, "category change");
                    setTeanantObj({
                      ...tenantObj,
                      // categoryId: data.target.value,
                      houseDetail: data.target.value
                    });
                  }}
                >
                  {propertyArr &&
                    propertyArr.map((x: any) => (
                      <MenuItem key={x._id} value={x._id}>
                        {x.housename}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
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
                  Select User
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    tenantObj.userDetail?._id
                      ? tenantObj.userDetail?._id
                      : tenantObj.userDetail
                  }
                  label="User Detail"
                  onChange={(data) => {
                    setTeanantObj({
                      ...tenantObj,
                      // categoryId: data.target.value,
                      userDetail: data.target.value
                    });
                  }}
                >
                  {userArr &&
                    userArr.map((x: any) => (
                      <MenuItem key={x._id} value={x._id}>
                        {x.name}
                      </MenuItem>
                    ))}
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
            columns={tenantstate?.columnArr}
            rows={tenantstate?.rows}
            action={ActionBtn}
          />
        }
      ></CardLayout>
    </div>
  );
};

export default Tenants;
