import React from "react";
import logo from '../../assets/img/logo.png';
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// @mui core
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import InputBase from '@material-ui/core/InputBase';
// @mui icon
import Menu from "@material-ui/icons/Menu";
import Close from "@material-ui/icons/Close";
import SearchIcon from '@material-ui/icons/Search';

import styles from '../../assets/jss/material-kit-react/headerStyle.js';
import HeaderLink from "./HeaderLink";
const useStyles = makeStyles(styles);

export default function Header(props) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    React.useEffect(() => {
        if (props.changeColorOnScroll) {
            window.addEventListener("scroll", headerColorChange);
        }
        return function cleanup() {
            if (props.changeColorOnScroll) {
                window.removeEventListener("scroll", headerColorChange);
            }
        };
    });
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const headerColorChange = () => {
        const { color, changeColorOnScroll } = props;
        const windowsScrollTop = window.pageYOffset;
        if (windowsScrollTop > changeColorOnScroll.height) {
            document.body
                .getElementsByTagName("header")[0]
                .classList.remove(classes[color]);
            document.body
                .getElementsByTagName("header")[0]
                .classList.add(classes[changeColorOnScroll.color]);
        } else {
            document.body
                .getElementsByTagName("header")[0]
                .classList.add(classes[color]);
            document.body
                .getElementsByTagName("header")[0]
                .classList.remove(classes[changeColorOnScroll.color]);
        }
    };

    const { branch, color, fixed } = props;
    const appBarClasses = classNames({
        [classes.appBar]: true,
        [classes[color]]: color,
        [classes.fixed]: fixed
    })
    const brandComponent = <Button className={classes.title}>
        <img src={logo} style={{ height: "30px", backgroundColor: "white", borderRadius: "50%", padding: "1px", marginRight: "4px" }} alt="logo" />
        {branch}
    </Button>;
    return (
        <AppBar className={appBarClasses}>
            <Toolbar className={classes.container}>
                {brandComponent}
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Tìm kiếm..."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <Hidden smDown implementation="css">
                    <HeaderLink />
                </Hidden>
                <Hidden mdUp>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                </Hidden>
            </Toolbar>
            <Hidden mdUp implementation="js">
                <Drawer
                    variant="temporary"
                    anchor={"right"}
                    open={mobileOpen}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    onClose={handleDrawerToggle}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                    >
                        <Close />
                    </IconButton>
                    <div className={classes.appResponsive}>
                        <HeaderLink />
                    </div>
                </Drawer>
            </Hidden>
        </AppBar>
    )
}
Header.defaultProp = {
    color: "white"
};
Header.propTypes = ({
    brand: PropTypes.string
})
