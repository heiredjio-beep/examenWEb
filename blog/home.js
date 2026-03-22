document.addEventListener('DOMContentLoaded', () => {
    
    if (typeof data === 'undefined') {
        console.error("Le fichier de données n'est pas chargé.");
        return;
    }

    // --- 1. Rendre la section "About me" ---
    const renderAbout = () => {
        const textContainer = document.getElementById('about-text');
        textContainer.innerHTML = `
            <p>${data.aboutMe_part1}</p>
            <p>${data.aboutMe_part2}</p>
        `;

        const statsContainer = document.getElementById('about-stats');
        // Sémantique : Utilisation de <dl> (Data List) avec <dt> (Term) et <dd> (Definition)
        statsContainer.innerHTML = data.overview.map(stat => `
            <div class="flex flex-col">
                <dd class="text-4xl font-serif font-bold text-[#b0101b] mb-1">${stat.number}</dd>
                <dt class="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">${stat.label}</dt>
            </div>
        `).join('');
    };

    // --- 2. Rendre la section "Courses" ---
    const renderCourses = () => {
        const coursesContainer = document.getElementById('courses-container');
        
        // Sémantique : Chaque cours est un <li> contenant un <article>
        coursesContainer.innerHTML = data.homeCourses.map(course => `
            <li class="h-full">
                <article class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group cursor-pointer">
                    <span class="bg-[#b0101b] text-white text-[10px] font-bold px-3 py-1 rounded-full w-max mb-6 tracking-wide">${course.tag}</span>
                    <h3 class="text-xl font-serif font-bold text-[#1a1a1a] mb-12 group-hover:text-[#b0101b] transition-colors">${course.title}</h3>
                    
                    <footer class="mt-auto flex justify-between items-center text-xs text-gray-400 font-medium border-t border-gray-50 pt-4">
                        <span>${course.mode}</span>
                        <span><time>${course.duration}</time></span>
                    </footer>
                </article>
            </li>
        `).join('');
    };

    // --- 3. Rendre la section "Experience" ---
    const renderExperiences = () => {
        const expContainer = document.getElementById('experience-container');
        
        // Sémantique : Liste ordonnée <ol> donc enfants <li> contenant des <article>
        expContainer.innerHTML = data.experiences.map(exp => `
            <li>
                <article class="pl-6 border-l-[3px] border-gray-200 hover:border-[#b0101b] transition-colors duration-300 py-1 group cursor-default">
                    <header>
                        <time class="text-[10px] text-[#b0101b] font-bold tracking-widest uppercase mb-2 block">${exp.year}</time>
                        <h3 class="text-xl font-bold text-[#1a1a1a] mb-1">${exp.role}</h3>
                        <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-4">${exp.org}</p>
                    </header>
                    <p class="text-sm text-gray-600 leading-relaxed">${exp.desc}</p>
                </article>
            </li>
        `).join('');
    };

    // Initialisation
    renderAbout();
    renderCourses();
    renderExperiences();
});