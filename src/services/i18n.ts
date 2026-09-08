export type Language = 'en' | 'ar';

export interface Translations {
  // Navigation & Tabs
  tabDashboard: string;
  tabPlansDashboard: string;
  tabTransactions: string;
  tabAnalytics: string;
  tabGoals: string; // Keep for compatibility, says "Plans"
  tabPlans: string;
  tabSettings: string;

  // Header
  financialOverview: string;
  welcomeBack: string;
  faceIdActive: string;
  faceIdOff: string;
  addTransactionBtn: string;
  appTitle: string;
  simEnvironment: string;
  simSubtext: string;
  codeHubTab: string;
  guideTab: string;
  appTab: string;

  // Dashboard
  actualBalance: string;
  unallocatedAvailable: string;
  goalAllocations: string; // Displays "Plan Allocations"
  planAllocations: string;
  monthlyPerformance: string;
  income: string;
  expenses: string;
  netSavings: string;
  savingsRate: string;
  historicalAvgSavings: string;
  activeGoals: string; // Displays "Active Plans"
  activePlans: string;
  viewAllGoals: string; // Displays "View All Plans"
  viewAllPlans: string;
  recentTransactions: string;
  viewAllTransactions: string;
  noTransactionsYet: string;
  addFirstTransaction: string;
  allocatedOf: string;
  currencyLabel: string;

  // Transactions
  transactionsTitle: string;
  searchPlaceholder: string;
  filterAll: string;
  filterIncome: string;
  filterExpenses: string;
  totalFiltered: string;
  noTransactionsFound: string;
  clearSearch: string;
  deleteTxConfirm: string;
  editTx: string;
  deleteTx: string;

  // Analytics
  analyticsTitle: string;
  analyticsSubtitle: string;
  incomeVsExpenses: string;
  totalIncomeLabel: string;
  totalExpensesLabel: string;
  categoryBreakdown: string;
  noExpenseData: string;
  monthlyTrend: string;
  averageMonthlyNet: string;
  highestCategory: string;
  dailyAverageExpense: string;

  // Plans (formerly Goals)
  goalsTitle: string; // Displays "Financial Plans"
  plansTitle: string;
  goalsSubtitle: string;
  plansSubtitle: string;
  newGoalBtn: string; // Displays "+ New Plan"
  newPlanBtn: string;
  activeGoalsSection: string; // Displays "Active Plans"
  activePlansSection: string;
  completedGoalsSection: string; // Displays "Completed Plans"
  completedPlansSection: string;
  allocateFundsBtn: string;
  allocatedProgress: string;
  targetAmount: string;
  targetDate: string;
  remainingAmount: string;
  projectedRunway: string;
  achievableNotice: string;
  behindScheduleNotice: string;
  markCompleted: string;
  markActive: string;
  noActiveGoals: string;
  noActivePlans: string;
  noCompletedGoals: string;
  noCompletedPlans: string;

  // Plan Details & Planning Specifics
  planPriority: string;
  priorityCritical: string;
  priorityHigh: string;
  priorityMedium: string;
  priorityLow: string;
  plannedMonthlyRate: string;
  actualMonthlyRate: string;
  varianceLabel: string;
  varianceAhead: string;
  varianceOnTrack: string;
  varianceAtRisk: string;
  varianceBehind: string;
  varianceNotFeasible: string;
  projectedDateLabel: string;
  milestonesLabel: string;
  deletePlanBtn: string;
  deletePlanConfirmTitle: string;
  deletePlanConfirmMsg: string;

  // Plans Dashboard & Sub-tabs
  plansDashboardTab: string;
  allPlansTab: string;
  whatIfTab: string;
  financialPositionTitle: string;
  monthlyCapacityLabel: string;
  totalPlannedMonthlyLabel: string;
  capacitySurplus: string;
  capacityDeficit: string;
  healthHealthy: string;
  healthTight: string;
  healthOvercommitted: string;
  actionCenterTitle: string;
  whatIfTitle: string;
  whatIfSubtitle: string;
  incomeBoostLabel: string;
  expenseCutLabel: string;
  lumpSumLabel: string;
  newMonthlyCapacity: string;
  timeSavedLabel: string;
  selectPlanToSimulate: string;
  simMonthlyAllocation: string;
  simExtraSavings: string;
  simTargetAmount: string;
  simTargetDate: string;
  originalForecast: string;
  simulatedForecast: string;
  forecastCompletion: string;
  originalTargetDate: string;
  monthsAhead: string;
  monthsBehind: string;
  resetSimulation: string;
  simDisclaimer: string;
  appCreditsTitle: string;
  appDeveloper: string;
  appEmail: string;
  appVersion: string;
  onSchedule: string;

  // Settings
  settingsTitle: string;
  preferencesHeading: string;
  languageHeading: string;
  languageSubtitle: string;
  langEnglish: string;
  langArabic: string;
  langArabicBadge: string;
  securityHeading: string;
  faceIdLabel: string;
  faceIdDesc: string;
  testFaceIdBtn: string;
  budgetsHeading: string;
  budgetsDesc: string;
  manageBudgetsBtn: string;
  categoriesHeading: string;
  categoriesDesc: string;
  configureBtn: string;
  hideBtn: string;
  dataHeading: string;
  dataDesc: string;
  exportCsvBtn: string;
  exportJsonBtn: string;
  appearanceHeading: string;
  themeSystem: string;
  themeLight: string;
  themeDark: string;
  environmentHeading: string;
  primaryCurrency: string;
  targetDevice: string;
  packageFormat: string;
  localPersistence: string;
  copiedNotice: string;
  currentExpenseCats: string;
  newCategoryPlaceholder: string;
  addCategoryBtn: string;
  incomeSourceType: string;
  expenseCategoryType: string;

  // Modals & Sheets
  addTransactionTitle: string;
  editTransactionTitle: string;
  typeLabel: string;
  amountLabel: string;
  dateLabel: string;
  categoryLabel: string;
  sourceLabel: string;
  descriptionLabel: string;
  notesLabel: string;
  saveBtn: string;
  cancelBtn: string;
  createCategoryBtn: string;
  customCategoryName: string;
  allocateTitle: string;
  allocateSubtitle: string;
  availableToAllocate: string;
  currentAllocation: string;
  newAllocationAmount: string;
  confirmAllocationBtn: string;
  createGoalTitle: string; // Displays "Create Financial Plan"
  createPlanTitle: string;
  goalNameLabel: string; // Displays "Plan Name"
  planNameLabel: string;
  goalTargetLabel: string; // Displays "Target Amount"
  planTargetLabel: string;
  goalDateLabel: string; // Displays "Target Date"
  planDateLabel: string;
  goalDescLabel: string; // Displays "Plan Description"
  planDescLabel: string;
  saveGoalBtn: string; // Displays "Create Plan"
  savePlanBtn: string;
  manageBudgetsTitle: string;
  manageBudgetsSubtitle: string;
  setMonthlyLimit: string;
  spentSoFar: string;
  monthlyLimit: string;
  budgetStatusOver: string;
  budgetStatusWarning: string;
  budgetStatusHealthy: string;
  faceIdScanTitle: string;
  faceIdScanDesc: string;
  faceIdScanSuccess: string;
  authenticateBtn: string;

  // Additional helper aliases
  addTransaction: string;
  save: string;
  cancel: string;
  delete: string;
  timeRangeThisWeek: string;
  timeRangeThisMonth: string;
  timeRangeLastMonth: string;
  timeRangeLast3M: string;
  timeRangeLast6M: string;
  timeRangeThisYear: string;
  timeRangeAllTime: string;
  insightsHeading: string;
  largestExpense: string;
  topCategory: string;
  targetsHeading: string;
  createGoal: string; // Displays "Create Plan"
  createPlan: string;
  noActiveGoalsDesc: string;
  noActivePlansDesc: string;
  saved: string;
  target: string;
  leftToSave: string;
  analysis: string;
  manageFunds: string;
  completedGoals: string; // Displays "Completed Plans"
  completedPlans: string;
  historyHeading: string;
  allFilter: string;
  incomeFilter: string;
  expensesFilter: string;
  noTransactionsHint: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    // Navigation & Tabs
    tabDashboard: 'Dashboard',
    tabPlansDashboard: 'Plans Hub',
    tabTransactions: 'Transactions',
    tabAnalytics: 'Analytics',
    tabGoals: 'Plans',
    tabPlans: 'Plans',
    tabSettings: 'Settings',

    // Header
    financialOverview: 'Financial Overview',
    welcomeBack: 'Welcome back, Ali',
    faceIdActive: 'Face ID Active',
    faceIdOff: 'Face ID Off',
    addTransactionBtn: '+ Add Transaction',
    appTitle: 'FinanceApp • iOS 17',
    simEnvironment: 'Interactive iOS 17 Runtime Environment',
    simSubtext: 'Operating with SwiftData offline model storage & IQD currency formatting',
    codeHubTab: 'Swift Package Code',
    guideTab: 'Deployment Guide',
    appTab: 'iPhone 13 Pro Max',

    // Dashboard
    actualBalance: 'Actual Balance',
    unallocatedAvailable: 'Unallocated / Available',
    goalAllocations: 'Plan Allocations',
    planAllocations: 'Plan Allocations',
    monthlyPerformance: 'Monthly Financial Performance',
    income: 'Income',
    expenses: 'Expenses',
    netSavings: 'Net Savings',
    savingsRate: 'Savings Rate',
    historicalAvgSavings: 'Historical Monthly Average Savings',
    activeGoals: 'Active Plans',
    activePlans: 'Active Plans',
    viewAllGoals: 'View All Plans',
    viewAllPlans: 'View All Plans',
    recentTransactions: 'Recent Transactions',
    viewAllTransactions: 'View All Transactions',
    noTransactionsYet: 'No transactions recorded yet',
    addFirstTransaction: 'Record your first transaction',
    allocatedOf: 'allocated of',
    currencyLabel: 'IQD',

    // Transactions
    transactionsTitle: 'Transactions',
    searchPlaceholder: 'Search descriptions, categories, sources...',
    filterAll: 'All',
    filterIncome: 'Income',
    filterExpenses: 'Expenses',
    totalFiltered: 'Total Filtered',
    noTransactionsFound: 'No transactions match your search filter',
    clearSearch: 'Clear Filter',
    deleteTxConfirm: 'Are you sure you want to delete this transaction?',
    editTx: 'Edit',
    deleteTx: 'Delete',

    // Analytics
    analyticsTitle: 'Financial Analytics',
    analyticsSubtitle: 'Visual breakdown of cashflow & spending habits',
    incomeVsExpenses: 'Income vs. Expenses',
    totalIncomeLabel: 'Total Income',
    totalExpensesLabel: 'Total Expenses',
    categoryBreakdown: 'Expense Breakdown by Category',
    noExpenseData: 'No expense transactions recorded in this period',
    monthlyTrend: 'Monthly Net Savings Trend',
    averageMonthlyNet: 'Average Net Cashflow',
    highestCategory: 'Highest Spending Category',
    dailyAverageExpense: 'Daily Average Expense',

    // Plans
    goalsTitle: 'Financial Plans',
    plansTitle: 'Financial Plans',
    goalsSubtitle: 'Target planning, allocations & plan-vs-actual variance',
    plansSubtitle: 'Target planning, allocations & plan-vs-actual variance',
    newGoalBtn: '+ New Plan',
    newPlanBtn: '+ New Plan',
    activeGoalsSection: 'Active Plans',
    activePlansSection: 'Active Plans',
    completedGoalsSection: 'Completed Plans',
    completedPlansSection: 'Completed Plans',
    allocateFundsBtn: 'Allocate Funds',
    allocatedProgress: 'Allocated',
    targetAmount: 'Target',
    targetDate: 'Target Date',
    remainingAmount: 'Remaining',
    projectedRunway: 'Runway Projection',
    achievableNotice: 'On track to achieve based on monthly savings',
    behindScheduleNotice: 'Requires increased monthly savings rate',
    markCompleted: 'Mark as Completed',
    markActive: 'Reactivate Plan',
    noActiveGoals: 'No active financial plans found',
    noActivePlans: 'No active financial plans found',
    noCompletedGoals: 'No completed plans yet',
    noCompletedPlans: 'No completed plans yet',

    // Plan Details & Planning Specifics
    planPriority: 'Priority Level',
    priorityCritical: 'Critical',
    priorityHigh: 'High',
    priorityMedium: 'Medium',
    priorityLow: 'Low',
    plannedMonthlyRate: 'Planned Monthly',
    actualMonthlyRate: 'Actual Rate',
    varianceLabel: 'Variance',
    varianceAhead: 'Ahead of Schedule',
    varianceOnTrack: 'On Schedule',
    varianceAtRisk: 'At Risk',
    varianceBehind: 'Behind Schedule',
    varianceNotFeasible: 'Not Feasible',
    projectedDateLabel: 'Projected Completion',
    milestonesLabel: 'Milestones (25% / 50% / 75% / 100%)',
    deletePlanBtn: 'Delete Plan',
    deletePlanConfirmTitle: 'Delete Plan',
    deletePlanConfirmMsg: 'Are you sure you want to delete this plan? Allocated funds will safely return to your unallocated cash balance.',

    // Plans Dashboard & Sub-tabs
    plansDashboardTab: 'Dashboard',
    allPlansTab: 'All Plans',
    whatIfTab: 'What-If Simulator',
    financialPositionTitle: 'Financial Capacity & Position',
    monthlyCapacityLabel: 'Monthly Net Capacity',
    totalPlannedMonthlyLabel: 'Planned Monthly Commitment',
    capacitySurplus: 'Monthly Surplus',
    capacityDeficit: 'Monthly Deficit',
    healthHealthy: 'Healthy Margin',
    healthTight: 'Tight Margin',
    healthOvercommitted: 'Overcommitted',
    actionCenterTitle: 'Action Center & Recommendations',
    whatIfTitle: 'What-If Scenario Simulator',
    whatIfSubtitle: 'Test adjustments to income and expenses to see real-time plan impact',
    incomeBoostLabel: 'Additional Monthly Income',
    expenseCutLabel: 'Monthly Spending Reductions',
    lumpSumLabel: 'One-Time Cash Injection',
    newMonthlyCapacity: 'Adjusted Monthly Capacity',
    timeSavedLabel: 'Months Saved',
    selectPlanToSimulate: 'Select Plan to Simulate',
    simMonthlyAllocation: 'Adjust Monthly Allocation',
    simExtraSavings: 'Additional Monthly Savings / Cuts',
    simTargetAmount: 'Adjust Target Amount',
    simTargetDate: 'Adjust Target Date',
    originalForecast: 'Original Target / Forecast',
    simulatedForecast: 'Simulated Forecast',
    forecastCompletion: 'Forecast Completion',
    originalTargetDate: 'Original Target Date',
    monthsAhead: 'Ahead of schedule',
    monthsBehind: 'Behind schedule',
    resetSimulation: 'Reset Simulation',
    simDisclaimer: 'Hypothetical simulation only — does not alter stored plan or balance.',
    appCreditsTitle: 'Developer & App Information',
    appDeveloper: 'Ahmed AL KUBAISIE',
    appEmail: 'ahmed.mjabbar95@gmail.com',
    appVersion: '1.2.0',
    onSchedule: 'On Schedule',

    // Settings
    settingsTitle: 'Settings & Security',
    preferencesHeading: 'Preferences',
    languageHeading: 'App Language',
    languageSubtitle: 'Choose interface language (English / العربية)',
    langEnglish: 'English',
    langArabic: 'العربية',
    langArabicBadge: 'Arabic',
    securityHeading: 'Security & Biometrics',
    faceIdLabel: 'Face ID & Passcode Lock',
    faceIdDesc: 'Requires authentication on app launch',
    testFaceIdBtn: 'Simulate Face ID Scan Now',
    budgetsHeading: 'Monthly Budget Limits',
    budgetsDesc: 'Set and track spending limits by category with real-time health badges.',
    manageBudgetsBtn: 'Manage Budgets',
    categoriesHeading: 'Categories & Sources',
    categoriesDesc: 'Customize expense categories and income sources',
    configureBtn: 'Configure',
    hideBtn: 'Hide',
    dataHeading: 'Data Export & Backup',
    dataDesc: 'Export local storage as clean CSV or full JSON backup',
    exportCsvBtn: 'Export CSV',
    exportJsonBtn: 'Export JSON Backup',
    appearanceHeading: 'Appearance',
    themeSystem: 'System Default',
    themeLight: 'Light Mode',
    themeDark: 'Dark Mode',
    environmentHeading: 'Runtime Architecture',
    primaryCurrency: 'Primary Currency',
    targetDevice: 'Target Device',
    packageFormat: 'Package Architecture',
    localPersistence: 'Local Persistence',
    copiedNotice: 'Copied to clipboard',
    currentExpenseCats: 'Current Expense Categories',
    newCategoryPlaceholder: 'New Category / Source Name...',
    addCategoryBtn: 'Add',
    incomeSourceType: 'Income Source',
    expenseCategoryType: 'Expense Category',

    // Modals & Sheets
    addTransactionTitle: 'Record Transaction',
    editTransactionTitle: 'Edit Transaction',
    typeLabel: 'Type',
    amountLabel: 'Amount (IQD)',
    dateLabel: 'Date',
    categoryLabel: 'Category',
    sourceLabel: 'Income Source',
    descriptionLabel: 'Description',
    notesLabel: 'Notes (Optional)',
    saveBtn: 'Save Transaction',
    cancelBtn: 'Cancel',
    createCategoryBtn: '+ Add New Category',
    customCategoryName: 'Category Name',
    allocateTitle: 'Allocate Plan Funds',
    allocateSubtitle: 'Allocate or withdraw funds from your cash balance for this plan',
    availableToAllocate: 'Available Unallocated Cash',
    currentAllocation: 'Currently Allocated',
    newAllocationAmount: 'New Allocated Total (IQD)',
    confirmAllocationBtn: 'Confirm Allocation',
    createGoalTitle: 'Create Financial Plan',
    createPlanTitle: 'Create Financial Plan',
    goalNameLabel: 'Plan Name',
    planNameLabel: 'Plan Name',
    goalTargetLabel: 'Target Amount (IQD)',
    planTargetLabel: 'Target Amount (IQD)',
    goalDateLabel: 'Target Date',
    planDateLabel: 'Target Date',
    goalDescLabel: 'Plan Purpose / Description',
    planDescLabel: 'Plan Purpose / Description',
    saveGoalBtn: 'Create Plan',
    savePlanBtn: 'Create Plan',
    manageBudgetsTitle: 'Monthly Category Budgets',
    manageBudgetsSubtitle: 'Set monthly expense caps to ensure disciplined spending',
    setMonthlyLimit: 'Set Monthly Cap (IQD)',
    spentSoFar: 'Spent This Month',
    monthlyLimit: 'Monthly Cap',
    budgetStatusOver: 'Exceeded',
    budgetStatusWarning: 'Near Limit',
    budgetStatusHealthy: 'Within Budget',
    faceIdScanTitle: 'Biometric Face ID Scan',
    faceIdScanDesc: 'Scanning simulated TrueDepth sensor...',
    faceIdScanSuccess: 'Biometrics Authenticated',
    authenticateBtn: 'Authenticate',

    // Additional helper aliases
    addTransaction: 'Add Transaction',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    timeRangeThisWeek: 'This Week',
    timeRangeThisMonth: 'This Month',
    timeRangeLastMonth: 'Last Month',
    timeRangeLast3M: 'Last 3 Months',
    timeRangeLast6M: 'Last 6 Months',
    timeRangeThisYear: 'This Year',
    timeRangeAllTime: 'All Time',
    insightsHeading: 'Spending Insights',
    largestExpense: 'Largest Expense',
    topCategory: 'Top Category',
    targetsHeading: 'Financial Planning',
    createGoal: 'Create Plan',
    createPlan: 'Create Plan',
    noActiveGoalsDesc: 'Establish your first financial plan with milestones and priority.',
    noActivePlansDesc: 'Establish your first financial plan with milestones and priority.',
    saved: 'Saved',
    target: 'Target',
    leftToSave: 'Left to save',
    analysis: 'Plan Analysis',
    manageFunds: 'Manage Funds',
    completedGoals: 'Completed Plans',
    completedPlans: 'Completed Plans',
    historyHeading: 'Transaction History',
    allFilter: 'All',
    incomeFilter: 'Income',
    expensesFilter: 'Expenses',
    noTransactionsHint: 'Tap the + button to record your first transaction.',
  },

  ar: {
    // Navigation & Tabs
    tabDashboard: 'الرئيسية',
    tabPlansDashboard: 'لوحة الخطط',
    tabTransactions: 'المعاملات',
    tabAnalytics: 'التحليلات',
    tabGoals: 'الخطط',
    tabPlans: 'الخطط',
    tabSettings: 'الإعدادات',

    // Header
    financialOverview: 'نظرة عامة مالية',
    welcomeBack: 'مرحباً بك، علي',
    faceIdActive: 'بصمة الوجه مفعلة',
    faceIdOff: 'بصمة الوجه معطلة',
    addTransactionBtn: '+ إضافة معاملة',
    appTitle: 'تطبيق المالية • iOS 17',
    simEnvironment: 'بيئة تشغيل تفاعلية لنظام iOS 17',
    simSubtext: 'تخزين محلي عبر SwiftData وتنسيق بالدينار العراقي (IQD)',
    codeHubTab: 'كود حزمة Swift',
    guideTab: 'دليل التثبيت',
    appTab: 'آيفون 13 برو ماكس',

    // Dashboard
    actualBalance: 'الرصيد الفعلي الإجمالي',
    unallocatedAvailable: 'المتاح / غير المخصص',
    goalAllocations: 'مخصصات الخطط',
    planAllocations: 'مخصصات الخطط',
    monthlyPerformance: 'الأداء المالي للشهر الحالي',
    income: 'إجمالي الدخل',
    expenses: 'إجمالي المصاريف',
    netSavings: 'صافي الفائض / الادخار',
    savingsRate: 'نسبة الادخار',
    historicalAvgSavings: 'متوسط الادخار الشهري التاريخي',
    activeGoals: 'الخطط المالية النشطة',
    activePlans: 'الخطط المالية النشطة',
    viewAllGoals: 'عرض جميع الخطط',
    viewAllPlans: 'عرض جميع الخطط',
    recentTransactions: 'أحدث المعاملات المسجلة',
    viewAllTransactions: 'عرض كافة المعاملات',
    noTransactionsYet: 'لم يتم تسجيل أي معاملات بعد',
    addFirstTransaction: 'سجل أول حركة مالية الآن',
    allocatedOf: 'تم تخصيص',
    currencyLabel: 'د.ع',

    // Transactions
    transactionsTitle: 'سجل المعاملات المالية',
    searchPlaceholder: 'بحث في الوصف، الفئات، المصادر...',
    filterAll: 'الكل',
    filterIncome: 'الدخل',
    filterExpenses: 'المصاريف',
    totalFiltered: 'إجمالي المعاملات المحددة',
    noTransactionsFound: 'لا توجد معاملات مطابقة لمعايير البحث',
    clearSearch: 'إعادة ضبط التصفية',
    deleteTxConfirm: 'هل أنت متأكد من حذف هذه المعاملة؟',
    editTx: 'تعديل',
    deleteTx: 'حذف',

    // Analytics
    analyticsTitle: 'التحليلات والتقارير المالية',
    analyticsSubtitle: 'تحليل دقيق ومصور لتدفقاتك النقدية وعادات الإنفاق',
    incomeVsExpenses: 'مقارنة الدخل مقابل المصاريف',
    totalIncomeLabel: 'إجمالي الدخل',
    totalExpensesLabel: 'إجمالي المصاريف',
    categoryBreakdown: 'توزيع المصاريف حسب الفئات',
    noExpenseData: 'لا توجد مصاريف مسجلة خلال هذه الفترة',
    monthlyTrend: 'مسار صافي الادخار الشهري',
    averageMonthlyNet: 'متوسط صافي التدفق الشهري',
    highestCategory: 'أعلى فئة إنفاقاً',
    dailyAverageExpense: 'متوسط الإنفاق اليومي',

    // Plans
    goalsTitle: 'الخطط المالية',
    plansTitle: 'الخطط المالية',
    goalsSubtitle: 'تخطيط الأهداف والمخصصات ومقارنة المخطط بالفعلي',
    plansSubtitle: 'تخطيط الأهداف والمخصصات ومقارنة المخطط بالفعلي',
    newGoalBtn: '+ خطة جديدة',
    newPlanBtn: '+ خطة جديدة',
    activeGoalsSection: 'الخطط الجارية',
    activePlansSection: 'الخطط الجارية',
    completedGoalsSection: 'الخطط المكتملة بنجاح',
    completedPlansSection: 'الخطط المكتملة بنجاح',
    allocateFundsBtn: 'تخصيص رصيد',
    allocatedProgress: 'المبلغ المخصص',
    targetAmount: 'المبلغ المستهدف',
    targetDate: 'تاريخ الإنجاز المستهدف',
    remainingAmount: 'المبلغ المتبقي',
    projectedRunway: 'تقدير إمكانية الإنجاز',
    achievableNotice: 'تسير في المسار الصحيح للإنجاز بناءً على معدل ادخارك',
    behindScheduleNotice: 'يتطلب زيادة نسبة الادخار الشهري للوصول في الموعد',
    markCompleted: 'تعيين كمنجز',
    markActive: 'إعادة تفعيل الخطة',
    noActiveGoals: 'لا توجد خطط مالية جارية حالياً',
    noActivePlans: 'لا توجد خطط مالية جارية حالياً',
    noCompletedGoals: 'لم تكتمل أي خطط بعد',
    noCompletedPlans: 'لم تكتمل أي خطط بعد',

    // Plan Details & Planning Specifics
    planPriority: 'مستوى الأولوية',
    priorityCritical: 'حرجة (قصوى)',
    priorityHigh: 'عالية',
    priorityMedium: 'متوسطة',
    priorityLow: 'منخفضة',
    plannedMonthlyRate: 'المخطط شهرياً',
    actualMonthlyRate: 'المعدل الفعلي',
    varianceLabel: 'الانحراف (التباين)',
    varianceAhead: 'متقدم عن الجدول',
    varianceOnTrack: 'ضمن الجدول الزمني',
    varianceAtRisk: 'في منطقة الخطر',
    varianceBehind: 'متأخر عن الجدول',
    varianceNotFeasible: 'غير قابل للتحقيق حالياً',
    projectedDateLabel: 'التاريخ المتوقع للإنجاز',
    milestonesLabel: 'المحطات الرئيسية (25% / 50% / 75% / 100%)',
    deletePlanBtn: 'حذف الخطة',
    deletePlanConfirmTitle: 'حذف الخطة المالية',
    deletePlanConfirmMsg: 'هل أنت متأكد من حذف هذه الخطة؟ ستعود الأموال المخصصة بأمان إلى رصيدك العام غير المخصص.',

    // Plans Dashboard & Sub-tabs
    plansDashboardTab: 'لوحة التحكم',
    allPlansTab: 'كل الخطط',
    whatIfTab: 'محاكي ماذا لو',
    financialPositionTitle: 'المركز المالي والقدرة الادخارية',
    monthlyCapacityLabel: 'القدرة الادخارية الشهرية (صافي الفائض)',
    totalPlannedMonthlyLabel: 'إجمالي الالتزامات الشهرية المخططة',
    capacitySurplus: 'فائض شهري متاح',
    capacityDeficit: 'عجز في القدرة الشهرية',
    healthHealthy: 'هامش مالي ممتاز',
    healthTight: 'هامش مالي ضيق',
    healthOvercommitted: 'التزامات تفوق الفائض',
    actionCenterTitle: 'مركز الإجراءات والتوصيات الذكية',
    whatIfTitle: 'محاكي السيناريوهات المالية (ماذا لو؟)',
    whatIfSubtitle: 'جرّب تعديل الدخل والمصاريف لمشاهدة تأثيرها الفوري على تسريع خططك',
    incomeBoostLabel: 'زيادة إضافية في الدخل الشهري',
    expenseCutLabel: 'خفض وترشيد المصاريف الشهرية',
    lumpSumLabel: 'ضخ مبلغ نقدي لمرة واحدة',
    newMonthlyCapacity: 'القدرة الشهرية المعدلة',
    timeSavedLabel: 'أشهر موفرة تم تسريعها',
    selectPlanToSimulate: 'اختر خطة للمحاكاة',
    simMonthlyAllocation: 'تعديل التخصيص الشهري',
    simExtraSavings: 'توفير شهري إضافي / تقليل نفقات',
    simTargetAmount: 'تعديل المبلغ المستهدف',
    simTargetDate: 'تعديل التاريخ المستهدف',
    originalForecast: 'الهدف الأصلي / التوقع',
    simulatedForecast: 'التوقع بالسيناريو الجديد',
    forecastCompletion: 'تاريخ الإنجاز المتوقع',
    originalTargetDate: 'الموعد المستهدف الأصلي',
    monthsAhead: 'متقدم عن الجدول',
    monthsBehind: 'متأخر عن الجدول',
    resetSimulation: 'إعادة ضبط المحاكاة',
    simDisclaimer: 'محاكاة افتراضية فقط — لا تغير الخطة المحفوظة أو الرصيد الفعلي.',
    appCreditsTitle: 'معلومات التطبيق والمطور',
    appDeveloper: 'Ahmed AL KUBAISIE',
    appEmail: 'ahmed.mjabbar95@gmail.com',
    appVersion: '1.2.0',
    onSchedule: 'على المسار المحدد',

    // Settings
    settingsTitle: 'الإعدادات والأمان',
    preferencesHeading: 'التفضيلات العامة',
    languageHeading: 'لغة التطبيق (Language)',
    languageSubtitle: 'اختر لغة واجهة المستخدم (العربية / English)',
    langEnglish: 'English',
    langArabic: 'العربية',
    langArabicBadge: 'العربية',
    securityHeading: 'الأمان والقياسات الحيوية',
    faceIdLabel: 'قفل بصمة الوجه ورمز المرور',
    faceIdDesc: 'طلب المصادقة البيومترية عند فتح التطبيق لحماية خصوصيتك',
    testFaceIdBtn: 'محاكاة فحص Face ID الآن',
    budgetsHeading: 'حدود الميزانيات الشهرية',
    budgetsDesc: 'تحديد سقف الإنفاق لكل فئة ومتابعة التنبيهات لحظياً',
    manageBudgetsBtn: 'إدارة الميزانيات',
    categoriesHeading: 'الفئات ومصادر الدخل',
    categoriesDesc: 'تخصيص وتعديل فئات المصاريف ومصادر الإيرادات',
    configureBtn: 'تعديل',
    hideBtn: 'إغلاق',
    dataHeading: 'إدارة وتصدير البيانات',
    dataDesc: 'تصدير بياناتك المحلية للنسخ الاحتياطي أو للتحليل في برنامج Excel',
    exportCsvBtn: 'تصدير ملف CSV',
    exportJsonBtn: 'نسخ احتياطي JSON',
    appearanceHeading: 'مظهر التطبيق',
    themeSystem: 'تلقائي (النظام)',
    themeLight: 'فاتح',
    themeDark: 'داكن',
    environmentHeading: 'تفاصيل النظام والبيئة',
    primaryCurrency: 'العملة الأساسية',
    targetDevice: 'الجهاز المستهدف',
    packageFormat: 'صيغة الحزمة',
    localPersistence: 'التخزين المحلي',
    copiedNotice: 'تم النسخ إلى الحافظة بنجاح',
    currentExpenseCats: 'فئات المصاريف الحالية',
    newCategoryPlaceholder: 'اسم الفئة أو المصدر الجديد...',
    addCategoryBtn: 'إضافة',
    incomeSourceType: 'مصدر دخل',
    expenseCategoryType: 'فئة مصروف',

    // Modals & Sheets
    addTransactionTitle: 'إضافة معاملة مالية جديدة',
    editTransactionTitle: 'تعديل المعاملة المالية',
    typeLabel: 'نوع المعاملة',
    amountLabel: 'المبلغ (بالدينار العراقي)',
    dateLabel: 'التاريخ',
    categoryLabel: 'فئة المصروف',
    sourceLabel: 'مصدر الدخل',
    descriptionLabel: 'الوصف',
    notesLabel: 'ملاحظات إضافية (اختياري)',
    saveBtn: 'حفظ المعاملة',
    cancelBtn: 'إلغاء',
    createCategoryBtn: '+ إضافة فئة جديدة',
    customCategoryName: 'اسم الفئة',
    allocateTitle: 'تخصيص رصيد للخطة',
    allocateSubtitle: 'تحويل أموال من الرصيد الحر غير المخصص إلى هذه الخطة',
    availableToAllocate: 'الرصيد المتاح غير المخصص',
    currentAllocation: 'المخصص حالياً',
    newAllocationAmount: 'المبلغ الإجمالي الجديد المخصص (د.ع)',
    confirmAllocationBtn: 'تأكيد تخصيص الرصيد',
    createGoalTitle: 'إنشاء خطة مالية جديدة',
    createPlanTitle: 'إنشاء خطة مالية جديدة',
    goalNameLabel: 'عنوان الخطة',
    planNameLabel: 'عنوان الخطة',
    goalTargetLabel: 'المبلغ المطلوب تحقيقه (د.ع)',
    planTargetLabel: 'المبلغ المطلوب تحقيقه (د.ع)',
    goalDateLabel: 'تاريخ الإنجاز المستهدف',
    planDateLabel: 'تاريخ الإنجاز المستهدف',
    goalDescLabel: 'تفاصيل الخطة والغرض منها',
    planDescLabel: 'تفاصيل الخطة والغرض منها',
    saveGoalBtn: 'إنشاء الخطة',
    savePlanBtn: 'إنشاء الخطة',
    manageBudgetsTitle: 'الميزانيات الشهرية للفئات',
    manageBudgetsSubtitle: 'وضع سقف أعلى للمصاريف الشهرية ومراقبة الاستهلاك',
    setMonthlyLimit: 'تحديد السقف الشهري (د.ع)',
    spentSoFar: 'تم إنفاقه هذا الشهر',
    monthlyLimit: 'الحد الأقصى الشهري',
    budgetStatusOver: 'تجاوز الحد',
    budgetStatusWarning: 'قريب من الحد',
    budgetStatusHealthy: 'في النطاق الآمن',
    faceIdScanTitle: 'التحقق عبر بصمة الوجه (Face ID)',
    faceIdScanDesc: 'جاري فحص المستشعر البيومتري...',
    faceIdScanSuccess: 'تم التحقق بنجاح من الهوية',
    authenticateBtn: 'مصادقة الهوية',

    // Additional helper aliases
    addTransaction: 'إضافة معاملة',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    timeRangeThisWeek: 'هذا الأسبوع',
    timeRangeThisMonth: 'هذا الشهر',
    timeRangeLastMonth: 'الشهر السابق',
    timeRangeLast3M: 'آخر 3 أشهر',
    timeRangeLast6M: 'آخر 6 أشهر',
    timeRangeThisYear: 'هذا العام',
    timeRangeAllTime: 'كل الأوقات',
    insightsHeading: 'رؤى وتحليلات الإنفاق',
    largestExpense: 'أكبر مصروف',
    topCategory: 'أعلى فئة صرف',
    targetsHeading: 'التخطيط المالي',
    createGoal: 'إنشاء خطة',
    createPlan: 'إنشاء خطة',
    noActiveGoalsDesc: 'حدد خطتك المالية الأولى مع مستوى الأولوية والمحطات.',
    noActivePlansDesc: 'حدد خطتك المالية الأولى مع مستوى الأولوية والمحطات.',
    saved: 'المدخر',
    target: 'الهدف',
    leftToSave: 'المتبقي للادخار',
    analysis: 'التحليل المالي',
    manageFunds: 'إدارة الأموال',
    completedGoals: 'الخطط المنجزة',
    completedPlans: 'الخطط المنجزة',
    historyHeading: 'سجل المعاملات',
    allFilter: 'الكل',
    incomeFilter: 'الدخل',
    expensesFilter: 'المصاريف',
    noTransactionsHint: 'انقر على زر + لتسجيل أول معاملة مالية.',
  },
};

// Translate standard category & source names to formal Arabic
export const CATEGORY_TRANSLATIONS: Record<string, string> = {
  'Food': 'طعام ومشتريات',
  'Transportation': 'مواصلات ونقل',
  'Rent': 'إيجار وسكن',
  'Bills': 'فواتير وخدمات',
  'Shopping': 'تسوق ومشتريات',
  'Entertainment': 'ترفيه ومطاعم',
  'Travel': 'سفر وسياحة',
  'Family': 'التزامات عائلية',
  'Car': 'وقود وصيانة السيارة',
  'Health': 'رعاية صحية وأدوية',
  'Gym': 'رياضة ولياقة',
  'Other': 'أخرى',
  'Salary': 'راتب شهري',
  'Bonus': 'مكافأة وأرباح',
  'Freelance': 'عمل حر واستشارات',
  'Business': 'أرباح تجارية',
  'Investment': 'عوائد استثمارية',
  'Income': 'دخل',
};

export function translateCategory(name: string, lang: Language): string {
  if (lang === 'ar' && CATEGORY_TRANSLATIONS[name]) {
    return CATEGORY_TRANSLATIONS[name];
  }
  return name;
}
