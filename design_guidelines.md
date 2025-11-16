# Design Guidelines: Veterinary Animal Monitoring Platform

## Design Approach
**Selected Approach:** Design System - Professional Dashboard
**Justification:** This is a utility-focused, data-intensive health monitoring application where clarity, efficiency, and accuracy are paramount. Drawing inspiration from modern medical/veterinary software and enterprise dashboards with clean, professional aesthetics.

## Core Design Elements

### A. Typography
- **Primary Font:** Inter or Roboto via Google Fonts
- **Headings:** 
  - H1 (Dashboard title): text-2xl md:text-3xl, font-semibold
  - H2 (Section headers): text-xl md:text-2xl, font-medium
  - H3 (Card titles): text-lg, font-medium
- **Body Text:** text-base, regular weight for data display
- **Data Labels:** text-sm, font-medium for table headers and form labels
- **Metrics/Numbers:** text-lg md:text-xl, font-semibold for important health values

### B. Layout System
**Spacing Primitives:** Use Tailwind units of 2, 4, 6, and 8 for consistent rhythm
- Component padding: p-4 to p-6
- Section gaps: gap-4 to gap-6
- Container margins: m-4 to m-8
- Form field spacing: space-y-4

**Grid Structure:**
- Main container: max-w-7xl mx-auto px-4
- Dashboard cards: grid grid-cols-1 lg:grid-cols-3 gap-6
- Two-column forms: grid grid-cols-1 md:grid-cols-2 gap-4

### C. Component Library

**Navigation:**
- Top navigation bar with platform title and user actions
- Simple horizontal layout with logo/title left, actions right
- Height: h-16, padding: px-6

**Dashboard Cards:**
- Summary metric cards showing total animals, critical alerts, recent updates
- Each card: rounded-lg border with shadow-sm
- Padding: p-6
- Display large number (statistic) with label beneath

**Data Table (Primary Component):**
- Full-width responsive table with alternating row backgrounds
- Headers: sticky top positioning, font-medium, border-b-2
- Cells: p-4, align data appropriately (text left, numbers right)
- Row hover: subtle background change
- Health status indicators: color-coded badges for temperature/heart rate alerts
- Action column: icon buttons for edit/delete (use Heroicons)

**Forms:**
- Input fields with floating labels or top labels
- Field groups in 2-column grid on desktop, single column mobile
- Input styling: border rounded-md, focus ring, p-3
- Submit button: prominent, full-width on mobile
- Validation states: border colors for error/success

**Health Status Badges:**
- Small rounded pills showing status (Normal, Atenção, Crítico)
- Size: text-xs px-2 py-1 rounded-full
- Position: inline with health metrics

**Modal/Dialog:**
- Overlay for add/edit animal forms
- Centered, max-w-2xl, rounded-lg
- Close button top-right
- Form within modal body

**Empty States:**
- When no animals registered: centered message with illustration placeholder
- "Adicionar Primeiro Animal" call-to-action button

### D. Icon System
**Library:** Heroicons via CDN
**Usage:**
- Navigation actions: outline style, w-6 h-6
- Table actions: outline style, w-5 h-5
- Status indicators: solid style, w-4 h-4
- Form field icons: outline style, w-5 h-5

## Layout Specifications

**Main Dashboard View:**
- Header bar (h-16) with platform title "Monitoramento Veterinário"
- Below header: Summary cards row (3 cards: Total Animais, Alertas Críticos, Última Atualização)
- Main content: Data table section with "Lista de Animais" heading
- Floating action button or prominent "Adicionar Animal" button above table
- Table takes remaining vertical space

**Add/Edit Animal Form:**
- Modal overlay or dedicated form section
- Fields organized in logical groups:
  - Basic info: Nome, Espécie, Idade (2-column on desktop)
  - Health metrics: Temperatura, Frequência Cardíaca (2-column)
  - Activity status: dropdown or select field
- Submit and Cancel buttons at bottom (primary + secondary styling)

**Responsive Behavior:**
- Desktop (lg+): Full table with all columns visible, 3 summary cards
- Tablet (md): 2 summary cards stacked, table with horizontal scroll
- Mobile: Single column layout, summary cards stacked, simplified table view with expandable rows

## Professional Healthcare Aesthetics
- Clean, clinical appearance with ample whitespace
- Data legibility is priority: high contrast text, appropriate sizing
- Health alerts visually distinct but not alarming
- Professional tone: avoid playful elements, maintain medical credibility
- Consistent spacing creates calm, organized feeling
- Rounded corners (rounded-lg) for modern, approachable feel while maintaining professionalism

## Data Visualization Principles
- Numbers aligned right in tables for easy scanning
- Temperature and heart rate displayed with units (°C, bpm)
- Age shown clearly with "anos" label
- Activity status as readable text, not codes
- Sort indicators in table headers
- Search/filter functionality prominently placed above table

## Accessibility & Usability
- Clear focus states on all interactive elements
- Sufficient color contrast for text and backgrounds
- Keyboard navigation support for forms and tables
- Labels associated with all form inputs
- Error messages clear and actionable
- Confirmation dialogs for delete actions

**No animations** except subtle hover states and smooth modal appearances.