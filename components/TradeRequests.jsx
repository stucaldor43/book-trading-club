import React from "react";
import BookOfferDialog from './BookOfferDialog';
import Pagination from './Pagination.jsx';
import OfferProposalWindow from './OfferProposalWindow';
import { backend } from './../config';

class TradeRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: []
        }
        this.tradeBooks = this.tradeBooks.bind(this);
    }

    componentDidMount() {
        fetch(`${backend.protocol}://${backend.domain}:${backend.port}/api/offer/requests_received`, {
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState((prevState, props) => {
                return ({
                    offers: [...prevState.offers, ...data.offers]
                })
            })
        });
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
            credentials: 'include'
        })
        .then((data) => {
            alert("trade completed!");
        });
    }

    render() {
        return (
            <div className="page">
                <div className="tableContainer">
                    <table>
                        <caption>Requests Received</caption>
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
                                    <td><button onClick={this.tradeBooks.bind(offer)}>Confirm</button></td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                {/* <Pagination page={2} maxPages={3} url={`${backend.protocol}://${backend.domain}:${backend.port}`}/> */}
            </div>
        );
    }
}

export default TradeRequests;