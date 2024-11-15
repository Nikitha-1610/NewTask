import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Icon } from "@iconify-icon/react";
import Profile from "../pages/Profile";
// import Task from "../pages/Task"

const Side = () => {
  return (
    <Sidebar>
      <Menu>
        <MenuItem
          component={<Link to="/dashboard" />}
          icon={
            <Icon
              icon="material-symbols:dashboard-outline"
              height={22}
              width={22}
            />
          }
        >
          {" "}
          Dashboard
        </MenuItem>
        <MenuItem
          component={<Link to="/profile" />}
          icon={<Icon icon="iconamoon:profile" height={22} width={22} />}
        >
          {" "}
          profile
        </MenuItem>
        <MenuItem
          component={<Link to="/profile" />}
          icon={<Icon icon="iconamoon:profile" height={22} width={22} />}
        >
          {" "}
          profile
        </MenuItem>
        <SubMenu label="Charts" icon={<Icon icon="logos:highcharts" />}>
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <MenuItem
          component={<Link to="/people" />}
          icon={<Icon icon="iconamoon:profile" height={22} width={22} />}
        >
          {" "}
          People
        </MenuItem>
        <MenuItem
          component={<Link to="/screen2" />}
          icon={<Icon icon="iconamoon:profile" height={22} width={22} />}
        >
          {" "}
          Task
        </MenuItem>
        <MenuItem
          component={<Link to="/position" />}
          icon={<Icon icon="iconamoon:profile" height={22} width={22} />}
        >
          {" "}
          Position
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default Side;
