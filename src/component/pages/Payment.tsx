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
import { Tenant, Houses, Payments } from "../../interface/Category";
import { getValue } from "../../helper/localhelper";
type paymentState = {
  columnArr: string[] | null;
  rows: any[] | null;
};
type dialogState = {
  title: string | null;
  open: boolean;
  type: string;
};
const Payment = () => {
  const [modalData, setModalData] = useState<dialogState>({
    title: "Payment",
    open: false,
    type: "post"
  });
  const dispatch = useDispatch();
  const [paymentObj, setPaymentObj] = useState<Payments>({});
  const [paymentstate, setPaymentState] = useState<paymentState | null>(null);
  const [propertyArr, setPropertyArr] = useState<Houses | any>([]);
  const [userArr, setUserArr] = useState<User | any>([]);
  const fetchDetail = async () => {
    try {
      const response = await axiosConfig.get("/payment");
      const propertyData = await axiosConfig.get("/property");
      const userData = await axiosConfig.get("/tenantuser");
      const data = propertyData?.data?.data as Houses[];
      const UserDropdown = userData?.data?.data as User[];
      setPropertyArr(data);
      setUserArr(UserDropdown);
      const rows = response?.data?.data as Payments[] | null;
      // const allKeys = rows
      //   ? [...new Set(rows.flatMap((obj) => Object.keys(obj)))]
      //   : null;
      // console.log(rows, allKeys);
      const d = rows?.map((x) => {
        return {
          ...x,
          tenant_detail: `${x?.tenantdetail?.name}+${x?.tenantdetail?.contact} `,
          // contact: x?.tenantdetail?.contact,
          house_detail: `${x?.housedetail?.housename} + ${x?.housedetail?.price}`,
          // houseprice: x?.housedetail?.price,
          house_status: x?.housedetail?.status,
          maintainance_remark: x.maintainanceremark,
          collectedon: x?.collectedOn
        };
      });
      setPaymentState((e: any) => ({
        ...e,
        rows: d,
        columnArr: [
          "tenant_detail",
          "house_detail",
          // "houseprice",
          "house_status",
          "collectedon",
          "amount",
          "mode",
          "type",
          "maintainance",
          "maintainance_remark",
          "electricbill",
          "electricbillremark"
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
      title: "Add New Payment",
      type: "post"
    });
    setPaymentObj({});
  };
  const handleedit = (itemId: any) => {
    console.log(itemId, "itemId edit");

    setPaymentObj({ ...itemId });
    setModalData({
      ...modalData,
      open: true,
      title: "Edit Payment",
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
  const querydata = async (type: string, obj: Payments) => {
    try {
      let response;
      const data = {
        ...obj,
        tenantdetail: obj.tenantdetail?._id,
        housedetail: obj.housedetail?._id
      };
      delete data._id;
      if (type == "post") {
        // obj.categoryDetail = obj.categoryId;
        console.log(userArr, "user arr");

        const tenantname = userArr.find((x: User) => x._id == obj.tenantdetail);
        console.log(tenantname, "tenantname");
        const username = getValue("userdetail");
        response = await axiosConfig.post("/payment", {
          ...obj,
          tenantname: tenantname?.name,
          username: username?.name,
          email: tenantname?.email
        });
      } else if (type == "put") {
        console.log("data", data);

        response = await axiosConfig.put("/payment", data, {
          params: {
            _id: obj._id
          }
        });
      } else {
        response = await axiosConfig.delete("/payment", {
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
            if (paymentObj._id) {
              querydata("put", paymentObj);
            } else {
              querydata("post", paymentObj);
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
                required
                margin="dense"
                name="housename"
                label="Enter Maintainance"
                type="text"
                fullWidth
                value={paymentObj?.maintainance}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setPaymentObj({
                    ...paymentObj,
                    maintainance: parseFloat(value)
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
              <TextField
                autoFocus
                required
                margin="dense"
                name="amount"
                label="Enter Maintainance Remark"
                type="text"
                fullWidth
                value={paymentObj?.maintainanceremark}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const d = e.target.value;
                  setPaymentObj((x) => ({ ...x, maintainanceremark: d }));
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
                name="amount"
                label="Enter Electric-bill Amount"
                type="text"
                fullWidth
                value={paymentObj?.electricbill}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const d = e.target.value;
                  setPaymentObj((x) => ({ ...x, electricbill: d }));
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
                name="amount"
                label="Enter Electric-bill Remarks"
                type="text"
                fullWidth
                value={paymentObj?.electricbillremark}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const d = e.target.value;
                  setPaymentObj((x) => ({ ...x, electricbillremark: d }));
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
                    paymentObj.housedetail?._id
                      ? paymentObj.housedetail?._id
                      : paymentObj.housedetail
                  }
                  label="House Detail"
                  onChange={(data) => {
                    console.log(data.target.value, "category change");
                    setPaymentObj({
                      ...paymentObj,
                      // categoryId: data.target.value,
                      housedetail: data.target.value
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
                    paymentObj.tenantdetail?._id
                      ? paymentObj.tenantdetail?._id
                      : paymentObj.tenantdetail
                  }
                  label="User Detail"
                  onChange={(data) => {
                    setPaymentObj({
                      ...paymentObj,
                      // categoryId: data.target.value,
                      tenantdetail: data.target.value
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
                name="amount"
                label="Enter Payment Amount"
                type="number"
                fullWidth
                value={paymentObj?.amount}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const d = e.target.value;
                  setPaymentObj((x) => ({ ...x, amount: parseFloat(d) }));
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
                name="amount"
                label="Enter Payment Mode"
                type="text"
                fullWidth
                value={paymentObj?.mode}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const d = e.target.value;
                  setPaymentObj((x) => ({ ...x, mode: d }));
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
                helperText="Select Type: Rent,Deposite or any other"
                name="type"
                label="Enter Payment Type"
                type="text"
                fullWidth
                value={paymentObj?.type}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const d = e.target.value;
                  setPaymentObj((x) => ({ ...x, type: d }));
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
                name="type"
                // helperText="Select payment date"
                label="Select date"
                helperText="Select Paymnent date if older than today"
                InputLabelProps={{ shrink: true }}
                type="date"
                fullWidth
                value={paymentObj?.collectedOn}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const d = e.target.value;
                  setPaymentObj((x) => ({ ...x, collectedOn: d }));
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
        title={"Payment"}
        onSubmit={onSubmit}
        tableComponent={
          <TableHelper
            columns={paymentstate?.columnArr}
            rows={paymentstate?.rows}
            action={ActionBtn}
          />
        }
      ></CardLayout>
    </div>
  );
};

export default Payment;
