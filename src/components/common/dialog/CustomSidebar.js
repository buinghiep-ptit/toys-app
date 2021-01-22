import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import HistoryIcon from '@material-ui/icons/History';

import Button from '../CustomButton.js';

import styles from 'assets/jss/material-kit-react/components/customDialogStyle.js';
const useStyles = makeStyles(styles);

function CustomSidebar(props) {
    const classes = useStyles();
    return (
        <div className={classes.sidebar}>
            <div className={classes.storeInfo}>
                <div className={classes.storeInfoHeader}>
                    <div className={classes.storeInfoHeaderPrice}>
                        $250
                    </div>
                    <ul className={classes.storeInfoHeaderList}>
                        <li className={classes.storeInfoHeaderListLi}>
                            <LockIcon /> Đảm bảo thanh toán
                        </li>
                        <li className={classes.storeInfoHeaderListLi}>
                            <EmailIcon /> Hỗ trợ từ người bán hàng
                        </li>
                        <li className={classes.storeInfoHeaderListLi}>
                            <HistoryIcon /> Truy cập vào các phiên bản trong tương lai
                        </li>
                    </ul>
                    <Button color="rose" className={classes.buttonAddCart}>
                        Thêm vào giỏ hàng
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CustomSidebar;