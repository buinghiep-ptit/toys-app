import React, { useRef, useState } from 'react';
import { history } from 'utils/helpers/history';
import { connect } from 'react-redux';
import { changeRouter } from 'redux/actions/routerActions';
import { makeStyles } from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';
import styles from 'assets/jss/material-kit-react/headerStyle.js';
const useStyles = makeStyles(styles);

const Search = ({ changeRouter }) => {

    const classes = useStyles();

    const [searchValue, setSearchValue] = useState('');

    const typingTimeoutRef = useRef(null);
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchValue(event.target.value);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            changeRouter({ path: 'games', options: { query: value, page: 1, page_size: 20 } });
            history.push(`/games?query=${value}`);
        }, 300);
    }
    return (
        <div>
            <InputBase
                placeholder="Tìm kiếm..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={handleSearch}
            />
        </div>
    );
}
export default connect(null, {
    changeRouter
})(Search);
