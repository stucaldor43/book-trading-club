import React from "react";
import jsonp from "jsonp";
import { debounce } from './../helpers/utils';
import { setTimeout } from 'core-js/library/web/timers';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.showQueryMatchingItems = debounce(this.showQueryMatchingItems.bind(this), 600);
    }

    showQueryMatchingItems(searchTerm) {
        const {renderItems, url, stopFilteringEntries} = this.props;
        fetch(`${url}${searchTerm}`, {
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            (searchTerm.trim().length === 0) ? stopFilteringEntries() : renderItems(data.items);        
        });
    } 

    keyUpHandler(evt) {
        evt.persist();
        this.showQueryMatchingItems(evt.target.value);
    }

    render() {
        return (
            <span className="filter">
                <input type="text" placeholder="book title" className="filter-textInput" onKeyUp={ this.keyUpHandler }/>
            </span>
        );
    }
}

export default Filter;