import React from "react";
import Pagination from './Pagination.jsx';
import BookOfferDialog from './BookOfferDialog';
import { backend } from './../config';

class OfferProposalWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
            page: 1,
            maxPages: 1,
            isDialogOpen: false,
            bookId: null
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
    }

    componentDidMount() {
        fetch(`${backend.protocol}://${backend.domain}:${backend.port}/api/book/${this.props.id}/owners`, {
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            console.table(data.owners);
            return this.setState({
                info: data.owners.map((info) => {
                    return {
                        display_name: info.display_name,
                        book_id: info.id
                    };
                }),
                maxPages: data.totalPages
            });
        })
    }

    clickHandler(id) {
        this.openDialog();
        this.setState({bookId: id});
    }

    openDialog() {
        this.setState({isDialogOpen: true});
    }

    closeDialog() {
        this.setState({isDialogOpen: false});
    }

    nextPage(e) {
        e.preventDefault();
        this.setState((state) => ({page: state.page + 1}));
    }

    previousPage(e) {
        e.preventDefault();
        this.setState((state) => ({page: state.page - 1}));
    }

    render() {
        const {page, maxPages} = this.state;

        return (
            <div className="offerProposalWindow">
                <div className="tableContainer">
                    <table>
                        <caption>Users Possessing This Book</caption>
                        <tr>
                            <th>Username</th>
                            <th>Make offer</th>
                        </tr>
                        { this.state.info.map((data) => {
                            return (
                                <tr>
                                    <td>{data.display_name}</td>
                                    <td><button onClick={this.clickHandler.bind(this, data.book_id)}>Make Offer</button></td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
                <Pagination page={page} 
                            maxPages={maxPages} 
                            url={''}
                            previousLinkClickHandler={this.previousPage}
                            nextLinkClickHandler={this.nextPage}/>
                {(this.state.isDialogOpen) ? <BookOfferDialog requestedBookId={this.state.bookId} close={this.state.closeDialog}/> : null}
            </div>
        );
    }
}

export default OfferProposalWindow;