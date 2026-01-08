let quotes = []

const initialQuote = {
    quote: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
}

const quotesCountainer = document.querySelector(".quotes-container")
const displayQuotes = (quote) => {
    quotesCountainer.innerHTML = `
        <header class="text-content ">
            <h1 class="p-3 text-light">Random Quote Generator</h1>
        </header>
                <div class="quote">
                    <h5 class="random-quote ps-5 pe-5 pt-4">${quote.quote.trim()}</h5>
                    <p class="quote-author pt-2 pb-3 pe-2">- ${quote.author}</p>
                </div>
                <div class="btns p-3">
                    <button class="generate-btn btn pt-2">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.96133 3.84336C9.15605 3.09004 8.09102 2.64844 6.97402 2.64844C4.97383 2.67441 3.2334 4.05117 2.76582 5.94746C2.71387 6.10332 2.58398 6.18125 2.4541 6.18125H0.973437C0.765625 6.18125 0.609766 6.02539 0.661719 5.81758C1.20723 2.83027 3.83086 0.570312 7 0.570312C8.71445 0.570312 10.273 1.27168 11.442 2.3627L12.3771 1.42754C12.7668 1.03789 13.4422 1.32363 13.4422 1.86914V5.35C13.4422 5.71367 13.1564 5.97344 12.8188 5.97344H9.31191C8.76641 5.97344 8.48066 5.32402 8.87031 4.93437L9.96133 3.84336ZM1.18125 8.05156H4.66211C5.20762 8.05156 5.49336 8.72695 5.10371 9.1166L4.0127 10.2076C4.81797 10.9609 5.88301 11.4025 7 11.4025C9.0002 11.3766 10.7406 9.9998 11.2082 8.10352C11.2602 7.94766 11.39 7.86973 11.5199 7.86973H13.0006C13.2084 7.86973 13.3643 8.02559 13.3123 8.2334C12.7668 11.2207 10.1432 13.4547 7 13.4547C5.25957 13.4547 3.70098 12.7793 2.53203 11.6883L1.59687 12.6234C1.20723 13.0131 0.557812 12.7273 0.557812 12.1818V8.675C0.557812 8.3373 0.817578 8.05156 1.18125 8.05156Z"
                                fill="white" />
                        </svg>
                        <p class="text-light pt-3">New Quote</p>
                    </button>
                    <button class="copy-btn btn pt-2">
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.49375 12V13.0391C8.49375 13.4027 8.20801 13.6625 7.87031 13.6625H0.804688C0.441016 13.6625 0.18125 13.4027 0.18125 13.0391V3.47969C0.18125 3.14199 0.441016 2.85625 0.804688 2.85625H2.675V10.5453C2.675 11.3506 3.32441 12 4.12969 12H8.49375ZM8.49375 3.06406C8.49375 3.42773 8.75352 3.6875 9.11719 3.6875H11.8188V10.5453C11.8188 10.909 11.533 11.1687 11.1953 11.1687H4.12969C3.76602 11.1687 3.50625 10.909 3.50625 10.5453V0.985937C3.50625 0.648242 3.76602 0.3625 4.12969 0.3625H8.49375V3.06406ZM11.6109 2.25879C11.7408 2.38867 11.8188 2.54453 11.8188 2.70039V2.85625H9.325V0.3625H9.48086C9.63672 0.3625 9.79258 0.44043 9.92246 0.570312L11.6109 2.25879Z"
                                fill="#333333" />
                        </svg>
                        <p class="pt-3">Copy</p>
                    </button>
        </div>`

    const generateRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        displayQuotes(quotes[randomIndex]);
    };

    document.querySelector(".generate-btn")
        .addEventListener("click", generateRandomQuote);

    document.querySelector(".copy-btn")
        .addEventListener("click",
            async () => {
                const quoteText = document.querySelector(".random-quote").innerText;

                try {
                    await navigator.clipboard.writeText(quoteText);

                    const btnText = document.querySelector(".copy-btn p");
                    Swal.fire({
                        text: "Quote copied successfully!",
                        timer: 1500,
                        customClass: {
                            popup: 'my-popup'
                        }
                    })
                    setTimeout(() => btnText.innerText = "Copy", 1500);
                    console.log("Quote copied successfully!");
                } catch (err) {
                    console.error("Copy failed", err);
                    fallbackCopyText(quoteText);
                }
            });
}
displayQuotes(initialQuote)

const getQuotesFromAPI = () => {
    fetch('https://dummyjson.com/quotes')
        .then(res => res.json())
        .then(data => {
            quotes = data.quotes.map(quote => ({
                quote: quote.quote,
                author: quote.author,
            }))
        })
}
getQuotesFromAPI();