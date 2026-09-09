//
//  FinanceWidget.swift
//  FinanceWidget
//
//  Created for FinanceApp (Developer: Ahmed AL KUBAISI)
//  WidgetKit Extension providing Small (2x2) and Medium (2x4) Home Screen Widgets
//

import WidgetKit
import SwiftUI

// MARK: - Shared Data Models

public struct WidgetPlanItem: Codable, Identifiable {
    public let id: String
    public let name: String
    public let priority: String
    public let allocatedAmount: Double
    public let targetAmount: Double
    public let remainingAmount: Double
    public let progressPercent: Int
    public let statusFlag: String
    public let isDelayed: Bool
    public let delayMonths: Int
    public let deepLink: String

    public init(
        id: String,
        name: String,
        priority: String,
        allocatedAmount: Double,
        targetAmount: Double,
        remainingAmount: Double,
        progressPercent: Int,
        statusFlag: String,
        isDelayed: Bool,
        delayMonths: Int,
        deepLink: String
    ) {
        self.id = id
        self.name = name
        self.priority = priority
        self.allocatedAmount = allocatedAmount
        self.targetAmount = targetAmount
        self.remainingAmount = remainingAmount
        self.progressPercent = progressPercent
        self.statusFlag = statusFlag
        self.isDelayed = isDelayed
        self.delayMonths = delayMonths
        self.deepLink = deepLink
    }
}

public struct WidgetDataPayload: Codable {
    public let appGroupSuite: String
    public let unallocatedBalance: Double
    public let unallocatedBalanceFormatted: String
    public let actualBalance: Double
    public let actualBalanceFormatted: String
    public let monthlyCapacity: Double
    public let currency: String
    public let topPlans: [WidgetPlanItem]
    public let lastSyncTimestamp: String

    public static var fallback: WidgetDataPayload {
        WidgetDataPayload(
            appGroupSuite: "group.com.ahmedalrubaye.financeapp",
            unallocatedBalance: 750000,
            unallocatedBalanceFormatted: "750,000 IQD",
            actualBalance: 1250000,
            actualBalanceFormatted: "1,250,000 IQD",
            monthlyCapacity: 450000,
            currency: "IQD",
            topPlans: [
                WidgetPlanItem(
                    id: "plan_emergency_fund",
                    name: "صندوق الطوارئ (Emergency)",
                    priority: "Critical",
                    allocatedAmount: 300000,
                    targetAmount: 500000,
                    remainingAmount: 200000,
                    progressPercent: 60,
                    statusFlag: "On Track",
                    isDelayed: false,
                    delayMonths: 0,
                    deepLink: "myapp://plan?id=plan_emergency_fund"
                ),
                WidgetPlanItem(
                    id: "plan_car_downpayment",
                    name: "دفعة السيارة (Car Downpayment)",
                    priority: "High",
                    allocatedAmount: 200000,
                    targetAmount: 800000,
                    remainingAmount: 600000,
                    progressPercent: 25,
                    statusFlag: "On Track",
                    isDelayed: false,
                    delayMonths: 0,
                    deepLink: "myapp://plan?id=plan_car_downpayment"
                )
            ],
            lastSyncTimestamp: ISO8601DateFormatter().string(from: Date())
        )
    }
}

public class SharedDataBridge {
    public static let shared = SharedDataBridge()
    private let appGroupSuite = "group.com.ahmedalrubaye.financeapp"
    private let userDefaultsKey = "finance_widget_data"

    private init() {}

    public func readWidgetPayload() -> WidgetDataPayload {
        guard let sharedDefaults = UserDefaults(suiteName: appGroupSuite),
              let jsonString = sharedDefaults.string(forKey: userDefaultsKey),
              let jsonData = jsonString.data(using: .utf8) else {
            return WidgetDataPayload.fallback
        }

        do {
            let decoder = JSONDecoder()
            return try decoder.decode(WidgetDataPayload.self, from: jsonData)
        } catch {
            return WidgetDataPayload.fallback
        }
    }
}

// MARK: - Timeline Entries

public struct QuickLogEntry: TimelineEntry {
    public let date: Date
    public let unallocatedBalanceFormatted: String
    public let unallocatedBalance: Double
    public let currency: String

    public init(date: Date, unallocatedBalanceFormatted: String, unallocatedBalance: Double, currency: String) {
        self.date = date
        self.unallocatedBalanceFormatted = unallocatedBalanceFormatted
        self.unallocatedBalance = unallocatedBalance
        self.currency = currency
    }
}

public struct PlansTrackerEntry: TimelineEntry {
    public let date: Date
    public let unallocatedBalanceFormatted: String
    public let topPlans: [WidgetPlanItem]
    public let currency: String

    public init(date: Date, unallocatedBalanceFormatted: String, topPlans: [WidgetPlanItem], currency: String) {
        self.date = date
        self.unallocatedBalanceFormatted = unallocatedBalanceFormatted
        self.topPlans = topPlans
        self.currency = currency
    }
}

// MARK: - Timeline Providers

public struct QuickLogTimelineProvider: TimelineProvider {
    public init() {}

    public func placeholder(in context: Context) -> QuickLogEntry {
        QuickLogEntry(
            date: Date(),
            unallocatedBalanceFormatted: "750,000 IQD",
            unallocatedBalance: 750000,
            currency: "IQD"
        )
    }

    public func getSnapshot(in context: Context, completion: @escaping (QuickLogEntry) -> Void) {
        let payload = SharedDataBridge.shared.readWidgetPayload()
        let entry = QuickLogEntry(
            date: Date(),
            unallocatedBalanceFormatted: payload.unallocatedBalanceFormatted,
            unallocatedBalance: payload.unallocatedBalance,
            currency: payload.currency
        )
        completion(entry)
    }

    public func getTimeline(in context: Context, completion: @escaping (Timeline<QuickLogEntry>) -> Void) {
        let payload = SharedDataBridge.shared.readWidgetPayload()
        let entry = QuickLogEntry(
            date: Date(),
            unallocatedBalanceFormatted: payload.unallocatedBalanceFormatted,
            unallocatedBalance: payload.unallocatedBalance,
            currency: payload.currency
        )

        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date()) ?? Date()
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
}

public struct PlansTrackerTimelineProvider: TimelineProvider {
    public init() {}

    public func placeholder(in context: Context) -> PlansTrackerEntry {
        PlansTrackerEntry(
            date: Date(),
            unallocatedBalanceFormatted: "750,000 IQD",
            topPlans: WidgetDataPayload.fallback.topPlans,
            currency: "IQD"
        )
    }

    public func getSnapshot(in context: Context, completion: @escaping (PlansTrackerEntry) -> Void) {
        let payload = SharedDataBridge.shared.readWidgetPayload()
        let entry = PlansTrackerEntry(
            date: Date(),
            unallocatedBalanceFormatted: payload.unallocatedBalanceFormatted,
            topPlans: payload.topPlans,
            currency: payload.currency
        )
        completion(entry)
    }

    public func getTimeline(in context: Context, completion: @escaping (Timeline<PlansTrackerEntry>) -> Void) {
        let payload = SharedDataBridge.shared.readWidgetPayload()
        let entry = PlansTrackerEntry(
            date: Date(),
            unallocatedBalanceFormatted: payload.unallocatedBalanceFormatted,
            topPlans: payload.topPlans,
            currency: payload.currency
        )

        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date()) ?? Date()
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
}

// MARK: - Widget Views

// 1. Small Widget (2x2): Quick Log
public struct QuickLogWidgetEntryView: View {
    public var entry: QuickLogEntry
    @Environment(\.colorScheme) var colorScheme

    public init(entry: QuickLogEntry) {
        self.entry = entry
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Header
            HStack {
                Text("UNALLOCATED")
                    .font(.system(size: 9, weight: .bold, design: .rounded))
                    .foregroundColor(Color(UIColor.secondaryLabel))
                Spacer()
                Circle()
                    .fill(Color(red: 0.20, green: 0.78, blue: 0.35)) // iOS Green
                    .frame(width: 6, height: 6)
            }
            .padding(.bottom, 2)

            // Balance
            Text(entry.unallocatedBalanceFormatted)
                .font(.system(size: 16, weight: .heavy, design: .rounded))
                .foregroundColor(Color(UIColor.label))
                .lineLimit(1)
                .minimumScaleFactor(0.7)

            Text("Safe to spend / allocate")
                .font(.system(size: 8, weight: .medium))
                .foregroundColor(Color(UIColor.tertiaryLabel))
                .padding(.bottom, 6)

            Spacer()

            // Quick-Log Action Buttons with Custom URL Schemes
            HStack(spacing: 6) {
                // [ + Expense ] -> myapp://add-expense
                Link(destination: URL(string: "myapp://add-expense")!) {
                    VStack(spacing: 2) {
                        Image(systemName: "minus.circle.fill")
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(Color(red: 1.0, green: 0.23, blue: 0.19))
                        Text("+ Expense")
                            .font(.system(size: 9, weight: .heavy, design: .rounded))
                            .foregroundColor(Color(red: 0.85, green: 0.15, blue: 0.15))
                    }
                    .frame(maxWidth: .infinity, maxHeight: 38)
                    .background(
                        RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .fill(Color(red: 1.0, green: 0.23, blue: 0.19).opacity(colorScheme == .dark ? 0.20 : 0.10))
                    )
                }

                // [ + Income ] -> myapp://add-income
                Link(destination: URL(string: "myapp://add-income")!) {
                    VStack(spacing: 2) {
                        Image(systemName: "plus.circle.fill")
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(Color(red: 0.20, green: 0.78, blue: 0.35))
                        Text("+ Income")
                            .font(.system(size: 9, weight: .heavy, design: .rounded))
                            .foregroundColor(Color(red: 0.15, green: 0.65, blue: 0.25))
                    }
                    .frame(maxWidth: .infinity, maxHeight: 38)
                    .background(
                        RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .fill(Color(red: 0.20, green: 0.78, blue: 0.35).opacity(colorScheme == .dark ? 0.20 : 0.10))
                    )
                }
            }
        }
        .padding(12)
        .widgetBackground(Color(UIColor.secondarySystemBackground))
    }
}

// 2. Medium Widget (2x4): Plans Tracker & Forecast Status
public struct PlansTrackerWidgetEntryView: View {
    public var entry: PlansTrackerEntry
    @Environment(\.colorScheme) var colorScheme

    public init(entry: PlansTrackerEntry) {
        self.entry = entry
    }

    private func priorityColor(for priority: String) -> Color {
        switch priority.lowercased() {
        case "critical":
            return Color(red: 1.0, green: 0.23, blue: 0.19)
        case "high":
            return Color(red: 1.0, green: 0.58, blue: 0.0)
        case "medium":
            return Color(red: 0.0, green: 0.48, blue: 1.0)
        default:
            return Color(red: 0.20, green: 0.78, blue: 0.35)
        }
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            // Widget Header with Plans Dashboard deep link
            HStack {
                Label("Priority Plans", systemImage: "target")
                    .font(.system(size: 11, weight: .bold, design: .rounded))
                    .foregroundColor(Color(UIColor.label))

                Spacer()

                Link(destination: URL(string: "myapp://plans-dashboard")!) {
                    HStack(spacing: 2) {
                        Text("Overview")
                            .font(.system(size: 9, weight: .semibold))
                        Image(systemName: "chevron.right")
                            .font(.system(size: 8, weight: .bold))
                    }
                    .foregroundColor(Color(red: 0.0, green: 0.48, blue: 1.0))
                }
            }
            .padding(.bottom, 2)

            // Top 2 Plans Rows
            if entry.topPlans.isEmpty {
                Spacer()
                Text("No active plans")
                    .font(.system(size: 11, weight: .medium))
                    .foregroundColor(Color(UIColor.secondaryLabel))
                    .frame(maxWidth: .infinity, alignment: .center)
                Spacer()
            } else {
                VStack(spacing: 8) {
                    ForEach(entry.topPlans.prefix(2)) { plan in
                        Link(destination: URL(string: plan.deepLink)!) {
                            VStack(alignment: .leading, spacing: 4) {
                                // Plan Name & Status Badge
                                HStack {
                                    HStack(spacing: 4) {
                                        Circle()
                                            .fill(priorityColor(for: plan.priority))
                                            .frame(width: 6, height: 6)
                                        Text(plan.name)
                                            .font(.system(size: 11, weight: .bold, design: .rounded))
                                            .foregroundColor(Color(UIColor.label))
                                            .lineLimit(1)
                                    }

                                    Spacer()

                                    // Forecast Status Badge (e.g. On Track or Delayed)
                                    HStack(spacing: 3) {
                                        Text(plan.statusFlag)
                                            .font(.system(size: 8, weight: .heavy, design: .rounded))
                                            .padding(.horizontal, 5)
                                            .padding(.vertical, 1.5)
                                            .background(
                                                Capsule()
                                                    .fill(plan.isDelayed
                                                          ? Color.red.opacity(0.15)
                                                          : Color.green.opacity(0.15))
                                            )
                                            .foregroundColor(plan.isDelayed ? .red : .green)

                                        Text(String(format: "%.0f k", plan.remainingAmount / 1000.0))
                                            .font(.system(size: 9, weight: .medium))
                                            .foregroundColor(Color(UIColor.secondaryLabel))
                                    }
                                }

                                // Progress Bar + Percentage
                                HStack(spacing: 6) {
                                    GeometryReader { geo in
                                        ZStack(alignment: .leading) {
                                            Capsule()
                                                .fill(Color(UIColor.tertiarySystemFill))
                                                .frame(height: 5)

                                            Capsule()
                                                .fill(priorityColor(for: plan.priority))
                                                .frame(width: max(4, geo.size.width * CGFloat(plan.progressPercent) / 100.0), height: 5)
                                        }
                                    }
                                    .frame(height: 5)

                                    Text("\(plan.progressPercent)%")
                                        .font(.system(size: 9, weight: .bold, design: .rounded))
                                        .foregroundColor(Color(UIColor.secondaryLabel))
                                        .frame(width: 28, alignment: .trailing)
                                }
                            }
                            .padding(8)
                            .background(
                                RoundedRectangle(cornerRadius: 10, style: .continuous)
                                    .fill(Color(UIColor.tertiarySystemBackground))
                            )
                        }
                    }
                }
            }

            Spacer(minLength: 0)

            // Bottom Quick-Log Strip
            HStack {
                HStack(spacing: 4) {
                    Text("Unallocated:")
                        .font(.system(size: 9, weight: .medium))
                        .foregroundColor(Color(UIColor.secondaryLabel))
                    Text(entry.unallocatedBalanceFormatted)
                        .font(.system(size: 9, weight: .bold, design: .rounded))
                        .foregroundColor(Color(UIColor.label))
                }

                Spacer()

                HStack(spacing: 6) {
                    Link(destination: URL(string: "myapp://add-expense")!) {
                        Text("- Expense")
                            .font(.system(size: 8, weight: .bold, design: .rounded))
                            .foregroundColor(.red)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(Capsule().fill(Color.red.opacity(0.12)))
                    }

                    Link(destination: URL(string: "myapp://add-income")!) {
                        Text("+ Income")
                            .font(.system(size: 8, weight: .bold, design: .rounded))
                            .foregroundColor(.green)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(Capsule().fill(Color.green.opacity(0.12)))
                    }
                }
            }
        }
        .padding(12)
        .widgetBackground(Color(UIColor.secondarySystemBackground))
    }
}

// MARK: - Widget Configurations

public struct QuickLogWidget: Widget {
    public let kind: String = "QuickLogWidget"

    public init() {}

    public var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: QuickLogTimelineProvider()) { entry in
            QuickLogWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Quick Log")
        .description("View unallocated IQD balance and log expenses or income directly.")
        .supportedFamilies([.systemSmall])
    }
}

public struct PlansTrackerWidget: Widget {
    public let kind: String = "PlansTrackerWidget"

    public init() {}

    public var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: PlansTrackerTimelineProvider()) { entry in
            PlansTrackerWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Priority Plans Tracker")
        .description("Monitor your active financial goals, progress bars, and forecast status.")
        .supportedFamilies([.systemMedium])
    }
}

// MARK: - Widget Bundle Entry Point

@main
struct FinanceWidgetBundle: WidgetBundle {
    var body: some Widget {
        QuickLogWidget()
        PlansTrackerWidget()
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
