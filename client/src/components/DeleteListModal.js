import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogActions } from "@mui/material";
import GlobalStoreContext from "../store";
import { useContext } from "react";

export default function DeleteListModal(props) {
    const { store } = useContext(GlobalStoreContext);
    let name = ''
    if (store.listMarkedForDeletion !== null) {
        name = store.listMarkedForDeletion.name
    }
    return (
        <div>
            <Dialog open={props.showDialog}
                aria-labelledby="confirm-dialog">
                <DialogTitle id="confirm-dialog">
                    {"Please Confirm Deletion"}
                </DialogTitle>
                <DialogContent>
                    {"Are you sure want to delete Top 5 " +  name + " List?"}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => props.hideDeleteModalCallback()}
                    >
                        No
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            props.hideDeleteModalCallback();
                            store.deleteMarkedList();
                        }}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
