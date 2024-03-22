const GetCurrTime = () => {
  let teraz = new Date();
  let h = teraz.getHours();
  let m = teraz.getMinutes();
  let s = teraz.getSeconds();
  return h + ':' + m + ':' + s
}

export default GetCurrTime