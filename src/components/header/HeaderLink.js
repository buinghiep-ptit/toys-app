import React from "react";

import { makeStyles } from "@material-ui/core/styles";
//@mui core
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Badge from '@material-ui/core/Badge';
//@mui icon
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NotificationsIcon from '@material-ui/icons/Notifications';
import profileImage from "assets/img/avatar.jpg";

// comp
import CustomDropdown from 'components/common/CustomDropdown.js';
import Button from "components/common/CustomButton.js";


import styles from 'assets/jss/material-kit-react/headerLinkStyle.js';
import { Link } from "react-router-dom";
const useStyles = makeStyles(styles);

export default function HeaderLink(props) {
    const classes = useStyles();
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>

                <Button
                    color="transparent"
                    className={classes.navLink}
                >
                    <Link to="/login" className={classes.link}>
                        Đăng ký
                        </Link>
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>

                <Button
                    color="transparent"
                    className={classes.navLink}
                >
                    <Link to="/login" className={classes.link}>
                        Đăng nhập
                        </Link>
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <IconButton aria-label="show cart" color="inherit">
                    <Badge badgeContent={1} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </ListItem>

            <ListItem className={classes.listItem}>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={7} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </ListItem>

            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                    }}
                    buttonText={
                        <img
                            src={profileImage}
                            className={classes.img}
                            alt="profile"
                        />
                    }
                    dropdownList={[
                        "nghiepbv",
                        "Cài đặt",
                        "Đăng xuất"
                    ]}
                />
            </ListItem>
        </List>
    )
}
