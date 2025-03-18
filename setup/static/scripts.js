document.querySelectorAll('.films_or_series button').forEach(button => {
    button.addEventListener('click', function() {
        
        button.classList.toggle('selected');

        
        if (button.textContent === 'Filmes') {
            document.querySelector('.films_or_series button:nth-child(2)').classList.remove('selected'); 
        } else {
            document.querySelector('.films_or_series button:nth-child(1)').classList.remove('selected');   
        }
    });
});

document.querySelector('#search-button').addEventListener('click', function() {
    
    const yearInitial = document.querySelector('.year_initial').value;
    const yearEnd = document.querySelector('.year_end').value;
    const movieLanguageSelecting = document.querySelector('.movie_language_selecting').value;
    const durationLanguageSelecting= document.querySelector('.duration_language_selecting').value;
    const reviewsLanguageSelecting = document.querySelector('.reviews_language_selecting').value;
    const ageSelecting = document.querySelector('.age_selecting').value;
    const voteMin = document.querySelector('.vote-select').value;

   
    const selectedGenres = [];
    document.querySelectorAll('.genres-list button.selected').forEach(button => {
        selectedGenres.push(button.textContent);  
    });

    
    let showTypeSelection = '';  
    const selectedButton = document.querySelector('.films_or_series button.selected');
    if (selectedButton) {
        showTypeSelection = selectedButton.textContent === 'Filmes' ? 'movie' : 'series';
    }

    
    const filtros = {
        year_initial: yearInitial,
        year_end: yearEnd,
        movie_language_selecting: movieLanguageSelecting,
        duration_language_selecting: durationLanguageSelecting,
        release_to: yearTo,
        genres: selectedGenres.join(','),  //gêneros como uma string separada por vírgulas
        reviews_language_selecting: reviewsLanguageSelecting,
        age_selecting: ageSelecting
    };

   
    fetch('/filter/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filtros),
    })
    .then(response => response.json())
    .then(data => {
        // Limpa os resultados
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';  // Limpa qualquer resultado anterior

        // verifica se obteve resultado
        if (data.results && data.results.length > 0) {
            data.results.forEach(item => {
                const divItem = document.createElement('div');
                divItem.classList.add('resultado-item');

                const title = document.createElement('h3');
                title.textContent = item.title || item.name;  

                divItem.appendChild(title);
                resultadosDiv.appendChild(divItem);
            });
        } else {
            const mensagem = document.createElement('p');
            mensagem.textContent = 'Nenhum resultado encontrado para os filtros selecionados.';
            resultadosDiv.appendChild(mensagem);
        }
    })
    .catch(error => {
        console.error('Erro ao buscar:', error);
    });
});