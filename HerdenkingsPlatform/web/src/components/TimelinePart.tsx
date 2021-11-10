import React from "react";
import { Herinnering, HerinneringenByDateQuery } from "../generated/graphql";
import {
  formatDate,
  formatDate_object,
  formatDate_object2,
} from "../utils/FormatDate";
import { findClosest } from "../utils/findClosest";
import { min } from "moment";

interface TimelinePartProps {
  cursorDate?: Date;
  setCursorDate: any;  //React.Dispatch<React.SetStateAction<Date>>
  alleHerinneringen: HerinneringenByDateQuery;
}

export const TimelinePart: React.FC<TimelinePartProps> = ({
  cursorDate,
  setCursorDate,
  alleHerinneringen,
}) => {
  // Altijd rond de cursordate zetten

  const sortedMemories = alleHerinneringen.herinneringenByDate as Herinnering[];

  const datums = sortedMemories.map( (herr) => new Date(parseInt(herr.datumVanHerinnering!)) );


  let min: number; // index of first array to display
  let max: number;

  let indexOfCursorDate = findClosest(datums, cursorDate);

 

  if ((indexOfCursorDate - 2) <= 0) {
    min = 0;
    max = 4 + 1;
    
  } else if ((Number(indexOfCursorDate) + 2) >= datums.length) {
    min = datums.length - 4 -1;
    max = datums.length;
    
  } else {
    min = indexOfCursorDate - 2;
    max = Number(indexOfCursorDate) + 3;
  }

  const memories_to_display = sortedMemories.slice(min,max);





  return (
    <>
      <div>juiste index</div>
      <div>{indexOfCursorDate}</div>

      <div>min --- max </div>
      <div>{min}{"----"} {max}</div>

      <div>echte datum :</div>
      <div>{cursorDate ? cursorDate.toDateString() : ""}</div>
      <div>----------------------</div>
      {/* Deel om nieuwe datumù te kiezen bovenaan */}

      {sortedMemories.map((herr) => (
        
        <button
          onClick={() =>
            setCursorDate(new Date(parseInt(herr.datumVanHerinnering!)))
          }
        >
          {formatDate(herr.datumVanHerinnering!)}
        </button>
      ))}

     
      {/* Deel om display van de relevante velden (alleen media laden die nodig is) 
        Belangrijk deze zijn niet per se zichtbaar!!!! ze zijn wel al voorgeladen in cahce van browser == zitten klaar om bekeken te worden
      
      */}

      <div>

      {memories_to_display.map((herr) => (
       
        <div key={herr.id}>
          {(herr.title!)}
        </div>
      ))}


      </div>
    </>
  );
};
