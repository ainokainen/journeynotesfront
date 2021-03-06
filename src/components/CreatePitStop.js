import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Jumbotron, Nav, NavItem } from "react-bootstrap";
import { AddPitstop, GetTripWithPitstops } from '../ServiceClient';
import '../cssstyles/Form.css'
import plusbutton from "../images/plusbutton.png";
import PitStopSearchComponent from "../mapstuff/PitStopSearchComponent";
import i18n from "../i18n";


class CreatePitStop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      note: "",
      photo: "",
      date: "",
      tripId: "",
      pitstopPosition: "",
      startDate: "",
      endDate: ""
    };
  }

  componentDidMount = () => {
    let tripId;
    if (this.props.match === undefined) {
      tripId = this.props.tripId;
    } else {
      tripId = this.props.match.params.tripId;
    }
    this.setState({ tripId: tripId })
  };

  newPitstop = event => {
    this.setState({ title: "", note: "" })
    AddPitstop(this.state, function (response) {
    })
    this.setState(this.state);
    this.update();
  };

  update = () => {
    let tripId = this.state.tripId;
    GetTripWithPitstops(tripId, response => {
      var tripPitstops = response;
      this.setState({ tripPitstops: tripPitstops });
    });
    this.setState(this.state);
  }

  titleSet = e => {
    this.setState({ title: e.target.value });
    console.log("title changed");
  };
  noteSet = e => {
    this.setState({ note: e.target.value });
    console.log("note changed");
  };
  pitstopDate = (e) => {
    console.log(e.target.value);
    this.setState({ pitstopDate: e.target.value })
  }

  placeSet = (coord) => {
    this.setState({ pitstopPosition: JSON.parse(coord) })
    console.log(this.state)
  }


  handleImage = (e) => {
    var image = e.target.files[0];
    console.dir(image);
    this.setState({ photo: image });
  }
  render() {
    console.log("alkaaa");
    console.log(this.props.startDate);
    return (
      <div>
        <Jumbotron className="jumbo">
          <h2>{i18n.t('Create a new pitstop')}</h2>
          <form className="form">
            <FormGroup>
              <ControlLabel className="formtext">{i18n.t('Title')}:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.title}
                placeholder="The Big Apple"
                onChange={this.titleSet}
                className="formtextarea"
              />
              <ControlLabel className="formtext">{i18n.t('Leave a note')}:</ControlLabel>
              <FormControl
                componentClass="textarea"
                value={this.state.note}
                placeholder="Went to the Empire State Building"
                onChange={this.noteSet}
                className="formtextarea"
              />
              <FormControl
                type="file"
                label="File"
                onChange={this.handleImage}
                className="formtextarea"
              />
              <FormControl
                type="date"
                label="Date"
                defaultValue={this.props.startDate}
                min={this.props.startDate}
                max={this.props.endDate}
                onChange={this.pitstopDate}
                className="formtextarea"
              />
            </FormGroup>

            <PitStopSearchComponent onSelectPitstopPlace={this.placeSet} />
            <Nav>
              <NavItem href={`/TripView/${this.state.tripId}`} active onClick={this.newPitstop}>
                Add
              <div>
                  <img className='plus' src={plusbutton} alt='Create' />
                </div>
              </NavItem>
            </Nav>
          </form>
        </Jumbotron>
      </div>

    );
  }
}
export default CreatePitStop;
