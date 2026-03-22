document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('testimonials-container');

    const renderStars = (rating) => {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += `
                <svg class="w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-200'} transition-transform hover:scale-125 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>`;
        }
        return stars;
    };

    container.innerHTML = data.testimonials.map(t => `
        <li>
            <article class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full relative overflow-hidden">
                <div class="absolute -right-4 -top-4 w-24 h-24 bg-[#b0101b]/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                
                <div class="flex items-center gap-4 mb-6 relative">
                    <div class="w-14 h-14 rounded-2xl overflow-hidden shadow-inner bg-gray-100 ring-2 ring-gray-50 group-hover:ring-[#b0101b]/20 transition-all">
                        <img src="https://picsum.photos/seed/${t.id + 50}/200" alt="${t.name}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
                    </div>
                    <div>
                        <h3 class="font-bold text-[#1a1a1a] group-hover:text-[#b0101b] transition-colors">${t.name}</h3>
                        <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">${t.role}</p>
                    </div>
                </div>

                <div class="flex gap-1 mb-6">
                    ${renderStars(t.rating)}
                </div>

                <blockquote class="text-sm text-gray-600 leading-relaxed italic flex-grow">
                    "${t.text}"
                </blockquote>

                <div class="mt-8 pt-6 border-t border-gray-50 flex justify-end">
                    <span class="text-[24px] text-gray-100 group-hover:text-[#b0101b]/20 transition-colors font-serif font-black">"</span>
                </div>
            </article>
        </li>
    `).join('');
});