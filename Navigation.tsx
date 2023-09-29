import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

function BudgetScreen() {
  return <></>;
}

function ProfilScreen() {
  return <></>;
}

const Tab = createBottomTabNavigator();

function BottomNav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name == "Home") {
              iconName = "home";
            } else if (route.name == "Profile") {
              iconName = "person-circle";
            }
            if (iconName) {
              return <Ionicons name={iconName} size={25} color={"black"} />;
            } else {
              return null;
            }
          },
        })}
      >
        <Tab.Screen name="Budget" component={BudgetScreen} />
        <Tab.Screen name="Profile" component={ProfilScreen} />
        {/* <Tab.Screen
          name="PreRegisteredAddOverlay"
          component={PreRegisteredAddOverlay}
          options={{ tabBarButton: () => null }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomNav;
