# FinanceApp — Native iOS 17 & Swift Playgrounds App Project (.swiftpm)

A 100% pure Swift and SwiftUI personal finance manager designed for iPhone 13 Pro Max, featuring offline-first local persistence via **SwiftData**, interactive analytics with **Swift Charts**, biometric authentication with **LocalAuthentication**, Iraqi Dinar (`IQD`) integer formatting, dynamic goal achievability analysis, and category budget limits.

---

## Architecture & Project Structure

This project is formatted as a native **Swift Playgrounds App (.swiftpm)** package. It requires zero third-party dependencies and builds with standard Apple frameworks (`SwiftUI`, `SwiftData`, `Charts`, `LocalAuthentication`).

```
FinanceApp.swiftpm/
├── Package.swift                     # Swift Playgrounds 4+ Manifest
├── Sources/
│   ├── FinanceApp.swift              # @main entry point & TabView container
│   ├── Models.swift                  # SwiftData @Model declarations
│   ├── Utilities.swift               # CurrencyFormatter (IQD) & Date helpers
│   ├── FinancialEngine.swift         # Pure observable calculation & achievability engine
│   ├── Views/
│   │   ├── DashboardView.swift       # Top balance, monthly snapshot, recent transactions
│   │   ├── QuickAddTransactionSheet.swift # Validated modal for income & expenses
│   │   ├── TransactionsView.swift    # Chronological feed, search, filter, edit, swipe-delete
│   │   ├── AnalyticsView.swift       # Swift Charts bar, ranked category, & net trend
│   │   ├── GoalsView.swift           # Active/completed goals, allocation, achievability & shortfall
│   │   ├── BudgetsView.swift         # Category monthly limits with color transitions
│   │   └── SettingsView.swift        # Face ID toggle, category manager, CSV/JSON export
│   └── SingleFileBundle.swift        # Complete all-in-one file ready to paste
└── README.md
```

---

## Step-by-Step Guide: Running on iPhone 13 Pro Max without a Paid Apple Developer Account

You **do not need a $99/year Apple Developer program account**. Apple allows free personal device installation directly through Swift Playgrounds 4.4+ or Xcode with any standard Apple ID.

### Step 1: Install Swift Playgrounds 4 on macOS
1. Open the **Mac App Store** on your Mac.
2. Search for **Swift Playgrounds** (version 4.4 or higher).
3. Click **Get** / **Install** (100% free from Apple).

### Step 2: Open or Create the App in Swift Playgrounds
**Method A (Direct Folder Open):**
1. Download the `FinanceApp.swiftpm` folder from this repository.
2. In macOS Finder, double-click the `FinanceApp.swiftpm` package or right-click > **Open With > Swift Playgrounds**.

**Method B (Paste SingleFileBundle):**
1. Launch Swift Playgrounds on your Mac.
2. In the bottom-left corner, click **App** to create a new empty App project.
3. Open `SingleFileBundle.swift` from this package, copy its entire contents.
4. Replace the default `ContentView.swift` in your playground with the copied code.

### Step 3: Connect Your iPhone 13 Pro Max
1. Connect your iPhone 13 Pro Max to your Mac using a **USB-to-Lightning** or **USB-C to Lightning** cable.
2. Unlock your iPhone. If prompted on your phone, tap **Trust This Computer** and enter your passcode.
3. If prompted in Finder on macOS, click **Trust**.

### Step 4: Enable Developer Mode on iOS 17+
On iOS 16 and iOS 17+, Apple requires Developer Mode to be toggled before running un-notarized sideloaded apps:
1. On your iPhone 13 Pro Max, open **Settings**.
2. Scroll down and tap **Privacy & Security**.
3. Scroll to the very bottom and tap **Developer Mode**.
4. Toggle **Developer Mode** to **ON**.
5. Tap **Restart** when prompted.
6. After your iPhone restarts and is unlocked, a system alert will appear: tap **Turn On** and enter your device passcode.

### Step 5: Select Your iPhone as Run Destination & Install
1. In Swift Playgrounds on your Mac, look at the top toolbar near the center.
2. Click the device picker next to the **Run (Play)** button.
3. Select your connected **iPhone 13 Pro Max** from the list of available devices (instead of "Mac" or "My Mac").
4. Click the **Run ▶** button.
5. Swift Playgrounds will compile the Swift code, sign it with your personal free Apple ID credentials, and install `FinanceApp` directly onto your iPhone home screen!

---

## Financial Calculation Rules & Mechanics

1. **Actual Balance vs. Unallocated Balance:**
   - $\text{Actual Balance} = \text{Total Income} - \text{Total Expenses}$
   - $\text{Unallocated Balance} = \text{Actual Balance} - \text{Total Allocated to Active Goals}$
   - Allocating money to a goal is strictly an internal cash reserve earmark. It **never** creates an expense and does **not** modify spending analytics.
2. **Goal Achievability Assessment:**
   - **No Deadline:** If $\text{Unallocated Balance} \ge \text{Remaining Goal Amount}$, marked as *✓ Achievable immediately*. Otherwise, *⚠ Not Currently Achievable* with the exact cash shortfall displayed.
   - **With Deadline:**
     $$\text{Required Monthly Savings} = \frac{\text{Target Amount} - \text{Allocated Amount}}{\text{Months Remaining}}$$
     - If $\text{Historical Avg Savings} \ge \text{Required} \times 1.15$ $\longrightarrow$ **✓ Achievable**
     - If $\text{Historical Avg Savings} \ge \text{Required}$ $\longrightarrow$ **⚠ At Risk (Tight margin)**
     - If $\text{Historical Avg Savings} < \text{Required}$ $\longrightarrow$ **✕ Unlikely to Be Achievable** with concrete recommendations (increase income, cut expenses, or extend target by $N$ months).
3. **Currency Formatting:**
   - Formatted as `6,600,000 IQD` with integer grouping commas and no fractional decimals.
