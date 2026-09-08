import Foundation
import SwiftData

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
