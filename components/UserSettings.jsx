import React from "react";

class UserSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "Stu Pickles",
                city: "Yucaipa",
                state: "California"
            }
        }
    }

    render() {
        return (
            <div>
                <form>
                    <button onClick={(evt) => {
                        console.log(evt)
                    }}>Save</button>
                    <button>Discard Changes</button>
                </form>
            </div>
        );
    }
}

export default UserSettings;