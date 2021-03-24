import React, { useState, useCallback, useEffect } from "react";
import classNames from "classnames";

import Header from "components/header/Header";
import Parallax from "components/parallax/Parallax";
import Button from 'components/common/CustomButton';
import Toys from "components/body/Toys";
import img from "assets/img/thumb-lol-1.jpg";


import { makeStyles } from "@material-ui/core/styles";
import styles from 'assets/jss/material-kit-react/pages/toysPageStyle.js';
import { useDispatch, useSelector } from "react-redux";
import { fetchToysIfNeeded } from "redux/actions/toysActions";
import { selectToys } from "selectors/toysSelectors";

import { history } from 'utils/helpers/history';
import ToysContainer from "containers/ToysContainer";

import GalleryRoom from 'components/common/GalleryRoom.js';
import CustomDialogClone from "components/common/dialog/CustomDialogClone";

const useStyles = makeStyles(styles);

function ToysPage(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Header
                branch="Lego"
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 400,
                    color: "dark"
                }}
            />

            <Parallax image={img} />

            <div className={classNames(classes.main, classes.mainRaised)}>
                <ToysContainer />
            </div>

            {

                open && <CustomDialogClone
                    isOpen={open}
                    model={{}}
                    handleClose={handleClose} />
            }
        </div>
    );
}

export default ToysPage;
