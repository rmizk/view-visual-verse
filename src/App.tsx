
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Departements from "./pages/Departements";
import Employes from "./pages/Employes";
import Planning from "./pages/Planning";
import PlanningDetail from "./pages/PlanningDetail";
import Attendance from "./pages/Attendance";
import Presence from "./pages/Presence";
import Pointages from "./pages/Pointages";
import Pointeuses from "./pages/Pointeuses";
import Anomalie from "./pages/Anomalie";
import Rapports from "./pages/Rapports";
import Alertes from "./pages/Alertes";
import Parametres from "./pages/Parametres";
import RolesPermissions from "./pages/RolesPermissions";
import Profil from "./pages/Profil";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ProtectedRoute>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Index />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
              <Route path="/entreprise/departements" element={<Departements />} />
              <Route path="/entreprise/employes" element={<Employes />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/planning/:id" element={<PlanningDetail />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/attendance/presence" element={<Presence />} />
              <Route path="/attendance/pointages" element={<Pointages />} />
              <Route path="/attendance/pointeuses" element={<Pointeuses />} />
              <Route path="/anomalie" element={<Anomalie />} />
              <Route path="/anomaly" element={<Anomalie />} />
              <Route path="/rapports" element={<Rapports />} />
              <Route path="/reports" element={<Rapports />} />
              <Route path="/alertes" element={<Alertes />} />
              <Route path="/alerts" element={<Alertes />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/parametres" element={<Parametres />} />
              <Route path="/parametres/roles-permissions" element={<RolesPermissions />} />
              <Route path="/settings" element={<Parametres />} />
              <Route path="/profil" element={<Profil />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ProtectedRoute>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
