import UIKit
import Capacitor
import WidgetKit

// MARK: - Capacitor Widget Bridge Plugin
@objc(WidgetBridgePlugin)
public class WidgetBridgePlugin: CAPPlugin {

    // MARK: - 1. Exit to Home Screen
    @objc func exitToHomeScreen(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            // Method 1: Private UIApplication selector
            let selector = Selector(("suspend"))
            if UIApplication.shared.responds(to: selector) {
                UIApplication.shared.perform(selector)
            } else {
                UIControl().sendAction(#selector(NSXPCConnection.suspend), to: UIApplication.shared, for: nil)
            }
            call.resolve(["success": true])
        }
    }

    // MARK: - 2. Universal Widget Data Sync (Writes both individual keys AND JSON)
    @objc func updateWidgetData(_ call: CAPPluginCall) {
        let balance = call.getDouble("balance") ?? 0.0
        let unallocated = call.getDouble("unallocated") ?? 0.0
        let priorityPlanName = call.getString("priorityPlanName") ?? "No Active Plan"
        let priorityPlanProgress = call.getDouble("priorityPlanProgress") ?? 0.0

        let suite = "group.com.ahmedalrubaye.financeapp"
        guard let sharedDefaults = UserDefaults(suiteName: suite) else {
            NSLog("❌ [WidgetBridge] Failed to open UserDefaults suite: %@", suite)
            call.reject("Cannot access App Group: \(suite)")
            return
        }

        // Write individual keys (used by simplified widget layouts)
        sharedDefaults.set(balance, forKey: "cached_balance")
        sharedDefaults.set(unallocated, forKey: "cached_unallocated")
        sharedDefaults.set(priorityPlanName, forKey: "cached_priority_plan_name")
        sharedDefaults.set(priorityPlanProgress, forKey: "cached_priority_plan_progress")

        // Also write structured JSON string (in case widget expects JSON model)
        let payload: [String: Any] = [
            "balance": balance,
            "unallocated": unallocated,
            "priorityPlanName": priorityPlanName,
            "priorityPlanProgress": priorityPlanProgress
        ]
        if let jsonData = try? JSONSerialization.data(withJSONObject: payload, options: []),
           let jsonString = String(data: jsonData, encoding: .utf8) {
            sharedDefaults.set(jsonString, forKey: "widget_data_json")
            sharedDefaults.set(jsonString, forKey: "finance_widget_data")
        }

        sharedDefaults.synchronize()

        NSLog("✅ [WidgetBridge] Successfully saved balance: %f, unallocated: %f. Reloading timelines...", balance, unallocated)
        WidgetCenter.shared.reloadAllTimelines()
        call.resolve(["success": true])
    }

    @objc func minimizeApp(_ call: CAPPluginCall? = nil) {
        DispatchQueue.main.async {
            let selector = Selector(("suspend"))
            if UIApplication.shared.responds(to: selector) {
                UIApplication.shared.perform(selector)
            } else {
                UIControl().sendAction(#selector(NSXPCConnection.suspend), to: UIApplication.shared, for: nil)
            }
        }
        call?.resolve(["success": true])
    }

    @objc func syncWidgetData(_ call: CAPPluginCall) {
        let suite = call.getString("suite") ?? "group.com.ahmedalrubaye.financeapp"
        let displayMode = call.getString("displayMode") ?? "balance"
        let selectedPlanId = call.getString("selectedPlanId")
        let dataJson = call.getString("data") ?? "{}"

        if let sharedDefaults = UserDefaults(suiteName: suite) {
            sharedDefaults.set(displayMode, forKey: "widget_display_mode")
            if let selectedPlanId = selectedPlanId, !selectedPlanId.isEmpty {
                sharedDefaults.set(selectedPlanId, forKey: "widget_selected_plan_id")
            } else {
                sharedDefaults.removeObject(forKey: "widget_selected_plan_id")
            }
            sharedDefaults.set(dataJson, forKey: "widget_data_json")
            sharedDefaults.set(dataJson, forKey: "finance_widget_data")
            sharedDefaults.synchronize()

            if #available(iOS 14.0, *) {
                WidgetCenter.shared.reloadAllTimelines()
            }
            call.resolve(["success": true])
        } else {
            call.reject("Could not access UserDefaults suite: \(suite)")
        }
    }

    /// Retrieve pending transactions logged via Home Screen AppIntents
    @objc func getPendingTransactions(_ call: CAPPluginCall) {
        let suite = call.getString("suite") ?? "group.com.ahmedalrubaye.financeapp"
        if let sharedDefaults = UserDefaults(suiteName: suite) {
            let pending = sharedDefaults.array(forKey: "pending_transactions") as? [[String: Any]] ?? []
            call.resolve(["transactions": pending])
        } else {
            call.resolve(["transactions": []])
        }
    }

    /// Clear pending transactions after successful reconciliation
    @objc func clearPendingTransactions(_ call: CAPPluginCall) {
        let suite = call.getString("suite") ?? "group.com.ahmedalrubaye.financeapp"
        if let sharedDefaults = UserDefaults(suiteName: suite) {
            sharedDefaults.removeObject(forKey: "pending_transactions")
            sharedDefaults.synchronize()
            call.resolve(["success": true])
        } else {
            call.resolve(["success": false])
        }
    }

    /// Atomically read and flush pending transactions
    @objc func flushPendingTransactions(_ call: CAPPluginCall) {
        let suite = call.getString("suite") ?? "group.com.ahmedalrubaye.financeapp"
        if let sharedDefaults = UserDefaults(suiteName: suite) {
            let pending = sharedDefaults.array(forKey: "pending_transactions") as? [[String: Any]] ?? []
            sharedDefaults.removeObject(forKey: "pending_transactions")
            sharedDefaults.synchronize()
            call.resolve(["transactions": pending])
        } else {
            call.resolve(["transactions": []])
        }
    }
}

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        if let shortcutItem = launchOptions?[.shortcutItem] as? UIApplicationShortcutItem {
            DispatchQueue.main.async {
                _ = self.handleShortcutItem(shortcutItem)
            }
        }
        return true
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }

    func application(_ application: UIApplication, performActionFor shortcutItem: UIApplicationShortcutItem, completionHandler: @escaping (Bool) -> Void) {
        let handled = handleShortcutItem(shortcutItem)
        completionHandler(handled)
    }

    private func handleShortcutItem(_ shortcutItem: UIApplicationShortcutItem) -> Bool {
        var targetUrlStr: String?

        if let urlStr = shortcutItem.userInfo?["url"] as? String {
            targetUrlStr = urlStr
        } else {
            switch shortcutItem.type {
            case "com.ahmedalkubaisy.finance.add-expense", "add_expense", "add-expense":
                targetUrlStr = "myapp://add-expense"
            case "com.ahmedalkubaisy.finance.add-income", "add_income", "add-income":
                targetUrlStr = "myapp://add-income"
            case "com.ahmedalkubaisy.finance.plans-dashboard", "plans_overview", "plans":
                targetUrlStr = "myapp://plans-dashboard"
            default:
                break
            }
        }

        guard let targetUrlStr = targetUrlStr, let url = URL(string: targetUrlStr) else {
            return false
        }

        return ApplicationDelegateProxy.shared.application(UIApplication.shared, open: url, options: [:])
    }

    @objc func minimizeApp() {
        DispatchQueue.main.async {
            UIControl().sendAction(#selector(NSXPCConnection.suspend), to: UIApplication.shared, for: nil)
        }
    }
}
