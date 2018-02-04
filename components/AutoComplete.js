import React from "react";

const AutoComplete = ({suggestions, completeInputText}) => {
    return (
        <ul className="autoComplete">
            {suggestions.map((hint) => <li onClick={completeInputText.bind(this, hint)} className="autoComplete-suggestion">{hint}</li>)}
        </ul>
    );
}

export default AutoComplete;