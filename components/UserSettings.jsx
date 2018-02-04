import React from "react";

class UserSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            city: '',
            state: ''
        }
        this.renderStateOptions = this.renderStateOptions.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.saveUserInformation = this.saveUserInformation.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/address', {
            credentials: 'include'
        })
        .then((res) => res.json())
        .then(({first_name, last_name, city, state}) => {
            this.setState({
                first_name: first_name,
                last_name: last_name,
                city: city,
                state: state
            });
        });
    }

    changeHandler(evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }

    renderStateOptions() {
        const stateAbbreviations = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", 
        "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", 
        "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", 
        "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"];
        const stateOptions = stateAbbreviations.map((abbreviation) => {
            return (
                <option value={abbreviation}>{abbreviation}</option>
            );
        });
        return (
            <select className="userSettings-stateDropDown" name="state" onChange={this.changeHandler}>
                {stateOptions}
            </select>
        );
    }

    saveUserInformation() {
        const userData = {
            city: document.querySelector(".userSettings-cityInput").value,
            state: document.querySelector("[name='state']").value,
            first_name: document.querySelector(".userSettings-firstNameInput").value,
            last_name: document.querySelector(".userSettings-lastNameInput").value
        };
        fetch('http://localhost:8080/api/address', {
            method: 'PATCH',
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        .then(() => alert('settings updated!'));
    }

    render() {
        return (
            <div className="page userSettings">
                <ul>
                    <li><input name="first_name" className="userSettings-firstNameInput" type="text" placeholder="First Name" onChange={ this.changeHandler } value={this.state.first_name}/></li>
                    <li><input name="last_name" className="userSettings-lastNameInput" type="text" placeholder="Last Name" onChange={ this.changeHandler } value={this.state.last_name}/></li>
                    <li><input name="city" className="userSettings-cityInput" type="text" placeholder="City" onChange={ this.changeHandler } value={this.state.city}/></li>
                    <li>{ this.renderStateOptions() }</li>
                    <li><button className="userSettings-saveChangesButton" onClick={this.saveUserInformation}>Save</button></li>
                </ul>
            </div>
        );
    }
}

export default UserSettings;