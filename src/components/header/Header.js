import React, { useRef } from "react";
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

import styles from 'assets/jss/material-kit-react/headerStyle.js';
import HeaderLink from "./HeaderLink";
import { Link } from "react-router-dom";
import Search from "./Search";
const useStyles = makeStyles(styles);

Header.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    branch: PropTypes.string,
    color: PropTypes.string,
    fixed: PropTypes.string,
    changeColorOnScroll: PropTypes.func.isRequired
}
Header.defaultProps = {
    branch: null,
    color: null,
    fixed: null,
}

export default function Header({
    branch, color, fixed, onSubmit, changeColorOnScroll
}) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    React.useEffect(() => {
        if (changeColorOnScroll) {
            window.addEventListener("scroll", headerColorChange);
        }
        return function cleanup() {
            if (changeColorOnScroll) {
                window.removeEventListener("scroll", headerColorChange);
            }
        };
    });
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const headerColorChange = () => {
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

    const appBarClasses = classNames({
        [classes.appBar]: true,
        [classes[color]]: color,
        [classes.fixed]: fixed
    })
    const brandComponent = <Link to="/toys" className={classes.link}><Button className={classes.title}>
        <img src={logo} style={{ height: "30px", backgroundColor: "white", borderRadius: "50%", padding: "1px", marginRight: "4px" }} alt="logo" />
        {branch}
    </Button></Link>;

    const [searchTerm, setSearchTerm] = React.useState('');
    const typingTimeoutRef = useRef(null);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(event.target.value);
        if (!onSubmit) return;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value,
            }
            onSubmit(formValues);
        }, 300);
    }

    console.log('header');
    return (
        <AppBar className={appBarClasses}>
            <Toolbar className={classes.container}>
                {brandComponent}
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <Search />
                    {/* <InputBase
                        placeholder="Tìm kiếm..."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    /> */}
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

Header.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "transparent",
        "white",
        "rose",
        "dark"
    ]),
    rightLinks: PropTypes.node,
    leftLinks: PropTypes.node,
    brand: PropTypes.string,
    fixed: PropTypes.bool,
    absolute: PropTypes.bool,
    // this will cause the sidebar to change the color from
    // props.color (see above) to changeColorOnScroll.color
    // when the window.pageYOffset is heigher or equal to
    // changeColorOnScroll.height and then when it is smaller than
    // changeColorOnScroll.height change it back to
    // props.color (see above)
    changeColorOnScroll: PropTypes.shape({
        height: PropTypes.number.isRequired,
        color: PropTypes.oneOf([
            "primary",
            "info",
            "success",
            "warning",
            "danger",
            "transparent",
            "white",
            "rose",
            "dark"
        ]).isRequired
    })
};
