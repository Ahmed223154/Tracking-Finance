#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(WidgetBridgePlugin, "WidgetBridge",
    CAP_PLUGIN_METHOD(exitToHomeScreen, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(updateWidgetData, CAPPluginReturnPromise);
)
