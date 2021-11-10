
export function formatDate(date:any){
  var date2 = new Date(parseInt(date));   //omzetten naar date
  const year= date2.toDateString().split(' ')[3]; //jaar uithalen
  const months=['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november','december' ]
  return (months[date2.getMonth()]+' '+year)
  }
  
export function formatDate_text(date:any){
    var date2 = new Date(parseInt(date));   //omzetten naar date
    const year= date2.toDateString().split(' ')[3]; //jaar uithalen
    const month= date2.toDateString().split(' ')[1];
    const day= date2.toDateString().split(' ')[2];
    const months=['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november','december' ]
    return (day+' '+months[date2.getMonth()]+' '+year)
    }
  

    export function formatDate_number(date:any){
      var date2 = new Date(parseInt(date));   //omzetten naar date
      const year= date2.toDateString().split(' ')[3]; //jaar uithalen
      const month= date2.toDateString().split(' ')[1];
      const day= date2.toDateString().split(' ')[2];
      const months=['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11','12' ]
      return (day+'-'+months[date2.getMonth()]+'-'+year)
      }


    export function formatDate_string(date:string){
      const year= date.split('-')[0]; //jaar uithalen
      const month= parseInt(date.split('-')[1]);
      const day= parseInt(date.split('-')[2]);
      const months=['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november','december' ]
      return (day+' '+months[month-1]+' '+year)
      }
    
      export function formatDate_object_Month_Year(date:Date){
        var date2 = new Date(date);
        const year= date2.getFullYear(); //jaar uithalen
        const month= date2.getUTCMonth()-1;
        const months=['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november','december' ]
        return (months[month-1]+' '+year)
        }
        
        export function formatDate_object_Date_Month_Year(date:Date){
          var date2 = new Date(date);
          const date_nm= date2.getDate(); //jaar uithalen
          const year= date2.getFullYear(); //jaar uithalen
          const month= date2.getUTCMonth();
          const months=['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november','december' ]
          return (date_nm+' '+months[month]+' '+year)
          }
        

  export function get_year_db(date:any){
    var date2 = new Date(parseInt(date));   //omzetten naar date
    const year= date2.toDateString().split(' ')[3]; 
    return(year)
  }

  export function get_date_object(date:any){
    var date_obj = new Date(parseInt(date));   //omzetten naar date
    return(date_obj)
  }



  export function formatDate_num(date:any){
    if(date===undefined){
        return null
    }
    const year= date.slice(0,4);
    const month= date.slice(5,7);
    const day= date.slice(8,10);
    return (day+'-'+month+'-'+year)
  }
  
    
  export function formatDate_object(date:any){
    if(date===undefined){
        return null
    }
    const year= date.year;
    const month= date.month-1;
    const day= date.day;
    const months=['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11','12' ]
    return (day+'-'+months[month]+'-'+year)
  }
  
  export function formatDate_object2(date:any){
    if(date===undefined){
        return null
    }
    const year= parseInt(date.slice(0,4));
    const month= parseInt(date.slice(5,7))-1;
    const day= parseInt(date.slice(8,10));
       return { year: year,month: month, day: day}
  }
  
  export function change_dateView(date: any) {
    const year = date.split("-")[0];
    const month = date.split("-")[1];
    const day = date.split("-")[2];
    return day + "-" + month + "-" + year;
  }

  export function get_year(date: string) {
    const year = date.split("-")[0];   
    return year;
  }


  export function change_dateView_2(date: string) {
    const year = date.split("-")[0];
    const month = date.split("-")[1];
    const day = date.split("-")[2];
    return day + "/" + month + "/" + year;
  }


  export function convert_date_to_string(date:any){    
    const array =  date.split("-");
    const year =array[0];
    const month =array[1];
    const day =array[2].slice(0,2);
    return day + "-" + month + "-" + year;
  }