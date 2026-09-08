//
//  SingleFileBundle.swift
//  FinanceApp (Swift Playgrounds 4+ & iOS 17+ Ready)
//
//  100% self-contained app ready to paste into Swift Playgrounds or Xcode.
//  Includes Arabic/English language toggle, RTL support, Plans Dashboard,
//  Plans management, transaction deletion & plan deletion.
//

import SwiftUI
import SwiftData
import Charts
import LocalAuthentication
import Combine
import UniformTypeIdentifiers


// MARK: - swiftpm/Sources/Models.swift
@Model
final class TransactionItem {
    var id: UUID = UUID()
    var type: String = "expense" // "income" or "expense"
    var amount: Double = 0.0
    var currency: String = "IQD"
    var date: Date = Date()
    var category: String = "Food"
    var source: String = ""
    var itemDescription: String = ""
    var notes: String = ""
    var createdAt: Date = Date()
    var updatedAt: Date = Date()

    init(
        id: UUID = UUID(),
        type: String,
        amount: Double,
        currency: String = "IQD",
        date: Date = Date(),
        category: String = "Food",
        source: String = "",
        itemDescription: String = "",
        notes: String = "",
        createdAt: Date = Date(),
        updatedAt: Date = Date()
    ) {
        self.id = id
        self.type = type
        self.amount = amount
        self.currency = currency
        self.date = date
        self.category = category
        self.source = source
        self.itemDescription = itemDescription
        self.notes = notes
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }
}

@Model
final class GoalItem {
    var id: UUID = UUID()
    var name: String = ""
    var targetAmount: Double = 0.0
    var allocatedAmount: Double = 0.0
    var currency: String = "IQD"
    var targetDate: Date? = nil
    var goalDescription: String = ""
    var planDescription: String = ""
    var priority: String = "medium" // "critical", "high", "medium", "low"
    var plannedMonthlyAmount: Double = 0.0
    var isCompleted: Bool = false
    var createdAt: Date = Date()
    var updatedAt: Date = Date()
    var completedAt: Date? = nil

    init(
        id: UUID = UUID(),
        name: String,
        targetAmount: Double,
        allocatedAmount: Double = 0.0,
        currency: String = "IQD",
        targetDate: Date? = nil,
        goalDescription: String = "",
        planDescription: String = "",
        priority: String = "medium",
        plannedMonthlyAmount: Double = 0.0,
        isCompleted: Bool = false,
        createdAt: Date = Date(),
        updatedAt: Date = Date(),
        completedAt: Date? = nil
    ) {
        self.id = id
        self.name = name
        self.targetAmount = targetAmount
        self.allocatedAmount = allocatedAmount
        self.currency = currency
        self.targetDate = targetDate
        self.goalDescription = goalDescription
        self.planDescription = planDescription.isEmpty ? goalDescription : planDescription
        self.priority = priority
        self.plannedMonthlyAmount = plannedMonthlyAmount
        self.isCompleted = isCompleted
        self.createdAt = createdAt
        self.updatedAt = updatedAt
        self.completedAt = completedAt
    }
}

typealias PlanItem = GoalItem

@Model
final class BudgetItem {
    var id: UUID = UUID()
    var category: String = ""
    var monthlyLimit: Double = 0.0
    var createdAt: Date = Date()

    init(
        id: UUID = UUID(),
        category: String,
        monthlyLimit: Double,
        createdAt: Date = Date()
    ) {
        self.id = id
        self.category = category
        self.monthlyLimit = monthlyLimit
        self.createdAt = createdAt
    }
}

@Model
final class CategoryItem {
    var id: UUID = UUID()
    var name: String = ""
    var type: String = "expense_category" // "income_source" or "expense_category"
    var isDefault: Bool = false

    init(
        id: UUID = UUID(),
        name: String,
        type: String,
        isDefault: Bool = false
    ) {
        self.id = id
        self.name = name
        self.type = type
        self.isDefault = isDefault
    }
}

// MARK: - swiftpm/Sources/Utilities.swift
struct CurrencyFormatter {
    static func format(_ amount: Double, currency: String = "IQD") -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 0
        formatter.groupingSeparator = ","
        
        let formattedNumber = formatter.string(from: NSNumber(value: amount)) ?? "\(Int(amount))"
        return "\(formattedNumber) \(currency)"
    }
    
    static func formatSigned(_ amount: Double, type: String, currency: String = "IQD") -> String {
        let prefix = type.lowercased() == "income" ? "+" : "-"
        return "\(prefix)\(format(amount, currency: currency))"
    }
}

extension Date {
    func formattedShort() -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .none
        return formatter.string(from: self)
    }

    func monthYearString() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "LLLL yyyy"
        return formatter.string(from: self)
    }
}

// MARK: - swiftpm/Sources/FinancialEngine.swift
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

// MARK: - swiftpm/Sources/Views/QuickAddTransactionSheet.swift
struct QuickAddTransactionSheet: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(\.modelContext) private var modelContext

    @Query(filter: #Predicate<CategoryItem> { $0.type == "expense_category" })
    private var expenseCategories: [CategoryItem]

    @Query(filter: #Predicate<CategoryItem> { $0.type == "income_source" })
    private var incomeSources: [CategoryItem]

    @State private var transactionType: String = "expense"
    @State private var amountString: String = ""
    @State private var date: Date = Date()
    @State private var selectedCategory: String = "Food"
    @State private var selectedSource: String = "Salary"
    @State private var customCategory: String = ""
    @State private var isAddingCustomCategory: Bool = false
    @State private var customSource: String = ""
    @State private var isAddingCustomSource: Bool = false
    @State private var itemDescription: String = ""
    @State private var notes: String = ""
    @State private var validationError: String? = nil

    var body: some View {
        NavigationStack {
            Form {
                // Type Selector
                Section {
                    Picker("Type", selection: $transactionType) {
                        Text("Expense").tag("expense")
                        Text("Income").tag("income")
                    }
                    .pickerStyle(.segmented)
                }

                // Amount
                Section {
                    HStack {
                        Text("IQD")
                            .font(.headline)
                            .foregroundColor(.secondary)
                        TextField("0", text: $amountString)
                            .keyboardType(.numberPad)
                            .font(.system(.title2, design: .rounded, weight: .bold))
                    }
                } header: {
                    Text("Amount (Iraqi Dinar)")
                } footer: {
                    if let error = validationError {
                        Text(error)
                            .foregroundColor(.red)
                    }
                }

                // Date
                Section("Date & Time") {
                    DatePicker("Date", selection: $date, displayedComponents: [.date, .hourAndMinute])
                }

                // Conditional Category or Source
                if transactionType == "expense" {
                    Section("Category") {
                        Picker("Category", selection: $selectedCategory) {
                            ForEach(categoryOptions, id: \.self) { cat in
                                Text(cat).tag(cat)
                            }
                        }

                        if isAddingCustomCategory {
                            HStack {
                                TextField("New Category Name", text: $customCategory)
                                Button("Save") {
                                    saveCustomCategory()
                                }
                                .disabled(customCategory.trimmingCharacters(in: .whitespaces).isEmpty)
                            }
                        } else {
                            Button("+ Add Custom Category") {
                                isAddingCustomCategory = true
                            }
                            .font(.subheadline)
                            .foregroundColor(.indigo)
                        }
                    }

                    Section("Merchant / Details") {
                        TextField("Merchant or Payee (e.g. Carrefour, Al-Mansour)", text: $itemDescription)
                        TextField("Notes (optional)", text: $notes)
                    }
                } else {
                    Section("Income Source") {
                        Picker("Source", selection: $selectedSource) {
                            ForEach(sourceOptions, id: \.self) { src in
                                Text(src).tag(src)
                            }
                        }

                        if isAddingCustomSource {
                            HStack {
                                TextField("New Source Name", text: $customSource)
                                Button("Save") {
                                    saveCustomSource()
                                }
                                .disabled(customSource.trimmingCharacters(in: .whitespaces).isEmpty)
                            }
                        } else {
                            Button("+ Add Custom Source") {
                                isAddingCustomSource = true
                            }
                            .font(.subheadline)
                            .foregroundColor(.indigo)
                        }
                    }

                    Section("Income Details") {
                        TextField("Description (e.g. Monthly Salary, Bonus)", text: $itemDescription)
                        TextField("Notes (optional)", text: $notes)
                    }
                }
            }
            .navigationTitle("New \(transactionType == "income" ? "Income" : "Expense")")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        saveTransaction()
                    }
                    .fontWeight(.semibold)
                }
            }
        }
    }

    private var categoryOptions: [String] {
        let dbCategories: [String] = expenseCategories.map { $0.name }
        let defaults: [String] = [
            "Food", "Transportation", "Rent", "Bills", "Shopping",
            "Entertainment", "Travel", "Family", "Car", "Health", "Gym", "Other"
        ]
        return Array(Set(dbCategories + defaults)).sorted()
    }

    private var sourceOptions: [String] {
        let dbSources: [String] = incomeSources.map { $0.name }
        let defaults: [String] = ["Salary", "Bonus", "Freelance", "Business", "Investment", "Other"]
        return Array(Set(dbSources + defaults)).sorted()
    }

    private func saveCustomCategory() {
        let trimmed = customCategory.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }
        let newCat = CategoryItem(name: trimmed, type: "expense_category", isDefault: false)
        modelContext.insert(newCat)
        selectedCategory = trimmed
        customCategory = ""
        isAddingCustomCategory = false
    }

    private func saveCustomSource() {
        let trimmed = customSource.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }
        let newSrc = CategoryItem(name: trimmed, type: "income_source", isDefault: false)
        modelContext.insert(newSrc)
        selectedSource = trimmed
        customSource = ""
        isAddingCustomSource = false
    }

    private func saveTransaction() {
        let cleanAmount = amountString.replacingOccurrences(of: ",", with: "").trimmingCharacters(in: .whitespaces)
        guard let amount = Double(cleanAmount), amount > 0 else {
            validationError = "Please enter a valid amount greater than 0 IQD."
            return
        }

        let newTransaction = TransactionItem(
            type: transactionType,
            amount: amount,
            currency: "IQD",
            date: date,
            category: transactionType == "expense" ? selectedCategory : "Income",
            source: transactionType == "income" ? selectedSource : "",
            itemDescription: itemDescription.trimmingCharacters(in: .whitespaces),
            notes: notes.trimmingCharacters(in: .whitespaces)
        )

        modelContext.insert(newTransaction)
        try? modelContext.save()
        dismiss()
    }
}

// MARK: - swiftpm/Sources/Views/DashboardView.swift
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

// MARK: - swiftpm/Sources/Views/PlansDashboardView.swift
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

// MARK: - swiftpm/Sources/Views/TransactionsView.swift
struct TransactionsView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \TransactionItem.date, order: .reverse) private var allTransactions: [TransactionItem]

    @State private var searchText: String = ""
    @State private var filterType: String = "all" // "all", "income", "expense"
    @State private var selectedCategory: String = "All"
    @State private var sortAscending: Bool = false
    @State private var showDeleteConfirmation: Bool = false
    @State private var itemToDelete: TransactionItem? = nil
    @State private var editingItem: TransactionItem? = nil
    @State private var showAddSheet: Bool = false

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Filter bar
                filterHeaderView

                // List of filtered transactions
                if filteredTransactions.isEmpty {
                    VStack(spacing: 12) {
                        Spacer()
                        Image(systemName: "magnifyingglass")
                            .font(.system(size: 44))
                            .foregroundColor(.secondary)
                        Text("No transactions found")
                            .font(.headline)
                        Text("Try adjusting your filters or search keywords.")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        Spacer()
                    }
                } else {
                    List {
                        ForEach(groupedTransactions.keys.sorted(by: sortAscending ? (<) : (>)), id: \.self) { sectionDate in
                            Section(header: Text(sectionDate)) {
                                ForEach(groupedTransactions[sectionDate] ?? []) { item in
                                    TransactionRow(item: item)
                                        .contentShape(Rectangle())
                                        .onTapGesture {
                                            editingItem = item
                                        }
                                        .swipeActions(edge: .trailing, allowsFullSwipe: false) {
                                            Button(role: .destructive) {
                                                itemToDelete = item
                                                showDeleteConfirmation = true
                                            } label: {
                                                Label("Delete", systemImage: "trash")
                                            }
                                        }
                                }
                            }
                        }
                    }
                    .listStyle(.insetGrouped)
                }
            }
            .navigationTitle("Transactions")
            .searchable(text: $searchText, prompt: "Search merchant, category, notes")
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Menu {
                        Button {
                            sortAscending = false
                        } label: {
                            Label("Newest First", systemImage: !sortAscending ? "checkmark" : "")
                        }
                        Button {
                            sortAscending = true
                        } label: {
                            Label("Oldest First", systemImage: sortAscending ? "checkmark" : "")
                        }
                    } label: {
                        Image(systemName: "arrow.up.arrow.down.circle")
                            .foregroundColor(.indigo)
                    }
                }

                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showAddSheet = true
                    } label: {
                        Image(systemName: "plus")
                            .fontWeight(.semibold)
                            .foregroundColor(.indigo)
                    }
                }
            }
            .confirmationDialog(
                "Delete Transaction?",
                isPresented: $showDeleteConfirmation,
                titleVisibility: .visible
            ) {
                Button("Delete", role: .destructive) {
                    if let target = itemToDelete {
                        modelContext.delete(target)
                        try? modelContext.save()
                        itemToDelete = nil
                    }
                }
                Button("Cancel", role: .cancel) {
                    itemToDelete = nil
                }
            } message: {
                Text("This action permanently removes this transaction from your balance.")
            }
            .sheet(item: $editingItem) { item in
                EditTransactionSheet(item: item)
            }
            .sheet(isPresented: $showAddSheet) {
                QuickAddTransactionSheet()
            }
        }
    }

    // MARK: - Filter Header

    private var filterHeaderView: some View {
        VStack(spacing: 8) {
            Picker("Filter", selection: $filterType) {
                Text("All").tag("all")
                Text("Income").tag("income")
                Text("Expense").tag("expense")
            }
            .pickerStyle(.segmented)
            .padding(.horizontal)

            // Category Scrollable Filter
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    categoryFilterChip("All")
                    ForEach(allCategories, id: \.self) { cat in
                        categoryFilterChip(cat)
                    }
                }
                .padding(.horizontal)
            }
        }
        .padding(.vertical, 8)
        .background(Color(.systemGroupedBackground))
    }

    private func categoryFilterChip(_ name: String) -> some View {
        let isSelected = selectedCategory == name
        return Button {
            selectedCategory = name
        } label: {
            Text(name)
                .font(.caption.weight(.medium))
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(isSelected ? Color.indigo : Color(.secondarySystemBackground))
                .foregroundColor(isSelected ? .white : .primary)
                .clipShape(Capsule())
        }
    }

    private var allCategories: [String] {
        let cats = allTransactions.map { $0.category }
        return Array(Set(cats)).sorted()
    }

    private var filteredTransactions: [TransactionItem] {
        allTransactions.filter { item in
            // Search text
            let matchesSearch: Bool
            if searchText.trimmingCharacters(in: .whitespaces).isEmpty {
                matchesSearch = true
            } else {
                let query = searchText.lowercased()
                matchesSearch = item.category.lowercased().contains(query) ||
                    item.source.lowercased().contains(query) ||
                    item.itemDescription.lowercased().contains(query) ||
                    item.notes.lowercased().contains(query)
            }

            // Type filter
            let matchesType: Bool
            if filterType == "all" {
                matchesType = true
            } else {
                matchesType = item.type.lowercased() == filterType.lowercased()
            }

            // Category filter
            let matchesCategory = (selectedCategory == "All") || (item.category == selectedCategory)

            return matchesSearch && matchesType && matchesCategory
        }
    }

    private var groupedTransactions: [String: [TransactionItem]] {
        let calendar = Calendar.current
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .none

        var dict: [String: [TransactionItem]] = [:]
        for item in filteredTransactions {
            let key = formatter.string(from: item.date)
            dict[key, default: []].append(item)
        }
        return dict
    }
}

// MARK: - Reusable Transaction Row

struct TransactionRow: View {
    let item: TransactionItem

    var body: some View {
        HStack(spacing: 12) {
            ZStack {
                Circle()
                    .fill(item.type == "income" ? Color.green.opacity(0.15) : Color.red.opacity(0.12))
                    .frame(width: 42, height: 42)
                Image(systemName: iconForCategory(item.category, type: item.type))
                    .font(.system(size: 18))
                    .foregroundColor(item.type == "income" ? .green : .red)
            }

            VStack(alignment: .leading, spacing: 3) {
                Text(item.itemDescription.isEmpty ? item.category : item.itemDescription)
                    .font(.system(.subheadline, design: .rounded, weight: .semibold))
                    .foregroundColor(.primary)

                HStack(spacing: 6) {
                    Text(item.type == "income" ? (item.source.isEmpty ? "Income" : item.source) : item.category)
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text("•")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text(item.date.formattedShort())
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }

            Spacer()

            Text(CurrencyFormatter.formatSigned(item.amount, type: item.type, currency: item.currency))
                .font(.system(.subheadline, design: .rounded, weight: .bold))
                .foregroundColor(item.type == "income" ? .green : .primary)
        }
        .padding(.vertical, 4)
    }

    private func iconForCategory(_ category: String, type: String) -> String {
        if type == "income" {
            return "arrow.down.left"
        }
        switch category.lowercased() {
        case "food": return "fork.knife"
        case "transportation", "car": return "car.fill"
        case "rent": return "house.fill"
        case "bills": return "bolt.fill"
        case "shopping": return "bag.fill"
        case "entertainment": return "film.fill"
        case "travel": return "airplane"
        case "family": return "person.2.fill"
        case "health": return "cross.case.fill"
        case "gym": return "dumbbell.fill"
        default: return "creditcard.fill"
        }
    }
}

// MARK: - Edit Transaction Sheet

struct EditTransactionSheet: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(\.modelContext) private var modelContext

    @Bindable var item: TransactionItem
    @State private var amountString: String = ""
    @State private var date: Date = Date()
    @State private var category: String = ""
    @State private var source: String = ""
    @State private var itemDescription: String = ""
    @State private var notes: String = ""
    @State private var showDeleteConfirmation: Bool = false

    var body: some View {
        NavigationStack {
            Form {
                Section("Amount (IQD)") {
                    TextField("Amount", text: $amountString)
                        .keyboardType(.numberPad)
                        .font(.headline)
                }

                Section("Details") {
                    DatePicker("Date", selection: $date, displayedComponents: [.date, .hourAndMinute])
                    if item.type == "expense" {
                        TextField("Category", text: $category)
                    } else {
                        TextField("Source", text: $source)
                    }
                    TextField("Description / Merchant", text: $itemDescription)
                    TextField("Notes", text: $notes)
                }

                Section {
                    Button(role: .destructive) {
                        showDeleteConfirmation = true
                    } label: {
                        HStack {
                            Spacer()
                            Label("Delete Transaction", systemImage: "trash")
                                .foregroundColor(.red)
                                .fontWeight(.semibold)
                            Spacer()
                        }
                    }
                }
            }
            .navigationTitle("Edit Transaction")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") {
                        saveChanges()
                    }
                }
            }
            .confirmationDialog(
                "Delete Transaction?",
                isPresented: $showDeleteConfirmation,
                titleVisibility: .visible
            ) {
                Button("Delete", role: .destructive) {
                    deleteTransaction()
                }
                Button("Cancel", role: .cancel) {}
            } message: {
                Text("Are you sure you want to permanently delete this transaction?")
            }
            .onAppear {
                amountString = String(Int(item.amount))
                date = item.date
                category = item.category
                source = item.source
                itemDescription = item.itemDescription
                notes = item.notes
            }
        }
    }

    private func saveChanges() {
        if let newAmount = Double(amountString.replacingOccurrences(of: ",", with: "")), newAmount > 0 {
            item.amount = newAmount
        }
        item.date = date
        item.category = category
        item.source = source
        item.itemDescription = itemDescription
        item.notes = notes
        item.updatedAt = Date()
        try? modelContext.save()
        dismiss()
    }

    private func deleteTransaction() {
        modelContext.delete(item)
        try? modelContext.save()
        dismiss()
    }
}

// MARK: - swiftpm/Sources/Views/AnalyticsView.swift
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

// MARK: - swiftpm/Sources/Views/GoalsView.swift
struct GoalsView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \GoalItem.createdAt, order: .reverse) private var allGoals: [GoalItem]
    @Query private var transactions: [TransactionItem]

    @State private var showCreateGoal: Bool = false
    @State private var goalToAllocate: GoalItem? = nil
    @State private var selectedGoalDetail: GoalItem? = nil
    @State private var celebrationGoal: GoalItem? = nil

    private let engine = FinancialEngine.shared

    private var activeGoals: [GoalItem] {
        allGoals.filter { !$0.isCompleted }
    }

    private var completedGoals: [GoalItem] {
        allGoals.filter { $0.isCompleted }
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Unallocated Balance banner
                    unallocatedBanner

                    // Active Goals Section
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("Active Goals (\(activeGoals.count))")
                                .font(.system(.headline, design: .rounded))
                            Spacer()
                        }

                        if activeGoals.isEmpty {
                            emptyActiveGoalsCard
                        } else {
                            ForEach(activeGoals) { goal in
                                GoalCard(
                                    goal: goal,
                                    transactions: transactions,
                                    allGoals: allGoals,
                                    onAllocate: {
                                        goalToAllocate = goal
                                    },
                                    onTap: {
                                        selectedGoalDetail = goal
                                    }
                                )
                            }
                        }
                    }

                    // Completed Goals Section
                    if !completedGoals.isEmpty {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Completed Goals (\(completedGoals.count))")
                                .font(.system(.headline, design: .rounded))
                                .foregroundColor(.secondary)

                            ForEach(completedGoals) { goal in
                                CompletedGoalCard(goal: goal)
                            }
                        }
                    }
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
            }
            .navigationTitle("Financial Goals")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showCreateGoal = true
                    } label: {
                        Image(systemName: "plus.circle.fill")
                            .font(.system(size: 22))
                            .foregroundColor(.indigo)
                    }
                }
            }
            .sheet(isPresented: $showCreateGoal) {
                CreateGoalSheet()
            }
            .sheet(item: $goalToAllocate) { goal in
                AllocateGoalSheet(
                    goal: goal,
                    transactions: transactions,
                    allGoals: allGoals,
                    onCompleted: {
                        celebrationGoal = goal
                    }
                )
            }
            .sheet(item: $selectedGoalDetail) { goal in
                GoalDetailSheet(
                    goal: goal,
                    transactions: transactions,
                    allGoals: allGoals,
                    onAllocate: {
                        selectedGoalDetail = nil
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                            goalToAllocate = goal
                        }
                    }
                )
            }
            .overlay {
                if let celeb = celebrationGoal {
                    CelebrationOverlay(goal: celeb) {
                        celebrationGoal = nil
                    }
                }
            }
        }
    }

    private var unallocatedBanner: some View {
        let unallocated = engine.unallocatedBalance(transactions: transactions, goals: activeGoals)
        return HStack {
            VStack(alignment: .leading, spacing: 2) {
                Text("Available to Allocate")
                    .font(.caption)
                    .foregroundColor(.secondary)
                Text(CurrencyFormatter.format(unallocated))
                    .font(.system(.title3, design: .rounded, weight: .bold))
                    .foregroundColor(.indigo)
            }
            Spacer()
            Image(systemName: "wallet.pass.fill")
                .font(.title2)
                .foregroundColor(.indigo.opacity(0.8))
        }
        .padding(14)
        .background(Color.indigo.opacity(0.08))
        .cornerRadius(14)
    }

    private var emptyActiveGoalsCard: some View {
        VStack(spacing: 8) {
            Image(systemName: "target")
                .font(.system(size: 36))
                .foregroundColor(.secondary)
            Text("No Active Goals")
                .font(.headline)
            Text("Tap '+' to define your savings target and track achievability.")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding(24)
        .frame(maxWidth: .infinity)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
    }
}

// MARK: - Goal Card

struct GoalCard: View {
    let goal: GoalItem
    let transactions: [TransactionItem]
    let allGoals: [GoalItem]
    let onAllocate: () -> Void
    let onTap: () -> Void

    private let engine = FinancialEngine.shared

    var body: some View {
        let unallocated = engine.unallocatedBalance(transactions: transactions, goals: allGoals)
        let avgSavings = engine.historicalMonthlyAverageSavings(transactions: transactions)
        let analysis = engine.analyzeGoal(goal: goal, unallocatedBalance: unallocated, historicalAvgSavings: avgSavings)
        let progress = goal.targetAmount > 0 ? min(1.0, goal.allocatedAmount / goal.targetAmount) : 0.0
        let remaining = max(0.0, goal.targetAmount - goal.allocatedAmount)

        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(goal.name)
                        .font(.system(.headline, design: .rounded, weight: .bold))
                    if let targetDate = goal.targetDate {
                        Text("Target: \(targetDate.formattedShort())")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    } else {
                        Text("No deadline set")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
                }
                Spacer()

                // Status badge
                Text(analysis.statusTitle)
                    .font(.caption2.weight(.bold))
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(analysis.statusColor.opacity(0.15))
                    .foregroundColor(analysis.statusColor)
                    .clipShape(Capsule())
            }

            // Progress bar
            ProgressView(value: progress)
                .tint(progress >= 1.0 ? .green : .indigo)

            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Saved")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text(CurrencyFormatter.format(goal.allocatedAmount))
                        .font(.system(.subheadline, design: .rounded, weight: .semibold))
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 2) {
                    Text("Target")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text(CurrencyFormatter.format(goal.targetAmount))
                        .font(.system(.subheadline, design: .rounded, weight: .semibold))
                }
            }

            Divider()

            HStack {
                Text("\(Int(progress * 100))% • Remaining \(CurrencyFormatter.format(remaining))")
                    .font(.caption2)
                    .foregroundColor(.secondary)
                Spacer()
                Button(action: onAllocate) {
                    HStack(spacing: 4) {
                        Image(systemName: "plus.circle")
                        Text("Manage Funds")
                    }
                    .font(.caption.weight(.semibold))
                    .foregroundColor(.white)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(Color.indigo)
                    .clipShape(Capsule())
                }
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
        .onTapGesture(perform: onTap)
    }
}

// MARK: - Completed Goal Card

struct CompletedGoalCard: View {
    let goal: GoalItem

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: "checkmark.circle.fill")
                .font(.title2)
                .foregroundColor(.green)

            VStack(alignment: .leading, spacing: 2) {
                Text(goal.name)
                    .font(.subheadline.weight(.semibold))
                    .strikethrough()
                if let completedAt = goal.completedAt {
                    Text("Completed on \(completedAt.formattedShort())")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }
            Spacer()
            Text(CurrencyFormatter.format(goal.targetAmount))
                .font(.system(.subheadline, design: .rounded, weight: .bold))
                .foregroundColor(.secondary)
        }
        .padding(14)
        .background(Color(.secondarySystemGroupedBackground).opacity(0.8))
        .cornerRadius(14)
    }
}

// MARK: - Create Goal Sheet

struct CreateGoalSheet: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(\.modelContext) private var modelContext

    @State private var name: String = ""
    @State private var targetAmountString: String = ""
    @State private var hasTargetDate: Bool = false
    @State private var targetDate: Date = Calendar.current.date(byAdding: .month, value: 6, to: Date()) ?? Date()
    @State private var goalDescription: String = ""
    @State private var validationError: String? = nil

    var body: some View {
        NavigationStack {
            Form {
                Section("Goal Information") {
                    TextField("Goal Name (e.g. New Car, Emergency Fund)", text: $name)
                    HStack {
                        Text("IQD")
                            .foregroundColor(.secondary)
                        TextField("Target Amount", text: $targetAmountString)
                            .keyboardType(.numberPad)
                    }
                    TextField("Description (optional)", text: $goalDescription)
                }

                Section("Target Timeline") {
                    Toggle("Set Target Date", isOn: $hasTargetDate)
                    if hasTargetDate {
                        DatePicker("Target Date", selection: $targetDate, in: Date()..., displayedComponents: .date)
                    }
                }

                if let error = validationError {
                    Section {
                        Text(error)
                            .font(.caption)
                            .foregroundColor(.red)
                    }
                }
            }
            .navigationTitle("New Goal")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Create") {
                        saveGoal()
                    }
                    .fontWeight(.semibold)
                }
            }
        }
    }

    private func saveGoal() {
        let trimmedName = name.trimmingCharacters(in: .whitespaces)
        guard !trimmedName.isEmpty else {
            validationError = "Please enter a goal name."
            return
        }

        let cleanAmount = targetAmountString.replacingOccurrences(of: ",", with: "")
        guard let amount = Double(cleanAmount), amount > 0 else {
            validationError = "Target amount must be greater than 0 IQD."
            return
        }

        let newGoal = GoalItem(
            name: trimmedName,
            targetAmount: amount,
            allocatedAmount: 0.0,
            currency: "IQD",
            targetDate: hasTargetDate ? targetDate : nil,
            goalDescription: goalDescription.trimmingCharacters(in: .whitespaces)
        )

        modelContext.insert(newGoal)
        try? modelContext.save()
        dismiss()
    }
}

// MARK: - Allocate / Withdraw Sheet

struct AllocateGoalSheet: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(\.modelContext) private var modelContext

    @Bindable var goal: GoalItem
    let transactions: [TransactionItem]
    let allGoals: [GoalItem]
    let onCompleted: () -> Void

    @State private var mode: String = "allocate" // "allocate" or "withdraw"
    @State private var amountString: String = ""
    @State private var errorText: String? = nil

    private let engine = FinancialEngine.shared

    var body: some View {
        let unallocated = engine.unallocatedBalance(transactions: transactions, goals: allGoals)
        let remaining = max(0.0, goal.targetAmount - goal.allocatedAmount)

        NavigationStack {
            Form {
                Section {
                    Picker("Action", selection: $mode) {
                        Text("Allocate Money").tag("allocate")
                        Text("Withdraw Funds").tag("withdraw")
                    }
                    .pickerStyle(.segmented)
                }

                Section("Status") {
                    HStack {
                        Text("Currently Saved")
                        Spacer()
                        Text(CurrencyFormatter.format(goal.allocatedAmount))
                            .fontWeight(.semibold)
                    }
                    HStack {
                        Text("Remaining to Target")
                        Spacer()
                        Text(CurrencyFormatter.format(remaining))
                            .foregroundColor(.secondary)
                    }
                    HStack {
                        Text("Available Cash (Unallocated)")
                        Spacer()
                        Text(CurrencyFormatter.format(unallocated))
                            .foregroundColor(.indigo)
                    }
                }

                Section("Amount (IQD)") {
                    TextField("0", text: $amountString)
                        .keyboardType(.numberPad)
                        .font(.title3.weight(.bold))
                }

                if let err = errorText {
                    Section {
                        Text(err)
                            .font(.caption)
                            .foregroundColor(.red)
                    }
                }
            }
            .navigationTitle("Manage Funds: \(goal.name)")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Confirm") {
                        executeTransaction(unallocated: unallocated)
                    }
                    .fontWeight(.semibold)
                }
            }
        }
    }

    private func executeTransaction(unallocated: Double) {
        let clean = amountString.replacingOccurrences(of: ",", with: "").trimmingCharacters(in: .whitespaces)
        guard let amount = Double(clean), amount > 0 else {
            errorText = "Enter a valid amount > 0 IQD."
            return
        }

        if mode == "allocate" {
            // Cannot allocate more than unallocated cash
            if amount > unallocated {
                errorText = "You cannot allocate more than your available unallocated balance (\(CurrencyFormatter.format(unallocated)))."
                return
            }
            goal.allocatedAmount += amount
            goal.updatedAt = Date()

            if goal.allocatedAmount >= goal.targetAmount {
                goal.isCompleted = true
                goal.completedAt = Date()
                try? modelContext.save()
                dismiss()
                onCompleted()
                return
            }
        } else {
            // Withdraw
            if amount > goal.allocatedAmount {
                errorText = "Cannot withdraw more than current allocated funds (\(CurrencyFormatter.format(goal.allocatedAmount)))."
                return
            }
            goal.allocatedAmount -= amount
            if goal.isCompleted && goal.allocatedAmount < goal.targetAmount {
                goal.isCompleted = false
                goal.completedAt = nil
            }
            goal.updatedAt = Date()
        }

        try? modelContext.save()
        dismiss()
    }
}

// MARK: - Goal Detail & Actionable Shortfall View

struct GoalDetailSheet: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(\.modelContext) private var modelContext
    let goal: GoalItem
    let transactions: [TransactionItem]
    let allGoals: [GoalItem]
    let onAllocate: () -> Void

    @State private var showDeleteConfirmation: Bool = false
    private let engine = FinancialEngine.shared

    var body: some View {
        let unallocated = engine.unallocatedBalance(transactions: transactions, goals: allGoals)
        let avgSavings = engine.historicalMonthlyAverageSavings(transactions: transactions)
        let analysis = engine.analyzeGoal(goal: goal, unallocatedBalance: unallocated, historicalAvgSavings: avgSavings)
        let remaining = max(0.0, goal.targetAmount - goal.allocatedAmount)

        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Header Card
                    VStack(spacing: 8) {
                        Text(goal.name)
                            .font(.system(.title2, design: .rounded, weight: .bold))
                        Text("Target: \(CurrencyFormatter.format(goal.targetAmount))")
                            .font(.subheadline)
                            .foregroundColor(.secondary)

                        Text(analysis.statusTitle)
                            .font(.caption.weight(.bold))
                            .padding(.horizontal, 10)
                            .padding(.vertical, 4)
                            .background(analysis.statusColor.opacity(0.15))
                            .foregroundColor(analysis.statusColor)
                            .clipShape(Capsule())
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color(.secondarySystemGroupedBackground))
                    .cornerRadius(16)

                    // Achievability Breakdown
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Achievability Breakdown")
                            .font(.headline)

                        Text(analysis.explanation)
                            .font(.subheadline)
                            .foregroundColor(.secondary)

                        if let req = analysis.requiredMonthlySavings, let months = analysis.monthsRemaining {
                            Divider()
                            HStack {
                                Text("Months Remaining")
                                Spacer()
                                Text("\(months) months")
                                    .fontWeight(.medium)
                            }
                            HStack {
                                Text("Required Monthly Savings")
                                Spacer()
                                Text(CurrencyFormatter.format(req) + "/mo")
                                    .fontWeight(.semibold)
                                    .foregroundColor(.indigo)
                            }
                            HStack {
                                Text("Your Historical Avg. Savings")
                                Spacer()
                                Text(CurrencyFormatter.format(avgSavings) + "/mo")
                                    .foregroundColor(.secondary)
                            }
                        }
                    }
                    .padding()
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color(.secondarySystemGroupedBackground))
                    .cornerRadius(16)

                    // Actionable Shortfall Recommendations
                    if let shortfall = analysis.shortfallMonthly, shortfall > 0 {
                        VStack(alignment: .leading, spacing: 14) {
                            Text("Actionable Recommendations")
                                .font(.headline)

                            VStack(alignment: .leading, spacing: 10) {
                                recommendationRow(
                                    icon: "arrow.up.circle.fill",
                                    color: .green,
                                    title: "Option 1: Increase Income",
                                    detail: "Earn an extra \(CurrencyFormatter.format(shortfall))/month via freelancing, bonuses, or side projects."
                                )

                                recommendationRow(
                                    icon: "scissors",
                                    color: .orange,
                                    title: "Option 2: Cut Expenses",
                                    detail: "Reduce discretionary spending (dining, shopping, entertainment) by \(CurrencyFormatter.format(shortfall))/month."
                                )

                                if let extraMonths = analysis.extensionMonths {
                                    recommendationRow(
                                        icon: "calendar.badge.plus",
                                        color: .blue,
                                        title: "Option 3: Extend Target Date",
                                        detail: "Postpone your goal by \(extraMonths) additional month\(extraMonths == 1 ? "" : "s") to reach it comfortably at your current savings pace."
                                    )
                                }
                            }
                        }
                        .padding()
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(Color(.secondarySystemGroupedBackground))
                        .cornerRadius(16)
                    }

                    VStack(spacing: 12) {
                        Button(action: onAllocate) {
                            Text("Allocate / Withdraw Funds")
                                .font(.headline)
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.indigo)
                                .cornerRadius(16)
                        }

                        Button(role: .destructive) {
                            showDeleteConfirmation = true
                        } label: {
                            HStack {
                                Image(systemName: "trash")
                                Text("Delete Plan")
                            }
                            .font(.subheadline.weight(.semibold))
                            .foregroundColor(.red)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .background(Color.red.opacity(0.1))
                            .cornerRadius(16)
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("Plan Details")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Close") { dismiss() }
                }
            }
            .confirmationDialog(
                "Delete Plan?",
                isPresented: $showDeleteConfirmation,
                titleVisibility: .visible
            ) {
                Button("Delete Plan", role: .destructive) {
                    modelContext.delete(goal)
                    try? modelContext.save()
                    dismiss()
                }
                Button("Cancel", role: .cancel) {}
            } message: {
                Text("Are you sure you want to delete this plan? This action cannot be undone.")
            }
        }
    }

    private func recommendationRow(icon: String, color: Color, title: String, detail: String) -> some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundColor(color)
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.subheadline.weight(.semibold))
                Text(detail)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
    }
}

// MARK: - Celebration Overlay

struct CelebrationOverlay: View {
    let goal: GoalItem
    let onDismiss: () -> Void

    var body: some View {
        ZStack {
            Color.black.opacity(0.5)
                .ignoresSafeArea()

            VStack(spacing: 20) {
                Image(systemName: "sparkles")
                    .font(.system(size: 60))
                    .foregroundColor(.yellow)

                Text("Goal Achieved! 🎉")
                    .font(.system(.title, design: .rounded, weight: .bold))

                Text("Congratulations! You have reached your target of \(CurrencyFormatter.format(goal.targetAmount)) for \"\(goal.name)\".")
                    .font(.subheadline)
                    .multilineTextAlignment(.center)
                    .foregroundColor(.secondary)
                    .padding(.horizontal)

                Button("Awesome!") {
                    onDismiss()
                }
                .font(.headline)
                .foregroundColor(.white)
                .padding(.horizontal, 32)
                .padding(.vertical, 12)
                .background(Color.indigo)
                .cornerRadius(14)
            }
            .padding(28)
            .background(Color(.systemBackground))
            .cornerRadius(24)
            .shadow(radius: 20)
            .padding(32)
        }
    }
}

// MARK: - swiftpm/Sources/Views/BudgetsView.swift
struct BudgetsView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \BudgetItem.category) private var budgets: [BudgetItem]
    @Query private var transactions: [TransactionItem]

    @State private var showAddBudget: Bool = false
    @State private var editingBudget: BudgetItem? = nil

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    // Overview header
                    budgetOverviewCard

                    // Budgets List
                    if budgets.isEmpty {
                        VStack(spacing: 8) {
                            Image(systemName: "chart.bar.xaxis")
                                .font(.system(size: 36))
                                .foregroundColor(.secondary)
                            Text("No Category Budgets Set")
                                .font(.headline)
                            Text("Set monthly limits for Food, Shopping, Transport and more to control spending.")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                                .multilineTextAlignment(.center)
                        }
                        .padding(24)
                        .frame(maxWidth: .infinity)
                        .background(Color(.secondarySystemGroupedBackground))
                        .cornerRadius(16)
                    } else {
                        ForEach(budgets) { budget in
                            BudgetCard(
                                budget: budget,
                                transactions: transactions,
                                onEdit: {
                                    editingBudget = budget
                                },
                                onDelete: {
                                    modelContext.delete(budget)
                                    try? modelContext.save()
                                }
                            )
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("Monthly Budgets")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showAddBudget = true
                    } label: {
                        Image(systemName: "plus.circle.fill")
                            .font(.system(size: 22))
                            .foregroundColor(.indigo)
                    }
                }
            }
            .sheet(isPresented: $showAddBudget) {
                AddBudgetSheet()
            }
            .sheet(item: $editingBudget) { b in
                EditBudgetSheet(budget: b)
            }
        }
    }

    private var currentMonthExpensesByCategory: [String: Double] {
        let calendar = Calendar.current
        var dict: [String: Double] = [:]
        for t in transactions where t.type == "expense" {
            if calendar.isDate(t.date, equalTo: Date(), toGranularity: .month) &&
               calendar.isDate(t.date, equalTo: Date(), toGranularity: .year) {
                dict[t.category, default: 0] += t.amount
            }
        }
        return dict
    }

    private var budgetOverviewCard: some View {
        let totalBudgeted = budgets.reduce(0.0) { $0 + $1.monthlyLimit }
        let spentMap = currentMonthExpensesByCategory
        let totalSpentOnBudgetedCategories = budgets.reduce(0.0) { $0 + (spentMap[$1.category] ?? 0.0) }
        let remaining = totalBudgeted - totalSpentOnBudgetedCategories

        return VStack(spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Total Monthly Budget")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Text(CurrencyFormatter.format(totalBudgeted))
                        .font(.system(.title3, design: .rounded, weight: .bold))
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 2) {
                    Text("Remaining")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Text(CurrencyFormatter.format(max(0, remaining)))
                        .font(.system(.subheadline, design: .rounded, weight: .semibold))
                        .foregroundColor(remaining >= 0 ? .green : .red)
                }
            }

            let progress = totalBudgeted > 0 ? min(1.5, totalSpentOnBudgetedCategories / totalBudgeted) : 0.0
            ProgressView(value: min(1.0, progress))
                .tint(progress > 1.0 ? .red : (progress > 0.8 ? .orange : .indigo))
        }
        .padding()
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
    }
}

// MARK: - Budget Card with Color Transitions

struct BudgetCard: View {
    let budget: BudgetItem
    let transactions: [TransactionItem]
    let onEdit: () -> Void
    let onDelete: () -> Void

    var body: some View {
        let spent = spentForCategory(budget.category)
        let limit = budget.monthlyLimit
        let remaining = limit - spent
        let ratio = limit > 0 ? spent / limit : 0.0

        // Color transition: Accent (Indigo) -> Orange (>= 80%) -> Red (> 100%)
        let statusColor: Color = {
            if ratio >= 1.0 {
                return .red
            } else if ratio >= 0.8 {
                return .orange
            } else {
                return .indigo
            }
        }()

        VStack(alignment: .leading, spacing: 10) {
            HStack {
                Text(budget.category)
                    .font(.system(.headline, design: .rounded, weight: .bold))
                Spacer()
                if ratio >= 1.0 {
                    Text("Exceeded by \(CurrencyFormatter.format(spent - limit))")
                        .font(.caption2.weight(.bold))
                        .foregroundColor(.red)
                } else {
                    Text("\(CurrencyFormatter.format(remaining)) left")
                        .font(.caption2.weight(.semibold))
                        .foregroundColor(.secondary)
                }
            }

            // Progress bar
            ProgressView(value: min(1.0, ratio))
                .tint(statusColor)

            HStack {
                Text("Spent: \(CurrencyFormatter.format(spent))")
                    .font(.caption2)
                    .foregroundColor(.secondary)
                Spacer()
                Text("Limit: \(CurrencyFormatter.format(limit))")
                    .font(.caption2.weight(.medium))
                    .foregroundColor(.secondary)
            }

            HStack {
                Text("\(Int(ratio * 100))% used")
                    .font(.caption2.weight(.bold))
                    .foregroundColor(statusColor)
                Spacer()

                Button("Edit", action: onEdit)
                    .font(.caption)
                    .foregroundColor(.indigo)
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
        .contextMenu {
            Button("Edit Limit", action: onEdit)
            Button("Delete Budget", role: .destructive, action: onDelete)
        }
    }

    private func spentForCategory(_ category: String) -> Double {
        let calendar = Calendar.current
        return transactions
            .filter {
                $0.type == "expense" &&
                $0.category.lowercased() == category.lowercased() &&
                calendar.isDate($0.date, equalTo: Date(), toGranularity: .month) &&
                calendar.isDate($0.date, equalTo: Date(), toGranularity: .year)
            }
            .reduce(0.0) { $0 + $1.amount }
    }
}

// MARK: - Add Budget Sheet

struct AddBudgetSheet: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(\.modelContext) private var modelContext

    @Query(filter: #Predicate<CategoryItem> { $0.type == "expense_category" })
    private var expenseCategories: [CategoryItem]

    @State private var category: String = "Food"
    @State private var monthlyLimitString: String = ""
    @State private var errorText: String? = nil

    var body: some View {
        NavigationStack {
            Form {
                Section("Category") {
                    Picker("Category", selection: $category) {
                        ForEach(categoriesList, id: \.self) { c in
                            Text(c).tag(c)
                        }
                    }
                }

                Section("Monthly Limit (IQD)") {
                    TextField("e.g. 500000", text: $monthlyLimitString)
                        .keyboardType(.numberPad)
                }

                if let err = errorText {
                    Section {
                        Text(err).foregroundColor(.red).font(.caption)
                    }
                }
            }
            .navigationTitle("New Budget Limit")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        saveBudget()
                    }
                    .fontWeight(.semibold)
                }
            }
        }
    }

    private var categoriesList: [String] {
        let db: [String] = expenseCategories.map { $0.name }
        let defaults: [String] = ["Food", "Transportation", "Rent", "Bills", "Shopping", "Entertainment", "Travel", "Car", "Health", "Gym"]
        return Array(Set(db + defaults)).sorted()
    }

    private func saveBudget() {
        let clean = monthlyLimitString.replacingOccurrences(of: ",", with: "")
        guard let limit = Double(clean), limit > 0 else {
            errorText = "Enter a valid monthly limit > 0 IQD."
            return
        }

        let item = BudgetItem(category: category, monthlyLimit: limit)
        modelContext.insert(item)
        try? modelContext.save()
        dismiss()
    }
}

// MARK: - Edit Budget Sheet

struct EditBudgetSheet: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(\.modelContext) private var modelContext

    @Bindable var budget: BudgetItem
    @State private var limitString: String = ""

    var body: some View {
        NavigationStack {
            Form {
                Section("Category") {
                    Text(budget.category)
                        .font(.headline)
                }
                Section("Monthly Limit (IQD)") {
                    TextField("Limit", text: $limitString)
                        .keyboardType(.numberPad)
                }
            }
            .navigationTitle("Edit Budget")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        if let limit = Double(limitString.replacingOccurrences(of: ",", with: "")), limit > 0 {
                            budget.monthlyLimit = limit
                            try? modelContext.save()
                        }
                        dismiss()
                    }
                }
            }
            .onAppear {
                limitString = String(Int(budget.monthlyLimit))
            }
        }
    }
}

// MARK: - swiftpm/Sources/Views/SettingsView.swift
struct SettingsView: View {
    @Environment(\.modelContext) private var modelContext
    @AppStorage("biometricsEnabled") private var biometricsEnabled: Bool = false
    @AppStorage("selectedAppearance") private var selectedAppearance: String = "system"

    @Query private var allTransactions: [TransactionItem]
    @Query private var allGoals: [GoalItem]
    @Query private var allCategories: [CategoryItem]

    @State private var showCategoryManager: Bool = false
    @State private var exportShareItem: ExportDocument? = nil
    @State private var showExportSheet: Bool = false
    @State private var showBudgetsSheet: Bool = false
    @State private var bioAuthError: String? = nil

    var body: some View {
        NavigationStack {
            Form {
                // Section 1: Security & Biometrics
                Section("Security") {
                    Toggle(isOn: Binding(
                        get: { biometricsEnabled },
                        set: { newValue in
                            handleBiometricsToggle(newValue)
                        }
                    )) {
                        HStack {
                            Image(systemName: "faceid")
                                .foregroundColor(.indigo)
                            Text("Face ID / Passcode Lock")
                        }
                    }

                    if let err = bioAuthError {
                        Text(err)
                            .font(.caption)
                            .foregroundColor(.red)
                    }
                }

                // Section 2: Budgeting
                Section("Budgets") {
                    NavigationLink {
                        BudgetsView()
                    } label: {
                        HStack {
                            Image(systemName: "chart.bar.xaxis")
                                .foregroundColor(.indigo)
                            Text("Category Monthly Budgets")
                        }
                    }
                }

                // Section 3: Categories Management
                Section("Customization") {
                    NavigationLink {
                        CategoriesManagementView()
                    } label: {
                        HStack {
                            Image(systemName: "tag.fill")
                                .foregroundColor(.indigo)
                            Text("Manage Categories & Sources")
                        }
                    }
                }

                // Section 4: Data Export
                Section("Data Export") {
                    Button {
                        exportCSV()
                    } label: {
                        HStack {
                            Image(systemName: "tablecells.fill")
                                .foregroundColor(.green)
                            Text("Export Transactions as CSV")
                        }
                    }

                    Button {
                        exportJSON()
                    } label: {
                        HStack {
                            Image(systemName: "curlybraces")
                                .foregroundColor(.orange)
                            Text("Export Full Backup as JSON")
                        }
                    }
                }

                // Section 5: Appearance
                Section("Appearance") {
                    Picker("Theme", selection: $selectedAppearance) {
                        Text("System Default").tag("system")
                        Text("Light Mode").tag("light")
                        Text("Dark Mode").tag("dark")
                    }
                    .pickerStyle(.segmented)
                }

                // Section 6: App Information
                Section("About") {
                    HStack {
                        Text("Currency")
                        Spacer()
                        Text("IQD (Iraqi Dinar)")
                            .foregroundColor(.secondary)
                    }
                    HStack {
                        Text("Target Device")
                        Spacer()
                        Text("iPhone 13 Pro Max (iOS 17+)")
                            .foregroundColor(.secondary)
                    }
                    HStack {
                        Text("Database Engine")
                        Spacer()
                        Text("SwiftData (Local SQLite)")
                            .foregroundColor(.secondary)
                    }
                    HStack {
                        Text("Developer")
                        Spacer()
                        Text("Ahmed AL KUBAISI")
                            .fontWeight(.semibold)
                            .foregroundColor(.primary)
                    }
                    HStack {
                        Text("Email")
                        Spacer()
                        Text("ahmed.mjabbar95@gmail.com")
                            .foregroundColor(.blue)
                    }
                    HStack {
                        Text("Version")
                        Spacer()
                        Text("2.1.0 (Swift Playgrounds & iOS Native)")
                            .foregroundColor(.secondary)
                    }
                }
            }
            .navigationTitle("Settings")
            .sheet(item: $exportShareItem) { doc in
                ShareSheet(activityItems: [doc.fileURL])
            }
        }
    }

    private func handleBiometricsToggle(_ enable: Bool) {
        if !enable {
            biometricsEnabled = false
            bioAuthError = nil
            return
        }

        let context = LAContext()
        var error: NSError?
        if context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &error) {
            context.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: "Confirm your identity to enable biometric protection.") { success, authErr in
                DispatchQueue.main.async {
                    if success {
                        biometricsEnabled = true
                        bioAuthError = nil
                    } else {
                        biometricsEnabled = false
                        bioAuthError = authErr?.localizedDescription ?? "Authentication failed."
                    }
                }
            }
        } else {
            // Hardware doesn't support biometrics
            biometricsEnabled = true
            bioAuthError = nil
        }
    }

    // MARK: - Export Logic

    private func exportCSV() {
        var csvText = "ID,Type,Amount,Currency,Date,Category,Source,Description,Notes\n"
        for t in allTransactions {
            let dateStr = ISO8601DateFormatter().string(from: t.date)
            let desc = t.itemDescription.replacingOccurrences(of: ",", with: " ")
            let notes = t.notes.replacingOccurrences(of: ",", with: " ")
            let row = [
                "\(t.id)",
                "\"\(t.type)\"",
                "\(t.amount)",
                "\"\(t.currency)\"",
                "\"\(dateStr)\"",
                "\"\(t.category)\"",
                "\"\(t.source)\"",
                "\"\(desc)\"",
                "\"\(notes)\""
            ].joined(separator: ",") + "\n"
            csvText += row
        }

        let tempURL = FileManager.default.temporaryDirectory.appendingPathComponent("FinanceApp_Transactions.csv")
        try? csvText.write(to: tempURL, atomically: true, encoding: .utf8)
        exportShareItem = ExportDocument(fileURL: tempURL)
    }

    private func exportJSON() {
        let df = ISO8601DateFormatter()
        let transactionsDict = allTransactions.map { t in
            [
                "id": t.id.uuidString,
                "type": t.type,
                "amount": t.amount,
                "currency": t.currency,
                "date": df.string(from: t.date),
                "category": t.category,
                "source": t.source,
                "itemDescription": t.itemDescription,
                "notes": t.notes
            ] as [String : Any]
        }

        let goalsDict = allGoals.map { g in
            [
                "id": g.id.uuidString,
                "name": g.name,
                "targetAmount": g.targetAmount,
                "allocatedAmount": g.allocatedAmount,
                "currency": g.currency,
                "targetDate": g.targetDate != nil ? df.string(from: g.targetDate!) : nil,
                "goalDescription": g.goalDescription,
                "isCompleted": g.isCompleted
            ] as [String : Any?]
        }

        let fullBackup: [String: Any] = [
            "exportDate": df.string(from: Date()),
            "currency": "IQD",
            "transactions": transactionsDict,
            "goals": goalsDict
        ]

        if let data = try? JSONSerialization.data(withJSONObject: fullBackup, options: .prettyPrinted) {
            let tempURL = FileManager.default.temporaryDirectory.appendingPathComponent("FinanceApp_Backup.json")
            try? data.write(to: tempURL)
            exportShareItem = ExportDocument(fileURL: tempURL)
        }
    }
}

// MARK: - Export Helpers

struct ExportDocument: Identifiable {
    let id = UUID()
    let fileURL: URL
}

struct ShareSheet: UIViewControllerRepresentable {
    var activityItems: [Any]

    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: activityItems, applicationActivities: nil)
    }

    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}

// MARK: - Categories Management View

struct CategoriesManagementView: View {
    @Environment(\.modelContext) private var modelContext
    @Query private var categories: [CategoryItem]

    @State private var newCategoryName: String = ""
    @State private var newCategoryType: String = "expense_category"

    var body: some View {
        Form {
            Section("Add New Custom Category or Source") {
                Picker("Type", selection: $newCategoryType) {
                    Text("Expense Category").tag("expense_category")
                    Text("Income Source").tag("income_source")
                }
                .pickerStyle(.segmented)

                HStack {
                    TextField("Category Name", text: $newCategoryName)
                    Button("Add") {
                        addCategory()
                    }
                    .disabled(newCategoryName.trimmingCharacters(in: .whitespaces).isEmpty)
                }
            }

            Section("Expense Categories") {
                ForEach(categories.filter { $0.type == "expense_category" }) { item in
                    HStack {
                        Text(item.name)
                        Spacer()
                        if item.isDefault {
                            Text("Default")
                                .font(.caption2)
                                .foregroundColor(.secondary)
                        }
                    }
                }
                .onDelete { indices in
                    deleteCategory(at: indices, type: "expense_category")
                }
            }

            Section("Income Sources") {
                ForEach(categories.filter { $0.type == "income_source" }) { item in
                    HStack {
                        Text(item.name)
                        Spacer()
                        if item.isDefault {
                            Text("Default")
                                .font(.caption2)
                                .foregroundColor(.secondary)
                        }
                    }
                }
                .onDelete { indices in
                    deleteCategory(at: indices, type: "income_source")
                }
            }
        }
        .navigationTitle("Categories & Sources")
    }

    private func addCategory() {
        let trimmed = newCategoryName.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }
        let item = CategoryItem(name: trimmed, type: newCategoryType, isDefault: false)
        modelContext.insert(item)
        try? modelContext.save()
        newCategoryName = ""
    }

    private func deleteCategory(at indices: IndexSet, type: String) {
        let list = categories.filter { $0.type == type }
        for index in indices {
            let item = list[index]
            modelContext.delete(item)
        }
        try? modelContext.save()
    }
}

// MARK: - swiftpm/Sources/FinanceApp.swift
@main
struct FinanceApp: App {
    @AppStorage("biometricsEnabled") private var biometricsEnabled: Bool = false
    @AppStorage("selectedAppearance") private var selectedAppearance: String = "system"
    @State private var isUnlocked: Bool = false

    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            TransactionItem.self,
            GoalItem.self,
            BudgetItem.self,
            CategoryItem.self
        ])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)
        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()

    var body: some Scene {
        WindowGroup {
            Group {
                if biometricsEnabled && !isUnlocked {
                    LockScreenView(isUnlocked: $isUnlocked)
                } else {
                    RootTabView()
                }
            }
            .preferredColorScheme(appearanceScheme)
            .modelContainer(sharedModelContainer)
            .onAppear {
                if !biometricsEnabled {
                    isUnlocked = true
                }
                seedDefaultsIfNeeded()
            }
        }
    }

    private var appearanceScheme: ColorScheme? {
        switch selectedAppearance {
        case "light": return .light
        case "dark": return .dark
        default: return nil
        }
    }

    @MainActor
    private func seedDefaultsIfNeeded() {
        let context = sharedModelContainer.mainContext
        let descriptor = FetchDescriptor<CategoryItem>()
        guard let existing: [CategoryItem] = try? context.fetch(descriptor), existing.isEmpty else {
            return
        }

        seedDefaultCategories(into: context)
    }

    @MainActor
    private func seedDefaultCategories(into context: ModelContext) {
        let expenseCategories: [String] = [
            "Food", "Transportation", "Rent", "Bills", "Shopping",
            "Entertainment", "Travel", "Family", "Car", "Health", "Gym", "Other"
        ]
        for name: String in expenseCategories {
            let item = CategoryItem(name: name, type: "expense_category", isDefault: true)
            context.insert(item)
        }

        let incomeSources: [String] = [
            "Salary", "Bonus", "Freelance", "Business", "Investment", "Other"
        ]
        for name: String in incomeSources {
            let item = CategoryItem(name: name, type: "income_source", isDefault: true)
            context.insert(item)
        }

        try? context.save()
    }
}

// MARK: - Root Tab View

struct RootTabView: View {
    @State private var selectedTab: Int = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            DashboardView(selectedTab: $selectedTab)
                .tabItem {
                    Label("Dashboard", systemImage: "house.fill")
                }
                .tag(0)

            PlansDashboardView(selectedTab: $selectedTab)
                .tabItem {
                    Label("Plans Dashboard", systemImage: "gauge.with.needle.fill")
                }
                .tag(1)

            TransactionsView()
                .tabItem {
                    Label("Transactions", systemImage: "list.bullet.rectangle.portrait.fill")
                }
                .tag(2)

            AnalyticsView()
                .tabItem {
                    Label("Analytics", systemImage: "chart.pie.fill")
                }
                .tag(3)

            GoalsView()
                .tabItem {
                    Label("Plans", systemImage: "target")
                }
                .tag(4)

            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gearshape.fill")
                }
                .tag(5)
        }
        .tint(.indigo)
    }
}

// MARK: - Lock Screen (LocalAuthentication)

struct LockScreenView: View {
    @Binding var isUnlocked: Bool
    @State private var authError: String? = nil

    var body: some View {
        VStack(spacing: 24) {
            Spacer()

            Image(systemName: "lock.shield.fill")
                .font(.system(size: 72))
                .foregroundColor(.indigo)

            VStack(spacing: 8) {
                Text("FinanceApp Protected")
                    .font(.system(.title2, design: .rounded, weight: .bold))
                Text("Authenticate with Face ID or Device Passcode to access your finances.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 32)
            }

            if let error = authError {
                Text(error)
                    .font(.caption)
                    .foregroundColor(.red)
                    .padding(.horizontal)
            }

            Spacer()

            Button(action: authenticate) {
                HStack {
                    Image(systemName: "faceid")
                    Text("Unlock with Face ID")
                }
                .font(.headline)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.indigo)
                .cornerRadius(16)
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 40)
        }
        .onAppear(perform: authenticate)
    }

    private func authenticate() {
        let context = LAContext()
        var error: NSError?

        if context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &error) {
            let reason = "Unlock FinanceApp to view your balance and transactions."
            context.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: reason) { success, authErr in
                DispatchQueue.main.async {
                    if success {
                        isUnlocked = true
                        authError = nil
                    } else {
                        authError = authErr?.localizedDescription ?? "Authentication failed"
                    }
                }
            }
        } else {
            // Simulator or hardware without biometrics fallback
            isUnlocked = true
        }
    }
}
