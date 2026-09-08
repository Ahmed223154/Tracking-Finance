import Foundation
import SwiftUI

@Observable
final class FinancialEngine {
    static let shared = FinancialEngine()

    // MARK: - Core Calculations

    /// Total sum of all income transactions
    func totalIncome(transactions: [TransactionItem]) -> Double {
        transactions
            .filter { $0.type.lowercased() == "income" }
            .reduce(0.0) { $0 + $1.amount }
    }

    /// Total sum of all expense transactions
    func totalExpenses(transactions: [TransactionItem]) -> Double {
        transactions
            .filter { $0.type.lowercased() == "expense" }
            .reduce(0.0) { $0 + $1.amount }
    }

    /// Actual balance = totalIncome - totalExpenses
    func actualBalance(transactions: [TransactionItem]) -> Double {
        totalIncome(transactions: transactions) - totalExpenses(transactions: transactions)
    }

    /// Total allocated amount for all active (uncompleted) goals
    func totalAllocatedToGoals(goals: [GoalItem]) -> Double {
        goals
            .filter { !$0.isCompleted }
            .reduce(0.0) { $0 + $1.allocatedAmount }
    }

    /// Unallocated / Available balance = actualBalance - totalAllocatedToGoals
    func unallocatedBalance(transactions: [TransactionItem], goals: [GoalItem]) -> Double {
        actualBalance(transactions: transactions) - totalAllocatedToGoals(goals: goals)
    }

    /// Income in a specific month
    func monthlyIncome(transactions: [TransactionItem], date: Date = Date()) -> Double {
        let calendar = Calendar.current
        return transactions
            .filter {
                $0.type.lowercased() == "income" &&
                calendar.isDate($0.date, equalTo: date, toGranularity: .month) &&
                calendar.isDate($0.date, equalTo: date, toGranularity: .year)
            }
            .reduce(0.0) { $0 + $1.amount }
    }

    /// Expenses in a specific month
    func monthlyExpenses(transactions: [TransactionItem], date: Date = Date()) -> Double {
        let calendar = Calendar.current
        return transactions
            .filter {
                $0.type.lowercased() == "expense" &&
                calendar.isDate($0.date, equalTo: date, toGranularity: .month) &&
                calendar.isDate($0.date, equalTo: date, toGranularity: .year)
            }
            .reduce(0.0) { $0 + $1.amount }
    }

    /// Net savings in a specific month = monthlyIncome - monthlyExpenses
    func monthlySavings(transactions: [TransactionItem], date: Date = Date()) -> Double {
        monthlyIncome(transactions: transactions, date: date) - monthlyExpenses(transactions: transactions, date: date)
    }

    /// Historical monthly average savings calculated across distinct calendar months with transactions
    func historicalMonthlyAverageSavings(transactions: [TransactionItem]) -> Double {
        guard !transactions.isEmpty else { return 0.0 }
        let calendar = Calendar.current
        var monthBuckets: [String: (income: Double, expense: Double)] = [:]

        for item in transactions {
            let year = calendar.component(.year, from: item.date)
            let month = calendar.component(.month, from: item.date)
            let key = "\(year)-\(month)"
            var current = monthBuckets[key] ?? (income: 0.0, expense: 0.0)
            if item.type.lowercased() == "income" {
                current.income += item.amount
            } else {
                current.expense += item.amount
            }
            monthBuckets[key] = current
        }

        guard !monthBuckets.isEmpty else { return 0.0 }
        let totalNet = monthBuckets.values.reduce(0.0) { $0 + ($1.income - $1.expense) }
        return totalNet / Double(monthBuckets.count)
    }

    // MARK: - Goal Achievability Assessment

    struct GoalAnalysis {
        enum Status {
            case completed
            case achievable
            case atRisk
            case unlikely
        }

        let status: Status
        let statusTitle: String
        let statusColor: Color
        let explanation: String
        let requiredMonthlySavings: Double?
        let monthsRemaining: Int?
        let shortfallMonthly: Double?
        let extensionMonths: Int?
    }

    func analyzeGoal(
        goal: GoalItem,
        unallocatedBalance: Double,
        historicalAvgSavings: Double
    ) -> GoalAnalysis {
        if goal.isCompleted || goal.allocatedAmount >= goal.targetAmount {
            return GoalAnalysis(
                status: .completed,
                statusTitle: "Completed",
                statusColor: .green,
                explanation: "Goal achieved!",
                requiredMonthlySavings: 0,
                monthsRemaining: 0,
                shortfallMonthly: nil,
                extensionMonths: nil
            )
        }

        let remainingAmount = max(0.0, goal.targetAmount - goal.allocatedAmount)

        // Case A: Goal without Target Date
        guard let targetDate = goal.targetDate else {
            if unallocatedBalance >= remainingAmount {
                return GoalAnalysis(
                    status: .achievable,
                    statusTitle: "Achievable",
                    statusColor: .green,
                    explanation: "Achievable immediately with current unallocated balance.",
                    requiredMonthlySavings: nil,
                    monthsRemaining: nil,
                    shortfallMonthly: nil,
                    extensionMonths: nil
                )
            } else {
                let shortfall = remainingAmount - unallocatedBalance
                return GoalAnalysis(
                    status: .atRisk,
                    statusTitle: "Not Currently Achievable",
                    statusColor: .orange,
                    explanation: "Shortfall: \(CurrencyFormatter.format(shortfall)) from current available cash.",
                    requiredMonthlySavings: nil,
                    monthsRemaining: nil,
                    shortfallMonthly: shortfall,
                    extensionMonths: nil
                )
            }
        }

        // Case B: Goal with Target Date
        let calendar = Calendar.current
        let comps = calendar.dateComponents([.month], from: Date(), to: targetDate)
        let monthsRemaining = max(1, comps.month ?? 1)
        let requiredMonthly = remainingAmount / Double(monthsRemaining)

        if historicalAvgSavings >= (requiredMonthly * 1.15) {
            return GoalAnalysis(
                status: .achievable,
                statusTitle: "Achievable",
                statusColor: .green,
                explanation: "On track! Required: \(CurrencyFormatter.format(requiredMonthly))/mo (Your avg savings: \(CurrencyFormatter.format(historicalAvgSavings))/mo)",
                requiredMonthlySavings: requiredMonthly,
                monthsRemaining: monthsRemaining,
                shortfallMonthly: nil,
                extensionMonths: nil
            )
        } else if historicalAvgSavings >= requiredMonthly {
            let tightMargin = (requiredMonthly * 1.15) - historicalAvgSavings
            return GoalAnalysis(
                status: .atRisk,
                statusTitle: "At Risk (Tight Margin)",
                statusColor: .orange,
                explanation: "Buffer is under 15%. Required: \(CurrencyFormatter.format(requiredMonthly))/mo",
                requiredMonthlySavings: requiredMonthly,
                monthsRemaining: monthsRemaining,
                shortfallMonthly: tightMargin,
                extensionMonths: nil
            )
        } else {
            let shortfallMonthly = max(0, requiredMonthly - historicalAvgSavings)
            var extensionMonths: Int? = nil
            if historicalAvgSavings > 0 {
                let monthsNeededAtCurrentRate = Int(ceil(remainingAmount / historicalAvgSavings))
                extensionMonths = max(1, monthsNeededAtCurrentRate - monthsRemaining)
            }

            return GoalAnalysis(
                status: .unlikely,
                statusTitle: "Unlikely to Be Achievable",
                statusColor: .red,
                explanation: "Monthly shortfall of \(CurrencyFormatter.format(shortfallMonthly))/mo at your current average savings.",
                requiredMonthlySavings: requiredMonthly,
                monthsRemaining: monthsRemaining,
                shortfallMonthly: shortfallMonthly,
                extensionMonths: extensionMonths
            )
        }
    }
}
