import React from 'react';

class UserSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "Stu Pickles",
                city: "Yucaipa",
            }
        }
        this.renderStateOptions = this.renderStateOptions.bind(this);
        this.saveUserInformation = this.saveUserInformation.bind(this);
    }

    renderStateOptions() {
        return (
            <select className="userSettings-stateDropDown" name="state">
                <option value="NY">NY</option>
                <option value="CA">CA</option>
                <option value="MA">MA</option>
            </select>
        );
    }

    saveUserInformation() {
        // send user data to server
        alert("information saved!");
    }

    render() {
        return (
            <div className="page userSettings">
                <ul>
                    <li><input className="userSettings-nameInput" type="text" placeholder="Full Name" onKeyUp={ this.keyUpHandler } value={this.state.user.name}/></li>
                    <li><input className="userSettings-cityInput" type="text" placeholder="City" onKeyUp={ this.keyUpHandler } value={this.state.user.city}/></li>
                    <li>{ this.renderStateOptions() }</li>
                    <li><button className="userSettings-saveChangesButton" onClick={this.saveUserInformation}>Save</button></li>
                </ul>
            </div>
        );
    }
}

export default UserSettings;