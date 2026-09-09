import UIKit
import Capacitor

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let _ = (scene as? UIWindowScene) else { return }

        // Handle Quick Action Shortcut when app launches from dead state
        if let shortcutItem = connectionOptions.shortcutItem {
            handleShortcutItem(shortcutItem)
        }
    }

    func sceneDidDisconnect(_ scene: UIScene) {}

    func sceneDidBecomeActive(_ scene: UIScene) {}

    func sceneWillResignActive(_ scene: UIScene) {}

    func sceneWillEnterForeground(_ scene: UIScene) {}

    func sceneDidEnterBackground(_ scene: UIScene) {}

    func windowScene(_ windowScene: UIWindowScene, performActionFor shortcutItem: UIApplicationShortcutItem, completionHandler: @escaping (Bool) -> Void) {
        let handled = handleShortcutItem(shortcutItem)
        completionHandler(handled)
    }

    @discardableResult
    private func handleShortcutItem(_ shortcutItem: UIApplicationShortcutItem) -> Bool {
        if let urlString = shortcutItem.userInfo?["url"] as? String, let url = URL(string: urlString) {
            NotificationCenter.default.post(name: Notification.Name(CAPNotifications.URLOpen.rawValue), object: url)
            return true
        }
        return false
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        if let url = URLContexts.first?.url {
            NotificationCenter.default.post(name: Notification.Name(CAPNotifications.URLOpen.rawValue), object: url)
        }
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        NotificationCenter.default.post(name: Notification.Name(CAPNotifications.ContinueUserActivity.rawValue), object: userActivity)
    }
}

