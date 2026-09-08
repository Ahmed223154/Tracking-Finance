import SwiftUI
import SwiftData
import LocalAuthentication

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
