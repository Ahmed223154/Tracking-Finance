//
//  FinanceWidget.swift
//  FinanceWidget
//
//  Futuristic "Quick-Action Command HUD" Action Deck
//  Zero-latency quick entry launcher for iOS Home Screen.
//  Zero battery consumption, zero memory overhead, 100% financial privacy.
//

import WidgetKit
import SwiftUI

// MARK: - Color Hex Extension
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - iOS 17 Container Background Compatibility
extension View {
    @ViewBuilder
    func widgetContainerBackground() -> some View {
        if #available(iOSApplicationExtension 17.0, *) {
            containerBackground(for: .widget) {
                HUDWidgetBackgroundView()
            }
        } else {
            background(HUDWidgetBackgroundView())
        }
    }
}

// MARK: - Static Timeline Entry & Provider
// Static configuration with no background polling, consuming zero battery and zero memory.
struct CommandDeckEntry: TimelineEntry {
    let date: Date
}

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> CommandDeckEntry {
        CommandDeckEntry(date: Date())
    }

    func getSnapshot(in context: Context, completion: @escaping (CommandDeckEntry) -> Void) {
        completion(CommandDeckEntry(date: Date()))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<CommandDeckEntry>) -> Void) {
        // Reload once per day at midnight or never, ensuring zero CPU / battery overhead
        let midnight = Calendar.current.startOfDay(for: Date()).addingTimeInterval(86400)
        let timeline = Timeline(entries: [CommandDeckEntry(date: Date())], policy: .after(midnight))
        completion(timeline)
    }
}

// MARK: - Futuristic Cyber-HUD Background View
struct HUDWidgetBackgroundView: View {
    var body: some View {
        ZStack {
            // Deep OLED Black Base (#0B0F17)
            Color(hex: "#0B0F17")

            // Subtle Cyber Radial Neon Glow (top-center)
            RadialGradient(
                gradient: Gradient(colors: [
                    Color(hex: "#00F5A0").opacity(0.14),
                    Color(hex: "#062E2E").opacity(0.08),
                    Color(hex: "#0B0F17").opacity(0.92),
                    Color(hex: "#0B0F17")
                ]),
                center: .top,
                startRadius: 10,
                endRadius: 220
            )

            // Subtle Cyber Grid Overlay
            VStack(spacing: 16) {
                ForEach(0..<10) { _ in
                    Rectangle()
                        .fill(Color.white.opacity(0.015))
                        .frame(height: 1)
                }
            }

            // Outer Border Gradient Rim
            RoundedRectangle(cornerRadius: 22)
                .strokeBorder(
                    LinearGradient(
                        colors: [
                            Color.white.opacity(0.14),
                            Color(hex: "#00F5A0").opacity(0.18),
                            Color.white.opacity(0.04)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: 1
                )
                .padding(2)
        }
    }
}

// MARK: - Main Command HUD Widget Entry View
struct FinanceWidgetEntryView: View {
    var entry: CommandDeckEntry
    @Environment(\.widgetFamily) var family

    var body: some View {
        Group {
            switch family {
            case .systemMedium:
                MediumCommandHUDView()
            default:
                SmallCommandHUDView()
            }
        }
        .widgetContainerBackground()
    }
}

// MARK: - Small Family View (Compact Dual-Action Matrix)
struct SmallCommandHUDView: View {
    var body: some View {
        VStack(spacing: 10) {
            // HUD Status Header
            HStack(spacing: 6) {
                // Glowing emerald status indicator
                Circle()
                    .fill(Color(hex: "#00F5A0"))
                    .frame(width: 6, height: 6)
                    .shadow(color: Color(hex: "#00F5A0").opacity(0.9), radius: 4)

                Text("COMMAND // HUD")
                    .font(.system(size: 9, weight: .black, design: .monospaced))
                    .foregroundColor(.white.opacity(0.85))
                    .tracking(0.8)

                Spacer()

                HStack(spacing: 3) {
                    Image(systemName: "bolt.fill")
                        .font(.system(size: 7))
                        .foregroundColor(Color(hex: "#00F5A0"))
                    Text("FAST")
                        .font(.system(size: 8, weight: .bold, design: .monospaced))
                        .foregroundColor(.white.opacity(0.4))
                }
            }
            .padding(.top, 2)

            // Interactive Control Matrix (Side-by-side action buttons)
            HStack(spacing: 8) {
                // EXPENSE BUTTON (-)
                Link(destination: URL(string: "myapp://add-expense")!) {
                    VStack(spacing: 6) {
                        ZStack {
                            Circle()
                                .fill(
                                    RadialGradient(
                                        colors: [Color(hex: "#FF3B30").opacity(0.35), Color(hex: "#FF2D55").opacity(0.1)],
                                        center: .center,
                                        startRadius: 2,
                                        endRadius: 18
                                    )
                                )
                                .frame(width: 32, height: 32)
                                .overlay(
                                    Circle()
                                        .stroke(Color(hex: "#FF3B30").opacity(0.5), lineWidth: 1)
                                )

                            Image(systemName: "arrow.down.right")
                                .font(.system(size: 13, weight: .black))
                                .foregroundColor(Color(hex: "#FF453A"))
                        }

                        Text("EXPENSE")
                            .font(.system(size: 10, weight: .heavy, design: .monospaced))
                            .foregroundColor(Color(hex: "#FF453A"))
                            .lineLimit(1)

                        Text("LOG OUT")
                            .font(.system(size: 8, weight: .semibold, design: .monospaced))
                            .foregroundColor(.white.opacity(0.5))
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .padding(.vertical, 8)
                    .background(
                        RoundedRectangle(cornerRadius: 14)
                            .fill(
                                LinearGradient(
                                    colors: [
                                        Color(hex: "#1E0D11").opacity(0.9),
                                        Color(hex: "#12070A").opacity(0.95)
                                    ],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 14)
                            .stroke(
                                LinearGradient(
                                    colors: [
                                        Color(hex: "#FF3B30").opacity(0.55),
                                        Color(hex: "#FF2D55").opacity(0.2)
                                    ],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                ),
                                lineWidth: 1
                            )
                    )
                }

                // INCOME BUTTON (+)
                Link(destination: URL(string: "myapp://add-income")!) {
                    VStack(spacing: 6) {
                        ZStack {
                            Circle()
                                .fill(
                                    RadialGradient(
                                        colors: [Color(hex: "#00F5A0").opacity(0.35), Color(hex: "#30D158").opacity(0.1)],
                                        center: .center,
                                        startRadius: 2,
                                        endRadius: 18
                                    )
                                )
                                .frame(width: 32, height: 32)
                                .overlay(
                                    Circle()
                                        .stroke(Color(hex: "#00F5A0").opacity(0.5), lineWidth: 1)
                                )

                            Image(systemName: "arrow.up.left")
                                .font(.system(size: 13, weight: .black))
                                .foregroundColor(Color(hex: "#00F5A0"))
                        }

                        Text("INCOME")
                            .font(.system(size: 10, weight: .heavy, design: .monospaced))
                            .foregroundColor(Color(hex: "#00F5A0"))
                            .lineLimit(1)

                        Text("LOG IN")
                            .font(.system(size: 8, weight: .semibold, design: .monospaced))
                            .foregroundColor(.white.opacity(0.5))
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .padding(.vertical, 8)
                    .background(
                        RoundedRectangle(cornerRadius: 14)
                            .fill(
                                LinearGradient(
                                    colors: [
                                        Color(hex: "#081B15").opacity(0.9),
                                        Color(hex: "#05120E").opacity(0.95)
                                    ],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 14)
                            .stroke(
                                LinearGradient(
                                    colors: [
                                        Color(hex: "#00F5A0").opacity(0.55),
                                        Color(hex: "#30D158").opacity(0.2)
                                    ],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                ),
                                lineWidth: 1
                            )
                    )
                }
            }
        }
        .padding(12)
    }
}

// MARK: - Medium Family View (Wide High-Tech Action Deck)
struct MediumCommandHUDView: View {
    var body: some View {
        VStack(spacing: 12) {
            // Cyber HUD Status Bar
            HStack(spacing: 8) {
                // Glowing emerald dot
                Circle()
                    .fill(Color(hex: "#00F5A0"))
                    .frame(width: 7, height: 7)
                    .shadow(color: Color(hex: "#00F5A0").opacity(0.9), radius: 5)

                Text("FINANCE // COMMAND HUD")
                    .font(.system(size: 11, weight: .black, design: .monospaced))
                    .foregroundColor(.white.opacity(0.9))
                    .tracking(1.0)

                Spacer()

                HStack(spacing: 5) {
                    Image(systemName: "bolt.fill")
                        .font(.system(size: 8))
                        .foregroundColor(Color(hex: "#00F5A0"))
                    Text("QUICK ENTRY • ZERO LATENCY")
                        .font(.system(size: 9, weight: .bold, design: .monospaced))
                        .foregroundColor(.white.opacity(0.5))
                        .tracking(0.5)
                }
            }
            .padding(.horizontal, 2)

            // Two Sleek Futuristic Glass Buttons Side-by-Side
            HStack(spacing: 12) {
                // EXPENSE ACTION BUTTON
                Link(destination: URL(string: "myapp://add-expense")!) {
                    HStack(spacing: 12) {
                        ZStack {
                            RoundedRectangle(cornerRadius: 12)
                                .fill(
                                    RadialGradient(
                                        colors: [Color(hex: "#FF3B30").opacity(0.4), Color(hex: "#FF2D55").opacity(0.12)],
                                        center: .center,
                                        startRadius: 2,
                                        endRadius: 24
                                    )
                                )
                                .frame(width: 40, height: 40)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 12)
                                        .stroke(Color(hex: "#FF3B30").opacity(0.6), lineWidth: 1)
                                )

                            Image(systemName: "arrow.down.right")
                                .font(.system(size: 16, weight: .black))
                                .foregroundColor(Color(hex: "#FF453A"))
                        }

                        VStack(alignment: .leading, spacing: 3) {
                            Text("LOG EXPENSE")
                                .font(.system(size: 13, weight: .black, design: .monospaced))
                                .foregroundColor(Color(hex: "#FF453A"))
                                .tracking(0.6)

                            Text("Record outflow immediately")
                                .font(.system(size: 9, weight: .medium, design: .monospaced))
                                .foregroundColor(.white.opacity(0.45))
                                .lineLimit(1)
                        }

                        Spacer()

                        Image(systemName: "chevron.right")
                            .font(.system(size: 10, weight: .bold))
                            .foregroundColor(Color(hex: "#FF453A").opacity(0.6))
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 10)
                    .background(
                        RoundedRectangle(cornerRadius: 16)
                            .fill(
                                LinearGradient(
                                    colors: [
                                        Color(hex: "#1F0D11").opacity(0.92),
                                        Color(hex: "#100609").opacity(0.96)
                                    ],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(
                                LinearGradient(
                                    colors: [
                                        Color(hex: "#FF3B30").opacity(0.65),
                                        Color(hex: "#FF2D55").opacity(0.2)
                                    ],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                ),
                                lineWidth: 1
                            )
                    )
                }

                // INCOME ACTION BUTTON
                Link(destination: URL(string: "myapp://add-income")!) {
                    HStack(spacing: 12) {
                        ZStack {
                            RoundedRectangle(cornerRadius: 12)
                                .fill(
                                    RadialGradient(
                                        colors: [Color(hex: "#00F5A0").opacity(0.4), Color(hex: "#30D158").opacity(0.12)],
                                        center: .center,
                                        startRadius: 2,
                                        endRadius: 24
                                    )
                                )
                                .frame(width: 40, height: 40)
                                .overlay(
                                    RoundedRectangle(cornerRadius: 12)
                                        .stroke(Color(hex: "#00F5A0").opacity(0.6), lineWidth: 1)
                                )

                            Image(systemName: "arrow.up.left")
                                .font(.system(size: 16, weight: .black))
                                .foregroundColor(Color(hex: "#00F5A0"))
                        }

                        VStack(alignment: .leading, spacing: 3) {
                            Text("LOG INCOME")
                                .font(.system(size: 13, weight: .black, design: .monospaced))
                                .foregroundColor(Color(hex: "#00F5A0"))
                                .tracking(0.6)

                            Text("Record inflow immediately")
                                .font(.system(size: 9, weight: .medium, design: .monospaced))
                                .foregroundColor(.white.opacity(0.45))
                                .lineLimit(1)
                        }

                        Spacer()

                        Image(systemName: "chevron.right")
                            .font(.system(size: 10, weight: .bold))
                            .foregroundColor(Color(hex: "#00F5A0").opacity(0.6))
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 10)
                    .background(
                        RoundedRectangle(cornerRadius: 16)
                            .fill(
                                LinearGradient(
                                    colors: [
                                        Color(hex: "#081B14").opacity(0.92),
                                        Color(hex: "#040F0B").opacity(0.96)
                                    ],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(
                                LinearGradient(
                                    colors: [
                                        Color(hex: "#00F5A0").opacity(0.65),
                                        Color(hex: "#30D158").opacity(0.2)
                                    ],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                ),
                                lineWidth: 1
                            )
                    )
                }
            }
        }
        .padding(14)
    }
}

// MARK: - Widget Main Declaration
@main
struct FinanceWidget: Widget {
    let kind: String = "FinanceWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            FinanceWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Command HUD Quick Entry")
        .description("Instant futuristic action deck for logging expenses and income.")
        .supportedFamilies([.systemSmall, .systemMedium])
        #if compiler(>=5.9)
        .contentMarginsDisabled()
        #endif
    }
}
