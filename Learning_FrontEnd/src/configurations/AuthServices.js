import AxiosServices from "./AxiosServices";
let baseURL = "http://localhost:8088/"
// import Configurations from "../configurations/Configurations";
// import Auth from "../components/Auth";
// import AdminDashboard from "../components/Dashboard/AdminDashboard";
// import UserDashboard from "../components/Dashboard/UserDashBoard";

const axiosServices = new AxiosServices();

const headers = {
  headers: {
    "accept": "*/*",
    "Content-Type": "application/json",
    // "cache-control": "no-cache",
    // Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
const UserId = localStorage.getItem('UserId')

export default class AuthServices {
  SignUp(data) {
    debugger
    return axiosServices.post(baseURL + "auth/register",data,true,headers);
  }

  SignIn(data) {
    return axiosServices.post(baseURL + "auth/login",data,true,headers);
  }

  ModuleOfficeCreate(data) {
    debugger
    return axiosServices.post(baseURL + "api/modules",data,true,headers);
  }

  BatchesOfficeCreateDAta(data) {
    return axiosServices.post(baseURL + `api/batches`,data,true,headers);
  }
  
 

  GetAllBatchData(data) {
    return axiosServices.Get(baseURL + `api/batches`,true,headers);
  }

  
  GetAllModuleData() {
    return axiosServices.Get(baseURL +`api/modules`,true,headers);
  }

  StudentOfficeDetails(data) {
    return axiosServices.post(baseURL +`api/students`,data,true,headers);
  }
  QuestionCreationOffice(data){
   
    return axiosServices.post(baseURL + `api/questions`,data, true,headers);
  }

  GetallQuestions(){
   
    return axiosServices.Get(baseURL + `api/questions`, true,headers);
  }
  GetallStudents(){
   
    return axiosServices.Get(baseURL + `api/students`, true,headers);
  }
  DeleteBatchData(id) {
    return axiosServices.Delete(baseURL + `api/batches/${id}`, true,headers);
  }
  
  DeleteStudentData(id) {
    return axiosServices.Delete(baseURL + `api/students/${id}`, true,headers);
  }
  
  DeleteTestData(id) {
    return axiosServices.Delete(baseURL + `api/tests/${id}`, true,headers);
  }
  DeleteSessionData(id) {
    return axiosServices.Delete(baseURL + `api/dailySession/${id}`, true,headers);
  }
  DeleteQuestionData(id) {
    return axiosServices.Delete(baseURL + `api/questions/${id}`, true,headers);
  }
  DeleteModuleData(id) {
    return axiosServices.Delete(baseURL + `api/modules/${id}`, true,headers);
  }
 

  CreateSessionData(data) {
    return axiosServices.post(baseURL + `api/dailySession`,data,true,headers);
  }

  GetallSechdule(data) {
    return axiosServices.Get(baseURL + `api/dailySession`,data, true,headers);
  }

  CreatTestSubmit(data) {
    return axiosServices.post(baseURL + `api/tests`,data, true,headers);
  }


  GetallTEstDAta(data) {
    return axiosServices.Get(baseURL + `api/tests`,true,headers);
  }

  NoticeCreate(data) {
    return axiosServices.post(baseURL + `api/notice`,data,true,headers);
  }
  NoticeGet(data) {
    return axiosServices.Get(baseURL + `api/notice`,data,true,headers);
  }
 
  GetALlTestBYID(id){
  
    return axiosServices.Get(baseURL + `api/tests/${id}`,true,headers);

  }
  GetAllResult(){
  
    return axiosServices.Get(baseURL + `api/results`,true,headers);

  }
  SubmitResultData(data){
    return axiosServices.post(baseURL + `api/results`,data,true,headers);
  }

  GetStudentById(id){
    return axiosServices.Get(baseURL + `api/students/byUserId/${id}`,true,headers);
  }

  UpdateStudentDetails(id,data){
    return axiosServices.put(baseURL + `api/students/${id}`,data,true,headers);
  }
  GetUserByID(id){
    return axiosServices.Get(baseURL + `api/users/${id}`,true,headers);
  }

  
 
 
}
