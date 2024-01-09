import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import React, { useState } from "react";
import ListIcon from "@mui/icons-material/List";
import AddHomeIcon from "@mui/icons-material/AddHome";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import Payment from "@mui/icons-material/Payment";
import Assessment from "@mui/icons-material/Assessment";
import AssignmentInd from "@mui/icons-material/AssignmentInd";
const sideBar = [
  { label: "House Type", icons: <CategoryIcon />, index: 1 },
  { label: "House", icons: <AddHomeIcon />, index: 2 },
  { label: "Tenant", icons: <PersonIcon />, index: 3 },
  { label: "Payment", icons: <Payment />, index: 4 },
  { label: "Reports", icons: <Assessment />, index: 5 },
  { label: "Users", icons: <AssignmentInd />, index: 6 }
];
const SideBar = () => {
  const [showbar, Setshowbar] = useState<boolean>(false);
  const toggleDrawer =
    (state: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      Setshowbar(state);
    };

  return (
    <>
      <IconButton
        style={{ color: "white" }}
        onClick={toggleDrawer(true)}
        aria-label="Show Menu"
      >
        <ListIcon />
      </IconButton>
      <Drawer anchor={"left"} open={showbar} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: "auto" }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {sideBar.map((text) => (
              <>
                <ListItem key={text.index} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{text.icons}</ListItemIcon>
                    <ListItemText primary={text.label} />
                  </ListItemButton>
                </ListItem>
                <Divider />
                {/* {index == 2 && <Divider />} */}
              </>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default SideBar;
