import React from "react";
import AddModuleDialog from "@/components/custom/AddModuleDialog";
import Layout from "./Layout";
import ModuleList from "@/components/custom/ModuleList";
import SearchModule from "@/components/custom/SearchModule";

const ModuleTestPage = () => {
    const [isFormDialogOpen, setIsFormDialogOpen] = React.useState(false);

    return (
        <Layout>
            <div className="flex flex-col h-screen w-screen p-6">
                <div className="flex justify-end mb-4 gap-3">
                    <SearchModule />
                    <AddModuleDialog
                        isDialogOpen={isFormDialogOpen} 
                        setIsDialogOpen={setIsFormDialogOpen} 
                    />
                </div>
                <ModuleList/>
            </div>
        </Layout>
    );
};
export default ModuleTestPage;
