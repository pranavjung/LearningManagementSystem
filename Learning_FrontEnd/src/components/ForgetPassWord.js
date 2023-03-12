import React, { Component } from "react";
import "./SignUp.css";

import AuthServices from "../configurations/AuthServices";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";



const authServices = new AuthServices();

const NewPasswordRegex = RegExp(
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i
);

export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {

            OldNewPassword: "",
            UserName: "",
            NewPassword: "",
            Role: "HR",
            OldNewPasswordFlag: false,
            UserNameFlag: false,
            NewPasswordFlag: false,
            ConfirmNewPasswordFlag: false,
            RoleFlag: false,

            open: false,
            Message: "",

        };
    }

    handleClose = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }
        this.setState({ open: false });
    };

    CheckValidity() {
        console.log("Check Validity Calling");
        //Reset Flag
        this.setState({
            OldNewPasswordFlag: false,
            UserNameFlag: false,
            MobileNoFlag: false,
            NewPasswordFlag: false,
            RoleFlag: false,
        });

        if (this.state.OldNewPassword === "") {
            this.setState({ OldNewPasswordFlag: true });
        }


        if (this.state.UserName === "") {
            this.setState({ UserNameFlag: true });
        }
        if (this.state.MobileNo === "") {
            this.setState({ MobileNoFlag: true });
        }
        if (this.state.NewPassword === "") {
            this.setState({ NewPasswordFlag: true });
        }



        if (this.state.Radiovalue === "Admin" && this.state.Role === "") {
            this.setState({ RoleFlag: true });
        }
    }

    handleSubmit = (e) => {

        this.CheckValidity();

        if (

            this.state.OldNewPassword !== "" &&
            this.state.NewPassword !== "" &&
            this.state.UserName !== "" &&
            this.state.Role !== ""
        ) {

            const data = {
                
                    "newPassword":this.state.NewPassword.toString(),
                    "oldPassword": this.state.OldNewPassword.toString(),
                    "role": this.state.Role.toUpperCase(),
                    "userName": this.state.UserName.toString()
            }

            authServices
                .ForgetPassword(data)
                .then((data) => {
                    console.log("data : ", data);
                    if (data.data.response !== "") {
                        this.setState({ open: true, Message: data.data.response });
                        this.props.history.push("/SignIn");


                    } else {
                        console.log("Sign Up Failed");
                        this.setState({ open: true, Message: data.data.message });
                    }
                })
                .catch((error) => {
                    console.log("error : ", error);
                    this.setState({ open: true, Message: "Something Went Wrong" });
                });
        } else {
            console.log("Not Acceptable");
            this.setState({ open: true, Message: "Please Fill Required Field" });
        }

    };


    handleChangeNewPassword = (e) => {
        const { name, value } = e.target;
        console.log("Regex Match : ", NewPasswordRegex.test(value));
        if (!NewPasswordRegex.test(value)) {
            this.setState({ NewPasswordFlag: true });
        } else {
            this.setState({ NewPasswordFlag: false });
        }
        this.setState(
            { [name]: value },
            console.log(
                "Name : ",
                name,
                "Value : ",
                value,
                " NewPasswordFlag : ",
                this.state.NewPasswordFlag
            )
        );
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        if (e.target.name === "OldNewPassword") {
            this.setState({
                OldNewPassword: e.target.value,
                OldNewPasswordFlag: false
            })
        }
        if (e.target.name === "LastName") {
            this.setState({
                LastName: e.target.value,
                LastNameFlag: false
            })
        }


        if (e.target.name === "UserName") {
            this.setState({
                UserName: e.target.value,
                UserNameFlag: false
            })
        }
        if (e.target.name === "MobileNo") {
            this.setState({
                MobileNo: e.target.value,
                MobileNoFlag: false
            })
        }

      

        this.setState(
            { [name]: value },
            console.log("Name : ", name, "Value : ", value)
        );
    };

    handleRadioChange = (e) => {
        this.setState({ Radiovalue: e.target.value });
    };

    handleSignIn = (e) => {
        this.props.history.push("/SignIn");
    };

    render() {
        console.log("state : ", this.state);
        return (
            <div className="SignUp-Container">
                <div className="SignUp-SubContainer">
                    <div className="Title">Leave Management System</div>
                    <div className="Header_Container">Forget NewPassword</div>
                    <div className="Body">
                        <form className="form">


                            <TextField
                                className="TextField"
                                name="UserName"
                                label="Email"
                                variant="outlined"
                                size="small"
                                style={{ margin: 10 }}
                                error={this.state.UserNameFlag}
                                value={this.state.UserName}
                                onChange={this.handleChange}
                            />
                            <TextField
                                className="TextField"
                                type="password"
                                name="OldNewPassword"
                                label="OldNewPassword"
                                variant="outlined"
                                size="small"
                                style={{ margin: 10 }}
                                error={this.state.OldNewPasswordFlag}
                                value={this.state.OldNewPassword}
                                onChange={this.handleChange}
                            />

                            <TextField
                                className="TextField"
                                type="password"
                                name="NewPassword"
                                label="NewPassword"
                                variant="outlined"
                                size="small"
                                style={{ margin: 10 }}
                                error={this.state.NewPasswordFlag}
                                value={this.state.NewPassword}
                                onChange={this.handleChangeNewPassword}
                            />
                            {this.state.NewPasswordFlag ? (
                                <div className="PassError">
                                    NewPassword Must Contain Upper Letter, Lower Letter, Symbol &
                                    Number.
                                </div>
                            ) : (
                                <></>
                            )}
                           


                            <RadioGroup
                                //   aria-label="gender"
                                name="Role"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    // justifyContent: "center",
                                    // alignItems: "center",
                                }}
                                value={this.state.Role}
                                onChange={this.handleChange}
                            >

                                <FormControlLabel
                                    value="HR"
                                    control={<Radio />}
                                    label="HR"
                                />
                                <FormControlLabel
                                    value="MANAGER"
                                    control={<Radio />}
                                    label="MANAGER"
                                />
                                <FormControlLabel
                                    value="EMPLOYEE"
                                    control={<Radio />}
                                    label="EMPLOYEE"
                                />

                            </RadioGroup>

                        </form>
                    </div>
                    <div className="Buttons">
                        <Button className="Btn" color="primary" onClick={this.handleSignIn}>
                            Sign In
                        </Button>
                        <Button
                            className="Btn"
                            variant="contained"
                            color="primary"
                            onClick={() => this.handleSubmit()}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={this.state.Message}
                    action={
                        <React.Fragment>
                            <Button color="secondary" size="small" onClick={this.handleClose}>
                                UNDO
                            </Button>
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={this.handleClose}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
            </div>
        );
    }
}
