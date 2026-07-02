import React from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router';
import { AppProvider } from './context';
import { Splash } from './screens/Splash';
import { Login } from './screens/Login';
import { StudentHome } from './screens/student/Home';
import { StudentMenu } from './screens/student/Menu';
import { ProductDetail } from './screens/student/ProductDetail';
import { Cart } from './screens/student/Cart';
import { Checkout } from './screens/student/Checkout';
import { Processing } from './screens/student/Processing';
import { OrderSuccess } from './screens/student/OrderSuccess';
import { Orders } from './screens/student/Orders';
import { OrderDetail } from './screens/student/OrderDetail';
import { Profile } from './screens/student/Profile';

import { StaffDashboard } from './screens/staff/Dashboard';
import { StaffScan } from './screens/staff/Scan';
import { StaffOrder } from './screens/staff/Order';
import { StaffInventory } from './screens/staff/Inventory';
import { StaffProfile } from './screens/staff/Profile';

import { ManagerDashboard } from './screens/manager/Dashboard';

import { BottomNav } from './components/BottomNav';
import { StaffBottomNav } from './components/StaffBottomNav';
import { ManagerBottomNav } from './components/ManagerBottomNav';
import { NavVisibilityProvider, useNavVisibility } from './navVisibility';

const RootLayout = () => {
  return (
    <AppProvider>
      <div className="mx-auto w-full max-w-[430px] h-[100dvh] bg-[var(--color-beige)] text-[var(--color-violet)] overflow-hidden relative shadow-2xl">
        <Outlet />
      </div>
    </AppProvider>
  );
};

const StudentBottomNavSlot = () => {
  const { visible } = useNavVisibility();
  return <BottomNav visible={visible} />;
};

const StudentLayout = () => {
  return (
    <NavVisibilityProvider>
      <div className="h-full flex flex-col relative">
        <Outlet />
        <StudentBottomNavSlot />
      </div>
    </NavVisibilityProvider>
  );
};

const StaffBottomNavSlot = () => {
  const { visible } = useNavVisibility();
  return <StaffBottomNav visible={visible} />;
};

const StaffLayout = () => {
  return (
    <NavVisibilityProvider>
      <div className="h-full flex flex-col relative">
        <Outlet />
        <StaffBottomNavSlot />
      </div>
    </NavVisibilityProvider>
  );
};

const ManagerBottomNavSlot = () => {
  const { visible } = useNavVisibility();
  return <ManagerBottomNav visible={visible} />;
};

const ManagerLayout = () => {
  return (
    <NavVisibilityProvider>
      <div className="h-full flex flex-col relative">
        <Outlet />
        <ManagerBottomNavSlot />
      </div>
    </NavVisibilityProvider>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Splash },
      { path: "login", Component: Login },
      {
        path: "student",
        Component: StudentLayout,
        children: [
          { index: true, element: <Navigate to="home" replace /> },
          { path: "home", Component: StudentHome },
          { path: "menu", Component: StudentMenu },
          { path: "product/:id", Component: ProductDetail },
          { path: "cart", Component: Cart },
          { path: "checkout", Component: Checkout },
          { path: "processing", Component: Processing },
          { path: "success/:orderId", Component: OrderSuccess },
          { path: "orders", Component: Orders },
          { path: "order/:orderId", Component: OrderDetail },
          { path: "profile", Component: Profile },
        ],
      },
      {
        path: "staff",
        Component: StaffLayout,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", Component: StaffDashboard },
          { path: "scan", Component: StaffScan },
          { path: "order/:orderId", Component: StaffOrder },
          { path: "inventory", Component: StaffInventory },
          { path: "profile", Component: StaffProfile },
        ]
      },
      {
        path: "manager",
        Component: ManagerLayout,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", Component: ManagerDashboard },
        ]
      }
    ],
  },
]);
