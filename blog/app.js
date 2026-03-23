// Application State
let currentPage = 1;
const postsPerPage = 5;

// Utilities
const formatDate = (dateObj) => {
    const date = new Date(dateObj);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

// Render Functions
const renderPosts = () => {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const currentPosts = data.posts.slice(start, end);

    currentPosts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-6 items-center border border-gray-100 group cursor-pointer';

        const tags = post.tags || [];
        const tagsHTML = tags.map(tag =>
            `<span class="bg-tagBlue text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full hover:bg-blue-600 transition-colors">${tag}</span>`
        ).join('');

        const thumbnailSrc = post.thumbnail || 'https://picsum.photos/400?random=' + post.id;

        article.innerHTML = `
            <div class="overflow-hidden rounded-xl shrink-0 w-full md:w-56 h-40">
                <img src="${thumbnailSrc}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>
            <div class="flex flex-col flex-grow w-full">
                <h2 class="text-xl font-medium text-brandRed group-hover:text-red-600 transition-colors mb-2">${post.title}</h2>
                <span class="text-[11px] font-semibold text-textDark mb-3">${formatDate(post.publishedDate || post.creationDate || new Date())}</span>
                <p class="text-sm text-textMuted mb-4 line-clamp-2 leading-relaxed">${post.abstract || post.description || ''}</p>
                <div class="flex flex-wrap gap-2 mt-auto">
                    ${tagsHTML}
                </div>
            </div>
        `;
        container.appendChild(article);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const renderPagination = () => {
    const container = document.getElementById('pagination-container');
    container.innerHTML = '';

    if (!data.posts || data.posts.length === 0) return;

    const totalPages = Math.ceil(data.posts.length / postsPerPage);

    const prevBtn = document.createElement('button');
    prevBtn.className = `px-4 py-2 text-sm font-medium rounded-full border border-gray-200 flex items-center gap-1 transition-all ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:border-brandRed hover:text-brandRed bg-white shadow-sm hover:shadow'}`;
    prevBtn.innerHTML = '← Prev';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => { if(currentPage > 1) { currentPage--; updateView(); } };
    container.appendChild(prevBtn);

    for(let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        const isActive = i === currentPage;
        pageBtn.className = `w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-brandRed text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-brandRed hover:text-brandRed hover:shadow'}`;
        pageBtn.innerText = i;
        pageBtn.onclick = () => { currentPage = i; updateView(); };
        container.appendChild(pageBtn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = `px-4 py-2 text-sm font-medium rounded-full border border-gray-200 flex items-center gap-1 transition-all ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:border-brandRed hover:text-brandRed bg-white shadow-sm hover:shadow'}`;
    nextBtn.innerHTML = 'Next →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => { if(currentPage < totalPages) { currentPage++; updateView(); } };
    container.appendChild(nextBtn);
};

const renderSidebar = () => {
    const container = document.getElementById('sidebar-container');
    container.innerHTML = '';

    const buildSection = (title, contentHTML) => {
        return `
            <div class="flex flex-col">
                <div class="flex items-center gap-4 mb-6">
                    <div class="h-[2px] w-6 bg-brandRed"></div>
                    <h3 class="uppercase tracking-widest text-[11px] font-bold text-gray-500">${title}</h3>
                </div>
                ${contentHTML}
            </div>
        `;
    };

    // Archives
    if (data.archives && data.archives.length > 0) {
        const archivesList = data.archives.map(arc => `
            <div class="flex justify-between items-center text-sm text-textMuted py-2 hover:text-brandRed cursor-pointer transition-colors border-b border-gray-100 last:border-0">
                <span>${arc.label}</span>
                <span class="text-xs text-gray-400 font-medium">${arc.count}</span>
            </div>
        `).join('');

        const archivesSection = document.createElement('div');
        archivesSection.className = 'bg-white p-6 rounded-2xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow';
        archivesSection.innerHTML = buildSection('Archives', archivesList);
        container.appendChild(archivesSection);
    }

    // Newsletter
    const newsletterContent = `
        <p class="text-sm text-textMuted mb-4">Get new articles straight to your inbox. No spam, ever.</p>
        <form class="flex flex-col gap-3" onsubmit="event.preventDefault()">
            <input type="email" placeholder="your@email.com" class="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brandRed/20 transition-all">
            <button type="submit" class="bg-brandRed text-white text-xs font-bold tracking-widest uppercase py-3 rounded-xl hover:bg-red-800 transition-colors shadow-md hover:shadow-lg">Subscribe</button>
        </form>
    `;
    const newsletterSection = document.createElement('div');
    newsletterSection.className = 'bg-white p-6 rounded-2xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow mt-2';
    newsletterSection.innerHTML = buildSection('Newsletter', newsletterContent);
    container.appendChild(newsletterSection);

    // YouTube Videos
    if (data.youtubeVideos && data.youtubeVideos.length > 0) {
        const ytList = data.youtubeVideos.map(vid => `
            <div class="relative group cursor-pointer overflow-hidden rounded-xl mb-4 last:mb-0 shadow-sm">
                <img src="https://img.youtube.com/vi/${vid.id}/mqdefault.jpg" alt="${vid.title}" class="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div class="bg-brandRed text-white p-3 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform">
                       <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"></path></svg>
                    </div>
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                    <p class="text-white text-xs font-medium truncate">${vid.title}</p>
                </div>
            </div>
        `).join('');

        const ytSection = document.createElement('div');
        ytSection.className = 'bg-white p-6 rounded-2xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow mt-2';
        ytSection.innerHTML = buildSection('On Youtube', ytList + `<a href="#" class="text-brandRed text-xs font-bold uppercase tracking-wide mt-4 inline-block hover:underline transition-all">View all videos →</a>`);
        container.appendChild(ytSection);
    }
};

const updateView = () => {
    renderPosts();
    renderPagination();
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    if (typeof data !== 'undefined') {
        updateView();
        renderSidebar();
    } else {
        console.error("Les données (data) n'ont pas été trouvées. Vérifie tes fichiers JS.");
    }
});
