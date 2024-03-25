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
import { getValue } from "../../helper/localhelper";

type tenantState = {
  columnArr: string[] | null;
  rows: any[] | null;
};
type dialogState = {
  title: string | null;
  open: boolean;
  type: string;
};
const userState = [
  { label: "Active", value: true },
  { label: "InActive", value: false }
];
const TenantUser = () => {
  const [modalData, setModalData] = useState<dialogState>({
    title: "Your Tenant User",
    open: false,
    type: "post"
  });
  const UserDetail = getValue("userdetail");
  console.log(UserDetail, "UserDetail");

  const dispatch = useDispatch();
  const [tenantUserObj, setTeanantUserObj] = useState<User>({});
  const [tenantstate, setTenantState] = useState<tenantState | null>(null);

  const fetchDetail = async () => {
    try {
      const response = await axiosConfig.get("/tenantuser");
      const rows = response?.data?.data as User[] | null;
      // const allKeys = rows
      //   ? [...new Set(rows.flatMap((obj) => Object.keys(obj)))]
      //   : null;
      // console.log(rows, allKeys);
      console.log(rows, "rows check");

      const x = rows?.map((x) => {
        const d = {
          ...x,
          status: x.isActive ? "Active" : "Inactive",
          createdon: x.createdAt
        };
        delete d.createdAt;
        return d;
      });
      console.log(x, "x formated date");

      setTenantState((e: any) => ({
        ...e,
        rows: x,
        columnArr: [
          "name",
          "email",
          "contact",
          "status",
          "createdon",
          "password"
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
      title: "Add New Tenants User",
      type: "post"
    });
    setTeanantUserObj({});
  };
  const handleedit = (itemId: any) => {
    console.log(itemId, "itemId edit");

    setTeanantUserObj({ ...itemId });
    setModalData({
      ...modalData,
      open: true,
      title: "Edit Tenants User",
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
  const querydata = async (type: string, obj: User) => {
    setModalData({
      ...modalData,
      open: false,
      title: modalData.title,
      type: "post"
    });
    try {
      let response;
      const data = {
        name: obj.name,
        email: obj.email,
        contact: obj.contact,
        isActive: obj.isActive,
        password: obj.password,
        confirmpassword: obj.password
      };
      if (type == "post") {
        // obj.categoryDetail = obj.categoryId;
        response = await axiosConfig.post(
          `/tenantuser?name=${UserDetail.name}`,
          obj
        );
      } else if (type == "put") {
        console.log("data", data);

        response = await axiosConfig.put("/tenantuser", data, {
          params: {
            _id: obj._id
          }
        });
      } else {
        response = await axiosConfig.delete("/tenantuser", {
          params: { _id: obj._id }
        });
      }
      fetchDetail();

      ShowToast(dispatch, response?.data?.message, "success");
    } catch (error) {
      console.log(error, "error in post");

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
            if (tenantUserObj._id) {
              querydata("put", tenantUserObj);
            } else {
              querydata("post", tenantUserObj);
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
                name="Name"
                label="Enter Name"
                type="text"
                fullWidth
                value={tenantUserObj?.name}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const d = e.target.value;
                  setTeanantUserObj((x) => ({ ...x, name: d }));
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
                name="email"
                label="Enter Email"
                type="text"
                fullWidth
                value={tenantUserObj?.email}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setTeanantUserObj({
                    ...tenantUserObj,
                    email: value
                  });
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
                name="email"
                label="Enter Email"
                type="text"
                fullWidth
                value={tenantUserObj?.email}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setTeanantUserObj({
                    ...tenantUserObj,
                    email: value
                  });
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
                name="contact"
                label="Enter Contact"
                type="text"
                fullWidth
                value={tenantUserObj?.contact}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setTeanantUserObj({
                    ...tenantUserObj,
                    contact: value
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
                required
                margin="dense"
                name="email"
                label="Password"
                type="text"
                fullWidth
                value={tenantUserObj?.password}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setTeanantUserObj({
                    ...tenantUserObj,
                    password: value
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
                  Update Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tenantUserObj.isActive}
                  onChange={(data) => {
                    setTeanantUserObj({
                      ...tenantUserObj,
                      // categoryId: data.target.value,
                      isActive: data.target.value
                    });
                  }}
                >
                  {userState.map((x: any) => (
                    <MenuItem key={x.value} value={x.value}>
                      {x.label}
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
        title={"Your Tenants User"}
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

export default TenantUser;
