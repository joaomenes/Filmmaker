// botões de filtro por tipo 
const filterButtons = document.querySelectorAll('.filter-btn');
const selectedTypes = new Set();

// seleção de tipo de conteúdo
filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        const type = this.dataset.type;

        if (selectedTypes.has(type)) {
            selectedTypes.delete(type);
            this.classList.remove('selected');
        } else {
            selectedTypes.add(type);
            this.classList.add('selected');
        }
    });
});

// backend ao submeter o formulário
document.getElementById('filter-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
        show_type: Array.from(selectedTypes),  // lista movie', 'series' 
        services: document.getElementById('service').value,
        release_from: document.getElementById('release_from').value,
        release_to: document.getElementById('release_to').value,
        genres: document.getElementById('genre').value,
        language: document.getElementById('language').value,
        vote_min: document.getElementById('vote_min').value
    };

    fetch('/filter_search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Resultado:', result);
    })
    .catch(error => console.error('Erro na requisição:', error));
});

// token CSRF necessário para a requisição POST
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
