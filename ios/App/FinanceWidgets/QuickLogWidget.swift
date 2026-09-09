//
//  QuickLogWidget.swift
//  FinanceWidgets
//
//  Created for FinanceApp (Developer: Ahmed AL KUBAISI)
//  Widget A: "Quick Log" (Small 2x2 Widget)
//

import WidgetKit
import SwiftUI

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

        // Refresh timeline every 15 minutes or when notified by app via WidgetCenter.shared.reloadAllTimelines()
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date()) ?? Date()
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
}

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
                .font(.system(size: 17, weight: .heavy, design: .rounded))
                .foregroundColor(Color(UIColor.label))
                .lineLimit(1)
                .minimumScaleFactor(0.7)

            Text("Available in IQD")
                .font(.system(size: 8, weight: .medium))
                .foregroundColor(Color(UIColor.tertiaryLabel))
                .padding(.bottom, 8)

            Spacer()

            // Bottom Tap Targets / Deep-Link Action Buttons
            HStack(spacing: 6) {
                // [ + Expense ] -> myapp://add-expense
                Link(destination: URL(string: "myapp://add-expense")!) {
                    VStack(spacing: 2) {
                        Image(systemName: "minus.circle.fill")
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(Color(red: 1.0, green: 0.23, blue: 0.19)) // iOS Red
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
                            .foregroundColor(Color(red: 0.20, green: 0.78, blue: 0.35)) // iOS Green
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
        .padding(14)
        .widgetBackground(Color(UIColor.secondarySystemBackground))
    }
}

public struct QuickLogWidget: Widget {
    public let kind: String = "QuickLogWidget"

    public init() {}

    public var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: QuickLogTimelineProvider()) { entry in
            QuickLogWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Quick Log")
        .description("View unallocated IQD balance and log expenses or income instantly.")
        .supportedFamilies([.systemSmall])
    }
}

// iOS 17+ Widget Background extension helper
extension View {
    func widgetBackground(_ backgroundView: some View) -> some View {
        if #available(iOSApplicationExtension 17.0, *) {
            return containerBackground(for: .widget) {
                backgroundView
            }
        } else {
            return background(backgroundView)
        }
    }
}
