import SwiftUI
import SwiftData

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
