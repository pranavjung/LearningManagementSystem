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

const PasswordRegex = RegExp(
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i
);

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {

      FirstName: "",
      LastName: "",
      UserName: "",
      Password: "",

      Role: "BACK_OFFICE_STAFF",

      FirstNameFlag: false,
      LastNameFlag: false,
      UserNameFlag: false,
      MobileNo: "",
      MobileNoFlag: false,
      PasswordFlag: false,
      ConfirmPassword: "",
      ConfirmPasswordFlag: false,
      RoleFlag: false,
      BloodGroup: "",
      BloodGroupFlag: false,
      Gender: "",
      GenderFlag: false,
      DateOfBirth: "",
      DateOfBirthFlag: false,
      Address: "",
      AddressFlag: false,

      open: false,
      Message: "",
      Zip: "",
      ZipFlag: false,
      Address: "",
      AddressFlag: false,
      City: "",
      CityFlag: false
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
      FirstNameFlag: false,
      LastNameFlag: false,
      UserNameFlag: false,
      MobileNoFlag: false,
      PasswordFlag: false,
      ZipFlag: false,
      AddressFlag: false,
      CityFlag: false,

      RoleFlag: false,
    });

    if (this.state.FirstName === "") {
      this.setState({ FirstNameFlag: true });
    }
    if (this.state.LastName === "") {
      this.setState({ LastNameFlag: true });
    }

    if (this.state.UserName === "") {
      this.setState({ UserNameFlag: true });
    }
    if (this.state.MobileNo === "") {
      this.setState({ MobileNoFlag: true });
    }
    if (this.state.Password === "") {
      this.setState({ PasswordFlag: true });
    }

    if (this.state.Gender === "") {
      this.setState({ GenderFlag: true });
    }
    if (this.state.Address === "") {
      this.setState({ AddressFlag: true });
    }
    if (this.state.BloodGroup === "") {
      this.setState({ BloodGroupFlag: true });
    }
    if (this.state.DateOfBirth === "") {
      this.setState({ DateOfBirthFlag: true });
    }

    if (this.state.Radiovalue === "Admin" && this.state.Role === "") {
      this.setState({ RoleFlag: true });
    }
  }

  handleSubmit = (e) => {

    this.CheckValidity();

    if (
      this.state.FirstName !== "" &&
      this.state.Password !== "" &&
      this.state.UserName !== "" &&
      this.state.MobileNo !== "" &&
      this.state.Address !== "" &&
      this.state.BloodGroup !== "" &&
      this.state.DateOfBirth !== "" &&
      this.state.Gender !== ""

    ) {
      const data = {
        "userId": 0,
        "password": this.state.Password,
        "name": this.state.FirstName,
        "emailId": this.state.UserName,
        "bloodGroup": this.state.BloodGroup,
        "gender": this.state.Gender,
        "designation": this.state.Role.toUpperCase(),
        "contactNo": this.state.MobileNo,
        "address": this.state.Address,
        "dob": this.state.DateOfBirth
      }
debugger
      authServices
        .SignUp(data)
        .then((data) => {
          console.log("data : ", data);
          if (data.data !== "") {

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


  handleChangePassword = (e) => {
    const { name, value } = e.target;
    console.log("Regex Match : ", PasswordRegex.test(value));
    if (!PasswordRegex.test(value)) {
      this.setState({ PasswordFlag: true });
    } else {
      this.setState({ PasswordFlag: false });
    }
    this.setState(
      { [name]: value },
      console.log(
        "Name : ",
        name,
        "Value : ",
        value,
        " PasswordFlag : ",
        this.state.PasswordFlag
      )
    );
  };

  handleChangeConfirmPassword = (e) => {
    if (e.target.value === this.state.Password) {
      this.setState({
        ConfirmPassword: e.target.value,
        ConfirmPasswordFlag: false
      })
    }
  }



  handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "FirstName") {
      this.setState({
        FirstName: e.target.value,
        FirstNameFlag: false
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
    if (e.target.name === "Address") {
      this.setState({
        Address: e.target.value,
        AddressFlag: false
      })
    }
    if (e.target.name === "BloodGroup") {
      this.setState({
        BloodGroup: e.target.value,
        BloodGroupFlag: false
      })
    }
    if (e.target.name === "DateOfBirth") {
      this.setState({
        DateOfBirth: e.target.value,
        DateOfBirthFlag: false
      })
    }
    if (e.target.name === "Gender") {
      this.setState({
        Gender: e.target.value,
        GenderFlag: false
      })
    }

    if (e.target.name === "Role") {
      this.setState({
        Role: e.target.value,

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
          <div className="Title">Learning Management System</div>
          <div className="Header_Container">Registration</div>
          <div className="Body">
            <form className="form">
              <TextField
                className="TextField"
                name="FirstName"
                label="FirstName"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.FirstNameFlag}
                value={this.state.FirstName}
                onChange={this.handleChange}
              />

              <TextField
                className="TextField"
                name="UserName"
                label="Email ID"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.UserNameFlag}
                value={this.state.UserName}
                onChange={this.handleChange}
              />
              <TextField
                type="date"
                className="TextField"
                name="DateOfBirth"
                label="Date of Birth"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.DateOfBirthFlag}
                value={this.state.DateOfBirth}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                name="BloodGroup"
                label="Blood Group"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.BloodGroupFlag}
                value={this.state.BloodGroup}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                name="Gender"
                label="Gender"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.GenderFlag}
                value={this.state.Gender}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                name="Address"
                label="Address"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.AddressFlag}
                value={this.state.Address}
                onChange={this.handleChange}
              />


              <TextField
                type="number"
                className="TextField"
                name="MobileNo"
                label="Mobile no"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.MobileNoFlag}
                value={this.state.MobileNo}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                type="password"
                name="Password"
                label="Password"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.PasswordFlag}
                value={this.state.Password}
                onChange={this.handleChangePassword}
              />
              {this.state.PasswordFlag ? (
                <div className="PassError">
                  Password Must Contain Upper Letter, Lower Letter, Symbol &
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
                  value="BACK_OFFICE_STAFF"
                  control={<Radio />}
                  label="Office Staff"
                />
                <FormControlLabel
                  value="FACULTY"
                  control={<Radio />}
                  label="Teacher"
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
              Sign Up
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
