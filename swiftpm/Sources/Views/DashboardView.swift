import SwiftUI
import SwiftData

struct DashboardView: View {
    @Binding var selectedTab: Int
    @Query(sort: \TransactionItem.date, order: .reverse) private var transactions: [TransactionItem]
    @Query(filter: #Predicate<GoalItem> { !$0.isCompleted }, sort: \GoalItem.createdAt) private var activeGoals: [GoalItem]

    @State private var showAddSheet: Bool = false
    private let engine = FinancialEngine.shared

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // 1. Top Balance Card (Actual Balance vs Unallocated Balance)
                    topBalanceCard

                    // 2. Monthly Performance Card
                    monthlyPerformanceCard

                    // 3. Active Goals Snapshot
                    goalsSnapshotSection

                    // 4. Recent Transactions Section
                    recentTransactionsSection
                }
                .padding(.horizontal, 16)
                .padding(.top, 12)
                .padding(.bottom, 24)
            }
            .navigationTitle("FinanceApp")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showAddSheet = true
                    } label: {
                        Image(systemName: "plus.circle.fill")
                            .font(.system(size: 22))
                            .foregroundColor(.indigo)
                    }
                }
            }
            .sheet(isPresented: $showAddSheet) {
                QuickAddTransactionSheet()
            }
        }
    }

    // MARK: - Subviews

    private var topBalanceCard: some View {
        let actualBal = engine.actualBalance(transactions: transactions)
        let unallocatedBal = engine.unallocatedBalance(transactions: transactions, goals: activeGoals)
        let totalAllocated = engine.totalAllocatedToGoals(goals: activeGoals)

        return VStack(alignment: .leading, spacing: 14) {
            HStack {
                Text("CURRENT ACTUAL BALANCE")
                    .font(.caption)
                    .fontWeight(.semibold)
                    .foregroundColor(.white.opacity(0.8))
                Spacer()
                Image(systemName: "banknote.fill")
                    .foregroundColor(.white.opacity(0.9))
            }

            Text(CurrencyFormatter.format(actualBal))
                .font(.system(size: 32, weight: .bold, design: .rounded))
                .foregroundColor(.white)
                .lineLimit(1)
                .minimumScaleFactor(0.7)

            Divider()
                .background(Color.white.opacity(0.25))

            HStack(alignment: .center) {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Available / Unallocated")
                        .font(.caption2)
                        .foregroundColor(.white.opacity(0.75))
                    Text(CurrencyFormatter.format(unallocatedBal))
                        .font(.system(.subheadline, design: .rounded, weight: .semibold))
                        .foregroundColor(.white)
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 2) {
                    Text("Allocated to Goals")
                        .font(.caption2)
                        .foregroundColor(.white.opacity(0.75))
                    Text(CurrencyFormatter.format(totalAllocated))
                        .font(.system(.subheadline, design: .rounded, weight: .semibold))
                        .foregroundColor(.white.opacity(0.9))
                }
            }
        }
        .padding(20)
        .background(
            LinearGradient(
                colors: [Color(red: 0.28, green: 0.24, blue: 0.72), Color(red: 0.18, green: 0.14, blue: 0.52)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
        .shadow(color: Color.indigo.opacity(0.25), radius: 10, x: 0, y: 6)
    }

    private var monthlyPerformanceCard: some View {
        let mIncome = engine.monthlyIncome(transactions: transactions)
        let mExpenses = engine.monthlyExpenses(transactions: transactions)
        let mSavings = engine.monthlySavings(transactions: transactions)
        let calendar = Calendar.current
        let currentMonthCount = transactions.filter {
            calendar.isDate($0.date, equalTo: Date(), toGranularity: .month) &&
            calendar.isDate($0.date, equalTo: Date(), toGranularity: .year)
        }.count

        return VStack(alignment: .leading, spacing: 14) {
            HStack {
                Text("This Month's Performance")
                    .font(.system(.headline, design: .rounded))
                Spacer()
                Text(Date().monthYearString())
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            HStack(spacing: 12) {
                metricCell(
                    title: "Income",
                    amount: mIncome,
                    color: .green,
                    icon: "arrow.down.left"
                )
                metricCell(
                    title: "Expenses",
                    amount: mExpenses,
                    color: .red,
                    icon: "arrow.up.right"
                )
            }

            HStack(spacing: 12) {
                metricCell(
                    title: "Net Savings",
                    amount: mSavings,
                    color: mSavings >= 0 ? .indigo : .red,
                    icon: "leaf.fill"
                )
                VStack(alignment: .leading, spacing: 4) {
                    Text("Transactions")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text("\(currentMonthCount)")
                        .font(.system(.title3, design: .rounded, weight: .bold))
                    Text("Recorded this month")
                        .font(.system(size: 10))
                        .foregroundColor(.secondary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(12)
                .background(Color(.secondarySystemBackground))
                .cornerRadius(12)
            }
        }
        .padding(18)
        .background(Color(.secondarySystemGroupedBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
    }

    private func metricCell(title: String, amount: Double, color: Color, icon: String) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.caption2)
                    .foregroundColor(color)
                Text(title)
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
            Text(CurrencyFormatter.format(amount))
                .font(.system(.subheadline, design: .rounded, weight: .bold))
                .foregroundColor(color)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(Color(.secondarySystemBackground))
        .cornerRadius(12)
    }

    private var goalsSnapshotSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Active Plans Snapshot")
                    .font(.system(.headline, design: .rounded))
                Spacer()
                Button("View All") {
                    selectedTab = 4 // Switch to Plans Tab
                }
                .font(.subheadline)
                .foregroundColor(.indigo)
            }

            if activeGoals.isEmpty {
                HStack {
                    Image(systemName: "target")
                        .foregroundColor(.secondary)
                    Text("No active goals yet. Create one to start saving!")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color(.secondarySystemGroupedBackground))
                .cornerRadius(14)
            } else {
                VStack(spacing: 10) {
                    ForEach(activeGoals.prefix(3)) { goal in
                        let unallocated = engine.unallocatedBalance(transactions: transactions, goals: activeGoals)
                        let avgSavings = engine.historicalMonthlyAverageSavings(transactions: transactions)
                        let analysis = engine.analyzeGoal(goal: goal, unallocatedBalance: unallocated, historicalAvgSavings: avgSavings)
                        let progress = goal.targetAmount > 0 ? min(1.0, goal.allocatedAmount / goal.targetAmount) : 0.0
                        let remaining = max(0.0, goal.targetAmount - goal.allocatedAmount)

                        VStack(alignment: .leading, spacing: 8) {
                            HStack {
                                Text(goal.name)
                                    .font(.subheadline.weight(.semibold))
                                Spacer()
                                Text(analysis.statusTitle)
                                    .font(.caption2.weight(.bold))
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 3)
                                    .background(analysis.statusColor.opacity(0.15))
                                    .foregroundColor(analysis.statusColor)
                                    .clipShape(Capsule())
                            }

                            ProgressView(value: progress)
                                .tint(.indigo)

                            HStack {
                                Text("\(Int(progress * 100))% saved")
                                    .font(.caption2)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("Remaining: \(CurrencyFormatter.format(remaining))")
                                    .font(.caption2.weight(.medium))
                                    .foregroundColor(.secondary)
                            }
                        }
                        .padding(14)
                        .background(Color(.secondarySystemGroupedBackground))
                        .cornerRadius(14)
                    }
                }
            }
        }
    }

    private var recentTransactionsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Recent Transactions")
                    .font(.system(.headline, design: .rounded))
                Spacer()
                Button("View All") {
                    selectedTab = 2 // Switch to Transactions Tab
                }
                .font(.subheadline)
                .foregroundColor(.indigo)
            }

            if transactions.isEmpty {
                HStack {
                    Image(systemName: "tray")
                        .foregroundColor(.secondary)
                    Text("No transactions logged yet.")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color(.secondarySystemGroupedBackground))
                .cornerRadius(14)
            } else {
                VStack(spacing: 8) {
                    ForEach(transactions.prefix(5)) { item in
                        TransactionRow(item: item)
                    }
                }
            }
        }
    }
}
