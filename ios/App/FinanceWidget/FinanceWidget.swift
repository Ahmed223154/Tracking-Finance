//
//  FinanceWidget.swift
//  FinanceWidget
//
//  Created for FinanceApp (Developer: Ahmed AL KUBAISI)
//  WidgetKit Extension providing dynamic Small (2x2) and Medium (2x4) Home Screen Widgets
//  Supports customizable display modes: Total Balance, Unallocated Amount, All Plans, Single Plan
//  Interactive AppIntents for iOS 17+ with zero-launch floating snippet logging and iOS 14-16 Link fallback.
//

import WidgetKit
import SwiftUI
import AppIntents

// MARK: - App Intents (iOS 16.0+ / iOS 17.0+)

@available(iOS 16.0, *)
struct QuickAddExpenseIntent: AppIntent {
    static var title: LocalizedStringResource = "Quick Log Expense"
    static var description = IntentDescription("Log an expense directly from the Home Screen.")
    static var openAppWhenRun: Bool = false

    @Parameter(title: "Amount")
    var amount: Double?

    @Parameter(title: "Category")
    var category: String?

    @MainActor
    func perform() async throws -> some IntentResult & ProvidesDialog {
        let expenseAmount = try await $amount.requestValue("Enter Amount:")
        let expenseCategory = try await $category.requestValue("Enter Category:")

        if let defaults = UserDefaults(suiteName: "group.com.ahmedalrubaye.financeapp") {
            var pending = defaults.array(forKey: "pending_transactions") as? [[String: Any]] ?? []
            let newTx: [String: Any] = [
                "id": UUID().uuidString,
                "amount": expenseAmount,
                "category": expenseCategory,
                "type": "expense",
                "date": ISO8601DateFormatter().string(from: Date())
            ]
            pending.append(newTx)
            defaults.set(pending, forKey: "pending_transactions")

            let currentUnallocated = defaults.double(forKey: "cached_unallocated")
            defaults.set(max(0, currentUnallocated - expenseAmount), forKey: "cached_unallocated")
            
            let currentBalance = defaults.double(forKey: "cached_balance")
            if currentBalance > 0 {
                defaults.set(max(0, currentBalance - expenseAmount), forKey: "cached_balance")
            }
            defaults.synchronize()
        }

        WidgetCenter.shared.reloadAllTimelines()
        return .result(dialog: "Logged \(expenseAmount, format: .currency(code: "IQD")) under \(expenseCategory)")
    }
}

@available(iOS 16.0, *)
struct QuickAddIncomeIntent: AppIntent {
    static var title: LocalizedStringResource = "Quick Log Income"
    static var description = IntentDescription("Log income directly from the Home Screen.")
    static var openAppWhenRun: Bool = false

    @Parameter(title: "Amount")
    var amount: Double?

    @Parameter(title: "Source")
    var source: String?

    @MainActor
    func perform() async throws -> some IntentResult & ProvidesDialog {
        let incomeAmount = try await $amount.requestValue("Enter Income Amount:")
        let incomeSource = try await $source.requestValue("Enter Source:")

        if let defaults = UserDefaults(suiteName: "group.com.ahmedalrubaye.financeapp") {
            var pending = defaults.array(forKey: "pending_transactions") as? [[String: Any]] ?? []
            let newTx: [String: Any] = [
                "id": UUID().uuidString,
                "amount": incomeAmount,
                "category": incomeSource,
                "type": "income",
                "date": ISO8601DateFormatter().string(from: Date())
            ]
            pending.append(newTx)
            defaults.set(pending, forKey: "pending_transactions")

            let currentBalance = defaults.double(forKey: "cached_balance")
            defaults.set(currentBalance + incomeAmount, forKey: "cached_balance")

            let currentUnallocated = defaults.double(forKey: "cached_unallocated")
            defaults.set(currentUnallocated + incomeAmount, forKey: "cached_unallocated")
            defaults.synchronize()
        }

        WidgetCenter.shared.reloadAllTimelines()
        return .result(dialog: "Added \(incomeAmount, format: .currency(code: "IQD")) income from \(incomeSource)")
    }
}

// MARK: - Models & Data Structures

public struct WidgetFocusedPlan: Codable {
    public let name: String
    public let progress: Double // e.g. 0.65
    public let current: Double
    public let target: Double

    public var progressPercent: Int {
        if progress > 1.0 {
            return min(100, max(0, Int(progress.rounded())))
        } else {
            return min(100, max(0, Int((progress * 100.0).rounded())))
        }
    }

    public init(name: String, progress: Double, current: Double, target: Double) {
        self.name = name
        self.progress = progress
        self.current = current
        self.target = target
    }
}

public struct WidgetPlanSummary: Codable, Identifiable {
    public let id: String
    public let name: String
    public let progress: Double // e.g. 0.65
    public let current: Double?
    public let target: Double?

    public var progressPercent: Int {
        if progress > 1.0 {
            return min(100, max(0, Int(progress.rounded())))
        } else {
            return min(100, max(0, Int((progress * 100.0).rounded())))
        }
    }

    public init(id: String, name: String, progress: Double, current: Double? = nil, target: Double? = nil) {
        self.id = id
        self.name = name
        self.progress = progress
        self.current = current
        self.target = target
    }
}

public struct WidgetDataPayload: Codable {
    public let totalBalance: Double
    public let unallocatedAmount: Double
    public let currency: String
    public let selectedPlan: WidgetFocusedPlan?
    public let plans: [WidgetPlanSummary]

    // Formatted strings (optional in JSON, with computed fallbacks)
    public let totalBalanceFormatted: String?
    public let unallocatedAmountFormatted: String?
    public let lastSyncTimestamp: String?

    public init(
        totalBalance: Double,
        unallocatedAmount: Double,
        currency: String,
        selectedPlan: WidgetFocusedPlan?,
        plans: [WidgetPlanSummary],
        totalBalanceFormatted: String? = nil,
        unallocatedAmountFormatted: String? = nil,
        lastSyncTimestamp: String? = nil
    ) {
        self.totalBalance = totalBalance
        self.unallocatedAmount = unallocatedAmount
        self.currency = currency
        self.selectedPlan = selectedPlan
        self.plans = plans
        self.totalBalanceFormatted = totalBalanceFormatted
        self.unallocatedAmountFormatted = unallocatedAmountFormatted
        self.lastSyncTimestamp = lastSyncTimestamp
    }

    public var formattedBalance: String {
        if let str = totalBalanceFormatted, !str.isEmpty {
            return str
        }
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 0
        let formatted = formatter.string(from: NSNumber(value: totalBalance)) ?? "\(Int(totalBalance))"
        return "\(formatted) \(currency)"
    }

    public var formattedUnallocated: String {
        if let str = unallocatedAmountFormatted, !str.isEmpty {
            return str
        }
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 0
        let formatted = formatter.string(from: NSNumber(value: unallocatedAmount)) ?? "\(Int(unallocatedAmount))"
        return "\(formatted) \(currency)"
    }

    public static var fallback: WidgetDataPayload {
        WidgetDataPayload(
            totalBalance: 0.0,
            unallocatedAmount: 0.0,
            currency: "IQD",
            selectedPlan: nil,
            plans: [],
            totalBalanceFormatted: "0 IQD",
            unallocatedAmountFormatted: "0 IQD",
            lastSyncTimestamp: ISO8601DateFormatter().string(from: Date())
        )
    }
}

// MARK: - App Group Shared Data Bridge

public class SharedDataBridge {
    public static let shared = SharedDataBridge()
    public let appGroupSuite = "group.com.ahmedalrubaye.financeapp"

    private init() {}

    public func readConfiguration() -> (displayMode: String, selectedPlanId: String?) {
        guard let sharedDefaults = UserDefaults(suiteName: appGroupSuite) else {
            return ("balance", nil)
        }
        let mode = sharedDefaults.string(forKey: "widget_display_mode") ?? "balance"
        let planId = sharedDefaults.string(forKey: "widget_selected_plan_id")
        return (mode, planId)
    }

    public func readPayload(
        selectedPlanId: String? = nil,
        cachedBalance: Double? = nil,
        cachedUnallocated: Double? = nil,
        cachedPlansJson: String? = nil
    ) -> WidgetDataPayload {
        guard let sharedDefaults = UserDefaults(suiteName: appGroupSuite) else {
            return WidgetDataPayload.fallback
        }

        // 1. Live values written by updateWidgetData
        let liveBalance = cachedBalance ?? (sharedDefaults.object(forKey: "cached_balance") != nil ? sharedDefaults.double(forKey: "cached_balance") : nil)
        let liveUnallocated = cachedUnallocated ?? (sharedDefaults.object(forKey: "cached_unallocated") != nil ? sharedDefaults.double(forKey: "cached_unallocated") : nil)
        let livePlansJson = cachedPlansJson ?? sharedDefaults.string(forKey: "cached_plans")
        let liveCurrency = sharedDefaults.string(forKey: "cached_currency") ?? "IQD"

        // Parse plans from cached_plans if available
        var livePlans: [WidgetPlanSummary] = []
        if let plansJson = livePlansJson, let plansData = plansJson.data(using: .utf8) {
            if let rawArray = try? JSONSerialization.jsonObject(with: plansData) as? [[String: Any]] {
                for item in rawArray {
                    let id = "\(item["id"] ?? UUID().uuidString)"
                    let name = item["name"] as? String ?? "Plan"
                    let target = (item["targetAmount"] as? Double) ?? (item["target"] as? Double) ?? 1000.0
                    let current = (item["allocatedAmount"] as? Double) ?? (item["current"] as? Double) ?? 0.0
                    let progress = (item["progress"] as? Double) ?? (target > 0 ? (current / target) : 0.0)
                    livePlans.append(WidgetPlanSummary(id: id, name: name, progress: progress, current: current, target: target))
                }
            }
        }

        // 2. Base JSON payload if available
        let jsonString = sharedDefaults.string(forKey: "widget_data_json")
            ?? sharedDefaults.string(forKey: "finance_widget_data")

        var basePayload: WidgetDataPayload? = nil
        if let jsonString = jsonString, let jsonData = jsonString.data(using: .utf8) {
            basePayload = try? JSONDecoder().decode(WidgetDataPayload.self, from: jsonData)
        }

        let totalBalance = liveBalance ?? basePayload?.totalBalance ?? 0.0
        let unallocatedAmount = liveUnallocated ?? basePayload?.unallocatedAmount ?? 0.0
        let currency = basePayload?.currency ?? liveCurrency
        let plans = !livePlans.isEmpty ? livePlans : (basePayload?.plans ?? [])

        // Resolve selected plan
        var selectedPlan: WidgetFocusedPlan? = nil
        if let planId = selectedPlanId, !planId.isEmpty, let matched = plans.first(where: { $0.id == planId }) {
            selectedPlan = WidgetFocusedPlan(
                name: matched.name,
                progress: matched.progress,
                current: matched.current ?? (matched.progress * (matched.target ?? 1000.0)),
                target: matched.target ?? 1000.0
            )
        } else if let first = plans.first {
            selectedPlan = WidgetFocusedPlan(
                name: first.name,
                progress: first.progress,
                current: first.current ?? (first.progress * (first.target ?? 1000.0)),
                target: first.target ?? 1000.0
            )
        } else {
            selectedPlan = basePayload?.selectedPlan
        }

        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 0
        let formattedBal = "\(formatter.string(from: NSNumber(value: totalBalance)) ?? "\(Int(totalBalance))") \(currency)"
        let formattedUnalloc = "\(formatter.string(from: NSNumber(value: unallocatedAmount)) ?? "\(Int(unallocatedAmount))") \(currency)"

        return WidgetDataPayload(
            totalBalance: totalBalance,
            unallocatedAmount: unallocatedAmount,
            currency: currency,
            selectedPlan: selectedPlan,
            plans: plans,
            totalBalanceFormatted: formattedBal,
            unallocatedAmountFormatted: formattedUnalloc,
            lastSyncTimestamp: ISO8601DateFormatter().string(from: Date())
        )
    }
}

// MARK: - Timeline Entry

public struct FinanceWidgetEntry: TimelineEntry {
    public let date: Date
    public let displayMode: String // "balance", "unallocated", "all_plans", "single_plan"
    public let selectedPlanId: String?
    public let payload: WidgetDataPayload

    public init(date: Date, displayMode: String, selectedPlanId: String?, payload: WidgetDataPayload) {
        self.date = date
        self.displayMode = displayMode
        self.selectedPlanId = selectedPlanId
        self.payload = payload
    }
}

// MARK: - Timeline Provider

public struct FinanceWidgetTimelineProvider: TimelineProvider {
    public init() {}

    public func placeholder(in context: Context) -> FinanceWidgetEntry {
        FinanceWidgetEntry(
            date: Date(),
            displayMode: "balance",
            selectedPlanId: nil,
            payload: WidgetDataPayload.fallback
        )
    }

    public func getSnapshot(in context: Context, completion: @escaping (FinanceWidgetEntry) -> Void) {
        let sharedDefaults = UserDefaults(suiteName: "group.com.ahmedalrubaye.financeapp")
        let displayMode = sharedDefaults?.string(forKey: "widget_display_mode") ?? "balance"
        let selectedPlanId = sharedDefaults?.string(forKey: "widget_selected_plan_id")
        let cachedBalance = sharedDefaults?.object(forKey: "cached_balance") != nil ? sharedDefaults?.double(forKey: "cached_balance") : nil
        let cachedUnallocated = sharedDefaults?.object(forKey: "cached_unallocated") != nil ? sharedDefaults?.double(forKey: "cached_unallocated") : nil
        let cachedPlans = sharedDefaults?.string(forKey: "cached_plans")

        let payload = SharedDataBridge.shared.readPayload(
            selectedPlanId: selectedPlanId,
            cachedBalance: cachedBalance,
            cachedUnallocated: cachedUnallocated,
            cachedPlansJson: cachedPlans
        )

        let entry = FinanceWidgetEntry(
            date: Date(),
            displayMode: displayMode,
            selectedPlanId: selectedPlanId,
            payload: payload
        )
        completion(entry)
    }

    public func getTimeline(in context: Context, completion: @escaping (Timeline<FinanceWidgetEntry>) -> Void) {
        let sharedDefaults = UserDefaults(suiteName: "group.com.ahmedalrubaye.financeapp")
        let displayMode = sharedDefaults?.string(forKey: "widget_display_mode") ?? "balance"
        let selectedPlanId = sharedDefaults?.string(forKey: "widget_selected_plan_id")

        // Read real-time values: cached_balance, cached_unallocated, and cached_plans
        let cachedBalance = sharedDefaults?.object(forKey: "cached_balance") != nil ? sharedDefaults?.double(forKey: "cached_balance") : nil
        let cachedUnallocated = sharedDefaults?.object(forKey: "cached_unallocated") != nil ? sharedDefaults?.double(forKey: "cached_unallocated") : nil
        let cachedPlans = sharedDefaults?.string(forKey: "cached_plans")

        let payload = SharedDataBridge.shared.readPayload(
            selectedPlanId: selectedPlanId,
            cachedBalance: cachedBalance,
            cachedUnallocated: cachedUnallocated,
            cachedPlansJson: cachedPlans
        )

        let entry = FinanceWidgetEntry(
            date: Date(),
            displayMode: displayMode,
            selectedPlanId: selectedPlanId,
            payload: payload
        )

        // Refresh periodically (15 minutes) or on WidgetCenter.shared.reloadAllTimelines()
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date()) ?? Date()
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
}

// MARK: - Reusable Quick Actions Strip (Native Deep-Link Targets for Instant Response)

public struct WidgetQuickActionsStrip: View {
    public var body: some View {
        HStack(spacing: 8) {
            Link(destination: URL(string: "trackingfinance://quick-add?type=expense")!) {
                HStack(spacing: 4) {
                    Image(systemName: "minus.circle.fill")
                        .foregroundColor(.red)
                    Text("Expense")
                        .font(.system(size: 11, weight: .bold))
                }
                .frame(maxWidth: .infinity)
                .padding(.horizontal, 10)
                .padding(.vertical, 6)
                .background(Color.white.opacity(0.15))
                .cornerRadius(8)
            }

            Link(destination: URL(string: "trackingfinance://quick-add?type=income")!) {
                HStack(spacing: 4) {
                    Image(systemName: "plus.circle.fill")
                        .foregroundColor(.green)
                    Text("Income")
                        .font(.system(size: 11, weight: .bold))
                }
                .frame(maxWidth: .infinity)
                .padding(.horizontal, 10)
                .padding(.vertical, 6)
                .background(Color.white.opacity(0.15))
                .cornerRadius(8)
            }
        }
    }
}

// MARK: - 1. Balance Mode View

public struct BalanceModeWidgetView: View {
    public let entry: FinanceWidgetEntry
    @Environment(\.widgetFamily) var family

    public var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Header
            HStack {
                HStack(spacing: 4) {
                    Image(systemName: "creditcard.fill")
                        .font(.system(size: 9, weight: .bold))
                        .foregroundColor(Color(red: 0.0, green: 0.48, blue: 1.0))
                    Text("TOTAL BALANCE")
                        .font(.system(size: 9, weight: .bold, design: .rounded))
                        .foregroundColor(Color(UIColor.secondaryLabel))
                }
                Spacer()
                Circle()
                    .fill(Color(red: 0.20, green: 0.78, blue: 0.35))
                    .frame(width: 6, height: 6)
            }
            .padding(.bottom, 2)

            // Prominent Amount
            Text(entry.payload.formattedBalance)
                .font(.system(size: family == .systemSmall ? 18 : 22, weight: .heavy, design: .rounded))
                .foregroundColor(Color(UIColor.label))
                .lineLimit(1)
                .minimumScaleFactor(0.65)
                .padding(.top, 2)

            if family == .systemMedium {
                HStack(spacing: 6) {
                    Text("Unallocated: \(entry.payload.formattedUnallocated)")
                        .font(.system(size: 10, weight: .medium))
                        .foregroundColor(Color(UIColor.secondaryLabel))
                    Text("•")
                        .foregroundColor(Color(UIColor.tertiaryLabel))
                    Text("\(entry.payload.plans.count) Active Plans")
                        .font(.system(size: 10, weight: .medium))
                        .foregroundColor(Color(UIColor.secondaryLabel))
                }
                .padding(.top, 3)
            } else {
                Text("Net Financial Worth")
                    .font(.system(size: 9, weight: .medium))
                    .foregroundColor(Color(UIColor.tertiaryLabel))
                    .padding(.top, 1)
            }

            Spacer(minLength: 4)

            // Quick actions
            WidgetQuickActionsStrip()
        }
        .padding(12)
    }
}

// MARK: - 2. Unallocated Mode View

public struct UnallocatedModeWidgetView: View {
    public let entry: FinanceWidgetEntry
    @Environment(\.widgetFamily) var family

    public var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Header
            HStack {
                HStack(spacing: 4) {
                    Image(systemName: "shield.lefthalf.filled")
                        .font(.system(size: 9, weight: .bold))
                        .foregroundColor(Color(red: 0.20, green: 0.78, blue: 0.35))
                    Text("UNALLOCATED")
                        .font(.system(size: 9, weight: .bold, design: .rounded))
                        .foregroundColor(Color(UIColor.secondaryLabel))
                }
                Spacer()
                Text("Safe to spend")
                    .font(.system(size: 8, weight: .semibold))
                    .foregroundColor(Color(red: 0.20, green: 0.78, blue: 0.35))
                    .padding(.horizontal, 5)
                    .padding(.vertical, 2)
                    .background(
                        Capsule().fill(Color(red: 0.20, green: 0.78, blue: 0.35).opacity(0.15))
                    )
            }
            .padding(.bottom, 2)

            // Prominent Amount
            Text(entry.payload.formattedUnallocated)
                .font(.system(size: family == .systemSmall ? 18 : 22, weight: .heavy, design: .rounded))
                .foregroundColor(Color(UIColor.label))
                .lineLimit(1)
                .minimumScaleFactor(0.65)
                .padding(.top, 2)

            if family == .systemMedium {
                Text("Available surplus not pledged to any goals or recurring commitments.")
                    .font(.system(size: 10, weight: .medium))
                    .foregroundColor(Color(UIColor.secondaryLabel))
                    .lineLimit(1)
                    .padding(.top, 3)
            } else {
                Text("Free cash for allocation")
                    .font(.system(size: 9, weight: .medium))
                    .foregroundColor(Color(UIColor.tertiaryLabel))
                    .padding(.top, 1)
            }

            Spacer(minLength: 4)

            // Quick actions
            WidgetQuickActionsStrip()
        }
        .padding(12)
    }
}

// MARK: - 3. All Plans Mode View (Summary of up to 3 plans)

public struct AllPlansModeWidgetView: View {
    public let entry: FinanceWidgetEntry
    @Environment(\.widgetFamily) var family

    private func priorityColor(index: Int) -> Color {
        switch index {
        case 0:
            return Color(red: 0.0, green: 0.48, blue: 1.0) // Blue
        case 1:
            return Color(red: 0.20, green: 0.78, blue: 0.35) // Green
        case 2:
            return Color(red: 1.0, green: 0.58, blue: 0.0) // Orange
        default:
            return Color(red: 0.58, green: 0.33, blue: 0.85) // Purple
        }
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            // Header with deep link to plans dashboard
            HStack {
                HStack(spacing: 4) {
                    Image(systemName: "target")
                        .font(.system(size: 9, weight: .bold))
                        .foregroundColor(Color(red: 0.0, green: 0.48, blue: 1.0))
                    Text("ACTIVE PLANS")
                        .font(.system(size: 9, weight: .bold, design: .rounded))
                        .foregroundColor(Color(UIColor.secondaryLabel))
                }
                Spacer()
                Link(destination: URL(string: "trackingfinance://plans-dashboard")!) {
                    HStack(spacing: 2) {
                        Text("All")
                            .font(.system(size: 8, weight: .semibold))
                        Image(systemName: "chevron.right")
                            .font(.system(size: 7, weight: .bold))
                    }
                    .foregroundColor(Color(red: 0.0, green: 0.48, blue: 1.0))
                }
            }
            .padding(.bottom, 2)

            let displayedPlans = Array(entry.payload.plans.prefix(family == .systemSmall ? 2 : 3))

            if displayedPlans.isEmpty {
                Spacer()
                Text("No active plans")
                    .font(.system(size: 11, weight: .medium))
                    .foregroundColor(Color(UIColor.secondaryLabel))
                    .frame(maxWidth: .infinity, alignment: .center)
                Spacer()
            } else {
                VStack(spacing: family == .systemSmall ? 4 : 5) {
                    ForEach(Array(displayedPlans.enumerated()), id: \.element.id) { index, plan in
                        Link(destination: URL(string: "trackingfinance://plan?id=\(plan.id)")!) {
                            VStack(alignment: .leading, spacing: 2) {
                                HStack {
                                    Text(plan.name)
                                        .font(.system(size: 10, weight: .bold, design: .rounded))
                                        .foregroundColor(Color(UIColor.label))
                                        .lineLimit(1)
                                    Spacer()
                                    Text("\(plan.progressPercent)%")
                                        .font(.system(size: 9, weight: .heavy, design: .rounded))
                                        .foregroundColor(priorityColor(index: index))
                                }

                                // Progress Bar
                                GeometryReader { geo in
                                    ZStack(alignment: .leading) {
                                        Capsule()
                                            .fill(Color(UIColor.tertiarySystemFill))
                                            .frame(height: 4)

                                        Capsule()
                                            .fill(priorityColor(index: index))
                                            .frame(width: max(4, geo.size.width * CGFloat(min(100, plan.progressPercent)) / 100.0), height: 4)
                                    }
                                }
                                .frame(height: 4)
                            }
                            .padding(.horizontal, 6)
                            .padding(.vertical, 3)
                            .background(
                                RoundedRectangle(cornerRadius: 6, style: .continuous)
                                    .fill(Color(UIColor.tertiarySystemBackground))
                            )
                        }
                    }
                }
            }

            Spacer(minLength: 2)

            // Retain tap shortcuts
            WidgetQuickActionsStrip()
        }
        .padding(10)
    }
}

// MARK: - 4. Single Plan Mode View

public struct SinglePlanModeWidgetView: View {
    public let entry: FinanceWidgetEntry
    @Environment(\.widgetFamily) var family

    private var plan: WidgetFocusedPlan {
        if let selected = entry.payload.selectedPlan {
            return selected
        }
        if let first = entry.payload.plans.first {
            return WidgetFocusedPlan(
                name: first.name,
                progress: first.progress,
                current: first.current ?? 650.0,
                target: first.target ?? 1000.0
            )
        }
        return WidgetFocusedPlan(name: "Emergency Fund", progress: 0.65, current: 650.0, target: 1000.0)
    }

    private func formatNumber(_ val: Double) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 0
        return formatter.string(from: NSNumber(value: val)) ?? "\(Int(val))"
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: 2) {
            // Header
            HStack {
                HStack(spacing: 4) {
                    Image(systemName: "flag.fill")
                        .font(.system(size: 9, weight: .bold))
                        .foregroundColor(Color(red: 0.58, green: 0.33, blue: 0.85)) // Purple
                    Text("GOAL TRACKER")
                        .font(.system(size: 9, weight: .bold, design: .rounded))
                        .foregroundColor(Color(UIColor.secondaryLabel))
                }
                Spacer()
                Text("\(plan.progressPercent)%")
                    .font(.system(size: 9, weight: .heavy, design: .rounded))
                    .foregroundColor(.white)
                    .padding(.horizontal, 6)
                    .padding(.vertical, 1.5)
                    .background(
                        Capsule().fill(Color(red: 0.58, green: 0.33, blue: 0.85))
                    )
            }
            .padding(.bottom, 2)

            // Focused Plan Name
            Text(plan.name)
                .font(.system(size: 13, weight: .heavy, design: .rounded))
                .foregroundColor(Color(UIColor.label))
                .lineLimit(1)

            // Current vs Target Amount
            HStack(spacing: 4) {
                Text("\(formatNumber(plan.current))")
                    .font(.system(size: 11, weight: .bold, design: .rounded))
                    .foregroundColor(Color(red: 0.58, green: 0.33, blue: 0.85))
                Text("/")
                    .font(.system(size: 10, weight: .medium))
                    .foregroundColor(Color(UIColor.tertiaryLabel))
                Text("\(formatNumber(plan.target)) \(entry.payload.currency)")
                    .font(.system(size: 10, weight: .medium, design: .rounded))
                    .foregroundColor(Color(UIColor.secondaryLabel))
            }
            .padding(.top, 1)

            // Progress Bar
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule()
                        .fill(Color(UIColor.tertiarySystemFill))
                        .frame(height: 6)

                    Capsule()
                        .fill(
                            LinearGradient(
                                colors: [Color(red: 0.58, green: 0.33, blue: 0.85), Color(red: 0.0, green: 0.48, blue: 1.0)],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                        .frame(width: max(4, geo.size.width * CGFloat(min(100, plan.progressPercent)) / 100.0), height: 6)
                }
            }
            .frame(height: 6)
            .padding(.vertical, 2)

            Spacer(minLength: 2)

            // Quick actions
            WidgetQuickActionsStrip()
        }
        .padding(10)
    }
}

// MARK: - Dynamic Container View

public struct FinanceWidgetEntryView: View {
    public var entry: FinanceWidgetEntry

    public init(entry: FinanceWidgetEntry) {
        self.entry = entry
    }

    public var body: some View {
        Group {
            switch entry.displayMode {
            case "unallocated":
                UnallocatedModeWidgetView(entry: entry)
            case "all_plans":
                AllPlansModeWidgetView(entry: entry)
            case "single_plan":
                SinglePlanModeWidgetView(entry: entry)
            case "balance":
                BalanceModeWidgetView(entry: entry)
            default:
                BalanceModeWidgetView(entry: entry)
            }
        }
        .widgetBackground(Color(UIColor.secondarySystemBackground))
    }
}

// MARK: - Widget Configurations

public struct FinanceAppWidget: Widget {
    public let kind: String = "FinanceAppWidget"

    public init() {}

    public var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FinanceWidgetTimelineProvider()) { entry in
            FinanceWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Finance Assistant")
        .description("Display your Total Balance, Unallocated Funds, or Plan Progress right on your Home Screen.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

// Legacy Widget Name Compatibility for Existing Home Screen Placements
public struct FinanceQuickLogWidget: Widget {
    public let kind: String = "FinanceQuickLogWidget"

    public init() {}

    public var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FinanceWidgetTimelineProvider()) { entry in
            FinanceWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Quick Log & Financial Status")
        .description("View current balance or goals with one-tap transaction logging.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

public struct FinancePlansTrackerWidget: Widget {
    public let kind: String = "FinancePlansTrackerWidget"

    public init() {}

    public var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FinanceWidgetTimelineProvider()) { entry in
            FinanceWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Priority Plans Tracker")
        .description("Track all financial plans or focus on a single target.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

// MARK: - Widget Bundle Entry Point

@main
struct FinanceWidgetBundle: WidgetBundle {
    var body: some Widget {
        FinanceAppWidget()
        FinanceQuickLogWidget()
        FinancePlansTrackerWidget()
    }
}

// MARK: - iOS 17+ Widget Background Compatibility Helper

extension View {
    func widgetBackground(_ backgroundView: some View) -> some View {
        if #available(iOSApplicationExtension 17.0, iOS 17.0, *) {
            return AnyView(self.containerBackground(for: .widget) { backgroundView })
        } else {
            return AnyView(self.background(backgroundView))
        }
    }
}
