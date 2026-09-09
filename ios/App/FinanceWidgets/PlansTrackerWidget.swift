//
//  PlansTrackerWidget.swift
//  FinanceWidgets
//
//  Created for FinanceApp (Developer: Ahmed AL KUBAISI)
//  Widget B: "Plans Tracker" (Medium 2x4 Widget)
//

import WidgetKit
import SwiftUI

public struct PlansTrackerEntry: TimelineEntry {
    public let date: Date
    public let topPlans: [WidgetPlanItem]
    public let currency: String

    public init(date: Date, topPlans: [WidgetPlanItem], currency: String) {
        self.date = date
        self.topPlans = topPlans
        self.currency = currency
    }
}

public struct PlansTrackerTimelineProvider: TimelineProvider {
    public init() {}

    public func placeholder(in context: Context) -> PlansTrackerEntry {
        let payload = WidgetDataPayload.placeholder
        return PlansTrackerEntry(
            date: Date(),
            topPlans: payload.topPlans,
            currency: payload.currency
        )
    }

    public func getSnapshot(in context: Context, completion: @escaping (PlansTrackerEntry) -> Void) {
        let payload = SharedDataBridge.shared.readWidgetPayload()
        let entry = PlansTrackerEntry(
            date: Date(),
            topPlans: payload.topPlans,
            currency: payload.currency
        )
        completion(entry)
    }

    public func getTimeline(in context: Context, completion: @escaping (Timeline<PlansTrackerEntry>) -> Void) {
        let payload = SharedDataBridge.shared.readWidgetPayload()
        let entry = PlansTrackerEntry(
            date: Date(),
            topPlans: payload.topPlans,
            currency: payload.currency
        )

        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date()) ?? Date()
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
}

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
            // Widget Header
            HStack {
                Label("Priority Plans", systemImage: "target")
                    .font(.system(size: 11, weight: .bold, design: .rounded))
                    .foregroundColor(Color(UIColor.label))

                Spacer()

                Link(destination: URL(string: "myapp://plans-dashboard")!) {
                    HStack(spacing: 2) {
                        Text("Dashboard")
                            .font(.system(size: 9, weight: .semibold))
                        Image(systemName: "chevron.right")
                            .font(.system(size: 8, weight: .bold))
                    }
                    .foregroundColor(Color(red: 0.0, green: 0.48, blue: 1.0)) // iOS Blue
                }
            }
            .padding(.bottom, 2)

            // Top 2 Plans Rows
            if entry.topPlans.isEmpty {
                Spacer()
                Text("No active plans found")
                    .font(.system(size: 11, weight: .medium))
                    .foregroundColor(Color(UIColor.secondaryLabel))
                    .frame(maxWidth: .infinity, alignment: .center)
                Spacer()
            } else {
                VStack(spacing: 8) {
                    ForEach(entry.topPlans) { plan in
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

                                    // Forecast Status Badge (e.g. 🟢 On Track or 🔴 +1 Mo Delay)
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

                                        Text(String(format: "%.0f k IQD", plan.remainingAmount / 1000.0))
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
                                        .foregroundColor(Color(UIColor.label))
                                        .frame(width: 28, alignment: .trailing)
                                }
                            }
                            .padding(.horizontal, 8)
                            .padding(.vertical, 6)
                            .background(
                                RoundedRectangle(cornerRadius: 10, style: .continuous)
                                    .fill(Color(UIColor.tertiarySystemBackground).opacity(0.8))
                            )
                        }
                    }
                }
            }
        }
        .padding(14)
        .widgetBackground(Color(UIColor.secondarySystemBackground))
    }
}

public struct PlansTrackerWidget: Widget {
    public let kind: String = "PlansTrackerWidget"

    public init() {}

    public var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: PlansTrackerTimelineProvider()) { entry in
            PlansTrackerWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Plans Tracker")
        .description("Track top priority financial goals, funding progress, and delays.")
        .supportedFamilies([.systemMedium])
    }
}
