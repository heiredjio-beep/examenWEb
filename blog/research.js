const formatDate = (dateObj) => {
    const date = new Date(dateObj);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
};

const renderPapers = () => {
    const container = document.getElementById('papers-container');
    container.innerHTML = '';

    data.papers.forEach(paper => {
        const tags = (paper.tags || []).map(tag =>
            `<span class="bg-tagBlue/10 text-tagBlue text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">${tag}</span>`
        ).join('');

        const authors = paper.authors.join(', ');

        const card = document.createElement('li');
        card.className = 'bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300';
        card.innerHTML = `
            <article>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${tags}
                </div>

                <h2 class="text-xl font-serif font-bold text-textDark mb-3 hover:text-brandRed transition-colors">
                    <a href="${paper.url}" target="_blank" rel="noopener noreferrer">${paper.title}</a>
                </h2>

                <p class="text-sm text-textMuted mb-4 leading-relaxed">${paper.abstract}</p>

                <div class="flex flex-col gap-2 text-xs text-gray-500 mb-6">
                    <p><span class="font-semibold">Authors:</span> ${authors}</p>
                    <p><span class="font-semibold">Published:</span> ${formatDate(paper.publishedDate)} — ${paper.journal}</p>
                </div>

                <div class="flex gap-4">
                    <a href="${paper.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-brandRed text-xs font-bold uppercase tracking-wider hover:underline">
                        View Paper
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                    ${paper.pdfUrl ? `
                    <a href="${paper.pdfUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-textDark text-xs font-bold uppercase tracking-wider hover:text-brandRed transition-colors">
                        Download PDF
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </a>
                    ` : ''}
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
    renderPapers();
});
