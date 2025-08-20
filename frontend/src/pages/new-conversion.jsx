import Button from "../components/button.jsx";
import NumberInput from "../components/number-input.jsx";
import Container from "../components/container.jsx";
import {useEffect, useState} from "react";
import {ChevronDownIcon} from "@heroicons/react/16/solid/index.js";

export default function NewConversion() {
    const [selectedFrom, setSelectedFrom] = useState('EUR');
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedTo, setSelectedTo] = useState(1);

    //`https://v6.exchangerate-api.com/v6/4decdf43b83d3688b2864c0a/latest/EUR`

    /*useEffect(() => {
        console.log('Valor do parâmetro para a URL:', selectedFrom);
        // Se o valor for 'undefined' aqui, o problema está na forma como o estado é inicializado ou atualizado

        // Faça a requisição somente se o valor não for 'undefined'
        /!*if (selectedFrom) {
            fetch(`https://v6.exchangerate-api.com/v6/4decdf43b83d3688b2864c0a/latest/${selectedFrom}`);
        }*!/
    }, [selectedFrom]);*/

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const res = await fetch(`https://v6.exchangerate-api.com/v6/4decdf43b83d3688b2864c0a/latest/EUR`);
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await res.json();
                setCurrencies(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrencies();
    }, []);

    // const EUR = 1
    // const BRL = currencies.rates.BRL
    // const JPY = currencies.rates.JPY
    // const USD = currencies.rates.USD

    const EUR = 1
    const BRL = 6.385324
    const JPY = 172.014286
    const USD = 1.16561

    const items = [
        { value: 'EUR', rate: 1 },
        { value: 'BRL', rate: 6.385324 },
        { value: 'JPY', rate: 172.014286 },
        { value: 'USD', rate: 1.16561 },
    ];

    const allItems = currencies.conversion_rates

    console.log('EUR Currency: ', allItems.EUR)

    let eurtobrl = (EUR / BRL);
    let eurtojpy = (EUR / JPY);
    let eurtousd = (EUR / USD);
    let usdtoeur = (USD / EUR);
    let usdtobrl = (USD / BRL);
    let usdtojpy = (USD / JPY);
    let brltoeur = (BRL / EUR);
    let brltousd = (BRL / USD);
    let brltojpy = (BRL / JPY);
    let jpytoeur = (JPY / EUR);
    let jpytobrl = (JPY / BRL);
    let jpytousd = (JPY / USD);

    const handleChangeFrom = (e) => {
        setSelectedFrom(e.target.value);
    }

    const handleChangeTo = (e) => {
        setSelectedTo(e.target.value);
    }

    return (
        <Container>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-neutral-100 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-neutral-900">
                        <form>
                            <div className="grid grid-cols-4 gap-4">

                                <div className="col-span">
                                    <label htmlFor='currency_from' className="block text-sm/6 font-medium text-gray-900">
                                        Currency From
                                    </label>
                                    <div className="mt-2 grid grid-cols-1">
                                        <select
                                            id='currency_from'
                                            name='currency_from'
                                            value={selectedFrom}
                                            onChange={handleChangeFrom}
                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6"
                                        >
                                            {items.map((item) => (
                                                <option key={item.value} value={item.rate}>
                                                    {item.value}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        />
                                    </div>
                                </div>

                                <div className="col-span">
                                    <NumberInput
                                        name="amount"
                                        label="Amount"
                                        initialValue={1}
                                    />
                                </div>

                                <div className="col-span">
                                    <label htmlFor='currency_to' className="block text-sm/6 font-medium text-gray-900">
                                        Currency To
                                    </label>
                                    <div className="mt-2 grid grid-cols-1">
                                        <select
                                            id='currency_to'
                                            name='currency_to'
                                            value={selectedTo}
                                            onChange={handleChangeTo}
                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6"
                                        >
                                            {items.map((item) => (
                                                <option key={item.value} value={item.rate}>
                                                    {item.value}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        />
                                    </div>
                                </div>

                                <div className="col-span text-sm/6 font-medium text-gray-900">
                                    <label>Conversion Tax</label>
                                    <p className='align-text-bottom'>{selectedTo}</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <Button />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>

    )
}