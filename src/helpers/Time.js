


export const getCurrenTime = () => {
  var today = new Date();
  var date = (today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`) + '-' + ((today.getMonth() + 1) > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`) + '-' + today.getFullYear();
  var time = (today.getHours() > 9 ? today.getHours() : `0${today.getHours()}`) + ":" + (today.getMinutes() > 9 ? today.getMinutes() : `0${today.getMinutes()}`) + ":" + (today.getSeconds() > 9 ? today.getSeconds() : `0${today.getSeconds()}`);
  var dateTime = date + ' ' + time;
  return dateTime;
}