import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Icon } from "@iconify-icon/react";

const Side = () => {
  return (
    <Sidebar className="sidebar">
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
          {" "}
          People
          <Link to="/people">People</Link>
        </MenuItem>

        <MenuItem
          component={<Link to="/Usersemail" />}
          icon={<Icon icon="iconamoon:profile" height={22} width={22} />}
        >
          <Link to="/usersemail">UsersEmail</Link>
        </MenuItem>

        {/* Updated the icon for Add Tasks */}
        <MenuItem icon={<Icon icon="mdi:plus-circle" height={22} width={22} />}>
          <Link to="/addtasks">Add Tasks</Link>
        </MenuItem>

        <MenuItem
          component={<Link to="/designteam" />}
          icon={<Icon icon="iconamoon:profile" height={22} width={22} />}
        >
          {" "}
          UsersEmail
        </MenuItem>
        <MenuItem
          component={<Link to="/task" />}
          icon={<Icon icon="pajamas:list-task" height={22} width={22} />}
        >
          {" "}
          Task DesignTeam
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default Side;
