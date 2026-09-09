//
//  SharedDataBridge.swift
//  FinanceWidgets
//
//  Created for FinanceApp (Developer: Ahmed AL KUBAISI)
//  Synchronizes data between iOS App and WidgetKit using App Groups
//

import Foundation

public struct WidgetPlanItem: Codable, Identifiable {
    public let id: String
    public let name: String
    public let priority: String
    public let allocatedAmount: Double
    public let targetAmount: Double
    public let remainingAmount: Double
    public let progressPercent: Int
    public let statusFlag: String
    public let isDelayed: Bool
    public let delayMonths: Int
    public let deepLink: String

    public init(
        id: String,
        name: String,
        priority: String,
        allocatedAmount: Double,
        targetAmount: Double,
        remainingAmount: Double,
        progressPercent: Int,
        statusFlag: String,
        isDelayed: Bool,
        delayMonths: Int,
        deepLink: String
    ) {
        self.id = id
        self.name = name
        self.priority = priority
        self.allocatedAmount = allocatedAmount
        self.targetAmount = targetAmount
        self.remainingAmount = remainingAmount
        self.progressPercent = progressPercent
        self.statusFlag = statusFlag
        self.isDelayed = isDelayed
        self.delayMonths = delayMonths
        self.deepLink = deepLink
    }
}

public struct WidgetDataPayload: Codable {
    public let appGroupSuite: String
    public let unallocatedBalance: Double
    public let unallocatedBalanceFormatted: String
    public let actualBalance: Double
    public let actualBalanceFormatted: String
    public let monthlyCapacity: Double
    public let currency: String
    public let topPlans: [WidgetPlanItem]
    public let lastSyncTimestamp: String

    public static var placeholder: WidgetDataPayload {
        WidgetDataPayload(
            appGroupSuite: "group.com.ahmedalkubaisy.finance",
            unallocatedBalance: 750000,
            unallocatedBalanceFormatted: "750,000 IQD",
            actualBalance: 2450000,
            actualBalanceFormatted: "2,450,000 IQD",
            monthlyCapacity: 450000,
            currency: "IQD",
            topPlans: [
                WidgetPlanItem(
                    id: "plan-1",
                    name: "Emergency Fund",
                    priority: "critical",
                    allocatedAmount: 1800000,
                    targetAmount: 3000000,
                    remainingAmount: 1200000,
                    progressPercent: 60,
                    statusFlag: "On Track",
                    isDelayed: false,
                    delayMonths: 0,
                    deepLink: "myapp://plan?id=plan-1"
                ),
                WidgetPlanItem(
                    id: "plan-2",
                    name: "New Car Downpayment",
                    priority: "high",
                    allocatedAmount: 650000,
                    targetAmount: 2000000,
                    remainingAmount: 1350000,
                    progressPercent: 32,
                    statusFlag: "Ahead",
                    isDelayed: false,
                    delayMonths: 0,
                    deepLink: "myapp://plan?id=plan-2"
                )
            ],
            lastSyncTimestamp: ISO8601DateFormatter().string(from: Date())
        )
    }
}

public class SharedDataBridge {
    public static let shared = SharedDataBridge()
    public static let appGroupSuiteName = "group.com.ahmedalkubaisy.finance"
    public static let payloadStorageKey = "group.com.ahmedalkubaisy.finance"

    private var userDefaults: UserDefaults? {
        UserDefaults(suiteName: SharedDataBridge.appGroupSuiteName)
    }

    public func readWidgetPayload() -> WidgetDataPayload {
        guard let defaults = userDefaults,
              let rawString = defaults.string(forKey: SharedDataBridge.payloadStorageKey),
              let data = rawString.data(using: .utf8) else {
            return WidgetDataPayload.placeholder
        }

        do {
            let decoded = try JSONDecoder().decode(WidgetDataPayload.self, from: data)
            return decoded
        } catch {
            print("SharedDataBridge decoding error: \(error)")
            return WidgetDataPayload.placeholder
        }
    }

    public func writeWidgetPayload(_ payload: WidgetDataPayload) {
        guard let defaults = userDefaults else { return }
        do {
            let encoded = try JSONEncoder().encode(payload)
            if let jsonString = String(data: encoded, encoding: .utf8) {
                defaults.set(jsonString, forKey: SharedDataBridge.payloadStorageKey)
                defaults.synchronize()
            }
        } catch {
            print("SharedDataBridge encoding error: \(error)")
        }
    }
}
