import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';

// Components
import Forms from '../../views/Components/Forms/';
import Patients from '../../views/Components/Patients/';
import PatientsTable from '../../views/Components/PatientsTable/';
import NewPatientCard from '../../views/Components/NewPatientCard/';
import Doctor from '../../views/Components/Doctor/';
import Hospital from '../../views/Components/Hospital/';


class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                {/*<Route path="/home" name="My patients" component={Patients}/>*/}
                <Route path="/home" name="My Patients" component={PatientsTable}/>
                <Route path="/addPatients" name="Add Patient" component={Forms}/>
                <Route path="/addDoctors" name="Add Doctors" component={Doctor}/>
                <Route path="/addHospitals" name="Add Hospitals" component={Hospital}/>
                <Route path="/viewPatient" name="Patient Info" component={NewPatientCard}/>
                <Redirect from="/" to="/home"/>
              </Switch>
            </Container>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
