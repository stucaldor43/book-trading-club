import React from 'react';
import jsonp from 'jsonp';
import { debounce } from './../helpers/utils'
import { setTimeout } from 'core-js/library/web/timers';

class Filter extends React.Component {
    constructor(props) {
        super(props); // accepts url prop and renderitem callback fn
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.showQueryMatchingItems = debounce(this.showQueryMatchingItems.bind(this), 600);
    }

    showQueryMatchingItems(searchTerm) {
        const {items, renderItems, url, stopFilteringEntries} = this.props; // delete data prop and just use 
        (searchTerm.trim().length === 0) ? stopFilteringEntries() : renderItems(items);
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