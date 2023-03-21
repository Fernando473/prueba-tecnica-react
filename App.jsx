import { useEffect, useState } from "react";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
const CAT_PREFIX_IMG_URL  =  "https://cataas.com"

const App = () => {
  const [fact, setFact] = useState();
  const [imageUrl, setImagUrl] = useState()

  useEffect(() => {
    async function getRandomFact() {
      const response = await fetch(CAT_ENDPOINT_RANDOM_FACT);
      const data = await response.json();
      setFact(data.fact);

      const firstWord = fact.split(" ", 3).join(" "); // .join nos sirve para unir los datos de un array en un string
      // El otro parametro de split significa el numer de elementos deseados
      // Otra alternativa es: fact.split(" ").slice(1,3).join(" ")
      
      fetch(
        `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
      )
        .then((res) => res.json())
        .then((response) => {
          const {url} = response
          setImagUrl(url)
        });

      console.log(firstWord);
    }

    getRandomFact();
  }, []);

  return (
    <>
      <h1>App d</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={`${CAT_PREFIX_IMG_URL}${imageUrl}`} alt="Imagen rando traida desde internet"/>}
    </>
  );
};

export default App;
