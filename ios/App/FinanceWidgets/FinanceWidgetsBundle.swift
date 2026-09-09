//
//  FinanceWidgetsBundle.swift
//  FinanceWidgets
//
//  Created for FinanceApp (Developer: Ahmed AL KUBAISI)
//  WidgetBundle containing QuickLogWidget (2x2) and PlansTrackerWidget (2x4)
//

import WidgetKit
import SwiftUI

@main
struct FinanceWidgetsBundle: WidgetBundle {
    var body: some Widget {
        QuickLogWidget()
        PlansTrackerWidget()
    }
}
