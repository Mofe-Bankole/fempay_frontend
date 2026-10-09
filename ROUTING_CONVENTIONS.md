# Routing & File Naming Conventions

This document establishes the project-wide architectural and naming conventions for Expo Router pages, screens, and components in the FemPay codebase.

---

## 1. Core Rule: Semantic & Domain-Driven Over Numeric/Generic

Never use generic or numeric names such as `one`, `two`, `three`, `four`, `sight`, or `test`. Every route segment, directory, and file must clearly communicate its domain purpose and user intent.

| Bad Pattern | Recommended Pattern | Rationale |
|---|---|---|
| `app/(pages)/welcome/one.tsx` | `app/(pages)/welcome/intro.tsx` | Explains the slide purpose (product intro) |
| `app/(pages)/welcome/two.tsx` | `app/(pages)/welcome/transfers.tsx` | Highlights the transfers feature |
| `app/(pages)/welcome/three.tsx` | `app/(pages)/welcome/spending.tsx` | Highlights spending analytics & limits |
| `app/(pages)/welcome/four.tsx` | `app/(pages)/welcome/security.tsx` | Highlights security & encryption |
| `app/(pages)/onboard/one/index.tsx` | `app/(pages)/onboard/phone/index.tsx` | Captures mobile phone & OTP input |
| `app/(pages)/onboard/four/index.tsx` | `app/(pages)/onboard/income/index.tsx` | Captures student income & allowance |
| `app/(pages)/onboard/sight/index.tsx` | *(Removed)* | Dead/empty files must not pollute routes |

---

## 2. Directory Structure Conventions

```
app/
├── _layout.tsx                     # Global providers, fonts & root stack
├── index.tsx                       # Initial redirect to welcome flow
├── page.tsx                        # Entry view
│
├── (pages)/                        # Core application flows
│   ├── welcome/                    # Onboarding slider screens
│   │   ├── intro.tsx               # Product overview
│   │   ├── transfers.tsx           # Transfers & speed
│   │   ├── spending.tsx            # Spending & budgeting
│   │   └── security.tsx            # Security assurances & CTA
│   │
│   ├── questionnaire/              # Role selector
│   │   └── index.tsx               # Student vs Merchant selection
│   │
│   ├── onboard/                    # KYC & Registration steps
│   │   ├── phone/index.tsx         # Mobile number entry
│   │   ├── identity-verification/  # Full name, student profile, university
│   │   └── income/index.tsx        # Allowance & address
│   │
│   └── home/
│       └── home.tsx                # Main authenticated dashboard
│
├── bills/                          # Utility bill payments
│   ├── page.tsx                    # Category selection
│   ├── provider/page.tsx           # Distribution company / TV provider selection
│   ├── amount/page.tsx             # Meter/phone input & electricity payment
│   ├── electricity/page.tsx        # Electricity alias route
│   └── cable/page.tsx              # Smartcard input, plan selection & checkout
│
├── transfer/                       # Bank & peer-to-peer transfers
│   ├── page.tsx                    # Bank selection & account lookup
│   ├── amount/page.tsx             # Amount & narration entry
│   └── review/page.tsx             # Transfer PIN verification & summary
│
├── airtime/                        # Airtime top-up flow
│   ├── page.tsx                    # Telecom network selection
│   └── amount/page.tsx             # Phone number, amount & confirmation
│
├── data/                           # Mobile data bundle flow
│   ├── page.tsx                    # Telecom network selection
│   └── plan/page.tsx               # Data bundle plan selection & payment
│
├── insight/                        # Spending insights & budget limits
│   └── page.tsx                    # Daily limit config & analytics
│
└── rewards/                        # Loyalty & XP rewards
    └── page.tsx                    # XP balance, cashback & redemption
```

---

## 3. Component & Export Naming Rules

1. **PascalCase for Component Identifiers**: Component functions must be descriptive and match the screen function:
   - `WelcomeIntro`, `WelcomeTransfers`, `WelcomeSpending`, `WelcomeSecurity`
   - `OnboardPhone`, `OnboardIdentityVerification`, `OnboardIncome`
2. **Cohesive Navigation References**: Ensure `router.push(...)` and `<Redirect href="..." />` use the exact semantic route string rather than legacy paths.
3. **No Dead or 0-Byte Artifacts**: Never commit empty files or abandoned numbered scratch folders (`five`, `six`, `seven`, `sight`).
