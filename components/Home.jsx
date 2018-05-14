import React from "react";

const Home = () => {
    return (
        <div className="page home">
            <div>
                <section className="productInformation">
                    <i className="productInformation-icon icon-laptop"></i>
                    <h1 className="productInformation-heading">Collect</h1>
                    <p className="productInformation-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec feugiat nibh, ut 
                        finibus diam. Donec et lacinia metus. Fusce dictum vulputate.</p>
                </section>
                <section className="productInformation">
                    <i className="productInformation-icon icon-book-open"></i>
                    <h1 className="productInformation-heading">Trade</h1>
                    <p className="productInformation-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec feugiat nibh, ut 
                        finibus diam. Donec et lacinia metus. Fusce dictum vulputate.</p>
                </section>
                <section className="productInformation">
                    <i className="productInformation-icon icon-data-science"></i>
                    <h1 className="productInformation-heading">Interact</h1>
                    <p className="productInformation-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec feugiat nibh, ut 
                        finibus diam. Donec et lacinia metus. Fusce dictum vulputate.</p>
                </section>
            </div>
            <div className="row">
                <a>Join</a>
            </div>
        </div>
    );
}

export default Home;
