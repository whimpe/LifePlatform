import React, { Component } from "react";

export class Gallery extends Component {
  render() {
    return (
      <div id="portfolio" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2 className='title_text'>VOORBEELDEN</h2>
            <p>
              Enkele herdenkingspagina's en levensverhalen
            </p>
          </div>
          <div className="row">
            <div className="portfolio-items">
              <div className="col-sm-6 col-lg-4">
                <div className="portfolio-item">
                <div className="container2">
                <img src="img/portfolio/jan.jpg" alt="Avatar" className="image2" />
                <div className="overlay2">
                  <div className="text2">Jan Himpe</div>
                </div>
              </div>
                </div>
              </div>


              <div className="col-sm-6 col-lg-4">
                <div className="portfolio-item">
                <div className="container2">
                <img src="img/portfolio/laura2.jpg" alt="Avatar" className="image2" />
                <div className="overlay2">
                  <div className="text2">Laura Verbrugge</div>
                </div>
              </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-4">
                <div className="portfolio-item">
                <div className="container2">
                <img src="img/portfolio/anna2.jpg" alt="Avatar" className="image2" />
                <div className="overlay2">
                  <div className="text2">Anna Janssens</div>
                </div>
              </div>
                </div>
              </div>



            
          
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Gallery;
