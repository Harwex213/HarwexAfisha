import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const AccountMenu = ({ menuItems, menuClassName, iconClassName, dropdownPlacement }) => {
    return (
        <Dropdown
            overlay={
                <Menu
                    className={menuClassName}
                    items={menuItems.map((item) => ({
                        label: item[0],
                        key: item[1],
                    }))}
                />
            }
            trigger={["click"]}
            placement={dropdownPlacement}
        >
            <Avatar className={iconClassName} style={{}} size="large" icon={<UserOutlined />} />
        </Dropdown>
    );
};

export default AccountMenu;
