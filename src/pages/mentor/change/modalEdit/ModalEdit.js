import React, {useState} from 'react';
import {useSelector} from "react-redux";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {DateTimePicker} from "@mui/lab";
import {TextField} from "@material-ui/core";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ModalCss from "./Modal.module.css";

const ModalEdit = () => {
    const [value, setValue] = useState(null);
    const editState = useSelector(state => state.edit.editStage);

    const dateFunction = (date) => {
        setValue(date);
        let resDate = new Date(value);
        let mm = resDate.getMonth() + 1;
        let dd = resDate.getDate();
        let yy = resDate.getFullYear(); //dd-mm-yy
        let hh = resDate.getHours();
        let min = resDate.getMinutes();

        let myDateString = `${yy}-${mm}-${dd}T${hh}:${min}`;

    }
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{editState.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className={`input-group ${ModalCss.mbInput}`}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputTitle" className="form-label">Title</label>
                                    <input required type="text" className="form-control" id="exampleInputTitle"/>
                                </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputCondition" className="form-label">Condition</label>
                                <input required type="text" className="form-control" id="exampleInputCondition"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPass_grade" className="form-label">Pass_grade</label>
                                <input required type="text" className="form-control" id="exampleInputPass_grade"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputOrder_num" className="form-label">Order_num</label>
                                <input required type="email" className="form-control" id="exampleInputOrder_num"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputDuration" className="form-label">Duration</label>
                                <input required type="email" className="form-control" id="exampleInputDuration"/>
                            </div>
                                <div className="mb-3 mt-3">
                                    <div className={ModalCss.date}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="Date_after"
                                            value={value ? value : new Date()}
                                            onChange={(newValue) => dateFunction(newValue)}
                                        />
                                    </LocalizationProvider>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary form-control">Изменить</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ModalEdit;