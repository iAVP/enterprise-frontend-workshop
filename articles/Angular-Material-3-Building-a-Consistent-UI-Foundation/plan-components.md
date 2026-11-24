# UI Components Implementation Plan

Branch: `Angular-Material-3-Building-a-Consistent-UI-Foundation`

This document tracks the implementation status of UI components and related infrastructure. Update statuses as work progresses.

Status values:
- **Implemented**
- **Not implemented**

## 1. Universal UI Components

| # | Component | Purpose | Status |
|---:|---|---|---|
| 1 | Toolbar Section | Toolbar section container | Implemented |
| 2 | Toolbar Button Item | Button with text, icon, and styling variants | Implemented |
| 3 | Toolbar Text Item | Informational text with overflow and tooltip | Implemented |
| 4 | Toolbar Dropdown Item | Dropdown list | Implemented |
| 5 | Toolbar Date Range Item | Select a From / To date range | Implemented |
| 6 | Toolbar Year / Month Item | Select year and month | Implemented |
| 7 | Status Bar | Universal status bar | Not implemented |
| 8 | Status Bar Section | Status Bar section | Not implemented |
| 9 | Status Bar Item | Information item displayed in Status Bar | Not implemented |

## 2. Angular Material Components and Controls

These are functional UI elements required by the application. They are not automatically separate custom components in the shared UI library; custom wrappers should be created only when reuse or architecture justifies them.
| # | Component | Purpose | Status |
|---:|---|---|---|
| 10 | Button | Action buttons | Not implemented |
| 11 | Dropdown / Select | Select a value from a list | Implemented |
| 12 | Date Picker | Select a date from a calendar | Not implemented |
| 13 | Date Range Picker | Select start and end dates | Not implemented |
| 14 | Year Selector | Select a year | Not implemented |
| 15 | Month Selector | Select a month | Not implemented |
| 16 | Checkbox | Select or mark table rows | Not implemented |
| 17 | Menu | Contextual menus and action menus | Not implemented |
| 18 | Tooltip | Additional information on hover | Not implemented |
| 19 | Dialog | Dialog windows | Not implemented |
| 20 | Input | Input fields | Not implemented |
| 21 | Textarea | Multi-line text input | Not implemented |
| 22 | Tabs | Divide settings into tabs | Not implemented |
| 23 | Toggle / Theme Switch | Switch state or theme | Not implemented |
| 24 | Alert / Notification | Display errors and limit warnings | Not implemented |

## 3. Dashboard Components

| # | Component | Purpose | Status |
|---:|---|---|---|
| 25 | Page Header | Application page header | Not implemented |
| 26 | Language Selector | Switch EN / DE / RU | Not implemented |
| 27 | Theme Switcher | Light / Dark / System | Not implemented |
| 28 | Transaction Toolbar | Transaction table controls | Not implemented |
| 29 | Transaction Table | Transactions table | Not implemented |
| 30 | Table Header | Table header | Not implemented |
| 31 | Transaction Row | Transaction row | Not implemented |
| 32 | Transaction Selection | Mark transactions | Not implemented |
| 33 | Transaction Search | Search transactions | Not implemented |
| 34 | Transaction Sorting | Sort transactions | Not implemented |
| 35 | Transaction Type Filter | Income / Expense | Not implemented |
| 36 | Date Filter | Filter transactions by date range | Not implemented |
| 37 | Notes Filter | Filter transactions with notes | Not implemented |
| 38 | Table Settings Dialog | Table settings | Not implemented |
| 39 | Expense Settings | Expense-specific settings | Not implemented |
| 40 | Income Settings | Income-specific settings | Not implemented |
| 41 | Transaction Note Dialog | Add or edit a transaction note | Not implemented |
| 42 | Transaction Note Indicator | Indicate that a transaction has a note | Not implemented |
| 43 | Transaction Highlight | Highlight transactions based on thresholds | Not implemented |
| 44 | Monthly Limit Alert | Monthly limit monitoring | Not implemented |
| 45 | Export Menu | Export menu | Not implemented |
| 46 | Export Selected Rows | Export selected rows | Not implemented |
| 47 | Status Bar | Statistics for currently displayed transactions | Not implemented |

## 4. UI Infrastructure and Design System

| # | Component / System | Purpose | Status |
|---:|---|---|---|
| 48 | Theme System | Light / Dark / System | Not implemented |
| 49 | Design Tokens | Centralized design parameters | Not implemented |
| 50 | Color Tokens | Centralized color tokens | Not implemented |
| 51 | Typography System | Unified typography | Not implemented |
| 52 | Layout System | Shared layout rules | Not implemented |
| 53 | SCSS Foundation | Shared SCSS structure | Not implemented |
| 54 | i18n Service | Unified access to translations | Not implemented |
| 55 | Internationalization | EN / DE / RU | Not implemented |
| 56 | Export Library | Excel / CSV export | Not implemented |

## 5. Implemented Components

| # | Component | Purpose | Status |
|---:|---|---|---|
| 1 | Toolbar Section | Toolbar section container | Implemented |
| 2 | Toolbar Button Item | Typed button, configured through Input | Implemented |
| 3 | Toolbar Text Item | Text with overflow handling and tooltip, configured through Signal Input | Implemented |
| 4 | Toolbar Dropdown Item | Select from configured options | Implemented |
| 5 | Toolbar Date Range Item | Date range selection with From / To fields | Implemented |
| 6 | Toolbar Year / Month Item | Select year and month from configured options | Implemented |

## Notes

- The Universal Toolbar is intended to become the foundation for filters, date selection, buttons, text items, and other Dashboard controls.
- Dropdown, Date Range, and Year / Month are distinct Toolbar Section Item types with their own custom components.
- Rating / Ranking is not currently listed as a separate component in the article plan and is therefore not included in this tracked list.
- This file is a progress tracker. Update component statuses as work progresses.
