import './App.css';
import axios from "axios";
import worldmap from '../src/assets/world_map.png'
import world from '../src/assets/world.png'
import {useState} from "react";

function App() {
    const [countries, setCountries] = useState([])
    const [showButton, setShouButton] = useState(true)
    const [input, setInput] = useState([])
    const [single, setSingle] = useState([])

    const hideButton = () => {
        setShouButton(!showButton)
    }

    async function fetchData() {

        try {
            const response = await axios.get('https://restcountries.com/v3.1/all')

            setCountries(response.data)

        } catch (e) {
            console.error(e);
        }
    }

    function SortbyPopulation() {

        countries.sort((a, b) => {

            return a.population - b.population

        })
    }

    SortbyPopulation()

    async function searchData() {

        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${input}`)

            setSingle(response.data)

        } catch (e) {
            console.error(e);
        }
    }


    function onFormSubmit(e) {
        e.preventDefault()
        setInput('')
    }


    return (
        <>
            <div>

                <img className='world' src={worldmap} alt="foto van wereldkaart"/>

                <h1>World regions</h1>

                {showButton && <button className='searchbutton' type='button' onClick={() => {
                    fetchData();
                    hideButton();
                }}>All countries</button>}

                <div className='country'>
                    {
                        countries.map((countries, index) =>

                            (
                                <div className='countryInfo' key={index}>
                                    <p>{countries.name.common}</p>
                                    <img className='flag' src={countries.flags.svg} alt={countries.flags.alt}/>
                                    <p>Has a population of {countries.population} people</p>
                                </div>
                            )
                        )
                    }
                </div>
                <h1> Search country information</h1>
                <img className='globe' src={world} alt="foto van de aardbol"/>
                <div className='searchbox'>
                    <form onSubmit={onFormSubmit}>
                        <input type="text" placeholder='Bijvoorbeeld Nederland of Peru' value={input}
                               onChange={(e) => setInput(e.target.value)}/>
                        <button onClick={searchData} type='submit' className='globesearch'>Zoek</button>
                    </form>
                </div>


                {  single.map((single, id) => (

                        <div className='searchcountry' key={id}>

                            <div className='namecountry'>
                            <img className='flag' src={single.flags.svg} alt={single.flags.alt}/><h1>{single.name.common}</h1>
                            </div>
                            <p>{single.name.common} is situated in {single.region} and the capital is {single.capital}</p>
                            <p>It has a population of {single.population} million people and it borders with  { single.borders.length}  neighboring  countries</p>
                            <p>Websites can be found on {single.tld} domain's</p>
                        </div>
                )
                    )
                }


            </div>
        </>
    )
}

export default App
