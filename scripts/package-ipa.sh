#!/usr/bin/env bash
set -e

# Configuration / Paths
DERIVED_DATA_DIR="${1:-derived_data}"
BUILD_PRODUCTS_DIR="${DERIVED_DATA_DIR}/Build/Products/Release-iphoneos"
PAYLOAD_DIR="Payload"
IPA_NAME="App.ipa"

echo "=== Packaging iOS IPA for Sideloading (SideStore / AltStore) ==="

# Clean previous payload and ipa
rm -rf "${PAYLOAD_DIR}" "${IPA_NAME}"
mkdir -p "${PAYLOAD_DIR}"

# 1. Locate and copy the main application bundle
if [ ! -d "${BUILD_PRODUCTS_DIR}/App.app" ]; then
    echo "Error: App.app not found in ${BUILD_PRODUCTS_DIR}"
    exit 1
fi

echo "Copying App.app to Payload..."
cp -r "${BUILD_PRODUCTS_DIR}/App.app" "${PAYLOAD_DIR}/"

# 2. Locate and embed the Widget Extension into Payload/App.app/PlugIns/
PLUGINS_DIR="${PAYLOAD_DIR}/App.app/PlugIns"
mkdir -p "${PLUGINS_DIR}"

# Check both built products and App.app for the widget extension bundle
if [ -d "${BUILD_PRODUCTS_DIR}/FinanceWidget.appex" ]; then
    echo "Embedding FinanceWidget.appex into PlugIns..."
    cp -r "${BUILD_PRODUCTS_DIR}/FinanceWidget.appex" "${PLUGINS_DIR}/"
elif [ -d "${BUILD_PRODUCTS_DIR}/FinanceWidgetExtension.appex" ]; then
    echo "Embedding FinanceWidgetExtension.appex into PlugIns..."
    cp -r "${BUILD_PRODUCTS_DIR}/FinanceWidgetExtension.appex" "${PLUGINS_DIR}/"
fi

# 3. Ensure executable permissions (chmod +x) on all binaries
echo "Ensuring execute permissions (chmod +x) on binaries..."
if [ -f "${PAYLOAD_DIR}/App.app/App" ]; then
    chmod +x "${PAYLOAD_DIR}/App.app/App"
fi

for appex in "${PLUGINS_DIR}"/*.appex; do
    if [ -d "${appex}" ]; then
        appex_name=$(basename "${appex}" .appex)
        if [ -f "${appex}/${appex_name}" ]; then
            echo "Setting chmod +x on ${appex}/${appex_name}"
            chmod +x "${appex}/${appex_name}"
        fi
    fi
done

# Ensure all files and directories in Payload have standard readable/traversable permissions
chmod -R a+rX "${PAYLOAD_DIR}"

# 4. Ad-hoc codesign with entitlements (required for SideStore / AltStore resigning)
echo "Ad-hoc codesigning bundles with entitlements..."
for appex in "${PLUGINS_DIR}"/*.appex; do
    if [ -d "${appex}" ]; then
        if [ -f "ios/App/FinanceWidget/FinanceWidget.entitlements" ]; then
            codesign --force --sign - --entitlements "ios/App/FinanceWidget/FinanceWidget.entitlements" "${appex}" 2>/dev/null || codesign --force --sign - "${appex}"
        else
            codesign --force --sign - "${appex}"
        fi
    fi
done

if [ -f "ios/App/App/App.entitlements" ]; then
    codesign --force --sign - --entitlements "ios/App/App/App.entitlements" "${PAYLOAD_DIR}/App.app" 2>/dev/null || codesign --force --sign - "${PAYLOAD_DIR}/App.app"
else
    codesign --force --sign - "${PAYLOAD_DIR}/App.app"
fi

# 5. Verify payload structure
echo "=== Verifying Payload Structure ==="
ls -la "${PLUGINS_DIR}" || echo "PlugIns directory empty or missing!"

# 6. Compress Payload into .ipa preserving symbolic links and permissions
echo "Creating ${IPA_NAME}..."
zip -r -y "${IPA_NAME}" "${PAYLOAD_DIR}"

echo "=== IPA Packaging Complete: ${IPA_NAME} ==="
