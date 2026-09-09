import UIKit
import Capacitor

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
}
