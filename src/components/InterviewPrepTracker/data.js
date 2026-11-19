const topic = (name, theory = [], practical = []) => ({
  name,
  groups: [
    { name: "Theory", items: theory.map((text) => ({ text, kind: "Theory" })) },
    { name: "Practical", items: practical.map((text) => ({ text, kind: "Practical" })) }
  ].filter(g => g.items.length)
});

export const curriculum = [
topic("HTML", [
"What is HTML and what changed in HTML5?","What are semantic elements?","div vs section vs article vs main?",
"Block vs inline vs inline-block?","id vs class?","What are data attributes?","What is the DOM and how does it differ from BOM?",
"What are meta tags?","Why use the viewport meta tag?","async vs defer?","GET vs POST?","What is accessibility?",
"What is ARIA?","localStorage vs sessionStorage?","What are cookies?","What is an iframe?","What is lazy loading?"
], [
"Create a registration form with validation.","Build a responsive navigation bar.","Create a semantic page layout.",
"Build an accessible form with labels.","Implement image lazy loading.","Create a multi-step form.","Build a responsive landing page."
]),
topic("CSS", [
"Explain the CSS box model.","Explain specificity and the cascade.","Margin vs padding?",
"display:none vs visibility:hidden?","relative vs absolute vs fixed vs sticky?","Explain Flexbox.","Explain CSS Grid.",
"Flexbox vs Grid?","Pseudo-class vs pseudo-element?","em vs rem vs % vs vh vs vw?","What is z-index and stacking context?",
"What is inheritance?","What are media queries?","What is mobile-first design?","Transition vs animation?",
"What are CSS variables?","What is BEM?","SCSS vs CSS?","What is Tailwind CSS?","How do you optimize CSS?"
], [
"Build a responsive navbar.","Create a dashboard using Grid.","Build responsive cards.","Create a modal and dropdown.",
"Build an accordion and tooltip.","Create a responsive pricing section.","Build a skeleton loading animation.",
"Recreate a design from a screenshot or Figma."
]),
topic("JavaScript", [
"var vs let vs const?","Primitive vs reference types?","== vs ===?","What is type coercion?","What is hoisting?",
"Explain scope and lexical scope.","What is a closure?","How does this work?","Arrow vs regular functions?",
"What are callbacks and higher-order functions?","What is a pure function?","What is an IIFE?","What is recursion?",
"Explain destructuring, spread, and rest.","What is the event loop?","What are the call stack, microtasks, and macrotasks?",
"Synchronous vs asynchronous JavaScript?","What are Promise states?","Promise.all vs allSettled vs race vs any?",
"How does async/await work?","What is prototypal inheritance?","Shallow copy vs deep copy?",
"Optional chaining vs nullish coalescing?","null vs undefined?","Debouncing vs throttling?","Event bubbling vs capturing?",
"What is event delegation?","What is currying?","What is memoization?","What are generators and iterators?",
"map vs filter vs reduce?","forEach vs map?","CommonJS vs ES modules?","What is strict mode?"
], [
"Reverse a string.","Check for a palindrome.","Find largest and second-largest array values.","Remove duplicates.",
"Count character frequency.","Check whether strings are anagrams.","Find a missing number.","Flatten a nested array.",
"Sort an array without sort().","Find common array elements.","Implement factorial and Fibonacci.","Implement debounce and throttle.",
"Implement custom map, filter, and reduce.","Deep-clone an object.","Group objects by a property.","Find first non-repeating character.",
"Write Promise-based delay.","Predict output for hoisting, closures, promises, timers, and this."
]),
topic("React.js", [
"What is React and why use it?","What is JSX?","What is the Virtual DOM?","How does reconciliation work?",
"What is Fiber?","Functional vs class components?","Props vs state?","What is prop drilling?",
"What is Context API?","Explain useState, useEffect, useRef, useMemo, useCallback, and useReducer.",
"What are custom hooks?","Controlled vs uncontrolled components?","Why are keys important?",
"Why avoid array indexes as keys?","What is lazy loading and Suspense?","What are error boundaries?",
"What is React.memo?","What causes re-renders?","How do you optimize React performance?",
"What is code splitting?","What is hydration?","SSR vs CSR?","useEffect vs useLayoutEffect?",
"What is batching?","What is StrictMode?"
], [
"Build a counter and todo app.","Create search and filtering.","Implement pagination and infinite scroll.",
"Build reusable modal, dropdown, tabs, and accordion components.","Create a validated multi-step form.",
"Fetch and display API data.","Implement debounced search.","Create protected routes.",
"Build authentication UI.","Create a shopping cart.","Write a custom hook.","Use Context API and Redux Toolkit.",
"Fix unnecessary component re-renders."
]),
topic("React Query / TanStack Query", [
"What is TanStack Query?","What is server state vs client state?","What is useQuery?",
"What is useMutation?","What are queryKey and queryFn?","What are staleTime and gcTime?",
"What is cache invalidation?","What is background refetching?","What are optimistic updates?",
"What is prefetching?","How do retry and retryDelay work?","What does enabled do?",
"placeholderData vs initialData?","isLoading vs isFetching?","How do you handle query errors?"
], [
"Fetch a list with useQuery.","Implement search and pagination.","Implement infinite scrolling.",
"Create and update records with useMutation.","Implement optimistic updates.","Invalidate relevant queries after mutation.",
"Create dependent queries.","Add retry and error handling."
]),
topic("Redux Toolkit", [
"What is Redux and Redux Toolkit?","What are store, action, reducer, and dispatch?",
"What do useSelector and useDispatch do?","What are createSlice and configureStore?",
"What is createAsyncThunk?","What is middleware?","What is Redux DevTools?",
"Redux vs Context API?","Redux vs React Query?","What is RTK Query?"
], [
"Build a counter slice.","Build a shopping cart.","Manage authentication state.","Fetch data with createAsyncThunk.",
"Handle loading and error states.","Persist selected state across refreshes."
]),
topic("Node.js & Express", [
"What is Node.js?","Is Node.js single-threaded?","What is V8?","Explain the Node event loop and libuv.",
"What are modules?","CommonJS vs ES modules?","What are npm and package-lock.json?",
"dependencies vs devDependencies?","What is Express middleware?","What is routing?",
"What is REST?","Explain HTTP methods and status codes.","What is CORS?","Authentication vs authorization?",
"What is JWT?","What is bcrypt and password hashing?","What are environment variables?",
"What are EventEmitter, streams, and buffers?","What are clustering and worker_threads?",
"How do you handle errors centrally?","What is rate limiting?","What is API versioning?",
"What is Multer?","How do you secure an Express API?"
], [
"Build REST CRUD APIs.","Implement registration and JWT login.","Create role-based authorization middleware.",
"Build centralized error handling.","Add pagination, search, filtering, and sorting.",
"Upload files with Multer.","Hash passwords with bcrypt.","Implement refresh tokens.",
"Add rate limiting and request validation.","Connect to MongoDB and PostgreSQL.","Add logging and caching."
]),
topic("MongoDB & Mongoose", [
"What is MongoDB and NoSQL?","SQL vs NoSQL?","What are documents, collections, BSON, and ObjectId?",
"What is schema design?","Embedding vs referencing?","What are single-field, compound, and unique indexes?",
"What is an aggregation pipeline?","Explain $match, $group, $lookup, $project, $unwind, $sort, and $limit.",
"What are transactions, replication, and sharding?","What is MongoDB Atlas?","What are Mongoose schemas and models?",
"What are Mongoose hooks and populate?"
], [
"Insert, update, and delete documents.","Query with multiple conditions.","Implement pagination and search.",
"Write aggregation pipelines.","Join collections using $lookup.","Find duplicate records.",
"Create indexes.","Design users and orders collections.","Use transactions and Mongoose populate.",
"Implement soft delete."
]),
topic("PostgreSQL & SQL", [
"What is PostgreSQL and an RDBMS?","Primary key vs foreign key?","What are constraints?",
"What is normalization? Explain 1NF, 2NF, and 3NF.","What is denormalization?",
"What are indexes and composite indexes?","Explain INNER, LEFT, RIGHT, FULL, and self joins.",
"What is a subquery?","What is a CTE?","What are window functions?",
"GROUP BY vs ORDER BY?","WHERE vs HAVING?","Explain ACID and transactions.",
"What is MVCC?","How do EXPLAIN and EXPLAIN ANALYZE help?","What are triggers and stored procedures?",
"What is JSONB?","View vs materialized view?","What is connection pooling?","What is a deadlock?"
], [
"Create employee and department tables.","Find second- and third-highest salaries.",
"Find duplicate records.","Find employees earning more than their managers.",
"Find highest salary per department.","Write joins and anti-join queries.",
"Use GROUP BY and HAVING.","Write CTE queries.","Use ROW_NUMBER, RANK, and DENSE_RANK.",
"Paginate with LIMIT and OFFSET.","Optimize a slow query.","Create indexes and transactions.",
"Design an e-commerce schema."
]),
topic("GraphQL", [
"What is GraphQL?","REST vs GraphQL?","What are schema, types, query, mutation, and subscription?",
"What is a resolver?","What are Apollo Client and Apollo Server?","What are arguments and variables?",
"What are fragments and directives?","What is introspection?","What is the N+1 problem?",
"How does DataLoader help?","How do you implement authentication?"
], [
"Create a GraphQL server and user schema.","Build list and detail queries.","Create, update, and delete mutations.",
"Connect GraphQL to MongoDB or PostgreSQL.","Add authentication and pagination.",
"Consume GraphQL from React using Apollo Client."
]),
topic("TypeScript", [
"What are types and interfaces?","Type vs interface?","What are unions and intersections?",
"What are generics?","What are enums?","What are utility types such as Partial, Pick, Omit, and Record?",
"What is type narrowing?","What are unknown and never?","How do you type React props and events?"
], [
"Convert a JavaScript utility to TypeScript.","Type a reusable React component.","Create generic API response types.",
"Type a custom hook.","Model backend request and response DTOs."
]),
topic("Git, APIs & Web Fundamentals", [
"Explain commit, branch, merge, rebase, cherry-pick, and stash.","How do you resolve merge conflicts?",
"What is a pull request?","Explain REST constraints.","What are HTTP headers and status codes?",
"What is HTTPS and TLS?","What are cookies and caching headers?","What is CORS preflight?",
"What is API versioning?","What is idempotency?"
], [
"Create a feature branch and pull request.","Resolve a merge conflict.","Design CRUD API endpoints.",
"Implement pagination, filtering, sorting, and consistent error responses."
]),
topic("Testing, DevOps & Security", [
"What are unit, integration, and end-to-end tests?","Jest vs Vitest?","What is React Testing Library?",
"What is Supertest?","What are Docker images and containers?","What is Docker Compose?",
"What is CI/CD?","What is Redis and what is TTL?","What are XSS, CSRF, SQL injection, and NoSQL injection?",
"What are CSP, Helmet, and rate limiting?","What is least privilege?"
], [
"Write tests for a React component.","Test an Express endpoint with Supertest.",
"Create a Dockerfile and Compose setup.","Add a CI workflow to run tests.",
"Add input validation and security headers.","Add caching for a frequently requested endpoint."
]),
topic("System Design & DSA", [
"What is time and space complexity?","Array vs linked list?","Stack vs queue?",
"What are hash maps and sets?","What are trees and graphs?","What is BFS vs DFS?",
"What is caching?","What is horizontal vs vertical scaling?","What is load balancing?",
"What is database indexing?","What is eventual consistency?","What is a message queue?"
], [
"Implement binary search.","Solve two-sum and sliding-window problems.","Reverse a linked list.",
"Validate balanced parentheses.","Traverse a tree using BFS and DFS.",
"Design a URL shortener.","Design a notification service.","Design a scalable paginated API."
])
];

export const extraGroups = [
{ name: "Full-stack projects", items: [
"Admin dashboard: React, Node.js, PostgreSQL, auth, CRUD, charts, filtering, pagination.",
"E-commerce app: React Query, Node.js, MongoDB, catalog, cart, checkout, orders.",
"Task manager: React, Redux Toolkit, PostgreSQL, drag-and-drop, roles and permissions.",
"Real-time chat: React, Node.js, Socket.IO, MongoDB, online status.",
"Employee management: React, Node.js, PostgreSQL, departments, reports and exports."
]},
{ name: "Real-world scenarios", items: [
"Optimize a slow React application.","Handle 100,000 rows in a table.","Prevent unnecessary API calls.",
"Coordinate multiple API requests.","Implement token refresh and expired-token handling.",
"Secure a REST API and design scalable authentication.","Optimize slow MongoDB and PostgreSQL queries.",
"Paginate millions of records efficiently.","Prevent duplicate form submissions.","Handle API failures and retries.",
"Implement caching and concurrent update handling.","Manage large file uploads.","Prevent XSS and CSRF.",
"Design reusable component architecture.","Explain global state vs server state.","Deploy a full-stack application."
]},
{ name: "Machine coding rounds", items: [
"Todo CRUD app (Easy).","Debounced search (Easy).","Counter with history (Easy).",
"Pagination component (Medium).","Infinite scrolling (Medium).","Reusable modal (Medium).",
"Multi-step form (Medium).","Dynamic form builder (Hard).","Shopping cart (Medium).",
"Nested comments system (Hard).","File upload with progress (Medium).","Kanban board (Hard).",
"Role-based authentication (Hard).","Sortable/filterable data table (Medium).","Real-time chat (Hard)."
]},
{ name: "HR and project discussion", items: [
"Tell me about yourself.","Explain your current project architecture.","Describe your day-to-day responsibilities.",
"What was your most challenging task?","How do you debug production issues?","How do you optimize performance?",
"How do you handle tight deadlines?","How do you collaborate with backend developers?",
"Explain a difficult bug you resolved.","Why are you looking for a job change?","Why should we hire you?",
"What are your strengths and weaknesses?","Explain how you integrate APIs.","How do you manage Git branches?",
"Explain a feature you developed end-to-end."
]}
];

export const allSections = [
  ...curriculum.map(t => ({ name: t.name, groups: t.groups })),
  ...extraGroups.map(g => ({ name: g.name, groups: [{ name: "Checklist", items: g.items.map(text => ({ text, kind: "Task" })) }] }))
];
