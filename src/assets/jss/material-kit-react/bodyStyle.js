import { container, title } from "assets/jss/material-kit-react.js";

const bodyStyle = theme => ({
    root: {
        flexGrow: 1,
    },
    sections: {
        padding: "40px 0",
        "@media (max-width: 576px)":
        {
            padding: 0
        }
    },
    container,
    title,
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
})

export default bodyStyle;
