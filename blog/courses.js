let filters = {
    language: '',
    technology: '',
    level: '',
    priceMin: 0,
    priceMax: 250000,
    search: ''
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('mg-MG').format(price) + ' MGA';
};

const formatPriceShort = (price) => {
    return new Intl.NumberFormat('mg-MG').format(price);
};

const getLevelColor = (level) => {
    switch(level) {
        case 'beginner': return 'bg-green-100 text-green-700';
        case 'intermediate': return 'bg-yellow-100 text-yellow-700';
        case 'advanced': return 'bg-red-100 text-red-700';
        default: return 'bg-gray-100 text-gray-700';
    }
};

const getLanguageLabel = (lang) => {
    switch(lang) {
        case 'en': return 'English';
        case 'fr': return 'Français';
        case 'mg': return 'Malagasy';
        default: return lang;
    }
};

const updateResultsCount = (count) => {
    document.getElementById('results-count').textContent = `${count} course${count !== 1 ? 's' : ''} found`;
};

const updatePriceDisplay = () => {
    const min = parseInt(filters.priceMin) || 0;
    const max = parseInt(filters.priceMax) || 250000;
    document.getElementById('price-display').textContent =
        `${formatPriceShort(min)} - ${formatPriceShort(max)}`;
};

const applyFilters = () => {
    let courses = data.courses;

    // Filtre langue
    if (filters.language) {
        courses = courses.filter(c => c.language === filters.language);
    }

    // Filtre technologie
    if (filters.technology) {
        courses = courses.filter(c => c.technologies && c.technologies.includes(filters.technology));
    }

    // Filtre niveau
    if (filters.level) {
        courses = courses.filter(c => c.level === filters.level);
    }

    // Filtre prix min
    if (filters.priceMin) {
        courses = courses.filter(c => c.price >= parseInt(filters.priceMin));
    }

    // Filtre prix max
    if (filters.priceMax) {
        courses = courses.filter(c => c.price <= parseInt(filters.priceMax));
    }

    // Filtre recherche
    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        courses = courses.filter(c =>
            c.title.toLowerCase().includes(searchLower) ||
            c.description.toLowerCase().includes(searchLower)
        );
    }

    renderCourses(courses);
    updateResultsCount(courses.length);
};

const setLanguage = (lang) => {
    // Si même langue cliquée, désélectionner
    if (filters.language === lang) {
        filters.language = '';
    } else {
        filters.language = lang;
    }

    // Mettre à jour visuel des boutons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('border-brandRed');
        btn.classList.add('border-transparent');
        if (btn.dataset.lang === filters.language) {
            btn.classList.remove('border-transparent');
            btn.classList.add('border-brandRed');
        }
    });

    applyFilters();
};

const clearFilters = () => {
    filters = { language: '', technology: '', level: '', priceMin: 0, priceMax: 250000, search: '' };

    // Reset language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('border-brandRed');
        btn.classList.add('border-transparent');
    });

    // Reset dropdowns
    document.getElementById('filter-technology').value = '';
    document.getElementById('filter-level').value = '';
    document.getElementById('filter-search').value = '';

    // Reset sliders
    document.getElementById('price-min-slider').value = 0;
    document.getElementById('price-max-slider').value = 250000;
    updatePriceDisplay();

    applyFilters();
};

const renderCourses = (courses) => {
    const container = document.getElementById('courses-container');
    container.innerHTML = '';

    if (courses.length === 0) {
        container.innerHTML = '<li class="col-span-full text-center py-12 text-gray-500">No courses found matching your criteria.</li>';
        return;
    }

    courses.forEach(course => {
        const levelColors = {
            'beginner': 'bg-green-500 text-white',
            'intermediate': 'bg-yellow-500 text-white',
            'advanced': 'bg-red-500 text-white'
        };

        // Badge technologie (premier élément du tableau)
        const techBadge = course.technologies && course.technologies.length > 0
            ? `<span class="bg-white text-gray-800 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded shadow-sm">${course.technologies[0]}</span>`
            : '';

        // Badge langue
        const langLabel = getLanguageLabel(course.language);
        const langBadge = `<span class="bg-white text-gray-800 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded shadow-sm">${langLabel}</span>`;

        const card = document.createElement('li');
        card.className = 'h-full';
        card.innerHTML = `
            <article class="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group cursor-pointer overflow-hidden">
                <!-- Image avec badges superposés -->
                <div class="relative h-52 bg-gray-100 overflow-hidden">
                    <img src="${course.thumbnail}" alt="${course.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">

                    <!-- Badges en haut à gauche (langue + technologie) -->
                    <div class="absolute top-2 left-2 flex gap-1">
                        ${langBadge}
                        ${techBadge}
                    </div>

                    <!-- Badge niveau en bas à droite -->
                    <span class="absolute bottom-2 right-2 ${levelColors[course.level] || 'bg-gray-500 text-white'} text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                        ${course.level}
                    </span>
                </div>

                <!-- Contenu sous l'image -->
                <div class="p-4 flex flex-col flex-grow">
                    <!-- Titre en ROUGE -->
                    <h3 class="text-base font-bold text-brandRed mb-1 line-clamp-2">${course.title}</h3>

                    <!-- Prix -->
                    <span class="text-sm text-gray-700 font-semibold mb-2">${formatPrice(course.price)}</span>

                    <!-- Description -->
                    <p class="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">${course.description}</p>

                    <!-- Boutons décalés vers la droite -->
                    <div class="mt-auto flex gap-2 justify-end">
                        <button class="bg-white shadow text-gray-700 py-2 px-4 rounded font-medium text-xs hover:shadow-md transition-all cursor-pointer">
                            Learn more
                        </button>
                        <button class="bg-red-600 text-white py-2 px-4 rounded font-bold text-xs hover:bg-red-700 shadow transition-colors cursor-pointer">
                            Add to cart
                        </button>
                    </div>
                </div>
            </article>
        `;
        container.appendChild(card);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof data === 'undefined') {
        console.error("Le fichier de données n'est pas chargé.");
        return;
    }

    // Event listeners pour les filtres
    document.getElementById('filter-technology').addEventListener('change', (e) => {
        filters.technology = e.target.value;
        applyFilters();
    });

    document.getElementById('filter-level').addEventListener('change', (e) => {
        filters.level = e.target.value;
        applyFilters();
    });

    document.getElementById('price-min-slider').addEventListener('input', (e) => {
        filters.priceMin = e.target.value;
        updatePriceDisplay();
        applyFilters();
    });

    document.getElementById('price-max-slider').addEventListener('input', (e) => {
        filters.priceMax = e.target.value;
        updatePriceDisplay();
        applyFilters();
    });

    document.getElementById('filter-search').addEventListener('input', (e) => {
        filters.search = e.target.value;
        applyFilters();
    });

    document.getElementById('clear-filters').addEventListener('click', clearFilters);

    // Initial render
    renderCourses(data.courses);
    updateResultsCount(data.courses.length);
});
