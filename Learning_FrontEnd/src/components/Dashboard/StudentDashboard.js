import React, { Component } from "react";

import "./TeachersDashboard.css";
import "./MangerDashboard.css";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Radio from "@material-ui/core/Radio";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField"
import AuthServices from "../../configurations/AuthServices";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from "@mui/icons-material/Delete";

// import Typography from '@mui/material/Typography';   
// import { CardActionArea, CardActions } from '@mui/material';
// import ProgramConst from "./ProgramConst"


const authServices = new AuthServices();
const minDate = new Date(Date.now());
// const customerServices = new CustomerServices();

export default class EmployeeDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NoOFDAys: "",
            NoOFDAysFlag: false,
            typesLeaveFLag: false,
            typesLeave: "",
            OpenSnackBar: false,
            CourseWareFlag: false,
            fdata: new FormData(),
            TestID: "",
            TestIDFlag: false,
            ResultDetailsFlag: false,
            MyProfileFlag: false,
            ScheduleSessionFlag: true,
            MyProfileDetails: true,
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
            ScheduleData: [],
            NoticeData: [],
            TestData: [],
            ResultData: [],
            arr: [],
            arrTrack: [],
            EaxamQuestions: true,
            QuestionData: [],
            OptionARadio: "",
            OptionBRadio: "",
            OptionCRadio: "",
            OptionDRadio: "",
            ObtainedMarksStore: 0,
            StudentName: "",
            StudentNameFlag: false,
            StudentCCatRollNoFlag: false,
            StudentCCatRollNo: "",
            StudentPRNnumber: "",
            StudentPRNnumberFlag: false,
            EmailIDStudent: "",
            EmailIDStudentFlag: false,
            BloodGroup: "",
            BloodGroupFlag: false,
            Address: "",
            AddressFlag: false,
            Designation: "",
            DesignationFlag: false,
            DateOfBirth: "",
            DateOfBirthFlag: false,
            MobileNumber: "",
            MobileNumberFlag: false,
            PasswordStudent: "",
            PasswordStudentFlag: false,
            StudentData: [],
            BatchData: [],
            MarksObtained: 0

        };
    }

    componentDidMount = () => {
        this.GetallSechdule()
        this.NoticeGet()
    }

    handleRadioButton = (e, correctAns, ind) => {
        debugger
        let ObtainedMarks = 0;
        const { QuestionData, arr, arrTrack, ObtainedMarksStore } = this.state
        let CheckFlag = 0;
        let checked = e.target.checked
        console.log("checked", e.target.value)
        if (checked.toString() === "true") {
            for (let i = 0; i < QuestionData.length; i++) {

                let Q1 = QuestionData[i].option_A || QuestionData[i].option_B || QuestionData[i].option_C || QuestionData[i].option_D
                if (Q1) {
                    this.setState({
                        [e.target.name]: e.target.checked
                    })
                }

            }
            if (e.target.value === correctAns) {
                debugger;

                if (arr.length > 0) {

                    if (arr[ind] === undefined) {
                        if (e.target.value === correctAns) {

                            ObtainedMarks = ObtainedMarks + 5;
                            let value = { ind: ind, marks: ObtainedMarks }
                            arr.push(value);
                        }
                        else {
                            ObtainedMarks = ObtainedMarks;
                            let value = { ind: ind, marks: ObtainedMarks }
                            arr.push(value);
                        }
                    }

                } else {
                    ObtainedMarks = ObtainedMarks + 5;
                    let value = { ind: ind, marks: ObtainedMarks }
                    arr.push(value);


                }
            }
            else {
                // debugger


                // CheckFlag = 5;
                if (arr.length > 0) {
                    // for(let i=0;i< arr.length-1;i++){
                    if (arr[ind] === undefined)
                        if (e.target.value != correctAns) {
                            ObtainedMarks = ObtainedMarks;
                            let value = { ind: ind, marks: ObtainedMarks }
                            arr.push(value);
                        }
                }
            }

            var output = [];
            for (var i = 0; i < arr.length; ++i){
                output.push(arr[i].marks)}
                this.setState({
                    MarksObtained: output
                })
            return output;
           
           


        }

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




    handleCourseWareFlag = () => {
        this.setState({
            ResultDetailsFlag: false,
            ExamPortalFlag: false,
            CourseWareFlag: true,
            ScheduleSessionFlag: false,
            MyProfileFlag: false
        })
    }

    handleScheduleSessionFlag = () => {
        this.setState({
            ScheduleSessionFlag: true,
            ResultDetailsFlag: false,
            ExamPortalFlag: false,
            CourseWareFlag: false,
            MyProfileFlag: false
            // ScheduleSessionFlag:false
        })
    }


    handleExamPortalFlag = () => {

        this.setState({
            ResultDetailsFlag: false,
            CourseWareFlag: false,
            ExamPortalFlag: true,
            ScheduleSessionFlag: false,
            MyProfileFlag: false

        });
        // this.HandleTestData()
    }

    handleResultDetailsFlag = () => {
        this.setState({
            ResultDetailsFlag: true,
            CourseWareFlag: false,
            ExamPortalFlag: false,
            ScheduleSessionFlag: false,
            MyProfileFlag: false

        });
        this.GetResult()
    }

    handleMyProfileFlag = () => {
        this.setState({
            ResultDetailsFlag: false,
            CourseWareFlag: false,
            ExamPortalFlag: false,
            ScheduleSessionFlag: false,
            MyProfileFlag: true

        });
        this.GetStudentById()
        this.GetAllBatchData()

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


    handleSnackBarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ OpenSnackBar: false });
    };

    handlePaging = async (e, value) => {
        let state = this.state;
        console.log("Current Page : ", value);

        this.setState({
            PageNumber: value,
        });

        if (state.ExamPortalFlag) {
            await this.GetAllAdminProductList(value);
        }
    };

    SignOut = async () => {
        await localStorage.removeItem("token");

        this.props.history.push("/SignIn");
    };



    handleInputChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })

    }

    handleEditAdmin = () => {
        const { StudentData } = this.state

        this.setState({
            MyProfileDetails: false,
            StudentCCatRollNo: StudentData.ccat_Roll_no,
            StudentName: StudentData.user.name,
            StudentPRNnumber: StudentData.studentPRN,
            BloodGroup: StudentData.user.bloodGroup,
            Gender: StudentData.user.gender,
            Address: StudentData.user.address,
            DateOfBirth: StudentData.user.dob,
            MobileNumber: StudentData.user.contactNo,
            BranchNameStudent: StudentData.batch.batchId,
            EmailIDStudent: StudentData.user.emailId,

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
    HandleTestData = (e) => {
        e.preventDefault()
        authServices
            .GetALlTestBYID(this.state.TestID)
            .then((data) => {
                console.log("TestData : ", data.data.totalMarks);

                if (data !== null) {

                    this.setState({
                        EaxamQuestions: false,
                        TestData: data.data,
                        QuestionData: data.data.module.questionList,

                        OpenLoader: false,

                    });
                    // this.GetAllOrderDetails()
                }
            })
            .catch((error) => {
                console.log("GetUserAppointments Error : ", error);
                this.setState({ OpenLoader: false });
            });
    }

    HandleSubmitTEst = () => {
        let arr = this.state.MarksObtained.reduce((partialSum, a) => partialSum + a, 0);
        console.log("MarksObtained", arr);


        let res = {
            "resultId": 0,
            "obtainedMarks":arr,
            "studentId": parseInt(localStorage.getItem("StudentID")),
            "testId": parseInt(this.state.TestID)
        }

        authServices
            .SubmitResultData(res)
            .then((data) => {
                debugger
                console.log("TestData : ", data.data.totalMarks);

                if (data !== null) {

                    this.setState({
                        ResultDetailsFlag: true,
                        ExamPortalFlag:false,                      
                         OpenLoader: false,

                    });
                    this.GetResult()
                }
            })
            .catch((error) => {
                console.log("GetUserAppointments Error : ", error);
                this.setState({ OpenLoader: false });
            });
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

    GetStudentById = () => {
        let studentId = localStorage.getItem("Student")
        authServices
            .GetStudentById(studentId)
            .then((data) => {
                console.log("StudentData : ", data.data);

                if (data !== null) {

                    this.setState({
                        StudentData: data.data,
                        OpenLoader: false,

                    });

                }
            })
            .catch((error) => {
                console.log("GetUserAppointments Error : ", error);
                this.setState({ OpenLoader: false });
            });
    }
    GetAllBatchData = () => {
        authServices
            .GetAllBatchData()
            .then((data) => {
                console.log("filedata : ", data);

                if (data !== null) {

                    this.setState({
                        BatchData: data.data,
                        OpenLoader: false,
                        // OpenSnackBar: true,
                        // Message: "SuccessFully Created Batch"
                    });
                    this.GetAllOrderDetails()
                }
            })
            .catch((error) => {
                console.log("GetUserAppointments Error : ", error);
                this.setState({ OpenLoader: false });
            });

    }
    checkValidationCreateStudent = () => {
        let valid = true;
        const { StudentName, StudentCCatRollNo, StudentPRNnumber, BloodGroup, MobileNumber, PasswordStudent, DateOfBirth, Address, EmailIDStudent, Designation, Gender,
            BranchNameStudent, BranchStatusStudent, } = this.state
        if (StudentName === "") {
            this.setState({
                StudentNameFlag: true
            })
            valid = false;
        }
        if (StudentCCatRollNo === "") {
            this.setState({
                StudentCCatRollNoFlag: true
            })
            valid = false;
        }
        if (StudentPRNnumber === "") {
            this.setState({
                StudentPRNnumberFlag: true
            })
            valid = false;
        }
        if (Gender === "") {
            document.getElementById("Gender").classList.add("validation")
            valid = false;
        }
        if (BloodGroup === "") {

            this.setState({
                BloodGroupFlag: true
            })
            valid = false;
        }
        if (MobileNumber === "") {
            this.setState({
                MobileNumberFlag: true
            })
            valid = false;
        }
        if (PasswordStudent === "") {
            this.setState({
                PasswordStudentFlag: true
            })
            valid = false;
        }
        if (Address === "") {
            this.setState({
                AddressFlag: true
            })
            valid = false;
        }
        if (EmailIDStudent === "") {
            this.setState({
                EmailIDStudentFlag: true
            })
            valid = false;
        }

        if (DateOfBirth === "") {
            this.setState({
                DateOfBirthFlag: true
            })
            valid = false;
        }
        if (BranchNameStudent === "") {
            document.getElementById("BranchNameStudent").classList.add("validation")
            valid = false;
        }

        return valid;
    }
    handleCreateStudentOfficeSubmit = (e) => {
        e.preventDefault()
        let isValid = this.checkValidationCreateStudent()
        const { StudentCCatRollNo, StudentName, StudentPRNnumber, BloodGroup, Gender, DateOfBirth, Designation, EmailIDStudent, PasswordStudent, MobileNumber, Address, BranchNameStudent, BranchStatusStudent } = this.state
        if (isValid) {
            let res = {
                "studentId": 0,
                "ccat_Roll_no": parseInt(StudentCCatRollNo),
                "studentPRN": parseInt(StudentPRNnumber),
                "user": {
                    "userId": 0,
                    "password": PasswordStudent.toString(),
                    "name": StudentName.toString(),
                    "emailId": EmailIDStudent.toString(),
                    "bloodGroup": BloodGroup.toString(),
                    "gender": Gender.toString(),
                    "designation": "STUDENT",
                    "contactNo": MobileNumber.toString(),
                    "address": Address.toString(),
                    "dob": DateOfBirth.toString()
                },
                "batchId": parseInt(BranchNameStudent)
            }
            let studentId =  parseInt(localStorage.getItem("StudentID"));

            authServices
                .UpdateStudentDetails(studentId, res)
                .then((data) => {
                    console.log("filedata : ", data);

                    if (data !== null) {

                        this.setState({
                            MyProfileDetails: true,
                            StudentCCatRollNo: "",
                            StudentName: "",
                            StudentPRNnumber: "",
                            BloodGroup: "",
                            Gender: "",
                            Designation: "",
                            EmailIDStudent: "",
                            BranchNameStudent: "",
                            BranchStatusStudent: "",
                            Address: "",
                            DateOfBirth: "",
                            MobileNumber: "",
                            PasswordStudent: "",
                            ModuleName: "",

                            OpenLoader: false,
                            OpenSnackBar: true,
                            Message: "SuccessFully Created Module"
                        });
                        this.GetStudentById();
                    }
                })
                .catch((error) => {
                    console.log("GetUserAppointments Error : ", error);
                    this.setState({ OpenLoader: false });
                });

        }
    }
    handleInputChange = (e) => {

        let val = e.target.value
        if (e.target.name === "BranchName") {
            this.setState({
                BranchName: e.target.value,
                BranchNameFlag: false
            })
        }
        if (e.target.name === "branchStatus") {
            this.setState({
                branchStatus: e.target.value,
                branchStatusFlag: false
            })
        }
        if (e.target.name === "StudentCCatRollNo") {
            this.setState({
                StudentCCatRollNo: e.target.value,
                StudentCCatRollNoFlag: false
            })
        }
        if (e.target.name === "StudentName") {
            this.setState({
                StudentName: e.target.value,
                StudentNameFlag: false
            })
        }
        if (e.target.name === "PasswordStudent") {
            this.setState({
                PasswordStudent: e.target.value,
                PasswordStudentFlag: false
            })
        }
        if (e.target.name === "StudentPRNnumber") {
            this.setState({
                StudentPRNnumber: e.target.value,
                StudentPRNnumberFlag: false
            })
        }
        if (e.target.name === "EmailIDStudent") {
            this.setState({
                EmailIDStudent: e.target.value,
                EmailIDStudentFlag: false
            })
        }
        if (e.target.name === "BloodGroup") {
            this.setState({
                BloodGroup: e.target.value,
                BloodGroupFlag: false
            })
        }
        if (e.target.name === "Designation") {
            this.setState({
                Designation: e.target.value,
                DesignationFlag: false
            })
        }
        if (e.target.name === "Address") {
            this.setState({
                Address: e.target.value,
                AddressFlag: false
            })
        }
        if (e.target.name === "DateOfBirth") {
            this.setState({
                DateOfBirth: e.target.value,
                DateOfBirthFlag: false
            })
        }
        if (e.target.name === "MobileNumber") {
            this.setState({
                MobileNumber: e.target.value,
                MobileNumberFlag: false
            })
        }
        if (e.target.name === "PasswordStudent") {
            this.setState({
                PasswordStudent: e.target.value,
                PasswordStudentFlag: false
            })
        }
        if (e.target.name === "ModuleName") {
            this.setState({
                ModuleName: e.target.value,
                ModuleNameFlag: false
            })
        }
        if (e.target.name === "BranchNameStudent") {
            this.setState({
                BranchNameStudent: e.target.value,

            })
            document.getElementById("BranchNameStudent").classList.remove("validation")

        }



        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log("e.target.name", e.target.value))
    }
    render() {
        const { ScheduleData, MyProfileDetails, ScheduleSessionFlag, TestID, TestIDFlag, MyProfileFlag, ResultDetailsFlag, NoticeData, OpenSnackBar, Message, ExamPortalFlag, CourseWareFlag,
            EaxamQuestions, QuestionData, ResultData, OptionBRadio, OptionCRadio, OptionDRadio, typesLeave,
            StudentNameFlag, StudentName, StudentPRNnumberFlag, StudentData, StudentCCatRollNo, StudentCCatRollNoFlag, Gender, BranchNameStudent, BranchNameStudentFlag,
            StudentPRNnumber, EmailIDStudent, EmailIDStudentFlag, BloodGroup, BloodGroupFlag, Address, AddressFlag, HomePageDetailsData, AfterApiBatch, AfterApiModule,
            Designation, DesignationFlag, DateOfBirth, DateOfBirthFlag, MobileNumber, MobileNumberFlag, PasswordStudent, PasswordStudentFlag, } = this.state
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
                                    Learning Management System (Student)

                                </Typography>



                                <Button
                                    // style={{ flexGrow: 1 }}
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
                                    className={ExamPortalFlag ? "NavButton1" : "NavButton2"}
                                    onClick={() => {
                                        this.handleExamPortalFlag();
                                    }}
                                >

                                    <div className="NavButtonText">Exam Portal</div>
                                </div>

                                <div
                                    className={ResultDetailsFlag ? "NavButton1" : "NavButton2"}
                                    onClick={() => {
                                        this.handleResultDetailsFlag();
                                    }}
                                >
                                    <div className="NavButtonText">Result Details</div>
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
                                        </>}


                                    {ExamPortalFlag &&

                                        <>
                                            {EaxamQuestions ?
                                                <>
                                                    <div className="plusContent">
                                                        <div className="plusContent_sub">
                                                            <div className="sportstitlePlus">Enter Test Details</div>
                                                            <div>
                                                                <form className="form">

                                                                    <TextField

                                                                        className="TextField1"
                                                                        name="TestID"
                                                                        label="Test ID"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        style={{ margin: 20 }}
                                                                        error={TestIDFlag}
                                                                        value={TestID}
                                                                        onChange={(e) => this.handleInputChange(e)}
                                                                    />


                                                                    <div className="buttons">
                                                                        <button className="submitbtn1"
                                                                            onClick={(e) => this.HandleTestData(e)}
                                                                        >Submit</button>
                                                                        <button className="cancelbhn">Cancel</button>
                                                                    </div>

                                                                </form>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className="GetUserMenus-SubContainerAdmin">
                                                        <div className="ExamQuestionDiv">
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
                                                                                    S no
                                                                                </TableCell>
                                                                                <TableCell
                                                                                    align="Left"
                                                                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                                                                >
                                                                                    Question
                                                                                </TableCell>
                                                                                <TableCell
                                                                                    align="Left"
                                                                                    style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                                                                >
                                                                                    Option A
                                                                                </TableCell>
                                                                                <TableCell
                                                                                    align="Left"
                                                                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                                                                >
                                                                                    Option C
                                                                                </TableCell>
                                                                                <TableCell
                                                                                    align="Left"
                                                                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                                                                >
                                                                                    Option B
                                                                                </TableCell>


                                                                                <TableCell
                                                                                    align="Left"
                                                                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                                                                >
                                                                                    Option D
                                                                                </TableCell>


                                                                            </TableRow>
                                                                        </TableHead>
                                                                    </>

                                                                    <TableBody>
                                                                        {QuestionData?.length > 0
                                                                            ? QuestionData.map((data, index) => {
                                                                                return (
                                                                                    <TableRow >

                                                                                        <>
                                                                                            <TableCell align="Left" style={{ width: 200 }}>
                                                                                                {data.questionId}
                                                                                            </TableCell>
                                                                                            <TableCell align="Left" style={{ width: 200 }}>
                                                                                                {data.question}
                                                                                            </TableCell>

                                                                                            <TableCell align="Left" style={{ width: 200 }}>
                                                                                                <>
                                                                                                    <input type="radio" id="optionA" name={"OptionARadio_" + data.questionId} value={data.option_A} onChange={(e) => this.handleRadioButton(e, data.correctAns, data.questionId)} />
                                                                                                    <label for="optionA">{data.option_A}</label></>
                                                                                            </TableCell>
                                                                                            <TableCell align="Left" style={{ width: 100 }}>
                                                                                                <>
                                                                                                    <input type="radio" id="optionB" name={"OptionARadio_" + data.questionId} value={data.option_B} onChange={(e) => this.handleRadioButton(e, data.correctAns, data.questionId)} />
                                                                                                    <label for="optionB">{data.option_B}</label></>
                                                                                            </TableCell>

                                                                                            <TableCell align="Left" style={{ width: 100 }}>
                                                                                                <>
                                                                                                    <input type="radio" id="optionC" name={"OptionARadio_" + data.questionId} value={data.option_C} onChange={(e) => this.handleRadioButton(e, data.correctAns, data.questionId)} />
                                                                                                    <label for="optionC">{data.option_C}</label></>
                                                                                            </TableCell>
                                                                                            <TableCell align="Left" style={{ width: 100 }}>
                                                                                                <>
                                                                                                    <input type="radio" id="optionD" name={"OptionARadio_" + data.questionId} value={data.option_D} onChange={(e) => this.handleRadioButton(e, data.correctAns, data.questionId)} />
                                                                                                    <label for="optionD">{data.option_D}</label></>
                                                                                            </TableCell>


                                                                                        </>
                                                                                    </TableRow>
                                                                                );
                                                                            })
                                                                            : null}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer></div>

                                                        <div className="ExamBtn"><button className="BtnSubmitTest" onClick={() => this.HandleSubmitTEst()}>Submit Test</button></div>
                                                    </div>


                                                </>
                                            }
                                        </>}

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
                                    {MyProfileFlag &&
                                        <>
                                            {MyProfileDetails ?
                                                <>
                                                    {/* <div className="sportstitle1 mb-4">Add New Student <ControlPointIcon className="iconbtn" onClick={() => this.handlePluseIcon(this.setState({ StudentProfileCreate: false }))} /> </div> */}

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
                                                                                PRN
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="Left"
                                                                                style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                                                            >
                                                                                ccat_Roll_no
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="Left"
                                                                                style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                                                            >
                                                                                Email Id
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="Left"
                                                                                style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                                                            >
                                                                                MobileNo
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="Left"
                                                                                style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                                                            >
                                                                                Gender
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="Left"
                                                                                style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                                                            >
                                                                                Blood Group                                      </TableCell>
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
                                                                                Address
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

                                                                    <TableRow >

                                                                        <>
                                                                            <TableCell align="Left" style={{ width: 200 }}>
                                                                                {StudentData.studentId}
                                                                            </TableCell>
                                                                            <TableCell align="Left" style={{ width: 200 }}>
                                                                                {StudentData.user?.name}
                                                                            </TableCell>
                                                                            <TableCell align="Left" style={{ width: 100 }}>
                                                                                {StudentData.studentPRN}
                                                                            </TableCell>

                                                                            <TableCell align="Left" style={{ width: 100 }}>
                                                                                {StudentData.ccat_Roll_no}
                                                                            </TableCell>
                                                                            <TableCell align="Left" style={{ width: 100 }}>
                                                                                {StudentData.user?.emailId}
                                                                            </TableCell>
                                                                            <TableCell align="Left" style={{ width: 100 }}>
                                                                                {StudentData.user?.contactNo}

                                                                            </TableCell>
                                                                            <TableCell align="Left" style={{ width: 100 }}>
                                                                                {StudentData.user?.gender === "F" ? "Female" : "Male"}

                                                                            </TableCell>
                                                                            <TableCell align="Left" style={{ width: 100 }}>
                                                                                {StudentData.user?.bloodGroup}

                                                                            </TableCell>
                                                                            <TableCell align="Left" style={{ width: 100 }}>
                                                                                {StudentData.batch?.name}
                                                                            </TableCell>
                                                                            <TableCell align="Left" style={{ width: 100 }}>
                                                                                {StudentData.user?.address}
                                                                            </TableCell>
                                                                            <TableCell
                                                                                align="Left"
                                                                                style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                                                            >
                                                                                <EditIcon
                                                                                    onClick={() => this.handleEditAdmin(StudentData.studentId)} />
                                                                            </TableCell>


                                                                        </>
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
                                                            <div className="sportstitlePlus">Student Details</div>
                                                            <div>
                                                                <form className="form">

                                                                    <TextField
                                                                        type="text"
                                                                        className="TextField1"
                                                                        name="StudentName"
                                                                        label="Student Name"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        style={{ margin: 20 }}
                                                                        error={StudentNameFlag}
                                                                        value={StudentName}
                                                                        onChange={(e) => this.handleInputChange(e)}
                                                                    />
                                                                    <TextField
                                                                        type="number"
                                                                        className="TextField1"
                                                                        name="StudentCCatRollNo"
                                                                        label="Student CCat Roll No"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        disabled
                                                                        style={{ margin: 20 }}
                                                                        error={StudentCCatRollNoFlag}
                                                                        value={StudentCCatRollNo}
                                                                        onChange={(e) => this.handleInputChange(e)}
                                                                    />
                                                                    <TextField
                                                                        type="number"
                                                                        className="TextField1"
                                                                        name="StudentPRNnumber"
                                                                        label="Student PRN Number"
                                                                        variant="outlined"
                                                                        disabled
                                                                        size="small"
                                                                        style={{ margin: 20 }}
                                                                        error={StudentPRNnumberFlag}
                                                                        value={StudentPRNnumber}
                                                                        onChange={(e) => this.handleInputChange(e)}
                                                                    />

                                                                    <TextField
                                                                        type="text"
                                                                        className="TextField1"
                                                                        name="EmailIDStudent"
                                                                        label="Email Id"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        disabled
                                                                        style={{ margin: 20 }}
                                                                        error={EmailIDStudentFlag}
                                                                        value={EmailIDStudent}
                                                                        onChange={(e) => this.handleInputChange(e)}
                                                                    />
                                                                    <TextField
                                                                        type="text"
                                                                        className="TextField1"
                                                                        name="BloodGroup"
                                                                        label="Blood Group"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        style={{ margin: 20 }}
                                                                        error={BloodGroupFlag}
                                                                        value={BloodGroup}
                                                                        onChange={(e) => this.handleInputChange(e)}
                                                                    />
                                                                    <TextField
                                                                        type="text"
                                                                        className="TextField1"
                                                                        name="Address"
                                                                        label="Address"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        style={{ margin: 20 }}
                                                                        error={AddressFlag}
                                                                        value={Address}
                                                                        onChange={(e) => this.handleInputChange(e)}
                                                                    />
                                                                    <div>
                                                                        <select
                                                                            className="select_gender"
                                                                            id="Gender"
                                                                            value={Gender}
                                                                            name="Gender"
                                                                            label="Gender"
                                                                            disabled
                                                                            onChange={(e) => this.handleInputChange(e)}
                                                                        >
                                                                            <option value="" disabled selected>Select Gender</option>
                                                                            <option value="M">Male</option>
                                                                            <option value="F">Female</option>

                                                                        </select>
                                                                    </div>

                                                                    <TextField
                                                                        type="date"
                                                                        className="TextField1"
                                                                        name="DateOfBirth"
                                                                        label="Date Od Birth"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        style={{ margin: 20 }}
                                                                        error={DateOfBirthFlag}
                                                                        value={DateOfBirth}
                                                                        onChange={(e) => this.handleInputChange(e)}
                                                                    />
                                                                    <TextField
                                                                        type="text"
                                                                        className="TextField1"
                                                                        name="MobileNumber"
                                                                        label="Mobile Number"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        style={{ margin: 20 }}
                                                                        error={MobileNumberFlag}
                                                                        value={MobileNumber}
                                                                        onChange={(e) => this.handleInputChange(e)}
                                                                    />

                                                                    <TextField
                                                                        type="password"
                                                                        className="TextField1"
                                                                        name="PasswordStudent"
                                                                        label="Password"
                                                                        variant="outlined"
                                                                        size="small"
                                                                        style={{ margin: 20 }}
                                                                        error={PasswordStudentFlag}
                                                                        value={PasswordStudent}
                                                                        onChange={(e) => this.handleInputChange(e)}
                                                                    />


                                                                    <div>
                                                                        <select
                                                                            className="select_gender"
                                                                            id="BranchNameStudent"
                                                                            value={BranchNameStudent}
                                                                            name="BranchNameStudent"
                                                                            label="Branch Name"
                                                                            disabled
                                                                            error={BranchNameStudentFlag}
                                                                            onChange={(e) => this.handleInputChange(e)}
                                                                        >


                                                                            <option value="" selected disabled>Branch Name</option>
                                                                            {this.state.BatchData.map((ele, ind) => {
                                                                                console.log("ele", ele)
                                                                                return (
                                                                                    <>

                                                                                        <option value={ele.batchId}>{ele.name}</option>
                                                                                    </>


                                                                                )
                                                                            })}
                                                                        </select>
                                                                    </div>




                                                                    <div className="buttons">

                                                                        <button className="submitbtn1"
                                                                            onClick={(e) => this.handleCreateStudentOfficeSubmit(e)}
                                                                        >Submit</button>

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
            </div >
        );
    }
}
