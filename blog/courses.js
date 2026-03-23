let currentFilter = 'all';

const formatPrice = (price) => {
    return new Intl.NumberFormat('mg-MG').format(price) + ' MGA';
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

const renderCourses = (filter = 'all') => {
    const container = document.getElementById('courses-container');
    container.innerHTML = '';

    let courses = data.courses;
    if (filter !== 'all') {
        courses = courses.filter(c => c.level === filter);
    }

    courses.forEach(course => {
        const techTags = (course.technologies || []).map(tech =>
            `<span class="bg-tagBlue text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">${tech}</span>`
        ).join('');

        const card = document.createElement('li');
        card.className = 'h-full';
        card.innerHTML = `
            <article class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group cursor-pointer">
                <div class="overflow-hidden rounded-xl mb-4 h-40 bg-gray-100">
                    <img src="${course.thumbnail}" alt="${course.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                </div>

                <div class="flex flex-wrap gap-2 mb-3">
                    <span class="${getLevelColor(course.level)} text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">${course.level}</span>
                    <span class="bg-gray-100 text-gray-600 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">${getLanguageLabel(course.language)}</span>
                </div>

                <h3 class="text-lg font-serif font-bold text-textDark mb-2 group-hover:text-brandRed transition-colors">${course.title}</h3>

                <p class="text-sm text-textMuted mb-4 line-clamp-3 flex-grow">${course.description}</p>

                ${techTags ? `<div class="flex flex-wrap gap-1 mb-4">${techTags}</div>` : ''}

                <div class="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span class="text-lg font-bold text-brandRed">${formatPrice(course.price)}</span>
                    <button class="text-xs font-bold uppercase tracking-wider text-textDark hover:text-brandRed transition-colors">
                        Enroll →
                    </button>
                </div>
            </article>
        `;
        container.appendChild(card);
    });
};

const filterCourses = (filter) => {
    currentFilter = filter;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-brandRed', 'text-white', 'border-brandRed');
        if (btn.dataset.filter === filter) {
            btn.classList.add('bg-brandRed', 'text-white', 'border-brandRed');
        }
    });

    renderCourses(filter);
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof data === 'undefined') {
        console.error("Le fichier de données n'est pas chargé.");
        return;
    }
    renderCourses();
});
