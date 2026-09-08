// swift-tools-version: 5.9

// WARNING:
// This file is created and managed by Swift Playgrounds.
// It is recommended to use the Swift Playgrounds UI to edit this file.

import PackageDescription
import AppleProductTypes

let package = Package(
    name: "FinanceApp",
    platforms: [
        .iOS("17.0")
    ],
    products: [
        .iOSApplication(
            name: "FinanceApp",
            targets: ["AppModule"],
            bundleIdentifier: "com.personalfinance.iqd",
            teamIdentifier: "",
            displayVersion: "1.0",
            bundleVersion: "1",
            appIcon: .placeholder(icon: .coins),
            accentColor: .presetColor(.indigo),
            supportedDeviceFamilies: [
                .pad,
                .phone
            ],
            supportedInterfaceOrientations: [
                .portrait,
                .landscapeRight,
                .landscapeLeft,
                .portraitUpsideDown(.when(deviceFamilies: [.pad]))
            ],
            capabilities: [
                .faceID(purposeString: "Unlock your financial data, balances, and budgets with Face ID.")
            ]
        )
    ],
    targets: [
        .executableTarget(
            name: "AppModule",
            path: "."
        )
    ]
)
