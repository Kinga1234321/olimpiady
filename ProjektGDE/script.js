document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('results');

    // Funkcja do pobrania danych z pliku JSON
    async function fetchData() {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    }

    // Funkcja do wyświetlania wyników
    function displayResults(results) {
        resultsContainer.innerHTML = '';
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>Brak wyników.</p>';
            return;
        }
        results.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('result-item');
            const kierunek = document.createElement('h3');
            kierunek.textContent = item.kierunek;
            const olimpiadyList = document.createElement('ul');
            item.olimpiady.forEach(olimpiada => {
                const li = document.createElement('li');
                li.textContent = olimpiada;
                olimpiadyList.appendChild(li);
            });
            div.appendChild(kierunek);
            div.appendChild(olimpiadyList);
            resultsContainer.appendChild(div);
        });
    }

    // Funkcja do filtrowania danych na podstawie wpisanego tekstu
    function filterData(data, query) {
        return data.filter(item => item.kierunek.toLowerCase().includes(query.toLowerCase()));
    }

    // Nasłuchiwanie na wpisywanie tekstu w polu wyszukiwania
    searchInput.addEventListener('input', async function() {
        const query = searchInput.value.trim();
        if (query.length === 0) {
            resultsContainer.innerHTML = '';
            return;
        }
        const data = await fetchData();
        const filteredResults = filterData(data, query);
        displayResults(filteredResults);
    });
});
