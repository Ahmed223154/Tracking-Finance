import SwiftUI
import SwiftData

struct PlansDashboardView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \GoalItem.createdAt, order: .reverse) private var allGoals: [GoalItem]
    @Query private var transactions: [TransactionItem]

    @Binding var selectedTab: Int

    @State private var incomeBoost: Double = 0.0
    @State private var expenseCut: Double = 0.0
    @State private var lumpSum: Double = 0.0

    private let engine = FinancialEngine.shared

    private var activeGoals: [GoalItem] {
        allGoals.filter { !$0.isCompleted }
    }

    private var unallocatedBalance: Double {
        engine.unallocatedBalance(transactions: transactions, goals: allGoals)
    }

    private var monthlyCapacity: Double {
        let monthly = engine.monthlySavings(transactions: transactions)
        return monthly > 0 ? monthly : max(0.0, engine.historicalMonthlyAverageSavings(transactions: transactions))
    }

    private var totalPlannedMonthlyCommitment: Double {
        activeGoals.reduce(0.0) { sum, goal in
            let remaining = max(0.0, goal.targetAmount - goal.allocatedAmount)
            if let date = goal.targetDate {
                let months = max(1, Calendar.current.dateComponents([.month], from: Date(), to: date).month ?? 1)
                return sum + (remaining / Double(months))
            }
            return sum + (remaining / 12.0)
        }
    }

    private var capacityVariance: Double {
        monthlyCapacity - totalPlannedMonthlyCommitment
    }

    private var healthStatus: String {
        if capacityVariance >= 0 {
            return "Healthy"
        } else if abs(capacityVariance) < (monthlyCapacity * 0.2) {
            return "Tight"
        } else {
            return "Overcommitted"
        }
    }

    private var healthColor: Color {
        switch healthStatus {
        case "Healthy": return .green
        case "Tight": return .orange
        default: return .red
        }
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // MARK: - Financial Position & Capacity Header
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("FINANCIAL POSITION")
                                    .font(.caption2)
                                    .fontWeight(.bold)
                                    .foregroundColor(.secondary)
                                Text("Planning Control Center")
                                    .font(.system(.title2, design: .rounded, weight: .bold))
                            }
                            Spacer()
                            Text(healthStatus)
                                .font(.caption2)
                                .fontWeight(.black)
                                .padding(.horizontal, 10)
                                .padding(.vertical, 4)
                                .background(healthColor.opacity(0.15))
                                .foregroundColor(healthColor)
                                .clipShape(Capsule())
                        }

                        // Capacity Metric Cards
                        HStack(spacing: 12) {
                            VStack(alignment: .leading, spacing: 4) {
                                Text("MONTHLY CAPACITY")
                                    .font(.system(size: 10, weight: .bold))
                                    .foregroundColor(.secondary)
                                Text(CurrencyFormatter.format(monthlyCapacity))
                                    .font(.system(.title3, design: .rounded, weight: .bold))
                                    .foregroundColor(.green)
                                Text("Available monthly flow")
                                    .font(.system(size: 10))
                                    .foregroundColor(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(14)
                            .background(Color(.secondarySystemBackground))
                            .cornerRadius(16)

                            VStack(alignment: .leading, spacing: 4) {
                                Text("PLANNED COMMITMENT")
                                    .font(.system(size: 10, weight: .bold))
                                    .foregroundColor(.secondary)
                                Text(CurrencyFormatter.format(totalPlannedMonthlyCommitment))
                                    .font(.system(.title3, design: .rounded, weight: .bold))
                                    .foregroundColor(.blue)
                                Text("\(activeGoals.count) active plans")
                                    .font(.system(size: 10))
                                    .foregroundColor(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(14)
                            .background(Color(.secondarySystemBackground))
                            .cornerRadius(16)
                        }

                        // Variance Indicator
                        HStack {
                            Label(
                                capacityVariance >= 0 ? "Capacity Surplus" : "Capacity Deficit",
                                systemImage: capacityVariance >= 0 ? "checkmark.circle.fill" : "exclamationmark.triangle.fill"
                            )
                            .font(.footnote)
                            .foregroundColor(.secondary)

                            Spacer()

                            Text("\(capacityVariance >= 0 ? "+" : "")\(CurrencyFormatter.format(capacityVariance))/mo")
                                .font(.footnote)
                                .fontWeight(.bold)
                                .foregroundColor(capacityVariance >= 0 ? .green : .red)
                        }
                        .padding(12)
                        .background(Color(.secondarySystemBackground))
                        .cornerRadius(12)
                    }
                    .padding(18)
                    .background(Color(.systemBackground))
                    .cornerRadius(20)
                    .shadow(color: Color.black.opacity(0.04), radius: 8, x: 0, y: 2)

                    // MARK: - Navigation to Plans List
                    Button(action: {
                        selectedTab = 4 // Navigate to Plans Tab
                    }) {
                        HStack {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Manage Individual Plans")
                                    .font(.headline)
                                    .foregroundColor(.primary)
                                Text("\(activeGoals.count) active plans awaiting allocation")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            Spacer()
                            Image(systemName: "arrow.right.circle.fill")
                                .font(.title2)
                                .foregroundColor(.indigo)
                        }
                        .padding(16)
                        .background(Color(.systemBackground))
                        .cornerRadius(16)
                        .shadow(color: Color.black.opacity(0.03), radius: 6, x: 0, y: 2)
                    }

                    // MARK: - What-If Planning Simulator
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            Image(systemName: "slider.horizontal.3")
                                .foregroundColor(.indigo)
                            Text("What-If Planning Simulator")
                                .font(.system(.headline, design: .rounded))
                            Spacer()
                            if incomeBoost > 0 || expenseCut > 0 || lumpSum > 0 {
                                Button("Reset") {
                                    incomeBoost = 0
                                    expenseCut = 0
                                    lumpSum = 0
                                }
                                .font(.caption)
                                .foregroundColor(.indigo)
                            }
                        }

                        Text("Test how increasing income, reducing expenses, or adding a lump sum accelerates your plans.")
                            .font(.caption)
                            .foregroundColor(.secondary)

                        // Income boost slider
                        VStack(alignment: .leading, spacing: 6) {
                            HStack {
                                Text("Monthly Income Boost")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("+\(CurrencyFormatter.format(incomeBoost))")
                                    .font(.caption)
                                    .fontWeight(.bold)
                                    .foregroundColor(.green)
                            }
                            Slider(value: $incomeBoost, in: 0...5_000_000, step: 50_000)
                                .tint(.green)
                        }

                        // Expense cut slider
                        VStack(alignment: .leading, spacing: 6) {
                            HStack {
                                Text("Monthly Expense Reduction")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("-\(CurrencyFormatter.format(expenseCut))")
                                    .font(.caption)
                                    .fontWeight(.bold)
                                    .foregroundColor(.blue)
                            }
                            Slider(value: $expenseCut, in: 0...3_000_000, step: 25_000)
                                .tint(.blue)
                        }

                        // Lump sum slider
                        VStack(alignment: .leading, spacing: 6) {
                            HStack {
                                Text("Lump Sum Injection")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("+\(CurrencyFormatter.format(lumpSum))")
                                    .font(.caption)
                                    .fontWeight(.bold)
                                    .foregroundColor(.indigo)
                            }
                            Slider(value: $lumpSum, in: 0...20_000_000, step: 250_000)
                                .tint(.indigo)
                        }

                        // Simulated Result Box
                        let adjustedCapacity = monthlyCapacity + incomeBoost + expenseCut
                        let simulatedVariance = adjustedCapacity - totalPlannedMonthlyCommitment

                        VStack(spacing: 8) {
                            HStack {
                                Text("Adjusted Monthly Capacity:")
                                    .font(.footnote)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text(CurrencyFormatter.format(adjustedCapacity))
                                    .font(.footnote)
                                    .fontWeight(.bold)
                                    .foregroundColor(.green)
                            }

                            HStack {
                                Text("Simulated Monthly Variance:")
                                    .font(.footnote)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("\(simulatedVariance >= 0 ? "+" : "")\(CurrencyFormatter.format(simulatedVariance))/mo")
                                    .font(.footnote)
                                    .fontWeight(.bold)
                                    .foregroundColor(simulatedVariance >= 0 ? .green : .red)
                            }
                        }
                        .padding(12)
                        .background(Color(.secondarySystemBackground))
                        .cornerRadius(12)
                    }
                    .padding(18)
                    .background(Color(.systemBackground))
                    .cornerRadius(20)
                    .shadow(color: Color.black.opacity(0.04), radius: 8, x: 0, y: 2)
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
            }
            .navigationTitle("Plans Dashboard")
            .navigationBarTitleDisplayMode(.inline)
            .background(Color(.systemGroupedBackground))
        }
    }
}
