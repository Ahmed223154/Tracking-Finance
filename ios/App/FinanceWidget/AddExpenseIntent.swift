//
//  AddExpenseIntent.swift
//  FinanceWidget
//
//  Created for FinanceApp (Developer: Ahmed AL KUBAISI)
//  Interactive AppIntent allowing instant transaction logging from iOS 17+ Home Screen widgets
//  without opening the main application, using a native floating interactive snippet.
//

import AppIntents
import SwiftUI
import WidgetKit

// MARK: - Quick Add Expense Intent

public struct QuickAddExpenseIntent: AppIntent {
    public static var title: LocalizedStringResource = "Quick Log Expense"
    public static var description = IntentDescription("Log an expense directly from the Home Screen.")
    public static var openAppWhenRun: Bool = false // Crucial: Keeps the user on the Home Screen

    @Parameter(title: "Amount")
    public var amount: Double?

    @Parameter(title: "Category", optionsProvider: ExpenseCategoryOptionsProvider())
    public var category: String?

    @Parameter(title: "Description")
    public var note: String?

    public init() {}

    public init(amount: Double? = nil, category: String? = nil, note: String? = nil) {
        self.amount = amount
        self.category = category
        self.note = note
    }

    @MainActor
    public func perform() async throws -> some IntentResult & ProvidesDialog {
        // 1. Prompt for amount if not prefilled
        let expenseAmount = try await $amount.requestValue("Enter Amount:")

        // 2. Prompt for category
        let expenseCategory = try await $category.requestValue("Select Category:")

        // 3. Write directly to shared App Group storage
        if let defaults = UserDefaults(suiteName: "group.com.ahmedalrubaye.financeapp") {
            var pendingExpenses = defaults.array(forKey: "pending_transactions") as? [[String: Any]] ?? []
            let newTx: [String: Any] = [
                "id": UUID().uuidString,
                "amount": expenseAmount,
                "category": expenseCategory,
                "note": note ?? "",
                "type": "expense",
                "date": ISO8601DateFormatter().string(from: Date())
            ]
            pendingExpenses.append(newTx)
            defaults.set(pendingExpenses, forKey: "pending_transactions")

            // Deduct from current balance/unallocated in the widget snapshot cache
            let currentUnallocated = defaults.double(forKey: "cached_unallocated")
            defaults.set(max(0, currentUnallocated - expenseAmount), forKey: "cached_unallocated")
            
            // Deduct from total balance if cached
            let currentBalance = defaults.double(forKey: "cached_balance")
            if currentBalance > 0 {
                defaults.set(max(0, currentBalance - expenseAmount), forKey: "cached_balance")
            }
            defaults.synchronize()
        }

        // 4. Force immediate widget refresh
        WidgetCenter.shared.reloadAllTimelines()

        // 5. Present a floating system confirmation banner on the Home Screen
        return .result(dialog: "Logged \(expenseAmount, format: .currency(code: "IQD")) under \(expenseCategory)!")
    }
}

// Category picker choices for expenses
public struct ExpenseCategoryOptionsProvider: DynamicOptionsProvider {
    public init() {}

    public func results() async throws -> [String] {
        return [
            "Food & Dining",
            "Transport",
            "Bills & Utilities",
            "Shopping",
            "Entertainment",
            "Health & Medical",
            "Groceries",
            "Other"
        ]
    }
}

// MARK: - Quick Add Income Intent

public struct QuickAddIncomeIntent: AppIntent {
    public static var title: LocalizedStringResource = "Quick Log Income"
    public static var description = IntentDescription("Log income directly from the Home Screen.")
    public static var openAppWhenRun: Bool = false // Keeps user on Home Screen

    @Parameter(title: "Amount")
    public var amount: Double?

    @Parameter(title: "Source", optionsProvider: IncomeSourceOptionsProvider())
    public var category: String?

    @Parameter(title: "Description")
    public var note: String?

    public init() {}

    public init(amount: Double? = nil, category: String? = nil, note: String? = nil) {
        self.amount = amount
        self.category = category
        self.note = note
    }

    @MainActor
    public func perform() async throws -> some IntentResult & ProvidesDialog {
        // 1. Prompt for amount if not prefilled
        let incomeAmount = try await $amount.requestValue("Enter Amount:")

        // 2. Prompt for income source
        let incomeSource = try await $category.requestValue("Select Source:")

        // 3. Write directly to shared App Group storage
        if let defaults = UserDefaults(suiteName: "group.com.ahmedalrubaye.financeapp") {
            var pendingExpenses = defaults.array(forKey: "pending_transactions") as? [[String: Any]] ?? []
            let newTx: [String: Any] = [
                "id": UUID().uuidString,
                "amount": incomeAmount,
                "category": incomeSource,
                "note": note ?? "",
                "type": "income",
                "date": ISO8601DateFormatter().string(from: Date())
            ]
            pendingExpenses.append(newTx)
            defaults.set(pendingExpenses, forKey: "pending_transactions")

            // Add to current balance/unallocated in the widget snapshot cache
            let currentUnallocated = defaults.double(forKey: "cached_unallocated")
            defaults.set(currentUnallocated + incomeAmount, forKey: "cached_unallocated")

            let currentBalance = defaults.double(forKey: "cached_balance")
            if currentBalance > 0 {
                defaults.set(currentBalance + incomeAmount, forKey: "cached_balance")
            }
            defaults.synchronize()
        }

        // 4. Force immediate widget refresh
        WidgetCenter.shared.reloadAllTimelines()

        // 5. Present floating confirmation banner
        return .result(dialog: "Logged \(incomeAmount, format: .currency(code: "IQD")) from \(incomeSource)!")
    }
}

// Source picker choices for income
public struct IncomeSourceOptionsProvider: DynamicOptionsProvider {
    public init() {}

    public func results() async throws -> [String] {
        return [
            "Salary",
            "Freelance",
            "Investments",
            "Business",
            "Gift",
            "Bonus",
            "Other"
        ]
    }
}
