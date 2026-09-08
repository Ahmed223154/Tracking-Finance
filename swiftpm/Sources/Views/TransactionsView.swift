import SwiftUI
import SwiftData

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
