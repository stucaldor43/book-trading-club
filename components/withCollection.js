import React from 'react';
import BookGallery from './BookGallery';
import AddBookDialog from './AddBookDialog';

const withCollection = bookCollectionURL => collectionSearchURl => deleteableBooks => showAddBookButton => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                searchInput: '',
                isAddBookDialogOpen: false
            };
            this.changeHandler = this.changeHandler.bind(this);
            this.openAddBookDialog = this.openAddBookDialog.bind(this);
            this.closeAddBookDialog = this.closeAddBookDialog.bind(this);
        }

        changeHandler(evt) {
            evt.persist();
            this.setState({[evt.target.name]: evt.target.value});
        }

        openAddBookDialog() {
            this.setState({ isAddBookDialogOpen: true });
        }

        closeAddBookDialog() {
            this.setState({ isAddBookDialogOpen: false });
        }

        render() {
            const {searchInput, isAddBookDialogOpen} = this.state;
            
            return (
                <div className="page">
                    <div className="myBooks-buttonContainer">
                        <input name="searchInput" value={searchInput} onChange={this.changeHandler}/>
                        {showAddBookButton && <button className="addBookButton" onClick={ this.openAddBookDialog }>Add book</button>}
                    </div>
                    <BookGallery ref={c => this.childComponent = c} url={searchInput.trim().length === 0  ? bookCollectionURL : collectionSearchURl + `/?term=${searchInput}&page=`}
                                 canBooksBeDeleted={deleteableBooks}/>
                    { isAddBookDialogOpen && <AddBookDialog closeDialog={ this.closeAddBookDialog } refreshPage={() => this.childComponent.goToPage()}/> }
                </div> 
            );
        }
    }
}

export default withCollection;