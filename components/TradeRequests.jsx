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
            maxPages: 1,
            activeTabIndex: 0
        };
        this.tradeBooks = this.tradeBooks.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.makeActiveTab = this.makeActiveTab.bind(this);
    }

    componentDidMount() {
        this.goToPage();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page || prevState.activeTabIndex !== this.state.activeTabIndex) {
            this.goToPage();
        }
    }

    goToPage() {
        const urls = {
            0: '/api/offer/requests_received',
            1: '/api/offer/proposals'
        }
        fetch(`${backend.protocol}://${backend.domain}:${backend.port}${urls[this.state.activeTabIndex]}/?page=${this.state.page}`, {
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
        const userHasNoOffers = this.state.hasAttemptedToLoadData && !this.state.offers.length;

        return (userHasNoOffers) ? <h2 className="heading">You do not currently have any book offers</h2> :
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
                
        
    }

    renderProposalTable() {
        const { page, maxPages } = this.state;
        const userHasNoOffers = this.state.hasAttemptedToLoadData && !this.state.offers.length;

        return (userHasNoOffers) ? <h2 className="heading">You have no pending offers</h2> :
            <div className="tableContainer">
                <table>
                    <tr>
                        <th>Your Book</th>
                        <th>Requested Book</th>
                        <th>Username</th>
                        <th>Current Status</th>
                    </tr>
                    { this.state.offers.map((offer) => {
                        return (
                            <tr>
                                <td>{offer.offered_book_title}</td>
                                <td>{offer.requested_book_title}</td>
                                <td>{offer.requested_book_owner}</td>
                                <td>Pending</td>
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

    makeActiveTab(index, evt) {
        this.setState({activeTabIndex: index, page: 1});
    }

    render() {
        let pageContent;
        let userHasNoOffers = this.state.hasAttemptedToLoadData && !this.state.offers.length;
        if (!this.state.hasAttemptedToLoadData) {
            pageContent = null;
        }
        else {
            pageContent = (this.state.activeTabIndex === 0) ? this.renderTable() : this.renderProposalTable();
        }
        
        return (
            <div className="page">
                <div className="tradeRequests">
                    <div className="tradeRequests-tabContainer">
                        {['Incoming Requests', 'Active Offers'].map((text, index) => {
                            return (
                                <span key={text} 
                                    className={`tradeRequests-tab ${(this.state.activeTabIndex === index) ? "tradeRequests-tab-isActive" : ""}`} 
                                    onClick={this.makeActiveTab.bind(this, index)}>{text}
                                </span>
                            );
                        })}
                    </div>
                    { pageContent }
                </div>
            </div>
        );
    }
}

export default TradeRequests;