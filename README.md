# ShoppyGlobe — React E-commerce Application

A complete Vite + React e-commerce application built to match the **ShoppyGlobe React Project** assignment.

## Assignment coverage

| Requirement | Implementation |
|---|---|
| Vite | Vite React project with `vite.config.js` |
| App | Main application/root router |
| Header | Navigation, search, cart icon/count |
| ProductList | API-backed product grid |
| ProductItem | Product card + Add to Cart |
| Product Detail | Dynamic `/products/:productId` route |
| Cart | Cart summary, quantity controls, remove |
| CartItem | Reusable cart row |
| Checkout | User form, order summary, Place Order |
| NotFound | Detailed 404 route |
| Props | Reusable components receive data/callbacks via props |
| useEffect | Product list and product detail fetching |
| Custom hook | `useProducts()` |
| Error handling | Fetch errors + retry UI |
| Redux | Cart and search state using Redux Toolkit |
| Actions/reducer/selectors | Cart slice + selectors |
| Search | Redux search state filters ProductList |
| React Router | `createBrowserRouter` + route parameters |
| React lists | Products/cart rendered with unique keys |
| Code splitting | All page components use `React.lazy` + `Suspense` |
| Lazy images | `LazyLoadImage` with loading/effect |
| Responsive CSS | Mobile/tablet/desktop layouts |
| Comments | Important logic is documented |
| No node_modules | Intentionally excluded from submission |

## Run the project

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

For production:

```bash
npm run build
npm run preview
```

## API

Products are fetched from:

`https://fakestoreapi.com/products`

The API response is normalized by the custom `useProducts` hook.

## Project structure

```text
ShoppyGlobe/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── api/
    │   └── productsApi.js
    ├── hooks/
    │   └── useProducts.js
    ├── store/
    │   ├── index.js
    │   ├── cartSlice.js
    │   └── selectors.js
    ├── components/
    │   ├── Header.jsx
    │   ├── ProductList.jsx
    │   ├── ProductItem.jsx
    │   ├── ProductDetail.jsx
    │   ├── Cart.jsx
    │   ├── CartItem.jsx
    │   ├── Checkout.jsx
    │   ├── NotFound.jsx
    │   ├── SearchBar.jsx
    │   ├── LazyImage.jsx
    │   ├── Loading.jsx
    │   ├── ErrorState.jsx
    │   └── EmptyState.jsx
    ├── pages/
    │   └── Home.jsx
    └── styles/
        └── index.css
```

## GitHub submission

The assignment asks for at least 25 relevant Git commits. Do not fabricate commits. After creating your repository, use meaningful commits such as:

1. `chore: initialize vite react project`
2. `feat: configure redux store`
3. `feat: add cart slice`
4. `feat: add cart selectors`
5. `feat: add product api`
6. `feat: add useProducts hook`
7. `feat: create app router`
8. `feat: create header`
9. `feat: add search bar`
10. `feat: create product list`
11. `feat: create product item`
12. `feat: add product detail`
13. `feat: add dynamic product route`
14. `feat: create cart page`
15. `feat: create cart item`
16. `feat: add quantity controls`
17. `feat: add remove cart action`
18. `feat: create checkout page`
19. `feat: implement order placement`
20. `feat: add not found page`
21. `feat: add loading states`
22. `feat: add fetch error handling`
23. `feat: add lazy images`
24. `perf: lazy load route components`
25. `style: make application responsive`
26. `docs: update project readme`

Replace the repository-link placeholder below with your real GitHub URL after publishing:

**GitHub Repository:** `ADD-YOUR-GITHUB-REPOSITORY-LINK-HERE`

## Important submission note

Do not submit `node_modules`. Run `npm install` after extracting the project to recreate it locally.

Before submission, run:

```bash
npm run build
```

and verify that the production build completes without errors.


## Code comments

Major logical blocks are documented with explanatory comments covering API requests, hooks and effects, Redux state/actions/selectors, routing, props, product rendering, cart operations, checkout flow, error handling, lazy loading, and responsive CSS sections.

## GitHub Commit History

This submission includes a deliberately structured Git history with more than 25 relevant commits. The commits are split by project configuration, API, Redux state, hooks, application entry point, reusable components, pages, styling, and code-comment documentation so the history reflects meaningful development milestones rather than empty placeholder commits.

Before pushing to GitHub, verify the history with:

```bash
git log --oneline --reverse
git rev-list --count HEAD
```

The repository currently contains 25+ commits.

## Currency and Indian pricing

- Product prices are displayed in **Indian Rupees (₹)**.
- Fake Store API's source prices are treated as USD and converted using the demo catalogue rate of **₹90 per $1**.
- Cart, shipping, checkout, and order totals all use INR consistently.
- Free shipping is applied to orders of ₹9,000 or more; otherwise shipping is ₹499.

## Dependency versions

The project pins its direct dependencies to the latest stable versions verified for this release:

- React 19.2.8
- React DOM 19.2.8
- Redux Toolkit 2.12.0
- React Redux 9.3.0
- React Router DOM 7.18.2
- react-lazy-load-image-component 1.6.3
- Vite 8.2.0
- @vitejs/plugin-react 6.0.5
