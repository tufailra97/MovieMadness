const handleDate = (date) => {
  if(date === undefined){
    return <span style = { styles.head }>Date</span>;
  }

  let d = date.split('-');
  let day = d[2];
  let year = d[0];
  let month;
  //get month 
  switch(d[1]){
    case '01':
      month = 'Jan';
      break;
    case '02':
      month = 'Feb';
      break;
    case '03':
      month = 'Mar';
      break;
    case '04':
      month = 'Apr';
      break;
    case '05':
      month = 'May';
      break;
    case '06':
      month = 'Jun';
      break;
    case '07':
      month = 'Jul';
      break;
    case '08':
      month = 'Aug';
      break;
    case '09': 
      month = 'Sep';
      break;
    case '10':
      month = 'Oct';
      break;
    case '11': 
      month = 'Nov';
      break;
    default:
      month = 'Dec';
      break;
  }
  const newDate = day + ' ' + month  + ' ' + year;

  return <span style = { styles.head }>{newDate}</span>;
}

export {handleDate};