import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
// import Auth from './components/Auth'
import OfficeDashboard from './components/Dashboard/OfficeDashboard'
import TeachersDashboard from './components/Dashboard/TeachersDashboard'
import StudentDashboard from './components/Dashboard/StudentDashboard'
// import ForgetPassword from './components/ForgetPassWord'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/OfficeDashboard" component={OfficeDashboard} />
          <Route exact path="/TeachersDashboard"   component={TeachersDashboard} />
          <Route exact path="/StudentDashboard" component={StudentDashboard}/>
        
0        </Switch>
      </Router>
    </div>
  )
}

export default App
