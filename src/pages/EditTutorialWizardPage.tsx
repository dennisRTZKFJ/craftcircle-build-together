
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import EditTutorialWizard from "@/components/creator-dashboard/EditTutorialWizard";

const EditTutorialWizardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12" style={{ backgroundColor: '#fbfaf8' }}>
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-serif font-semibold text-gray-900">
              Tutorial bearbeiten
            </h1>
            <Link to="/creator-dashboard">
              <Button
                variant="outline"
                className="border border-gray-300 bg-white rounded-lg text-gray-700 px-4 py-2 hover:bg-gray-50 text-sm"
              >
                Zurück zum Creator Dashboard
              </Button>
            </Link>
          </div>
          
          <EditTutorialWizard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditTutorialWizardPage;
