import SwiftUI
import SwiftData
import Charts

struct AnalyticsView: View {
    @Query(sort: \TransactionItem.date, order: .reverse) private var transactions: [TransactionItem]

    enum TimeRange: String, CaseIterable, Identifiable {
        case thisWeek = "This Week"
        case thisMonth = "This Month"
        case lastMonth = "Last Month"
        case last3Months = "Last 3M"
        case last6Months = "Last 6M"
        case thisYear = "This Year"
        case allTime = "All Time"

        var id: String { rawValue }
    }

    @State private var selectedRange: TimeRange = .thisMonth

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Time range picker
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            ForEach(TimeRange.allCases) { range in
                                Button {
                                    selectedRange = range
                                } label: {
                                    Text(range.rawValue)
                                        .font(.caption.weight(.semibold))
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 7)
                                        .background(selectedRange == range ? Color.indigo : Color(.secondarySystemBackground))
                                        .foregroundColor(selectedRange == range ? .white : .primary)
                                        .clipShape(Capsule())
                                }
                            }
                        }
                        .padding(.horizontal)
                    }

                    // Key Summary Metrics Card
                    summaryMetricsCard

                    // Chart 1: Income vs Expenses (BarMark)
                    incomeVsExpensesChart

                    // Chart 2: Spending by Category (SectorMark or BarMark)
                    spendingByCategoryChart

                    // Chart 3: Net Savings Trend (LineMark)
                    netSavingsTrendChart
                }
                .padding(.vertical, 12)
            }
            .navigationTitle("Analytics")
        }
    }

    // MARK: - Filtered Transactions by Time Range

    private var filteredTransactions: [TransactionItem] {
        let calendar = Calendar.current
        let now = Date()

        return transactions.filter { item in
            switch selectedRange {
            case .thisWeek:
                return calendar.isDate(item.date, equalTo: now, toGranularity: .weekOfYear)
            case .thisMonth:
                return calendar.isDate(item.date, equalTo: now, toGranularity: .month) &&
                       calendar.isDate(item.date, equalTo: now, toGranularity: .year)
            case .lastMonth:
                guard let lastMonth = calendar.date(byAdding: .month, value: -1, to: now) else { return false }
                return calendar.isDate(item.date, equalTo: lastMonth, toGranularity: .month) &&
                       calendar.isDate(item.date, equalTo: lastMonth, toGranularity: .year)
            case .last3Months:
                guard let cutoff = calendar.date(byAdding: .month, value: -3, to: now) else { return false }
                return item.date >= cutoff
            case .last6Months:
                guard let cutoff = calendar.date(byAdding: .month, value: -6, to: now) else { return false }
                return item.date >= cutoff
            case .thisYear:
                return calendar.isDate(item.date, equalTo: now, toGranularity: .year)
            case .allTime:
                return true
            }
        }
    }

    private var periodIncome: Double {
        filteredTransactions.filter { $0.type == "income" }.reduce(0) { $0 + $1.amount }
    }

    private var periodExpenses: Double {
        filteredTransactions.filter { $0.type == "expense" }.reduce(0) { $0 + $1.amount }
    }

    private var savingsRate: Double {
        guard periodIncome > 0 else { return 0.0 }
        let net = periodIncome - periodExpenses
        return max(0.0, (net / periodIncome) * 100.0)
    }

    private var largestExpense: TransactionItem? {
        filteredTransactions
            .filter { $0.type == "expense" }
            .max(by: { $0.amount < $1.amount })
    }

    private var highestSpendingCategory: (name: String, amount: Double)? {
        var catTotals: [String: Double] = [:]
        for item in filteredTransactions where item.type == "expense" {
            catTotals[item.category, default: 0] += item.amount
        }
        guard let maxEntry = catTotals.max(by: { $0.value < $1.value }) else { return nil }
        return (maxEntry.key, maxEntry.value)
    }

    // MARK: - Summary Metrics Card

    private var summaryMetricsCard: some View {
        VStack(spacing: 12) {
            HStack(spacing: 12) {
                metricBox(
                    title: "Savings Rate",
                    value: String(format: "%.1f%%", savingsRate),
                    color: savingsRate >= 20 ? .green : (savingsRate > 0 ? .orange : .red),
                    subtitle: "of total period income"
                )
                metricBox(
                    title: "Net Saved",
                    value: CurrencyFormatter.format(periodIncome - periodExpenses),
                    color: (periodIncome - periodExpenses) >= 0 ? .indigo : .red,
                    subtitle: "\(selectedRange.rawValue) balance"
                )
            }

            HStack(spacing: 12) {
                metricBox(
                    title: "Largest Expense",
                    value: largestExpense != nil ? CurrencyFormatter.format(largestExpense!.amount) : "0 IQD",
                    color: .primary,
                    subtitle: largestExpense?.category ?? "None"
                )
                metricBox(
                    title: "Top Category",
                    value: highestSpendingCategory?.name ?? "None",
                    color: .primary,
                    subtitle: highestSpendingCategory != nil ? CurrencyFormatter.format(highestSpendingCategory!.amount) : "0 IQD"
                )
            }
        }
        .padding(.horizontal)
    }

    private func metricBox(title: String, value: String, color: Color, subtitle: String) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(.caption2)
                .foregroundColor(.secondary)
            Text(value)
                .font(.system(.subheadline, design: .rounded, weight: .bold))
                .foregroundColor(color)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
            Text(subtitle)
                .font(.system(size: 10))
                .foregroundColor(.secondary)
                .lineLimit(1)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(14)
    }

    // MARK: - Chart 1: Income vs Expenses

    struct ComparisonBarData: Identifiable {
        let id = UUID()
        let category: String
        let amount: Double
        let color: Color
    }

    private var incomeVsExpensesChart: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Income vs. Expenses")
                .font(.system(.headline, design: .rounded))

            let data: [ComparisonBarData] = [
                ComparisonBarData(category: "Total Income", amount: periodIncome, color: .green),
                ComparisonBarData(category: "Total Expenses", amount: periodExpenses, color: .red)
            ]

            Chart(data) { item in
                BarMark(
                    x: .value("Type", item.category),
                    y: .value("Amount", item.amount)
                )
                .foregroundStyle(item.color.gradient)
                .cornerRadius(8)
            }
            .frame(height: 180)
            .chartYAxis {
                AxisMarks(position: .leading) { value in
                    AxisValueLabel {
                        if let d = value.as(Double.self) {
                            Text("\(Int(d / 1_000_000))M")
                                .font(.caption2)
                        }
                    }
                }
            }

            HStack {
                HStack(spacing: 4) {
                    Circle().fill(Color.green).frame(width: 8, height: 8)
                    Text("Income: \(CurrencyFormatter.format(periodIncome))")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
                Spacer()
                HStack(spacing: 4) {
                    Circle().fill(Color.red).frame(width: 8, height: 8)
                    Text("Expenses: \(CurrencyFormatter.format(periodExpenses))")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
        .padding(.horizontal)
    }

    // MARK: - Chart 2: Spending by Category

    struct CategoryExpense: Identifiable {
        let id = UUID()
        let category: String
        let amount: Double
    }

    private var categoryExpensesData: [CategoryExpense] {
        var dict: [String: Double] = [:]
        for item in filteredTransactions where item.type == "expense" {
            dict[item.category, default: 0] += item.amount
        }
        return dict.map { CategoryExpense(category: $0.key, amount: $0.value) }
            .sorted(by: { $0.amount > $1.amount })
    }

    private var spendingByCategoryChart: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Spending by Category")
                .font(.system(.headline, design: .rounded))

            if categoryExpensesData.isEmpty {
                Text("No expenses in this period.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .padding(.vertical, 20)
            } else {
                // Horizontal Ranked Bars using Swift Charts
                Chart(categoryExpensesData.prefix(6)) { cat in
                    BarMark(
                        x: .value("Amount", cat.amount),
                        y: .value("Category", cat.category)
                    )
                    .foregroundStyle(by: .value("Category", cat.category))
                    .cornerRadius(6)
                }
                .chartLegend(.hidden)
                .frame(height: 200)

                VStack(spacing: 6) {
                    ForEach(categoryExpensesData.prefix(5)) { cat in
                        HStack {
                            Text(cat.category)
                                .font(.caption)
                                .foregroundColor(.secondary)
                            Spacer()
                            Text(CurrencyFormatter.format(cat.amount))
                                .font(.caption.weight(.semibold))
                        }
                    }
                }
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
        .padding(.horizontal)
    }

    // MARK: - Chart 3: Net Savings Trend

    struct MonthlyTrendPoint: Identifiable {
        let id = UUID()
        let monthName: String
        let savings: Double
    }

    private var trendData: [MonthlyTrendPoint] {
        let calendar = Calendar.current
        var dict: [String: (order: Date, net: Double)] = [:]

        for t in transactions {
            let startOfMonth = calendar.date(from: calendar.dateComponents([.year, .month], from: t.date)) ?? t.date
            let name = t.date.monthYearString()
            var current = dict[name] ?? (order: startOfMonth, net: 0.0)
            if t.type == "income" {
                current.net += t.amount
            } else {
                current.net -= t.amount
            }
            dict[name] = current
        }

        return dict.sorted(by: { $0.value.order < $1.value.order })
            .suffix(6)
            .map { MonthlyTrendPoint(monthName: $0.key, savings: $0.value.net) }
    }

    private var netSavingsTrendChart: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Net Savings Trend (Recent Months)")
                .font(.system(.headline, design: .rounded))

            if trendData.isEmpty {
                Text("Need more history to display trend.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .padding(.vertical, 20)
            } else {
                Chart(trendData) { point in
                    LineMark(
                        x: .value("Month", point.monthName),
                        y: .value("Net Savings", point.savings)
                    )
                    .interpolationMethod(.catmullRom)
                    .foregroundStyle(Color.indigo)

                    PointMark(
                        x: .value("Month", point.monthName),
                        y: .value("Net Savings", point.savings)
                    )
                    .foregroundStyle(point.savings >= 0 ? Color.green : Color.red)
                }
                .frame(height: 180)
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
        .padding(.horizontal)
    }
}
