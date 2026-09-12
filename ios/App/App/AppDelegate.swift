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
