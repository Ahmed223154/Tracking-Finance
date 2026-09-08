import SwiftUI
import SwiftData

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
