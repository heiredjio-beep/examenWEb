# T.Ramarozaka - Portfolio Website

Personal portfolio website for Tokimahery Ramarozaka - Consultant, Teacher, Developer, and PhD Researcher.

## Features

- **Home** - Portfolio overview with about section, courses preview, and experience
- **Blog** - Articles on teaching, software engineering, and languages
- **Courses** - Online and offline courses catalog with filtering
- **Testimonials** - Feedback from students, collaborators, and customers
- **Research** - Academic publications and papers
- **Contact** - Contact form and information

## Tech Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Styling
- **Vanilla JavaScript** - Dynamic content rendering
- **Google Fonts** - Playfair Display & Inter

## Project Structure

```
blog/
├── index.html          # Homepage
├── blog.html           # Blog page
├── testimonial.html    # Testimonials page
├── courses.html        # Courses catalog
├── research.html       # Research papers
├── contact.html        # Contact page
├── tokimahery.data.js  # Central data store
├── home.js             # Homepage scripts
├── app.js              # Blog scripts
├── testimonial.js      # Testimonials scripts
├── courses.js          # Courses scripts
├── research.js         # Research scripts
├── tailwind.config.js  # Tailwind configuration
├── input.css           # Tailwind source CSS
└── dist/output.css     # Compiled CSS
```

## Development

```bash
# Install dependencies
npm install

# Watch for CSS changes
npm run dev

# Build CSS once
npx tailwindcss -i ./input.css -o ./dist/output.css
```

## Author

**Tokimahery Ramarozaka**
- Consultant · Teacher · Developer · Translator · PhD

## License

ISC
