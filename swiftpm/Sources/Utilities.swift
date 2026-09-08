import Foundation
import SwiftUI

struct CurrencyFormatter {
    static func format(_ amount: Double, currency: String = "IQD") -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 0
        formatter.groupingSeparator = ","
        
        let formattedNumber = formatter.string(from: NSNumber(value: amount)) ?? "\(Int(amount))"
        return "\(formattedNumber) \(currency)"
    }
    
    static func formatSigned(_ amount: Double, type: String, currency: String = "IQD") -> String {
        let prefix = type.lowercased() == "income" ? "+" : "-"
        return "\(prefix)\(format(amount, currency: currency))"
    }
}

extension Date {
    func formattedShort() -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .none
        return formatter.string(from: self)
    }

    func monthYearString() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "LLLL yyyy"
        return formatter.string(from: self)
    }
}
