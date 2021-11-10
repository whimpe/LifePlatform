import { Flex } from "@chakra-ui/core";
import React from "react";

interface TeamProps {
  data: any;

}

export const Team: React.FC<TeamProps> = ({data}) => {
    return (
      <div id="team" className="text-center">
        <div className="container">
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>WIE ZIJN WIJ?</h2>
            <p>
              Drie studenten die samengekomen zijn om dierbare herinneringen en media te kunnen vereeuwigen!
            </p>
          </div>
          <div id="row">
            <div className="center_team">
            {data
              ? data.map((d:any, i:any) => (
                  <div  key={`${d.name}-${i}`} className="col-md-4 col-sm-4 team">
                      
                  <div className="thumbnail">
                    <a
                      href={d.linkedin}
                      title="Project Title"
                      data-lightbox-gallery="gallery1"
                    >                                      
                      <img src={d.img} alt="..." className="team-img"/>
                    </a>
                </div>
                <div className="caption">
                        <h4>{d.name}</h4>
                        <p>{d.job}</p>
                      </div>
                  </div>

                ))
              : "loading"}
             </div>
          </div>
        </div>
      </div>
    );
  }


export default Team;
