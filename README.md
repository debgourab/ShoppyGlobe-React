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

`https://dummyjson.com/products`

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
