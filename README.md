# WhatsApp Web Clone

A browser-based WhatsApp Web interface clone built from scratch with vanilla JavaScript, featuring real-time messaging, chat persistence, and a timed status story viewer.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Markup | HTML5 | Semantic structure with accessible ARIA labels on all interactive icons; enables native form validation on the message input |
| Styling | CSS3 (Flexbox/Grid) | Chose Flexbox over a library like Tailwind to build layout logic from scratch — the three-column sidebar-chatlist-interface grid and the message bubble alignment both required fine-grained control over shrink/grow behavior that a utility framework would have abstracted away |
| Logic | Vanilla JavaScript ES6+ (no framework) | Deliberately avoided React or Vue to demonstrate raw DOM manipulation proficiency. The chat list re-renders on every message send, and without a virtual DOM, the render pipeline had to be manually optimised by targeting only the `.chat-box-two` container for new messages instead of rebuilding the entire interface |
| Bundler | Parcel 2.16 | Zero-config setup with built-in CSS transpilation and automatic cache invalidation. Chose Parcel over Webpack because the project has no advanced code-splitting needs and Parcel's file-hashing for the `dist/` output simplified cache-busting without manual config |
| Icons | Ionicons 7 (CDN) | SVG-based icon library that mirrors WhatsApp's exact icon set (messages, status, communities, settings). Avoiding local SVGs reduced the bundle by ~40KB and the CDN delivers them pre-compressed |
| Persistence | Web localStorage API | A deliberate scoping decision — IndexedDB would have been overkill for ~16 chat records, and a backend database was outside the project's client-only scope. The `localStorage.setItem("chats", ...)` call runs synchronously after every message mutation to guarantee data integrity on tab close |
| Manifest | Web App Manifest | Enables "Add to Home Screen" on mobile browsers, with 192px and 512px favicon icons defined for the splash screen |

---

## Features

### Messaging

- **Bidirectional message display** — received messages render left-aligned in `.chat-box-one` (white background), sent messages render right-aligned in `.chat-box-two` (green background `#d8fdd2`), matching WhatsApp's bubble layout
- **Timestamped delivery receipts** — each sent message shows `HH:MM` alongside a double-checkmark icon that turns blue (`#007bfc`) when `seen: true`
- **Input-driven send/reveal UX** — the send button is `display: none` by default; it appears only when the message input is non-empty, and the microphone icon hides simultaneously. An `input` event listener toggles `hidden` classes on each keystroke
- **Optimistic local persistence** — messages are pushed to the in-memory `msgSent` array and flushed to `localStorage` in the same synchronous call, so a page refresh never loses the last sent message

### Chat List

- **Time-sorted ordering** — the 16 seed chats are sorted by `dayOfMessage + timeOfLastChatHour + timeOfLastChatMins + timeOfLastChatSec` using `Array.prototype.sort()` with ISO-string coercion. The sort runs on every message send so the most recent conversation always rises to the top
- **Unread badge system** — a green `#32a270` circle overlay on the sidebar messages icon displays the count of chats where `unread: true`. Clicking any chat sets `unread = false` and decrements the counter live
- **Dual filter mode** — the "All" and "Unread" state buttons toggle via `style.backgroundColor` swaps. The unread filter calls `Array.filter(d => d.unread === true)` then re-renders the full markup — no cached filtered list, which keeps the data source single and predictable
- **Real-time search** — a keyup listener on `.search-space` iterates all `.chat-list-link` elements and sets `display: none` on any whose `.person-name` does not include the query string (case-insensitive). No debouncing was added because the operation is O(n) DOM-display toggle with zero network cost

### Status Stories

- **Fullscreen story viewer** — clicking a status contact opens a full-viewport overlay (`z-index: 100000000`) with a frosted-glass backdrop (`backdrop-filter: blur(8px)`) that mirrors Instagram/WhatsApp stories
- **Timed auto-advance** — two progress bars (`fill1`, `fill2`) animate from 0% to 100% width via `setInterval` at 10ms intervals. After 3.09 seconds, the first image slides out (`transform: translate()`) and the second image slides in. The overlay background swaps to the active image's URL for the blur effect
- **Manual navigation** — chevron-left and chevron-right buttons manipulate a `dataset-id` counter; each press translates the current image by `70%` and hides the previous one by `translate(-140%)`
- **Reply input** — a dark semi-transparent input bar at the bottom of the viewer allows typing a reply (UI only — no reply-to-message backend)

### Search Bar Interaction

- **Focus animation** — on `focus`, the search bar border changes to `2px solid #1DAA61` (WhatsApp green) and the background turns white. On `blur`, both reset. This is handled by two `App` class methods bound in the constructor

### Chat Context Menu

- **Per-chat dropdown** — hovering a chat row reveals a chevron icon that triggers a 10-option dropdown menu (Archive, Mute, Pin, Mark Unread, Add to Favorites, Block, Delete). The menu is positioned dynamically: if there is less than 10px of space below the row, it renders above (`bottom: 100%`) instead of below
- **Click-outside dismiss** — a `document` click listener checks `event.target.closest(".dropdown-menu, .favorites-dropdown")` and hides all open menus if the click lands outside

### Architecture

```
whatsapp-clone-project/
├── index.html                  # Single-page entry with all layout + inline SVGs
├── manifest.webmanifest        # PWA manifest (icons only)
├── package.json                # Parcel dev server + build scripts
├── css/
│   ├── style.css               # 1394 lines — all component styles, animations
│   └── queries.css             # 3 responsive breakpoints (1100px, 834px, 968px)
├── js/
│   ├── controller.js           # Entry point — initialises app, wires DOM events
│   ├── view.js                 # 3 classes (App, ChatList, AddChats) — DOM rendering
│   ├── model.js                # Seed data — 16 chat objects with timestamps
│   ├── status.js               # Status viewer — progress bars, image navigation
│   └── statusData.js           # Status seed data — 1 my-status + 3 contacts
├── img/
│   ├── profilepic-removebg-preview.png
│   ├── Status Images/          # 5 JPGs used as status content
│   └── favicon-*.png
├── assets/                     # README screenshots
├── .parcel-cache/              # Build cache (gitignored)
└── dist/                       # Parcel build output (gitignored)
```

### Key Design Decisions

**1. Vanilla MVC over a framework (React / Vue)**

The decision to use plain JavaScript with a hand-rolled MVC pattern was intentional. A framework would have provided reactive re-renders out of the box, but it would also have abstracted away the DOM reconciliation logic that this project was built to practice. The tradeoff is visible in `view.js`: the `renderChatsOnInterface` method manually tears down and rebuilds the chat interface markup with `innerHTML = ""` followed by `insertAdjacentHTML`, which causes a layout thrash on every click. In production, a virtual DOM diff would skip unchanged nodes. However, for a project of this scale (16 chats, single-user), the naive approach keeps the codebase dependency-free and the mental model linear — there is no JSX compilation step, no hook rules, and no effect cleanup to debug.

**2. localStorage over IndexedDB or a backend API**

All chat data lives in `localStorage` under the `"chats"` key. This means the entire dataset (~8 KB for 16 conversations) is parsed from JSON on every page load and re-stringified on every message send. IndexedDB would have been more appropriate for a write-heavy app, and a REST API would have enabled multi-device sync. The tradeoff was accepted because the project scope is single-session, single-user: `localStorage` offers synchronous reads/writes with zero network latency, zero server cost, and zero CORS configuration. The startup performance cost (parsing 16 objects) is imperceptible at ~2ms.

**3. Inline SVGs over an icon font or sprite sheet**

Every icon in the UI (messages, status, communities, settings, send button, attachment, emoji, microphone, etc.) is inlined as raw `<svg>` markup directly in `index.html` or generated via JavaScript template literals. This adds approximately 30 KB of uncompressed HTML to the initial payload. An icon sprite sheet or a library like Font Awesome would have reduced page weight. The decision was made for two reasons: (a) each icon needed custom colour control — the message icon border, the checkmark, and the status icon all use different `fill` values that change on interaction, and (b) Ionicons' CDN was already being loaded, so the inlined SVGs are guaranteed to render without a FOUC while the icon font downloads. The tradeoff is acceptable because the page is a single HTML file served over HTTP/2, where multiple small SVG paths compress efficiently.

**4. Circular module dependency between controller and view**

`controller.js` imports `renderSendButton` and `storedChatsInfo` from `view.js`, while `view.js` imports `initializeApp`, `storedChatsInfo`, and `renderSendButton` from `controller.js`. This creates a circular dependency that works in ES modules only because the browser hoists imports before executing bodies. The cleaner approach would have been an EventEmitter pattern or a shared state module that both files import. The circular dependency was left in place to avoid a larger refactor of the message-send callback chain, which threads data through three layers (controller -> view -> controller) every time a user presses send. This is the single design smell in the project and would be the first thing refactored in a follow-up.

---

## Getting Started

### Prerequisites

- Node.js 18+ (tested with 18.x and 20.x)
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/ProsperOjonimi/WhatsApp-Clone-Project.git

# Navigate into the project directory
cd WhatsApp-Clone-Project

# Install dependencies (Parcel bundler)
npm install

# Start the development server with hot reload
npm start
```

The dev server runs at `http://localhost:1234` by default.

### Build for Production

```bash
npm run build
```

Output is written to the `dist/` directory with content-hashed filenames for cache busting.

### Environment Variables

This project has no server-side component and does not require any environment variables. All runtime configuration is hardcoded in the seed data files.

### Data Schema

The application state is a flat array of chat objects serialised to `localStorage["chats"]`:

```sql
CREATE TABLE chats (
    id            INTEGER PRIMARY KEY,
    chatName      TEXT NOT NULL,
    msgSent       TEXT[]    -- array of message strings sent by the user
    msgRecieved   TEXT[]    -- array of message strings received from the contact
    chatTime      JSON[]    -- array of { dayOfMessage, timeOfLastChatHour, timeOfLastChatMins, timeOfLastChatSec }
    seen          BOOLEAN   -- whether the user has viewed sent messages in this chat
    unread        BOOLEAN   -- whether the chat contains unread received messages
);

-- Example row:
-- id: 0
-- chatName: "Stephanie🌹"
-- msgSent: []
-- msgRecieved: ["Heyy"]
-- chatTime: [{ "dayOfMessage": "2025-10-10", "timeOfLastChatHour": 17, "timeOfLastChatMins": 0, "timeOfLastChatSec": 16 }]
-- seen: false
-- unread: true
```

The `statusData` and `myStatus` arrays are read-only and not persisted to localStorage.

---

## What I Learned

- **Manual DOM diffing without a virtual DOM** — rendering sent messages by appending to `.chat-box-two` via `insertAdjacentHTML("beforeend", ...)` while conditionally rebuilding the full chat interface only when the received/sent message ratio changes. This required tracking which branch of three possible states (received-only, sent-only, both) was active and avoiding unnecessary `innerHTML` clears that would blow away scroll position.

- **Progress bar animation with `setInterval` and `clearInterval` coordination** — the two status progress bars run in sequence, and the second bar's interval starts from inside the first bar's `setTimeout` callback. This required careful closure scoping to avoid stale references to the `fill1` and `fill2` DOM elements, and a hardcoded timing budget (3.09 seconds per image) that had to stay in sync with the CSS `transition` duration.

- **Dynamic dropdown positioning based on available viewport space** — the favorites dropdown measures `chatListRect.bottom - dropdownMenuRect.bottom` at render time. If fewer than 10px remain below, the menu flips to render above the trigger element (`bottom: 100%`). This avoids the common bug where a long menu overflows the viewport bottom and gets clipped by `overflow: hidden`.

- **Circular dependency management in ES modules** — discovered that `controller.js` and `view.js` import from each other, which works in browsers due to hoisted module evaluation but creates a fragile ordering constraint. Learned that extracting shared state into a dedicated module (or using a publish-subscribe pattern) would eliminate the cycle and make the data flow unidirectional.

- **localStorage as a synchronous single-source-of-truth** — every mutation (message send, unread toggle) writes to `localStorage` immediately via `JSON.stringify`, then the UI re-renders from the same serialised data. This guarantees that a crash between mutation and render never produces a stale UI, but it also means the render pipeline cannot batch writes — a future optimisation would coalesce multiple state changes into a single write.

- **CSS Grid three-column layout with dynamic third column** — the main container uses `grid-template-columns: 6rem 48rem 1fr`, where the third column is either the chat interface, the blank landing screen, or the status page. Toggling between these panels required managing `display: none/flex` across three sibling elements while keeping the grid geometry stable, which was harder than a route-based approach would have been.

---

## Roadmap

- [ ] Extract shared state into a standalone store module to break the circular dependency between `controller.js` and `view.js`
- [ ] Implement a dark mode toggle (the implementation is already outlined in commented-out code at `view.js:1017-1126`)
- [ ] Add IndexedDB persistence layer for write-heavy scenarios and larger datasets
- [ ] Build a Node.js + WebSocket backend for real-time multi-user messaging
- [ ] Add emoji picker integration (native `input[type="text"]` does not support rich pickers)
- [ ] Implement message reply threading (the reply input in the status viewer is UI-only)
- [ ] Convert to a React 19 + TanStack React Query 5 architecture with optimistic updates and stale-while-revalidate caching
