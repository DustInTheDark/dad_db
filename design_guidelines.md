# Design Guidelines: Dad_DB Construction Platform

## Design Approach

**Selected Framework:** Material Design + Modern SaaS Dashboard Hybrid  
**Rationale:** This utility-focused construction management platform requires clear data presentation, robust forms, and mobile-friendly touch targets. Material Design provides proven patterns for data-dense interfaces, while modern SaaS aesthetics (Linear, Notion) ensure a professional, trustworthy appearance suitable for the construction industry.

**Core Principles:**
- Clarity over decoration - workers need quick, error-free interactions
- Touch-friendly for field workers on mobile devices
- Data density for admin with excellent scanability
- Professional, industrial aesthetic reflecting construction context

---

## Typography System

**Font Families:**
- **Primary:** Inter (Google Fonts) - Clean, highly legible for UI and data
- **Monospace:** JetBrains Mono - For timestamps, coordinates, numerical data

**Hierarchy:**
- **Page Titles:** text-3xl/4xl, font-bold (Admin Dashboard, Worker Profile)
- **Section Headers:** text-xl/2xl, font-semibold (Projects, Attendance Records)
- **Card Titles:** text-lg, font-medium
- **Body Text:** text-base, font-normal
- **Labels/Meta:** text-sm, font-medium
- **Data Tables:** text-sm, font-normal
- **Timestamps/Codes:** text-xs, font-mono

---

## Layout System

**Spacing Primitives:** Use Tailwind units of **2, 4, 6, 8, 12, 16**
- `p-4, p-6, p-8` for card/section padding
- `gap-4, gap-6` for grid/flex spacing
- `space-y-6, space-y-8` for vertical stacking
- `mb-2, mb-4` for form field spacing

**Container Strategy:**
- **Admin Dashboard:** `max-w-7xl mx-auto px-6` - wide for data tables
- **Worker Dashboard:** `max-w-4xl mx-auto px-4` - focused, mobile-friendly
- **Forms:** `max-w-2xl` - optimal reading/interaction width

---

## Component Library

### Authentication
**Login Page:**
- Centered card layout (`max-w-md mx-auto mt-20`)
- Logo/company name at top
- Large form inputs (`h-12`) with clear labels
- Prominent "Sign In" button (`h-12 w-full text-lg`)
- Professional construction imagery in background (faded, with overlay)

### Navigation
**Admin Sidebar:**
- Fixed left sidebar (`w-64`) on desktop, collapsible on mobile
- Navigation items with icons (workers, projects, attendance, reports)
- Active state indication
- User profile/logout at bottom

**Worker Top Bar:**
- Simple horizontal bar with logo, user name, logout
- Mobile-optimized, minimal chrome

### Dashboard Cards
**Worker Clock In/Out Card:**
- Large card (`p-8 rounded-lg shadow-lg`)
- Prominent status indicator (Clocked In/Out)
- Big, touch-friendly action button (`h-16 text-xl rounded-full`)
- Current project information
- GPS status indicator (within range / outside range)
- Visual feedback during location check (loading state)

**Admin Overview Cards:**
- Grid layout: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`
- Stat cards showing: Active Workers, Active Projects, Today's Attendance, Total Hours
- Large numbers (`text-4xl font-bold`), small labels (`text-sm text-muted`)

### Data Tables
**Admin Worker/Project Tables:**
- Striped rows for scanability
- Sticky header on scroll
- Action buttons (Edit, Delete) as icon buttons
- Mobile: Stack as cards instead of table
- Sortable columns with indicators
- Pagination controls at bottom

**Attendance Records:**
- Columns: Worker, Project, Clock In, Clock Out, Duration, GPS Location
- Status badges (Active, Completed)
- Expandable rows for GPS coordinates/details

### Forms
**Add/Edit Worker Form:**
- Vertical form layout with clear sections
- Input fields: `h-11 rounded-md` with `mb-4` spacing
- Labels above inputs: `text-sm font-medium mb-2`
- Required field indicators
- Submit button: `h-11 w-full md:w-auto px-8`

**Project Form:**
- Similar structure to worker form
- GPS coordinate inputs with validation
- Site radius slider with visual preview
- Map integration placeholder for coordinate selection

### Status Indicators
**Clock Status Badge:**
- Large pill badge for worker dashboard (`px-6 py-3 rounded-full text-lg`)
- Distinct states: Clocked In (green accent), Clocked Out (gray)

**GPS Proximity:**
- Icon + text indicator
- Within range: Success state
- Outside range: Warning state with distance information

**Worker Active Status:**
- Small pill badges in tables (`px-3 py-1 rounded-full text-xs`)

### Modals/Overlays
**Confirmation Dialogs:**
- Centered modal (`max-w-md`) with backdrop blur
- Clear title, description, action buttons
- Used for: Delete worker, Delete project, Clock out confirmation

**GPS Permission Prompt:**
- Informative modal explaining why GPS is needed
- "Allow Location" primary action

---

## Page Layouts

### Login Page
- Full viewport height with centered content
- Construction site background image (blurred, dark overlay)
- Login card with logo, form, and submit button
- Minimal, focused design

### Worker Dashboard
- Top navigation bar
- Large clock in/out card (hero section)
- Current project details card
- Attendance history table (last 10 entries)
- Mobile-first, stack vertically

### Admin Dashboard
- Sidebar navigation (desktop) / hamburger menu (mobile)
- Overview stats grid (4 cards)
- Quick action buttons (Add Worker, Add Project)
- Recent activity feed
- Data tables for workers and projects (tabbed interface)

### Admin Worker Management
- Data table with: Name, Hourly Rate, Active Status, Actions
- "Add Worker" button (top-right)
- Search/filter controls above table
- Edit modal or inline editing

### Admin Project Management
- Similar table structure
- Columns: Name, Address, Coordinates, Radius, Active Workers
- Map preview for project locations

### Admin Attendance View
- Filterable table (by worker, project, date range)
- Export/download options
- Summary statistics at top

---

## Interaction Patterns

**Clock In/Out Flow:**
1. Large button prompts for location
2. Loading state with spinner
3. GPS validation feedback (success/error)
4. Confirmation modal on success
5. Dashboard updates with new status

**Admin CRUD Operations:**
1. Table row hover reveals action buttons
2. Edit opens modal/inline form
3. Delete shows confirmation dialog
4. Success notification on completion

---

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px (stack everything, full-width cards)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (full layouts, sidebars, multi-column)

**Mobile Optimizations:**
- Touch targets minimum `h-12`
- Sticky headers on tables
- Collapsible sidebar for admin
- Card-based views instead of tables

---

## Images

**Login Page Background:**
- Large construction site image (crane, building under construction, or workers on site)
- Apply dark overlay (opacity 60-70%) for text readability
- Place login card with backdrop blur effect over image

**Admin Dashboard (Optional):**
- Small construction-themed illustration/icon for empty states
- Company logo in navigation

**Worker Dashboard:**
- No hero image needed - focus on functionality
- GPS/location icon for status indicators

---

## Key UX Considerations

- **GPS Feedback:** Immediate, clear messaging when location is checked
- **Loading States:** All async operations show spinners/skeletons
- **Error Handling:** Friendly error messages with recovery actions
- **Accessibility:** ARIA labels, keyboard navigation, focus indicators
- **Mobile Touch:** Large buttons, swipe gestures for table rows
- **Data Visualization:** Consider charts for attendance trends (future enhancement)