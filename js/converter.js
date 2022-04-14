const APIKey = 'f5ec23c1b4f520691c1ed458'

const getUrl =  currency => `https://v6.exchangerate-api.com/v6/${APIKey}/latest/${currency}`

const fetchExchangeRate = async url => {
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Não foi possível acessar os dados')
    }
    return response.json()

  } catch ({ name, message }) {
    alert(`${name} : ${message}`)
  }
}