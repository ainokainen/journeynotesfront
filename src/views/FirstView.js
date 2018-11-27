import React, { Component } from "react";
import TripList from "../components/TripList";
import { GetAllTrips } from "../ServiceClient";
import { Jumbotron, Nav, NavItem } from "react-bootstrap";
import "../cssstyles/View.css";
import plusbutton from "../images/plusbutton.png";


class FirstView extends Component {
  constructor(props) {
    super(props);
    this.state = { trips: [] };
  }

  componentDidMount = () => {
      GetAllTrips(response => {
      var trips = response;
      this.setState({ trips: trips });
      console.log(this.state.trips);
    });
  };

  render() {
    console.log(this.state.trips);

    return (
      <div>
        <Jumbotron className="jumbo">
        <h2>My past adventures</h2>
          <TripList trips={this.state.trips} />
          </Jumbotron>
          <Jumbotron className="jumbo">
          <Nav className="Nav">
            <NavItem href="/CreateTripView" active onClick={this.newTrip}>
              Create new Trip
              <div>
                <img className='plus' src={plusbutton} alt='Create'/>
              </div>
            </NavItem>
          </Nav>
        </Jumbotron>
        
      </div>
    );
  }
}


export default FirstView;
