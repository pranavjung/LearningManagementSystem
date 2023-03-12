import React, { Component } from "react";
import "./MangerDashboard.css";
import "./TeachersDashboard"

import AuthServices from "../../configurations/AuthServices";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DownloadIcon from '@mui/icons-material/Download';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

import AppBar from "@material-ui/core/AppBar";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";

import TextField from "@material-ui/core/TextField";
// import AuthServices from "../../configurations/AuthServices";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";


const authServices = new AuthServices();

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});


class ManagerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {


      StudentPRofileCreateFlag: false,
      LeaveRequestData: [],
      Approved: true,
      CreateBatchDataFlag: false,
      CreateExamQuestion: false,
      CreateModuleDataFlag: false,
      StudentProfileCreate: true,
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
      BranchName: "",
      BranchNameFlag: false,
      branchStatus: "",
      branchStatusFlag: false,
      ModuleName: "",
      ModuleNameFlag: false,
      BranchNameStudent: "",
      BranchNameStudentFlag: false,
      BranchStatusStudent: "",
      BranchStatusStudentFlag: false,
      Gender: "",
      Question: "",
      QuestionFlag: false,
      OptionA: "",
      OptionAFlag: false,
      OptionB: "",
      OptionBFlag: false,
      OptionC: "",
      OptionCFlag: false,
      OptionD: "",
      OptionDFlag: false,
      CorrectAnswer: "",
      CorrectAnswerFlag: false,
      ModuleQuestionId: "",
      Waightage: "",
      WaightageFlag: false,
      HomePageDetailsData: true,
      HomEPageFlag: true,
      DateSchedule: "",
      DateScheduleFlag: false,
      StartTimeSchedule: "",
      StartTimeScheduleFlag: false,
      EndTimeSchedule: "",
      EndTimeScheduleFlag: false,
      Session: "",
      SessionFlag: false,
      BranchIDSession: "",
      BranchIDSessionFlag: false,
      AfterApiBatch: true,
      AfterApiModule: true,
      BatchData: [],
      ModuleData: [],
      QuestionData: [],
      StudentData: [],
      ScheduleData: [],
      QuestionExamFlag: true,
      CreateTEstDAtaFlag: false,
      AfterApiTest: true,
      TestName: "",
      TestNameFlag: false,
      Marks: "",
      MarksFlag: false,
      ModuleTest: "",
      TestData: [],
      NoticeDescription: ""



    };
  }


  componentWillMount() {
this.GetallSechdule()

  }



  handleClose = () => {
    console.log("Handle Close Calling ...");
    this.setState({
      open: false,
      Update: false,
      OpenEdit: false,
      OpenBookModel: false,
    });
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };


  SignOut = async () => {

    this.props.history.push("/SignIn");
  };


  handleStudentprofileCreateFlag = () => {
    this.setState({
      StudentPRofileCreateFlag: true,
      CreateBatchDataFlag: false,
      CreateModuleDataFlag: false,
      CreateExamQuestion: false,
      HomEPageFlag: false,
      CreateTEstDAtaFlag: false

    });
    this.GetAllBatchData()
    // this.GetAllOrderDetails();
    this.GetallStudents()
  };

  handleCreateBatchDataFlag = () => {
    this.setState({
      StudentPRofileCreateFlag: false,
      CreateBatchDataFlag: true,
      CreateModuleDataFlag: false,
      CreateExamQuestion: false,
      HomEPageFlag: false,
      CreateTEstDAtaFlag: false

    });
    this.GetAllBatchData()
  }
  handleHomEPageFlag = () => {
    this.setState({
      StudentPRofileCreateFlag: false,
      CreateBatchDataFlag: false,
      CreateModuleDataFlag: false,
      CreateExamQuestion: false,
      HomEPageFlag: true,
      CreateTEstDAtaFlag: false
    });
    this.GetAllBatchData()
    this.GetallSechdule()
  }
  handleCreateExamQuestion = () => {
    this.setState({
      StudentPRofileCreateFlag: false,
      CreateBatchDataFlag: false,
      CreateModuleDataFlag: false,
      CreateExamQuestion: true,
      HomEPageFlag: false,
      CreateTEstDAtaFlag: false

    });
    this.GetallQuestions()
  }
  handleCreateTEstDAtaFlag = () => {
    this.setState({
      StudentPRofileCreateFlag: false,
      CreateBatchDataFlag: false,
      CreateModuleDataFlag: false,
      CreateExamQuestion: false,
      HomEPageFlag: false,
      CreateTEstDAtaFlag: true

    });
    this.GetAllModuleData()
    this.GetAlTestData()
  }


  handleModuleOffice = () => {
    this.setState({
      StudentPRofileCreateFlag: false,
      CreateBatchDataFlag: false,
      CreateModuleDataFlag: true,
      CreateExamQuestion: false,
      HomEPageFlag: false,
      CreateTEstDAtaFlag: false

    });
    this.GetAllModuleData()
  }









  handleClose = () => {
    this.setState({
      openModel: false
    })

  };


  getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }







  ////////////////////////////////////////////////////
  handleDeleteQuestions=(id)=>{
    authServices
    .DeleteQuestionData(id)
    .then((data) => {
      console.log("filedata : ", data);

      if (data !== null) {

        this.setState({
          QuestionData: data.data,
          OpenLoader: false,

        });
        this.GetallQuestions()
      }
    })
    .catch((error) => {
      console.log("GetUserAppointments Error : ", error);
      this.setState({ OpenLoader: false });
    });
  }
  handleDeleteTest=(id)=>{
    authServices
    .DeleteTestData(id)
    .then((data) => {
      console.log("filedata : ", data);

      if (data !== null) {

        this.setState({
          QuestionData: data.data,
          OpenLoader: false,

        });
        this.GetAlTestData()
      }
    })
    .catch((error) => {
      console.log("GetUserAppointments Error : ", error);
      this.setState({ OpenLoader: false });
    });
  }
  handleDeleteStudent = (id) => {

    authServices
      .DeleteStudentData(id)
      .then((data) => {
        console.log("filedata : ", data);

        if (data !== null) {

          this.setState({
            QuestionData: data.data,
            OpenLoader: false,

          });
          this.GetallStudents()
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  handleDeleteBatch=(id)=>{
    authServices
    .DeleteBatchData(id)
    .then((data) => {
      console.log("filedata : ", data);

      if (data !== null) {

        this.setState({
          Message: data.data.message,
          OpenLoader: false,
          OpenSnackBar:true

        });
        this.GetAllBatchData()
      }
    })
    .catch((error) => {
      console.log("GetUserAppointments Error : ", error);
      this.setState({ OpenLoader: false });
    });
  }

  handleDeleteModule=(id)=>{
    authServices
    .DeleteModuleData(id)
    .then((data) => {
      console.log("filedata : ", data);

      if (data !== null) {

        this.setState({
          Message: data.data.message,
          OpenLoader: false,
          OpenSnackBar:true

        });
        this.GetAllModuleData()
      }
    })
    .catch((error) => {
      console.log("GetUserAppointments Error : ", error);
      this.setState({ OpenLoader: false });
    });
  }

  handleDeleteSession=(id)=>{
    authServices
    .DeleteSessionData(id)
    .then((data) => {
      console.log("filedata : ", data);

      if (data !== null) {

        this.setState({
          Message: data.data.message,
          OpenLoader: false,
          OpenSnackBar:true

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

  handleInputChange = (e) => {
    e.persist();
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
    if (e.target.name === "BranchStatusStudent") {
      this.setState({
        BranchStatusStudent: e.target.value,

      })
      document.getElementById("BranchStatusStudent").classList.remove("validation")
    }
    if (e.target.name === "Question") {
      this.setState({
        Question: e.target.value,
        QuestionFlag: false
      })
    }
    if (e.target.name === "OptionB") {
      this.setState({
        OptionB: e.target.value,
        OptionBFlag: false
      })
    }
    if (e.target.name === "OptionC") {
      this.setState({
        OptionC: e.target.value,
        OptionCFlag: false
      })
    }
    if (e.target.name === "OptionD") {
      this.setState({
        OptionD: e.target.value,
        OptionDFlag: false
      })
    }
    if (e.target.name === "CorrectAnswer") {
      this.setState({
        CorrectAnswer: e.target.value,
        CorrectAnswerFlag: false
      })
    }
    if (e.target.name === "Waightage") {
      this.setState({
        Waightage: e.target.value,
        WaightageFlag: false
      })
    }
    if (e.target.name === "ModuleQuestionId") {
      this.setState({
        ModuleQuestionId: e.target.value,

      })
      document.getElementById("ModuleQuestionId").classList.remove("validation")
    }

    if (e.target.name === "DateSchedule") {
      this.setState({
        DateSchedule: e.target.value,
        DateScheduleFlag: false
      })

    }

    if (e.target.name === "StartTimeSchedule") {
      this.setState({
        StartTimeSchedule: e.target.value,
        StartTimeScheduleFlag: false
      })
    }

    if (e.target.name === "EndTimeSchedule") {
      this.setState({
        EndTimeSchedule: e.target.value,
        EndTimeScheduleFlag: false
      })
    }

    if (e.target.name === "Session") {
      this.setState({
        Session: e.target.value,
        SessionFlag: false
      })
    }
     
    if (e.target.name === "BranchIDSession") {
      this.setState({
        BranchIDSession: e.target.value,

      })
      document.getElementById("BranchIDSession").classList.remove("validation")
    }

    if (e.target.name === "NoticeDescription") {
      this.setState({
        NoticeDescription: e.target.value,

      })
      document.getElementById("NoticeDescription").classList.remove("validation")
    }
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))
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

      authServices
        .StudentOfficeDetails(res)
        .then((data) => {
          console.log("filedata : ", data);

          if (data !== null) {

            this.setState({
              StudentProfileCreate:true,
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
            this.GetallStudents();
          }
        })
        .catch((error) => {
          console.log("GetUserAppointments Error : ", error);
          this.setState({ OpenLoader: false });
        });

    }
  }
  checkValidationCreateQuestions = () => {
    let valid = true
    if (this.state.Question === "") {
      this.setState({
        QuestionFlag: true
      })
      valid = false;
    }
    if (this.state.OptionA === "") {
      this.setState({
        OptionAFlag: true
      })
      valid = false;
    }
    if (this.state.OptionB === "") {
      this.setState({
        OptionBFlag: true
      })
      valid = false;
    }
    if (this.state.OptionC === "") {
      this.setState({
        OptionCFlag: true
      })
      valid = false;
    }
    if (this.state.OptionD === "") {
      this.setState({
        OptionDFlag: true
      })
      valid = false;
    }
    if (this.state.CorrectAnswer === "") {
      this.setState({
        CorrectAnswerFlag: true
      })
      valid = false;
    }
    if (this.state.Waightage === "") {
      this.setState({
        WaightageFlag: true
      })
      valid = false;
    }
    if (this.state.ModuleQuestionId === "") {
      document.getElementById("ModuleQuestionId").classList.add("validation")

      valid = false;
    }
    return valid
  }


  handleCreateQuestionSubmit = (e) => {
    e.preventDefault()
    let isValid = this.checkValidationCreateQuestions()
    const { Question, OptionA, OptionB, OptionC, OptionD, CorrectAnswer, Waightage, ModuleQuestionId } = this.state
    if (isValid) {
      let res = {
        "questionId": 0,
        "question": this.state.Question.toString(),
        "path": "string",
        "option_A": OptionA.toString(),
        "option_B": OptionB.toString(),
        "option_C": OptionC.toString(),
        "option_D": OptionD.toString(),
        "correctAns": CorrectAnswer.toString(),
        "weightage": parseInt(Waightage),
        "moduleId": parseInt(ModuleQuestionId)
      }
      authServices
        .QuestionCreationOffice(res)
        .then((data) => {
          console.log("filedata : ", data);

          if (data !== null) {

            this.setState({
              QuestionExamFlag:true,
              Question: "",
              OptionA: "",
              OptionB: "",
              OptionC: "",
              OptionD: "",
              CorrectAnswer: "",
              Waightage: "",
              ModuleQuestionId: "",
              ModuleName: "",
              OpenLoader: false,
              OpenSnackBar: true,
              Message: "SuccessFully Created Question"
            });
            this.GetallQuestions()
          }
        })
        .catch((error) => {
          console.log("GetUserAppointments Error : ", error);
          this.setState({ OpenLoader: false });
        });
    }


  }

  checkValidationCreatTestSubmit = () => {
    let valid = true
    if (this.state.TestName === "") {
      this.setState({
        TestNameFlag: true
      })
      valid = false;
    }
    if (this.state.Marks === "") {
      this.setState({
        MarksFlag: true
      })
      valid = false;
    }
    if (this.state.ModuleTest === "") {
      document.getElementById("ModuleTest").classList.add("validation")
      valid = false;
    }
    return valid
  }

  GetAlTestData = () => {
    authServices
      .GetallTEstDAta()
      .then((data) => {
        console.log("filedata : ", data);

        if (data !== null) {

          this.setState({
            TestData: data.data,
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
  handleCreateTestSubmit = (e) => {
    e.preventDefault()
    let isValid = this.checkValidationCreatTestSubmit()
    const { TestName, Marks, ModuleTest } = this.state
    if (isValid) {
      let res = {
        "testId": 0,
        "testName": this.state.TestName.toString(),
        "totalMarks": parseInt(this.state.Marks),
        "moduleId": parseInt(this.state.ModuleTest)
      }
      authServices
        .CreatTestSubmit(res)
        .then((data) => {
          console.log("filedata : ", data);

          if (data !== null) {

            this.setState({
              TestName: "",
              Marks: "",
              ModuleTest: "",
              Message:"Test Data Created Successfully",
              OpenLoader: false,
              OpenSnackBar: true,
              // Message: "SuccessFully Created Module"
            });
            this.GetAllModuleData()
            this.GetAlTestData()
          }
        })
        .catch((error) => {
          console.log("GetUserAppointments Error : ", error);
          this.setState({ OpenLoader: false });
        });
    }

  }

  checkValidationCreateStudentModule = () => {
    let valid = true
    if (this.state.ModuleName === "") {
      this.setState({
        ModuleNameFlag: true
      })
      valid = false;
    }
    return valid
  }

  handleCreateModuleSubmit = (e) => {
    e.preventDefault()
    let isValid = this.checkValidationCreateStudentModule()
    if (isValid) {
      let res = {
        "moduleId": 0,
        "moduleName": this.state.ModuleName.toString()
      }

      authServices
        .ModuleOfficeCreate(res)
        .then((data) => {
          console.log("filedata : ", data);

          if (data !== null) {

            this.setState({

              ModuleName: "",
              OpenLoader: false,
              OpenSnackBar: true,
              Message: "SuccessFully Created Module"
            });
            this.GetAllModuleData()
          }
        })
        .catch((error) => {
          console.log("GetUserAppointments Error : ", error);
          this.setState({ OpenLoader: false });
        });



    }
  }

  checkValidationCreateStudentBranch = () => {
    let valid = true
    if (this.state.BranchName === "") {
      this.setState({
        BranchNameFlag: true
      })
      valid = false;
    }
    if (this.state.branchStatus === "") {
      this.setState({
        branchStatusFlag: true
      })
      valid = false;
    }
    return valid
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

  GetallQuestions = () => {
    authServices
      .GetallQuestions()
      .then((data) => {
        console.log("filedata : ", data);

        if (data !== null) {

          this.setState({
            QuestionData: data.data,
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

  GetallStudents = () => {
    authServices
      .GetallStudents()
      .then((data) => {
        console.log("filedata : ", data);

        if (data !== null) {

          this.setState({
            StudentData: data.data,
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

  GetAllModuleData = () => {
    authServices
      .GetAllModuleData()
      .then((data) => {
        console.log("filedata : ", data);

        if (data !== null) {

          this.setState({
            ModuleData: data.data,
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

  handleCreateBranchSubmit = (e) => {
    e.preventDefault()
    let isValid = this.checkValidationCreateStudentBranch()
    if (isValid) {
      let res = {
        "batchId": 0,
        "name": this.state.BranchName.toString(),
        "status": this.state.branchStatus.toString()
      }

      authServices
        .BatchesOfficeCreateDAta(res)
        .then((data) => {
          console.log("filedata : ", data);

          if (data !== null) {

            this.setState({
              BranchName: "",
              branchStatus: "",
              OpenLoader: false,
              OpenSnackBar: true,
              Message: "SuccessFully Created Batch"
            });
            this.GetAllBatchData()
          }
        })
        .catch((error) => {
          console.log("GetUserAppointments Error : ", error);
          this.setState({ OpenLoader: false });
        });
    }
  }

  handlePluseIconNewSchedule = () => {
    this.setState({
      HomePageDetailsData: false
    })
    this.GetAllBatchData()

  }

  checkValidationCreateSchdule = () => {
    let valid = true
    if (this.state.DateSchedule === "") {
      this.setState({
        DateScheduleFlag: true
      })
      valid = false;
    }
    if (this.state.StartTimeSchedule === "") {
      this.setState({
        StartTimeScheduleFlag: true
      })
      valid = false;
    }
    if (this.state.EndTimeSchedule === "") {
      this.setState({
        EndTimeScheduleFlag: true
      })
      valid = false;
    }
    if (this.state.BranchIDSession === "") {
      document.getElementById("BranchIDSession").classList.add("validation")

      valid = false;
    }
    if (this.state.Session === "") {
      this.setState({
        SessionFlag: true
      })
      valid = false;
    }
    return valid
  }
  handleCreateSchdle = (e) => {
    e.preventDefault()
    let isValid = this.checkValidationCreateSchdule()
  
    if (isValid) {
      let res = {
        "sessionId": 0,
        "sessionName": this.state.Session.toString(),
        "date": this.state.DateSchedule,
        "timeStart": this.state.StartTimeSchedule,
        "timeend": this.state.EndTimeSchedule,
        "batchId": parseInt(this.state.BranchIDSession),
        "userId": parseInt(localStorage.getItem("BACK_OFFICE_STAFFId"))
      }
      authServices
        .CreateSessionData(res)
        .then((data) => {
          console.log("filedata : ", data);

          if (data !== null) {

            this.setState({
              HomePageDetailsData:true,
              Session:"",
              DateSchedule:"",
              StartTimeSchedule:"",
              BranchName: "",
              EndTimeSchedule:"",
              BranchIDSession:"",
              branchStatus: "",
              OpenLoader: false,
              OpenSnackBar: true,
              Message: "SuccessFully Created Session"
            });
            this.GetallSechdule()
          }
        })
        .catch((error) => {
          console.log("GetUserAppointments Error : ", error);
          this.setState({ OpenLoader: false });
        });
    }
  }

  checkValidationCreateNotice = () => {
    let valid = true
    if (this.state.NoticeDescription === "") {
      document.getElementById("NoticeDescription").classList.add("validation")
      valid = false;
    }

    return valid
  }
  handleSubmitNotice = () => {
    let valid = this.checkValidationCreateNotice();
    if (valid) {
      let res = {
        "id": 0,
        "notice": this.state.NoticeDescription.toString(),
        "description":  this.state.NoticeDescription.toString(),
        "createdOn": "2023-03-09"
      }
      authServices
        .NoticeCreate(res)
        .then((data) => {
          console.log("filedata : ", data);

          if (data !== null) {

            this.setState({
              NoticeDescription: "",
             
              OpenLoader: false,
              OpenSnackBar: true,
              Message: "SuccessFully Created Notice"
            });
            this.GetAllBatchData()
          }
        })
        .catch((error) => {
          console.log("GetUserAppointments Error : ", error);
          this.setState({ OpenLoader: false });
        });
    }


  }

  render() {

    let state = this.state;
    let self = this;

    const { BranchNameStudent, BranchNameStudentFlag, BranchStatusStudent, BranchStatusStudentFlag, ModuleNameFlag, ModuleName, BranchNameFlag,
      BranchName, branchStatusFlag, branchStatus, StudentCCatRollNo, StudentCCatRollNoFlag, StudentNameFlag, StudentName, StudentPRNnumberFlag,
      StudentPRNnumber, EmailIDStudent, EmailIDStudentFlag, BloodGroup, BloodGroupFlag, Address, AddressFlag, HomePageDetailsData, AfterApiBatch, AfterApiModule,
      Designation, DesignationFlag, DateOfBirth, DateOfBirthFlag, MobileNumber, MobileNumberFlag, PasswordStudent, PasswordStudentFlag,
      CreateBatchDataFlag, CreateExamQuestion, CreateModuleDataFlag, StudentPRofileCreateFlag, StudentProfileCreate, Gender, Question,
      HomEPageFlag, QuestionFlag, OptionA, OptionAFlag, OptionB, OptionBFlag, OptionC, OptionCFlag, OptionD, OptionDFlag, ModuleQuestionId, ModuleQuestionIdFlag,
      CorrectAnswer, CorrectAnswerFlag, Waightage, WaightageFlag, DateSchedule, DateScheduleFlag, Session, SessionFlag, StartTimeSchedule, StartTimeScheduleFlag,
      EndTimeSchedule, EndTimeScheduleFlag, BranchIDSession, BranchIDSessionFlag, BatchData, ModuleData, QuestionData, QuestionExamFlag, StudentData, ScheduleData, CreateTEstDAtaFlag, AfterApiTest,
      TestName, ModuleTest, Marks, MarksFlag, TestNameFlag, ModuleTestFlag, TestData, NoticeDescription } = this.state
    console.log("state : ", state);
    const { classes } = this.props;
    return (

      <div className="AdminDashboard-Container">

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
                  }}
                >
                  Learning Management System (Office)

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
                  className={HomEPageFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleHomEPageFlag();
                  }}
                >

                  <div className="NavButtonText">Home</div>
                </div>
                <div
                  className={CreateBatchDataFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleCreateBatchDataFlag();
                  }}
                >

                  <div className="NavButtonText">Create New Batch</div>
                </div>
                <div
                  className={CreateModuleDataFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleModuleOffice();
                  }}
                >

                  <div className="NavButtonText">Create New Module</div>
                </div>
                <div
                  className={StudentPRofileCreateFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleStudentprofileCreateFlag();
                  }}
                >

                  <div className="NavButtonText">Create Student Details</div>
                </div>




                <div
                  className={CreateExamQuestion ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleCreateExamQuestion();
                  }}
                >

                  <div className="NavButtonText">Create Exam Questions</div>
                </div>
                <div
                  className={CreateTEstDAtaFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleCreateTEstDAtaFlag();
                  }}
                >

                  <div className="NavButtonText">Test Details </div>
                </div>

              </div>
              <div className="SubBody21">
                <div className="bodyContent">
                  {HomEPageFlag &&
                    <>
                      {HomePageDetailsData ?
                        <>
                          <div className="sportstitle1 mb-4">Add New Schedule <ControlPointIcon className="iconbtn" onClick={() => this.handlePluseIconNewSchedule()} /> </div>

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
                                             <DeleteIcon onClick={()=>this.handleDeleteSession(data.sessionId)}/>
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
                        </>
                        :
                        <>
                          <div className="plusContent">
                            <div className="plusContent_sub">
                              <div className="sportstitlePlus">Session Details</div>
                              <div>
                                <form className="form">

                                  <TextField
                                    type="date"
                                    className="TextField1"
                                    name="DateSchedule"
                                    label="Date"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={DateScheduleFlag}
                                    value={DateSchedule}
                                    onChange={(e) => this.handleInputChange(e)}
                                  />
                                  <TextField
                                    type="time"
                                    className="TextField1"
                                    name="StartTimeSchedule"
                                    label=" Start Time"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={StartTimeScheduleFlag}
                                    value={StartTimeSchedule}
                                    onChange={(e) => this.handleInputChange(e)}
                                  />
                                  <TextField
                                    type="time"
                                    className="TextField1"
                                    name="EndTimeSchedule"
                                    label="End Time"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={EndTimeScheduleFlag}
                                    value={EndTimeSchedule}
                                    onChange={(e) => this.handleInputChange(e)}
                                  />
                                  <TextField
                                    type="text"
                                    className="TextField1"
                                    name="Session"
                                    label="Session"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={SessionFlag}
                                    value={Session}
                                    onChange={(e) => this.handleInputChange(e)}
                                  />

                                  <div>
                                    <select
                                      className="select_gender"
                                      id="BranchIDSession"
                                      name="BranchIDSession"
                                      label="BranchIDSession"
                                      variant="outlined"
                                      size="small"
                                      style={{ margin: 20 }}
                                      error={BranchIDSessionFlag}
                                      value={BranchIDSession}
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
                                      onClick={(e) => this.handleCreateSchdle(e)}
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
                  {CreateBatchDataFlag &&
                    <>
                      <div className="plusContent">
                        <div className="plusContent_sub">
                          <div className="sportstitlePlus">Batch Details</div>
                          <div>
                            <form className="form">

                              <TextField
                                type="text"
                                className="TextField1"
                                name="BranchName"
                                label="Branch Name"
                                variant="outlined"
                                size="small"
                                style={{ margin: 20 }}
                                error={BranchNameFlag}
                                value={BranchName}
                                onChange={(e) => this.handleInputChange(e)}
                              />
                              <TextField
                                type="test"
                                className="TextField1"
                                name="branchStatus"
                                label="Branch Status"
                                variant="outlined"
                                size="small"
                                style={{ margin: 20 }}
                                error={branchStatusFlag}
                                value={branchStatus}
                                onChange={(e) => this.handleInputChange(e)}
                              />


                              <div className="buttons">

                                <button className="submitbtn1"
                                  onClick={(e) => this.handleCreateBranchSubmit(e)}
                                >Submit</button>

                                <button className="cancelbhn">Cancel</button>
                              </div>

                            </form>
                          </div>
                        </div>


                      </div>
                      {AfterApiBatch &&
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
                                        Batch ID
                                      </TableCell>

                                      <TableCell
                                        align="Left"
                                        style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Batch Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Status
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
                                  {BatchData?.length > 0
                                    ? BatchData.map((data, index) => {
                                      return (
                                        <TableRow >

                                          <>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.batchId}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.name}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.status}
                                            </TableCell>
                                            <TableCell
                                              align="Left"
                                              style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                            >
                                              <DeleteIcon onClick={() => this.handleDeleteBatch(data.batchId)} />
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
                        </>
                      }
                    </>}
                  {CreateModuleDataFlag &&
                    <>
                      <div className="plusContent">
                        <div className="plusContent_sub">
                          <div className="sportstitlePlus">Module Details</div>
                          <div>
                            <form className="form">

                              <TextField
                                type="text"
                                className="TextField1"
                                name="ModuleName"
                                label="Module Name"
                                variant="outlined"
                                size="small"
                                style={{ margin: 20 }}
                                error={ModuleNameFlag}
                                value={ModuleName}
                                onChange={(e) => this.handleInputChange(e)}
                              />



                              <div className="buttons">
                                {/* {UpdateBtn ? */}
                                <button className="submitbtn1"
                                  onClick={(e) => this.handleCreateModuleSubmit(e)}
                                >Submit</button>
                                {/* : */}
                                {/* <button className="submitbtn1" */}
                                {/* onClick={(e) => this.handleUpdateEmployeeSubmit(e)} */}
                                {/* >Submit</button>} */}
                                <button className="cancelbhn">Cancel</button>
                              </div>

                            </form>
                          </div>
                        </div>


                      </div>
                      {AfterApiModule &&
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
                                        Module ID
                                      </TableCell>

                                      <TableCell
                                        align="Left"
                                        style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Module Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Action
                                      </TableCell>


                                    </TableRow>
                                  </TableHead>
                                </>

                                <TableBody>
                                  {ModuleData?.length > 0
                                    ? ModuleData.map((data, index) => {
                                      return (
                                        <TableRow >

                                          <>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.moduleId}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.moduleName}
                                            </TableCell>
                                            <TableCell
                                              align="Left"
                                              style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                            >
                                              <DeleteIcon onClick={() => this.handleDeleteModule(data.moduleId)} />
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
                        </>
                      }
                    </>
                  }
                  {StudentPRofileCreateFlag &&
                    <>


                      {StudentProfileCreate ?
                        <>
                          <div className="sportstitle1 mb-4">Add New Student <ControlPointIcon className="iconbtn" onClick={() => this.handlePluseIcon(this.setState({ StudentProfileCreate: false }))} /> </div>

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
                                  {StudentData?.length > 0
                                    ? StudentData.map((data, index) => {


                                      return (
                                        <TableRow >

                                          <>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.studentId}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.user.name}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.studentPRN}
                                            </TableCell>

                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.ccat_Roll_no}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.user.emailId}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.user.contactNo}

                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.user.gender === "F" ? "Female":"Male"}

                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.user.bloodGroup}

                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.batch.name}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.user.address}
                                            </TableCell>
                                            <TableCell
                                              align="Left"
                                              style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                            >
                                              <DeleteIcon onClick={() => this.handleDeleteStudent(data.studentId)} />
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
                                      onChange={(e) => this.handleInputChange(e)}
                                    >
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
                                    {/* {UpdateBtn ? */}
                                    <button className="submitbtn1"
                                      onClick={(e) => this.handleCreateStudentOfficeSubmit(e)}
                                    >Submit</button>
                                    {/* : */}
                                    {/* <button className="submitbtn1" */}
                                    {/* onClick={(e) => this.handleUpdateEmployeeSubmit(e)} */}
                                    {/* >Submit</button>} */}
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
                  {CreateExamQuestion &&
                    <>
                      {QuestionExamFlag ?
                        <>
                          <div className="sportstitle1 mb-4">Add New Question <ControlPointIcon className="iconbtn" onClick={() => this.handlePluseIcon(this.setState({ QuestionExamFlag: false }))} /> </div>

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
                                        Question ID
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 50, fontWeight: 600, fontSize: 15 }}
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
                                        Option B
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
                                        Option D
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Correct Answer
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Waightage
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
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.option_A}
                                            </TableCell>

                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.option_B}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.option_C}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.option_D}

                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.correctAns}

                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.weightage}

                                            </TableCell>
                                           
                                            <TableCell
                                              align="Left"
                                              style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                            >
                                              <DeleteIcon onClick={() => this.handleDeleteQuestions(data.questionId)} />
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
                        </> :
                        <>
                          <div className="plusContent">
                            <div className="plusContent_sub">
                              <div className="sportstitlePlus">Add Questions</div>
                              <div>
                                <form className="form">

                                  <TextField
                                    type="text"
                                    className="TextField1"
                                    name="Question"
                                    label="Question ???"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={QuestionFlag}
                                    value={Question}
                                    onChange={(e) => this.handleInputChange(e)}
                                  />
                                  <TextField
                                    type="text"
                                    className="TextField1"
                                    name="OptionA"
                                    label="Option A "
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={OptionAFlag}
                                    value={OptionA}
                                    onChange={(e) => this.handleInputChange(e)}
                                  />
                                  <TextField
                                    type="text"
                                    className="TextField1"
                                    name="OptionB"
                                    label="Option B "
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={OptionBFlag}
                                    value={OptionB}
                                    onChange={(e) => this.handleInputChange(e)}
                                  />
                                  <TextField
                                    type="text"
                                    className="TextField1"
                                    name="OptionC"
                                    label="Option C "
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={OptionCFlag}
                                    value={OptionC}
                                    onChange={(e) => this.handleInputChange(e)}
                                  />
                                  <TextField
                                    type="text"
                                    className="TextField1"
                                    name="OptionD"
                                    label="Option D "
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={OptionDFlag}
                                    value={OptionD}
                                    onChange={(e) => this.handleInputChange(e)}
                                  />

                                  <TextField
                                    type="text"
                                    className="TextField1"
                                    name="CorrectAnswer"
                                    label="Correct Answer "
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={CorrectAnswerFlag}
                                    value={CorrectAnswer}
                                    onChange={(e) => this.handleInputChange(e)}
                                  />
                                  <TextField
                                    type="text"
                                    className="TextField1"
                                    name="Waightage"
                                    label="Waightage "
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={WaightageFlag}
                                    value={Waightage}
                                    onChange={(e) => this.handleInputChange(e)}
                                  />
                                  <div>
                                    <select
                                      className="select_gender"
                                      id="ModuleQuestionId"
                                      value={ModuleQuestionId}
                                      name="ModuleQuestionId"
                                      label="Module Name"
                                      error={ModuleQuestionIdFlag}
                                      onChange={(e) => this.handleInputChange(e)}
                                    >


                                      <option value="" selected disabled>Module Name</option>
                                      {this.state.ModuleData.map((ele, ind) => {
                                        console.log("ele", ele)
                                        return (
                                          <>

                                            <option value={ele.moduleId}>{ele.moduleName}</option>
                                          </>


                                        )
                                      })}
                                    </select>
                                  </div>
                                  <div className="buttons">
                                    {/* {UpdateBtn ? */}
                                    <button className="submitbtn1"
                                      onClick={(e) => this.handleCreateQuestionSubmit(e)}
                                    >Submit</button>
                                    {/* : */}
                                    {/* <button className="submitbtn1" */}
                                    {/* onClick={(e) => this.handleUpdateEmployeeSubmit(e)} */}
                                    {/* >Submit</button>} */}
                                    <button className="cancelbhn">Cancel</button>
                                  </div>

                                </form>
                              </div>
                            </div>


                          </div>
                        </>}</>}

                  {CreateTEstDAtaFlag &&
                    <>
                      <div className="plusContent">
                        <div className="plusContent_sub">
                          <div className="sportstitlePlus">Test Details</div>
                          <div>
                            <form className="form">

                              <TextField
                                type="text"
                                className="TextField1"
                                name="TestName"
                                label="Test Name"
                                variant="outlined"
                                size="small"
                                style={{ margin: 20 }}
                                error={TestNameFlag}
                                value={TestName}
                                onChange={(e) => this.handleInputChange(e)}
                              />
                              <TextField
                                type="test"
                                className="TextField1"
                                name="Marks"
                                label="Total Marks"
                                variant="outlined"
                                size="small"
                                style={{ margin: 20 }}
                                error={MarksFlag}
                                value={Marks}
                                onChange={(e) => this.handleInputChange(e)}
                              />

                              <div>
                                <select
                                  className="select_gender"
                                  id="ModuleTest"
                                  value={ModuleTest}
                                  name="ModuleTest"
                                  label="Module Test"
                                  error={ModuleTestFlag}
                                  onChange={(e) => this.handleInputChange(e)}
                                >


                                  <option value="" selected disabled>Module Name</option>
                                  {this.state.ModuleData.map((ele, ind) => {
                                    console.log("ele", ele)
                                    return (
                                      <>

                                        <option value={ele.moduleId}>{ele.moduleName}</option>
                                      </>


                                    )
                                  })}
                                </select></div>

                              <div className="buttons">

                                <button className="submitbtn1"
                                  onClick={(e) => this.handleCreateTestSubmit(e)}
                                >Submit</button>

                                <button className="cancelbhn">Cancel</button>
                              </div>

                            </form>
                          </div>
                        </div>


                      </div>
                      {AfterApiTest &&
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
                                        Test ID
                                      </TableCell>

                                      <TableCell
                                        align="Left"
                                        style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Test Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Marks
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
                                  {TestData?.length > 0
                                    ? TestData.map((data, index) => {
                                      return (
                                        <TableRow >

                                          <>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.testId}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.testName}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.totalMarks}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              <DeleteIcon onClick={()=>this.handleDeleteTest(data.testId)}/>
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
                        </>
                      }
                    </>}

                </div>
              </div>
              {HomEPageFlag &&
                <div className="SubBody11">
                  <div                                >
                    <div className="NavButtonTexNoticet">Notice display</div>
                  </div>
                  <textarea
                    className="dispalyNotice"
                    id="NoticeDescription"
                    name="NoticeDescription"
                    value={NoticeDescription}
                    onChange={(e) => {
                      this.handleInputChange(e);
                    }}
                  >
                  </textarea>
                  <button onClick={() => this.handleSubmitNotice()}>Submit</button>
                </div>}


            </div>
            <div className="FooterDiv">Footer</div>
          </div>
        </div>


        <Backdrop
          style={{ zIndex: "1", color: "#fff" }}
          open={this.state.OpenLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={state.OpenSnackBar}
          autoHideDuration={2000}
          onClose={this.handleSnackBarClose}
          message={state.Message}
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

ManagerDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(ManagerDashboard);
