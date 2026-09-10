import JSZip from 'jszip';

import singleFileBundleCode from '../../SingleFileBundle.swift?raw';
import packageSwiftCode from '../../swiftpm/Package.swift?raw';
import infoPlistCode from '../../swiftpm/Info.plist?raw';
import financeAppCode from '../../swiftpm/Sources/FinanceApp.swift?raw';
import modelsCode from '../../swiftpm/Sources/Models.swift?raw';
import utilitiesCode from '../../swiftpm/Sources/Utilities.swift?raw';
import financialEngineCode from '../../swiftpm/Sources/FinancialEngine.swift?raw';
import dashboardViewCode from '../../swiftpm/Sources/Views/DashboardView.swift?raw';
import plansDashboardViewCode from '../../swiftpm/Sources/Views/PlansDashboardView.swift?raw';
import quickAddTransactionSheetCode from '../../swiftpm/Sources/Views/QuickAddTransactionSheet.swift?raw';
import transactionsViewCode from '../../swiftpm/Sources/Views/TransactionsView.swift?raw';
import analyticsViewCode from '../../swiftpm/Sources/Views/AnalyticsView.swift?raw';
import goalsViewCode from '../../swiftpm/Sources/Views/GoalsView.swift?raw';
import budgetsViewCode from '../../swiftpm/Sources/Views/BudgetsView.swift?raw';
import settingsViewCode from '../../swiftpm/Sources/Views/SettingsView.swift?raw';
import readmeCode from '../../swiftpm/README.md?raw';
import financeWidgetCode from '../../ios/App/FinanceWidget/FinanceWidget.swift?raw';
import addExpenseIntentCode from '../../ios/App/FinanceWidget/AddExpenseIntent.swift?raw';
import appDelegateCode from '../../ios/App/App/AppDelegate.swift?raw';
import widgetBridgePluginCode from '../../ios/App/App/WidgetBridgePlugin.m?raw';
import appEntitlementsCode from '../../ios/App/App/App.entitlements?raw';
import financeWidgetEntitlementsCode from '../../ios/App/FinanceWidget/FinanceWidget.entitlements?raw';

export interface SwiftFile {
  path: string;
  name: string;
  category: 'manifest' | 'core' | 'views' | 'bundle' | 'docs' | 'widget';
  description: string;
  code: string;
}

export const SWIFT_FILES: SwiftFile[] = [
  {
    path: 'SingleFileBundle.swift',
    name: 'SingleFileBundle.swift',
    category: 'bundle',
    description: '⭐ Complete 100% self-contained app ready to paste into Swift Playgrounds 4',
    code: singleFileBundleCode,
  },
  {
    path: 'Package.swift',
    name: 'Package.swift',
    category: 'manifest',
    description: 'Swift Playgrounds 4 & Swift Package Manager manifest',
    code: packageSwiftCode,
  },
  {
    path: 'Info.plist',
    name: 'Info.plist',
    category: 'manifest',
    description: 'App configuration, bundle version 1.1.0, and Face ID permissions',
    code: infoPlistCode,
  },
  {
    path: 'Sources/FinanceApp.swift',
    name: 'FinanceApp.swift',
    category: 'core',
    description: '@main entry point, 6-tab navigation container & theme setup',
    code: financeAppCode,
  },
  {
    path: 'Sources/Models.swift',
    name: 'Models.swift',
    category: 'core',
    description: 'SwiftData @Model classes for Transactions, Plans, Budgets & Categories',
    code: modelsCode,
  },
  {
    path: 'Sources/Utilities.swift',
    name: 'Utilities.swift',
    category: 'core',
    description: 'Currency formatting (IQD), date formatters & utilities',
    code: utilitiesCode,
  },
  {
    path: 'Sources/FinancialEngine.swift',
    name: 'FinancialEngine.swift',
    category: 'core',
    description: 'Financial analysis engine, plan achievability calculations & liquidity',
    code: financialEngineCode,
  },
  {
    path: 'Sources/Views/DashboardView.swift',
    name: 'DashboardView.swift',
    category: 'views',
    description: 'Main financial overview, balances & recent transaction shortcuts',
    code: dashboardViewCode,
  },
  {
    path: 'Sources/Views/PlansDashboardView.swift',
    name: 'PlansDashboardView.swift',
    category: 'views',
    description: 'Dedicated Planning Control Center & What-If Planning Simulator',
    code: plansDashboardViewCode,
  },
  {
    path: 'Sources/Views/QuickAddTransactionSheet.swift',
    name: 'QuickAddTransactionSheet.swift',
    category: 'views',
    description: 'Quick transaction modal with category picker & validation',
    code: quickAddTransactionSheetCode,
  },
  {
    path: 'Sources/Views/TransactionsView.swift',
    name: 'TransactionsView.swift',
    category: 'views',
    description: 'Transaction history, search, filtering, editing & deletion',
    code: transactionsViewCode,
  },
  {
    path: 'Sources/Views/AnalyticsView.swift',
    name: 'AnalyticsView.swift',
    category: 'views',
    description: 'Swift Charts visual analytics, monthly net trends & category rankings',
    code: analyticsViewCode,
  },
  {
    path: 'Sources/Views/GoalsView.swift',
    name: 'GoalsView.swift',
    category: 'views',
    description: 'Plans management, target tracking, fund allocation & plan deletion',
    code: goalsViewCode,
  },
  {
    path: 'Sources/Views/BudgetsView.swift',
    name: 'BudgetsView.swift',
    category: 'views',
    description: 'Category monthly budget limits & spending progress indicators',
    code: budgetsViewCode,
  },
  {
    path: 'Sources/Views/SettingsView.swift',
    name: 'SettingsView.swift',
    category: 'views',
    description: 'Settings, Face ID toggle, CSV/JSON export & category management',
    code: settingsViewCode,
  },
  {
    path: 'FinanceWidget/FinanceWidget.swift',
    name: 'FinanceWidget.swift',
    category: 'widget',
    description: 'iOS WidgetKit extension with 4 display modes & App Group sync bridge',
    code: financeWidgetCode,
  },
  {
    path: 'App/AppDelegate.swift',
    name: 'AppDelegate.swift',
    category: 'core',
    description: 'Capacitor native bridge with exitToHomeScreen() and updateWidgetData live App Group syncing',
    code: appDelegateCode,
  },
  {
    path: 'App/WidgetBridgePlugin.m',
    name: 'WidgetBridgePlugin.m',
    category: 'core',
    description: 'Objective-C Capacitor plugin macro export for WidgetBridge native methods',
    code: widgetBridgePluginCode,
  },
  {
    path: 'FinanceWidget/AddExpenseIntent.swift',
    name: 'AddExpenseIntent.swift',
    category: 'widget',
    description: 'Interactive AppIntents for instant zero-launch expense and income logging',
    code: addExpenseIntentCode,
  },
  {
    path: 'App/App.entitlements',
    name: 'App.entitlements',
    category: 'manifest',
    description: 'App Group entitlement configuration for main iOS application container',
    code: appEntitlementsCode,
  },
  {
    path: 'FinanceWidget/FinanceWidget.entitlements',
    name: 'FinanceWidget.entitlements',
    category: 'manifest',
    description: 'App Group entitlement configuration for WidgetKit extension target',
    code: financeWidgetEntitlementsCode,
  },
  {
    path: 'README.md',
    name: 'README.md',
    category: 'docs',
    description: 'Setup and deployment guide for iPad and iPhone',
    code: readmeCode,
  },
];

export async function downloadSwiftpmPackageZip(): Promise<void> {
  const zip = new JSZip();
  const root = zip.folder('FinanceApp.swiftpm');
  if (!root) return;

  // Add package files directly into FinanceApp.swiftpm bundle folder
  for (const file of SWIFT_FILES) {
    if (file.category !== 'bundle') {
      root.file(file.path, file.code);
    }
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  // Use FinanceApp-iOS.zip so macOS Archive Utility doesn't name the outer extraction folder FinanceApp.swiftpm
  a.download = 'FinanceApp-iOS.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadSingleFileBundle(): void {
  const bundleFile = SWIFT_FILES.find(f => f.category === 'bundle');
  if (!bundleFile) return;
  const blob = new Blob([bundleFile.code], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'SingleFileBundle.swift';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
