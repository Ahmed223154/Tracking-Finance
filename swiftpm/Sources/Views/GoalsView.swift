import SwiftUI
import SwiftData

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
