export async function getCountrys() {
  const countrys = await fetch("https://restcountries.com/v3/all")
    .then((response) => response.json())
    .then((data) => {
      const countryNames = [];
      data.forEach((element) => {
        countryNames.push(element.name.common);
      });
      const newArr = countryNames.sort(function (a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
      });
      return newArr;
    });
  return countrys;
}

export async function getCep(cep) {
  const api = fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return api;
}
