import WidgetKit
import SwiftUI

// MARK: - iOS 17 Container Background Compatibility Helper
extension View {
    @ViewBuilder
    func widgetBackground(_ backgroundView: some View) -> some View {
        if #available(iOSApplicationExtension 17.0, *) {
            containerBackground(for: .widget) {
                backgroundView
            }
        } else {
            background(backgroundView)
        }
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let balance: Double
    let unallocated: Double
    let priorityPlanName: String
    let priorityPlanProgress: Double
}

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(
            date: Date(),
            balance: 0.0,
            unallocated: 0.0,
            priorityPlanName: "Emergency Fund",
            priorityPlanProgress: 0.65
        )
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> Void) {
        let entry = readCurrentEntry()
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> Void) {
        let entry = readCurrentEntry()
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date()) ?? Date()
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }

    private func readCurrentEntry() -> SimpleEntry {
        let defaults = UserDefaults(suiteName: "group.com.ahmedalrubaye.financeapp")
        let balance = defaults?.double(forKey: "cached_balance") ?? 0.0
        let unallocated = defaults?.double(forKey: "cached_unallocated") ?? 0.0
        let planName = defaults?.string(forKey: "cached_priority_plan_name") ?? "No Active Plan"
        let planProgress = defaults?.double(forKey: "cached_priority_plan_progress") ?? 0.0

        return SimpleEntry(
            date: Date(),
            balance: balance,
            unallocated: unallocated,
            priorityPlanName: planName,
            priorityPlanProgress: planProgress
        )
    }
}

struct FinanceWidgetEntryView: View {
    var entry: SimpleEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            // Balance & Unallocated Header
            HStack {
                VStack(alignment: .leading) {
                    Text("Total Balance")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text("\(entry.balance, format: .number.precision(.fractionLength(0))) IQD")
                        .font(.system(size: 15, weight: .bold))
                }
                Spacer()
                VStack(alignment: .trailing) {
                    Text("Unallocated")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text("\(entry.unallocated, format: .number.precision(.fractionLength(0))) IQD")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundColor(.orange)
                }
            }

            Divider()

            // Highest Priority Plan Section
            VStack(alignment: .leading, spacing: 2) {
                HStack {
                    Text(entry.priorityPlanName)
                        .font(.caption)
                        .fontWeight(.medium)
                        .lineLimit(1)
                    Spacer()
                    Text("\(Int(entry.priorityPlanProgress * 100))%")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
                ProgressView(value: min(max(entry.priorityPlanProgress, 0.0), 1.0))
                    .tint(.blue)
            }

            Spacer(minLength: 2)

            // Quick Add Action Buttons
            HStack(spacing: 8) {
                Link(destination: URL(string: "trackingfinance://quick-add?type=expense")!) {
                    HStack(spacing: 4) {
                        Image(systemName: "minus.circle.fill")
                            .foregroundColor(.red)
                        Text("Expense")
                            .font(.system(size: 11, weight: .bold))
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 5)
                    .background(Color.white.opacity(0.12))
                    .cornerRadius(6)
                }

                Link(destination: URL(string: "trackingfinance://quick-add?type=income")!) {
                    HStack(spacing: 4) {
                        Image(systemName: "plus.circle.fill")
                            .foregroundColor(.green)
                        Text("Income")
                            .font(.system(size: 11, weight: .bold))
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 5)
                    .background(Color.white.opacity(0.12))
                    .cornerRadius(6)
                }
            }
        }
        .padding(8)
        .widgetBackground(Color(UIColor.systemBackground))
    }
}

@main
struct FinanceWidget: Widget {
    let kind: String = "FinanceWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            FinanceWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Finance Tracker")
        .description("Quick balances and transaction logging.")
        .supportedFamilies([.systemSmall, .systemMedium])
        #if compiler(>=5.9)
        .contentMarginsDisabled()
        #endif
    }
}
