import React from "react";
import BookOfferDialog from './BookOfferDialog';
import Pagination from './Pagination.jsx';
import OfferProposalWindow from './OfferProposalWindow';
import { backend } from './../config';

class TradeRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            hasAttemptedToLoadData: false,
            page: 1,
            maxPages: 1
        };
        this.tradeBooks = this.tradeBooks.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
    }

    componentDidMount() {
        this.goToPage();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.goToPage();
        }
    }

    goToPage() {
        fetch(`${backend.protocol}://${backend.domain}:${backend.port}/api/offer/requests_received/?page=${this.state.page}`, {
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState((prevState, props) => {
                return ({
                    offers: [...data.offers],
                    hasAttemptedToLoadData: true,
                    maxPages: data.totalPages
                })
            })
        });
    }

    nextPage(e) {
        e.preventDefault();
        this.setState((state) => ({page: state.page + 1}));
    }

    previousPage(e) {
        e.preventDefault();
        this.setState((state) => ({page: state.page - 1}));
    }

    renderTable() {
        const { page, maxPages } = this.state;
        return (
            <div className="tableContainer">
                <table>
                    <tr>
                        <th>Offered Book</th>
                        <th>Your Book</th>
                        <th>Username</th>
                        <th>Accept Trade</th>
                    </tr>
                    { this.state.offers.map((offer) => {
                        return (
                            <tr>
                                <td>{offer.offered_book_title}</td>
                                <td>{offer.requested_book_title}</td>
                                <td>{offer.offered_book_owner}</td>
                                <td><button onClick={this.tradeBooks.bind(this, offer)}>Confirm</button></td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td className="pagination-cell" colSpan="4">
                            <Pagination page={page} 
                                        maxPages={maxPages} 
                                        url={`${backend.protocol}://${backend.domain}:${backend.port}`}
                                        previousLinkClickHandler={this.previousPage}
                                        nextLinkClickHandler={this.nextPage}/>
                        </td>
                    </tr>
                </table>
            </div>
                
        );
    }

    tradeBooks(offer) {
        const tradeData = {
            tradeProposerName: offer.offered_book_owner,
            tradeConfirmerBookId: offer.requested_book_id,
            tradeProposerBookId: offer.offered_book_id,
        }
        fetch(`${backend.protocol}://${backend.domain}:${backend.port}/api/book/trade`, {
            method: "POST",
            body: JSON.stringify(tradeData),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((data) => {
            this.goToPage();
        });
    }

    render() {
        let pageContent;
        if (this.state.hasAttemptedToLoadData && !this.state.offers) {
            pageContent = <h2 className="heading">You do not currently have any book offers</h2>;
            
        }
        else {
            pageContent = this.renderTable();
        }
        return (
            <div className="page">
                <div>
                    <div>
                        <span>Incoming Requests</span>
                        <span>Active Offers</span>
                    </div>
                    { pageContent }
                </div>
            </div>
        );
    }
}

export default TradeRequests;