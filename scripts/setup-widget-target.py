#!/usr/bin/env python3
"""
Ensures FinanceWidget is configured as a native target in ios/App/App.xcodeproj
with Embed App Extensions build phase, target dependencies, and shared schemes.
"""
import os
import sys

def configure_project():
    pbx_path = "ios/App/App.xcodeproj/project.pbxproj"
    if not os.path.exists(pbx_path):
        print(f"Error: {pbx_path} not found")
        sys.exit(1)

    with open(pbx_path, "r") as f:
        content = f.read()

    if "FW0000000000000000000060" in content:
        print("FinanceWidget target already present in project.pbxproj.")
        return

    print("Configuring FinanceWidget target in project.pbxproj...")

    # 1. PBXBuildFile
    build_file_insert = """\t\tFW0000000000000000000011 /* FinanceWidget.swift in Sources */ = {isa = PBXBuildFile; fileRef = FW0000000000000000000001 /* FinanceWidget.swift */; };
\t\tFW0000000000000000000012 /* FinanceWidget.appex in Embed App Extensions */ = {isa = PBXBuildFile; fileRef = FW0000000000000000000003 /* FinanceWidget.appex */; settings = {ATTRIBUTES = (RemoveHeadersOnCopy, ); }; };
"""
    content = content.replace("/* Begin PBXBuildFile section */\n", "/* Begin PBXBuildFile section */\n" + build_file_insert)

    # 2. PBXContainerItemProxy
    container_proxy_section = """/* Begin PBXContainerItemProxy section */
\t\tFW0000000000000000000051 /* PBXContainerItemProxy */ = {
\t\t\tisa = PBXContainerItemProxy;
\t\t\tcontainerPortal = 504EC2FC1FED79650016851F /* Project object */;
\t\t\tproxyType = 1;
\t\t\tremoteGlobalIDString = FW0000000000000000000060;
\t\t\tremoteInfo = FinanceWidget;
\t\t};
/* End PBXContainerItemProxy section */

"""
    content = content.replace("/* Begin PBXFileReference section */\n", container_proxy_section + "/* Begin PBXFileReference section */\n")

    # 3. PBXCopyFilesBuildPhase
    copy_files_section = """/* Begin PBXCopyFilesBuildPhase section */
\t\tFW0000000000000000000041 /* Embed App Extensions */ = {
\t\t\tisa = PBXCopyFilesBuildPhase;
\t\t\tbuildActionMask = 2147483647;
\t\t\tdstPath = "";
\t\t\tdstSubfolderSpec = 13;
\t\t\tfiles = (
\t\t\t\tFW0000000000000000000012 /* FinanceWidget.appex in Embed App Extensions */,
\t\t\t);
\t\t\tname = "Embed App Extensions";
\t\t\trunOnlyForDeploymentPostprocessing = 0;
\t\t};
/* End PBXCopyFilesBuildPhase section */

"""
    content = content.replace("/* Begin PBXFrameworksBuildPhase section */\n", copy_files_section + "/* Begin PBXFrameworksBuildPhase section */\n")

    # 4. PBXFileReference
    file_ref_insert = """\t\tFW0000000000000000000001 /* FinanceWidget.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FinanceWidget.swift; sourceTree = "<group>"; };
\t\tFW0000000000000000000002 /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = Info.plist; sourceTree = "<group>"; };
\t\tFW0000000000000000000003 /* FinanceWidget.appex */ = {isa = PBXFileReference; explicitFileType = "wrapper.app-extension"; includeInIndex = 0; path = FinanceWidget.appex; sourceTree = BUILT_PRODUCTS_DIR; };
"""
    content = content.replace("/* Begin PBXFileReference section */\n", "/* Begin PBXFileReference section */\n" + file_ref_insert)

    # 5. PBXGroup
    main_group_target = """\t\t504EC2FB1FED79650016851F = {
\t\t\tisa = PBXGroup;
\t\t\tchildren = (
\t\t\t\t958DCC722DB07C7200EA8C5F /* debug.xcconfig */,
\t\t\t\t504EC3061FED79650016851F /* App */,
\t\t\t\t504EC3051FED79650016851F /* Products */,"""
    main_group_replace = """\t\t504EC2FB1FED79650016851F = {
\t\t\tisa = PBXGroup;
\t\t\tchildren = (
\t\t\t\t958DCC722DB07C7200EA8C5F /* debug.xcconfig */,
\t\t\t\t504EC3061FED79650016851F /* App */,
\t\t\t\tFW0000000000000000000020 /* FinanceWidget */,
\t\t\t\t504EC3051FED79650016851F /* Products */,"""
    content = content.replace(main_group_target, main_group_replace)

    products_target = """\t\t504EC3051FED79650016851F /* Products */ = {
\t\t\tisa = PBXGroup;
\t\t\tchildren = (
\t\t\t\t504EC3041FED79650016851F /* App.app */,
\t\t\t);"""
    products_replace = """\t\t504EC3051FED79650016851F /* Products */ = {
\t\t\tisa = PBXGroup;
\t\t\tchildren = (
\t\t\t\t504EC3041FED79650016851F /* App.app */,
\t\t\t\tFW0000000000000000000003 /* FinanceWidget.appex */,
\t\t\t);"""
    content = content.replace(products_target, products_replace)

    widget_group = """\t\tFW0000000000000000000020 /* FinanceWidget */ = {
\t\t\tisa = PBXGroup;
\t\t\tchildren = (
\t\t\t\tFW0000000000000000000001 /* FinanceWidget.swift */,
\t\t\t\tFW0000000000000000000002 /* Info.plist */,
\t\t\t);
\t\t\tpath = FinanceWidget;
\t\t\tsourceTree = "<group>";
\t\t};
"""
    content = content.replace("/* Begin PBXGroup section */\n", "/* Begin PBXGroup section */\n" + widget_group)

    # 6. PBXNativeTarget
    app_target_src = """\t\t\tbuildPhases = (
\t\t\t\t504EC3001FED79650016851F /* Sources */,
\t\t\t\t504EC3011FED79650016851F /* Frameworks */,
\t\t\t\t504EC3021FED79650016851F /* Resources */,
\t\t\t);
\t\t\tbuildRules = (
\t\t\t);
\t\t\tdependencies = (
\t\t\t);"""
    app_target_rep = """\t\t\tbuildPhases = (
\t\t\t\t504EC3001FED79650016851F /* Sources */,
\t\t\t\t504EC3011FED79650016851F /* Frameworks */,
\t\t\t\t504EC3021FED79650016851F /* Resources */,
\t\t\t\tFW0000000000000000000041 /* Embed App Extensions */,
\t\t\t);
\t\t\tbuildRules = (
\t\t\t);
\t\t\tdependencies = (
\t\t\t\tFW0000000000000000000052 /* PBXTargetDependency */,
\t\t\t);"""
    content = content.replace(app_target_src, app_target_rep)

    widget_native_target = """\t\tFW0000000000000000000060 /* FinanceWidget */ = {
\t\t\tisa = PBXNativeTarget;
\t\t\tbuildConfigurationList = FW0000000000000000000070 /* Build configuration list for PBXNativeTarget "FinanceWidget" */;
\t\t\tbuildPhases = (
\t\t\t\tFW0000000000000000000031 /* Sources */,
\t\t\t\tFW0000000000000000000032 /* Frameworks */,
\t\t\t\tFW0000000000000000000033 /* Resources */,
\t\t\t);
\t\t\tbuildRules = (
\t\t\t);
\t\t\tdependencies = (
\t\t\t);
\t\t\tname = FinanceWidget;
\t\t\tproductName = FinanceWidget;
\t\t\tproductReference = FW0000000000000000000003 /* FinanceWidget.appex */;
\t\t\tproductType = "com.apple.product-type.app-extension";
\t\t};
"""
    content = content.replace("/* Begin PBXNativeTarget section */\n", "/* Begin PBXNativeTarget section */\n" + widget_native_target)

    # 7. PBXProject targets and attributes
    content = content.replace(
        "TargetAttributes = {\n\t\t\t\t\t504EC3031FED79650016851F = {",
        "TargetAttributes = {\n\t\t\t\t\tFW0000000000000000000060 = {\n\t\t\t\t\t\tCreatedOnToolsVersion = 14.0;\n\t\t\t\t\t\tProvisioningStyle = Automatic;\n\t\t\t\t\t};\n\t\t\t\t\t504EC3031FED79650016851F = {"
    )

    content = content.replace(
        "targets = (\n\t\t\t\t504EC3031FED79650016851F /* App */,\n\t\t\t);",
        "targets = (\n\t\t\t\t504EC3031FED79650016851F /* App */,\n\t\t\t\tFW0000000000000000000060 /* FinanceWidget */,\n\t\t\t);"
    )

    # 8. Phases for FinanceWidget
    sources_phase_insert = """\t\tFW0000000000000000000031 /* Sources */ = {
\t\t\tisa = PBXSourcesBuildPhase;
\t\t\tbuildActionMask = 2147483647;
\t\t\tfiles = (
\t\t\t\tFW0000000000000000000011 /* FinanceWidget.swift in Sources */,
\t\t\t);
\t\t\trunOnlyForDeploymentPostprocessing = 0;
\t\t};
"""
    content = content.replace("/* Begin PBXSourcesBuildPhase section */\n", "/* Begin PBXSourcesBuildPhase section */\n" + sources_phase_insert)

    frameworks_phase_insert = """\t\tFW0000000000000000000032 /* Frameworks */ = {
\t\t\tisa = PBXFrameworksBuildPhase;
\t\t\tbuildActionMask = 2147483647;
\t\t\tfiles = (
\t\t\t);
\t\t\trunOnlyForDeploymentPostprocessing = 0;
\t\t};
"""
    content = content.replace("/* Begin PBXFrameworksBuildPhase section */\n", "/* Begin PBXFrameworksBuildPhase section */\n" + frameworks_phase_insert)

    resources_phase_insert = """\t\tFW0000000000000000000033 /* Resources */ = {
\t\t\tisa = PBXResourcesBuildPhase;
\t\t\tbuildActionMask = 2147483647;
\t\t\tfiles = (
\t\t\t);
\t\t\trunOnlyForDeploymentPostprocessing = 0;
\t\t};
"""
    content = content.replace("/* Begin PBXResourcesBuildPhase section */\n", "/* Begin PBXResourcesBuildPhase section */\n" + resources_phase_insert)

    # 9. TargetDependency
    target_dep_section = """/* Begin PBXTargetDependency section */
\t\tFW0000000000000000000052 /* PBXTargetDependency */ = {
\t\t\tisa = PBXTargetDependency;
\t\t\ttarget = FW0000000000000000000060 /* FinanceWidget */;
\t\t\ttargetProxy = FW0000000000000000000051 /* PBXContainerItemProxy */;
\t\t};
/* End PBXTargetDependency section */

"""
    content = content.replace("/* Begin XCBuildConfiguration section */\n", target_dep_section + "/* Begin XCBuildConfiguration section */\n")

    # 10. XCBuildConfiguration
    widget_configs = """\t\tFW0000000000000000000081 /* Debug */ = {
\t\t\tisa = XCBuildConfiguration;
\t\t\tbuildSettings = {
\t\t\t\tCLANG_ENABLE_MODULES = YES;
\t\t\t\tCODE_SIGN_STYLE = Automatic;
\t\t\t\tCURRENT_PROJECT_VERSION = 1;
\t\t\t\tGENERATE_INFOPLIST_FILE = NO;
\t\t\t\tINFOPLIST_FILE = FinanceWidget/Info.plist;
\t\t\t\tIPHONEOS_DEPLOYMENT_TARGET = 15.0;
\t\t\t\tLD_RUNPATH_SEARCH_PATHS = (
\t\t\t\t\t"$(inherited)",
\t\t\t\t\t"@executable_path/Frameworks",
\t\t\t\t\t"@executable_path/../../Frameworks",
\t\t\t\t);
\t\t\t\tMARKETING_VERSION = 1.0;
\t\t\t\tPRODUCT_BUNDLE_IDENTIFIER = com.ahmedalrubaye.financeapp.FinanceWidget;
\t\t\t\tPRODUCT_NAME = "$(TARGET_NAME)";
\t\t\t\tSKIP_INSTALL = YES;
\t\t\t\tSWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG;
\t\t\t\tSWIFT_EMIT_LOC_STRINGS = YES;
\t\t\t\tSWIFT_OPTIMIZATION_LEVEL = "-Onone";
\t\t\t\tSWIFT_VERSION = 5.0;
\t\t\t\tTARGETED_DEVICE_FAMILY = "1,2";
\t\t\t};
\t\t\tname = Debug;
\t\t};
\t\tFW0000000000000000000082 /* Release */ = {
\t\t\tisa = XCBuildConfiguration;
\t\t\tbuildSettings = {
\t\t\t\tCLANG_ENABLE_MODULES = YES;
\t\t\t\tCODE_SIGN_STYLE = Automatic;
\t\t\t\tCURRENT_PROJECT_VERSION = 1;
\t\t\t\tGENERATE_INFOPLIST_FILE = NO;
\t\t\t\tINFOPLIST_FILE = FinanceWidget/Info.plist;
\t\t\t\tIPHONEOS_DEPLOYMENT_TARGET = 15.0;
\t\t\t\tLD_RUNPATH_SEARCH_PATHS = (
\t\t\t\t\t"$(inherited)",
\t\t\t\t\t"@executable_path/Frameworks",
\t\t\t\t\t"@executable_path/../../Frameworks",
\t\t\t\t);
\t\t\t\tMARKETING_VERSION = 1.0;
\t\t\t\tPRODUCT_BUNDLE_IDENTIFIER = com.ahmedalrubaye.financeapp.FinanceWidget;
\t\t\t\tPRODUCT_NAME = "$(TARGET_NAME)";
\t\t\t\tSKIP_INSTALL = YES;
\t\t\t\tSWIFT_COMPILATION_MODE = wholemodule;
\t\t\t\tSWIFT_EMIT_LOC_STRINGS = YES;
\t\t\t\tSWIFT_OPTIMIZATION_LEVEL = "-O";
\t\t\t\tSWIFT_VERSION = 5.0;
\t\t\t\tTARGETED_DEVICE_FAMILY = "1,2";
\t\t\t\tVALIDATE_PRODUCT = YES;
\t\t\t};
\t\t\tname = Release;
\t\t};
"""
    content = content.replace("/* Begin XCBuildConfiguration section */\n", "/* Begin XCBuildConfiguration section */\n" + widget_configs)

    # 11. XCConfigurationList
    widget_config_list = """\t\tFW0000000000000000000070 /* Build configuration list for PBXNativeTarget "FinanceWidget" */ = {
\t\t\tisa = XCConfigurationList;
\t\t\tbuildConfigurations = (
\t\t\t\tFW0000000000000000000081 /* Debug */,
\t\t\t\tFW0000000000000000000082 /* Release */,
\t\t\t);
\t\t\tdefaultConfigurationIsVisible = 0;
\t\t\tdefaultConfigurationName = Release;
\t\t};
"""
    content = content.replace("/* Begin XCConfigurationList section */\n", "/* Begin XCConfigurationList section */\n" + widget_config_list)

    with open(pbx_path, "w") as f:
        f.write(content)

    print("Successfully configured FinanceWidget target in project.pbxproj!")

if __name__ == "__main__":
    configure_project()
