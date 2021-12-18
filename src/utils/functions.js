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

export const states = [
  {state: "Acre", abbreviation: "AC"},
  {state: "Alagoas", abbreviation: "AL"},
  {state: "Amapá", abbreviation: "AP"},
  {state: "Amazonas", abbreviation: "AM"},
  {state: "Bahia", abbreviation: "BA"},
  {state: "Ceará", abbreviation: "CE"},
  {state: "Distrito Federal", abbreviation: "DF"},
  {state: "Espírito Santo", abbreviation: "ES"},
  {state: "Goiás", abbreviation: "GO"},
  {state: "Maranhão", abbreviation: "MA"},
  {state: "Mato Grosso", abbreviation: "MT"},
  {state: "Mato Grosso do Sul", abbreviation: "MS"},
  {state: "Minas Gerais", abbreviation: "MG"},
  {state: "Pará", abbreviation: "PA"},
  {state: "Paraíba", abbreviation: "PB"},
  {state: "Paraná", abbreviation: "PR"},
  {state: "Pernambuco", abbreviation: "PE"},
  {state: "Piauí", abbreviation: "PI"},
  {state: "Rio de Janeiro", abbreviation: "RJ"},
  {state: "Rio Grande do Norte", abbreviation: "RN"},
  {state: "Rio Grande do Sul", abbreviation: "RS"},
  {state: "Rondônia", abbreviation: "RO"},
  {state: "Roraima", abbreviation: "RR"},
  {state: "Santa Catarina", abbreviation: "SC"},
  {state: "São Paulo", abbreviation: "SP"},
  {state: "Sergipe", abbreviation: "SE"},
  {state: "Tocantins", abbreviation: "TO"},
];
