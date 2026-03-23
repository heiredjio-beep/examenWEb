document.addEventListener('DOMContentLoaded', () => {

    if (typeof data === 'undefined') {
        console.error("Le fichier de données n'est pas chargé.");
        return;
    }

    const renderStars = (rating) => {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += `
                <svg class="w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>`;
        }
        return stars;
    };

    const renderTestimonialCard = (t, roleLabel) => {
        return `
            <li>
                <article class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col h-full">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                            <img src="${t.thumbnail}" alt="${t.author}" class="w-full h-full object-cover">
                        </div>
                        <div>
                            <h3 class="font-bold text-[#1a1a1a] text-sm">${t.author}</h3>
                        </div>
                    </div>

                    <span class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">${roleLabel}</span>
                    <div class="h-[2px] w-8 bg-[#b0101b] my-3"></div>

                    <blockquote class="text-sm text-gray-600 leading-relaxed italic flex-grow mb-4">
                        "${t.description}"
                    </blockquote>

                    <div class="flex gap-1">
                        ${renderStars(t.rating)}
                    </div>
                </article>
            </li>
        `;
    };

    const renderSection = (containerId, role, label) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        const filtered = data.testimonials.filter(t => t.role === role);
        container.innerHTML = filtered.map(t => renderTestimonialCard(t, label)).join('');
    };

    // Render each section
    renderSection('students-container', 'student', 'STUDENT');
    renderSection('collaborators-container', 'collaborator', 'COLLABORATOR');
    renderSection('customers-container', 'customer', 'CUSTOMER');
});
