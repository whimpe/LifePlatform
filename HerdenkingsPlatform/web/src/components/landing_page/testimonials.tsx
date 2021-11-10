import React from "react";
interface TestimonialsProps {
  data: any;

}

export const Testimonials: React.FC<TestimonialsProps> = ({data}) => {
    return (
      <div id="testimonials">
        <div className="container">
          <div className="section-title text-center">
            <h2>GETUIGENISSEN KLANTEN </h2>
          </div>
          <div className="row">
            {data ? data.map((d:any, i:any) => (
                  <div key={`${d.name}-${i}`} className="col-md-4">
                    <div className="testimonial">
                      <div className="testimonial-image">
                        {" "}
                        <img src={d.img} alt="" />{" "}
                      </div>
                      <div className="testimonial-content">
                        <p>"{d.text}"</p>
                        <div className="testimonial-meta"> - {d.name} </div>
                      </div>
                    </div>
                  </div>
                ))
              : "loading"}
          </div>
        </div>
      </div>
    );
  }


export default Testimonials;
