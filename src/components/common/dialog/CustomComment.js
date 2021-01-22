import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import StarIcon from '@material-ui/icons/Star';
import CommentIcon from '@material-ui/icons/Comment';

import styles from 'assets/jss/material-kit-react/components/customDialogStyle.js';

const useStyles = makeStyles(styles);

CustomComment.propTypes = {
    handleChange: PropTypes.func,
};
CustomComment.defaultProps = {
    handleChange: null,
}

function CustomComment(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.commentWrapper}>
            <div className={classes.modelFeedback}>
                <div className={classes.tabs}>
                    <div className={classes.tabsHeader}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            indicatorColor="secondary"
                            textColor="secondary"
                            aria-label="icon tabs example"
                        >
                            <Tab icon={<StarIcon />} label="Đánh giá" />
                            <Tab icon={<CommentIcon />} label="Bình luận" />
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomComment;