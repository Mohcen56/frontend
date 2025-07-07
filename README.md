# Frontend Product Carousel

A modern React/Next.js frontend for browsing and filtering products with a carousel UI.

## Features

- **Product Carousel:** Browse products in a responsive Swiper carousel.
- **Filtering:** Filter products by price and popularity (rating).
- **Responsive Design:** Works great on desktop and mobile.
- **API Integration:** Fetches products from a backend API.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and set your API base URL:

   ```
   NEXT_PUBLIC_API_BASE=https://backend-fy02.onrender.com
   ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `components/` – React components (ProductCarousel, ProductCard, etc.)
- `pages/` or `app/` – Next.js pages and routing
- `.env.local` – Environment variables

## Customization

- **API Endpoint:** Change `NEXT_PUBLIC_API_BASE` in `.env.local` to point to your backend.
- **Styling:** Uses Tailwind CSS for easy customization.

## Troubleshooting

- **Hydration Errors:** If you see hydration mismatch errors, try disabling browser extensions like Grammarly or shopping helpers.
- **API Issues:** Ensure your backend is running and accessible at the URL in `.env.local`.



Made with ❤️ using React, Next.js,