const currencyMultiplier = document.querySelector('[data-js="currency-one-times"]')
const convertedValueText = document.querySelector('[data-js="converted-value"]')
const selectCurrencyOne = document.querySelector('[data-js="currency-one"]')
const selectCurrencyTwo = document.querySelector('[data-js="currency-two"]')
const valuePrecisionText = document.querySelector('[data-js="conversion-precision"]')

let objectInternalExchangeRate = {}

const showInitialInfo = () => {
  const { conversion_rates } = objectInternalExchangeRate

  const getOptions = selectedCurrency => Object
    .keys(conversion_rates)
    .map((currency) => `<option ${currency === selectedCurrency ? 'selected' : ''}>
      ${currency}</option>`)
    .join('')

  selectCurrencyOne.innerHTML = getOptions('USD')
  selectCurrencyTwo.innerHTML = getOptions('BRL')

  convertedValueText.textContent = (conversion_rates.BRL).toFixed(2)
  valuePrecisionText.textContent = `1 USD = ${conversion_rates.BRL} BRL`
}

const initializeAplication = async () => {
  const url = getUrl('USD')
  objectInternalExchangeRate = { ...(await fetchExchangeRate(url)) }

  showInitialInfo()
}

const showUpdateRates = () => {
  const { conversion_rates } = objectInternalExchangeRate
  const currencyTwo = conversion_rates[selectCurrencyTwo.value]

  currencyMultiplier.value = 1
  convertedValueText.textContent = (currencyMultiplier.value * currencyTwo)
    .toFixed(2)
  valuePrecisionText.textContent = 
    `1 ${selectCurrencyOne.value} = ${currencyTwo} ${selectCurrencyTwo.value}`
}

const multiplyCurrency = event => {
  const { conversion_rates } = objectInternalExchangeRate
  const currencyTwo = conversion_rates[selectCurrencyTwo.value]
  const multiplicationValue = event.target.value

  convertedValueText.textContent = (multiplicationValue * currencyTwo).toFixed(2)
}

const getCurrencyOne = async event => {
  const currencyOne = event.target.value
  const url = getUrl(currencyOne)
  
  objectInternalExchangeRate = { ...(await fetchExchangeRate(url)) }
  showUpdateRates()
}

selectCurrencyOne.addEventListener('input', getCurrencyOne)
currencyMultiplier.addEventListener('input', multiplyCurrency)
selectCurrencyTwo.addEventListener('input', showUpdateRates)

initializeAplication()