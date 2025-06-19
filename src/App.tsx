import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Tutorials from "./pages/Tutorials";
import TutorialDetail from "./pages/TutorialDetail";
import Challenges from "./pages/Challenges";
import Community from "./pages/Community";
import Marketplace from "./pages/Marketplace";
import Dashboard from "./pages/Dashboard";
import CreatorDashboardPage from "./pages/CreatorDashboardPage";
import PartnerDashboardPage from "./pages/PartnerDashboardPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Onboarding from "./pages/Onboarding";
import OnboardingExperience from "./pages/OnboardingExperience";
import FirstProjects from "./pages/FirstProjects";
import Account from "./pages/Account";
import SubscriptionPage from "./pages/SubscriptionPage";
import PaymentsPage from "./pages/PaymentsPage";
import UpdatePaymentMethodPage from "./pages/UpdatePaymentMethodPage";
import PremiumUpgradePage from "./pages/PremiumUpgradePage";
import ProjectsPage from "./pages/ProjectsPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import UploadTutorialPage from "./pages/UploadTutorialPage";
import EditTutorialPage from "./pages/EditTutorialPage";
import TutorialSuccessPage from "./pages/TutorialSuccessPage";
import AdminDashboard from "./pages/AdminDashboard";
import SignOut from "./pages/SignOut";
import NotFound from "./pages/NotFound";

// New public pages
import AddPaymentPage from "./pages/AddPaymentPage";
import PartnerSelectWinnerPage from "./pages/PartnerSelectWinnerPage";
import PublicSettingsPage from "./pages/PublicSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/tutorials/:id" element={<TutorialDetail />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/community" element={<Community />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/sign-out" element={<SignOut />} />
              
              {/* New public routes */}
              <Route path="/add-payment" element={<AddPaymentPage />} />
              <Route path="/partner-select-winner/:id" element={<PartnerSelectWinnerPage />} />
              <Route path="/account/settings" element={<PublicSettingsPage />} />

              {/* Make creator dashboard pages public for testing */}
              <Route path="/creator-dashboard" element={<CreatorDashboardPage />} />
              <Route path="/creator-dashboard/upload" element={<UploadTutorialPage />} />
              <Route path="/creator-dashboard/upload/success" element={<TutorialSuccessPage />} />
              <Route path="/creator-dashboard/edit/:id" element={<EditTutorialPage />} />

              {/* Protected routes - require authentication */}
              <Route element={<ProtectedRoute />}>
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/onboarding/experience" element={<OnboardingExperience />} />
                <Route path="/first-projects" element={<FirstProjects />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/account" element={<Account />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
                <Route path="/premium-upgrade" element={<PremiumUpgradePage />} />
                <Route path="/account/payments" element={<PaymentsPage />} />
                <Route path="/account/payments/update-method" element={<UpdatePaymentMethodPage />} />
                <Route path="/account/projects" element={<ProjectsPage />} />
                <Route path="/account/notifications" element={<NotificationsPage />} />
              </Route>

              {/* Partner routes */}
              <Route element={<ProtectedRoute requiredRole="partner" />}>
                <Route path="/partner-dashboard" element={<PartnerDashboardPage />} />
              </Route>

              {/* Admin routes */}
              <Route element={<ProtectedRoute requiredRole="admin" />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>

              {/* 404 - Not found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
