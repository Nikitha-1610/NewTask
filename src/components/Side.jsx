import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Icon } from "@iconify-icon/react";
// import Profile from "../pages/Profile";
// import Task from "../pages/Task"

const Side = () => {
  return (
    <Sidebar>
      <Menu>
        <MenuItem
          icon={
            <Icon
              icon="material-symbols:dashboard-outline"
              height={22}
              width={22}
            />
          }
        >
          <Link to="/dashboard">Dashboard</Link>
        </MenuItem>

        <MenuItem
          icon={<Icon icon="iconamoon:profile" height={22} width={22} />}
        >
          <Link to="/profile">Profile</Link>
        </MenuItem>

        <MenuItem
          icon={<Icon icon="logos:microsoft-teams" height={22} width={22} />}
        >
          <Link to="/teams">Teams</Link>
        </MenuItem>

        <SubMenu label="Charts" icon={<Icon icon="logos:highcharts" />}>
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>

        <MenuItem
          icon={<Icon icon="iconamoon:profile" height={22} width={22} />}
        >
          <Link to="/people">People</Link>
        </MenuItem>

        <MenuItem
          component={<Link to="/Usersemail" />}
          icon={
            <Icon icon="material-symbols:action-key" height={22} width={22} />
          }
        >
          <Link to="/usersemail">UsersEmail</Link>
        </MenuItem>
        <MenuItem
          component={<Link to="/designteam" />}
          icon={<Icon icon="bi:list-task" height={22} width={22} />}
        >
          {" "}
          Task
        </MenuItem>
        <MenuItem icon={<Icon icon="mdi:plus-circle" height={22} width={22} />}>
          <Link to="/addtasks">Add Tasks</Link>
        </MenuItem>
        <MenuItem
          component={<Link to="/task" />}
          icon={<Icon icon="pajamas:list-task" height={22} width={22} />}
        >
          {" "}
          Inprogress task
        </MenuItem>
        <MenuItem
          component={<Link to="/screen2" />}
          icon={<Icon icon="iconamoon:profile" height={22} width={22} />}
        >
          {" "}
          Task
        </MenuItem>
        <MenuItem
          component={<Link to="/chats" />}
          icon={<Icon icon="fa-solid:comments" height={22} width={22} />}

        >
          {" "}
          Chats
        </MenuItem>
       
      </Menu>
    </Sidebar>
  );
};

export default Side;
