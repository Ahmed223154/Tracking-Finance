import SwiftUI
import SwiftData
import LocalAuthentication
import UniformTypeIdentifiers

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
                        Text("2.1.0 (Native iOS)")
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
