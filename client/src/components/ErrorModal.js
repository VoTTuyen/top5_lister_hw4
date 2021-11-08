import * as React from "react";
import { GlobalStoreContext } from "../store";
import { useContext } from "react";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";


export default function ErrorModal(props) {
    const { store } = useContext(GlobalStoreContext);
    const [state, setState] = React.useState({
        vertical: "top",
        horizontal: "center",
    });

    const { vertical, horizontal } = state;
    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={props.showAlert}
            message={props.errorMessage}
            key={vertical + horizontal}
            action={
                <Button color="inherit" onClick={() => {
                    props.setShowAlertCallback(false);
                }}>
                    OK
                </Button>
            }
        />
    );
}
