const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Función asíncrona para obtener una frase usando una APi
async function getQuote() {
  //Se utuliza una api de proxy para tener las cabeceras Cross-Origin Resource Sharing
  //const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  //const apiUrl =
  //  "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  const apiUrl = "https://type.fit/api/quotes";
  try {
    //Trae la frase de la api indicada
    const response = await fetch(apiUrl);
    //Almacena en formato json
    const data = await response.json();

    //Genera un número pseudoaleatorio para obtener una nueva frase
    var number = Math.floor(Math.random() * 1641 + 1);

    //Inserta los valores conseguidos al documento
    //En caso de que no haya ningún autor, se establece el autor por defecto "unknown"
    if (data[number].author === "") {
      authorText.innerText = "Unknown Author";
    } else {
      authorText.innerText = data[number].author;
    }

    //Reducir el tamaño de la fuente si la frase es muy larga
    if (data[number].text.length > 80) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data[number].text;
  } catch (error) {
    getQuote();
  }
}

//Función para tweetear una frase obtenida
function tweetQuote() {
  //Obtenemos la frase conseguida y el author de dicha frase
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const website = "Shared from: quoteoftheday.com";
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author} - ${website}`;
  window.open(twitterUrl);
}

//Al cargar la página
getQuote();
