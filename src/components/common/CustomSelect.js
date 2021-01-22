import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function GroupedSelect() {
    const classes = useStyles();

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select">Thể loại</InputLabel>
                <Select defaultValue="" id="grouped-select">
                    <MenuItem value={1}>Marvel</MenuItem>
                    <MenuItem value={2}>Anime</MenuItem>
                    <MenuItem value={3}>DC</MenuItem>
                    <MenuItem value={4}>LoL</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}