import React, { Component } from "react";

import "./TeachersDashboard.css";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DownloadIcon from '@mui/icons-material/Download';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import AuthServices from "../../configurations/AuthServices";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";



const authServices = new AuthServices();
const minDate = new Date(Date.now());
// const customerServices = new CustomerServices();

export default class HRDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

      MyProfileFlag: false,


      CourseWareFlagPlus: true,
      CourseWareFlag: false,

      ResultDetailsFlag: false,
      DataByID: [],

      NoticeData: [],
      UpdateBtn: true,
      MyProfileDetails: true,
      ScheduleSessionFlag: true,
      TeacherData: {},
      ResultData: [],
      TopisCourseWare: [
        {
          name: "DSA", value: [
            "https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_link_test",
            "https://www.w3schools.com/tags/tag_a.asp",
            " https://www.w3schools.com/tags/tag_a.asp",
            "https://www.w3schools.com/tags/tag_a.asp",
            "https://www.w3schools.com/tags/tag_a.asp",
            "https://www.w3schools.com/tags/tag_a.asp",
            "https://www.w3schools.com/tags/tag_a.asp",
            "https://www.w3schools.com/tags/tag_a.asp",
            "https://www.w3schools.com/tags/tag_a.asp",
            "https://www.w3schools.com/tags/tag_a.asp"
          ]
        }
        ,
        {
          name: "Algorithm", value: [
            "https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_link_test",
            "https://www.w3schools.com/tags/tag_a.asp"
          ]
        }
      ],
      ScheduleData: []



    };
  }

  componentWillMount() {

    this.GetallSechdule()
    this.NoticeGet()

  }

  handlePluseIcon = () => {
    this.setState({
      CourseWareFlagPlus: false,
      UpdateBtn: true
    })
  }

  ////////////// EMployee Leave     /////////////////////////




  handleScheduleSessionFlag = () => {

    this.setState({
      ScheduleSessionFlag: true,
      CourseWareFlag: false,
      MyProfileFlag: false,
     
      ResultDetailsFlag: false
      // ScheduleSessionFlag:false
    })
    this.NoticeGet()
  }

  GetAllUserDetails = () => {

    authServices
      .AllUserData()
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);

        if (data.data.response !== null) {

          this.setState({
            hrdetials: data.data.response,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }




  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };




  SignOut = async () => {
    await localStorage.removeItem("token");
    this.props.history.push("/SignIn");
  };

  handleCourseWareFlag = () => {

    this.setState({
      CourseWareFlag: true,
      MyProfileFlag: false,
      ScheduleSessionFlag: false,
      ResultDetailsFlag: false
    });
  };

  handleResultDetailsFlag = () => {
    this.setState({
      ResultDetailsFlag: true,
      CourseWareFlag: false,
      MyProfileFlag: false,
    
      ScheduleSessionFlag: false,

    });
    this.GetResult()
  }

  GetResult = () => {
    authServices
      .GetAllResult()
      .then((data) => {
        console.log("TestData : ", data.data);

        if (data !== null) {

          this.setState({

            ResultData: data.data,


            OpenLoader: false,

          });

        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  handleMyProfileFlag = () => {
    this.setState({
      CourseWareFlag: false,
      ScheduleSessionFlag: false,
      MyProfileFlag: true,
      ResultDetailsFlag: false,
      // OpenCard: false,
    });
    this.GetUserByID()

  }

  handleEdit = (emp, gender, employeeName, hrld, managerId, userName) => {
    this.setState({
      EditID: emp,
      CourseWareFlagPlus: false,
      EmployeetName: employeeName,
      HRLISt: hrld,
      Gender: gender,
      ManagerList: managerId,
      EmailID: userName

    })

  }



  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  handleEditAdmin = () => {
    this.setState({
      MyProfileDetails: false
    })
  }

  GetallSechdule = () => {
    authServices
      .GetallSechdule()
      .then((data) => {
        console.log("filedata : ", data);

        if (data !== null) {

          this.setState({
            ScheduleData: data.data,
            OpenLoader: false,

          });
          this.GetAllOrderDetails()
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }
  NoticeGet = () => {

    authServices
      .NoticeGet()
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);

        if (data.data !== null) {

          this.setState({
            NoticeData: data.data.data,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  handleDeleteSession = (id) => {
    authServices
      .DeleteSessionData(id)
      .then((data) => {
        console.log("filedata : ", data);

        if (data !== null) {

          this.setState({
            Message: data.data.message,
            OpenLoader: false,
            OpenSnackBar: true

          });
          this.GetallSechdule()
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }
  handlePluseIcon = () => {
    this.setState({
      StudentProfileCreate: false
    })

  }

  GetUserByID = () => {
    let teacherid = localStorage.getItem("FACULTY")
    authServices
      .GetUserByID(teacherid)
      .then((data) => {
        console.log("TeacherData Data : ", data);

        if (data.data !== null) {

          this.setState({
            TeacherData: data.data,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }



  render() {

    const { ScheduleData, ScheduleSessionFlag, MyProfileDetails, NoticeData, ResultData,
      TeacherData, ResultDetailsFlag, CourseWareFlag, OpenSnackBar, Message, MyProfileFlag,CourseWareFlagPlus } = this.state


    return (
      <div className="UserDashBoard-Container">
        <div className="Sub-Container">
          <div className="Header">
            <AppBar position="static" style={{ backgroundColor: "#355d35" }}>
              <Toolbar>
                <Typography
                  variant="h6"
                  style={{
                    flexGrow: 3,
                    display: "flex",
                    padding: "5px 0 0 21px",
                    boxSizing: "border-box",
                    fontSize: "23px",
                    fontWeight: "bold"
                  }}
                >
                  Learning Management System ( Teacher )

                </Typography>


                <Button
                  color="inherit"
                  onClick={() => {
                    this.SignOut();
                  }}
                >
                  LogOut
                </Button>
              </Toolbar>
            </AppBar>
          </div>
          <div className="Body">
            <div className="Sub-Body">
              <div className="SubBody11">
                <div
                  className={ScheduleSessionFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleScheduleSessionFlag();
                  }}
                >
                  <div className="NavButtonText">Home</div>
                </div>

                <div
                  className={CourseWareFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleCourseWareFlag();
                  }}
                >
                  <div className="NavButtonText">Course Ware</div>
                </div>
                <div
                  className={ResultDetailsFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleResultDetailsFlag();
                  }}
                >
                  <div className="NavButtonText">Students Results </div>
                </div>
                <div
                  className={MyProfileFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleMyProfileFlag();
                  }}
                >
                  <div className="NavButtonText">My Profile</div>
                </div>
              </div>
              <div className="SubBody22">
                <div className="bodyContent" >
                  {ResultDetailsFlag && <>
                    <div className="GetUserMenus-SubContainerAdmin">
                      <TableContainer component={Paper}>
                        <Table className="tableDeliveryboy" aria-label="simple table">

                          <>
                            <TableHead></TableHead>
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  align="Left"
                                  style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                >
                                  Student Id
                                </TableCell>
                                <TableCell
                                  align="Left"
                                  style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                >
                                  Student Name
                                </TableCell>
                                <TableCell
                                  align="Left"
                                  style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                >
                                  Student CCat RollNo
                                </TableCell>
                                <TableCell
                                  align="Left"
                                  style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                >
                                  Student PRN No
                                </TableCell>
                                <TableCell
                                  align="Left"
                                  style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                >
                                  Test Name
                                </TableCell>
                                <TableCell
                                  align="Left"
                                  style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                >
                                  Batch Name
                                </TableCell>
                                <TableCell
                                  align="Left"
                                  style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                >
                                  TotalMarks
                                </TableCell>
                                <TableCell
                                  align="Left"
                                  style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                >
                                  Obtained Marks
                                </TableCell>


                              </TableRow>
                            </TableHead>
                          </>

                          <TableBody>
                            {ResultData?.length > 0
                              ? ResultData.map((data, index) => {


                                return (
                                  <TableRow >

                                    <>
                                      <TableCell align="Left" style={{ width: 200 }}>
                                        {data.student.studentId}
                                      </TableCell>
                                      <TableCell align="Left" style={{ width: 200 }}>
                                        {data.student.user.name}
                                      </TableCell>
                                      <TableCell align="Left" style={{ width: 100 }}>
                                        {data.student.ccat_Roll_no}
                                      </TableCell>

                                      <TableCell align="Left" style={{ width: 100 }}>
                                        {data?.student.studentPRN}
                                      </TableCell>
                                      <TableCell align="Left" style={{ width: 100 }}>
                                        {data?.test.testName}
                                      </TableCell>
                                      <TableCell align="Left" style={{ width: 100 }}>
                                        {data.student.batch.name}

                                      </TableCell>
                                      <TableCell align="Left" style={{ width: 100 }}>
                                        {data?.test.totalMarks}

                                      </TableCell>
                                      <TableCell align="Left" style={{ width: 100 }}>
                                        {data.obtainedMarks}

                                      </TableCell>
                                      {/* <TableCell align="Left" style={{ width: 100 }}>
                                                                                {data.userName}
                                                                            </TableCell> */}


                                    </>
                                  </TableRow>
                                );
                              })
                              : null}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>

                  </>}
                  {ScheduleSessionFlag &&
                    <>
                      <div className="GetUserMenus-SubContainerAdmin">
                        <TableContainer component={Paper}>
                          <Table className="tableDeliveryboy" aria-label="simple table">

                            <>
                              <TableHead></TableHead>
                              <TableHead>
                                <TableRow>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Schedule ID
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Session
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Date
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Start Time
                                  </TableCell>
                                  <TableCell
                                    align="Left"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    End Time
                                  </TableCell>


                                  <TableCell
                                    align="Left"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Action
                                  </TableCell>


                                </TableRow>
                              </TableHead>
                            </>

                            <TableBody>
                              {ScheduleData?.length > 0
                                ? ScheduleData.map((data, index) => {
                                  return (
                                    <TableRow >

                                      <>
                                        <TableCell align="Left" style={{ width: 200 }}>
                                          {data.sessionId}
                                        </TableCell>
                                        <TableCell align="Left" style={{ width: 200 }}>
                                          {data.sessionName}
                                        </TableCell>
                                        <TableCell align="Left" style={{ width: 100 }}>
                                          {data.date}
                                        </TableCell>

                                        <TableCell align="Left" style={{ width: 100 }}>
                                          {data.timeStart}
                                        </TableCell>
                                        <TableCell align="Left" style={{ width: 100 }}>
                                          {data.timeend}
                                        </TableCell>

                                        <TableCell align="Left" style={{ width: 100 }}>
                                          <DeleteIcon onClick={() => this.handleDeleteSession(data.sessionId)} />
                                        </TableCell>
                                      </>
                                    </TableRow>
                                  );
                                })
                                : null}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </>}


                  {CourseWareFlag &&
                    <>

                      <div className="CardMainDiv">
                        {this.state.TopisCourseWare.map((data) => {
                          return (
                            <div className="CardDiv">

                              <h5 className="heading">{data.name}</h5>


                              <ul className="ulClass">
                                {data.value.map((ele) => {
                                  return (
                                    <>
                                      <li> <a href={ele}>{ele}</a></li>
                                    </>)
                                })}

                              </ul>




                            </div>)
                        })}

                      </div>
                      {/* <div className="plusContent">
                         <div className="plusContent_sub">
                             <div className="sportstitlePlus">Expoter Details</div>
                             <div>
                                 <form className="form">
                                     <div className="fileImage">
                                         <label className="imagetitle" for="myfile">Select a Image :</label>
                                         <div className="fileInput">
                                             <input className="inputFile" type="file" id="myfile" name="choosetype" onChange={(e) => this.filechangehandler(e)} />
                                             <label>{this.state.fdata.name}</label>
                                         </div></div>
                                     <TextField
                                         type="number"
                                         className="TextField1"
                                         name="NoOFDAys"
                                         label="Number of Days"
                                         variant="outlined"
                                         size="small"
                                         style={{ margin: 20 }}
                                         error={NoOFDAysFlag}
                                         value={NoOFDAys}
                                         onChange={(e) => this.handleInputChange(e)}
                                     />
                                     <select
                                         className="select_gender"
                                         id="typesLeave"
                                         name="typesLeave"
                                         error={typesLeaveFLag}
                                         value={typesLeave}
                                         onChange={(e) => this.handleInputChange(e)}

                                     >


                                         <option value="" selected disabled>Leave Type</option>
                                         <option value="0">ANNUAL LEAVE</option>
                                         <option value="1">PATERNITY LEAVE</option>
                                         <option value="2">MATERNITY LEAVE</option>

                                     </select>


                                     <div className="buttons">
                                         <button className="submitbtn1"
                                             onClick={(e) => this.handleSubmitapply(e)}
                                         >Submit</button>
                                         <button className="cancelbhn">Cancel</button>
                                     </div>

                                 </form>
                             </div>
                         </div>


                     </div> */}
                    </>
                  }

                  {MyProfileFlag &&
                    <>
                      {MyProfileDetails ?
                        <>
                          {/* <div className="sportstitle1 mb-4">New Agent  <ControlPointIcon className="iconbtn" onClick={() => this.handlePluseIcon()} /> </div> */}
                          <div className="GetUserMenus-SubContainerAdmin ">
                            <TableContainer component={Paper} className="tableStyle">
                              <Table className="" aria-label="simple table">
                                {/* {props.State === "UserHome" ? ( */}
                                <>
                                  <TableHead></TableHead>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        align="center"
                                        style={{ width: 50, fontEmailAgent: 600, fontSize: 15 }}
                                      >
                                        Teacher ID
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 50, fontEmailAgent: 600, fontSize: 15 }}
                                      >
                                        First Name
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 200, fontEmailAgent: 600, fontSize: 15 }}
                                      >
                                        Last Name
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 200, fontEmailAgent: 600, fontSize: 15 }}
                                      >
                                        Email Id
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 100, fontEmailAgent: 600, fontSize: 15 }}
                                      >
                                        Mobile Number
                                      </TableCell>

                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontEmailAgent: 600, fontSize: 15 }}
                                      >
                                        Role
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontEmailAgent: 600, fontSize: 15 }}
                                      >
                                        Date Of Birth
                                      </TableCell>
                                      {/* <TableCell
                                                        align="center"
                                                        style={{ width: 210, fontEmailAgent: 600, fontSize: 15 }}
                                                    >
                                                        Action
                                                    </TableCell> */}


                                    </TableRow>
                                  </TableHead>
                                </>
                                {/* ) : ( */}
                                <></>
                                {/* )} */}
                                <TableBody>

                                  <TableRow >
                                    {/* {props.State === "UserHome" ? ( */}
                                    <>
                                      <TableCell align="center" style={{ width: 200 }}>
                                        {TeacherData?.userId}

                                      </TableCell>
                                      <TableCell align="center" style={{ width: 200 }}>
                                        {TeacherData?.name}

                                      </TableCell>
                                      <TableCell align="center" style={{ width: 100 }}>
                                        {TeacherData?.emailId}

                                      </TableCell>
                                      <TableCell align="center" style={{ width: 100 }}>
                                        {TeacherData?.bloodGroup}
                                      </TableCell>
                                      <TableCell align="center" style={{ width: 100 }}>
                                        {TeacherData?.contactNo}
                                      </TableCell>
                                      <TableCell align="center" style={{ width: 100 }}>
                                        {TeacherData?.address}
                                      </TableCell>
                                      <TableCell align="center" style={{ width: 100 }}>

                                        {TeacherData?.dob}

                                      </TableCell>




                                    </>
                                    {/* ) : ( */}
                                    <></>
                                    {/* )} */}
                                  </TableRow>

                                </TableBody>
                              </Table>
                            </TableContainer>


                          </div>


                        </>
                        :
                        <>
                          <div className="plusContent">
                            <div className="plusContent_sub">
                              {/* {UpdateBtn ? */}
                              {/* <div className="sportstitlePlus">Create New Agent </div> */}
                              {/* : */}
                              <div className="sportstitlePlus">Edit My Profile </div>
                              <div>
                                <form className="form">

                                  <TextField
                                    className="TextField1"
                                    name="FirstNameAgent"
                                    label="First Name"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    // error={FirstNameAgentFlag}
                                    // value={FirstNameAgent}
                                    onChange={(e) => this.handleInputChangeAgentData(e)}
                                  />
                                  <TextField
                                    type="text"
                                    className="TextField1"
                                    name="LastNameAgent"
                                    label="Last Name"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    // error={LastNameAgentFlag}
                                    // value={LastNameAgent}
                                    onChange={(e) => this.handleInputChangeAgentData(e)}
                                  />
                                  <TextField
                                    type="text"
                                    className="TextField1"
                                    name="EmailAgent"
                                    label="Email ID"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    // error={EmailAgentFlag}
                                    // value={EmailAgent}
                                    onChange={(e) => this.handleInputChangeAgentData(e)}
                                  />
                                  <TextField
                                    type="text"
                                    className="TextField1"
                                    name="MobileNoAgent"
                                    label="Mobile Number"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    // error={MobileNoAgentFlag}
                                    // value={MobileNoAgent}
                                    onChange={(e) => this.handleInputChangeAgentData(e)}
                                  />
                                  <TextField
                                    type="text"
                                    className="TextField1"
                                    name="PasswordAgent"
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    // error={PasswordAgentFlag}
                                    // value={PasswordAgent}
                                    onChange={(e) => this.handleInputChangeAgentData(e)}
                                  />
                                  <div className="buttons">
                                    {/* {UpdateBtn ? */}
                                    <button className="submitbtn1"
                                      onClick={(e) => this.handleAgentSubmit(e)}
                                    >Submit</button>
                                    {/* : */}
                                    {/* <button className="submitbtn1"
                                                        onClick={(e) => this.handleAgentEditSubmit(e)}
                                                    >Update</button>} */}
                                    <button className="cancelbhn">Cancel</button>
                                  </div>

                                </form>
                              </div>
                            </div>


                          </div>
                        </>
                      }
                    </>
                  }

                </div>
              </div>
              {ScheduleSessionFlag &&
                <div className="SubBody11">
                  <div                                >
                    <div className="NavButtonText">Notice display</div>
                  </div>

                  {NoticeData?.map((ele, ind) => {
                    return (
                      <>
                        <div
                          className="dispalyNotice"
                          onClick={() => {
                            this.handleCourseWareFlag();
                          }}
                        >

                          <h4 className="heading">Notice {ind + 1}</h4>
                          <div className="heading">{ele.description} </div>


                        </div></>)
                  })}



                </div>}

            </div>
          </div>

          <div className="FooterDiv">Footer</div>
        </div>
        <Backdrop
          style={{ zIndex: "1", color: "#fff" }}
          open={this.state.OpenLoader}
          onClick={() => {
            this.setState({ OpenLoader: false });
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={OpenSnackBar}
          autoHideDuration={2000}
          onClose={this.handleSnackBarClose}
          message={Message}
          action={
            <React.Fragment>
              <Button
                color="secondary"
                size="small"
                onClick={this.handleSnackBarClose}
              >
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleSnackBarClose}
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
